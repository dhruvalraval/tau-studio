import gsap from 'gsap'
import each from 'lodash/each'


import {COLOR_ECRU_WHITE, COLOR_BLACK} from '../utils/color'

export default class Navigation{
    constructor({ template }) {
        
        this.element = document.querySelector('.navigation'),
        this.elements = {
            logo: document.querySelector('.navigation_link'),
            links: document.querySelector('.navigation_list_link'),
            items: document.querySelectorAll('.navigation_list_item'),
            ham: document.querySelectorAll('.menu_one')
        }

        this.onChange(template)
    }

    onChange(template) {
        if(window.innerWidth < 750) {
            this.elements.logo.addEventListener('click', _ => {
                each(document.querySelectorAll('.menu_one'), menu => {
                    menu.classList.add('open')
                    if(menu.classList.contains('open')) {
                        gsap.to('.navigation_list_item', {
                            autoAlpha: 1,
                            stagger: 0.2,
                            ease: 'Power2.easeOut'
                        })  
                    } else {
                        gsap.to('.navigation_list_item', {
                            autoAlpha: 0,
                            stagger: 0.2,
                            ease: 'Power2.easeOut'
                        })
                    }
                })

                    
                
            })

            each(document.querySelectorAll('.menu_one'), menu => {
                if(menu.classList.contains('open')){
                    menu.classList.remove('open')
                    gsap.to('.navigation_list_item', {
                        autoAlpha: 0,
                        stagger: 0.2,
                        ease: 'Power2.easeOut'
                    })
                } else {
                    document.querySelector('.hamburger').addEventListener('click', _ => {
                        each(document.querySelectorAll('.menu_one'), menu => {
                            menu.classList.toggle('open')
                            if(menu.classList.contains('open')) {
                                gsap.to('.navigation_list_item', {
                                    autoAlpha: 1,
                                    stagger: 0.2,
                                    ease: 'Power2.easeOut'
                                })  
                            } else {
                                gsap.to('.navigation_list_item', {
                                    autoAlpha: 0,
                                    stagger: 0.2,
                                    ease: 'Power2.easeOut'
                                })
                            }
                        })
                    })
                }
            })

        }
        if(template == 'services') {
            gsap.to(this.element, {
                color: COLOR_ECRU_WHITE,
                duration: 0.5
            })
            
            gsap.to(this.elements.logo, {
                autoAlpha: 1,
                delay: 0.75,
                duration: 0.75
            })

            each(this.element.links, link => {
                gsap.to(link, {
                    autoAlpha: 1,
                    delay: 0.75,
                    duration: 0.75
                })
            })

            each(this.elements.ham, menu => {
                gsap.to(menu, {
                    background: COLOR_ECRU_WHITE,
                    duration: 0.5
                })
            })


      
        } else {
      
            gsap.to(this.element, {
              color: COLOR_BLACK,
              duration: 0.5
            })
      
            gsap.to(this.elements.logo, {
                autoAlpha: 1,
                delay: 0.75,
                duration: 0.75
            })

            each(this.element.links, link => {
                gsap.to(link, {
                    autoAlpha: 1,
                    delay: 0.75,
                    duration: 0.75
                })
            })

            each(this.elements.ham, menu => {
                // menu.classList.remove('open')
                gsap.to(menu, {
                    background: COLOR_BLACK,
                    duration: 0.5
                })
            })
      
        }
    }
}