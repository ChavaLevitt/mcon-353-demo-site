import "./App.css";
import React, { useState } from "react";

import { Home } from "../home/home";
import { ToDo } from "../todo/todo";
import { Header } from "../header/header";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todo" element={<ToDo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
