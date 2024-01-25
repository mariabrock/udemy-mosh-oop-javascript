function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}

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

  this.render = function() {
    return `
    <select>
    ${this.items.map(item => `<option>${item}</option>`.join(''))}
    </select>
    `
  }
}

HTMLSelectElement.prototype = new HTMLElement();
HTMLSelectElement.prototype.constructor = HTMLSelectElement;


// extend HTML SELECT ELEMENT and implement a render() method

function HTMLImageElement(src) {
  this.src = src;

  this.render = function() {
    return `<img src="${this.src}" />`
  }
}

extend(HTMLImageElement, HTMLElement)

const elements = [
  new HTMLSelectElement([1, 2, 3]),
  new HTMLImageElement('http://')
];

for (let element of elements)
  console.log(element.render());