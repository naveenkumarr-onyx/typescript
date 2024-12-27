
// let w:any = 1
// w = "unknown";

// const names:string[]=[]
// names.push(w)
// console.log(names) // ["unknown"]


// const num = [1,2,3,4,5,6,7,8,9]
// num.push(8)
// console.log([...new Set(num)])

// //tuples
// const graph: [x:number, y:number, z:number] =[55,11,21]
// const [x,y,z] = graph
// console.log("graph",graph)

// //index signature
// const sign:{[index:string]:number} ={}
// sign.jack = 25
// sign.mark = 45

// //enums

// enum StatusCodes {
//   NotFound = 404,
//   Success = 200,
//   Accepted = 202,
//   BadRequest = 400
// }
// console.log("StatusCodes", StatusCodes.NotFound)

// //TypeScript Type Aliases and Interfaces

// // 1. Aliases
// type CarYear = number;
// type CarMonth = number;
// type CarDay = string;

// type Car = {
//     year : CarYear,
//     month: CarMonth,
//     day: CarDay
// }
// const carYear:CarYear = 2001
// const carMonth:CarMonth = 1
// const carDay:CarDay = "Monday"

// const car: Car={
//     year: carYear,
//     month: carMonth,
//     day: carDay
// }


// //2. Interface
// interface Rectangle{
//     height : number,
//     width : number
// }

// interface AddRectangle extends Rectangle{
//     breath : number
// }

// const maths:AddRectangle = {
//     height: 5,
//     width: 10,
//     breath: 10
// }

// console.log("maths",maths)

// // Union

// function statusCode(x:string|number){
//     if(typeof x === "string"){
//         return Number(x)
//     }
//     return "Not implemented"
// }

// // console.log("statusCode", statusCode(200))



// // Void
// function greet():void{
//     console.log("Hello World")
// }

// // casting

// let hel:unknown="hello "
// console.log((hel as string).length)


// // Constraint using interface with extends

// interface HasLength{
//     length : number
// }

// function logWithLength(value:HasLength){
//     return console.log(`Length ${value}`)
// }


// logWithLength("Hello World")


// const obj : HasLength = {
//     length: 2
// }

// console.log(obj)


// console.log("Hello World")