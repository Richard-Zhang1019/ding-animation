const playGround = document.querySelector('.playground')
const list = document.querySelector('.list')
const items = document.querySelectorAll('.list-item')

const animationMap = new Map()

function updateMap() {
  animationMap.clear()
}

function createAnimation(scrollStart, scrollEnd, valStart, valEnd) {
  return function (scroll) {
    if (scroll <= scrollStart) {
      return valStart
    }
    if (scroll >= scrollEnd) {
      return valEnd
    }
    return (
      valStart +
      ((valEnd - valStart) * (scroll - scrollStart)) / (scrollEnd - scrollStart)
    )
  }
}

function updateStyles() {
  const scroll = window.scrollY
  for (let [dom, value] of animationMap) {
    for (const cssProp in value) {
      dom.style[cssProp] = value[cssProp](scroll)
    }
  }
}

updateStyles()

window.addEventListener('scroll', updateStyles)
