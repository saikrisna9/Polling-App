import React, { useContext, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect } from "react";
import PollCard from "../../components/PollCards/PollCard";
import ClipLoader from "react-spinners/ClipLoader";
import EmptyCard from '../../components/cards/EmptyCard';
import { UserContext } from "../../context/UserContext";


// const PAGE_SIZE = 5;

const Bookmarks= () => {
  useUserAuth();

  const navigate = useNavigate();
  const {user} =useContext(UserContext)


  
  // const [VotedPolls,setVotedPolls]=useState([]);
  const[bookmarkedPolls,setBookmarkedPolls] = useState([])

  const [loading, setLoading] = useState(false);

  

  const fetchAllPolls = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.POLLS.GET_BOOKMARKED
      );
      const fetchedPolls = response?.data?.bookmarkedPolls || [];

      if (response.data?.bookmarkedPolls?.length > 0) {
        console.log("API response", response.data);

        setBookmarkedPolls((prevPolls) => {
          const existingIds = new Set(prevPolls.map(p => p._id));
          const uniqueNewPolls = fetchedPolls.filter(p => !existingIds.has(p._id));
          return [...prevPolls, ...uniqueNewPolls];
        });
      }
    } catch (error) {
      console.log("Something went wrong", error.message);
    } finally {
      setLoading(false);
    }
  };

 

 
  
  
  useEffect(() => {
    fetchAllPolls();
    return ()=>{};
  },[]);
    
  return (
    <DashboardLayout activeMenu="Bookmarks">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-medium text-black">Bookmarks</h2>
        {loading && (
  <div className="flex justify-center items-center mt-4">
    <ClipLoader color="#3b82f6" size={35} />
  </div>
)}

       
        {bookmarkedPolls.length === 0 && !loading && (
          <EmptyCard
            //  imgSrc={BOOKMARK_ICON}
            message="You haven't bookmarked any Polls yet. Start bookmarking your favourites to keep track of them!"
            btnText="Explore"
            onClick={() => navigate("/dashboard")}
          />
        )}

       
          {bookmarkedPolls.map((poll) => {
            if (!user.bookmarkedPolls?.includes(poll._id)) return null
            return <PollCard
              key={`dashboard_${poll._id}`}
              pollId={poll._id}
              question={poll.question}
              type={poll.type}
              options={poll.options}
              voters={poll.voters.length || 0}
              responses={poll.responses || []}
              creatorProfileImg={poll.creator.ProfileImgUrl || null}
              creatorName={poll.creator.fullName}
              creatorUsername={poll.creator.username}
              userHasVoted={poll.userHasVoted || false}
              isPollClosed={poll.closed || false}
              createdAt={poll.createdAt || false}
            />
})}
       
      </div>
    </DashboardLayout>
  );
};

export default Bookmarks;


