let person = {
    age : 25,
    firstname : "add one",
    secondname : "test in last",
    fullName : function ()
    {
        console.log(this.firstname+this.secondname)
    }
}

//console.log(person.age)
//console.log(person.firstname)
//console.log(person.secondname)
console.log(person.fullName())