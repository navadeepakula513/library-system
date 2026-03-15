const express=require("express")
const mysql=require("mysql2")
const bodyParser=require("body-parser")

const app=express()

app.use(express.static("public"))
app.use(bodyParser.json())

const db=mysql.createConnection({

host:"localhost",
user:"root",
password:"",
database:"library"

})

db.connect(()=>{

console.log("MySQL Connected")

})


// GET BOOKS WITH AVAILABILITY

app.get("/books",(req,res)=>{

db.query("SELECT * FROM books",(err,books)=>{

if(err) return res.json([])

db.query(
"SELECT book_title, COUNT(*) AS issued FROM transactions WHERE return_date IS NULL GROUP BY book_title",
(err,issuedData)=>{

let issuedMap={}

issuedData.forEach(row=>{
issuedMap[row.book_title]=row.issued
})

let result=books.map(book=>{

let issued=issuedMap[book.title] || 0

return{
title:book.title,
author:book.author,
available:book.quantity - issued
}

})

res.json(result)

})

})

})


// ADD BOOK

app.post("/addBook",(req,res)=>{

let {title,author,quantity}=req.body

db.query(
"INSERT INTO books(title,author,quantity) VALUES(?,?,?)",
[title,author,quantity],
()=>{
res.json({message:"Book Added"})
})

})


// ISSUE BOOK

app.post("/issueBook",(req,res)=>{

let {book,student,roll,branch}=req.body

db.query(
"INSERT INTO transactions(book_title,student_name,roll,branch,issue_date) VALUES(?,?,?,?,NOW())",
[book,student,roll,branch],
()=>{
res.json({message:"Book Issued"})
})

})


// RETURN BOOK

app.post("/returnBook",(req,res)=>{

let {book}=req.body

db.query(
"UPDATE transactions SET return_date=NOW() WHERE book_title=? AND return_date IS NULL LIMIT 1",
[book],
()=>{
res.json({message:"Book Returned"})
})

})

app.listen(3000,()=>{

console.log("Server running on port 3000")

})