import GSAP from 'gsap'
import gsap from 'gsap/all'

const GeneralTransition = ({color}) => {
    const path3 = document.querySelector('.loader_svg_path3')

    const zero = "M 0 100 V 100 Q 50 100 100 100 V 100 z"
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z"
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z"
    const endMid = "M 0 0 V 0 Q 50 0 100 0 V 0 z"
    const finish = "M 0 0 V 0 Q 100 0 100 0 V 0 z"

    gsap.set(path3,{
        attr: {fill: color}
    })
    const timeline = GSAP.timeline()

    timeline.to(path3, {
        duration: 0.8,
        ease: 'Power2.easeIn',
        attr: {d: start},
    }, 0.8)
    timeline.to(path3, {   
        duration: 0.4,
        ease: 'Power2.easeOut',
        attr: {d: end}
    })  
    timeline.to(path3, {   
        duration: 0.4,
        ease: 'Power2.easeOut',
        attr: {d: endMid}
    }) 
    timeline.to(path3, {   
        duration: 0.2,
        ease: 'Power2.easeOut',
        attr: {d: finish},
        onComplete: _ => {
            path3.setAttribute('d', zero)
        }
    }) 
    return timeline
}

export default GeneralTransition;