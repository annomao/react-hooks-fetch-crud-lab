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

  function handleDeleteQuestion(deletedQuestion){
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions);
  }

  function handleUpdateQuestion(updatedAnswer){
    const updatedQuestions = questions.map((question)=>{
      if(question.id === updatedAnswer.id){
        return updatedAnswer
      }else{
        return question
      }
    });
    setQuestions(updatedQuestions);
  }

  const questionLi = questions.map((question)=>{
    return <QuestionItem 
    key={question.id} 
    question={question}
    onDeleteQuestion={handleDeleteQuestion}
    onUpdateQuestion={handleUpdateQuestion}
     />
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionLi}</ul>
    </section>
  );
}

export default QuestionList;
