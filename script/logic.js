var form = document.getElementById("formElement");
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);

// get html camps with DOM

let nameInput = document.querySelector(".nameInput");
let authorInput = document.querySelector(".authorInput");
let pagesInput = document.querySelector(".pagesInput");
let readInput = document.querySelector(".readInput");
const addBookBtn = document.querySelector(".addBookBtn");
const showName = document.querySelector(".showName");
const showAuthor = document.querySelector(".showAuthor");
const showPages = document.querySelector(".showPages");
const showRead = document.querySelector(".showRead");
const bookDisplay = document.querySelector(".bookDisplay");
const removeBookBtn = document.querySelector(".removeBookBtn");
// variable for user input
let nameInputed;
let authorInputed;
let pagesInputed;
let readInputed;

let library = [];

// functions
const addBook = function () {
  storeInput();
  const newBook = new Book(
    nameInputed,
    authorInputed,
    pagesInputed,
    readInputed
  );
  library.push(newBook);
  /* showBook(newBook); */
  addBookFromArray(library);
  clearInputBoxes()
};
function storeInput() {
  nameInputed = nameInput.value;
  authorInputed = authorInput.value;
  pagesInputed = pagesInput.value;
}
function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  if (read == "no") {
    this.read = false;
  } else if (read == "yes") {
    this.read = true;
  }
}

const removeBook = function (e) {
  let str =
    e.target.previousElementSibling.previousElementSibling
      .previousElementSibling.previousElementSibling.previousElementSibling
      .textContent;
  let bookIndex = str.replace(/[^0-9]/g, "") - 1;
  console.log(bookIndex);
  library.splice(bookIndex, 1);
  addBookFromArray(library);
};

const readStatus = function (e) {
  e.target.classList.toggle("greenBtn");
  if (e.target.textContent == "Not read") {
    e.target.textContent = "Read";
  } else if (e.target.textContent == "Read") {
    e.target.textContent = "Not read";
  }
};
function addBookFromArray(array) {
  bookDisplay.textContent = "";
  array.forEach((e) => {
    const bookNumber = document.createElement("div");
    bookNumber.classList.add("bookNumber");
    const newBook = document.createElement("div");
    newBook.classList.add("newBook");
    const newBookName = document.createElement("div");
    newBookName.classList.add("newBookName");
    const newBookAuthor = document.createElement("div");
    newBookAuthor.classList.add("newBookAuthor");
    const newBookPages = document.createElement("div");
    newBookPages.classList.add("newBookPages");
    const readStatusBtn = document.createElement("button");
    readStatusBtn.classList.add("readStatusBtn");
    const removeBookBtn = document.createElement("button");
    removeBookBtn.classList.add("removeBookBtn");
    bookNumber.innerHTML = `<b>Book:</b> ${array.indexOf(e) + 1}`;
    newBookName.innerHTML = `<b>Name:</b> ${e.name}`;
    newBookAuthor.innerHTML = `<b>Author:</b> ${e.author}`;
    newBookPages.innerHTML = `<b>Pages:</b> ${e.pages}`;
    readStatusBtn.innerHTML = 'Not read'
    readStatusBtn.addEventListener('click', readStatus)
    removeBookBtn.textContent = "Remove";
    removeBookBtn.addEventListener("mousedown", removeBook);
    newBook.appendChild(bookNumber);
    newBook.appendChild(newBookName);
    newBook.appendChild(newBookAuthor);
    newBook.appendChild(newBookPages);
    newBook.appendChild(readStatusBtn);
    newBook.appendChild(removeBookBtn);
    bookDisplay.appendChild(newBook);
  });
}

function clearInputBoxes () {
  nameInput.value = ''
  authorInput.value = ''
  pagesInput.value = ''
}
function showForm() {
  document.getElementById("formElement").style.display = "block";
}

// ex book

function addExampleBook() {
  const book1 = new Book(
    "12 Rules for Life: An Antidote to Chaos",
    "Jordan B Peterson",
    448,
    "no"
  );
  library.push(book1);
  addBookFromArray(library);
}

window.onload = addExampleBook;
showForm();
