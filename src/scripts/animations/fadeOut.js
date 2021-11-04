import gsap from 'gsap'
import GeneralTransition from './GeneralTransition'

const fadeOut = async ({container, color}) => {
    // gsap.set(container, {
    //     autoAlpha: 1
    // })
    const canvas = document.querySelector('canvas')
    gsap.to(container, {
        duration: 0.2,
        autoAlpha: 0,
        delay: 0.8
    });
    gsap.to(canvas, {
        duration: 0.2,
        autoAlpha: 0,
        delay: 0.8
    });
    // const transition = await GeneralTransition({container, color})
    // transition.restart()

}

export default fadeOut