var firstName = "John"
const occupation = "Driver"

var city = "New York" 
var postCode = 3564 

// concatination
var text = "Welcome "+firstName+" we are happy that you will be working with us as a "+occupation+"!"
console.log(text)

var messageToPrint = "The most polluted city is "+city+", "+postCode
console.log(messageToPrint)

// interpolation
var text2 = `Welcome ${firstName} we are happy that you will be working with us as a ${occupation}!`
console.log(text2)

var messageToPrint2 = `The most polluted city is ${city}, ${postCode}`
console.log(messageToPrint2)