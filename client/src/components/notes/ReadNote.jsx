import React, { useEffect, useState } from "react";
import axios from "axios";
export default function ReadNote({ match }) {
  const [note, setnote] = useState({
    title: "",
    content: "",
    date: "",
    name: "",
    id: "",
  });
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
            name: res.data.name,
            id: res.data._id,
          });
        } catch (err) {
          console.log(err.response.data.msg);
        }
      }
    };
    getNote();
  }, [match.params.id]);
  return (
    <>
      <div className="read-container">
        <div className="title">
          <p>{note.title}</p>
        </div>
        <div className="content">
          <pre>{note.content}</pre>
        </div>
        <div className="author-date">
          <p>~ {note.name}</p>
          <p>Date : {note.date}</p>
        </div>
      </div>
    </>
  );
}
