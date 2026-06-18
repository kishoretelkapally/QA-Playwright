module.exports = class Person
{
 age = 25
 get location()
 {
    return "cana"
 }

 constructor (fn,ln)
 {
    this.fn=fn
    this.ln=ln
 }

 fullName()
 {
    console.log(this.fn+this.ln)
 }

}

/* person = new Person( "testfn","lastfn")
console.log(person.age)
console.log(person.location)
console.log(person.fullname())
let person1 = new Person( "test1fn","last1fn")
console.log(person1.fullname())*/