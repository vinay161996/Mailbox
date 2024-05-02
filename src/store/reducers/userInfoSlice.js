import { createSlice } from "@reduxjs/toolkit";

const userInfoInitialState = {
  inbox: [],
  send: [],
  trash: [],
  draft: [],
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: userInfoInitialState,
  reducers: {
    sendingMail(state, action) {
      state.inbox = state.inbox.push(action.payload.mail);
    },
    receivingMail(state, action) {
      state.send = state.send.push(action.payload.mail);
    },
    deletingMail(state, action) {
      if (action.payload.container === "inbox") {
        state.inbox = state.inbox.map(
          (mail) => mail.id !== action.payload.mailId
        );
      }
      if (action.payload.container === "send") {
        state.send = state.send.map(
          (mail) => mail.id !== action.payload.mailId
        );
      }
    },
  },
});

export const userInfoAction = userInfoSlice.actions;
export default userInfoSlice.reducer;
