//Declarative function can be called in any moment
function helloOne(){
    console.log('Hello one!')
}
helloOne()

//Anoynimus function
var helloTwo = function(){
    console.log('Hello two!')
}
helloTwo()

//ES6 function or arrow function
var helloThree = () =>{
    console.log('Hello three!')
}
helloThree()

//Function with arguments
function printName(name, lastName){
console.log(name + ' '+ lastName)
}
printName('John', 'Igor')

//Functions with return
function multiplyByTwo(number){
    var reuslt = number * 2
    return reuslt
}
var myResult = multiplyByTwo(10)
console.log(myResult)

//Import function
import {printAge} from '../helpers/printHelper.js'
printAge(5)


//import everuthing
import * as helper from '../helpers/printHelper.js'
helper.printAge(10)