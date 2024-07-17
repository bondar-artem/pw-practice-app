import { expect } from "playwright/test";
import {test} from "../test-options"


    
test("drag and drop with iframe", async({page, globalsUrl}) =>{
    await page.goto(globalsUrl)

    const frame = page.frameLocator("[rel-title='Photo Manager'] iframe")  //switching to iframe by providing its locator
    await frame.locator("li", {hasText:'High Tatras 2'}).dragTo(frame.locator("#trash"))  //drag To for dragging from one locator to another

    //more precise control
    await frame.locator("li", {hasText:'High Tatras 3'}).hover()
    await page.mouse.down()   //right click and hold
    await frame.locator("#trash").hover()  //hover over locator
    await page.mouse.up() //release the hold on mouse button

    await expect(frame.locator('#trash l1 h5')).toHaveText(["High Tatras 3", "High Tatras 2"])
})