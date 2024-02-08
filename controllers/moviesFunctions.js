const { Movie } = require("../models/movie");
const JoiMovie = require("../models/validate");
const ObjectId = require("mongodb").ObjectId;

// This wil be our movies collection
const getAll = async (req, res) => {
  //#swagger.tags=["Movies"]
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(422).json({ message: err });
  }
};

const getByTitle = async (req, res) => {
  //#swagger.tags=["Movies"]
  try {
    const searchTerm = req.params.title;
    const regex = new RegExp(searchTerm, "i"); // "i" flag for case-insensitive search
    const movieByTitle = await Movie.find({ title: { $regex: regex } });
    if (!movieByTitle || movieByTitle.length === 0) {
      return res.status(404).json({ message: "No matching movies found" });
    }
    res.status(200).json(movieByTitle);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ message: "Internal server error" }); // Handle the error appropriately
  }
};

const createMovie = async (req, res) => {
  //#swagger.tags=["Movies"]
  const movieSchema = {
    title: req.body.title,
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
    viewerDiscretion: req.body.viewerDiscretion,
    productionCompany: req.body.productionCompany,
    director: req.body.director,
    duration: req.body.duration,
    language: req.body.language,
    boxOffice: req.body.boxOffice,
  };

  const { error } = JoiMovie.validate(movieSchema);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  const movie = new Movie(movieSchema);
  try {
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    return res.status(422).json({ message: err });
  }
};

module.exports = {
  getAll,
  getByTitle,
  createMovie,
};
