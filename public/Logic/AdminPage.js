const userButton = () => {
    const chkeckboxStatus = document.getElementById('deleteInput').checked
    let username = "none"
    if(document.getElementById("usernameInput2").value) {
        username = document.getElementById("usernameInput2").value
    }
    if(chkeckboxStatus) {
        fetch(url + "/admin/delete/" + username)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }else {
        fetch(url + "/admin/get/" + username)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let outputData
            if(username == "none") {
                data.returnData.map(user => outputData += "Username: " + outputData.username + "Money: " + outputData.money + "Last Reward: " + outputData.lastreward + "\n")
            }
            document.getElementById("outputUsers").innerHTML = outputData
        })
    }
}

const editButton = () => {
    const username = document.getElementById("usernameInput1").value
    const money = document.getElementById("moneyInput").value
    fetch(url + "/admin/money/" + username + "," + money)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        getUserData()
    })
}

const checkIfAdmin = () => {
    fetch(url + "/checkIfAdmin")
    .then(response => response.json())
    .then(data => {
        if(!data.returnMessage) {
            window.location.href = "NoAdminPage.html"
        }
    })
}

checkIfAdmin()