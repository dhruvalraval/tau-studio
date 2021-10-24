import imagesLoaded from 'imagesloaded'

import LottieAnimation from "./utils/lottie"

import Navigation from './components/Navigation'

import SmoothScroll from './animations/smoothScrolling'
import navigation from './animations/navigation'

import About from './pages/About/index'
import Services from './pages/Services/index'
import Work from './pages/Work/index'
import Home from './pages/Home/index'

import CrueLove from './pages/Projects/cruelove'
import LateReservation from './pages/Projects/latereservation'
import PZAC from './pages/Projects/pzac'
import Baucees from './pages/Projects/baucess'

class App {
    constructor() {

        this.createContent()

        this.createNavigation()
        this.createPages()


        this.addEventListeners()
        this.addLinkListeners()

        this.onResize()

        this.update()

        this.onPreloaded()

        this.navAnimation()

        this.createSmoothScrolling()

    
        this.y = {
          start: 0,
          distance: 0,
          end: 0
        }

    }

    createSmoothScrolling() {
        this.scroll = new SmoothScroll()

        console.log(this.scroll)
    }

    createContent() {
        this.content = document.querySelector('.content')
        this.template = this.content.getAttribute('data-template')
    }

    createNavigation () {
        this.navigation = new Navigation({
          template: this.template
        })
    }

    createPages () {
        this.pages = {
          about: new About(),
          services: new Services(),
          work: new Work(),
          home: new Home(),
          cruelove: new CrueLove(),
          latereservation: new LateReservation(),
          pzac: new PZAC(),
          baucees: new Baucees()
        }

        
        this.page = this.pages[this.template]
        console.log(this.page)
        this.page.create()
        
    }
    
    navAnimation() {
        this.navanimation = new navigation()
    }

    onPreloaded () {
        this.onResize()
        imagesLoaded(document.querySelector('.content'), (instance) => {
            console.log('all images are loaded');
            LottieAnimation()

        })
        // this.page.show()
    }

    onChange () {
        this.content.setAttribute('data-template', this.template )
        
        this.page = this.pages[this.template]
        this.page.create()
        
        // this.canvas.onChange(this.template)
        this.navigation.onChange(this.template)

        // this.page.show()
        
        this.onResize()
        
        this.addLinkListeners()
    }
    

    onResize () {
        // requestAnimationFrame(_ => {
        //   if(this.canvas && this.canvas.onResize) {
        //     this.canvas.onResize()
        //   }
        // })
    
        if(this.page && this.page.onResize) {
          this.page.onResize()
        }
    }

    onWheel (event) {
        // const normalizedWheel = normalizeWheel(event)
    
        if(this.pages.home && this.pages.home.onWheel) {
          this.pages.home.onWheel(event)
        }
        if(this.navanimation && this.navanimation.onWheel) {
            this.navanimation.onWheel(event)
        }

    }
    
    // onTouchDown (event) {
        
    //     this.y.start = event.touches ? event.touches[0].pageY : event.pageY   

    //     const values = {
    //       y: this.y
    //     }

    //     if(this.page && this.page.onTouchDown) {
    //         this.page.onTouchDown(values)
    //     }
    // }

    onTouchMove (event) {

        // this.y.start = event.touches ? event.touches[0].pageY : event.pageY
    
        // const values = {
        //   y: this.y
        // }

    
        if(this.navanimation && this.navanimation.onTouchMove) {
            this.navanimation.onTouchMove(event)
        }

    }

    // onTouchUp (event) {
    
    //     this.y.end = event.changedTouches ? event.changedTouches[0].pageY : event.pageY
    
    //     this.y.distance = this.y.start - this.y.end
    
    //     const values = {
    //       y: this.y
    //     }   


    //     if(this.page && this.page.onTouchUp) {
    //         this.page.onTouchUp(values)
    //     }
    // }

    update() {

        if(this.page && this.page.update) {
            this.page.update()
        }
    
        if(this.canvas && this.canvas.update) {
            this.canvas.update(this.page.onWheel)
        }
        this.frame = window.requestAnimationFrame(this.update.bind(this))
    }

      /**
   * Listeners
   */

    addEventListeners() {
        window.addEventListener('wheel', this.onWheel.bind(this))
        window.addEventListener('scroll', _ => {
            // if(this.pages.home && this.pages.home.onWheel) {
            //     this.pages.home.onScroll(e)
            // }
        })

        // window.addEventListener('touchstart', this.onTouchDown.bind(this))
        window.addEventListener('touchmove', this.onTouchMove.bind(this))
        // window.addEventListener('touchend', this.onTouchUp.bind(this))

        window.addEventListener('resize', this.onResize.bind(this))
    }


    addLinkListeners () {

    }
}

new App()