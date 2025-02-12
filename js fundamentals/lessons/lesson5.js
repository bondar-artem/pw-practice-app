// LOgical "AND"
console.log(true && true) //all values have to be TRUE for expression to be TRUE

// Logical "OR"
console.log( true || false) //any values have to be TRUE for expression to be TRUE

var  ageISMoreThanEghteen = false
var isUSCitizen = true

var eligibilityForDriverLicanse = ageISMoreThanEghteen || isUSCitizen
console.log(`This customer is eligible for DL: ${eligibilityForDriverLicanse}`)

//Logical NOT
console.log(!true)
console.log(6 !== 10)