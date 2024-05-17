const express = require('express')
const session = require('express-session')
const path = require('path')
const fs = require('node:fs')
const app = express()
const port = process.env.PORT || 3000
const multipliersMineGame = [
  [1.01, 1.08, 1.12, 1.18, 1.24, 1.3, 1.37, 1.46, 1.55, 1.65, 1.77, 1.99, 2.06, 2.25, 2.47, 2.75, 3.09, 3.54, 4.12, 4.95, 6.19, 8.25, 12.38, 24.75],
  [1.08, 1.17, 1.29, 1.41, 1.56, 1.74, 1.94, 2.18, 2.47, 2.83, 3.26, 3.81, 4.5, 5.4, 6.6, 8.25, 10.61, 14.14, 19.8, 29.7, 49.5, 99, 297],
  [1.12, 1.29, 1.48, 1.71, 2, 2.35, 2.79, 3.35, 4.07, 5, 6.26, 7.96, 10.35, 13.8, 18.97, 27.11, 40.66, 65, 113.9, 227.7, 569.3, 2277],
  [1.18, 1.41, 1.71, 2.09, 2.58, 3.23, 4.09, 5.26, 6.88, 9.17, 12.51, 17.52, 25.3, 37.95, 59.64, 99.39, 178.8, 357.8, 834.9, 2504, 12523],
  [1.24, 1.56, 2, 2.58, 3.39, 4.52, 6.14, 8.5, 12.04, 17.52, 26.27, 40.87, 66.41, 113.9, 208.7, 417.5, 939.3, 2504, 8766, 52598],
  [1.3, 1.74, 2.35, 3.23, 4.52, 6.46, 9.44, 14.17, 21.89, 35.03, 58.38, 102.17, 189.75, 379.5, 834.9, 2087, 6261, 25047, 175329],
  [1.37, 1.94, 2.79, 4.09, 6.14, 9.44, 14.95, 24.47, 41.6, 73.95, 138.66, 277.33, 600.87, 1442, 3965, 13219, 59486, 475893],
  [1.46, 2.18, 3.35, 5.22226, 8.5, 14.17, 24.74, 55.05, 83.2, 166.4, 356.56, 831.98, 2163, 6489, 23794, 118973, 1070759],
  [1.55, 2.47, 4.07, 6.88, 12.04, 21.89, 41.6, 83.2, 176.8, 404.1, 1010, 2828, 9193, 36773, 202254, 2022545],
  [1.65, 2.83, 5, 9.17, 17.52, 35.03, 73.95, 166.4, 404.1, 1077, 3232, 11314, 49031, 294188, 3236072],
  [1.77, 3.26, 6.26, 12.51, 26.77, 58.38, 138.66, 356.56, 1010, 3232, 12123, 56574, 367735, 4412826],
  [1.99, 3.81, 7.96, 17.52, 40.87, 102.17, 277.33, 831.98, 2828, 11314, 56574, 396022, 5148297],
  [2.06, 4.5, 10.35, 25.3, 66.41, 189.75, 600.87, 2163, 9193, 49031, 367735, 5148297],
  [2.25, 5.4, 13.8, 37.95, 113.85, 379.5, 1442, 6489, 36773, 294188, 4412826],
  [2.47, 6.6, 18.97, 59.64, 208.72, 834.9, 3965, 23794, 202254, 3236072],
  [2.75, 8.25, 27.11, 99.39, 417.45, 2087, 13219, 118973, 2022545],
  [3.09, 10.61, 40.66, 178.91, 939.26, 6261, 59486, 1070759],
  [3.54, 14.14, 65.06, 357.81, 2504, 25047, 475893],
  [4.12, 19.8, 113.85, 834.9, 8768, 175329],
  [4.95, 29.7, 227.7, 2504, 52598],
  [6.19, 49.5, 569.3, 12523],
  [8.25, 99, 2277],
  [12.37, 297],
  [24.75] 
]
const legitMinesfield = ["00", "01", "02", "03", "04", "10", "11", "12", "13", "14", "20", "21", "22", "23", "24", "30", "31", "32", "33", "34", "40", "41", "42", "43", "44"]

app.use(express.static('public'))
app.use(express.json())
app.use(session({
  secret: 'geheimnis',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/login/:username/:password', (req, res) => {
  let returnMessage
  const username = req.params.username
  const password = req.params.password

  fs.readFile('./public/Database/Users.txt', 'utf-8', (err, data) => {
    if(err) throw err
    data = JSON.parse(data)
    const chosenUser = data.find(user => user.username == username)
    if(chosenUser) {
      if(chosenUser.password == password) {
        req.session.username = chosenUser.username
        req.session.money = chosenUser.money
        req.session.lastreward = chosenUser.lastreward
        returnMessage = 'success'
      }else {
        returnMessage = 'passwordFail'
      }
    }else {
      returnMessage = 'usernameFail'
    }
    
    res.send(JSON.stringify({
      message: returnMessage
    }))
  })
})

app.get('/register/:username/:password', (req, res) => {
  let returnMessage
  const username = req.params.username
  const password = req.params.password

  fs.readFile('./public/Database/Users.txt', 'utf-8', (err, data) => {
    if(err) throw err
    data = JSON.parse(data)
    const chosenUser = data.find(user => user.username == username)
    if(chosenUser) {
      returnMessage = 'alreadyExist'
    }else {
      req.session.username = username
      req.session.money = "100"
      req.session.lastreward = "null"
      data.push({
        username: username,
        password: password,
        money: "100",
        lastreward: "null"
      })
      fs.writeFile('./public/Database/Users.txt', JSON.stringify(data), 'utf8', function(err){
         if (err) throw err
      })
      returnMessage = 'success'
    }
    
    res.send(JSON.stringify({
      message: returnMessage
    }))
  })
})

app.get('/user', (req, res) => {
  if(req.session.username && req.session.money) {
    res.send(JSON.stringify({
      username: req.session.username,
      money: req.session.money,
      text: 'success'
    }))
  }
  else {
    res.send(JSON.stringify({
      username: 'noName',
      money: 'noMoney',
      text: 'fail'
  }))
  }
})

app.get('/convertJson', (req, res) => {
  fs.readFile('./public/Database/Users.txt', 'utf-8', (err, data) => {
    if(err) throw err
    data = JSON.parse(data)

    let jsonData = JSON.stringify(data, null, '\t')

    fs.writeFile('./public/Database/data.json', jsonData, (err) => {
      if (err) {
          console.error(err)
          return
      }
    })
  })
})

app.get('/newminefield/:minescount/:bet', (req, res) => {
  if(req.session.username) {
    req.session.minesBoard = undefined
    let bet = checkBet(req.params.bet, req.session.money)
    const minescount = checkMinesCount(req.params.minescount)
    if(req.session.money < 1) {
      bet = -1
    }

    req.session.minesBoard = new Array(9)
    req.session.minesBoard[5] = bet
    req.session.minesBoard[6] = minescount
    req.session.minesBoard[7] = 0
    req.session.minesBoard[8] = new Array()
    for (var i = 0; i < 5; i++) {
      req.session.minesBoard[i] = new Array(5).fill('schoko')
    }

    for (var i = 0; i < minescount; i++) {
        var x, y
        do {
            x = Math.floor(Math.random() * 5)
            y = Math.floor(Math.random() * 5)
        } while (req.session.minesBoard[x][y] === 'mine')
        req.session.minesBoard[x][y] = 'mine'
    }

    if(bet == -1) {
      req.session.minesBoard = undefined
    }
    res.send(JSON.stringify({
      messageMine: `${minescount}`,
      messageBet: `${bet}`
    }))
  }
  else{
    res.send({
      messageMine: 'noMine',
      messageBet: 'noBet'
    })
  }
})

app.get('/minefield', (req, res) => {
  res.send(JSON.stringify({
    board: req.session.minesBoard
  }))
})

app.get('/minetap/:tapid', async (req, res) => {
  if(req.session.minesBoard) {
    let boardreturn = undefined
    const tappedmine = req.params.tapid
    if(!req.session.minesBoard[8].includes(tappedmine) && legitMinesfield.includes(tappedmine)) {
      req.session.minesBoard[8].push(tappedmine)

      const tappedmineid = tappedmine.split('')

      let tappedfield = req.session.minesBoard[tappedmineid[0]][tappedmineid[1]]
      const multiplyer = multipliersMineGame[req.session.minesBoard[6] - 1][req.session.minesBoard[7]]
      const potentialTake = `${(req.session.minesBoard[5] * multiplyer).toFixed(2)}`
      if(tappedfield == 'mine') {
        req.session.money = await updateMoney(req.session.username, -(req.session.minesBoard[5]))
        boardreturn = req.session.minesBoard
        req.session.minesBoard = undefined
      }else {
        req.session.minesBoard[7]++
        if(req.session.minesBoard[7] >= (25 - req.session.minesBoard[6])) {
          tappedfield = 'finish'
          boardreturn = req.session.minesBoard
          req.session.money = await updateMoney(req.session.username, (req.session.minesBoard[5] * (multipliersMineGame[req.session.minesBoard[6] - 1][req.session.minesBoard[7] - 1])) - req.session.minesBoard[5])
          req.session.minesBoard = undefined
        }
      }
      res.send(JSON.stringify({
        content: tappedfield,
        multiplyer: `${multiplyer}`,
        potentialTake: potentialTake,
        board: boardreturn
      }))
    }else {
      res.send(JSON.stringify({
        content: 'doubleclickfail'
      }))
    }
  }else {
    res.send(JSON.stringify({
      content: 'fail'
    }))
  }
})

app.get('/minescashout', async (req, res) => {
  if(req.session.minesBoard && req.session.minesBoard[7] > 0) {
    try {
      const board = req.session.minesBoard
      const multiplyer = multipliersMineGame[board[6] - 1][board[7] - 1]
      const wonmoney = board[5] * multiplyer
      req.session.money = await updateMoney(req.session.username, wonmoney - board[5])
      req.session.minesBoard = undefined
      res.send(JSON.stringify({
        wonmoney: wonmoney,
        multiplyer: multiplyer,
        board: board
      }))
    } catch (err) {
      console.error(err)
      res.status(500).send('Ein Fehler ist aufgetreten')
    }
  }else {
    res.send(JSON.stringify({
      wonmoney: 0,
      multiplyer: 0
    }))
  }
})

app.get('/resetMinesBoard', (req, res) => {
  if(req.session.username) {
    req.session.minesBoard = undefined
  }
})

app.get('/wheelspin', async (req, res) => {
  let returnMessage

  if(req.session.username) {
    const today = new Date(new Date().toUTCString())
    today.setHours(0, 0, 0, 0)
    const lastreward = new Date(req.session.lastreward)
    if(req.session.lastreward == "null" || lastreward.getTime() < today.getTime()) {
      req.session.lastreward = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      await updateLastReward(req.session.username, req.session.lastreward)
      const segment = Math.floor(Math.random() * 8) + 1
      const segmentDegree = (Math.floor(Math.random() * 35) + 1) + 5
      switch (segment) {
        case 1:
          returnMessage = '' + (segmentDegree + 0)
          req.session.money = await updateMoney(req.session.username, 1)
          break
        case 2:
          returnMessage = '' + (segmentDegree + 45)
          req.session.money = await updateMoney(req.session.username, 10)
          break
        case 3:
          returnMessage = '' + (segmentDegree + 90)
          req.session.money = await updateMoney(req.session.username, 100)
          break
        case 4:
          returnMessage = '' + (segmentDegree + 135)
          req.session.money = await updateMoney(req.session.username, 1000)
          break
        case 5:
          returnMessage = '' + (segmentDegree + 180)
          req.session.money = await updateMoney(req.session.username, 1)
          break
        case 6:
          returnMessage = '' + (segmentDegree + 225)
          req.session.money = await updateMoney(req.session.username, 10)
          break
        case 7:
          returnMessage = '' + (segmentDegree + 270)
          req.session.money = await updateMoney(req.session.username, 100)
          break
        case 8:
          returnMessage = '' + (segmentDegree + 315)
          req.session.money = await updateMoney(req.session.username, 1000)
          break
        default:
          returnMessage = 'servus'
          break
      }
    }else {
      returnMessage == 'notReady'
    }
  }else {
    returnMessage = 'nooneLoggedIn'
  }

  res.send(JSON.stringify({
    message: returnMessage
  }))
})

app.get('/rewardstatus', (req, res) => {
  let returnMessage

  if(req.session.username) {
    const today = new Date(new Date().toUTCString())
    today.setHours(0, 0, 0, 0)
    const lastreward = new Date(req.session.lastreward)
    if(req.session.lastreward == "null" || lastreward.getTime() < today.getTime()) {
      returnMessage = 'Ready'
    }else {
      returnMessage = 'notReady'
    }
  }else {
    returnMessage = 'noOneLoggedIn'
  }

  res.send(JSON.stringify({
    message: returnMessage
  }))
})

app.get('/dice/:bet/:range/:side', async (req, res) => {
  let returnMessage
  let money
  let number
  let bet = parseInt(req.params.bet)
  let range = parseInt(req.params.range)
  let side = req.params.side

  if(req.session.username) {
    bet = checkBet(bet, req.session.money)
    range = checkDiceRange(range)

    do {
      number = Math.floor(Math.random() * 100) + 1
    }while(number == range)
    
    if(side == 'over') {
      let temp = 100 - range
      money = (100 / temp * bet)
    }else {
      money = (100 / range * bet)
    }

    if((side == 'over' && number > range) || (side == 'under' && number < range)) {
      req.session.money = await updateMoney(req.session.username, money - bet)
      returnMessage = 'success'
    }else {
      req.session.money = await updateMoney(req.session.username, -(bet))
      money = bet
      returnMessage = 'fail'
    }
    
  }else {
    returnMessage = 'nooneLoggedIn'
    number = 50
    money = 0
  }

  res.send(JSON.stringify({
    message: returnMessage,
    number: number,
    wonmoney: money,
    bet: bet
  }))
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '/public/Sites/NoSite.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const updateMoney = async (username, money) => {
  return new Promise((resolve, reject) => {
    fs.readFile('./public/Database/Users.txt', 'utf8', function(err, data){
      if (err) reject(err)
      data = JSON.parse(data)
      let changedUser = data.find(user => user.username == username)
      changedUser.money = `${(parseFloat(changedUser.money) + money).toFixed(2)}`
      data = data.filter(user => user.username != username)
      data.push(changedUser)
      fs.writeFile('./public/Database/Users.txt', JSON.stringify(data), 'utf8', function(err){
        if (err) reject(err)
        resolve(changedUser.money)
      })
    })
  })
}

const updateLastReward = async (username, rewardDate) => {
  return new Promise((resolve, reject) => {
    fs.readFile('./public/Database/Users.txt', 'utf8', function(err, data){
      if (err) reject(err)
      data = JSON.parse(data)
      let changedUser = data.find(user => user.username == username)
      changedUser.lastreward = rewardDate
      data = data.filter(user => user.username != username)
      data.push(changedUser)
      fs.writeFile('./public/Database/Users.txt', JSON.stringify(data), 'utf8', function(err){
        if (err) reject(err)
        resolve('success')
      })
    })
  })
}

const checkMinesCount = (value) => {
  if (value == '') {
    return 1
  } else {
    let num = parseFloat(value)
    if (!isNaN(num) && Number.isInteger(num)) {
        num = parseInt(num)
        if(num >= 25) {
          return 24
        }else if(num <= 0) {
          return 1
        }
        return num
    } else {
        return 1
    }
  }
}

const checkBet = (value, userMoney) => {
  if (value == '') {
    return 1
  } else {
    let num = parseFloat(value)
    if (!isNaN(num)) {
        if(num > parseFloat(userMoney)) {
          return userMoney
        }else if(num <= 0) {
          return 1
        }
        return num
    } else {
      return 1
    }
  }
}

const checkDiceRange = (range) => {
  if (range == '') {
    return 50
  } else {
    let num = parseFloat(range)
    if (!isNaN(num) && Number.isInteger(num)) {
        num = parseInt(num)
        if(num > 99) {
          return 99
        }else if(num < 1) {
          return 1
        }
        return num
    } else {
      return 50
    }
  }
}