import { useState } from "react";
import "./App.css";

function App() {
  const [inputVal, setInputVal] = useState("random");
  const [quiz, setQuiz] = useState([]);

  async function generateQuiz() {
    const response = await fetch(
      `http://localhost:8080/quiz?topic=${inputVal}`,
    );
    const data = await response.json();
    setQuiz(data);
    console.log(quiz);
  }

  return (
    <div>
      <h1>Quiz Generator</h1>
      Enter any topic to generate quiz:
      <input
        type="text"
        placeholder="Enter your favorite topic"
        value={inputVal}
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
      />
      <button onClick={generateQuiz}>Generate Quiz</button>
      {quiz.map(quiz => (
        <div>
          <h1>{quiz.question}</h1>
          <input type="radio" value={quiz.option1} />
          <input type="text" value={quiz.option2} />
          <input type="text" value={quiz.option3} />
          <input type="text" value={quiz.option4} />
        </div>
      ))}
    </div>
  );
}

export default App;
