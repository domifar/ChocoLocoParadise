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

function startSpin() {
    if (!wheelSpinning) {
        resetWheel()
        fetch(url + '/wheelspin')
        .then(response => response.json())
        .then(data => {
            if(data.message == 'nooneLoggedIn') {
                showMessage('rewardFail', 'Bitte anmelden, um abzuholen!')
            }else if (data.message == 'notReady') {
                showMessage('rewardFail', 'Drehung wurde schon abgeholt')
            }else {
                theWheel.animation.stopAngle = parseInt(data.message)
                theWheel.startAnimation()
                wheelSpinning = true
            }
        })
    }
}

function resetWheel() {
    theWheel.stopAnimation(false)
    theWheel.rotationAngle = 0
    theWheel.draw()
}

function alertPrize(indicatedSegment) {
    getUserData()
    showMessage('rewardSuccess', indicatedSegment.text + '<img style="width:4vh; height:4vh;" src="../assets/Coin.png" alt="Coin"> zu Ihrem Kontostand hinzugefügt!')
    wheelSpinning = false
}

const showMessage = (type, message) => {
    rewardMessage.classList = type
    rewardMessage.innerHTML = message
}