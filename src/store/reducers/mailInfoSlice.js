import { createSlice } from "@reduxjs/toolkit";

const mailInfoInitialState = {
  loading: false,
  inbox: [],
  send: [],
};

const mailInfoSlice = createSlice({
  name: "userInfo",
  initialState: mailInfoInitialState,
  reducers: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    sendingMail(state, action) {
      console.log("data", action.payload);
      state.send.push(action.payload);
    },
    receivingMail(state, action) {
      state.inbox.push(action.payload);
    },
    deletingMail(state, action) {
      if (action.payload.actionFrom === "inbox") {
        state.inbox = state.inbox.filter(
          (mail) => mail.id !== action.payload.emailId
        );
      }
      if (action.payload.actionFrom === "send") {
        state.send = state.send.filter(
          (mail) => mail.id !== action.payload.emailId
        );
      }
    },
    resetSendMail(state, action) {
      state.send = action.payload;
    },
    resetInboxMail(state, action) {
      state.inbox = action.payload;
    },
    mailRead(state, action) {
      state.inbox = state.inbox.map((item) => {
        if (item.id === action.payload) item.read = true;
        return item;
      });
    },
  },
});

export const {
  resetSendMail,
  resetInboxMail,
  toggleLoading,
  sendingMail,
  receivingMail,
  deletingMail,
  mailRead,
} = mailInfoSlice.actions;

export default mailInfoSlice.reducer;
