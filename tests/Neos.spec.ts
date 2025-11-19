import {expect, test} from '@playwright/test'

test.setTimeout(60000);

test.beforeEach(async({page}) => {
    await page.goto('https://qa.neos-cloud.com/dashboard/', { waitUntil: 'load'});

    //enter Company ID
    test.setTimeout(60000);
    await page.getByText('Company ID').waitFor();
    await page.getByText('Company ID').click();
    await page.fill('#login-loginForm-company', 'qa');

    //Enter Username
    await page.getByText('Username/Email').waitFor(); 
    await page.getByText('Username').click();
    await page.fill('#login-loginForm-username', 'abdur');

    //Enter Password
    await page.getByText('Password', {exact:true}).waitFor();
    await page.getByText('Password', {exact:true}).click();
    await page.fill('#login-loginForm-password', 'Hello123!');
    
    //Click Submit

    page.locator('#login-loginForm-submit')
    await page.getByTestId('primary-standard').click();

    await page.waitForLoadState('domcontentloaded')
    
})

test('SettingsPage', async({page}) => {
    test.setTimeout(60000);
    
    await page.locator('#mainMenus-leftNav-settings').click();

    //Directory Editors 
    page.locator(':text-is("Case Types")')
    page.locator(':text-is("Document Types")')
    page.locator(':text-is("Dynamic Layouts")')
    page.locator(':text-is("User Mini Directories")')
    page.locator(':text-is("Mini Directories")')
    page.locator(':text-is("Auxiliary Checklist")')
    page.locator(':text-is("Companion Groups")')
    page.locator(':text-is("Mailing Lists")')
    page.locator(':text-is("Provider Associations")')
    page.locator(':text-is("Templates")')
    page.locator(':text-is("Firm Preferences")')
    page.locator(':text-is("AI Tags")')
    page.locator(':text-is("AI Prompts")')
    

    ////User Defined -- using text as is 
    page.locator(':text-is("Case Fields")')
    page.locator(':text-is("Layout Manager")')
    page.locator(':text-is("Intake Layout Manager")')
    page.locator(':text-is("Dynamic Layout Editor")')
    page.locator(':text-is("Intake Settings")')
    page.locator(':text-is("Workflow Automations")')

    //Staff -- using ID
    page.locator('("#settingsPage-staff-staffProfiles")')
    page.locator('("#settingsPage-staff-staffGroups")')
    page.locator('("#settingsPage-staff-permissionGroups")')
 
    //Misc -- using data icon type
    page.locator('[data-icon-type="google-circles-extended"]'); //integrations
    page.locator('[data-icon-type="transfer"]'); //case tab migration
    page.locator('[data-icon-type="police-badge-outline"]'); //testingExtension
    
})

test('Case Type Settings', async({page}) => {
    test.setTimeout(60000);

    await page.locator('#mainMenus-leftNav-settings').click();
    await page.locator('#settingsPage-directoryEditors-caseTypes').click();

    //back arrow
    await page.locator('button.bp3-button.bp3-minimal').first().click();

})

test('Document Type Settings', async ({page}) => {
    //test.setTimeout();

    await page.locator('#mainMenus-leftNav-settings').click();
    await page.locator('#settingsPage-directoryEditors-documentTypes').click();

    //add button
    await page.locator('.bp3-icon.bp3-icon-plus').click();

    await page.locator('input[name="Title"]').fill('Test Title in Playwright'); //enter Title

    await page.locator('input[name="Description"]').fill('Test Description with Playwright') //Enter Description

    await page.locator('button[name="Save"]').click();

   

    //back arrow
    //await page.locator('button.bp3-button.bp3-minimal').first().click();

})

