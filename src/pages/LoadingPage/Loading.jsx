import React from "react";
import loadingImg from "../../images/loading.svg";
function Loading() {
  return (
    <div className="loading">
      <img src={loadingImg} alt="" />
    </div>
  );
}

export default Loading;
