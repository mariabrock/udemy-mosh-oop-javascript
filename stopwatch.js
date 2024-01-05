
//Part 1
// design a stopwatch object
// const sw = new Stopwatch() - in console
// duration = 0, reset() start() stop()

// function Stopwatch () {
//   let startTime, endTime, running, duration = 0;

//   this.start =  function() {
//     if(running)
//     throw new Error('Stopwatch has already started.')
//     running = true;

//     startTime = new Date();
//   }

//   this.stop = function() {
//     if(!running)
//     throw new Error('Stopwatch is not started.')

//     running = false;

//     endTime = new Date();

//      const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
//      duration += seconds
//   }

//   this.reset = function() {
//     startTime = null;
//     endTime = null;
//     running = false;
//     duration = 0;
//   }

//   Object.defineProperty(this, 'duration', {
//     get: function() {return duration}
//   });
// }

// Part 2
// move the methods we have created to the prototype of the Stopwatch

// const sw = new Stopwatch() - in console

function Stopwatch () {
  let startTime, endTime, running, duration = 0;

  Object.defineProperty(this, 'duration', {
    get: function() {return duration},
    set: function(value) { duration = value }
  });

  Object.defineProperty(this, 'startTime', {
    get: function() {return startTime}
  });

  Object.defineProperty(this, 'endTime', {
    get: function() {return endTime}
  });

  Object.defineProperty(this, 'running', {
    get: function() {return running}
  });
}
// making each of these public and read only is "polluting the interface" of the stopwatch
// makes it more cluttered than it needs to be, and is against the idea of abstraction and oop
// it exposes all details to the outside

Stopwatch.prototype.start = function() {
  if(this.running)
  throw new Error('Stopwatch has already started.')
  this.running = true;

  this.startTime = new Date();
}

Stopwatch.prototype.stop = function() {
  if(!this.running)
  throw new Error('Stopwatch is not started.')

  this.running = false;

  this.endTime = new Date();

   const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
   this.duration += seconds
}

Stopwatch.prototype.reset = function() {
  this.startTime = null;
  this.endTime = null;
  this.running = false;
  this.duration = 0;
}

// this is a terrible idea
// we can now modify/overwrite our duration from the outside --> this makes state invalid!
// we don't want our objects to be able to lie, be unreliable or untrustworthy
// this is why abstraction is so important: only expose what's needed to allow the object to work but not mess up it's state
// in trying to optimize, here we have created more issues
// there were no performance issues and no memory problems, we knew we weren't going to have 1000 stopwatches
// overall a bad idea, making this object useless

// *** Premature optimizations is  the root of all evils ***

// multi-line editing cmd + d on mac - Add Next Occurrence