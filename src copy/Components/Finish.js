import React from 'react'
export default function Finish({points,maxPossiblePoints,highscore,dispatch}) {
  const Percentage=(points/maxPossiblePoints)*100
  let emoji;
  if(Percentage === 100) emoji="🥉"
  if(Percentage >=80 && Percentage < 100) emoji="🎉"
  if(Percentage >=50 && Percentage < 80) emoji="😀"
  if(Percentage >=0 && Percentage < 50) emoji="🙂"
  if(Percentage === 0) emoji="😭"
  return (
    <>
    <p className='result'>
      <span>
      {emoji}
      </span> You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(Percentage)}%)
    </p>
    <p className='highscore'>Highest score: {highscore} points</p>
    <button className='btn btn-ui' onClick={()=>dispatch({type:'restart'})}>Restart Quiz</button>
    </>
  )
}
