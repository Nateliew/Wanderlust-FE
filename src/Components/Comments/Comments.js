import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import { CommentCard } from "./CommentCard";
import { UserContext } from "../../App";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState();
  const user_id = useContext(UserContext);

  console.log(user_id);

  const params = useParams();
  const tripId = params.tripId;

  const trip_id = Number(params);

  const getComments = async () => {
    let initialComments = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/trips/${tripId}/comments`
    );
    setComments(initialComments.data);
    console.log(comments);
  };

  useEffect(() => {
    if (!commentContent) getComments();
  }, [commentContent]);

  // if (!trips) {
  //   return "No Profile";
  // }

  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    // Prevent default form redirect on submission
    event.preventDefault();
    console.log("is this running?");
    // Send request to create new comment in backend
    await axios
      .post(`${process.env.REACT_APP_API_SERVER}/trips/${tripId}/comments`, {
        content: commentContent,
        trip_id,
        user_id,
      })
      .then((res) => {
        // Clear form state
        setCommentContent("");
      })
      .then((response) => {
        console.log(response);
      });
  };

  const deleteComment = async (id) => {
    console.log(id);
    let response = await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/trips/${tripId}/comments/`,
      {
        data: { commentId: id, tripId: tripId },
      }
    );
    console.log(response.data);
    setComments(response.data);
  };

  return (
    <div className="App">
      {comments.map((comment, index) => {
        return (
          <div key={index}>
            {<CommentCard comment={comment} deleteComment={deleteComment} />}
          </div>
        );
      })}
      <br />
      <label>Comments</label>
      <form onSubmit={handleSubmit}>
        <input
          // Use textarea to give user more space to type
          as="textarea"
          name="content"
          value={commentContent}
          onChange={handleChange}
        />
        <button variant="primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comments;
