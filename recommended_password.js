/** Recommended Password **/
/**	Version : 1.1 **/
/** Auhtor : Benjamin Fourmaux -- Beruet **/

/* ---- Security rules ---- */
var pswdLength = 10; // Password lenght
var containAlphabet = false; // true or false if the password must contain alphabic character
if (containAlphabet){
	var minContainAlphabet = 1; // Minimum of character 
	var maxContainAlphabet = 5; // Maximum of character
	
} else { var minContainAlphabet = 0; var maxContainAlphabet = 0; }

var containSpecial = false; // true or false if the password must contain special character (- / *r % ~ " )
if (containSpecial){
	var minContainSpecial = 1; // Minimum of character 
	var maxContainSpecial = 5; // Maximum of character
	
} else { var minContainSpecial = 0; var maxContainSpecial = 0; }

var boxTitle = "Mot de passe suggéré :"; // Title text
var boxHoverTitle = "Cliquer pour utiliser le mot de passe recommandé"; // Hover title text


/* ---- Style CSS ---- */
// CSS
var styleCSS = "<style type=\"text/css\">" +
					"/* CSS for recommended password .js */\n"+
					"#generatePassword-box {\n " +
						"\t position: absolute;\n " +
						"\t background-color: white;\n " + 
						"\t -webkit-box-shadow: 0px 5px 26px -2px #000000;\n " +
						"\t box-shadow: 0px 5px 26px -2px #000000;\n "+
						"\t border: 1px solid grey;\n " + 
						"\t border-radius: 15px;\n " + 
						"\t padding: 10px;\n " +
					"} \n"+
					"#generatePassword-box .title {\n" +
						"\t font-size: 18px;\n" +
						"\t font-weight: bold;\n" +
						"} \n" +
					"#generatePassword-box .genPassword {\n" +
						"\t cursor: pointer;\n" +
					"} \n" +
					"#generatePassword-box .genPassword code {\n"+
						"\t font-size: 16px;\n" +
					"} \n" +
					"/* Dark mode style */ \n"+
					"body.dark #generatePassword-box { \n" +
					"\t background-color: #181818; \n"+
					"\t color: #fff; \n" +
					"}"+
				"</style>";

// Insert CSS 
document.write(styleCSS);





// Document ready
$(document).ready(function() {
	// Set variables
	var ElemInputPassword = $('#generate-password');
	var ElemInputConfirmPassword = $('#generate-confirm-password');
	var recommendedPassword;
	
	// Focus input password 
	$('html').click( function () {
		if (ElemInputPassword.is(":focus")) {
			// Delete the box
			closeBox();
			
			// Generate password
			recommendedPassword = generatePassword();
			
			// Create the box
			createBox(ElemInputPassword, recommendedPassword);
			
			// Delegate
			$('*').delegate("#generatePassword-box", "click", function() {
				// Auto-complete inputs (password + confirm password)
				ElemInputPassword.val(recommendedPassword);
				ElemInputConfirmPassword.val(recommendedPassword);
				
			});
			
		} else {
			// If input is not focus : delete the box
			closeBox();
		}
	});

	
});


/* ---- Functions ---- */

/**
	Function to generate a crytpo password
	@Return {string} Return a crypto password
**/
function generatePassword() {
	// Declare array who contain int
	const arrayInt = new Uint32Array(pswdLength);
	
	// Fill the array with random numbers
	window.crypto.getRandomValues(arrayInt);
	
	// Return the password
	return arrayInt[0];
}

/**
	Function for create the box and insert it into the document
	@Param {obj jQuery} Daugther element (the input)
	@Param {string} The password generate
**/
function createBox (elem, password) {
	// Get width and height from the input
	var inputWidth = elem.width();
	var inputHeight = elem.height()*2.5;
	
	// Create the box
	var htmlDiv = '<div id="generatePassword-box" style="width: '+inputWidth+'px; margin-top: '+inputHeight+'px;">' +
					'<div class="title">'+boxTitle+'</div>' +
					'<hr>' +
					'<div class="genPassword" title="'+boxHoverTitle+'"><code>'+password+'</code></div>' +
				'</div>';
	
	// insert element
	elem.after(htmlDiv);	
}

/**
	Function for remove the box's html from the document
**/
function closeBox () {
	$('#generatePassword-box').remove();
}

