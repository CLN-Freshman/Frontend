import { Link } from 'react-router-dom';

function Leaderboard() {
  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-180px)] p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold !text-gray-800">Leaderboard</h1>
          <p className="text-gray-500 mt-2">See how you rank among peers</p>
          <Link to="/" className="text-blue-500 mt-4 inline-block">Back to Home</Link>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;