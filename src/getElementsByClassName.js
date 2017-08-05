// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  var matchingElements = [];

  if (this === window) {
    return getElementsByClassName.call(document.body, className);
  }

  if ($(this).hasClass(className)) {
    matchingElements.push(this); 
  }

  // need to retool using element.childNodes and element.classList
  if( this.children.length > 0)
  {
    for(let i = 0; i < this.children.length; i++)
    {
      matchingElements = matchingElements.concat( getElementsByClassName.call(this.children[i], className) );
    }
  }

  return matchingElements;
};