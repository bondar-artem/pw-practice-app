import{Page, expect} from '@playwright/test'
import{NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage } from '../page-objects/formLayoutsPage'
import{DatePicker} from '../page-objects/datePickerPage'

export class PageManager{
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datePickerPage: DatePicker

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datePickerPage = new DatePicker(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }
    onFormLayoutsPage(){
        return this.formLayoutsPage
    }
    onDatePickerPage(){
        return this.datePickerPage
    }
}