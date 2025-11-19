import {test as base} from '@playwright/test'
import { PageManager } from '../pw-practice-app/pageobjects/pageManager'

export type testoptions =  {
    globalQAURL: string
    formLayoutPage: string
    pageManager: PageManager
}

export const test = base.extend<testoptions>({
    globalQAURL: ['', {option: true}],

    formLayoutPage: async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        console.log('Tear Down')     
    },

    pageManager: async ({page, formLayoutPage}, use) => { // to use dependencies 
        const pm = new PageManager(page)
        await use(pm)
    }
 })