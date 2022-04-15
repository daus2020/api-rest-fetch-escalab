const d = document;

const contactForm = d.querySelector("#formulario-contacto");
const btnSubmit = d.querySelector(".btn-enviar");

const fullName = d.getElementsByName("name_contact")[0];
const email = d.getElementsByName("email_contact")[0];
const phoneNumber = d.getElementsByName("phone_contact")[0];
// const topic = d.getElementById("topic_contact");
const comment = d.getElementsByName("commit_contact")[0];

const errorsList = d.getElementById("errors");

// *** navbar links with smooth scroll
d.addEventListener("DOMContentLoaded", () => {
  // get all the links with an ID that starts with 'sectionLink'
  const listOfLinks = document.querySelectorAll(".main-menu ul a");
  // loop over all the links
  listOfLinks.forEach(function (link) {
    // listen for a click
    link.addEventListener('click',  () => {
      console.log("hola")
      // toggle highlight on and off when we click a link
      listOfLinks.forEach( (link) => {
        if (link.classList.contains('highlighted')) {
          link.classList.remove('highlighted');
        }
      });
      link.classList.add('highlighted');
      // get the element where to scroll
      let ref = link.href.value
      window.scroll({
        behavior: 'smooth',
        left: 0,
        // top gets the distance from the top of the page of our target element
        top: document.querySelector(ref).offsetTop
      })
    })
  })
})




function showError(element, message) {
  element.classList.toggle("error");
  errorsList.innerHTML += `<li>${message}</li>`;
}

function cleanErrors() {
  errorsList.innerHTML = "";
}

/*
URL API: https://30kd6edtfc.execute-api.us-east-1.amazonaws.com/prod/send-email
METHOD: POST
ESTRUCTURA BODY: {
	"name": "", 
	"email": "", 
	"phone": "",
	"select": "",
	"comment": ""
}
*/
async function sendMail(name, email, phone, select, comment) {
  // TODO: Enviar datos a API usando fetch, siguiendo la estructura indicada
}

/*
Validaciones necesarias:
+ Campo nombre y apellido no debe estar vacío y contener al menos un espacio
+ Campo correo debe tener un correo válido
+ Campo número de teléfono debe tener entre 7 y 15 dígitos, 
    pudiendo tener un + al inicio, ignorando espacios en blanco
+ Campo comentario debe tener al menos 20 caracteres
*/
// Desafío opcional: qué elemento y evento podríamos usar para detectar si el usuario apreta Enter en vez de hacer click?
btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  cleanErrors();
  let hasErrors = false;

  // *** full name validation
  // ^[a-zA-Z\u00C0-\u017F]{2,20}[a-z A-Z\u00C0-\u017F]{2,20}(\s+[^\s]+)$ cumple lo pedido al menos un espacio entremedio (no al principio ni end), acentos, ñ, no dígitos
  // ^[a-zA-Z\u00C0-\u017F]{2,15}[a-z A-Z\u00C0-\u017F]{2,15}(\s+[^\s]+)*$ acepta acentos, espacios sólo entremedio. Pero puede no haber ningún espacio(mal)
  // ^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$  acepta más de un espacio pero no acentos
  const fullNameRe = /^[a-zA-Z\u00C0-\u017F]{2,20}[a-z A-Z\u00C0-\u017F]{2,20}(\s+[^\s]+)$/;
  const sanitizedName = fullName.value.trim();
  // const sanitizedName = fullName.value.replace(" ", "");
  
  if (!fullNameRe.exec(sanitizedName)) {
  // if (!fullNameRe.exec(fullName.value)) {
    showError(fullName, "El nombre debe seguir un formato válido.");
    hasErrors = true;
  }

  // *** email validation
  const emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRe.exec(email.value)) {
    showError(email, "El correo debe seguir un formato válido.");
    hasErrors = true;
  }

// *** phone number validation
  const phoneNumberRe = /^\+?\d{7,15}$/;
  const sanitizedPhone = String(phoneNumber.value.replace(" ", ""));

  if (!phoneNumberRe.exec(sanitizedPhone)) {
    showError(phoneNumber, "Número de teléfono debe tener entre 7 y 15 dígitos.");
    hasErrors = true;
  }

// *** comment validation
  if (comment.value.length < 20 || comment.value.length > 200) {
    showError(comment, "Comentario debe tener entre 20 y 200 caracteres.");
    hasErrors = true;
  }

  // TODO: Enviar consulta a API en caso de que el formulario esté correcto
  if (!hasErrors) {
    console.log("formulario enviado (con datos validados x front)")
  }
});
