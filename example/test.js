var colors = ["red", "green", "blue"];
var age = 28;

function redTest(strings, personExp, redRange) {
  var str0 = strings[0]; // "That "
  var str1 = strings[1]; // " is a "

  // There is technically a string after
  // the final expression (in our example),
  // but it is empty (""), so disregard.
  // var str2 = strings[2];

  // redTest=tests for color red
  // redDeclare = declaring what red counts as red

  var redDeclare;
  if (red < 45){
    redDeclare = 'red!';
  } else {
    redDeclare = 'not red';
  }

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${redDeclare}`;
}

var output = redTest`${showColors}`;

console.log(output);
// That red is a youngster