// declerative function
function helloOne(){
    console.log('Hello one')
}
helloOne() // can be declared before function

// anoymus function
let helloTwo = function(){
    console.log('Hello two')
}
helloTwo()

// ES6 syntax or arrow function
let helloThree = () => {
    console.log('Hello three')
}
helloThree()

// function with arguments
function printName(name, lastName){
    console.log(name + ' ' + lastName)
}
printName('Mike', 'Kirby')

// function with return
function multiplyByTwo(number){
    let result = number * 2
    return result
}
let myResult = multiplyByTwo(5)
console.log(myResult)

// immport function
import { printAge } from '../helpers/lessonsHelpers.js'
printAge(25)

// import everything 
import * as helper from '../helpers/lessonsHelpers.js'
helper.printAge(10)