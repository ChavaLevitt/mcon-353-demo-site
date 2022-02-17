import "./App.css";
import React, { useState } from "react";

import { Home } from "../home/home";
import { ToDo } from "../todo/todo";

function App() {
  return (
    <div>
      {/*<Home />*/}
      <ToDo />
    </div>
  );
}

export default App;
