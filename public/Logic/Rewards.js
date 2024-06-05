const getButton = document.getElementById('getButton')

const rewardMessage = document.getElementById('rewardMessage')

const startSpin = () => {
    if (!wheelSpinning) {
        resetWheel()
        fetch(url + '/wheelspin')
        .then(response => response.json())
        .then(data => {
            if(data.message != 'nooneLoggedIn' && data.message != 'notReady') {
                setInterval(updateCountdown, 1000)
                showMessage('rewardSuccess', '100 <img style="width:4vh; height:4vh;" src="../assets/Coin.png" alt="Coin"> zu Ihrem Kontostand hinzugefügt!')
                getUserData()
            }
        })
    }
}

const showMessage = (type, message) => {
    rewardMessage.classList = type
    rewardMessage.innerHTML = message
}

const updateCountdown = () => {
    var now = new Date()
    var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    var remainingTime = midnight - now

    var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)

    hours = hours.toString().padStart(2, '0')
    minutes = minutes.toString().padStart(2, '0')
    seconds = seconds.toString().padStart(2, '0')

    getButton.innerHTML = hours + ":" + minutes + ":" + seconds
}

document.addEventListener("DOMContentLoaded", () => {
    fetch(url + '/rewardstatus')
    .then(response => response.json())
    .then(data => {
        if(data.message == 'noOneLoggedIn') {
            getButton.innerHTML = 'Bitte zuerst Anmelden'
        }else if(data.message == 'notReady') {
            setInterval(updateCountdown, 1000)
        }else if(data.message == 'Ready') {
            getButton.innerHTML = 'Drehen'
        }
    })
})