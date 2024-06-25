const Movie = require("../Models/movie.schema")

const createMovie = async (req, res) => {
    let movie = await Movie.create(req.body)
    res.status(201).send(movie)
}

const updateMovie = async (req, res) => {
    const movieId = req.params.id;
    const updateData = req.body;

    try {
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, updateData, { new: true });

        if (!updatedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deleteMovie = async (req, res) => {
    let { id } = req.params
    let movie = await Movie.findByIdAndDelete(id)
    res.status(200).send({ message: "Movie deleted" })
}

const addRating = async (req, res) => {
    let { id } = req.params;

    if (id) {
        let movieData = await Movie.findById(id);

        if (!movieData) {
            return res.status(404).json({ error: "Movie not found" });
        }

        movieData.ratings.push({ value: req.body.rating });
        await movieData.save();
        res.status(200).send(movieData);
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
}

const movieComment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const movie = await Movie.findById(id);

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    movie.comments.push({ text });
    await movie.save();

    res.send(movie);
}


const moviesFilter = async (req, res) => {
    const { title, addedBy, releaseDate, category } = req.query;
    const findFilter = {};

    if (title) {
        findFilter.title = title;
    }
    if (addedBy) {
        findFilter.addedBy = addedBy;
    }
    if (releaseDate) {
        findFilter.releaseDate = releaseDate;
    }
    if (category) {
        findFilter.category = category;
    }

    try {
        const findData = await Movie.find(findFilter);

        if (!findData.length) {
            return res.status(404).send("Not Found");
        }
        
        res.send(findData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { createMovie, updateMovie, deleteMovie, addRating, movieComment,moviesFilter }