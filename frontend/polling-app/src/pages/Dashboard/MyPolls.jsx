import React, { useContext, useState } from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import  HeaderWithFilter from "../../components/Layout/HeaderWithFilter"
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useEffect } from 'react'
import PollCard from '../../components/PollCards/PollCard'
import InfiniteScroll from "react-infinite-scroll-component"
import { UserContext } from '../../context/UserContext'
import EmptyCard from '../../components/cards/EmptyCard'
import ClipLoader from 'react-spinners/ClipLoader'
// import CREATE_ICON from "../../assets/images/my-poll-icon.png"

const PAGE_SIZE = 5;

const MyPolls = () => {
  useUserAuth()

  const {user} = useContext(UserContext)
  const navigate = useNavigate();

  const [allPolls,setAllPolls] = useState([]);
  const[stats,setStats] = useState();
  const [page,setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const[loading,setLoading] = useState(false)



 const [filterType,setFilterType] = useState("");

 const fetchAllPolls = async (overridePage =page)=>{
  if(loading || !user?._id) return;
  setLoading (true);

  try {
   
    const response = await axiosInstance.get(`${API_PATHS.POLLS.GET_ALL}?page=${overridePage}&limit=${PAGE_SIZE}&type=${filterType}&creatorId=${user._id}`);


    
    if(response.data?.polls?.length >0){
      console.log("API response", response.data);

      setAllPolls((prevPolls)=> 
        overridePage === 1
       ? response.data.polls
       : [...prevPolls,...response.data.polls]
      );
      setStats(response.data?.stats || []);
      setHasMore(response.data.polls.length === PAGE_SIZE)
    }else{
      setHasMore(false)
    }
  } catch (error) {
    console.log("Something went wrong",error.message)
    
  }finally{
    setLoading(false)

  }
 };


 const loadMorePolls =()=>{
  setPage((prevPage)=>prevPage+1);

 }

 useEffect(()=>{
  setPage(1);
  fetchAllPolls(1);
  return ()=> {}

 },[filterType]);

 useEffect(()=>{
  if(page!== 1){
    fetchAllPolls()
  }
 },[page])


  return (
    <DashboardLayout activeMenu='My polls'>

      <div className="my-5 mx-auto">
        < HeaderWithFilter
        title="My Polls"
        filterType={filterType}
        setFilterType={setFilterType} />


        {allPolls.length === 0 && !loading&&(
          <EmptyCard
          //  imgSrc={CREATE_ICON}
           message="Welcome! You're the first user and there are no polls yet.Start by creating the first Poll"
           btnText="Create Poll"
           onClick={()=> navigate("/create-poll")}
           />
        )}

      
       <InfiniteScroll
       dataLength={allPolls.length}
       next={loadMorePolls}
       hasMore={hasMore}
       loader={
        <div className="flex justify-center items-center mt-4">
          <ClipLoader color="#3b82f6" size={35} />
        </div>
      }
      //  end Message={<p className='info-text'>No More Polls To Display...</p>}
       
       
       >



      {allPolls.map((poll)=>(
        <PollCard
        key={`dashboard_${poll._id}`}
        pollId ={poll._id}
        question = {poll.question}
        type ={poll.type}
        options = {poll.options}
        voters ={poll.voters.length || 0}
        responses = {poll.responses || []}
        creatorProfileImg ={poll.creator.ProfileImgUrl || null}
        creatorName ={poll.creator.fullName}
        creatorUsername = {poll.creator.username}
        userHasVoted = {poll.userHasVoted || false}
        isPollClosed = {poll.closed || false}
        createdAt ={poll.createdAt || false}
        isMyPoll
        />
      
))}








</InfiniteScroll>

      </div>
     
    </DashboardLayout>
  )
}

export default MyPolls

