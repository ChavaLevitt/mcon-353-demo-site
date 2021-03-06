import { render, screen } from "@testing-library/react";
import { TodoProvider } from "../app/todocontext";
import { ToDo } from "./todo";

describe("Todo component", () => {
  test("When a task title is typed into the input box and the 'add' button is clicked, a new todo item is added to the list", () => {
    render(
      <TodoProvider>
        <ToDo />
      </TodoProvider>
    );

    const inputEl = screen.getByPlaceholderText("enter a todo");
    console.log(inputEl);
  });
});
