<?php

use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverDimension;
use Senna\WebScraping;
use Symfony\Component\Panther\Client;
use Symfony\Component\Panther\DomCrawler\Crawler;
use thiagoalessio\TesseractOCR\TesseractOCR;

require_once __DIR__ . '/vendor/autoload.php';

define('SCRAPING_PATH', __DIR__ . '/scraping');

function logMessage(string $message = ''): void {
    $log = '[' .date_format(date_create('now'), 'd/m/Y h:i') .'] ' . $message . PHP_EOL;
    echo $log;
}

$webScraping = new WebScraping(
    'GET',
    'http://www.ioerj.com.br/portal/modules/conteudoonline/mostra_edicao.php?session=VWxSU1JWSnFRa0pPUkdOMFRrUlplRTlUTURCUFJVMHpURlJzUkUxRldYUk9WR2Q0VVZWS1JrNVVWVFZQUlVrMVRWUlpOVTFFVVRKT1ZHczFUV2M5UFE9PQ==',
    'body',
    'firefox'
);

logMessage('Iniciando a busca pro informação');

$webScraping->run(function (Client $client, Crawler $crawler) {
    do {
        $client->refreshCrawler();
        $crawler = $client->waitForVisibility('#viewer');
    } while (empty($crawler->filter('#viewer')->text()));

    $pages = (int) preg_replace('/\D/', '', $crawler->filter('#numPages')->text());

    logMessage($pages . ' páginas foram encontradas.');

    $client->getWebDriver()->manage()->window()->setSize(new WebDriverDimension(2420, 3475));
    $client->executeScript("document.querySelector('.toolbar').style.display = 'none'");
    $client->executeScript("document.querySelector('.fundo').style.display = 'none'");
    $client->refreshCrawler();
    $client->executeScript("document.getElementById('zoomIn').click()");
    $client->executeScript("document.getElementById('zoomIn').click()");
    $client->executeScript("document.getElementById('zoomIn').click()");
    $client->waitForVisibility('#viewer');
    sleep(3);

    for ($page = 1; $page <= $pages; $page++) {
        logMessage('Carregado dados da página ' . $page);
        $crawler = $client->refreshCrawler();

        $element = $client->getWebDriver()->findElement(
            WebDriverBy::cssSelector('#pageContainer' . $page)
        );

        $client->takeScreenshot(SCRAPING_PATH . '/imagem/pagina_'. $page . '.png');
        file_put_contents(SCRAPING_PATH . '/texto/pagina_' . $page . '.txt', $element->getText());
        file_put_contents(SCRAPING_PATH . '/html/pagina_' . $page . '.html', $element->getDomProperty('innerHTML'));
        
        $tesseract = new TesseractOCR(SCRAPING_PATH . '/imagem/pagina_'. $page . '.png');
        $tesseract->dpi(300);
        $tesseract->lang('por');
        
        file_put_contents(SCRAPING_PATH . '/textoOcr/pagina_' . $page . '.txt', $tesseract->run());

        $client->executeScript("document.getElementById('next').click()");
        sleep(3);
    }
});
