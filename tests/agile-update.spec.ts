
import { expect, test } from "@playwright/test";
const { chromium } = require('playwright');
test(atuaizanção de cliente"
, async ({ page }) => {
    test.setTimeout(0);
    
    
    await page.goto("https://www.legnet.com.br/legnet/login.php");
    const cod_cli = page.locator("#login_cod_cliente");
    await cod_cli.fill("1");
    const user_name = page.locator("#login_usuario");
    await user_name.fill("yargo.siqueira");
    const login_senha = page.locator("#login_senha");
    await login_senha.fill("789Trocar@");
    //await page.locator(".recaptcha-checkbox-borderAnimation").click();
    await page.getByRole("button", { name: "ENTRAR" }).first().click();  //vai para relatório de obrigações
    
  
    // Clicaqr no + para Abrir o Menu
    await page.locator('//*[@id="fa-plus-topo"]/button/i').click();
  
    // Clicar em acesso rápido
    await page.locator('//*[@id="menubase"]/div[4]/a').hover();
  
    // Hover em banco de dados
    await page.locator('#automacao_banco_de_dados').hover();  
  
    // Houver em Atualização Mensal
    await page.locator('#automacao_atualizacao_mensal').hover();
  
    // Clicar no menu do Agile
    await page.locator('#automacao_atualizacao_mensal_agile').click();
        
    const pac = page.locator("#PAC");
    await pac.fill("GO6209");
  
    
    // await FiltroCliente.fill("FiltroCliente");
  
    // const filtroCliente = page.locator("#FiltroCliente");
  
    // // Seleciona as options com value 2210 e 2106
    // await filtroCliente.selectOption(['2106', '2210']);
  
    // Clicar no botão de buscar os requisitos a serem atualizados
    await page.locator('#botao_automacao_buscar').click();
    
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
    
  })