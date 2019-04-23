import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "./../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genre: "",
      numberInStock: 0,
      rate: 0
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.optional(),
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .positive()
      .required()
      .label("Number in Stock"),
    rate: Joi.number()
      .positive()
      .max(10)
      .required()
      .label("Rate")
  };

  doSubmit() {
    const { _id, title, genre, numberInStock, rate } = this.state.data;

    const movie = {
      _id,
      title,
      genreId: genre,
      numberInStock,
      dailyRentalRate: rate
    };

    saveMovie(movie);

    this.props.history.push("/movies");
  }

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;

    if (!movieId) {
      return;
    }

    const movie = getMovie(movieId);
    if (!movie) {
      return this.props.history.replace("/not-found");
    }

    const { title, genre, numberInStock, dailyRentalRate: rate } = movie;

    const data = {
      _id: movieId,
      title,
      genre: genre._id,
      numberInStock,
      rate
    };

    this.setState({ data });
  }

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", true)}
          {this.renderSelect("genre", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
