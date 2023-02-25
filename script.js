var userNameIn = document.getElementsByClassName("inputs")[0];
var emailIn = document.getElementsByClassName("inputs")[1];
var passwordIn = document.getElementsByClassName("inputs")[2];
var confirmPassIn = document.getElementsByClassName("inputs")[3];
var signUpBtn = document.getElementById('signUpBtn');
var warning = document.getElementById('warning');

var emailLog = document.getElementById('emailLog');
var passwordLog = document.getElementById('passwordLog');
var logInBtn = document.getElementById('logInBtn');
var loginWarning = document.getElementById('loginWarning');

var users = []

function routing() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser !== null) {
        window.location.replace('TeacherPortal/dashboard.html');
    }
    else {
        window.location.replace('TeacherPortal/index.html');
        window.stop();
    }
}

function handleLogin() {
    const email = emailLog.value
    const password = passwordLog.value
    if (email !== '' && password !== '') {
        const users = JSON.parse(localStorage.getItem('users')) || []
        const filter = users.filter((e) => e.email === email)
        if (filter.length === 1) {
            if (filter[0].pass === password) {
                const token = generateRandomString(16);
                const currentUser = { email: filter[0].email, pass: filter[0].pass, name: filter[0].name, token: token }
                localStorage.setItem('currentUser', JSON.stringify(currentUser))
                loginWarning.style.color = '#47F558'
                loginWarning.textContent = 'Successfully Signed Up! Taking you to your account...'
                setTimeout(() => {
                    location.replace('TeacherPortal/dashboard.html');
                }, 1000)
            }
            else {
                loginWarning.textContent = 'Error: Entered password is incorrect!'
            }
        }
        else {
            loginWarning.textContent = 'Error: This email is not registered!'
        }
    }
    else {
        loginWarning.textContent = 'Error: Please enter a valid email address & password!'
    }
}

const handleSignup = () => {
    const userName = userNameIn.value
    const email = emailIn.value
    const password = passwordIn.value
    const confirmPass = confirmPassIn.value
    if (userName !== '' && email !== '' && password !== '' && confirmPass !== '') {
        if (userName.length >= 3) {
            if (email.includes(".") && email.includes("@")) {
                if (password.length >= 8 && confirmPass.length >= 8) {
                    if (password === confirmPass) {
                        const object = { email: email, pass: password, name: userName }
                        const users = JSON.parse(localStorage.getItem('users')) || []
                        const registered = users?.filter((e) => e.email === email)
                        if (registered?.length === 0) {
                            users.push(object)
                            localStorage.setItem('users', JSON.stringify(users))
                            warning.textContent = 'Successfully Signed Up! Taking you to the Login Page...'
                            warning.style.color = '#47F558'
                            setTimeout(() => {
                                location.replace('TeacherPortal/login.html');
                            }, 1000)
                        }
                        else {
                            warning.innerHTML = 'Error: Please enter a unique email. This email is already registered.'
                            warning.style.color = '#E33737'
                        }
                    }
                    else {
                        warning.innerHTML = 'Error: Passwords are not matching'
                        warning.style.color = '#E33737'
                    }
                }
                else {
                    warning.innerHTML = 'Error: Password should have atleast 8 characters'
                    warning.style.color = '#E33737'
                }
            }
            else {
                warning.innerHTML = 'Error: Please enter a valid email'
                warning.style.color = '#E33737'
            }
        }
        else {
            warning.textContent = 'Error: Please enter a valid name'
            warning.style.color = '#E33737'
        }
    }
    else {
        warning.textContent = 'Error: All the fields are mandatory'
        warning.style.color = '#E33737'
    }
}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

document.addEventListener('DOMContentLoaded', routing)
