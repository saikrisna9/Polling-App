import React from 'react'
import CharAvatar from "../cards/CharAvatar"

const OpenEndedPollResponse = ({profileImgUrl,userFullName,response,createdAt}) => {
  return <div className="mb-8 ml-3">
    <div className="flex gap-3">
        {profileImgUrl ?(
            <img src={profileImgUrl} alt="" className='w-8 h-8 rounded-full' />
        ):(
            <CharAvatar
            fullName={userFullName} 
            style='w-8 h-8 text-[10px] bg-sky-800/40'/>
        )}

        <p className="text-[13px] text-black">
            {userFullName}{" "}
            <span className="mx-1 text-[10px] text-slate-500">.</span>
            <span className="text-[10px] text-slate-500">{createdAt}</span>
        </p>
    </div>
    <p className="text-xs text-slate-700 -mt-2 ml-[44px]">{response}</p>
  </div>
}

export default OpenEndedPollResponse
