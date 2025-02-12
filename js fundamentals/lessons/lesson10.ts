var customerFIrtsName: string = "John"
var customerLastName: string = "Smith"
var customerAge: number = 45

type Customer = {firstName: string, lastNAme: string, active: Boolean}

var firstCustomer: Customer = {
firstName: "Mary",
lastNAme: "JOhn",
active: true
}


//Just variables example
//let familySize = 2;
//let plannedDistanceToDrive = 100

function recommendedCar(familySize, plannedDistanceToDrive) {
    if (familySize <= 4 && plannedDistanceToDrive < 200){
        return ("Tesla")
    } else if (familySize <= 4 && plannedDistanceToDrive >= 200){
        return ("Toyota Camry")
    } else if (familySize > 4){
        return ("Minivan")
    }
    }
    
    let result = recommendedCar(5,100)
    console.log(result)





