console.log('inheritance')

// custom constructor inheritance
function Circle(radius) {
  this.radius = radius,
  this.draw = function() {
    console.log('draw');
  }
}

 const circle = new Circle(10);

 // each time we call the circle constructor to create a new Circle, we create a new circle object,
 // the constructor will create that object and set it's prototype property to this 'base" prototype
 // think of it as 'circleBase"
 // objects created by a given constructor will have the same prototype
 // all circles, created by the circle constructor will have the same prototype object,
 // similarly, all arrays created by the array constructor will have the same prototype

 // 'circleBase' also has a prototype, 'objectBase'!