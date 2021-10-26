/*
  This JS File will contain a method which will generate a new pasword
  based on options : Uppercase, LowerCase, Numbers, Symbols, leangth
*/

//All the elements form the form
const newPassword = document.getElementById('randomPass');
const passwordLength = document.getElementById('passwordLength');
const uppercase = document.getElementById('inlineCheckbox2');
const lowercase = document.getElementById('inlineCheckbox1');
const numbers = document.getElementById('inlineCheckbox3');
const symbols = document.getElementById('inlineCheckbox4');
const generate = document.getElementById('generate');


//HELPER FUNCTIONS
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

//-------------------------------------------------------------------

//Object containing the helper functions
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}


generate.addEventListener('click', () => {

  console.log("generate is here......");
	const length = +passwordLength.value; // converts the length from string to number
	const hasLower = lowercase.checked;
	const hasUpper = uppercase.checked;
	const hasNumber = numbers.checked;
	const hasSymbol = symbols.checked;

  /*
    all of the password generator options are sent to generatePassword function.
    The result is inserted to our password textbox.
  */
  //console.log(generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length));
	newPassword.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const optionsArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}

	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		optionsArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}

	const finalPassword = generatedPassword.slice(0, length);

	return finalPassword;
}

//console.log(generatePassword(true,true,true,true,10));


//console.log(generatePassword(true,false,true,false,12));
