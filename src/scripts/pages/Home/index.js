import each from "lodash/each"
import Page from "../../classes/Page"


export default class Home extends Page {
    constructor() {
        super({
            id: 'home',
            element: '.home',
            elements: [
                '.home_services_astrick',
                '.home_project_title',
                '.home_portfolio_work_link'
            ]
        })

        this.astrick = document.querySelector('.home_services_astrick')

        this.projectTitles = document.querySelectorAll('.home_project_title')
        this.projects = document.querySelectorAll('.home_portfolio_work_link')

        each(this.projects, project => {
            project.addEventListener('mouseenter', _ => {

                each(this.projectTitles, title => {
                    if(project.getAttribute('data-work-title') == title.getAttribute('data-work-title')){
                        title.style.opacity = 1                        
                    }
                })
            })

            project.addEventListener('mouseleave', _ => {

                each(this.projectTitles, title => {
                    if(project.getAttribute('data-work-title') == title.getAttribute('data-work-title')){
                        title.style.opacity = 0                        
                    }
                })
            })
        })

        this.rotation = 0
    }

    onWheel(e) {
        if(this.astrick){
            this.rotation += e.deltaY/10
            this.astrick.style.transform = `rotate(${this.rotation}deg)`
        }
    }
}


