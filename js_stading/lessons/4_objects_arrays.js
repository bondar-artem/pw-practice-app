//objects

var customer = {
    firstName: 'John',
    lastName: 'Smith',
    cars: ["Volvo", "Toyota", "BMW"]
}
console.log(customer)

console.log(customer.firstName)
console.log(customer.lastName)

console.log(customer.cars)
console.log(customer.cars[0])

console.log(`${customer.firstName} ${customer.lastName}`)

//dot notation
customer.firstName = 'Mike'

// bracket notation
customer['lastName'] = 'Silver'

console.log(customer['firstName'])
console.log(customer['lastName'])

// arrays
var car = ["Volvo", "Toyota", "BMW"] // paticular order, indexes [0,1,2]
console.log(car[2])
car [2] = "Jaguar"
console.log(car[2])