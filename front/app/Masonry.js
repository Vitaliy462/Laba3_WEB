export class Masonry{

    constructor(element, width = 100, coef = 4){
        this._element = element
        this._count = 0
        this._width = width
        this._number = Math.floor(Math.floor(document.body.clientWidth/coef)/(this._width+5))
        if(this._number == 0) {
            this._number++
        }
        this._lines = []
        this._createTable()
    }

    buildMasonry(parentElement) {
        const complete = new Masonry(parentElement, this._width)
        complete.setTable()
        for(let image of this.table) {
            let insert = this._insertElement.bind(complete, image.getAttribute("src"))
            insert()
        }
    }

    addImage(image) {
        const li = this._insertElement(image)
        const deleteB = document.createElement("input")
        deleteB.setAttribute("type", "button")
        deleteB.setAttribute("value", "delete")
        deleteB.addEventListener("click", this._deleteElement.bind(this))
        li.appendChild(deleteB)
    }

    _insertElement(image) {
        const li = document.createElement("li")
        li.innerHTML = `<img src=${image} style = "width:${this._width}px"></img>`
        this._lines[this._count%this._number].appendChild(li)
        this._count++
        return li
    }

    _deleteElement(event) {
        const target = event.target
        const li = target.parentElement
        li.removeChild(target)
        li.removeChild(li.querySelector("img"))
        const elements = this.table
        this._count = 0
        console.log(elements)
        for(let line of this._lines){
            line.innerHTML = ""
        }
        for(let element of elements) {
            if(!element){
                continue
            }
            this.addImage(element.getAttribute("src"))
        }

    }

    _createTable() {
        const table = document.createElement("div")
        table.className = "masonry"
        const style = `width: 100%;
        height: fit-content;
        display: flex;`
        for(let i = 0; i < this._number; i++) {
            const line = document.createElement("ul")
            line.style.width = this._width
            this._lines.push(line)
            table.appendChild(line)
        }
        table.style = style
        this._table = table
    }

    setTable() {
        const exist = this._element.querySelector(".masonry")
        if(!exist){
            this._element.appendChild(this._table)
        } else {
            this._element.removeChild(exist)
            this._element.appendChild(this._table)
        }
    }

    get width() {
        return this._width
    }

    set width(value) {
        this._width = value
    }

    get number() {
        return this._number
    }

    get table() {
        let count = 0
        let images = []
        let output = []
        for(let line of this._lines) {
            let temp = line.querySelectorAll("li")
            images.push({
                current:0,
                list: temp
            })
        }
        for(let i = 0; i< this._count; i++) {
            let currentLine = images[count%this._number]
            let li = currentLine.list[currentLine.current++]
            let img = li.querySelector("img")
            output.push(img)
            count++
        }
        return output
    }

    set table(content) {
        for(let element of content) {
            this.addImage(element.getAttribute("src"))
        }
    }

    get count() {
        return this._count
    }
}