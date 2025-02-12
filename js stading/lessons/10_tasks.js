// Write a logic of the function based on these conditions:
// if familySize is four or less and the planned distance to drive is less than 200 miles, the function should return "Tesla"
// if familySize is four or less and the planned distance to drive is 200 or more, the function should return "Toyota Camry"
// if familySize is more than four, the function should return "Minivan"

// let familySize = 2
// let distanceToDrive = 100

function recommendedCar(){
    let familySize = 2;
    let distanceToDrive = 100;
    if(familySize <= 4 && distanceToDrive < 200){
       return "Tesla"
    } else if(familySize <= 4 && distanceToDrive >= 200){
       return "Toyota Camry"
    } else{
       return "Minivan"
    }
}
console.log(recommendedCar())


let age = 15
// function checkAge(age) {
//     if (age > 18) {
//       return true;
//     } else {
//       return 'perents permition';
//     }
//   }

//   function checkAge(){
//     return (age > 18) ? true : 'perents permition'
//   }

function checkAge(){
     return (age > 18) || 'perents permition'
    }

console.log(checkAge())

// Write a JavaScript function to check if given string includes given symbol.
function includesSymbol(){
    let string = 'Hello world!&';
    return string.includes('&') ? "includes symbol" : "doesn't include symbol"
}
console.log(includesSymbol())

// Write a JavaScript function to check whether a string is blank or not (string with spaces should be also blank)
function isBlank(){
    let string = 'Hello world!'
    if(typeof string == 'undefined' || !string || string.length === 0 || string === "" || string.includes(" ")){
        return "string is blank";
    } else return "string is not blank"
}
console.log(isBlank())
 
// Write a JavaScript function to convert a string in abbreviated form. console.log(abbrev (“German Beno")) – should be “G.B.” (should convert lower case names to upper)
function convertIntoAbbreviation(name){
    return name
    .toUpperCase()
    .split (" ")
    .map(word =>word[0])
    .join(".") + "."
}
console.log(convertIntoAbbreviation('amanda White'))
console.log(convertIntoAbbreviation('tery nest'))
 
// Write a JavaScript function with conditional statement to sort three numbers.

function numbersSort(){
    let numbers = [60, 3, 500]
    return numbers.sort((a,b) => a-b)
}
console.log(numbersSort())

function sortNumbers(a, b, c){
    let min, mid, max
    if(a < b && a < c){
        min = a;
        mid = b < c ? b : c;
        max = b < c ? c : b;
    } else if (b < a && b < c){
        min = b;
        mid = a < c ? a : c;
        max = a < c ? c : a;
    } else {
        min = c;
        mid = a < b ? a : b;
        max = a < b ? b : a;
    }
    return [min, mid, max]
}
console.log(sortNumbers(3, 5, 1));
console.log(sortNumbers(3, 1, 2));
console.log(sortNumbers(3, 15, 6))