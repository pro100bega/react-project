import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class CarForm extends Form {
  state = {
    data: { mark: "", model: "", country: "", year: 0 },
    errors: {}
  };

  schema = {
    mark: Joi.string()
      .required()
      .label("Mark"),
    model: Joi.string()
      .required()
      .label("Model"),
    country: Joi.string()
      .required()
      .label("Country"),
    year: Joi.number()
      .min(1992)
      .max(2019)
      .required()
      .label("Year")
  };

  render() {
    return (
      <div>
        <h1>Car Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("mark", "Mark", true)}
          {this.renderInput("model", "Model")}
          {this.renderInput("country", "Country")}
          {this.renderInput("year", "Year")}
          {this.renderButton("Create car")}
        </form>
      </div>
    );
  }
}

export default CarForm;
