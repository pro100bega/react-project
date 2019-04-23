import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) {
      return;
    }

    this.doSubmit();
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    error.details.forEach(item => {
      errors[item.path[0]] = item.message;
    });

    console.log(errors);
    return errors;
  };

  validateProperty = ({ currentTarget: input }) => {
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };

    const { error } = Joi.validate(obj, schema);

    const errors = { ...this.state.errors };

    if (!error) {
      delete errors[input.name];
    } else {
      errors[input.name] = error.details[0].message;
    }

    this.setState({ errors });
  };

  renderInput(name, label, autofocus, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        autoFocus={autofocus}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        onBlur={this.validateProperty}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
        onBlur={this.validateProperty}
        options={options}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
