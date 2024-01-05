// **********************************************************
// Multi-level Inheritance
// **********************************************************

console.log('inheritance')

// custom constructor inheritance
// function Circle(radius) {
//   this.radius = radius,
//   this.draw = function() {
//     console.log('draw');
//   }
// }

//  const circle = new Circle(10);

 // each time we call the circle constructor to create a new Circle, we create a new circle object,
 // the constructor will create that object and set it's prototype property to this 'base" prototype
 // think of it as 'circleBase"
 // objects created by a given constructor will have the same prototype
 // all circles, created by the circle constructor will have the same prototype object,
 // similarly, all arrays created by the array constructor will have the same prototype

 // 'circleBase' also has a prototype, 'objectBase'!


// **********************************************************
// Property Descriptions
// **********************************************************

// let person = { name: 'Maria' };
// console.log(person)
// for (let key in person)
//     console.log(key);

// console.log(Object.keys(person)); 

// you'll notice that we cannot iterate over the properties in objectBase, why is this?
// the objectBase properties have attributes that restrict what you are allowed to do
// these attributes are called descriptors, the allow these projects to we writable, enumerable, etc

// let objectBase = Object.getPrototypeOf(person);
// let descriptor = Object.getOwnPropertyDescriptor(objectBase, 'toString');
// console.log(descriptor);

// this shows us the descriptors within the object and their default states
// when we create our own objects, we are allowed to set these for ourselves

// _________________

// typically we use defineProperty to write getters & setters for our objects
//here we will use it to disable the writable descriptor so we cannot change the name property
// the first argument will be the object, second argument is the target property (name), and the last argument is
// an object, which is our descriptor object
// by default all these descriptors are true, meaning anything can be modified/configured

// Object.defineProperty(person, 'name', {
//   writable: false,
//   enumerable: false,
//   configurable: false
// });

// now we have a read-only object! 

// person.name = 'Mosh';

// console.log(person);

// console.log(Object.keys(person));
// enumberable makes it so that keys will show or not show
// now we have no keys in the array of keys

// delete person.name;
// console.log(person);

// setting configurable to false means that we cannot delete any keys form our object
// notice that our name property is still there

// ******************************************************************
//     Constructor Prototypes
// *******************************************************************

// let person = { name: 'Maria' };
// console.log(person);

// Object.getPrototypeOf(person)

// // person.__proto__ (parent of person)

// function Circle(radius) {
//   this.radius = radius;
// }

// const circle = new Circle(1);
// // Constructor.prototype() ie: Circle.prototype()


// // when we use the object literal syntax
// let obj = {};
// // under the hood that translates into a new object
// new Object()
// // the object that the constructor uses to create the new Object() is objectBase (root)

// // lets define an array
// let array = {};

// array.__proto__ (parent of array)
// here we have arrayBase!

// our circle object works in the same way! 
// circle.__proto__ (parent of circle)
// circle.prototype()
// here we have circleBase!


// **************************************
//     Prototype vs Instance Members
// **************************************


// constructor function
// function Circle(radius) {
//   this.radius = radius;

//   this.draw = function() {
//     console.log('draw');
//   }
// }

// two objects
// const c1 = new Circle(1);
// const c2 = new Circle(3);

// it is possible to have may copies of these methods within an application
// this is where prototypical inheritance helps us not overwhelm our memory storage

//we can remove the draw function an put it in the prototypes

//an instance member
// function Circle(radius) {
//   this.radius = radius;

//   this.move = function() {
//     this.draw();
//     console.log('move');
//   }
// };

// // since object methods are dynamic we can add them as we go as below
// // add the draw method to the prototype and you no longer need it in the instance

// // a prototype member
// Circle.prototype.draw = function () {
//   console.log('draw');
// };

// // we can also modify base prototype properties and overwrite their default implementation
// Circle.prototype.toString = function() {
//   return 'Circle with radius ' + this.radius;
// }

// in both of these you can reference each other, just be careful not to create an infinite loop


// *************************************************************
//     Constructor Prototypes
// **************************************************************

function Circle(radius) {
  this.radius = radius;
//instance members
  this.move = function() {
    this.draw();
    console.log('move');
  }
};

// prototype members
Circle.prototype.draw = function () {
  console.log('draw');
};

const c1 = new Circle(1);

// REMEMBER: it does NOT matter when you change the prototype
// you can modify it before you create the object, the draw method will still be available because iof object references


// we can iterate over these properties
// this will only return instance members
console.log(Object.keys(c1));


// returns all members (instance + prototype)
for (let key in c1) console.log(key);
// often you will see instance properties referred to as OWN properties, ex: .hasOwnProperty('draw')

// *************************************************************
//     Avoid Extending Built-in Objects
// **************************************************************

// don't modify objects you don't own!
// here is an example

Array.prototype.shuffle = function() {
  //...
}

const array = [];
array.shuffle();

// here, shuffle is a custom method

// you should not modify built-in object in your JS application (which is what we're doing by adding custom methods to prototypes)
// https://perfectionkills.com/whats-wrong-with-extending-the-dom/
// this is a good article about why

//don't modify objects you don't own!
// in a library there could be methods that rely on what you are modifying