const express = require("express");
const bodyParser = require("body-parser");
const { Book } = require("./models");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).json("Selamat Datang!")
});

//GET 
app.get("/books", (req, res) => {
    Book.findAll().then((books) => {
        res.status(200).json(books);
    });
});

app.get("/books/:id", (req, res) => {
    Book.findOne({
        where: { id: req.params.id },
    }).then((book) => {
        res.status(200).json(article);
    });
});

//POST
app.post("/books", (req, res) => {
    Book.create({
            isbn: req.body.isbn,
            judul: req.body.judul,
            sinopsis: req.body.sinopsis,
            penulis: req.body.penulis,
            genre: req.body.genre,
        })
        .then((book) => {
            res.status(201).json(`Buku baru ditambahkan!`);
        })
        .catch((err) => {
            res.status(422).json("Tidak dapat menambahkan buku!");
        });
});

//PUT
app.put("/books/:id", (req, res) => {
    Book.update({
            isbn: req.body.isbn,
            judul: req.body.judul,
            sinopsis: req.body.sinopsis,
            penulis: req.body.penulis,
            genre: req.body.genre,
        }, {
            where: { id: req.params.id },
        })
        .then((book) => {
            res.status(201).json(`Data buku berhasil diperbarui`)
        })
        .catch((err) => {
            res.status(422).json("Tidak dapat memperbarui data buku")
        });
});

//DELETE
app.delete("/books/:id", (req, res) => {
    Book.destroy({
        where: { id: req.params.id },
    }).then((book) => {
        res.status(201).json("Data buku berhasil dihapus");
    });
});

app.listen(3000, () => {
    console.log("Terhubung di http://localhost:3000")
});