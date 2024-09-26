window.addEventListener('DOMContentLoaded', () => {
  Array.from(document.querySelectorAll('.text-scroller')).forEach(textScroller => {
    const startingText = textScroller.innerText;
    const words = textScroller.dataset.words.split(',').map(word => word.trim())
    const wordNodes = []

    const scrollDelay = 2000
    const animationDuration = window.getComputedStyle(textScroller).getPropertyValue('transition-duration')

    words.forEach(word => {
      const wordNode = document.createElement('span')
      wordNode.innerHTML = word
      wordNodes.push(wordNode)
    })
    console.log(wordNodes)
    textScroller.innerHTML = ""

    loopThroughWords(wordNodes, scrollDelay)
    setInterval(() => {
      loopThroughWords(wordNodes, scrollDelay)
    }, scrollDelay*wordNodes.length)

    function loopThroughWords(wordNodes, delay) {
      wordNodes.forEach((node, i, list) => {
        setTimeout(() => {
          textScroller.prepend(node)
          node.classList.add('incoming-word')
          
          setTimeout(() => {
            node.classList.remove('incoming-word')
          }, animationDuration)

          setTimeout(() => {
            list.at(i-1).classList = ''
            list.at(i-1).remove()
          }, animationDuration*2)
        }, delay*i)
      })
    }
  })
})
