// function Circle(radius) {
//   this.radius = radius;

//   this.draw = function() {
//     console.log('draw');
//   }
// }

// lets rewrite this function using ES6 syntax

// class Circle {
//   // define properties and methods
//   constructor(radius) {
//     // initializes objects
//     // these appear on the object instance
//     this.radius = radius;
//     this.move = function() {}
  // }

  // methods are defined in the body
  // these appear on the prototype (objectBase)
//   draw() {
//     console.log('draw');
//   }
// }

// const c = new Circle(1);

// this looks similar to a c# or Java syntax, but it isn't the same: these are syntactic sugar overtop of constructor functions


// *******************************
//           Hoisting
// *******************************

// there are two ways to define functions: declaration or expression

// Function declaration
// function sayHello () {}

// Function Expression
// const sayGoodbye = function() {};

// convention is that you use a semi-colon at the end of an expression
// like this: const number = 1;

// there is a critical difference between a func declaration & func expression in JS
// func declarations are "hoisted", meaning they are "raised" to the top of the code

// so the function works wether it is called before or after it's declared:
// sayHello();

// function sayHello () {}

// OR

// function sayHello () {}

// sayHello();

//expressions don't work the same way (they aren't hoisted), so this gives us an error
// because sayGoodbye() has not been initialized:

// sayGoodbye();

// function sayHello () {}

// const sayGoodbye = function() {};

// classes are also NOT hoisted

// Class declarations
// class Circle {}

// Class Expression
// const Square = class {};

// class expressions are not commonly used

// ******************************************
//           Static Methods
// ******************************************

// there are two types of methods in oop: static methods and instance methods

// class Circle {
//   constructor(radius) {
//     this.radius = radius;
//   }

//   //Instance method - available on an instance of a class because a class is an object
//   draw() {}

//   static parse(str) {
//     const radius = JSON.parse(str).radius;
//     return new Circle(radius)
//   }
// }

// const circle2 = Circle.parse('{ "radius" : "3" }')
// const circle = new Circle(1);
// console.log(circle2);

// static method - available on the class itself, not the object instance, often used on utility functions that are not specific to a given object


// the Math object comes build into JS and gives us access to quite alot of utility methods (which makes it look like a class)
// for fun, lets say that we want to write our own "Math"

//define a class

// class Math2 {
//   // then define static methods
//   static absolute(value) {
//     //...
//   }

//   static add(value) {
//     // ...
//   }

//   static subtract(value) {
//     // ...
//   }
// }

// now we can access these on the built in class itself

// Math2.absolute
// Math2.add
// Math2.subtract

//these are utility functions that take in and return something


// ******************************************
//           The 'this' Keyword
// ******************************************

// 'use strict'

// //declaring a constructor function
// const Circle = function() {
//   this.draw = function() { console.log(this); }
// }

// const c = new Circle();
// // a method call - calling a method on an object
// c.draw();

// const draw = c.draw;
// // a function call - calling this like a standalone func not part of an object
// draw();
// therefore the 'this' becomes a global reference and global means getting the global object 'window'
// there is some thing known as strict mode. this changes the way 'this' functions
// when in use it will restrict access to the global window, you will see an undefined int he console

// by default, classes are executed in strict mode

// class Circle {
//   draw() {
//     console.log(this)
//   }
// }

// const c = new Circle();
// const draw = c.draw;
// draw();

// so we also get an undefined when this runs

// *****************************************************
//           Private Members using Symbols
// *****************************************************

class Circle {
    constructor(radius) {
      this._radius = radius;
    }
}

const c = new Circle(1);