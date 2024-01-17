// design two objects: HTMLElement and HTMLSelectElement (this one represents a dropdown list)
// HTMLElement is the parent
// it contains it's owm click() method and it's prototype contains a focus() method
// both have an implementation of a console.log statement
// e.click() returns 'clicked', e.focus() returns 'focused'

//HTMLSelectElement is a child
// it can handle an array of items but doesn't have to
// holds a property of items[], and two methods addItem(item) and removeItem(item)

// Child inherits from parent!
// DO NOT USE the extend function that we created, MANUALLY set the prototype for HTMLSelectElement
// set HTMLSelectElement to and INSTANCE of HTMLElement NOT it's prototype