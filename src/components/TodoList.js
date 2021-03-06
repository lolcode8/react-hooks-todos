import React, { useContext } from "react";
import Axios from "axios";

import TodosContext from "../Context";

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing to do";

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold">{title}</h1>
      <ul className="list-reset text-black p-0">
        {state.todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center bg-orange-dark border-black border-dashed border-2 my-2 py-4"
          >
            <span
              onDoubleClick={async () => {
                const response = await Axios.patch(
                  `https://hooks-api-pi.now.sh/todos/${todo.id}`,
                  {
                    complete: !todo.complete
                  }
                );
                dispatch({ type: "TOGGLE_TODO", payload: response.data });
              }}
              className={`flex-1 ml-12 cursor-pointer
              ${todo.complete && "line-through text-grey-darkest"}
              `}
            >
              {todo.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: "SET_CURRENT_TODO", payload: todo })
              }
            >
              <img
                src="https://icon.now.sh/edit/0050c5"
                alt="Edit icon"
                className="h-6"
              />
            </button>
            <button
              onClick={async () => {
                await Axios.delete(
                  `https://hooks-api-pi.now.sh/todos/${todo.id}`
                );
                dispatch({ type: "REMOVE_TODO", payload: todo });
              }}
            >
              <img
                src="https://icon.now.sh/delete/8b0000"
                alt="Delete icon"
                className="h-6"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
