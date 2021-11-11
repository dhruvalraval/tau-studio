import imagesLoaded from 'imagesloaded'
import gsap from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'
import { each } from 'lodash'
import { DateTime } from 'luxon'

import barba from '@barba/core'

import Canvas from './components/Canvas'
import Navigation from './components/Navigation'

// import SmoothScroll from './animations/smoothScrolling'
import navigation from './animations/navigation'
import EnterAnimation from './animations/EnterAnimation'
import GeneralTransition from './animations/GeneralTransition'
import fadeIn from './animations/fadeIn'
import fadeOut from './animations/fadeOut'

import About from './pages/About/index'
import Services from './pages/Services/index'
import Work from './pages/Work/index'
import Home from './pages/Home/index'

import CrueLove from './pages/Projects/cruelove'
import LateReservation from './pages/Projects/latereservation'
import PZAC from './pages/Projects/pzac'
import Baucees from './pages/Projects/baucess'
import Brio from './pages/Projects/brio'
import Ivyhills from './pages/Projects/ivyhills'

class App {
    constructor() {

        this.preloader = document.querySelector('.preloader')
        this.preloaderText = document.querySelectorAll('.preloader_text')
        this.preloaderSvg = document.querySelector('.preloader_svg')
        this.preloaderCircle = document.querySelector('.preloader_circle')
        this.container = document.querySelector('[data-scroll-container]')
        this.colorSlider = document.querySelector('input[name="blobColor"]')
        this.processingSlider = document.querySelector('input[name="blobProcess"]')
        
        this.dt = DateTime.now().setZone("America/New_York")
        this.nycHour = this.dt.hour
        this.nycMin = this.dt.minute
        
        this.createContent()
        
        this.createNavigation()
        this.createPages()
        
        this.onPreloaded()
        this.createCanvas()

        this.addEventListeners()
        
        this.onResize()
        
        // this.update()
        this.calculateDate()
        
        
        this.navAnimation()
        
        this.addLinkListeners()

        this.y = {
          start: 0,
          distance: 0,
          end: 0
        }

        
    }   

    startBarba() {
        barba.hooks.after(() => {
            this.scroll.update()
            this.update(this.scroll)
            if(document.querySelector('.home_video_section_element_back')){
                document.querySelector('.home_video_section_element_back').play()
            }
            this.backToTop = document.querySelector('.home_footer_top_link')
            const target = document.querySelector('#top')
            
            this.backToTop.addEventListener('click', (e) => {
                    this.scroll.scrollTo(target)
            })

            this.dt = DateTime.now().setZone("America/New_York")
            this.nycHour = this.dt.hour
            this.nycMin = this.dt.minute
            const footerTime = document.querySelector('.home_footer_timestamp_time')
            if(footerTime){
                footerTime.textContent = `[${this.nycHour}:${this.nycMin}]`
            }

            this.textfield = document.querySelectorAll('#textfield')
            this.emailfield = document.querySelectorAll('#emailfield')
    
            this.textSpan = document.querySelectorAll('.contact_form_name_text')
            this.emailSpan = document.querySelectorAll('.contact_form_name_email')
    
            if(this.template === 'home' || this.template === 'about'){
    
                this.textfield.forEach(text => {
                    text.addEventListener('click', _ => {
                        gsap.to('.contact_form_name_text', {
                            autoAlpha: 0,
                            duration: 0.2, 
                            ease: 'Power2.easeOut'
                        })
                    })
                })
                
                this.emailfield.forEach(email => {

                    email.addEventListener('click', _ => {
                        gsap.to(this.emailSpan, {
                            autoAlpha: 0,
                            duration: 0.2, 
                            ease: 'Power2.easeOut'
                        })
                    })
                })
            }

        });
        
        barba.init({
            transitions: [
                {   
                    name: 'general-transition',
                    once: ({ next }) => {
                        const color = '#EBAD3C'
                        EnterAnimation(this.preloader, this.preloaderText, next.container, color)
                        this.scroll = new LocomotiveScroll({
                            el: this.container,
                            smooth: true,
                            lerp: 0.08,
                            smartphone: {
                                smooth: true
                            },
                            tablet: {
                                smooth: true
                            }
                        })
                    },
                    async leave ({ current }) {
                        // const done = this.async();
                        await fadeOut({container: current.container, color: '#EBAD3C'})
                    
                    },
                    enter: ({ next }) => { 
                        gsap.to(document.querySelector('nav'), {
                            autoAlpha: 1,
                            duration: 0.2,
                            ease: 'Power2.easeOut'
                        })
                        fadeIn({container: next.container})
                        this.onChange(next.namespace)
                        this.scroll.setScroll(0,0);
                        this.scroll.update();
                    }
                },
                {   
                    name: 'home-transition',
                    from: {
                        namespace: [
                            'home', 'work', 'about'
                        ]
                    },
                    to: {
                        namespace: [
                            'work', 'about', 'home'
                        ]
                    },
                    once: ({ next }) => {
                        const color = '#254F36'
                        EnterAnimation(this.preloader, this.preloaderText, next.container, color)
                        this.scroll = new LocomotiveScroll({
                            el: this.container,
                            smooth: true,
                            lerp: 0.08,
                            smartphone: {
                                smooth: true
                            },
                            tablet: {
                                smooth: true
                            }
                        })
                    },
                    async leave ({ current }) {
                        await fadeOut({container: current.container, color: '#254F36'})
                    
                    },
                    enter: ({ next }) => { 
                        gsap.to(document.querySelector('nav'), {
                            autoAlpha: 1,
                            duration: 0.2,
                            ease: 'Power2.easeOut'
                        })
                        fadeIn({container: next.container})
                        this.onChange(next.namespace)
                        this.scroll.setScroll(0,0);
                        this.scroll.update();
                    }
                },
                {   
                    name: 'home-yellow-transition',
                    from: {
                        namespace: [
                            'home', 'services'
                        ]
                    },
                    to: {
                        namespace: [
                            'services', 'home'
                        ]
                    },
                    once: ({ next }) => {
                        const color = '#EBAD3C'
                        EnterAnimation(this.preloader, this.preloaderText, next.container, color)
                        this.scroll = new LocomotiveScroll({
                            el: this.container,
                            smooth: true,
                            lerp: 0.08,
                            smartphone: {
                                smooth: true
                            },
                            tablet: {
                                smooth: true
                            }
                        })
                    },
                    async leave ({ current }) {
                        await fadeOut({container: current.container, color: '#EBAD3C'})
                    
                    },
                    enter: ({ next }) => { 
                        gsap.to(document.querySelector('nav'), {
                            autoAlpha: 1,
                            duration: 0.2,
                            ease: 'Power2.easeOut'
                        })
                        fadeIn({container: next.container})
                        this.onChange(next.namespace)
                        this.scroll.setScroll(0,0);
                        this.scroll.update();
                    }
                },
                {   
                    name: 'project-transition',

                    to: {
                        namespace: [
                            'cruelove', 'baucees', 'latereservation', 'pzac', 'brio', 'ivyhills'
                        ]
                    },
                    once: ({ next }) => {
                        const color = '#F3EFE4'
                        EnterAnimation(this.preloader, this.preloaderText, next.container, color)
                        this.scroll = new LocomotiveScroll({
                            el: this.container,
                            smooth: true,
                            lerp: 0.08,
                            smartphone: {
                                smooth: true
                            },
                            tablet: {
                                smooth: true
                            }
                        })
                        const animationEnter = gsap.timeline()
                        animationEnter.to(next.container, {
                            autoAlpha: 1,
                            duration: 0.4,
                            delay: 1,
                            ease: 'Power2.easeOut'
                        })
                        animationEnter.to(document.querySelector('nav'), {
                            autoAlpha: 0,
                            duration: 0.2,
                            ease: 'Power2.easeOut',
                        })
                    },
                    async leave ({ current }) {
                        const animationLeave = gsap.timeline()
                        gsap.to(document.querySelector('nav'), {
                            autoAlpha: 0,
                            duration: 0.2,
                            ease: 'Power2.easeOut'
                        })
                        animationLeave.to(current.container, {
                            autoAlpha: 0,
                            duration: 0.2,
                            ease: 'Power2.easeOut'
                        })

                    },
                    enter: ({ next }) => { 

                        const animationEnter = gsap.timeline()
                        animationEnter.to(next.container, {
                            autoAlpha: 1,
                            duration: 0.4,
                            delay: 1,
                            ease: 'Power2.easeOut'
                        })
                        animationEnter.to(document.querySelector('nav'), {
                            autoAlpha: 0,
                            duration: 0.2,
                            ease: 'Power2.easeOut',
                        })
                        this.onChange(next.namespace)
                        this.scroll.setScroll(0,0);
                        this.scroll.update();
                        window.setTimeout(_ => {
                            this.scroll.update();
                        }, 500)
                    }
                },
                {   
                    name: 'work-cream-transition',
                    from: {
                        namespace: [
                            'work', 'services'
                        ]
                    },
                    to: {
                        namespace: [
                            'services', 'work'
                        ]
                    },
                    once: ({ next }) => {
                        const color = '#F3EFE4'
                        EnterAnimation(this.preloader, this.preloaderText, next.container, color)
                        this.scroll = new LocomotiveScroll({
                            el: this.container,
                            smooth: true,
                            lerp: 0.08,
                            smartphone: {
                                smooth: true
                            },
                            tablet: {
                                smooth: true
                            }
                        })
                    },
                    async leave ({ current }) {
                        await fadeOut({container: current.container, color: '#F3EFE4'})
                    
                    },
                    enter: ({ next }) => { 
                        fadeIn({container: next.container})
                        gsap.to(document.querySelector('nav'), {
                            autoAlpha: 1,
                            duration: 0.2,
                            ease: 'Power2.easeOut'
                        })
                        this.onChange(next.namespace)
                        this.scroll.setScroll(0,0);
                        this.scroll.update();
                    }
                },

            ],
            views: [{
                namespace: 'home',
                beforeEnter() {
                    this.rotation = 0
                    this.astrick = document.querySelector('.home_services_astrick')
                    window.addEventListener('wheel', (e)=>{
                        if(this.astrick){
                            this.rotation += e.deltaY/10
                            this.astrick.style.transform = `rotate(${this.rotation}deg)`
                        }
                    })
                    this.colorSlider = document.querySelector('input[name="blobColor"]')
                    this.processingSlider = document.querySelector('input[name="blobProcess"]')

   
                    document.querySelector('.home_video_section_element_back').play()

                    this.dt = DateTime.now().setZone("America/New_York")
                    this.nycHour = this.dt.hour
                    this.nycMin = this.dt.minute
                    const footerTime = document.querySelector('.home_footer_timestamp_time')
                    footerTime.textContent = `[${this.nycHour}:${this.nycMin}]`
                },
                afterEnter() {
                    this.textfield = document.querySelector('#textfield')
                    this.emailfield = document.querySelector('#emailfield')
            
                    this.textSpan = document.querySelector('.contact_form_name_text')
                    this.emailSpan = document.querySelector('.contact_form_name_email')
            
                    this.textfield.addEventListener('click', _ => {
                        gsap.to(this.textSpan, {
                            autoAlpha: 0,
                            duration: 0.2, 
                            ease: 'Power2.easeOut'
                        })
                    })
                    
                    this.emailfield.addEventListener('click', _ => {
                        gsap.to(this.emailSpan, {
                            autoAlpha: 0,
                            duration: 0.2, 
                            ease: 'Power2.easeOut'
                        })
                    })
                }
            }, {
                    namespace: 'about',
                    beforeEnter() {
                        this.backToTop = document.querySelector('.home_footer_top_link')
                        const target = document.querySelector('#top')
                        this.backToTop.addEventListener('click', (e) => {
                            this.scroll.scrollTo(target)
                        })
                        document.querySelector('.home_video_section_element_back').play()

                        this.dt = DateTime.now().setZone("America/New_York")
                        this.nycHour = this.dt.hour
                        this.nycMin = this.dt.minute
                        const footerTime = document.querySelector('.home_footer_timestamp_time')
                        footerTime.textContent = `[${this.nycHour}:${this.nycMin}]`
                        
                    },
                    afterEnter() {
                        this.textfield = document.querySelector('#textfield')
                        this.emailfield = document.querySelector('#emailfield')
                
                        this.textSpan = document.querySelector('.contact_form_name_text')
                        this.emailSpan = document.querySelector('.contact_form_name_email')
                
                        this.textfield.addEventListener('click', _ => {
                            gsap.to(this.textSpan, {
                                autoAlpha: 0,
                                duration: 0.2, 
                                ease: 'Power2.easeOut'
                            })
                        })
                        
                        this.emailfield.addEventListener('click', _ => {
                            gsap.to(this.emailSpan, {
                                autoAlpha: 0,
                                duration: 0.2, 
                                ease: 'Power2.easeOut'
                            })
                        })
                    }
            },  {
                namespace: 'cruelove',
                afterEnter() {

                    
                }
        }]
        });
    }

    createSmoothScrolling() {
        this.scroll = new SmoothScroll()

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
          baucees: new Baucees(),
          brio: new Brio(),
          ivyhills: new Ivyhills()
        }

        
        this.page = this.pages[this.template]
        this.page.create()
    }
    
    createCanvas() {
        this.canvas = new Canvas({
            template: this.template
        })
    }

    navAnimation() {
        this.navanimation = new navigation()

    }


    onPreloaded () {
        if(this.template === 'work' || this.template === 'services'){
            const percent = '100%'
            each(document.querySelectorAll('.preloader_text'),(text, i) => {
                gsap.fromTo(text, {
                    autoAlpha: 0,
                    delay: 0.2*i,
                    ease: 'Power2.easeIn',
                },{
                    autoAlpha: 1,
                    duration: 0.4,
                    delay: 0.2*i,
                    ease: 'Power2.easeIn'
                })
            })

            //animate circle on loading bar
            gsap.to(document.querySelector('.preloader_circle'), {
                left: percent,
                duration: 0.2,
                ease: 'Power2.easeIn',
            })

            if(percent == '100%'){
                LOAD_FLAG = true
                
                    window.setTimeout(_ => {
                        this.startBarba()
                    }, 500)
                
            }
        }

        let LOAD_FLAG = false
        this.onResize()
        const imgLoad = imagesLoaded('.content')

        let images = document.querySelectorAll("img").length,
            loadedCount = 0,
            loadingProgress = 0
        
        imgLoad.on( 'progress', function( instance, image ) {
            loadProgress()
        })
        
        function loadProgress(imgLoad, image) {

            loadedCount++
        
            loadingProgress = (loadedCount/images)
            let percent = `${loadingProgress*100}%`

            each(document.querySelectorAll('.preloader_text'),(text, i) => {
                gsap.fromTo(text, {
                    autoAlpha: 0,
                    delay: 0.2*i,
                    ease: 'Power2.easeIn',
                },{
                    autoAlpha: 1,
                    duration: 0.4,
                    delay: 0.2*i,
                    ease: 'Power2.easeIn'
                })
            })

            //animate circle on loading bar
            gsap.to(document.querySelector('.preloader_circle'), {
                left: percent,
                duration: 0.2,
                ease: 'Power2.easeIn',
            })

            if(percent == '100%'){
                LOAD_FLAG = true
                Complete()
            }
        }
        
        const Complete= () => {
            window.setTimeout(_ => {
                if(LOAD_FLAG === true) this.startBarba()
            }, 500)
            this.update()

        }
        
        this.page.show()
        // this.canvas.onPreloaded(this.template)
    }

    onChange(template) {
        this.pages = {
            about: new About(),
            services: new Services(),
            work: new Work(),
            home: new Home(),
            cruelove: new CrueLove(),
            latereservation: new LateReservation(),
            pzac: new PZAC(),
            baucees: new Baucees(),
            brio: new Brio(),
            ivyhills: new Ivyhills()
        }

        this.page = this.pages[template]
        this.page.create()

        this.canvas.onChange(template)
        this.navigation.onChange(template)
        
        
        this.page.show()
        
        this.onResize()
        this.addLinkListeners()
    }

    formatDate(date) {
        return date.getHours() + ':' + 
          date.getMinutes();
    }

    calculateDate() {

    }

    onResize () {
        requestAnimationFrame(_ => {
          if(this.canvas && this.canvas.onResize) {
            this.canvas.onResize()
          }
        })
    
        if(this.page && this.page.onResize) {
          this.page.onResize()
        }
    }

    onMouseMove( e ) {
        if(this.canvas && this.canvas.onMouseMove) {
            this.canvas.onMouseMove(e)
        }
    }

    update(a) {
        if(this.scroll){
            this.scroll.on('scroll', ({ scroll }) => { 
                this.y = scroll.y 
                this.scrollEvent = scroll
                if(this.navanimation && this.navanimation.onWheel) {
                    this.navanimation.onWheel(this.scrollEvent)
                }
            })
        }


        if(this.page && this.page.update) {
            this.page.update()
        }
    
        // if(this.canvas && this.canvas.update) {
            this.canvas.update(this.y, this.processingSlider, this.colorSlider)
        // }
        this.frame = window.requestAnimationFrame(this.update.bind(this))
    }

      /**
   * Listeners
   */

    addEventListeners() {
        window.addEventListener( 'mousemove', this.onMouseMove.bind(this))

        window.addEventListener('resize', this.onResize.bind(this))


        this.backToTop = document.querySelector('.home_footer_top_link')
        const target = document.querySelector('#top')
        if(this.backToTop) {

            this.backToTop.addEventListener('click', (e) => {
                this.scroll.scrollTo(target)
            })
        }

        this.textfield = document.querySelector('#textfield')
        this.emailfield = document.querySelector('#emailfield')

        this.textSpan = document.querySelector('.contact_form_name_text')
        this.emailSpan = document.querySelector('.contact_form_name_email')

        if(this.template === 'home' || this.template === 'about'){

            this.textfield.addEventListener('click', _ => {
                gsap.to(this.textSpan, {
                    autoAlpha: 0,
                    duration: 0.2, 
                    ease: 'Power2.easeOut'
                })
            })
            
            this.emailfield.addEventListener('click', _ => {
                gsap.to(this.emailSpan, {
                    autoAlpha: 0,
                    duration: 0.2, 
                    ease: 'Power2.easeOut'
                })
            })
        }
    }


    addLinkListeners () {
        const home = document.querySelector('.navigation_link')
        const nav = document.querySelectorAll('.navigation_list_link')
    }
}

new App()