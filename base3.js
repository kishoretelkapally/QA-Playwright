/*for ( let k=1;k<=10;k++)
{
    if (k%2==0 && k%5==0)
        console.log(k)
}
let a =0 
for ( let k=1;k<=10;k++)
{
    if (k%2==0 || k%5==0)
       {
         a++;
console.log("value of a ",a)
if (a>6){ break}
       } 
}*/

/* var marks =[10,12,202,39,29,39,49]
console.log (marks[3])
marks[3]=9;
console.log(marks[3])
console.log(marks.length)
marks.push(66)
console.log(marks)
marks.pop();
console.log(marks)
marks.unshift(11)
console.log(marks)
console.log(marks.indexOf(9))
submarks = marks.slice(2,5)
console.log(submarks)
console.log(submarks.includes(120))
var sum = 0
for (let i=0;i<marks.length;i++)
{
    sum =sum+marks[i]
    console.log(sum)
}
console.log("sum of th elemnts in array",sum)
let total = marks.reduce((sum,mark)=>sum+mark,0)
console.log ("reduce gives total",total)
*/
/*var scores = [12,13,14,15,16]
var evenscores=[];
for (let k =0;k<scores.length;k++){
 if (scores[k]%2==0){
    evenscores.push(scores[k])
 }
}
console.log("evenscore array",evenscores)
let newarray = scores.filter(score=>score%2==0)
console.log("filter results",newarray)
let nmaparray=newarray.map(score=>score*3)
console.log("triple of new array",nmaparray)
let finalval = nmaparray.reduce((val,total)=>val+total,0)
console.log(finalval)

var scores1 = [23,12,13,14,22,15,18,16]
console.log(scores1.sort())
console.log(scores1.reverse())

let total = scores1.filter(s=>s%2==0).map(triple=>triple*3).reduce((t,v)=>t+v,0)
console.log("total of array values",total)
*/

var scores1 = [23,2,13,14,20,12,22,16]
console.log(scores1.sort((a,b)=>a-b))
console.log(scores1.sort((a,b)=>b-a))