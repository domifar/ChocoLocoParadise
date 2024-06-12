document.addEventListener("DOMContentLoaded", () => {
    fetch(url + "/ranking")
    .then(response => response.json())
    .then(data => {
        let output = ''
        let counter = 1
        data.list.map((user) => {
            output += counter + ".) " + user.username + " money: " + user.money + "<br>"
            counter++
        })
        document.getElementById('outputRanking').innerHTML = output
    })
})