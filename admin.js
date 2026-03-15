function addBook(){

let title=document.getElementById("title").value
let author=document.getElementById("author").value
let quantity=document.getElementById("quantity").value

fetch("/addBook",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({title,author,quantity})

})
.then(res=>res.json())
.then(data=>alert(data.message))

}



function issueBook(){

let book=document.getElementById("book").value
let student=document.getElementById("student").value
let roll=document.getElementById("roll").value
let branch=document.getElementById("branch").value

fetch("/issueBook",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({book,student,roll,branch})

})
.then(res=>res.json())
.then(data=>alert(data.message))

}



function returnBook(){

let book=document.getElementById("returnbook").value

fetch("/returnBook",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({book})

})
.then(res=>res.json())
.then(data=>alert(data.message))

}