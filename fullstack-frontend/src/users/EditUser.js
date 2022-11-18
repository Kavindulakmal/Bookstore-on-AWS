import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  let navigate = useNavigate();

  const { id } = useParams();

  // const [book, setBook] = useState({
  //   title: "",
  //   author: "",
  //   cost: "",
  // });

  // const { title, author, cost } = book;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cost, setCost] = useState("");

  // const onInputChange = (e) => {
  //   setBook({ ...book, [e.target.title]: e.target.value });
  // };

  useEffect(()=>{

    async function fetchData(){
      const response = (await axios.get(`http://localhost:8080/book/${id}`)).data;
      setTitle(response.title);
      setAuthor(response.author);
      setCost(response.cost);
    }
   fetchData();
   },[id])

  const onSubmit = async (e) => {
    const book = {
      title: title,
      author: author,
      cost: cost,
    };
    e.preventDefault();
    await axios.put(`http://localhost:8080/book/${id}`, book);
    navigate("/");
  };

  // const loadBook = async () => {
  //   const result = await axios.get(`http://localhost:8080/book/${id}`);
  //   setBook(result.data);
  // };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Book</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                Book Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Book name"
                name="title"
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
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Cost" className="form-label">
                Cost
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Cost"
                name="cost"
                value={cost}
                onChange={(e) => {
                  setCost(e.target.value);
                }}
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
