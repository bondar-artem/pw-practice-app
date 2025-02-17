# Testes Automatizados com Playwright

## Introdução

Este documento contém um resumo da aula sobre automação de testes utilizando Playwright, abordando a interação com formulários e boas práticas para a escrita de testes eficientes e organizados.

## Configuração Inicial e Navegação

Antes de cada teste, configuramos um cenário padrão:

- Acessamos a página `http://localhost:4200/`.
- Aplicamos um `waitForTimeout(1000)` para garantir que a interface seja carregada.
- Navegamos pelos menus clicando em elementos com seletores CSS.

## Preenchendo Formulários

- Identificação de campos de entrada (`input`) utilizando `getByLabel()`.
- Preenchimento dos campos de **E-mail** e **Senha** com `.fill()`.
- Seleção de botões de rádio utilizando `locator('nb-radio')`.
- Clique no botão "Sign in" utilizando seletores baseados no status (`button[status="primary"]`).

## Redução da Duplicação de Código

Para tornar o código mais reutilizável e organizado:

- Criamos uma referência para o formulário com `page.locator('nb-card').filter({hasText: "Basic form"})`.
- Reutilizamos localizadores para os campos de **E-mail** e **Senha**.
- Validamos se os campos foram preenchidos corretamente usando `expect().toHaveValue()`.

## Extração e Validação de Valores

- Obtenção do texto de um botão com `.textContent()` e validação do seu valor esperado.
- Extração e validação dos textos de todos os botões de rádio na página.
- Teste se o campo **E-mail** recebe corretamente o valor digitado com `.inputValue()`.

## Conclusão

A aula abordou práticas essenciais para testes automatizados com Playwright, incluindo:

- Organização de testes reutilizáveis.
- Localização eficiente de elementos na página.
- Extração e validação de valores.

Essas técnicas são fundamentais para criar testes robustos e fáceis de manter.

## Como Executar os Testes

Para rodar os testes, utilize o seguinte comando:

```sh
npx playwright test
```

Para mais informações, consulte a [documentação do Playwright](https://playwright.dev/).

