import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MoviesContainer from "./components/moviesContainer";
import NavBar from "./components/common/navbar";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import Rentals from "./components/rentals";
import LoginForm from "./components/loginForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import RegisterForm from "./components/registerForm";
import CarForm from "./components/CarForm";

class App extends Component {
  render() {
    const pages = [
      { caption: "Movies", path: "/movies" },
      { caption: "Customers", path: "/customers" },
      { caption: "Rentals", path: "/rentals" },
      { caption: "Login", path: "/login" },
      { caption: "Register", path: "/register" },
      { caption: "Sasha pidr", path: "/car" }
    ];

    return (
      <React.Fragment>
        <NavBar heading="Vidly" pages={pages} />
        <div className="container">
          <Switch>
            <Route path="/car" component={CarForm} />
            <Route path="/movies/new" component={MovieForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={MoviesContainer} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
