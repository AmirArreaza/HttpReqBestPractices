import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Blog from "./containers/Blog/Blog";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/*<BrowserRouter basename="/">*/}
        <BrowserRouter>
          <div className="App">
            <Blog />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
