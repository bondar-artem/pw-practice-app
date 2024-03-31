import { expect, test } from "@playwright/test";
const { chromium } = require("playwright");
// const nodemailer = require('nodemailer');
// const fs = require('fs');
// const path = require('path');

test("Atualização de Cliente", async ({ page }) => {
  test.setTimeout(0);

  await page.goto("https://www.legnet.com.br/legnet/login.php");
  const cod_cli = page.locator("#login_cod_cliente");
  await cod_cli.fill("1");
  const user_name = page.locator("#login_usuario");
  await user_name.fill("juridico");
  const login_senha = page.locator("#login_senha");
  await login_senha.fill("Legnet123!");
  //await page.locator(".recaptcha-checkbox-borderAnimation").click();
  await page.getByRole("button", { name: "ENTRAR" }).first().click(); //vai para relatório de obrigações

  // Clicaqr no + para Abrir o Menu
  await page.locator('//*[@id="fa-plus-topo"]/button/i').click();

  // Clicar em acesso rápido
  await page.locator('//*[@id="menubase"]/div[4]/a').hover();

  // Hover em banco de dados
  await page.locator("#automacao_banco_de_dados").hover();

  // Houver em Atualização Mensal
  await page.locator("#automacao_atualizacao_mensal").hover();

  // Clicar no menu do Agile
  await page.locator("#automacao_atualizacao_mensal_agile").click();

  //seleciona um pac específico
  const pac = page.locator("#PAC");
  // await pac.fill("UN29082");

  const filtroCliente = page.locator("#FiltroCliente");

  await filtroCliente.selectOption("2580");

  //para mais de um option (cliente)
  //await filtroCliente.selectOptions(["2106", "2107"]);

  // Verifique se a opção foi selecionada
  //expect(filtroCliente.selectedOption()).toBe("2106");

  //clica no botão buscar
  await page.locator("#botao_automacao_buscar").click();

  //
  // Aguarda a mensagem "Busca Finalizada" aparecer.
  await page.waitForSelector("#idBuscaFinalizada", { state: "visible" });

  // Verifica se há conteúdo dinâmico com a classe "requisito".
  const requisitos = await page.locator(".requisito").count();

  if (requisitos === 0) {
    // Se não houver conteúdo, registra a mensagem no report e **encerra o Chromium**.
    const errorMessage = "Não há atualizações para o cliente com o código ";
    //+ page.locator("#FiltroCliente").inputValue();
    console.log(errorMessage);

    await page.close();
    return;
  }

  // Atenção!  If  count > 0 seguir, else encerra aqui

  //marca o checkbox para marcar as normas
  await page.locator("#CHK_MD").check();

  //processa o envio
  await page.locator("#BtnProcessar").click();

  //aguarda o modal de encerramento
  await page.waitForSelector(".bootbox-body", { state: "visible" });

  await page.close();

  //finaliza o test

  //   // Obter o caminho do arquivo index.html
  //   const caminhoArquivo = path.join(__dirname, 'playwright-report', 'index.html');

  //   // Envia o email com o relatório
  //   try {
  //     await enviarEmailRelatorio(caminhoArquivo);
  //   } catch (error) {
  //     console.error('Erro ao enviar email:', error);
  //   }

  //   // Finaliza o teste com sucesso
  //   // resolve();

  // async function enviarEmailRelatorio(caminhoArquivo) {
  //   // Configurações do servidor SMTP
  //   const transporter = nodemailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: 'legnethub@gmail.com',
  //       pass: 'Legnet123!',
  //     },
  //   });

  //   // Opções do email
  //   const options = {
  //     from: 'legnethub@gmail.com',
  //     to: 'guit1966@gmail.com',
  //     subject: 'Relatório de Teste Playwright',
  //     text: 'Relatório de teste gerado com Playwright em anexo.',
  //     attachments: [
  //       {
  //         filename: 'relatorio.html',
  //         path: caminhoArquivo,
  //       },
  //     ],
  //   };

  //   // Envia o email
  //   await transporter.sendMail(options);
  // }
});

// // Seleciona as options com value 2210 e 2106
// await filtroCliente.selectOption(['2106', '2210']);

// Clicar no botão de buscar os requisitos a serem atualizados
//await page.locator('#botao_automacao_buscar').click();

// try {

//   const response = await axios.get('https://www.legnet.com.br/legnet/api/registrosDeProcessamentoDiario/listarClientesPacParaInclusao.php');
//   await response.data.forEach( async (element) => {

//     const clientes = '#FiltroCliente';
//     await page.selectOption(clientes, element.clientes);
//     //await page.getByLabel('Choose multiple colors').selectOption(['red', 'green', 'blue']);

//     await page.waitForTimeout(5000);

//   });

//   //await page.waitForTimeout(600000);

// } catch (error) {
//   console.error("Erro na chamada à API:", error.message);
// }

// Aguardar até que o loader desapareça da página
//await page.waitForSelector("#loader", { state: 'hidden' });
