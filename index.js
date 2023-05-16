const playground = document.querySelector('.playground')
const list = document.querySelector('.list')
const items = document.querySelectorAll('.list-item')

const animationMap = new Map()

function updateMap() {
  animationMap.clear()
  const playgroundRect = playground.getBoundingClientRect()
  const scrollStart = playgroundRect.top + window.scrollY
  const scrollEnd = playgroundRect.bottom + window.scrollY - window.innerHeight
  for (const item of items) {
    animationMap.set(item, getDomAnimation(scrollStart, scrollEnd, item))
  }
}

function getDomAnimation(scrollStart, scrollEnd, dom) {
  scrollStart = dom.dataset.order * 400 + scrollStart

  const opacityAnimation = createAnimation(scrollStart, scrollEnd, 0, 1)
  const opacity = function (scroll) {
    return opacityAnimation(scroll)
  }

  const xAnimation = createAnimation(scrollStart, scrollEnd, list.clientWidth / 2 - dom.offsetLeft - dom.clientWidth / 2, 0)
  const yAnimation = createAnimation(scrollStart, scrollEnd, list.clientHeight / 2 - dom.offsetTop - dom.clientHeight / 2, 0)

  const scaleAnimation = createAnimation(scrollStart, scrollEnd, 0.5, 1)
  const transform = function (scroll) {
    return `translate(${xAnimation(scroll)}px, ${yAnimation(scroll)}px) scale(${scaleAnimation(scroll)})`
  }

  return {
    opacity,
    transform,
  }
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
updateMap()
updateStyles()

window.addEventListener('scroll', updateStyles)
