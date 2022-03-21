import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../home/home";
import { ToDo } from "../todo/todo";
import { Header } from "../header/header";
import { TodoProvider } from "./todocontext";
import { Chat } from "../chat/chat";

function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todo" element={<ToDo />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}

export default App;
