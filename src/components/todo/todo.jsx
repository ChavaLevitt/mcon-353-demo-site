import React from "react";
import { Grid, Box, IconButton, Checkbox, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Todo(props) {
  return (
    <div
      className="todo"
      style={{ textDecoration: props.todo.isCompleted ? "line-through" : "" }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <div>
              <Checkbox
                onClick={() => props.completeTodo(props.index)}
                checked={props.todo.isCompleted ? true : false}
                color={"default"}
              />
              {props.todo.text}
            </div>
          </Grid>
          <Grid item xs={2}>
            <div>
              <IconButton
                onClick={() => props.removeTodo(props.index)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [listItemInput, setlistItemInput] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!listItemInput) return;
    addTodo(listItemInput);
    setlistItemInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        type="text"
        label="enter a todo"
        className="input"
        value={listItemInput}
        onChange={(e) => setlistItemInput(e.target.value)}
      />
    </form>
  );
}

export const ToDo = () => {
  const [todos, setTodos] = React.useState([]); 

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos); 
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted =
      newTodos[index].isCompleted == true ? false : true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div
      className="app"
      style={{ width: "30%", margin: "auto", padding: "20px" }}
    >
      <div className="todo-list">
        <div style={{ fontSize: "30px", color: "#1d6063", padding: "10px" }}>
          My ToDo List
        </div>
        <TodoForm addTodo={addTodo} />
        <br />
        <div
          style={{
            border: "5px solid #1d6063",
            borderRadius: "2%",
            minHeight: "10px",
          }}
        >
          {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
