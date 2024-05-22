const url = 'https://chocolocoparadise.onrender.com'
// const url = 'http://localhost:3000'

fetch(url + '/user')
  .then(response => response.json())
  .then((data) => {
    if(data.text == 'fail') {
        document.getElementById('usernameField').innerHTML = "Anmelden"
        document.getElementById('moneyField').innerHTML = ""
    }
    else{
        document.getElementById('usernameField').innerHTML = data.username
        document.getElementById('moneyField').innerHTML = data.money + ' <img height="40vh" width="40vh" id="coinImage" class="coinImage" src="./assets/Coin.png" alt="Coin">'
    }
  })


let slideIndex = 0;
let slides = document.getElementsByClassName("mySlides")
var container = document.querySelector(".gamecards")
var isDown = false
var startX
var scrollLeft

container.addEventListener('mousedown', (e) => {
  isDown = true
  startX = e.pageX - container.offsetLeft
  scrollLeft = container.scrollLeft
})

container.addEventListener('mouseleave', () => {
  isDown = false
})

container.addEventListener('mouseup', () => {
  isDown = false
})

container.addEventListener('mousemove', (e) => {
  if(!isDown) return
  console.log("wiemachma")
  e.preventDefault()
  const x = e.pageX - container.offsetLeft
  const walk = (x - startX)
  container.scrollLeft = scrollLeft - walk
})

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex - 1].style.display = "block"
  setTimeout(showSlides, 5000)
}

showSlides();