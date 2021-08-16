import React from "react";
import Navbar from "../components/notes/Nav";
import Home from "../components/notes/Home";
import CreateNotes from "./notes/CreateNotes";
import EditNote from "./notes/EditNote";
import ReadNote from "./notes/ReadNote";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Note = ({ setIsLogin }) => {
  return (
    <>
      <Router>
        <div className="notes-page">
          <Navbar setIsLogin={setIsLogin} />
          <section>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/create" component={CreateNotes} />
              <Route exact path="/edit/:id" component={EditNote} />
              <Route exact path="/read/:id" component={ReadNote} />
            </Switch>
          </section>
        </div>
      </Router>
    </>
  );
};

export default Note;
