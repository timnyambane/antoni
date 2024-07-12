document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.querySelector('.video-slider')
  const sliderContainer = document.querySelector('.slider-container')
  const videoItems = document.querySelectorAll('.video-item')
  const leftBtn = document.querySelector('.left-btn')
  const rightBtn = document.querySelector('.right-btn')

  // Initialize Smooth Scrollbar
  const scrollbar = Scrollbar.init(scrollContainer, {
    damping: 0.1,
    thumbMinSize: 20,
    continuousScrolling: true, // Enable continuous scrolling
  })

  // Get the width of one video item
  const videoItemWidth = videoItems[0].offsetWidth

  // Handle mouse wheel event to scroll the slider horizontally
  sliderContainer.addEventListener('wheel', (event) => {
    event.preventDefault()
    const scrollAmount = event.deltaY * 1.5 // Adjust scroll speed if needed
    scrollbar.scrollLeft += scrollAmount
  })

  // Handle button clicks to scroll the slider one video item at a time
  leftBtn.addEventListener('click', () => {
    scrollbar.scrollTo(scrollbar.offset.x - videoItemWidth, 0, 600) // Scroll one video item to the left
  })

  rightBtn.addEventListener('click', () => {
    scrollbar.scrollTo(scrollbar.offset.x + videoItemWidth, 0, 600) // Scroll one video item to the right
  })

  // Play/pause video on hover and loop when hovered
  videoItems.forEach((item) => {
    const video = item.querySelector('video')
    let isPaused = true
    let pausedTime = 0

    item.addEventListener('mouseenter', () => {
      if (isPaused) {
        video.currentTime = pausedTime
      }
      video.play()
      item.classList.add('hovered')
      video.loop = true // Enable looping
      videoItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('hovered')
          otherItem.querySelector('video').pause() // Pause other videos
        }
      })
    })

    item.addEventListener('mouseleave', () => {
      video.pause()
      pausedTime = video.currentTime
      isPaused = true
      item.classList.remove('hovered')
      video.loop = false // Disable looping when not hovered
    })
  })

  // Scroll horizontally as the page scrolls vertically
  window.addEventListener('scroll', () => {
    const scrollAmount = window.scrollY * 1.5 // Adjust the scroll ratio as needed
    scrollbar.scrollLeft = scrollAmount
  })
})
