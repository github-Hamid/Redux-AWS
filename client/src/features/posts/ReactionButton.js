import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

import React from "react";

let reactionEmoji = {
  thumbsUp: <span class="material-symbols-outlined">
  thumb_up
  </span>,
  wow: <span class="material-symbols-outlined">
  sentiment_satisfied
  </span>,
  heart: <span class="material-symbols-outlined">
  favorite
  </span>,
  rocket: <span class="material-symbols-outlined">
  rocket
  </span>,
  mood_bad: <span class="material-symbols-outlined">
  mood_bad
  </span>,
};

const ReactionButton = (props) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        onClick={() => {
          dispatch(reactionAdded({ postId: props.post.id, reaction: name }));
        }}
      >
        {emoji} {props.post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionButton;
