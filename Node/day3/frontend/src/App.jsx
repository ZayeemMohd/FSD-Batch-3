import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8080/movies", {
      headers: {
        "access-control-allow-origin": "*",
        subscriptiontoken: "secretToken@123",
      },
    });
    return res;
  };

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchData();
      console.log("data fetched", res);
      setTodos(res.data);
    };
    loadData();
  }, []);

  return (
    <>
      <h1>Hello world</h1>
      <ul>
        {todos?.movies?.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
