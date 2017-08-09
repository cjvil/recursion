// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // catch invalid objects
  if (obj === null) {
    return 'null';
  }

  if (typeof obj === 'function' || typeof obj === 'undefined') {
    return '';
  }

  var nestedElements = [];
  var structures = {'array': ['[', ']'], 'object': ['{', '}']};
  var objType = Array.isArray(obj) ? 'array' : typeof obj;

  // return basic data types
  if (objType === 'string') {
    return '\"' + obj + '\"';
  } else if (!structures.hasOwnProperty(objType)) {
    return '' + obj;
  }

  // recursively stringify data structures
  _.each(obj, function(element, index) {
    if(objType === 'array') {
      nestedElements.push(stringifyJSON(element));
    }

    if (objType === 'object' ) {
      if (typeof element !== 'function' && typeof element !== 'undefined') {
        nestedElements.push('"' + index + '":' + stringifyJSON(element));
      }
    }     
  });

  return structures[objType][0] + nestedElements.join(',') + structures[objType][1];
};