const { Movie } = require("../models/movie");
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

const getById = async (req, res) => {
  //#swagger.tags=["Movies"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(422).json({ message: "Error: id must be valid" });
  }
  try {
    const movieById = await Movie.findById(req.params.id);
    res.status(200).json(movieById);
  } catch (err) {
    res.status(422).json({ message: err });
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
  getById,
  createMovie,
};
