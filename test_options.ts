import {test as base} from '@playwright/test';
import {PageManager} from '../pw-practice-app/page-objects/page-manager';

export type TestOptions = {
    globalsQAURL: string
    formLayoutsPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQAURL: ['', {option: true}],

    formLayoutsPage: [async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
    }, {auto: true}],

    pageManager: async({page}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    } 
})