import React from "react";
import PropTypes from "prop-types";

export default function Score({ score }) {
  return <div>{score}</div>;
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
};
