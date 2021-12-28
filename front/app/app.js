import { Masonry } from "./Masonry.js"
import { URL } from "./ref.js"

const masonryControl = document.forms.masonry_control
const add = masonryControl.elements.add
const width = masonryControl.elements.width
const image = masonryControl.elements.image
const save = masonryControl.elements.save

const segment = document.querySelector(".grid1")
let current = new Masonry(segment)
current.setTable()

masonryControl.style.display = "none"
fetch(URL)
.then(response => response.text())
.then(text => {
    if(!text) {
        masonryControl.style = ""
        return
    }
    const data = JSON.parse(text)
   current.width = data.width
    for(let image of data.images){
        current.addImage(image)
        width.setAttribute("disabled","")
    }
    masonryControl.style = ""
    width.value = data.width
})

add.addEventListener("click", push)

window.addEventListener("resize", () => {
    const pixels = checkWidth()
    const masonry = new Masonry(segment, pixels)
    if(current.number != masonry.number) {
        recreate(masonry)
    }

})

image.addEventListener("change", () => {
    if(current.count > 0) {
        width.setAttribute("disabled","")
    } else {
        width.removeAttribute("disabled")
    }
})

function recreate(masonry) {
    masonry.table = current.table
    current = masonry
    current.setTable()
    add.removeEventListener("click", push)
    add.addEventListener("click", push)
}

function push() {
    const pixels = checkWidth()
    const masonry = new Masonry(segment, pixels)
    if(pixels != current.width){
        recreate(masonry)
    }
    current.addImage(image.value)
    if(current.count > 0) {
        width.setAttribute("disabled","")
    }
    image.value = ""
}

function checkWidth() {
    let pixels = +width.value
    if(pixels == 0) {
        pixels = 100
    }
    return pixels
}

save.addEventListener("click", () => {
    let table = current.table
    
    table = Array.from(table)
    table = table.map(element => element.getAttribute("src"))
    sendReq(table)
}
)

function sendReq(images){
    let body = {
        width: current.width,
        images: images
    }
    console.log(JSON.stringify(body))
    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(body)
    
    }).then(r => r.text()).then(r => console.log(r))
}


