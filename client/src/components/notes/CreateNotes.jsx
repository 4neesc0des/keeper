import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateNotes = () => {
  // state management
  const [note, setnote] = useState({
    title: "",
    content: "",
    date: "",
  });

  // usehistory
  const history = useHistory();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setnote({ ...note, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date } = note;
        const newNote = {
          title,
          content,
          date,
        };

        await axios.post("/api/notes", newNote, {
          headers: {
            Authorization: token,
          },
        });

        return history.push("/");
      }
    } catch (error) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="create-note">
        <h2>Create Note</h2>
        <form onSubmit={createNote} autoComplete="off">
          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={note.title}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              id="content"
              name="content"
              rows="10"
              value={note.content}
              onChange={onChangeInput}
              required
            />
          </div>
          <label htmlFor="date"> Date : {note.date}</label>
          <div className="row">
            <input type="date" id="date" name="date" onChange={onChangeInput} />
          </div>
          <button className="btn" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateNotes;
