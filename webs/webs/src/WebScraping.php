<?php

namespace Senna;

use Exception;
use Closure;
use Symfony\Component\Panther\Client;

class WebScraping
{
    /**
     * Metodo de requisição
     *
     * @var string $method;
     */
    private $method;

    /**
     * URL do site ou servidor, deve conter o protocolo
     *
     * @var string $url
     */
    private $url;

    /**
     * Elemento em foco para ser consultado, o formato de consulta
     * é similar ao css
     *
     * @var string $focusElement
     */
    private $focusElement;

    /**
     * Kit selecioado webBrowserKit
     *
     * @var string $webBrowserKit
     */
    private $webBrowserKit;

    /**
     * Client criado com o webBrowserKit
     *
     * @var Client $client
     */
    private $client;

    public function __construct(
        string $method,
        string $url,
        string $focusElement = 'body',
        string $webBrowserKit = 'Firefox'
    ) {
        $this->method        = $method;
        $this->url           = $url;
        $this->focusElement  = $focusElement;
        $this->webBrowserKit = $webBrowserKit;

        $this->client =  $this->createClientWebBrowserKit($this->webBrowserKit);
    }
    
    /**
     * Cria o cliente de WebBrowserKit
     *
     * @param string $client
     *
     * @throws Exception
     *
     * @return Symfony\Component\Panther\Client
     */
    private function createClientWebBrowserKit(string $client): Client
    {
        switch ($client) {
            case "firefox":
                return Client::createFirefoxClient();
                break;
            case "chromium":
                return Client::createChromeClient();
                break;
            default:
                throw new Exception('O cliente informado é invalido');
        }
    }

    /**
     * Retorna o Client com o webBrowserKit
     *
     * @return Symfony\Component\Panther\Client
     */
    public function getClient(): Client
    {
        return $this->client;
    }

    /**
     * Executa a operação de consulta
     *
     * @return void
     */
    public function run(Closure $call): void
    {
        $this->client->request($this->method, $this->url);
        $crawler = $this->client->waitForVisibility('body');

        $call($this->client, $crawler);
    }
}
