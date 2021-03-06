import React, { Component, Suspense } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import "./Blog.css";
//import Posts from "./Posts/Posts";
import asyncComponent from "../../hoc/asyncComponent";
//import NewPost from "./NewPost/NewPost";

const Posts = React.lazy(() => import("./Posts/Posts"));

const asyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});

class Blog extends Component {
  state = {
    auth: true,
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline",
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post", // Absolute
                    //pathname: this.props.match.url + "/new-post", for Relative
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/*<Route path="/" exact render={() => <Posts />}/>*/}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={asyncNewPost} />
          ) : null}
          <Route
            path="/posts"
            render={props => (
              <Suspense fallback={<div>Loading...</div>}>
                <Posts {...props}/>
              </Suspense>
            )}
          />
          <Route render={() => <h1>Not Found!</h1>} />
          {/*<Redirect from="/" to="/posts"/> */}
          {/* Moved below as it is dynamic and we don't want new-post to be treated as a dynamic id*/}
          {/* The order is important while using Switch */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
