/* main.js */
$(document).ready(function() {
	// Déclaration des variables 
	var ElemInputPassword = $('#generate-password');
	var ElemInputConfirmPassword = $('#generate-confirm-password');
	var recomandedPassword;
	
	// Focus input password 
	$('html').click( function () {
		if (ElemInputPassword.is(":focus")) {
			// Vidange de la box
			closeBox();
			
			// Génération du mot de passe recomandé
			recomandedPassword = generatePassword();
			
			// Création de la box
			createBox(ElemInputPassword, recomandedPassword);
			
			// Delegate
			$('*').delegate("#generatePassword-box", "click", function() {
				// Auto completion des inputs
				ElemInputPassword.val(recomandedPassword);
				ElemInputConfirmPassword.val(recomandedPassword);
				
			});
			
		} else {
			closeBox();
		}
	});

	
});


function generatePassword() {
	// Déclaration d'un tableau vide (10 étant la taille de la chaine de caractère)
	const tableau = new Uint32Array(11);
	
	// Appel de window crypto
	window.crypto.getRandomValues(tableau);
	
	return tableau[0];
}


function createBox (elem, password) {
	// Récupère la taille de l'input
	var inputWidth = elem.width();
	var inputHeight = elem.height()*2.5;
	
	// Création de box
	var htmlDiv = '<div id="generatePassword-box" style="width: '+inputWidth+'px; margin-top: '+inputHeight+'px;">' +
					'<div class="title">Mot de passe suggéré :</div>' +
					'<hr>' +
					'<div class="genPassword" title="Cliquer pour utiliser le mot de passe recommandé"><code>'+password+'</code></div>' +
				'</div>';
	
	// Insertion de l'élément
	elem.after(htmlDiv);	
}

function closeBox () {
	$('#generatePassword-box').remove();
}

