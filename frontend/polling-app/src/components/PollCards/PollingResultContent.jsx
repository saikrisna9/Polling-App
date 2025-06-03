import React from 'react'
import PollOptionVoteResult from './PollOptionVoteResult';
import ImagePollResult from './ImagePollResult';
import OpenEndedPollResponse from './OpenEndedPollResponse';
import moment from "moment"

const PollingResultContent = ({type,options,voters,responses}) => {
 
   switch(type){
    case "single-choice":
    case "yes/no":
    case "rating":
      return(
        <>
        {options.map((option,index)=>(
          <PollOptionVoteResult
          key={option._id}
          label={`${option.optionText}${type === "rating" ? "Star":""}`}
          optionVotes={option.votes}
          totalVotes={voters ||0}
          />
        ))}
        </>
      );
    case "image-based":
        return(
          <div className="grid grid-cols-2 gap-4">
            {options.map((option,index)=>(
              < ImagePollResult 
                key={option._id}
                imgUrl = {option.optionText|| ""}
                optionVotes ={option.votes}
                totalVotes ={voters || 0}
                />
            ))}
          </div>
        )
    case "open-ended":
      return responses.map((response)=>{
        return (
          <OpenEndedPollResponse 
          key={response._id}
          profileImgUrl={response.voterId?.profileImgUrl}
          userFullName = {response.voterId?.fullName || "Anonymous"}
          response = {response.responseText || ""}
          createdAt = {
            response.createdAt ? moment (response.createdAt).fromNow():""
          }
          
          />
        )
      })
      default:
        return null;
   }
  
 
 
 
  // return (
  //   <div>
  //     Polling Result Content
  //   </div>
  // )
}

export default PollingResultContent
