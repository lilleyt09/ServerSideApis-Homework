// Assignment Code
var generateBtn = document.querySelector("#generate");

// The generator function
function pwGenerator() {
  // The arrays for the characters usable by the generator
  var uc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  var lc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",  "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var char = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+"];

  // These are the prompts given to set the password criteria
  var pwLength = prompt ("How long will the password be? (8-128)");
  var pwUC = confirm ("Should the password contain uppercase letters?");
  var pwLC = confirm ("Should the password contain lowercase letters?");
  var pwNum = confirm ("Should the password contain numbers?");
  var pwChar = confirm ("Should the password contain special characters?");

  // Empty arrays for the generated password
  var arrayChar = [];
  var randPW = [];

  // The conditionals for the above prompts
  if (pwUC){
    arrayChar = arrayChar.concat(uc);
  }

  if (pwLC){
    arrayChar = arrayChar.concat(lc);
  }

  if (pwNum){
    arrayChar = arrayChar.concat(num)

  if (pwChar){
    arrayChar = arrayChar.concat(char);
  }

  console.log(arrayChar)

  // Ensures the final generated password matches the length designated by the user
  for (var i = 0; i < pwLength; i++) {
    randPW.push(arrayChar[Math.floor(Math.random() * arrayChar.length)]); 
  }
    return randPW.join("") ;
  }
};

// Write password to the #password input
function writePassword() {
  var password = pwGenerator();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
