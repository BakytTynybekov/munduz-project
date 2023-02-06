import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./successPage.scss";
function SuccessPage({ message }) {
  const [state, setState] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setState(false);
    }, 5000);
  }, []);
  return (
    <>
      {state ? (
        <div className="succesPage">
          <h1>{message}</h1>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default SuccessPage;
