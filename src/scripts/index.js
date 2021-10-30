import imagesLoaded from 'imagesloaded'
import gsap from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'
import { each } from 'lodash'

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

class App {
    constructor() {

        this.preloader = document.querySelector('.preloader')
        this.preloaderText = document.querySelectorAll('.preloader_text')
        this.preloaderSvg = document.querySelector('.preloader_svg')
        this.preloaderCircle = document.querySelector('.preloader_circle')
        this.container = document.querySelector('[data-scroll-container]')
        
        this.createContent()
        this.createCanvas()
        
        this.createNavigation()
        this.createPages()
        
        this.onPreloaded()

        this.addEventListeners()
        
        this.onResize()
        
        // this.update()

        
        
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
            this.scroll.update();
            this.update(this.scroll)
        });
        
        barba.init({
            debug: true,
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
                        console.log('leaving')
                    
                    },
                    enter: ({ next }) => { 
                        console.log('enterin')
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
                        console.log('leaving')
                    
                    },
                    enter: ({ next }) => { 
                        console.log('enterin')
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
                        console.log('leaving')
                    
                    },
                    enter: ({ next }) => { 
                        console.log('enterin')
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
                            'cruelove', 'baucees', 'latereservation', 'pzac'
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
                            autoAlpha: 1,
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
                            console.log('updating scroll')
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

            ]
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
          baucees: new Baucees()
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
        this.canvas.onPreloaded(this.template)
    }

    onChange(template) {
        // this.content.setAttribute('data-template', this.template )
        
        this.page = this.pages[template]
        
        this.page.create()
        this.canvas.onChange(template)
        this.navigation.onChange(template)
    
        // this.scroll.update()
        this.page.show()
        
        this.onResize()
        
        this.addLinkListeners()
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

    onWheel (event) {
        if(this.navanimation && this.navanimation.onWheel) {
            this.navanimation.onWheel(event)
        }

    }

    update() {
        if(this.scroll){
            this.scroll.on('scroll', ({ scroll }) => { 
                this.y = scroll.y 
            })
        }


        if(this.page && this.page.update) {
            this.page.update()
        }
    
        if(this.canvas && this.canvas.update) {
            this.canvas.update(this.y)
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

        window.addEventListener('resize', this.onResize.bind(this))
    }


    addLinkListeners () {
        const home = document.querySelector('.navigation_link')
        const nav = document.querySelectorAll('.navigation_list_link')

        // home.addEventListener('click', _ => {
        //     this.onChange()
        // })

        // each(nav, (link) => {
        //     link.addEventListener('click', _ => {
        //     })
        // })
    }
}

new App()