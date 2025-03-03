// relational or comparison operators

// > more than
// < less than
// >= more than or equal
// <= less than or equal

var result = 5.5 >= 5
console.log(result)

// equality operators
var x = 1
console.log(x == '1') // lose comparisison
console.log(x === '1') //strict comparison - compers value and data type

// logical "AND" - '&&'
console.log(true && true) // all values have to be true for expression to be true
console.log(true && false) // one value is false - the expression is false

var ageIsMoreThanEighteen = true
var isUSCitizen = false

var eligibilityForDriversLicense = ageIsMoreThanEighteen && isUSCitizen
console.log(`This customer is eligible for DL ${eligibilityForDriversLicense}`)

// logical "OR" - '||'
console.log(true || false) // any value should be true for the expression to be true

let notWorkingHour = true
let isSunday = false

let shopIsClosed = notWorkingHour || isSunday
console.log('The shop is closed - ' + shopIsClosed)

// logical "NOT" - '!'
console.log(!true)
console.log(6 !== 10)

// increment-decrement +1 or ++ 
let counter = 2
counter ++
console.log(counter)
counter --
console.log(counter)