import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine
          text="average"
          value={(good - bad) / (good + neutral + bad)}
        />
        <StatisticLine
          text="positive"
          value={(good / (good + neutral + bad)) * 100 + "%"}
        />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (type) => {
    console.log("click", type);
    switch (type) {
      case "good":
        return setGood(good + 1);
      case "neutral":
        return setNeutral(neutral + 1);
      case "bad":
        return setBad(bad + 1);
      default:
        return;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => handleClick("good")} text="good" />
      <Button onClick={() => handleClick("neutral")} text="neutral" />
      <Button onClick={() => handleClick("bad")} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
