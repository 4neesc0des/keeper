import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";

const Home = () => {
  const [notes, setNotes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState("");
  const [err, setErr] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: {
        Authorization: token,
      },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        const res = await axios.delete(`api/notes/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        getNotes(token);
        setErr(res.data.msg);
      }
    } catch (error) {
      window.location.href = "/";
    }
  };
  return (
    <>
      <p className="alert-box">{err}</p>
      <div className="note-wrapper">
        {notes.map((values) => (
          <div className="card" key={values._id}>
            <h4 title={values.title}>{values.title}</h4>
            <Link to={`read/${values._id}`}>
              <div className="text-wrapper">
                <p>{values.content}</p>
              </div>
            </Link>
            <p className="date">{format(values.date)}</p>
            <div className="card-footer">
              {values.name}
              <Link to={`edit/${values._id}`}>Edit</Link>
            </div>
            <button
              className="close"
              onClick={() => {
                deleteNote(values._id);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
