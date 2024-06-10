const url = 'https://chocolocoparadise.onrender.com'
// const url = 'http://localhost:3000'

let registerMessage
let loginMessage
let togglePasswordInput = true

const newUser = (event) => {
  event.preventDefault()
  registerMessage = document.getElementById('registerMessage')
  let name = document.getElementById('nameInputRegister')
  let password = document.getElementById('passwordInputRegister')
  if(name.value.length > 25) {
    showMessage('registerMessage', 'Zu langer Benutzername!', 'loginFail')
  }else if(password.value.length > 25) {
    showMessage('registerMessage', 'Zu langes Passwort!', 'loginFail')
  } else {
    if(name.value == "" || password.value == "") {
      showMessage('Zu langer Name oder zu langes Passwort!', 'loginFail')
    }
    else {
      fetch(url + '/register/' + name.value + '/' + password.value)
      .then(response => response.json())
      .then(data => {
        if(data.message == 'success') {
          showMessage('registerMessage', '<i class="checkmark uil uil-check"></i>Sie sind jetzt registriert<br>Benutzer ' + name.value + ' angemeldet', 'loginSuccess')
          location.href = '../index.html'
        }else if (data.message == 'alreadyExist') {
          showMessage('registerMessage', '<i class="uil uil-times"></i>Dieser Benutzername existiert schon!', 'loginFail')
        }else {
          showMessage('registerMessage', data.message, 'loginFail')
        }
      })
    }	
  }
}

const knownUser = (event) => {
  event.preventDefault()
  loginMessage = document.getElementById('loginMessage')
  let name = document.getElementById('nameInputLogIn')
  let password = document.getElementById('passwordInputLogIn')
  if(name.value == "" || password.value == "") {
    showMessage('loginMessage', '<i class="uil uil-times"></i>Nicht alle Felder ausgefüllt!', 'loginFail')
  }
  else {
    fetch(url + '/login/' + name.value + '/' + password.value)
    .then(response => response.json())
    .then(data => {
      if(data.message == 'success') {
        showMessage('loginMessage', '<i class="checkmark uil uil-check"></i>Benutzer ' + name.value + ' angemeldet!', 'loginSuccess')
        location.href = '../index.html'
      }else if (data.message == 'passwordFail') {
        showMessage('loginMessage', '<i class="uil uil-times"></i>Passwort ist falsch!', 'loginFail')
      }else if (data.message == 'usernameFail') {
        showMessage('loginMessage', '<i class="uil uil-times"></i>Dieser Benutzer existiert nicht!', 'loginFail')
      }
    })
  }
}

const showMessage = (outputElement, message, messageStatus) => {
  if(outputElement == 'registerMessage') {
    registerMessage.classList = `${messageStatus}`
    registerMessage.innerHTML = `${message}`
    setTimeout(() => {
      registerMessage.classList = ''
      registerMessage.innerHTML = ''
  }, 5000);
  }
  else {
    loginMessage.classList = `${messageStatus}`
    loginMessage.innerHTML = `${message}`
    setTimeout(() => {
      loginMessage.classList = ''
      loginMessage.innerHTML = ''
  }, 5000);
  }
}

const toggleEyesIcon = (site) => {
  const eyeIcon = document.getElementById('eyeIcon')
  if(togglePasswordInput) {
    eyeIcon.classList.remove('uil-eye-slash')
    eyeIcon.classList.add('uil-eye')
    typeChange1(site)
  }else {
    eyeIcon.classList.remove('uil-eye')
    eyeIcon.classList.add('uil-eye-slash')
    typeChange2(site)
  }
  togglePasswordInput = !togglePasswordInput
}

const typeChange1 = (site) => {
  if(site === 1) {
    document.getElementById('passwordInputLogIn').type = 'text'
  }else {
    document.getElementById('passwordInputRegister').type = 'text'
  }
}

const typeChange2 = (site) => {
  if(site === 1) {
    document.getElementById('passwordInputLogIn').type = 'password'
  }else {
    document.getElementById('passwordInputRegister').type = 'password'
  }
}