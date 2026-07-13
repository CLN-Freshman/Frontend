import { Link } from 'react-router-dom';
import Header from '@/components/header';

function Courses() {
  return (
    <>
      <Header firstName="User" />
      <div className="flex items-center justify-center min-h-[calc(100vh-180px)] p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
          <p className="text-gray-500 mt-2">Your learning journey starts here</p>
          <Link to="/" className="text-blue-500 mt-4 inline-block">Back to Home</Link>
        </div>
      </div>
    </>
  );
}

export default Courses;