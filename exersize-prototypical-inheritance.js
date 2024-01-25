// design two objects: HTMLElement and HTMLSelectElement (this one represents a dropdown list)
// HTMLElement is the parent
// it contains it's own click() method and it's prototype contains a focus() method
// both have an implementation of a console.log statement
// e.click() returns 'clicked', e.focus() returns 'focused'

//HTMLSelectElement is a child
// it can handle an array of items but doesn't have to
// holds a property of items[], and two methods addItem(item) and removeItem(item)
// will contain focus() that comes from parent

// Child inherits from parent!
// DO NOT USE the extend function that we created, MANUALLY set the prototype for HTMLSelectElement
// set HTMLSelectElement to and INSTANCE of HTMLElement NOT it's prototype

// ORDER:
// 1. Create HTMLElement prototype
// 2. Create HTMLElement constructor function
// 3. Create Select 

// function mixin(target, ...sources) {   
//   Object.assign(target, ...sources);
// }

// const hasClick = {
//   click: function() {
//     console.log('clicked')
//   }
// }

// const hasFocus = {
//   focus: function() {
//     console.log('focused')
//   }
// }

// function HTMLElement() {}

// mixin(HTMLElement.prototype, hasClick, hasFocus);


// const ele = new HTMLElement();
// console.log(ele)

HTMLElement.prototype.focus = function() {
  console.log('focused')
}

function HTMLElement() {
  this.click = function() {
    console.log('clicked')
  }
}


function HTMLSelectElement(items = []) {
  this.items = items;

  this.addItem = function(item) {
    this.items.push(item);
  }

  this.removeItem = function(item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}

HTMLSelectElement.prototype = new HTMLElement();
HTMLSelectElement.prototype.constructor = HTMLSelectElement;

const s = new HTMLSelectElement();