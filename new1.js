//import Person from './c1';
const Person = require('./test/c1/')

//console.log ("edd") ;
// comments to write in a single line
/* test
in
*/
/*let a = 4;
console.log(typeof(a));
let required = true ;
console.log(!required)
let b =2.3;

let c= 'str';
console.log(c)
 c=a+b;
console.log(c)*/

const person = new Person("1name","2name")
console.log (person.fullName())