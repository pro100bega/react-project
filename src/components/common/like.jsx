import React from "react";

const Like = ({ liked, onClick }) => {
  const defaultIconClass = "fa fa-heart";
  const iconClass = liked ? defaultIconClass : `${defaultIconClass}-o`;

  return (
    <i onClick={onClick} style={{ cursor: "pointer" }} className={iconClass} />
  );
};

export default Like;
