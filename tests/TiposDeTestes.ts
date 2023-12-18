import {test} from '@playwright/test'
//para evitar repetição de linhas, criamos hooks para linhas comuns a diferentes testes
//hook before each test
test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200')
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
})


//hook before all tests as a general precondition before all test. Not very used
//test.beforeEach(()=>{})

//testes unitários
// test("Form Layouts", async({ page }) => {
//     await page.getByText("Form Layouts").click()

// });
// test("datepicker page", async({ page }) => {
//     await page.getByText("Datepicker").click()

// });

//another hooks are afterEach and afterAll
//test.afterEach(()=>{})

//testes unitários
test("some describing string", ()=>{
    
})

//agrupamento de testes(suites)
test.describe("teste suite 1", ()=>{

    test("test 1.1", ()=>{

    })
    
    test("test 1.2", ()=>{

    })
    
    test("test 1.3", ()=>{

    })
    
    test("test 1.4", ()=>{

    })
    
    
})
test.describe("teste suite 2", ()=>{

    test("test 2.1", ()=>{

    })
    
    test("test 2.2", ()=>{

    })
    
    test("test 2.3", ()=>{

    })
    
    test("test 2.4", ()=>{

    })
    
    
})
