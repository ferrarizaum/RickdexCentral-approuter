"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

interface Todo {
  id: number;
  userId: number;
  title: string;
}

type GroupedTodos = Record<number, Todo[]>;

export default function Todos() {
  const [groupedTodos, setGroupedTodos] = useState<GroupedTodos>({});

  useEffect(() => {
    fetch("/api/comments")
      .then((response) => response.json())
      .then((data) => {
        const grouped = groupTodosByUserId(data);
        setGroupedTodos(grouped);
      });
  }, []);

  const groupTodosByUserId = (todos: Todo[]): GroupedTodos => {
    return todos.reduce((acc, todo) => {
      if (!acc[todo.userId]) {
        acc[todo.userId] = [];
      }
      acc[todo.userId].push(todo);
      return acc;
    }, {} as GroupedTodos);
  };
  console.log(groupedTodos);
  return (
    <main>
      <Sidebar />
      {Object.entries(groupedTodos).map(([userId, todos]) => (
        <React.Fragment key={parseInt(userId)}>
          <h2>User ID: {userId}</h2>
          {todos.map((todo: Todo) => (
            <div key={todo.id} style={{ margin: 20 }}>
              <p>{todo.title}</p>
            </div>
          ))}
        </React.Fragment>
      ))}
    </main>
  );
}
