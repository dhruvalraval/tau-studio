import GSAP from 'gsap'

export default function PreloadingAnimation(preloader, preloaderText) {   
    GSAP.to(preloader, {
        autoAlpha: 0,
        duration: 0.8,
        ease: 'Power2.easeIn'
    })
    GSAP.to(preloaderText, {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'Power2.easeIn'
    })

    const path = document.querySelector('.loader_svg_path')
    const path2 = document.querySelector('.loader_svg_path2')
    const path3 = document.querySelector('.loader_svg_path3')

    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z"
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z"
    const endMid = "M 0 0 V 0 Q 50 0 100 0 V 0 z"
    const finish = "M 0 0 V 0 Q 100 0 100 0 V 0 z"

    const timeline = GSAP.timeline()

    timeline.to(path, {
        duration: 0.8,
        ease: 'Power2.easeIn',
        attr: {d: start}
    })
    timeline.to(path, {
        duration: 0.4,
        ease: 'Power2.easeOut',
        attr: {d: end}
    })   
    timeline.to(path2, {
        duration: 0.8,
        ease: 'Power2.easeIn',
        attr: {d: start}
    }, 0.4)
    timeline.to(path2, {
        duration: 0.4,
        ease: 'Power2.easeOut',
        attr: {d: end}
    })    
    timeline.to(path3, {
        duration: 0.8,
        ease: 'Power2.easeIn',
        attr: {d: start}
    }, 0.8)
    timeline.to(path3, {   
        duration: 0.4,
        ease: 'Power2.easeOut',
        attr: {d: end}
    })  
    timeline.to(path3, {   
        duration: 0.4,
        ease: 'Power2.easeIn',
        attr: {d: endMid}
    }) 
    timeline.to(path3, {   
        duration: 0.2,
        ease: 'Power2.easeIn',
        attr: {d: finish}
    }) 
    timeline.to(path2, {   
        duration: 0.2,
        ease: 'Power2.easeIn',
        attr: {d: finish}
    }, "<")  
    timeline.to(path, {   
        duration: 0.2,
        ease: 'Power2.easeIn',
        attr: {d: finish},
        // onComplete: _ => {LottieAnimation()}
    }, "<")    
}