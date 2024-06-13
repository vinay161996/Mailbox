import {
  deletingMail,
  mailRead,
  resetInboxMail,
  resetSendMail,
  sendingMail,
  toggleLoading,
} from "../reducers/mailInfoSlice";
import baseUrl from "../../api/baseUrl";
import emailChanger from "../../features/emailChanger";
import { toast } from "react-toastify";

export const sendingEmailAction = (submittedValue) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading());
      const { senderMail, emailTo } = submittedValue;

      const sendData = {
        method: "POST",
        body: JSON.stringify(submittedValue),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const senderPromise = fetch(
        `${baseUrl}/${emailChanger(senderMail)}/send.json`,
        sendData
      );
      const emailToPromise = fetch(
        `${baseUrl}/${emailChanger(emailTo)}/inbox.json`,
        sendData
      );

      const [senderPromiseRes, emailToPromiseRes] = await Promise.all([
        senderPromise,
        emailToPromise,
      ]);

      if (!senderPromiseRes.ok || !emailToPromiseRes.ok) throw new Error();

      const data = await senderPromiseRes.json();

      const updatedSubmittedValue = { ...submittedValue, id: data.name };
      dispatch(sendingMail(updatedSubmittedValue));
      toast.success("Mail sent");
    } catch (err) {
      toast.error("Failed to send mail");
    } finally {
      dispatch(toggleLoading());
    }
  };
};

export const fetchingEmails = () => {
  return async (dispatch, getState) => {
    try {
      const email = getState().auth.email;
      const res = await fetch(`${baseUrl}/${emailChanger(email)}.json`);
      if (!res.ok) throw new Error();
      const data = await res.json();

      if (data.send) {
        const updatedEmails = [];
        for (let key in data.send) {
          updatedEmails.push({ ...data.send[key], id: key });
        }
        updatedEmails.reverse();
        dispatch(resetSendMail(updatedEmails));
      }
      if (data.inbox) {
        const updatedEmails = [];
        for (let key in data.inbox) {
          updatedEmails.push({ ...data.inbox[key], id: key });
        }
        updatedEmails.reverse();
        dispatch(resetInboxMail(updatedEmails));
      }
    } catch (error) {
      toast.error("Failed to fetch mail");
    }
  };
};

export const deletingEmailAction = (emailId, actionFrom) => {
  return async (dispatch, getState) => {
    try {
      dispatch(toggleLoading());
      const email = getState().auth.email;
      const res = await fetch(
        `${baseUrl}/${emailChanger(email)}/${actionFrom}/${emailId}.json`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error();
      dispatch(deletingMail({ actionFrom, emailId }));
      toast.success("Mail deleted");
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      dispatch(toggleLoading());
    }
  };
};

export const mailReadingAction = (emailId) => {
  return async (dispatch, getState) => {
    try {
      const email = getState().auth.email;
      const res = await fetch(
        `${baseUrl}/${emailChanger(email)}/inbox/${emailId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ read: true }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error();
      dispatch(mailRead(emailId));
    } catch (error) {
      toast.error("Failed to Read");
    }
  };
};
