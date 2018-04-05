import React from 'react';
import './styles.css';

const Loader = (props) => {
  return (
    <div className={props.className || "loader"}>
      <div className="loader-spinning-wheel"></div>
    </div>
  );
}
export default Loader;
