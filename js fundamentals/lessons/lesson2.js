//Concantination and interpolation
var price = 80
var itemName = "Table"
var messageToPrint1 = "The price for your "+itemName+" is "+price+" dollars"  //concatination
var messageToPrint2 = `The price for your ${itemName} is ${price} dollars` //interpolation
console.log(messageToPrint1)
console.log(messageToPrint2)