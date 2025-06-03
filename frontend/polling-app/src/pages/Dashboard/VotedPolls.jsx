import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import PollCard from "../../components/PollCards/PollCard";
import EmptyCard from '../../components/cards/EmptyCard';

const VotedPolls = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [votedPolls, setVotedPolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPolls = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.POLLS.VOTED_POLLS);
      if (response.data?.polls?.length > 0) {
        setVotedPolls(response.data.polls);
      }
    } catch (error) {
      console.log("Something went wrong", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPolls();
  }, []);

  return (
    <DashboardLayout activeMenu="Voted Polls">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-medium text-black">Voted Polls</h2>

        {/* Spinner while loading */}
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Show empty card if no polls and not loading */}
        {votedPolls.length === 0 && !loading && (
          <EmptyCard
            message="You have not voted on any polls yet! Start exploring and share your opinion by voting on polls"
            btnText="Explore"
            onClick={() => navigate("/dashboard")}
          />
        )}

        {/* Render poll cards */}
        {!loading && votedPolls.map((poll) => (
          <PollCard
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
        ))}
      </div>
    </DashboardLayout>
  );
};

export default VotedPolls;
