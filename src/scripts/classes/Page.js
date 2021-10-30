import gsap from 'gsap'
import each from 'lodash/each'
import map from 'lodash/map'
import Prefix from 'prefix'

import { ColorManager } from './Colors'
import Title from '../animations/Titles'
import Paragraph from '../animations/Paragraph'
import Link from '../animations/Link'
import ServicePara from '../animations/ServicePara'


export default class Page {
    constructor ({ element, elements, id}) {
        this.selector = element
        this.selectorChildren = {
            ...elements,
            animationTitles: '[data-animation="title"]',
            animationParagraphs: '[data-animation="paragraphs"]',
            animationServicePara: '[data-animation="service-para"]',
            animationLinks: '[data-animation="links"]',

            preloadImages: '[data-src]'
        }
        this.id = id

        this.prefixTransform = Prefix('transform')

        this.cardAnimation()

        // this.scroll = {
        //     current: 0,
        //     target: 0,
        //     last: 0,
        //     limit: 0
        // }
    }

    create() {
        this.element = document.querySelector(this.selector)
        this.elements = {}

        each(this.selectorChildren, (entry, key) => {
            if (entry instanceof window.HTMLElement || entry instanceof window.NodeList){
                this.elements[key] = entry
              } else if (Array.isArray(entry)) {
                this.elements[key] = entry
              } else {
                this.elements[key] = document.querySelectorAll(entry)
        
                if(this.elements[key].length === 0) {
                  this.elements[key] = null
                } else if(this.elements[key].length === 1) {
                  this.elements[key] = document.querySelector(entry)
                }
              }
        })

		
        // this.scroll = {
			//     current: 0,
			//     target: 0,
			//     last: 0,
			//     limit: 0
			// }
		console.log('id: ',this.id)	
		this.createPreloadImages()
		this.createAnimations()
		this.cardAnimation()
    }

    createPreloadImages() {
        each(this.elements.preloadImages, element => {

        })
    }

    createAnimations() {
        this.animations = []

        this.animationTitles = map(this.elements.animationTitles, element => {
            return new Title({
                element
            })
        })
        this.animations.push(...this.animationTitles)

        this.animationParagraphs = map(this.elements.animationParagraphs, element => {
            return new Paragraph({
                element
            })
        })
        this.animations.push(...this.animationParagraphs)

        this.animationLinks = map(this.elements.animationLinks, element => {
            return new Link({
                element
            })
        })
        this.animations.push(...this.animationLinks)

        this.animationServicePara = map(this.elements.animationServicePara, element => {
            return new ServicePara({
                element
            })
        })
        this.animations.push(...this.animationServicePara)
    }

    /**
     * ANIMATIONS
     */

     show () {
        return new Promise(resolve => {
          ColorManager.change({
            backgroundColor: this.element.getAttribute('data-background'),
            color: this.element.getAttribute('data-color')
          })
    
            // this.animationIn = gsap.timeline()
            // this.animationIn.fromTo(this.element,  {
            //   autoAlpha: 0
            // }, {
            //   autoAlpha: 1
            // })
          
    
        //   this.animationIn.call(_ => {
        //     this.addEventListeners()
        //     resolve()
        //   })
        })
      }
    
      hide () {
        return new Promise(resolve => {
          this.removeEventListeners()
    
          this.animationOut = gsap.timeline()
    
          this.animationOut.to(this.element, {
            autoAlpha: 0,
            onComplete: resolve
          })
        })
      }
    
	cardAnimation() {
		this.button = document.querySelector('.work_card_button')
        this.card = document.querySelector('.work_card')
        this.para = document.querySelector('.work_card_paragraph')
        this.service = document.querySelector('.work_card_service')
        this.serPara = document.querySelector('.work_card_service_paragraph')

		if(this.button) {
			
			this.button.addEventListener('click', _ => {
				this.button.classList.toggle('closed')
				this.card.classList.toggle('shrink')
				if(this.card.classList.contains('shrink') && this.button.classList.contains('closed')){
					gsap.to(this.para, {
						autoAlpha: 0,
						duration: 0.2, 
						ease: 'Power2.easeOut'
					})
					gsap.to(this.service, {
						autoAlpha: 0,
						duration: 0.2, 
						ease: 'Power2.easeOut'
					})
					gsap.to(this.serPara, {
						autoAlpha: 0,
						duration: 0.2, 
						ease: 'Power2.easeOut'
					})
				} else {
					gsap.to(this.para, {
						autoAlpha: 1,
						duration: 0.4, 
						delay: 0.2,
						ease: 'Power2.easeIn'
					})
					gsap.to(this.service, {
						autoAlpha: 1,
						duration: 0.2, 
						delay: 0.2,
						ease: 'Power2.easeIn'
					})
					gsap.to(this.serPara, {
						autoAlpha: 1,
						duration: 0.2, 
						delay: 0.2,
						ease: 'Power2.easeIn'
					})
				}
				
			})
		}
	}
    
    //INIT BARBA

    /**
   * EVENT
   */

    onResize (event) {
        // if(this.element) {
        //     this.scroll.limit = this.element.clientHeight - window.innerHeight
        // }

        // this.scroll.last = this.scroll.target = 0

        each(this.animations, animation => animation.onResize())
    }
    
    // onWheel ({ pixelY }) {
    //     this.scroll.target += pixelY
    // }

    // onTouchDown ({ y }) {
    //     this.scroll.last = this.scroll.target
    // }

    // onTouchMove ({ y }) {
    //     const distance = y.start - y.end
    //     this.scroll.target = this.scroll.last - distance
    //     console.log(this.scroll.target)

    // }
    // onTouchUp ({y}) {
    //     // this.scroll.target = this.y.end
    // }


    /**
     * LOOP
     */
    update () {
        // this.scroll.target = gsap.utils.clamp(0, this.scroll.limit, this.scroll.target)

        // this.scroll.current = gsap.utils.interpolate(this.scroll.current, this.scroll.target, 0.08 )

        // if(this.element) {
        //     this.element.style[this.prefixTransform] = `translateY(-${this.scroll.current}px)`
            
        // }

        // if(this.scroll.current < 0.01) {
        //     this.scroll.current = 0
        // }
    }
    /**
     * LISTENER
     */

    addEventListeners () {

    }

    removeEventListeners () {

    }

    /**
    * DESTROY
    */
    destroy () {
        this.removeEventListeners()
    }
}