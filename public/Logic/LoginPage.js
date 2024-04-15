const url = 'http://localhost:3000'
let registerMessage
let loginMessage

const newUser = (event) => {
  event.preventDefault()
  registerMessage = document.getElementById('registerMessage')
  let name = document.getElementById('nameInputRegister')
  let password = document.getElementById('passwordInputRegister')
  if(name.value == "" || password.value == "") {
    showMessage('registerMessage', '<i class="uil uil-times"></i>Nicht alle Felder ausgefüllt!', 'loginFail')
  }
  else {
    fetch(url + '/register/' + name.value + '/' + password.value)
    .then(response => response.json())
    .then(data => {
      if(data.message == 'success') {
        showMessage('registerMessage', '<i class="checkmark uil uil-check"></i>Sie sind jetzt registriert<br>Benutzer ' + name.value + ' angemeldet', 'loginSuccess')
        location.href = '../index.html'
      }else if (data.message == 'alreadyExist') {
        showMessage('registerMessage', '<i class="uil uil-times"></i>Dieser Bnutzername existiert schon!', 'loginFail')
      }
    })
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
  }
  else {
    loginMessage.classList = `${messageStatus}`
    loginMessage.innerHTML = `${message}`
  }
}