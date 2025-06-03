import React from 'react'
import PollOptionVoteResult from './PollOptionVoteResult'

const ImagePollResult = ({imgUrl,optionVotes,totalVotes}) => {
  return (
    <div>
      <div className="w-full bg-gray-800 flex items-center gap-2 mb-4 rounded-md overflow-hidden">
        <img src={imgUrl} alt=""  className='w-full h-36 object-contain' />
      </div>
      <PollOptionVoteResult optionVotes={optionVotes} totalVotes={totalVotes} />
    </div>
  )
}

export default ImagePollResult
