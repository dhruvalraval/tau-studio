  import lottie from 'lottie-web'
  
  const nav = document.querySelector('nav')
  let currentScrollTop, c = 0

  window.addEventListener('wheel', (e) => {
      let scrollTop = e.pageY
      let height = nav.getBoundingClientRect().height
      console.log(scrollTop, height)

      currentScrollTop = scrollTop

      if (c < currentScrollTop && scrollTop > height ) {
        nav.classList.add("scrollUp");
      } else if (c > currentScrollTop && !( scrollTop <= height)) {
        nav.classList.remove("scrollUp");
      }
      c = currentScrollTop;
  })

console.log('work')

lottie.loadAnimation({
  container: document.querySelector('.home_tau_logo'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '../assets/lotties/tau3.json'
})

lottie.loadAnimation({
  container: document.querySelector('.home_true_love_logo'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '../assets/lotties/cruelove.json'
})
