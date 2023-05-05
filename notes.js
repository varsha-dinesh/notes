const addbox = document.querySelector(".add-box")
let poptitle = document.querySelector("header p")
console.log(poptitle.innerText)
let popbox = document.querySelector(".popup-box")
let settings = document.querySelector(".settings img")
let menu = document.querySelector(".menu")
const closebtn = document.querySelector(".close")
let addbtn = document.querySelector("button")
let input = document.querySelector("input")
let desc = document.querySelector("textarea")


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let notes = JSON.parse(localStorage.getItem("notes")) || []
let isUpdate = false, updateId


addbox.addEventListener("click", () => {
    popbox.classList.add("show")
})

closebtn.addEventListener("click", () => {
    isUpdate = false
    input.value = ""
    desc.value = ""
    poptitle.innerText = "Add a note"
    addbtn.textContent = "Add note"
    console.log("clicked")
    popbox.classList.remove("show")


})

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove())
    if (notes) {
        notes.forEach((note, index) => {
            let newli = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description} </span>
                        </div>
                        <div class="bottom">
                            <span>${note.date}</span>
                            <div class="settings">
                                <img onClick="showMenu(this)" src="./ellipsis-solid.svg" alt="">
                                <ul class="menu">
                                    <li onClick="editId(${index}, '${note.title}', '${note.description}')"><i class="fa-regular fa-pen-to-square"></i>Edit</li>
                                    <li onClick="deleteId(${index})"><i class="fa-regular fa-trash-can"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`

            addbox.insertAdjacentHTML("afterend", newli)

        });
    }
}

showNotes()

function showMenu(elem) {
    elem.parentElement.classList.add("show")
    document.addEventListener("click", (e) => {
        if (e.target !== elem) {
            elem.parentElement.classList.remove("show")
        }
    })
}

function editId(id, title, description) {
    addbox.click();
    isUpdate = true
    updateId = id
    input.value = title
    desc.value = description
    poptitle.innerText = "Update a note"
    addbtn.textContent = "Update note"


}

function deleteId(id) {
    notes.splice(id, 1)
    localStorage.setItem("notes", JSON.stringify(notes))
    showNotes()
}


addbtn.addEventListener("click", (e) => {
    e.preventDefault()
    let noteTitle = input.value
    let notedesc = desc.value

    const date = new Date(),
        month = months[date.getMonth()],
        day = date.getDate(),
        year = date.getFullYear()

    const note = {
        title: noteTitle,
        description: notedesc,
        date: `${month} ${day} ${year}`
    }
    if (!isUpdate) {
        notes.push(note) //addind new note
    } else {
        isUpdate = false
        notes[updateId] = note //updating specified note    
    }
    localStorage.setItem("notes", JSON.stringify(notes))
    closebtn.click()
    showNotes()


})

