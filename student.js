function loadBooks(){

fetch("/books")

.then(res=>res.json())

.then(data=>{

let html=""

data.forEach(book=>{

html+=`

<div class="card p-3 mb-2">

<h4>${book.title}</h4>

<p>Author: ${book.author}</p>

<p>Available: ${book.available}</p>

</div>

`

})

document.getElementById("books").innerHTML=html

})

}

loadBooks()

setInterval(loadBooks,3000)