import React from 'react'
import Options from './Options'
export default function Questions({question,dispatch,answer}) {
  return (
    <div>
    <h4>{question.question}</h4>
    <div >
    <Options question={question} dispatch={dispatch} answer={answer}/>
    </div>
    </div>
  )
}
