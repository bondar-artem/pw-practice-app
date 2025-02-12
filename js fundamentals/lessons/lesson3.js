//Object
var customer = {
    firstName: 'John',
    lastName: 'Smith',
    cars:["volvo", "toyota", "bmw"]
}
//Dot notation
customer.firstName = "Mike"
// Bracket notation
customer["lastName"] = "Silver"
console.log(customer.firstName)
console.log(customer["lastName"])
console.log(`${customer.firstName} ${customer.lastName}`)

//arrays
var car = ["volvo", "toyota", "bmw"]
car[2]= "TEsla"
console.log(customer.cars[2])
