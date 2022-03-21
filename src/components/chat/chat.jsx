import React, { useState, useContext } from "react";
import { Grid, Box, IconButton, Checkbox, TextField } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useInterval } from "../../hooks/use-interval";

export const Chat = () => {
  const [chats, setChats] = useState([]);
  const [currChat, setCurrChat] = useState({});

  const handleChange = (event) => {
    setCurrChat(event.target.value);
  };

  const [messages, setMessages] = useState([]);

  const sendMessage = (messageInput) => {
    const data = {
      chatId: currChat.id,
      username: currUser,
      text: messageInput,
    };

    fetch(`https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then();
  };

  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState("");

  return (
    <div>
      <table style={{ width: "100%" }}>
        <tr>
          <td
            style={{
              height: "100%",
              width: "10%",
              padding: "20px",
              verticalAlign: "top",
            }}
          >
            {/* <div style={{ width: "8%", padding: "20px", marginTop: "2px" }}> */}

            <ChatList
              handleChange={handleChange}
              chats={chats}
              setChats={setChats}
              setCurrChat={setCurrChat}
            ></ChatList>
            <UserList
              users={users}
              setUsers={setUsers}
              currUser={currUser}
              setCurrUser={setCurrUser}
            ></UserList>
            {/* </div> */}
          </td>
          <td>
            <div style={{ width: "60%", marginLeft: "10%" }}>
              <ChatRoom
                currChat={currChat}
                sendMessage={sendMessage}
                messages={messages}
                setMessages={setMessages}
                currUser={currUser}
              ></ChatRoom>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

function Message(props) {
  return (
    <div style={{ margin: "8px" }}>
      <br />
      <span
        style={{
          float: props.message.username == props.currUser ? "right" : "left",
        }}
      >
        {props.message.username}:
        <br />
      </span>
      <br />
      <span
        style={{
          backgroundColor: "#D3D3D3",
          padding: "3px",
          borderRadius: "5%",
          float: props.message.username == props.currUser ? "right" : "left",
        }}
      >
        {props.message.text}
        <br />
      </span>
    </div>
  );
}

function ChatList(props) {
  const [newChat, setNewChat] = useState("");

  useInterval(
    () => {
      fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats")
        .then((response) => response.json())
        .then((data) => {
          props.setChats(data.Items);
        });
    },
    1000 // fast polling
    //60000 // slow polling
  );

  const addChat = () => {
    const chat = {
      name: newChat,
    };

    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chat),
    }).then();
    console.log(newChat);

    setNewChat("");
  };

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Chats</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.currChat}
            label="ChatList"
            onChange={props.handleChange}
          >
            {props.chats.map((chat, index) => (
              <MenuItem
                key={index}
                index={index}
                value={chat}
                onClick={() => props.setCurrChat(chat)}
              >
                {chat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <form>
          <TextField
            id="standard-basic"
            label="add a chat"
            variant="standard"
            type="text"
            className="input"
            value={newChat}
            onChange={(e) => setNewChat(e.target.value)}
          />
          <IconButton
            color="secondary"
            aria-label="add chat"
            onClick={() => addChat(newChat)}
          >
            <AddCircleIcon />
          </IconButton>
        </form>
      </Box>
    </div>
  );
}

function UserList(props) {
  const [user, setUser] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;
    props.setCurrUser(user);
  };

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="User"
            variant="standard"
            type="text"
            className="input"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </form>
      </Box>
    </div>
  );
}

function ChatRoom(props) {
  useInterval(
    (params) => {
      const chatId = params[0];
      fetch(
        `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${chatId}/messages`
      )
        .then((response) => response.json())
        .then((data) => {
          props.setMessages(data.Items);
        });
    },
    1000, // fast polling
    //60000, // slow polling
    props.currChat.id
  );

  return (
    <div>
      <div style={{marginLeft:"60px", fontSize:"30px"}}>{props.currChat.name}</div>
      <div
        style={{
          border: "5px solid #1d6063",
          minHeight: "10px",
          margin: "50px",
          marginTop: "5px",
        }}
      >
        {console.log(props.messages)}
        {props.messages.map((message, index) => (
          <Message
            key={index}
            index={index}
            message={message}
            currUser={props.currUser}
          />
        ))}
      </div>
      <NewText sendMessage={props.sendMessage}></NewText>
    </div>
  );
}

function NewText({ sendMessage }) {
  const [messageInput, setMessageInput] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageInput) return;
    sendMessage(messageInput);
    setMessageInput("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "90%", margin: "auto" }}>
      <TextField
        fullWidth
        type="text"
        label="enter your message here"
        className="input"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
    </form>
  );
}