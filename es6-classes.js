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

// more abstraction
// sometimes you'll see an underscore in front of a supposed private property
// however, this is a code convention but does not actually abstract the property in any way, another developer could still access it and change things

// class Circle {
//     constructor(radius) {
//       this._radius = radius;
//     }
// }

// const c = new Circle(1);

// we want to hide something from the outside, so if they are changed we want that change limited too within the oject itself
// no details leaking to the outside. this is not a reccommended approach
// in ES6 we have a new type, called Symbol(), that we can use to help us abstract

// const _radius = Symbol();

// class Circle {
//   constructor(radius) {
//     this._radius = radius;
//   }
// }

// const c = new Circle(1);

//this is NOT a constructor function, we can't use new on it
// if you compare Symbol to another Symbol, they are not ===!
// this means that each Symbol is given it's own unique value, therefore we can use symbols to replace our property name
// symbols can be used for property names instead of strings, so these two are functionally the same:
// this.radius = radius;
// this[_radius] = radius;

// lets change our constructor and see what happens

// const _radius = Symbol();
// const _draw = Symbol();

// class Circle {
//   constructor(radius) {
//     this[_radius] = radius;
//   }

//   [_draw]() {
//     // we can do this with methods too!
//   }
// }

// const c = new Circle(1);

//you'll see Symbol() replace the property name, but the property isn't accessible to be changed


// *****************************************************
//           Private Members using WeakMaps
// *****************************************************

// there's another new type in ES6 called weakMaps
// these are dictionaries where keys are objects and the value can be anything
// the keys are weak, if there are no references to them, JS will garbage collect them

// const _radius = new WeakMap();
// class Circle {
//   constructor(radius) {
//     // this.radius = radius;
//     // we don't declare properties in this instance
//     // we can call set() on this key map, and then we have to pass an object
//     // {this} represents the instance of Circle object, add the property reference
//      _radius.set(this, radius)
//   }
// }

// const c = new Circle(1);

// now we don't see anything on the object when we call it
// but what if we want to call this property somewhere? say in a method within our object?

// const _radius = new WeakMap();
// const _move = new WeakMap();
// class Circle {
//   constructor(radius) {

//      _radius.set(this, radius)

//      _move.set(this, function() {
//       console.log('move', this);
//       // this is to show what move means in context
//      })
//   }

//   draw() {
//     // lets say we want to call the private method here in the public method
//     _move.get(this)()
//     console.log('draw'); //to help us see what's going on
//     // console.log(_radius.get(this));
//   }
// }

// const c = new Circle(1);

// we can also define private methods such as the _move()

// "this" initially comes back as undefined because classes execute in strict mode
// but what if we really want to access the instance of Circle here? we can! we have to use an arrow function instead of a regular func
// arrow funcs use the 'this' value of their containing function

// const _radius = new WeakMap();
// const _move = new WeakMap();
// class Circle {
//   constructor(radius) {

//      _radius.set(this, radius)

//      _move.set(this, () => {
//       console.log('move', this);
//       // this will now inherit circleObject and will not rebound
//      })
//   }

//   draw() {
//     _move.get(this)()
//     console.log('draw'); //to help us see what's going on
//   }
// }

// const c = new Circle(1);

// but why are we using separate weakMaps instead of making it on large map?
// because it puts them all in once large object, which is clunky and a bit polluted


// *****************************************************
//                   Getters & Setters
// *****************************************************

// const _radius = new WeakMap();

// class Circle {
//   constructor(radius) {
//      _radius.set(this, radius)
//   }

//   // getRadius() {
//   //   return _radius.get(this)
//   // }

//   get radius() {
//     return _radius.get(this);
//   }

//   set radius(value) {
//     if (value <= 0) throw new Error('invalid radius');
//     _radius.set(this, value);
//   }
// }

// const c = new Circle(1);

// we have defined a private property, but we want to read it, not change it from the outside
//we'll add a function getRadius()
// but to access it, we have to call it like a function, why can't we access it just by the property name?
// we can read it like a prop with getter and setter functions

// *****************************************************
//                   Inheritance
// *****************************************************

//// how do we implement inheritance with ES6?
// class Shape {
// constructor(color) {
//   this.color = color;
// }
// // lets add a color to the shapeBase if we need it, and we will add it to our circle
//   move() {
//     console.log('move');
//   }
// }
// // the extends syntax!
// class Circle extends Shape {
// constructor(color, radius) {
//   super(color);
//   //once this is done, you can other properties as needed
//   this.radius = radius;
// }
// // if you add a constructor in the derived class you MUST call super()--the super constructor--to initialize the base object
//   draw() {
//     console.log('draw');
//   }
// }

// const c = new Circle('dark-cyan', 5);

// we no longer have to manually reassign our object constructor


// *****************************************************
//                   Method Overriding
// *****************************************************

// remember: this is when we have a method in the objectBase, but we want to implement it differently in our derived object

class Shape {
  move() {
    console.log('move');
  }
}

class Circle extends Shape {
  move() {
    super.move();
    console.log('circle move');
  }
}

const c = new Circle();

// when we inspect the Circle object you will see two move methods: once for Circle, and one for Shape
// because the JS engine walks up the inheritance tree from the child to the parent, the Circle move() is accessible first
// what if we want to use some of the original move() functionality though?
// we can call it with the super() keyword!