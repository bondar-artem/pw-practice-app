//Loops
console.log("Hello WOrld")

//Code example
/*for(statment1; statment2; statment3){

}*/

// for Loop  statment how long wthat to do after cycle
for( let i = 0; i<5; i++){
    console.log("Hello WOrld" +i)
}

var cars = ["volvo", "toyota", "bmw"]
//for of loop
for(let car of cars){
    console.log(car)
    if(car== "toyota"){
        break
    }
}

// Es6 syntax for each loop
cars.forEach(car=>{
    console.log(car)
})