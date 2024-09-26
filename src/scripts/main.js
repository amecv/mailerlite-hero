window.addEventListener('DOMContentLoaded', () => {

  // Set up the animation for any elements on the page with class "text-scroller"
  Array.from(document.querySelectorAll('.text-scroller')).forEach(textScroller => {
    const words = textScroller.dataset.words.split(',').map(word => word.trim())
    const wordNodes = []

    // How long each word should show
    const scrollDelay = 2000
    // Get the transition-duration from the css and convert it to milliseconds
    const animationDuration = parseFloat(window.getComputedStyle(textScroller).getPropertyValue('transition-duration'))*1000

    // Create span elements for each word, and put them in the 'wordNodes' array
    words.forEach(word => {
      const wordNode = document.createElement('span')
      wordNode.innerHTML = word
      wordNodes.push(wordNode)
    })

    // Clear any pre-existing text from the element
    textScroller.innerHTML = ""

    //Do the thing
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
            list.at(i-1).classList.add('outgoing-word')
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
