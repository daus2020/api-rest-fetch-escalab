const d = document;

const contactForm = d.querySelector("#formulario-contacto");
const btnSubmit = d.getElementById("btnSubmit");
// const btnSubmit = d.querySelector(".btn-enviar");

const fullName = d.getElementById("fullName");
const email = d.getElementById("email");
const phoneNumber = d.getElementById("phoneNumber");
const topic = d.getElementById("topic_contact");
const topicArray = ["html5", "css3", "javascript", "github"];
const comment = d.getElementById("comment");

const errorsList = d.getElementById("errors");

// *** FIXME: navbar links with smooth scroll only works if comment all from line 43
// d.addEventListener("DOMContentLoaded", () => {
//   // get all the links with an ID that starts with 'sectionLink'
//   const listOfLinks = d.querySelectorAll(".main-menu ul a");
//   // loop over all the links
//   listOfLinks.forEach(function (link) {
//     // listen for a click
//     link.addEventListener("click", () => {
//       // toggle highlight on and off when we click a link
//       listOfLinks.forEach((link) => {
//         if (link.classList.contains("highlighted")) {
//           link.classList.remove("highlighted");
//         }
//       });
//       link.classList.add("highlighted");
//       // get the element where to scroll
//       let ref = link.href.value;
//       window.scroll({
//         behavior: "smooth",
//         left: 0,
//         // top gets the distance from the top of the page of our target element
//         top: d.querySelector(ref).offsetTop,
//       });
//     });
//   });
// });

// *** Form functions
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

// *** Send data to API with fetch, according to comment above
const URLapi =
  "https://30kd6edtfc.execute-api.us-east-1.amazonaws.com/prod/send-email";

async function sendMail(name, email, phone, select, comment) {
  const rawRes = await fetch(URLapi, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      select,
      comment,
    }),
  });
  const content = await rawRes.json();
  console.log(content);

  if (Object.keys(content.errors).length === 0) {
    alert("Mensaje enviado correctamente");
  } else {
    alert("Error al enviar el mensaje");
  }
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

// *** detect press 'enter' key instead of 'click' to submit the form (only inside form fields)
// *** FIXME: also detects when press 'enter' key in comment field
contactForm.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    console.log(`Usuario usó la tecla '${e.key}'`);
  }
});

// *** button submit trigger by 'click' event
btnSubmit.addEventListener("click", e => {
  e.preventDefault();
  cleanErrors();
  let hasErrors = false;

  // *********  form validations *********

  // *** full name validation
  const fullNameRe =
    /^[a-zA-Z\u00C0-\u017F]{2,20}[a-z A-Z\u00C0-\u017F]{2,20}(\s+[^\s]+)$/;
  const trimmedName = fullName.value.trim();

  if (!fullNameRe.exec(trimmedName)) {
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
    showError(
      phoneNumber,
      "Número de teléfono debe tener entre 7 y 15 dígitos."
    );
    hasErrors = true;
  }

  // *** topic validation (option value sanitized, avoiding malicious manipulation from inspector)
  if (!topicArray.includes(topic.value)) {
    showError(topic, "Selección no existe");
    hasErrors = true;
  }
  // *** comment validation
  const trimmedComment = comment.value.trim();
  if (trimmedComment.length < 20 || trimmedComment.length > 200) {
    showError(
      comment,
      `Comentario debe tener entre 20 y 200 caracteres. Su comentario tiene ${trimmedComment.length} caracteres.`
    );
    hasErrors = true;
  }

  // *** If no errors (pass all form validations) call this function to send params
  if (!hasErrors) {
    cleanErrors();
    sendMail(
      trimmedName,
      email.value,
      sanitizedPhone,
      topic.value,
      trimmedComment
    );
    console.log("form sent to server with front validations");
  }
});
