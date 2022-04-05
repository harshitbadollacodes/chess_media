import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../components/Spinner';
import { followUser } from './profileSlice';

export const FollowButton = ({profileId, userId, list}) => {

    const { token } = useSelector(state => state.user);
    const { profileStatus } = useSelector(state => state.profile);
    const dispatch = useDispatch();


    let isUserFollowing = list?.find(follower => {
        return follower._id === userId;
    });

    function followHandler(profileId, token) {
        dispatch(followUser({profileId, token}));
    };

    return (
        <div>
            {profileId !== userId &&
                <button 
                    className={`mr-2 btn ${isUserFollowing && "bg-d-blue"} `}
                    onClick={() => followHandler(profileId, token)}
                    disabled={token ? false : true}
                >
                    {profileStatus === "load Spinner" && <Spinner/>}
                    { isUserFollowing ? "Unfollow" : "Follow" }
                </button>   
            }
        </div>
        
    )
}
