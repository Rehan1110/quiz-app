import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from './Error'
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Timer from "./Timer";
import Footer from "./Footer";
const initialstate={
questions:[],
index:0,
status:'loading',
answer:null,
points:0,
highscore:0,
secondsRemaining:null,
}

function reducer(state,action){
  const SECS_PER_QUESTION=30
switch(action.type){
  case 'dataRecieved':
    return {
      ...state,
      questions:action.payload,
      status:'ready'
    }
    case 'dataFailed':
      return {
        ...state,
        status:'error'
      }
      case 'start':
        return {
          ...state,
          status:'active',
          secondsRemaining:state.questions.length * SECS_PER_QUESTION
        }
        case 'newAnswer':
          const question =state.questions.at(state.index)
          return {
            ...state,
            answer:action.payload,
            points:action.payload === question.correctOption ? state.points +question.points :state.points,
          }
          case 'nextQuestion':
            return{
              ...state,
              index:state.index +1,
              answer:null,
            }
            case 'finished':
              return {
                ...state,
                status:"Finished",
                highscore:state.points > state.highscore ? state.points :state.highscore
              }
              case 'restart':
                return{
                  ...initialstate,
                  questions:state.questions,
                  status:"ready"
                }
                case 'tick':
                  return{
                    ...state,
                    secondsRemaining:state.secondsRemaining-1,
                    status:state.secondsRemaining===0 ? 'Finished':state.status,
                  }
    default:throw new Error ("Something went wrong")
}

}
function App() {

  const [{questions,status,index,answer,points,highscore,secondsRemaining},dispatch]=useReducer(reducer,initialstate)
  const numQuestions=questions.length
  const maxPossiblePoints=questions.reduce((prev,cur)=>prev + cur.points,0)
useEffect(function(){
fetch("http://localhost:9000/questions")
.then((res)=>res.json())
.then((data)=>dispatch({type:'dataRecieved',payload:data}))
.catch((err)=>dispatch({type:'dataFailed'}))
},[])
  
  return (
    <div>
   <Header/>
   <Main>
  {status==="loading" && <Loader/>}
  {status ==='error' && <Error/>}
  {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
  {status === 'active' &&( 
    <>
    <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
  <Questions question={questions[index]} dispatch={dispatch} answer={answer}/>
  <Footer>
  <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
  <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index}/>
  </Footer>
  </>)}
  {
    status==="Finished" && 
    <Finish points={points} 
    maxPossiblePoints={maxPossiblePoints} 
    highscore={highscore}
    dispatch={dispatch}
    />
  }
  
   </Main>
    </div>
  );
}

export default App;
