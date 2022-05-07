import React,{ useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  let [questions ,setQuestions] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(data => {
      setQuestions(data)
    })
  },[])

  const questionLi = questions.map((question)=>{
    return <QuestionItem key={question.id} question={question} />
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionLi}</ul>
    </section>
  );
}

export default QuestionList;
