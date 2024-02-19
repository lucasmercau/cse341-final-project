const { ObjectId } = require("mongodb");
const { GoogleUser, GithubUser, FacebookUser } = require("../models/users");
const {
  JoiGoogleUser,
  JoiGithubUser,
  JoiFacebookUser,
} = require("../models/validate");


const getGoogleUsers = async (req, res) => {
  //#swagger.tags=["Google Users"]
  try {
    const user = await GoogleUser.find();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(422).json({ message: "Uprocessable content" });
  }
};

const getGoogleUserById = async (req, res) => {
  //#swagger.tags=["Google Users"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }
  try {
    const googleUser = await GoogleUser.findById(req.params.id);
    res.status(200).json(googleUser);
  } catch (err) {
    console.error("Error in getGoogleUserById", err);
    res.status(422).json({ message: "Unprocessable content" });
  }
};

const updateGoogleUser = async (req, res) => {
  //#swagger.tags=["Google Users"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }
  const googleUserId = new ObjectId(req.params.id);
  const updatedUser = {
    username: req.body.username,
    thumbnail: req.body.thumbnail,
  };

  const { error } = JoiGoogleUser.validate(updatedUser);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  try {
    const response = await GoogleUser.updateOne(
      { _id: googleUserId },
      { $set: updatedUser }
    );
    if (response.modifiedCount > 0) {
      return res.status(204).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteGoogleUser = async (req, res) => {
  //#swagger.tags=["Google Users"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }

  try {
    const deletedUser = await GoogleUser.deleteOne({ _id: req.params.id });
    if (deletedUser.deletedCount > 0) {
      return res.status(204).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server erro" });
  }
};


const getGithubUsers = async (req, res) => {
  //#swagger.tags=["GitHub Users"]
  try {
    const user = await GithubUser.find();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(422).json({ message: "Unprocessable content" });
  }
};

const getGithubUserById = async (req, res) => {
  //#swagger.tags=["GitHub Users"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }
  try {
    const githubUser = await GithubUser.findById(req.params.id);
    res.status(200).json(githubUser);
  } catch (err) {
    console.error("Error in getGithubUserById", err);
    res.status(422).json({ message: "Unprocessable content" });
  }
};

const updateGithubUser = async (req, res) => {
  //#swagger.tags=["GitHub Users"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }
  const githubUserId = new ObjectId(req.params.id);
  const updatedUser = {
    username: req.body.username,
    thumbnail: req.body.thumbnail,
  };

  const { error } = JoiGithubUser.validate(updatedUser);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  try {
    const response = await GoogleUser.updateOne(
      { _id: githubUserId },
      { $set: updatedUser }
    );
    if (response.modifiedCount > 0) {
      return res.status(204).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteGithubUser = async (req, res) => {
  //#swagger.tags=["GitHub Users"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }

  try {
    const deletedUser = await GithubUser.deleteOne({ _id: req.params.id });
    if (deletedUser.deletedCount > 0) {
      return res.status(204).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getFacebookUsers = async (req, res) => {
  //#swagger.tags=["Facebook Users"]
  try {
    const user = await FacebookUser.find();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(422).json({ message: "Unprocessable content" });
  }
};

const getFacebookUserById = async (req, res) => {
  //#swagger.tags=["Facebook Users"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }
  try {
    const facebookUser = await FacebookUser.findById(req.params.id);
    res.status(200).json(facebookUser);
  } catch (err) {
    console.error("Error in getFacebookUserById", err);
    res.status(422).json({ message: "Unprocessable content" });
  }
};

const updateFacbookUser = async (req, res) => {
  //#swagger.tags=["Facebook Users"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }
  const facebookUserId = new ObjectId(req.params.id);
  const updatedUser = {
    username: req.body.username,
    thumbnail: req.body.thumbnail,
  };

  const { error } = JoiFacebookUser.validate(updatedUser);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  try {
    const response = await FacebookUser.updateOne(
      { _id: facebookUserId },
      { $set: updatedUser }
    );
    if (response.modifiedCount > 0) {
      return res.status(204).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteFacebookUser = async (req, res) => {
  //#swagger.tags=["Facebook Users"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }

  try {
    const deletedUser = await FacebookUser.deleteOne({ _id: req.params.id });
    if (deletedUser.deletedCount > 0) {
      return res.status(204).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server erro" });
  }
};

module.exports = {
  getGoogleUsers,
  getGoogleUserById,
  updateGoogleUser,
  deleteGoogleUser,
  getGithubUsers,
  getGithubUserById,
  updateGithubUser,
  deleteGithubUser,
  getFacebookUsers,
  getFacebookUserById,
  updateFacbookUser,
  deleteFacebookUser,
};
