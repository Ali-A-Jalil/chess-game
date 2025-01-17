import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults } from '../features/game/gameSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { results, status } = useSelector((state) => state.game);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchResults());
    }
  }, [status, dispatch]);

  return (
    <div className="profile">
      <h1>Your Profile</h1>
      <h2>Game Results</h2>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={index}>{`${result.opponent}: ${result.result}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
