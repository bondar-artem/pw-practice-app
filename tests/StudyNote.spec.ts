import { test, expect } from '@playwright/test';

test.beforeEach( async ({ page }) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
});

test('Locator syntax rules', async ({ page }) => {
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});






//=============================== structure example ==============================================

test.beforeAll( async ({ page }) => {
  await page.goto('https://playwright.dev/');
});

test.beforeEach( async ({ page }) => {
  await page.goto('https://playwright.dev/')
});

test.describe('suite1',()=> {
    test('test 01', async ({ page }) => {
      await page.goto('https://playwright.dev/');
    
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Playwright/);
    });
    
    test('test 02', async ({ page }) => {
      await page.goto('https://playwright.dev/');
    
      // Click the get started link.
      await page.getByRole('link', { name: 'Get started' }).click();
    
      // Expects page to have a heading with the name of Installation.
      await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
})

// test.afterAll()
// test.afterEach()
// test.fail()
//================================================

//=======================  Note ==================
test('test 01', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await page.waitForURL('https://app.stg.openlane.ca/')
  await page.waitForLoadState('load'); 
  //await page.waitForTimeout(10000)
  //await page.reload()





//============================== < Section 4 - Interaction with Web elements > ==============================// 

  //=============== Locator ================ 

  //by Tag name
  page.locator('input')
  page.locator('nb-card nb-radio')   //parent_tag + child_tag

  //by ID
  page.locator('#inputEmail1')

  //by Class Value
  page.locator('.shape-rectangle')

  //by attribute
  page.locator('[placeholder="Email"]')

  //by Class Value (full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle"]')

  //combine different selectors
  page.locator('input[placeholder="email"]')              // TagName + attribute  //PS. No space between them
  page.locator('[placeholder="email"].shape-rectangle')   // Attribute + class
  page.locator('input[placeholder="email"][nbinput]')     // TagName + attribute01 + attribute02
  page.locator('nb-card nb-radio :text-is("Option 1")')   // Parent_tag + child_tag + Text exact match
  page.locator('nb-card').locator('nb-radio').locator(':text-is("Using the Grid")')   // locator级联 更易读

  //by text match (partial match)
  page.locator(':text("Using")')
  //by text match (exact match)
  page.locator(':text-is("Using the Grid")')

  //by CSS or XPath   (NO recommended)
  page.locator('//input[@id="exampleInputEmail1"]')       //auto-detect XPath: Tag='input' + id="exampleInputEmail1"
  page.locator('xpath=//input[@id="exampleInputEmail1"]')   //normal by_xpath syntax
  page.locator('css=button')                                //normal by_css syntax

  //== PS. it will return all matched results ==
    page.locator('input').first()

  //====================================================


  // =========== user facing locator  ===== 最主要目的是从用户角度来测试 ======== 
    page.getByRole('textbox', {name:"Email"}).first().click()
    page.getByRole('button', {name:"Sign in"}).first().click()

    page.getByLabel('Email').first().click()

    page.getByPlaceholder('Jane Doe').first().click()

    await page.getByText('Using').click()                    // contain 
    await page.getByText('Using the Grid', { exact: true })  // exact match
    await page.getByText(/welcome, [A-Za-z]+$/i)             // Regex match

    await page.getByTestId('SignIn').click()                 // testid must embeded 

    await page.getByTitle('Email').click()

  // ===========================================

  // ==== combined locator ===
  
  // locate child elements
  page.locator('nb-card').getByRole('button',{name:"Sign in"}).first()
  page.locator('nb-card').nth(2).getByTestId('SignIn')  //nth是 第n个元素,其返回值仍是一个DOM块,可以继续往下定位
  page.locator('nb-card nb-radio :text-is("Option 2")')   // 级联定位/ 父tag + 子tag + Text exact match / 等同下一条
  page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")') //更易读，父tag ->子tag ->精确文字匹配
  page.locator('nb-card').getByRole('button',{name:"Sign in"}).first()
  
  // locate parent elements == 通过（子元素）辅助定位来找（父元素）
  page.locator('nb-card',{hasText:"Using"}).getByRole('textbox',{name:"Email"}) //locator函数可以传入object参数 + hasTaxt模糊匹配
  page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}) //用has 传入一个用ID匹配的块
    // === filter 更易读 === 更易理解 其通过（子元素）辅助定位来找（父元素）
  page.locator('nb-card').filter({hasText:"Using"}).getByRole('textbox',{name:"Email"})  // 以上2句的变形，更易读
  page.locator('nb-card').filter({has: page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}) 
  page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText:"Sign"})
      .getByRole('textbox',{name:"Email"})   //Filter可以并联使用，第一个filter运行后是返回一个‘nb-card’的列表，所以可以继续filter
  page.locator(':text-is("Using the Grid")').locator('..')  // locator('..') 代表找当前元素的上一级元素

  //In order to find a web element using a locator method, you can use a text filter or a locator filter, and then chain from this parent element all the child elements that you want to select. 
  //Also, you can alternatively use a filter method that will do exactly the same thing, what is the benefit of using a filter method that you can chain multiple filters one by one, narrowing down your output to the unique element until you get the desired result.
  //==========================================


  // ====== Extract value - Single value ======
  const buttonText= await page.locator('button').textContent()
  expect (buttonText).toEqual('Sign in')
  // ===== Extract all values =====
  const allRadioButtons = await page.locator('nb-radio').allTextContents()   // 存入一个 Array
  expect(allRadioButtons).toContain("Option 2")
  // ===== get input value =====
  const emailValue = page.getByRole('textbox',{name:"Email"}).inputValue()
  // ===== get element attributes =====
  const placeholderList = await page.getByRole('textbox',{name:"Email"}).getAttribute('placeholder') //获得被定位元素的p属性


  // ===== General assertions =====
  const X = page.locator('inputbox').inputValue()
  expect(X).toEqual(5)

  //===== Locator assertions =====
  await expect(page.locator('inputbox')).toHaveText('Submit')  //更智能，会retry，多了一些对元素的操作
  await expect(page.locator('nb-layout-header')).toHaveCSS('background-color','rgb(50,50,90)') //验证背景颜色是否是指定值

  // ===== Soft Assertion / 即使失败也能继续执行下去 ======
  await expect.soft(page.locator('Submit_button')).toHaveText('Submit')  //加入‘soft’关键词,失败时程序会继续往下执行
  await page.locator('Submit_button').click()


    // ===== waiting =====   
  await page.waitForLoadState("load")                             // load / documentloaded / networkidle
  await page.locator('successButton').waitFor({ state:"attached"}) // attached / detached / visible / hidden
  await page.locator('#submit-button').waitFor({ state: 'visible' });  // Wait for the button to become visible
  await page.locator('#submit-button').waitFor({ state: 'visible', timeout: 5000 }); //Wait for visible + timeout
  /*
    1. Playwright performs a range of actionability checks on the elements before making actions to ensure these actions behave as expected. It auto-waits for all the relevant checks to pass and only then performs the requested action. If the required checks do not pass within the given timeout, action fails with the TimeoutError.
      For example, for locator.click(), Playwright will ensure that: locator resolves to an exactly one element is Visible
    2. Playwright has automatic waiting mechanism for the certain conditions to be satisfied, such as attached, visible, stable, receive events, enabled and editable. 
    3. And also playwright has a limited number of the methods that supports this outer waiting. The list of this method you can find here in the playwright documentation. This table provides the method name and what kind of conditions this method will automatically wait on the page to be satisfied. The duration of this wait is defined by the timeout settings. 
    4.If you interacting with the elements that do not support auto waiting, for example 'allTextContents', you can add additional wait to wait for a specific state or you can use alternative waits such as wait for the selector, wait for the response and few others that you can choose that works best for you.
  - https://playwright.dev/docs/actionability 
  */
  // --- Auto waiting ---  Action default timeout 为30秒，在playwright.config.ts中设置,例如click()
                    //--- Expect() default timeout 为5秒
    await page.locator('Submit_button').click()     // click属于会自动等待的功能，它会自动重试，直至超时(30秒)
    await page.locator('.bg-success').textContent()  // textContent()也会自动等待并重试， 小心 allTextContents不会等待

    await expect(page.locator('.bg-success')).toHaveText('Data loaded') //会自动等待，但是 expect()只有5秒
    await expect(page.locator('.bg-success')).toHaveText('Data loaded',{timeout:30000})  // 在命令中强制成30秒

  // --- 对于不会自动等待的功能，需要用变通的方法，在其前面增加可以自动等待的功能 locator.waitFor()
        // attached / detached / visible / hidden
    await page.locator('.bg-success').waitFor({state:"attached"})    //allTextContents不会等待，所以增加一个waitFor在前面
    await page.locator('.bg-success').allTextContents()              //allTextContents不会等待，并且返回为array
                expect(page.locator('.bg-success').allTextContents()).toEqual('Data loaded') // 会failed，因为它是array
                expect(page.locator('.bg-success').allTextContents()).toContain('Data loaded') // 会成功
  // --- 对于不会自动等待的功能，变通方法 2 -- page.waitForXXX()
    // page.waitForLoadState() / page.waitForResponse / page.waitForSelector / page.waitForTimeout /etc..
      // wait for element
    await page.waitForSelector('.bg-success')
      expect(page.locator('.bg-success').allTextContents()).toContain('Data loaded')
      // wait for particular response
    await page.waitForResponse('http://abc.com')   // 填入 发出request的‘header’中的URL， 系统会等待API call返回
      // wait for network call to be completed
    await page.waitForLoadState('load')  // wait until load event to be fired
    await page.waitForLoadState('domcontentloaded')  // wait until DOM contruction to be completed
      // wait for a particular page (when you navigate to a special page)
    await page.waitForURL('http://abc.com') 


  /*  --- Time out --- （有层级关系，且下级timeout不能超过上级）
    1. Global timeout is the time limit of the whole test run.    (default: No timeout)
      2. Test timeout is the time limit for a single test execution.  (default: 30秒)
        3-1. Action timeout      (Ex: click(),fill(),textContent(),etc.. --> no default)
        3-2. Navigation timeout  (Ex: page.goto()                      --> no default)
        3-3. Expect timeout      (Ex: expect(locator).toHaveText()   --> default: 5秒)
  */
    test.setTimeout(10000)      //改 test timeout
    test.slow()                 //将当前设置 timeout X 3
    await page.locator('.bg-success').click( {timeout:15000})   //改action timeout

//================================= < Section 4 - End > ===================================//




//============================== < Section 5 - UI components > ==============================//
  // input field
    const gridEmailInput= page.locator('nb-card').getByRole('textbox',{name:"Email"})
    await gridEmailInput.fill('nwqa@adesa.com')
    await gridEmailInput.clear()
    await gridEmailInput.pressSequentially('nwqa@adesa.com',{delay:1000}) //模拟键盘输入，并可设置延迟每1秒输入一个字符

  // Input assertion
    await expect(gridEmailInput).toHaveValue('nwqa@adesa.com') 
    // or
    const inputValue = await gridEmailInput.inputValue()
    expect(inputValue).toEqual('nwqa@adesa.com')

  // radio button
    const gridForm = page.locator('nb-card',{hasTex:"Using the Grid"});
    await gridForm.getByLabel('Option 1').check()              //选中checkbox和radiobutton中选项
    await gridForm.getByLabel('Option 1').check({force:true})  //有时选项会invisible或被blocked,force参数可绕过可用性检查
    await gridForm.getByRole('radio',{name:"Option 1"}).check();  // 推荐使用getByRole
     // assertion 
    await gridForm.getByLabel('Option 1').isChecked()              //返回布尔值，判断是否已经选中   
    await expect(gridForm.getByLabel('Option 1')).toBeChecked()    // assertion
    expect(await gridForm.getByLabel('Option 1').isChecked()).toBeTruthy()
    expect(await gridForm.getByLabel('Option 2').isChecked()).toBeFalsy()

  // Check Box
    await gridForm.getByText('Modal').click({force:true})   //注意check与click的区别,
    await gridForm.getByText('Modal').check({force:true})   //有时选项会invisible或被blocked,force参数可绕过可用性检查
    await gridForm.getByRole('checkbox',{name:"Hide on click"}).uncheck()  //推荐使用getByRole
    // 遍历所有checkbox子选项
    const allBox = page.getByRole('checkbox')     // uncheck所有checkbox选项
    for (const box of await allBox.all()){
      await box.uncheck({force:true})
    }

  // Dropdown list / listbox
    const dropDownMenu = page.locator('ngx-header nb-select') //在该实例中code中无dropdown，只能用tag的层叠来定位，先找到menu框,见截图
    await dropDownMenu.click()      //会展开下拉菜单

    page.getByRole('list')          //when the list has a 'ul' tag  /在本例中有
    page.getByRole('listitem')      //when the list has 'li' tag    /在本例中就没有，而是‘nb-obtion'

    const optionList= page.getByRole('list').locator('nb-option')   // return array
    const optionList2= page.locator('nb-option-list nb-option')     //这两种写法都可以
    await expect(optionList).toHaveText(["Light","Dark","Cosmic"])    //验证列表选项
    await optionList.filter({hasText:'Dark'}).click()               //选中列表中某选项

    await expect(page.locator('nb-layout-header')).toHaveCSS('background-color','rgb(50,50,90)') //验证背景颜色是否是指定值

  // Tooltip
    const toolTip = page.getByRole('tooltip')             //如果code里面有标出tooltip role，则这种方法最好
    page.locator('nb-card',{hasText:"tooltip placement"}) //在本例中code里无tooltip，只好通过tag再加tooltip的内容来定位
    await toolTip.getByRole('button',{name:"Top"}).hover()
    await page.locator('nb-tooltip').textContent()         //取得tooltip里弹出文字



//============================== < Secion 5 - End > ==============================



//============================== < Secion 6 - Page Object Model > ==============================





//============================== < Secion 6 - End > ==============================



});


