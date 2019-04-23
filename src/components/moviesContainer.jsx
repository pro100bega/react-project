import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import React, { Component } from "react";
import MoviesTable from "./moviesTable";

import _ from "lodash";

import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

export default class MoviesContainer extends Component {
  constructor(props) {
    super(props);

    const pageSize = 4;
    this.state = {
      movies: [],
      genres: [],
      currentPage: 1,
      pageSize,
      selectedFilter: {},
      sortColumn: { path: "Title", order: "asc" }
    };
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "Al movies" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres
    });
  }

  getPagedData = () => {
    const { selectedFilter, currentPage, pageSize } = this.state;
    const { path, order } = this.state.sortColumn;
    const sortedMovies = _.orderBy(this.state.movies, path, order);

    const filteredMovies =
      selectedFilter && selectedFilter._id
        ? sortedMovies.filter(movie => movie.genre._id === selectedFilter._id)
        : sortedMovies;

    return {
      totalCount: filteredMovies.length,
      movies: paginate(filteredMovies, currentPage, pageSize)
    };
  };

  render() {
    const elementToRender =
      this.state.movies.length === 0
        ? this.getEmptyMessage()
        : this.getMoviesTable();

    return elementToRender;
  }

  getEmptyMessage = () => {
    return <p>There are no movies in database :(</p>;
  };

  getMoviesTable = () => {
    const {
      selectedFilter,
      genres,
      pageSize,
      currentPage,
      sortColumn
    } = this.state;

    const { movies, totalCount } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            filters={genres}
            selectedFilter={selectedFilter}
            onFilterSelected={this.handleFilterSelection}
          />
        </div>
        <div className="col">
          <Link to="/movies/new" className="btn btn-primary mb-3">
            New Movie
          </Link>
          <p>Showing {totalCount} movies in database.</p>
          <MoviesTable
            sortColumn={sortColumn}
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            totalElements={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handleDelete = movieId => {
    const movies = this.state.movies.filter(movie => movie._id !== movieId);
    this.setState({ movies });
  };

  handlePageChange = page => {
    const { filteredMovies, pageSize } = this.state;
    const moviesToDisplay = paginate(filteredMovies, page, pageSize);

    this.setState({ moviesToDisplay, currentPage: page });
  };

  handleFilterSelection = filter => {
    this.setState({ selectedFilter: filter, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
}
