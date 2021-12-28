import { URL } from "./ref.js"
import { Masonry } from "./Masonry.js"
const segment = document.querySelector(".grid1")
let current = new Masonry(segment)
fetch(URL)
.then(response => response.text())
.then(text => {
    if(!text) {
        return
    }
    const data = JSON.parse(text)
    let current = new Masonry(segment, data.width)
    
    for(let image of data.images){
        current.addImage(image)
    }
    current.buildMasonry(segment)
})
