import React from "react";

function QuestionItem({ question , onDeleteQuestion, onUpdateQuestion}) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "DELETE",
    })
    .then(res => res.json())
    .then(() => onDeleteQuestion(question))
  }

  function handleCorrectAnswerChange(event){
    const correctValue = parseInt(event.target.value)
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({correctIndex:correctValue})
    })
    .then(res => res.json())
    .then(updatedAnswer => onUpdateQuestion(updatedAnswer))
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
