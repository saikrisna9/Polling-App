import React from 'react'

const PollOptionVoteResult = ({label,optionVotes,totalVotes}) => {

   const progress= totalVotes >0 ?Math.round((optionVotes/totalVotes)*100):0;


  return (
    <div className='w-full bg-slate-200/80 rounded-md h-6 relative mb-3'>
        <div 
        className='bg-sky-900/10 h-6 rounded-md'
        style={{width:`${progress}%`}}
        ></div>
        <span className='absolute inset-0 flex items-center justify-between text-gray-800 text-[12px] font-medium mx-4'>
            {label}
            <span className="text-[11px] text-slate-500">{progress}%</span>

        </span>

       
      
    </div>
  )
}

export default PollOptionVoteResult
