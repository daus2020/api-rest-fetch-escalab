const formulario = document.querySelector("#formulario-contacto");
const botonEnviar = document.querySelector(".btn-enviar");

const nameContact = document.getElementsByName("name_contact")[0];
const email = document.getElementsByName("email_contact")[0];
const phone = document.getElementsByName("phone_contact")[0];
const topic = document.getElementById("topic_contact");
const commit = document.getElementsByName("commit_contact")[0];

const errorsList = document.getElementById("errors");

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
botonEnviar.addEventListener("click", (event) => {
    event.preventDefault();
    cleanErrors();
    let hasErrors = false;

    // TODO: validar nombre y apellido acá

    const mailRe = /^\w+@\w+\.\w{2,7}$/;
    if (!mailRe.exec(email.value)) {
        showError(email, "El correo debe seguir un formato válido.");
        hasErrors = true;
    }

    const phoneRe = /^\+?\d{7,15}$/;
    const sanitizedPhone = phone.value.replace(" ", "");
    if (!phoneRe.exec(sanitizedPhone)) {
        showError(phone, "Número de teléfono debe tener entre 7 y 15 dígitos.");
        hasErrors = true;
    }

    // TODO: Validar comentario acá

    // TODO: Enviar consulta a API en caso de que el formulario esté correcto
});
