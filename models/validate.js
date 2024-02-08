const Joi = require("joi");

const JoiMovie = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  releaseDate: Joi.date().required(),
  viewerDiscretion: Joi.string().required(),
  productionCompany: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.string().required(),
  language: Joi.string().required(),
  boxOffice: Joi.number().min(0),
}).options({ allowUnknown: true, stripUnknown: true });

module.exports = JoiMovie;
