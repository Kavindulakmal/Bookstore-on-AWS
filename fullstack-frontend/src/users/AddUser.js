import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddBook() {
  let navigate = useNavigate();

  // const [book, setBook] = useState({
  //   title: "",
  //   author: "",
  //   cost: "",
  // });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cost, setCost] = useState("");

  // const onInputChange = (e) => {
  //   setBook({ ...book, [e.target.title]: e.target.value });
  // };

  const onSubmit = async (e) => {
    
    e.preventDefault();
    const book ={
      title: title,
      author: author,
      cost: cost
    }
    await axios.post("http://localhost:8080/book", book);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Book</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Book Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Book name"
                name="name"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Author" className="form-label">
                Author Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Author Name"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Cost" className="form-label">
                Cost
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Book cost"
                name="cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
