import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const EditNote = ({ match }) => {
  const [note, setnote] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
  });

  // usehistory
  const history = useHistory();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (match.params.id) {
        try {
          const res = await axios.get(`/api/notes/${match.params.id}`, {
            headers: {
              Authorization: token,
            },
          });
          setnote({
            title: res.data.title,
            content: res.data.content,
            date: new Date(res.data.date).toLocaleDateString(),
            id: res.data._id,
          });
        } catch (err) {
          console.log(err.response.data.msg);
        }
      }
    };
    getNote();
  }, [match.params.id]);

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const newNote = {
          title: note.title,
          content: note.content,
          date: note.date,
          id: note.id,
        };

        await axios.put(`/api/notes/${note.id}`, newNote, {
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

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setnote({ ...note, [name]: value });
  };
  return (
    <>
      <div className="create-note">
        <h2>Edit Note</h2>
        <form onSubmit={editNote} autoComplete="off">
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

export default EditNote;
