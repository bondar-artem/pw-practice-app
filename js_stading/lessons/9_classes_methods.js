import { CustomerDetails } from "../helpers/lessonsHelpers.js";
import { availableCars } from "../helpers/lessonsHelpers.js";


let customerDetails = new CustomerDetails() // can be moved to helpers as a const as for availableCars
customerDetails.printFirstName('Tery')
customerDetails.printLastName('Snow')

availableCars.printCarMark('BMW')
availableCars.printCarModel('X5')
availableCars.printCarYear(2019)