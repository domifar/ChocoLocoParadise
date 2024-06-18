const result = document.getElementById('result')

const send = () => {
    let bets = document.getElementsByClassName('firstInput')
    let chosenTeams = []
    for (var i = 0; i < bets.length; i++) {
        if (bets[i].checked) {
            chosenTeams.push('A');
        } else {
            chosenTeams.push('B');
        }
    }
    console.log(chosenTeams)

    fetch(url + '/bet', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chosenTeams })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        result.innerHTML = data.message
        result.classList = data.statusBet
    })
}