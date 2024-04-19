const resetWheel = () => {
    theWheel.stopAnimation(false)
    theWheel.rotationAngle = 0
    theWheel.draw()
}

const alertPrize = (indicatedSegment) => {
    getUserData()
    showMessage('rewardSuccess', indicatedSegment.text + '<img style="width:4vh; height:4vh;" src="../assets/Coin.png" alt="Coin"> zu Ihrem Kontostand hinzugefügt!')
    wheelSpinning = false
}

const getButton = document.getElementById('getButton')

const rewardMessage = document.getElementById('rewardMessage')
let wheelSpinning = false
let theWheel = new Winwheel({
    'numSegments'  : 8,
    'outerRadius'  : 212,
    'textFontSize' : 28,
    'segments'     :
    [
       {'fillStyle' : '#ffffff', 'text' : '1'},
       {'fillStyle' : '#ffeba7', 'text' : '10'},
       {'fillStyle' : '#ffffff', 'text' : '100'},
       {'fillStyle' : '#ffeba7', 'text' : '1000'},
       {'fillStyle' : '#ffffff', 'text' : '1'},
       {'fillStyle' : '#ffeba7', 'text' : '10'},
       {'fillStyle' : '#ffffff', 'text' : '100'},
       {'fillStyle' : '#ffeba7', 'text' : '1000'}
    ],
    'animation' :
    {
        'type'     : 'spinToStop',
        'duration' : 5,
        'spins'    : 8,
        'stopAngle': 85,
        'callbackFinished' : alertPrize
    }
})

const startSpin = () => {
    if (!wheelSpinning) {
        resetWheel()
        fetch(url + '/wheelspin')
        .then(response => response.json())
        .then(data => {
            if(data.message != 'nooneLoggedIn' && data.message != 'notReady') {
                theWheel.animation.stopAngle = parseInt(data.message)
                theWheel.startAnimation()
                wheelSpinning = true
                setInterval(updateCountdown, 1000)
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