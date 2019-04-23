import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
  keyProperty,
  textProperty,
  filters,
  selectedFilter,
  onFilterSelected
}) => {
  return (
    <div className="list-group">
      {filters.map(filter => (
        <a
          key={filter[keyProperty]}
          className={
            filter[keyProperty] === selectedFilter[keyProperty]
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          onClick={() => onFilterSelected(filter)}
        >
          {filter[textProperty]}
        </a>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  keyProperty: "_id"
};

ListGroup.propTypes = {
  textProperty: PropTypes.string,
  keyProperty: PropTypes.string,
  filters: PropTypes.array.isRequired,
  selectedFilter: PropTypes.object.isRequired,
  onFilterSelected: PropTypes.func.isRequired
};

export default ListGroup;
