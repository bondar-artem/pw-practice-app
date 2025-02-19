//for(beginning; condition; step) {}

// for i loop - ES5 syntax
for(let i=1; i<=5; i++){
    console.log('operation is done '+i)
}

// for of loop
let cars = ['Volvo', 'Toyota', 'BMW', 'Tesla']
for(let car of cars){
    console.log(car)
    if(car == 'BMW'){break} // break the loop
}

// ES6 syntax for each loop
cars.forEach( car => {
    console.log(car)
})

// while(condition) {}

let i = 5
while(i) {
    console.log(i)
    i--
}

// do while
let a = 0
do {
    console.log(a) 
    a++ 
} while (a < 3)

// switch
/*switch(x) {
    case 'value1':
        ...
        [break] - optional if there is no break conditions are done one by one till break
    case 'value2':
        ...
        [break]
    default:
        ...
        [break]
} */

let b = 2
switch (b) {
    case 3:
        console.log('b = 3')
        break
    case 4:
        console.log('b = 4')
        break
    case 5:
        console.log('b = 5')
        break
    default:
        console.log ('b not 3, 4, 5')
}