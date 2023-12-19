import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.ioerj.com.br/portal/modules/conteudoonline/mostra_edicao.php?session=VFhwVk0wNTZWa1ZSVkZGMFRtdEdSMDVETURCTmFtTXpURlJyTUZGcVdYUk9NRVUxVDFSQk5WSlVZelJPYW10NFRWUmpkMDFxYTNwT1ZHdDRUVUU5UFE9PQ==');

  const texts = await page.querySelectorAll('div div div.text');
  const data: string[] = [];

  for (const text of texts) {
    data.push(await text.textContent());
  }

  console.log(data);

  await browser.close();
})();
