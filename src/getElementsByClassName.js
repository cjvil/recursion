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

  if (this.classList !== undefined && this.classList.contains(className)) {
    matchingElements.push(this); 
  }

  if( this.childNodes.length > 0)
  {
    for(let i = 0; i < this.childNodes.length; i++)
    {
      matchingElements = matchingElements.concat( getElementsByClassName.call(this.childNodes[i], className) );
    }
  }

  return matchingElements;
};