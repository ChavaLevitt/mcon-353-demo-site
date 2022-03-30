import "./App.css";
import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "../home/home";
import { ToDo } from "../todo/todo";
import { Header } from "../header/header";
import { TodoProvider } from "./todocontext";
import { Chat } from "../chat/chat";

function App() {
  return (
    <TodoProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todo" element={<ToDo />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </HashRouter>
    </TodoProvider>
  );
}

export default App;
