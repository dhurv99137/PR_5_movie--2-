const { Router } = require("express")
const { createMovie, updateMovie, deleteMovie, addRating, movieComment, moviesFilter } = require("../controllers/movie.controller")


let movieRoute=Router()

movieRoute.post("/create",createMovie)
movieRoute.patch("/update/:id",updateMovie)
movieRoute.delete("/delete/:id",deleteMovie)

movieRoute.patch("/rating/:id",addRating)
movieRoute.patch("/comment/:id",movieComment)

movieRoute.get("/filter",moviesFilter)

module.exports=movieRoute
