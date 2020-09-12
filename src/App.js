import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Input, IconButton } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  const getIsLast = (obj, index, messages) => {
    if (index + 1 === messages.length) {
      return true;
    }

    const nextMessage = messages[index + 1];

    return nextMessage.data().username !== obj.username;
  };

  const getIsFirst = (obj, index, messages) => {
    if (index === 0) {
      return true;
    }

    const LastMessage = messages[index - 1];

    return LastMessage.data().username !== obj.username;
  };

  useEffect(() => {
    // Setting listener to get messages from database on Firebase
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc, index) => ({
            id: doc.id,
            message: doc.data(),
            isLast: getIsLast(doc.data(), index, snapshot.docs),
            isFirst: getIsFirst(doc.data(), index, snapshot.docs),
          }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const sendMessage = (e) => {
    // All the logic to send a message
    e.preventDefault();

    db.collection("messages").add({
      username,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="app">
      <img
        className="app__logo"
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="Logo"
      ></img>

      <FlipMove>
        {messages.map(message => (
          <Message
            message={message.message}
            isLast={message.isLast}
            isFirst={message.isFirst}
            user={username}
            key={message.id}
          />
        ))}
      </FlipMove>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            id="my-input"
            placeholder="Enter a message..."
            aria-describedby="my-helper-tex"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="app__input"
          />
          <IconButton
            disabled={!input}
            type="submit"
            color="primary"
            variant="outlined"
            onClick={sendMessage}
            className="app__iconButton"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
