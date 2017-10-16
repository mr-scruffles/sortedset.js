(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    global.SortedSet = factory();
  }
}(this, function() {
  "use strict";

  // Internal private array which holds actual set elements
  var setArray;

  let comparator = function(a, b) {return a-b;};

  // Constructor for the SortedSet class
  function SortedSet(initial) {
    setArray = [];

    if (arguments.length > 0) {
      initial.sort(comparator);

      let curr = initial[0];
      setArray.push(initial[0]);
      for (let i = 1; i < initial.length; i++) {
        if(initial[i] !== curr) {
          setArray.push(initial[i]);
          curr = initial[i];
        }
      }
    }
  }

  /* Accessor; returns element at index
   */
  SortedSet.prototype.at = function(index) {
    return setArray[index];
  };

  /* Converts a set into an Array and returns the result
   */
  SortedSet.prototype.toArray = function() {
    return setArray.slice(0);
  };

  /* Converts a set into a String and returns the result
   */
  SortedSet.prototype.toString = function() {
    return setArray.toString();
  };

  /* Synchronously iterates elements in the set
   */
  SortedSet.prototype.forEach = function(callback, thisArg) {
    if (this === void 0 || this === null ||
        setArray === void 0 || setArray === null) {
      throw new TypeError();
    }

    var t = Object(setArray);
    var len = t.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError();
    }

    var context = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t) callback.call(context, t[i], i, t);
    }
  };

  /* Read-only property for getting number of elements in sorted set
   */
  Object.defineProperty(SortedSet.prototype, 'length', {
    get: function() {
      return setArray.length;
    }
  });

  /* Returns true if a given element exists in the set
   */
  SortedSet.prototype.contains = function(element) {
    if(setArray.indexOf(element) > -1) {
      return true;
    } else {
      return false;
    }
  };

  /* Gets elements between startIndex and endIndex. If endIndex is omitted, a
   * single element at startIndex is returned.
   */
  SortedSet.prototype.get = function(startIndex, endIndex) {

    let output = [];

    if(typeof startIndex !== 'undefined' && startIndex >= 0) {
      if(typeof endIndex === 'undefined') {
        return setArray[startIndex];
      } else if(endIndex < setArray.length) {
        for (let i = startIndex; i <= endIndex; i++) {
          output.push(setArray[i]);
        }
      }
    }
    return output;
  };

  /* Gets all items between specified value range. If exclusive is set, values
   * at lower bound and upper bound are not included.
   */
  SortedSet.prototype.getBetween = function(lbound, ubound, exclusive) {

    let output = [];
    let startIndex = 0;
    let endIndex = setArray.length-1;

    if(typeof exclusive === 'undefined' || exclusive === false) {
      while(setArray[startIndex] < lbound) {startIndex++;}
      while(setArray[endIndex] > ubound) {endIndex --;}

    } else {
      while(setArray[startIndex] <= lbound) {startIndex++;}
      while(setArray[endIndex] >= ubound) {endIndex --;}
    }
    for (let i=startIndex; i <= endIndex; i++) {
      output.push(setArray[i]);
    }

    return output;
  };

  /* Adds new element to the set if not already in set
   */
  SortedSet.prototype.add = function(element) {
    if (this.contains(element) === false) {
      setArray.push(element);
      setArray.sort(comparator);
    }
  };


  /* BONUS MARKS AWARDED IF IMPLEMENTED
   * Implement an asynchronous forEach function. (See above for synchrnous
   * implementation). This method ASYNCHRONOUSLY iterates through each elements
   * in the array and calls a callback function.
   */

  /* Removes element from set and returns the element
   */
  SortedSet.prototype.remove = function(element) {
    if(this.contains(element)) {
      let stack = [];
      let elem;
      while((elem = setArray.pop()) !== element) {
        stack.push(elem);
      }
      while(stack.length > 0) {
        setArray.push(stack.pop());
      }
      return elem;
    }
  };

  /* Removes element at index location and returns the element
   */
  SortedSet.prototype.removeAt = function(index) {
    if (index >= 0 && index < setArray.length) {
      let stack = [];
      let idx = setArray.length-1;

      while(idx >= index) {
        stack.push(setArray.pop());
        idx--;
      }

      let elem = stack.pop();

      while (stack.length > 0) {
        setArray.push(stack.pop());
      }
      return elem;
    }
  };

  /* Removes elements that are larger than lower bound and smaller than upper
   * bound and returns removed elements.
   */
  SortedSet.prototype.removeBetween = function(lbound, ubound, exclusive) {
    let startStack = [];
    let endStack = [];

    if(typeof exclusive === 'undefined' || exclusive === false) {
      while(setArray[0] < lbound) {
        startStack.push(setArray.shift());
      }

      while(setArray[setArray.length-1] > ubound) {
        endStack.push(setArray.pop());
      }
    } else {
      while(setArray[0] <= lbound) {
        startStack.push(setArray.shift());
      }

      while(setArray[setArray.length-1] >= ubound) {
        endStack.push(setArray.pop());
      }
    }

    let output = [];
    while(setArray.length > 0) {
      output.push(setArray.shift());
    }

    while(startStack.length > 0) {
      setArray.push(startStack.shift());
    }

    while(endStack.length > 0) {
      setArray.push(endStack.pop());
    }
    return output;
  };

  /* Removes all elements from the set
   */
  SortedSet.prototype.clear = function() {
    setArray.length = 0;
  };

  SortedSet.prototype.forEachAsync = function(callback, thisArg) {
    console.log("I need a better understanding of what Async is solving first and the research is out of the scope of this assignment.");
  };

  return SortedSet;
}));
