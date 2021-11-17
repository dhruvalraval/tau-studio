import gsap from 'gsap'
import { each } from 'lodash'
import LottieAnimation from '../utils/lottie'
import GeneralTransition from './GeneralTransition'

export default function EnterAnimation(preloader, preloaderText, container, color){

    const timeline = gsap.timeline()

    each(document.querySelectorAll('.preloader_text'),(text) => {
        window.setTimeout(_ => {
            text.classList.add('loaded')
        }, 400)
    })
    gsap.to(document.querySelector('.preloader_svg'), {
        autoAlpha: 0,
        duration: 0.2,
        delay: 0.2,
        ease: 'Power2.easeIn',
    })
    gsap.to(document.querySelector('.preloader_loading_bar'), {
        autoAlpha: 0,
        duration: 0.2,
        delay: 0.4,
        ease: 'Power2.easeIn',
    })

    timeline.to(container, {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'Power2.easeIn',
        onComplete: _ => {
            const transition = GeneralTransition({color})
            gsap.to(preloader, {
                autoAlpha: 0,
                duration: 0.1,
                delay: 1.8,
                ease: 'linear'
            })
            LottieAnimation()
        }
    })

    
    // timeline.to(preloader, {
    //     autoAlpha: 0,
    //     duration: 0.8,
    //     ease: 'Power2.easeIn'
    // })
}