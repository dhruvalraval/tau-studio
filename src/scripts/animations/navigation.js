import GSAP from 'gsap'

let c = 0
let currentScrollTop = 0
export default class NavAnimation {
    constructor(){     
        this.nav = document.querySelector('nav')
        this.currentScrollTop = 0
        this.c = 0

        this.limit = this.nav - window.innerHeight
    }

    onWheel(e){
        let scrollTop = e.offsetY
        let height = this.nav.getBoundingClientRect().height

        this.currentScrollTop = scrollTop
        
        if (this.c < this.currentScrollTop && scrollTop > height * 0.8 ) {
            this.nav.classList.add("scrollUp");
        } else if (this.c > this.currentScrollTop && ( scrollTop <= height)) {
            this.nav.classList.remove("scrollUp");
        }
        this.c = this.currentScrollTop;
    }

    onTouchMove(e) {

        // let scrollTop = Math.abs(e.touches[0].clientY)
        // let height = this.nav.getBoundingClientRect().height

        // currentScrollTop += scrollTop*0.001

        // let buffer = scrollTop
        
        // console.log(height, currentScrollTop*10)

        // if (c < currentScrollTop && currentScrollTop*2 > height ) {
        //     this.nav.classList.add("scrollUp");
        // } else if (c > currentScrollTop  && (scrollTop <= height))  {
        //     this.nav.classList.remove("scrollUp");
        // }

        // if (this.c < this.currentScrollTop && scrollTop > height ) {
        //     this.nav.classList.add("scrollUp");
        // } else if (this.c > this.currentScrollTop && ( scrollTop <= height)) {
        //     this.nav.classList.remove("scrollUp");
        // }

        // c = currentScrollTop;
    }
}