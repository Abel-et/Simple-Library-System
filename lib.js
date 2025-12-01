const newBook = document.getElementById('register');
const dialog = document.getElementById('formDialog')
const submit = document.getElementById('submitButton')
const cancel = document.getElementById('closeDialogButton')
const form = document.getElementById('detailsForm')
const des = document.getElementById("description")


// 1. Accessing the specific input fields via their IDs
const title = document.getElementById('title')
const author = document.getElementById('author')
const page = document.getElementById('pages')
const toggle = document.getElementById('isReadToggle')
let currentEditId = null;

// when the system start ,display user guildance
des.showModal();

// an array of container which contain the book object
const shelf = [];


// constructor
function Book(title , author , page , isRead){
  if(!new.target){
    throw Error('You must use new operator to call constructor')
  }
  this.id = crypto.randomUUID()
  this.title = title
  this.author = author
  this.page = page 
  this.isRead = isRead;
  this.sayName = function() { console.log(this.title+" "+ this.id+" "+ this.author+' '+this.isRead+'  ' +this.page)}
}

//  used to create an object then push to the array 
function createBook(title ,author, page,isRead){
  // an object is created
  const book = new Book(title, author,page, isRead)
  book.sayName()
  // push to array 
  shelf.push(book)
  console.log(shelf)
}

// render book which are created 
function renderBook(){
  const container =document.getElementById('bookList')
  container.innerHTML = ''

  shelf.forEach(book =>{
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
    <h3>${book.title}</h3
    <p>Author : ${book.author}</p>
    <p>Page Number: ${book.page}</p>
    <button class="toggle-btn" data-id="${book.id}">
        ${toggle.checked ? "Read ✔️" : "Not Read ❌"}
      </button>

    <div class="buttons">
    <button class="edit-button">📝Edit</button>
    <button class="delete-button">🗑️Delete</button>
    </div>
    <hr>
    `
    container.appendChild(card)
 const btn = card.querySelector('.toggle-btn')
  btn.addEventListener('click',()=>{
  checker(btn)
  console.log(book.title)
})
 card.querySelector('.edit-button').addEventListener('click',()=>{
  handleEdit(book.id);
 })
 card.querySelector('.delete-button').addEventListener('click',()=>{
  handleDelete(book.id)
 })
  })
}

// a toggle button that can change if the book is readded after registered
function checker(btn){
  const id = btn.dataset.id
  const book = shelf.find(b => b.id == id)

  if(btn.textContent.includes('❌')){
    btn.textContent = "Read ✔️";
    book.isRead = true
  }else{
    btn.textContent = "Not Read ❌";
    book.isRead = false
  }
}

// used to delete book from the shelf 
function handleDelete(id){
  const idx = shelf.findIndex(b=> b.id ===id);
  if(idx !==-1){
    shelf.splice(idx, 1);
    renderBook()
  }
}

// update the book information 
function handleEdit(id) {
  currentEditId = id
  const book = shelf.find(b => b.id === id)
  dialog.showModal();
}

// buttton used to register new book 
newBook.addEventListener('click',()=>{
  form.reset();
  dialog.showModal();
})

// used to cancel the dialog
cancel.addEventListener('click',()=>{dialog.close()
})
document.getElementById('closeDialog').addEventListener('click',()=>{
  des.close();
})
//  used to save the enter input
submit.addEventListener('click',(event)=>{
  if(!title.value || !author.value || !page.value){
    return 
  }
  else if (shelf.some(b => b.id === currentEditId)){
    const book = shelf.find(book => book.id ===currentEditId)
    if(book){
      book.title = title.value
      book.page = page.value
      book.isRead = toggle.checked
      book.author = author.value
      renderBook();
    }
  }
    else{
 createBook(title.value , author.value, page.value,toggle.checked)
  renderBook();
  }

 
})

