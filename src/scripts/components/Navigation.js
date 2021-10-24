import GSAP from 'gsap'
import each from 'lodash/each'


import {COLOR_ECRU_WHITE, COLOR_BLACK} from '../utils/color'

export default class Navigation{
    constructor({ template }) {
        
        this.element = document.querySelector('.navigation'),
        this.elements = {
            logo: document.querySelector('.navigation_link'),
            links: document.querySelector('.navigation_list_link')
        }
        
        
        this.onChange(template)
    }

    onChange(template) {

        if(template == 'services') {
            GSAP.to(this.element, {
              color: COLOR_ECRU_WHITE,
              duration: 0.5
            })
      
            GSAP.to(this.elements.logo, {
              autoAlpha: 1,
              delay: 0.75,
              duration: 0.75
            })

            each(this.element.links, link => {
                GSAP.to(link, {
                    autoAlpha: 1,
                    delay: 0.75,
                    duration: 0.75
                })
            })
      
          } else {
      
            GSAP.to(this.element, {
              color: COLOR_BLACK,
              duration: 0.5
            })
      
            GSAP.to(this.elements.logo, {
                autoAlpha: 1,
                delay: 0.75,
                duration: 0.75
            })

            each(this.element.links, link => {
                GSAP.to(link, {
                    autoAlpha: 1,
                    delay: 0.75,
                    duration: 0.75
                })
            })
      
          }
    }
}