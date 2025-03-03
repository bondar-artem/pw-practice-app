export function printAge(age){
    console.log(age)
}

export class CustomerDetails {
    printFirstName(firstName){
        console.log(firstName)
    }

    printLastName(lastName){
        console.log(lastName)
    }
}

class AvailableCars{
    printCarMark(carMark){
        console.log(carMark)
    }
    printCarModel(carModel){
        console.log(carModel)
    }
    printCarYear(carYear){
        console.log(carYear)
    }
}
export const availableCars = new AvailableCars()