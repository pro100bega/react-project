import React, { Component } from "react";

class A extends Component {
  /**
   *
   * [
   *
   * {name: "Minsk", latitude: 90, longitude: 10}
   * {name: "Kharkiv", latitude: 90, longitude: 10}
   * {name: "Moscow", latitude: 90, longitude: 10}
   * {name: "Lviv", latitude: 90, longitude: 10}
   * {name: "Kharkiv", latitude: 90, longitude: 10}
   * {name: "Kharkiv", latitude: 90, longitude: 10}
   * {name: "Kharkiv", latitude: 90, longitude: 10}
   * {name: "Kharkiv", latitude: 90, longitude: 10}
   * {name: "Kharkiv", latitude: 90, longitude: 10}
   *
   * ]
   */

  cities = [
    { name: "Minsk", latitude: 90, longitude: 10 },
    { name: "Kharkiv", latitude: 90, longitude: 10 },
    { name: "Moscow", latitude: 90, longitude: 10 },
    { name: "Lviv", latitude: 90, longitude: 10 },
    { name: "Kharkiv", latitude: 90, longitude: 10 },
    { name: "Kharkiv", latitude: 90, longitude: 10 },
    { name: "Kharkiv", latitude: 90, longitude: 10 },
    { name: "Kharkiv", latitude: 90, longitude: 10 },
    { name: "Kharkiv", latitude: 90, longitude: 10 }
  ];

  getMin(array, supplier) {
    let minValue = Number.MAX_VALUE;

    array.forEach(element => {
      const value = supplier(element);

      minValue = value < minValue ? value : minValue;
    });

    return minValue;
  }

  getMax(array, supplier) {
    let maxValue = Number.MIN_VALUE;

    array.forEach(element => {
      const value = supplier(element);

      maxValue = value > maxValue ? value : maxValue;
    });

    return maxValue;
  }

  getNorthernmostCityName() {
    return this.getMax(this.cities, city => city.latitude);
  }

  getSouthernmostCityName() {
    return this.getMin(this.cities, city => city.latitude);
  }

  getEasternmostCityName() {
    return this.getMax(this.cities, city => city.longitude).name;
  }

  getWesternmostCityName() {
    return this.getMin(this.cities, city => city.longitude).name;
  }

  state = {};
  render() {
    const cityWithMaxLongitude = this.getMax(
      this.cities,
      city => city.longitude
    );

    return <div />;
  }
}

export default A;
