import "./App.css";
import React, { useState } from "react";

import { Home } from "../home/home";
import { ToDo } from "../todo/todo";
import { Header } from "../header/header";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export const TodoContext = React.createContext();

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <TodoContext.Provider value={{ todos, setTodos }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/todo" element={<ToDo />} />
          </Routes>
        </BrowserRouter>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
