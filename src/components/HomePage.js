import React from "react";
import { useLocation,useNavigate } from "react-router-dom";

function Homepage(props) {
  const location = useLocation();
  const navigate = useNavigate();
  debugger;
  return (
    <React.Fragment>
      <div className="ui clearing segment">
        <div className="four wide field ui right floated header">
          <button
            className="ui fluid small teal submit button "
            onClick={() => {
              navigate("/register");
            }}
          >
            Log out
          </button>
        </div>
      </div>
      <div className="">
     <h1> {`Hello there ${location.state.result.firstName}`} </h1>
      </div>
      
    </React.Fragment>
  );
}

export default Homepage;
