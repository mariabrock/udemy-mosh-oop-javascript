// *************************************************************
//                    Prototypical Inheritance
// **************************************************************


// function Circle(radius) {
//   this.radius = radius;
// }

// Circle.prototype.draw = function() {
//   console.log('draw');
// }

// Circle.prototype.duplicate = function() {
//   console.log('duplicate');
// }


//lets say we want to add a Square object to this setup. We already know it will also utilize a duplicate()
// we DON'T want to duplicate code
// we will utilize inheritance to have Circle and Square inherit from a Shape object

// function Shape() {}

// Shape.prototype.duplicate = function() {
//   console.log('duplicate');
// }

// then we define new objects
// const s = new Shape();
// const c = new Circle(1);

// now our duplicate method isn't on circle, it's on Shape & they are both inheriting from objectBase
// but how does Circle inherit from Shape?
// REMEMBER: circleBase = Circle.prototype; shapeBase = SHape.prototype; objectBase = root

//JS has given is a method for creating a new object from a prototype. this is object.create()
// we pass an argument that is an object

//  Object.create(Shape.prototype)

// we reset Circle.prototype here:

// Circle.prototype = Object.create(Shape.prototype);
// whereas before this was what was implicit/default:
// Circle.prototype = Object.create(Object.prototype); --> this is objectBase - implicit relationship

//now in the console, we see shape inherit's from shapeBase, and shapeBase inherits from objectBase,
//next, we see circle inherits from circleBase, and circleBase inherits from shapeBase
// here you have prototypical inheritance in action!

// *************************************************************
//                    Constructors/Super Constructors
// **************************************************************

// in JS, each object has a constructor property that returns the function that was used to construct or create that object
// so technically we can do this:
// new Circle.prototype.constructor(1)
// this expression is equivalent to:
// new Circle(1)
//we use this one because it's shorter and cleaner, but if you want to dynamically create an object based on the constructor function, you can access the prototype directly
// we will not see the constructor func in the Circle object, but will find it in the prototype
// it should now return SHape and not Circle, because we reset the prototype of our Circle
// a best practice when you rest the prototype is to also rest the constructor function:

// Circle.prototype = Object.create(Shape.prototype);
// Circle.prototype.constructor = Circle;

// now we'll modify the Shape and add a color parameter

// function Shape(color) {
//   this.color = color;
// }

// Shape.prototype.duplicate = function() {
//   console.log('duplicate');
// }

//from an inheritance POV we should have a color property and it should be initialized at the time of creating a circle. How do we do this?
// in the circle constructor we should call the Shape constructor
//here is the wrong way to do this:

// function Circle(radius, color) {
//     Shape(color);

//   this.radius = radius;
// }

// Circle.prototype.draw = function() {
//   console.log('draw');
// }

// const s = new Shape();
// const c = new Circle(1, 'red');

// this will not give you the color property because of 'this' being a global object
// our Shape function is called and it's 'this' points to a global object, in our case, the window, not on the new instance of our Circle
// here's the correct way:

// function Circle(radius, color) {
//   Shape.call(this, color);

// this.radius = radius;
// }

// Circle.prototype.draw = function() {
// console.log('draw');
// }

// const s = new Shape();
// const c = new Circle(1, 'red');

// this method of adding a parameter is known as 'calling the super constructor'

// *************************************************************
//               Intermediate Function Inheritance
// **************************************************************

// function Shape(color) {
//   this.color = color;
// }

// Shape.prototype.duplicate = function() {
//   console.log('duplicate');
// }

// function extend(Child, Parent) {
//   Child.prototype = Object.create(Parent.prototype);
//   Child.prototype.constructor = Child;
// }
// now we have encapsulated the logic we want to use over and over again


// now our inheritance chan is set up properly, so let's make our Square now

// function Square(size) {
//   this.size = size;
// }

// extend(Square, Shape)

// Square.prototype = Object.create(Shape.prototype);
// Square.prototype.constructor = Square;
// this is more noise, more repetitive code, and we'll have more object to define leading to more possible mistakes
// let's define a function that we can actually reuse, the extend()


// function Circle(radius, color) {
//   Shape.call(this, color);

// this.radius = radius;
// }

// extend(Circle, Shape)

// Circle.prototype.draw = function() {
// console.log('draw');
// }

// const s = new Shape();
// const c = new Circle(1, 'red');

// the extend function ius what is called "intermediate function inheritance"

// *************************************************************
//               Method Overriding
// **************************************************************

function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}

function Shape() {
  //a simple constructor
}

Shape.prototype.duplicate = function() {
  console.log('duplicate');
  // a function added to the object
}

function Circle() {
  // a constructor function
}

extend(Circle, Shape);
// circle inherits from shape

Circle.prototype.duplicate = function() {
  Shape.prototype.duplicate.call();
// maybe we want to call the orig implementation plus the modified version
// to do this, we use the above to call it like a regular function
  console.log('duplicate circle');
  // place this after the extend so that it overrides the default, otherwise you won't see any of this
}

const c = new Circle();
// create a new Circle object

// sometimes a defined implementation in a parent object isn't ideal in one specific child object
// this can be changes through method overriding - overriding a method defined in the baseObject

// *************************************************************
//               Method Overriding
// **************************************************************