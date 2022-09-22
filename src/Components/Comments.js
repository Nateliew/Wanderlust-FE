import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { BACKEND_URL } from "../constant";
import { CommentCard } from "./CommentCard";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState();
  const params = useParams();
  const tripId = params.tripId;

  const trip_id = Number(params);
  const user_id = 1;

  const getComments = async () => {
    let initialComments = await axios.get(
      `${BACKEND_URL}/trips/${tripId}/comments`
    );
    setComments(initialComments.data);
  };

  useEffect(() => {
    if (!commentContent) getComments();
  }, [commentContent]);

  // if (!trips) {
  //   return "No Profile";
  // }
  // const [isEditing, setIsEditing] = useState(false);

  // const handleClick = () => {
  //   setIsEditing(true);
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     setIsEditing(false);
  //   }
  // };

  const handleChange = (event, index) => {
    setCommentContent(event.target.value);
    // setCommentContent((state) => [
    //   ...state.slice(0, index),
    //   { ...state[index], content: event.target.value },
    //   ...state.slice(index + 1),
    // ]);
  };

  const handleSubmit = async (event) => {
    // Prevent default form redirect on submission
    event.preventDefault();
    // Send request to create new comment in backend
    await axios
      .post(`${BACKEND_URL}/trips/${tripId}/comments`, {
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

  // const handleUpdate = async (comment) => {
  //   // Send request to create new comment in backend
  //   await axios
  //     .put(`${BACKEND_URL}/trips/${tripId}/comments`, {
  //       content: commentContent,
  //       trip_id,
  //       user_id,
  //     })

  //     .then((res) => {
  //       // Clear form state
  //       setCommentContent("");
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  const deleteComment = async (id) => {
    console.log(id);
    await axios.delete(`${BACKEND_URL}/trips/${tripId}/comments/`, {
      data: { commentId: id },
    });
  };

  return (
    <div className="App">
      {comments
        // .filter((comment) => comment.tripId === tripId)
        .map((comment) => {
          return (
            <div>
              {/* {isEditing ? (
                <input
                  autoFocus
                  value={commentContent}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  type="text"
                />
              ) : (
                <span onClick={handleClick}>
                  <p>
                    {comment.text} by user {comment.userId}
                  </p>
                </span>
              )} */}
              {/* <p>
                {comment.text} by user {comment.userId}
              </p> */}
              <p>
                {
                  <CommentCard
                    comment={comment}
                    deleteComment={deleteComment}
                  />
                }
              </p>
              {/* <button onClick={(e) => deleteComment(comment.id)}>Delete</button> */}
            </div>
          );
        })}
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
