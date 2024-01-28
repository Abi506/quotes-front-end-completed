import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Quotes from "./components/Quotes";
import ProtectedRoute from "./components/ProtectedRoute";
import QuoteItemDetails from "./components/QuotesItemDetails";
import Authors from "./components/Authors";
import MyQuotes from "./components/MyQuotes";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/all-quotes/" component={Quotes} />
      <ProtectedRoute
        exact
        path="/all-quotes/:id"
        component={QuoteItemDetails}
      />
      <ProtectedRoute exact path="/authors/" component={Authors} />
      <ProtectedRoute exact path="/profile/" component={Profile} />
      <ProtectedRoute exact path="/my-quotes/" component={MyQuotes} />
    </Switch>
  );
};

export default App;
