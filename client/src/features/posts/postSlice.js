import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
// import produce from "immer";
import { sub } from "date-fns";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    return b.date.localeCompare(a.date);
  },
});

const initialState = postAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
});

export const fetchPost = createAsyncThunk("post/fetchPosts", async () => {
  const response = await fetch(POSTS_URL);
  const json = await response.json();
  return json;
});

export const addPost = createAsyncThunk("post/addPost", async (post) => {
  const response = await fetch(POSTS_URL, {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "Content-Type": "application/json" },
  });
  const json = await response.json();
  return json;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        action.payload.id = parseInt(state[state.length - 1].id) + 1;
        postAdapter.addOne(state, action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: 0,
            title,
            content,
            date: new Date().toISOString(),
            userId,
          },
        };
      },
    },
    reactionAdded: {
      reducer: (state, action) => {
        const { postId, reaction } = action.payload;
        const existingPost = state.entities[postId];
        if (existingPost) {
          existingPost.reactions[reaction]++;
        }
      },
    },
    increaseCount: (state, action) => {
      let number = state.count + 1;
      state.count = number;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        let min = 1;
        const loadPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            mood_bad: 0,
          };
          return post;
        });
        postAdapter.upsertMany(state, loadPosts);
        state.status = "succeeded";
      })

      .addCase(fetchPost.rejected, (state, action) => {
        state.error = action.payload.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        action.payload.id = state.ids.length + 1;
        action.payload.userId = Number(action.payload.userId);
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          mood_bad: 0,
        };
        action.payload.date = new Date().toISOString();
        postAdapter.addOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: getPostById,
  selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => {
  return state.posts;
});

export const getStatus = (state) => {
  return state.posts.status;
};

export const getCounter = (state) => {
  return state.posts.count;
};

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const { postAdded, reactionAdded, increaseCount } = postSlice.actions;
export default postSlice.reducer;
