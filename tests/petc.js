const Person = require("./c1")

class Pet extends Person
{
    get location()
    {
        return "Bluecross"
    }
    constructor (fn,ln){
        super(fn,ln)
    }
}

let npet =new Pet("ed","i9")
npet.fullName()
console.log(npet.location)