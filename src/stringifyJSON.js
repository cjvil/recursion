//var _ = require('underscore-node');

// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  if (obj === null) {
    return 'null';
  }

  if ( typeof obj === 'function' || typeof obj === 'undefined') {
    return '';
  }

  var json = '';
  var temp = [];
  var brackets = {
    'array': ['[', ']'], 
    'object': ['{', '}'] 
  };

  var objType = '';
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      objType = 'array';
    } else {
      objType = 'object';
    }
  } else {
    objType = typeof obj;
  }

  if (brackets.hasOwnProperty(objType)) {
    _.each(obj, function(element, index) {

      if(objType === 'array') {
        temp.push('' + stringifyJSON(element));
      }

      if (objType === 'object' ) {
        if ( typeof element !== 'function' && typeof element !== 'undefined') {

          temp.push('"' + index + '":' + stringifyJSON(element));
        }
      }

    });

    json += brackets[objType][0] + temp.join(',') + brackets[objType][1];

    return json;
  }


  if (objType === 'string') {
    return  '\"' + obj + '\"';
  }
  return '' + obj;
};

// console.log(stringifyJSON(['a', 1, true, 2, ['c',['d', 'e']]]));
// console.log(stringifyJSON( {a: 1, b: [2, 3, 4]}, null ));
// console.log(stringifyJSON('Hello world'));
// console.log(JSON.stringify(null));