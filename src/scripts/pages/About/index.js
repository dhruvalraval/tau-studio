import Page from "../../classes/Page"

export default class About extends Page {
    constructor() {
        super({
            id: 'about',
            element: '.about',
            elements: [
                '.home_video_section_element_back'
            ]
        })
    }
}

