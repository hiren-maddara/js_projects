const form = document.getElementById('form')
const password1El = document.getElementById('password1')
const password2El = document.getElementById('password2')
const messageContainer = document.querySelector('.message-container')
const message = document.getElementById('message')

let isValid = false
let passwordsMatch = false

function validateForm(){
    
    // use ConstrainAPI
    isValid = form.checkValidity()

    // style main message
    if(!isValid){

        message.textContent = 'Please fill out all fields'
        message.style.color = 'red'
        messageContainer.style.borderColor = 'red'
        return
    }

    // check if pws match
    if(password1El.value === password2El.value){
        passwordsMatch = true
        password1El.style.borderColor = 'green'
        password2El.style.borderColor = 'green'
        return
    } else{
        passwordsMatch = false
        message.textContent = 'Make sure passwords match'
        message.style.color = 'red'
        messageContainer.style.borderColor = 'red'
        password1El.style.borderColor = 'red'
        password2El.style.borderColor = 'red'
    }

    // if form is valid and passwords match
    if(isValid && passwordsMatch){
        message.textContent = 'successfully registered'
        message.style.color = 'green'
        messageContainer.style.borderColor = 'green'
    }
}

function storeFormData(){
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value,
    }

    // do smth with the date
    console.log(user)

//     // then reset the form
//     form.name.value = ''
//     form.phone.value = ''
//     form.email.value = ''
//     form.website.value = ''
//     form.password.value = ''
//     password1El.value = ''
//     passwordsMatch = false
//     isValid = false
}

function processFormData(e){
    e.preventDefault()

    // validate form
    validateForm()

    // submit data
    if(isValid && passwordsMatch) storeFormData()
    
}

// Event listenver
form.addEventListener('submit', processFormData)