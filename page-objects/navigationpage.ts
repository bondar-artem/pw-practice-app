import{Locator, Page} from "@playwright/test"
import { HelperBase } from "./helperbase"

export class NavigationPage extends HelperBase{   //always export class and start Class names by capital letters
    readonly page: Page

    readonly formLayoutsMenuItem: Locator   
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly toolTipMenuItem: Locator

    constructor(page: Page){
        super(page)
        // this.formLayoutsMenuItem =  this.page.getByText("Form layouts")   //locators stored inside a constructor with their values assigned to fields
        // this.datePickerMenuItem =  this.page.getByText("Datepicker")
        // this.smartTableMenuItem =  this.page.getByText("Smart Table")
        // this.toolTipMenuItem =  this.page.getByText("Tooltip")
        // this.toastrMenuItem =  this.page.getByText("Toastr")

    }

    async formLayoutsPage (){  //method
        await this.selectGroupMenuItem("Forms")   //private method below being called here
        await this.formLayoutsMenuItem.click() //use 'this' fixture instance of the page
        await this.waitForNumberOfSeconds(2)
    }
    async datePickerPage (){
        await this.selectGroupMenuItem("Forms")
        await this.page.waitForTimeout(1000)
        await  this.datePickerMenuItem .click() //locator fields in the constructor called in the functional methods
    
    }
    async SmartTablePage (){
        await this.selectGroupMenuItem("Tables & Data")
        await  this.smartTableMenuItem.click() 
    }
    async toolTipsPage (){
        await this.selectGroupMenuItem("Modal & Overlays")
        await this.toolTipMenuItem.click()  
    }
    async toastrPage (){
        await this.selectGroupMenuItem("Modal & Overlays")
        await this.toastrMenuItem.click()  
    }
    private async selectGroupMenuItem(groupItemTitle: string){   //private to be used only on above method
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedMenu  =await groupMenuItem.getAttribute("aria-expanded")
        if(expandedMenu == "false")        //checkif menu is collapsed and click expand
            await groupMenuItem.click()
    }
}