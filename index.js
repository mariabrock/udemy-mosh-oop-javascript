
// object literal
// const circle = {
//   radius: 1,
//   location: {
//     x: 1,
//     y:1
//   },
//   draw: function() {
//     console.log('draw');
//   }
// };
// circle.draw();

// *****************************
// factory/constructor obj/func
// *****************************

// factory/constructor function - when an object needs one for more methods

// function createCircle(radius) {
//   return {
//     radius,
//     draw: function() {
//       console.log('draw');
//     }
//   }
// }

// const circle = createCircle(1);
// // circle.draw();

// // constructor function

// function Circle(radius) {
//   // console.log('this', this)
//   this.radius = radius,
//   this.draw = function() {
//     console.log('draw');
//   }
// }

//  const another = new Circle(1);

// constructors should be uppercase (like a C# class) but this one is a func
// the new operator creates an empty object, then sets 'this' to point to that empty object
// this by default points to the global browser object of 'window'
// when 'new' is called 3 things happen, create empty objects, this points to that object, then it returns that object
// if the func has a return, it's a factory func, if it uses 'this' and 'new', it's a constructor func
// most people prefer one over the other

// ***************************
// the constructor property
// ***************************

// object constructor func
//  let x = {};
// let x = new Object;

// other built-in constructor functions
// new String(); '', "", `` - cleaner and simpler than the constructor func
// new Boolean(); true, false
// new Number(); 1, 2, 3, ...
//  every object has a constructor prop, and it references the function that was used to create an object

// ***************************
// funcs are objects
// ***************************

// hello confusion

// function Circle(radius) {
//   this.radius = radius,
//   this.draw = function() {
//     console.log('draw');
//   }
// }

// // this represents what the function looks like internally when the code is called
// // const Circle1 = new Function('radius', 
// // `this.radius = radius;
// // this.draw = function() {
// //   console.log('draw);
// // }`);

// // const circle = new Circle1(1)

// Circle.call({}, 1);
// //the first argument specifies the target of 'this', in our case an object {}
// Circle.apply({}, [1, 2, 3]);
//  const another = new Circle(1);

// javascript functions are objects, these calls all reference the same object, but in different ways

// ***************************
// Value Types VS Reference types
// ***************************

// lets define two primitives

// let x= 10;
// let y = x;

// x=20;

// in the console, x = 20 but y = 10. why is this? these two variables are independent of each other
// any value originally store and referenced later is copied over
// now lets see what happens if we use a reference type or object

// let x ={ value: 10 };
// let y = x;
//
// x.value = 20;

// now when we log these values we see that both values = 20. why?
// when we use an object it is not stored in the variables, but is stored somewhere else in memory
// the address of that memory locations is stored inside the variable
// when we then copy x into why, the address/reference is copied
// so, both x and y are pointing to the same place within the memory
// when we modify this object the changes are immediately available to the other variable
// conclusions:
// PRIMITIVES are copied by their VALUE
// OBJECTS are copied by their REFERENCE
// an example:

// let number = 10;

// function increase(number) {
//   number++;
// }

// increase(number);
// console.log(number)

// welcome to how scope works. our console prints 10, because it doesn't have access to the number++ inside the function
// when we call the function, the variable is copied locally INSIDE the function and independent of our original declaration
// but lets change that reference to an object

// let obj = { value:10 };
//
// function increase(obj) {
//   obj.value++;
// }
//
// increase(obj);
// console.log(obj);

// now we see and object with the value of 11
// because the object is passed by it's reference the local parameter in the func points to the same obj that we originally defined
// these are NOT independent, they point to the same object!!

// ***************************************
//      Adding & Removing Properties
// ***************************************

// function Circle(radius) {
//   this.radius = radius,
//   this.draw = function() {
//     console.log('draw');
//   }
// }

//  const circle = new Circle(10);
//  circle.location = { x: 1 }; // simple, less verbose than bracket notation
 
// //  circle['location'] = { x: 1 }; // bracket notation gets the information that dot notation gets you

// // if you're dealing with this dynamically and don't know the name of an object property we can do this:
// const propertyName = 'location';
// circle[propertyName] = { x: 1 };
// // this is helpful for names that are not valid identifiers, such as hyphenated or special characters

// *******************************
//      Enumerating Properties
// *******************************

// we want to iterate over properties in an object. we do that using a for in loop

// function Circle(radius) {
//   this.radius = radius,
//   this.draw = function() {
//     console.log('draw');
//   }
// }

//  const circle = new Circle(10);

// //  for (let key in circle) {
// //   console.log(key, circle[key])
// //  }

// //what if we want to get only properties and not methods? we can use the typeof operator to check the type of value

//  for (let key in circle) {
//   if (typeof circle[key] != 'function')
//   console.log(key, circle[key]);
//  }

//  // there is one more approach, this returns all the keys in the circle object as an array
//  const keys = Object.keys(circle);
//   console.log(keys);
//   // this doesn't allow you to separate properties from methods

//   // sometimes we want to know if an object has a given property
//   if ('radius' in circle)
//   console.log('Circle has a radius.')

// ***************************
//      Abstraction
// ***************************

// function Circle(radius) {
//     this.radius = radius;

//     this.defaultLocation = {x: 0, y: 0}

//     this.computeOptimumLocation = function(factor) {
//         // ...
//     }

//     this.draw = function() {
//         this.computeOptimumLocation(0.1);

//         console.log('draw');
//     };
// }

// const circle = new Circle(10);
// circle.draw();

// abstraction means hide the details, show the essentials
// we've decided that we only want to expose the radius and draw properties,
// we want to hide the defaultLocation and computeOptimumLocation properties
// if each of these props are exposed to the user, then each time you make a change you'll be making MANY changes
// for example, adding the argument of 'factor' means that we have to add this argument to each instance of computeOptimumLocation
// whereas if we abstract computeOptimumLocation and defaultLocation then we only have to change the code within our object


// *************************************
//      Private Properties & Methods
// *************************************

// function Circle(radius) {
//     let color = 'red';
//     // this is only a local variable
//     // once outside this object the color: red is lost - "goes out of scope and dies"
//     // to make it a prop, we must use 'this.color = red'

//     this.radius = radius;

//     let defaultLocation = {x: 0, y: 0}
//     // now, we've made the location a local variable and not a property!

//     let computeOptimumLocation = function(factor) {
//         // ...
//     }

//     this.draw = function() {
//         let x, y;
//         // likewise these are variables only local to this draw function
//         computeOptimumLocation(0.1);
//         // default location
//         //this.radius

//         console.log('draw');
//     };
// }

// const circle = new Circle(10);
// circle.draw();

// closure determines what variables will be accessible to an inner function
// here, the draw function can access it's inner variable AS WELL AS the variables of it's parent function
// defaultLocation and computeOptimumLocation are withing th scope of Circle(), but are within the closure of draw()
// remember: scope is temporary and it dies
// closure is permanent: defaultLocation and computeOptimumLocation will stay within memory (or preserve their state) because they are a part of the closure of draw

// ********************************
//     Getters & Setters
// *********************************

// function Circle(radius) {
//     this.radius = radius;

//     let defaultLocation = {x: 0, y: 0}
//     // this is a private property that cannot be accessed from outside

//     this.getDefaultLocation = function() {
//         return defaultLocation;
//     }
//     // this is a getter function, you obtain something otherwise inaccessible within the object

//     this.draw = function() {

//         console.log('draw');
//     };

//     //
//     Object.defineProperty(this, 'defaultLocation', {
//         get: function() {
//             return defaultLocation;
//         },
//         set: function(value) {
//             if (!value.x || !value.y)
//             throw new Error('Invalid location!');
//           //here we can validate before setting the default location
//             defaultLocation = value;
//         }
//     })

// }

// const circle = new Circle(10);
// // circle.getDefaultLocation();
// // this syntax is clunky, so let's try something else
// // circle.defaultLocation;
// circle.defaultLocation = 1;
// // this gives us an error (on purpose), we want this property to be read only, not able to be changed
// circle.draw();


// _____________________________________INHERITANCE________________________________________________