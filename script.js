// recuperation des elements html
const nbrCaractere = document.getElementById("nbreCaractere");
const caracterePropre = document.getElementById("caracteresPropre");
const majuscule = document.getElementById("majuscule");
const symbole = document.getElementById("symbole");
const chiffre = document.getElementById("chiffre");
const divSpec = document.getElementById("specifications");
const divReponse = document.getElementById("reponse");
const inputReponse = document.getElementById("inputReponse");
const btnCopy = document.getElementById('copy')
// connection a l'api
function getFinalUrl() {
  let url = "https://api.motdepasse.xyz/create/?quantity=1&include_lowercase";
  if (nbrCaractere.value !== "") {
    url += `&password_length=${nbrCaractere.value}`;
  }
  if (caracterePropre.value !== "") {
    url += `&add_custom_characters=${caracterePropre.value}`;
  }
  if (majuscule.checked) {
    url += `&include_uppercase`;
  }
  if (symbole.checked) {
    url += `&include_special_characters`;
  }
  if (chiffre.checked) {
    url += `&include_digits`;
  }
  return url;
}

// fonction de generation
function generation() {
  const urlFinal = getFinalUrl();
  fetch(urlFinal)
    .then((response) => {
      if (!response.ok) {
        alert("petit probleme");
        return;
      }
      return response.json();
    })
    .then((data) => {
      divReponse.style.display = "flex";
      inputReponse.value = data.passwords[0];
      divSpec.style.display = "none";
    });
}

// pour rafraichir la page
function refresh() {
  location.reload();
}

//pour copier
function copy() {
  // Sélectionner le texte à copier
  const textToCopy = inputReponse.value;
  // Copier dans le presse-papier
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      // Changer le bouton pour indiquer que c'est copié
      const originalInner = btnCopy.innerHTML;
      btnCopy.innerHTML = "Copié !";
      btnCopy.classList.add("copied");

      // Remettre le bouton dans son état initial après 0.5 seconde
      setTimeout(() => {
        btnCopy.innerHTML = originalInner;
        btnCopy.classList.remove("copied");
      }, 1000);
    })
    .catch((err) => {
      console.error("Erreur lors de la copie: ", err);
    });
}
