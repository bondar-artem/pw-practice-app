/* 
if(condition){
   some code 
} else {
   some code
}
*/

let hour = 9

if(hour >= 6 && hour < 12){
    console.log('Good Morning')
} else if(hour >= 12 && hour < 18){
    console.log('Good Afternoon')
} else if(hour >= 18 && hour < 22){
    console.log('Good Evening')
} else {
    console.log('Good Night')
}

let hasDriverLicens = true
let isUSCitizen = false

if(hasDriverLicens && isUSCitizen){
    console.log('Customer can rent a car')
} else if(hasDriverLicens){
    console.log('Customer needs to buy an insurance')
} else{
    console.log('Customer cannot rent a car')
}

let ESMAScript = false
if(ESMAScript){
    console.log('Correct')
} else{
    console.log('Incorrect')
}

let accessAllowed
let age = 18

if(age >= 18) {
    accessAllowed = true
} else {
    accessAllowed = false
}
console.log(accessAllowed)

// ternary operator
accessAllowed = (age >= 18) ? true : false
console.log(accessAllowed)

let amount =  100

let message = (amount < 5) ? 'No discount' : (
(amount < 20) ? '10% discount': (
(amount < 50) ? '20% discount': (
(amount > 50 && amount < 100) ? '30% discount' :
'50% discount')));
console.log(message)
