const { Rating } = require("../models/movie");
const { JoiRating } = require("../models/validate");
const { ObjectId } = require("mongodb");

const getAllRatings = async (req, res) => {
  //#swagger.tags=["Movie Ratings"]
  try {
    const ratings = await Rating.find();
    res.status(200).json(ratings);
  } catch (err) {
    console.error("Error in getAllRatings: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRatingById = async (req, res) => {
  //#swagger.tags=["Movie Ratings"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }
  try {
    const ratingById = await Rating.findById(req.params.id);
    if (!ratingById) {
      return res.status(404).json({ message: "Rating not found" });
    }
    res.status(200).json(ratingById);
  } catch (err) {
    console.error("Error in getRatingById: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createRating = async (req, res) => {
  //#swagger.tags=["Movie Ratings"]
  const newRating = {
    username: req.body.username,
    rating: req.body.rating,
    comment: req.body.comment,
  };

  const { error } = JoiRating.validate(newRating);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  const rating = new Rating(newRating);
  try {
    const savedRating = await rating.save();
    res.status(201).json(savedRating);
  } catch (err) {
    console.error("Error in createRating: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateRating = async (req, res) => {
  //#swagger.tags=["Movie Ratings"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }
  const ratingId = new ObjectId(req.params.id);
  const updatedRating = {
    username: req.body.username,
    rating: req.body.rating,
    comment: req.body.comment,
  };

  const { error } = JoiRating.validate(updatedRating);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  try {
    const response = await Rating.updateOne(
      { _id: ratingId },
      { $set: updatedRating }
    );
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Rating updated successfully" });
    } else {
      res.status(404).json({ message: "Rating not found" });
    }
  } catch (err) {
    console.error("Error in updateRating: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteRating = async (req, res) => {
  //#swagger.tags=["Movie Ratings"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }
  try {
    const deletedRating = await Rating.deleteOne({ _id: req.params.id });
    if (deletedRating.deletedCount > 0) {
      res.status(200).json({ message: "Rating deleted successfully" });
    } else {
      res.status(404).json({ message: "Rating not found" });
    }
  } catch (err) {
    console.error("Error in deleteRating: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllRatings,
  getRatingById,
  createRating,
  updateRating,
  deleteRating,
};
