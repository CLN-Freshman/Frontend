import { ChevronRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  image: string;
  totalLessons: number;
  completedLessons: number;
}

function MyCourses() {
  const courses: Course[] = [
    {
      id: 1,
      title: "React & TypeScript Mastery",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=150&fit=crop",
      totalLessons: 24,
      completedLessons: 22
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=150&fit=crop",
      totalLessons: 18,
      completedLessons: 14
    },
    {
      id: 3,
      title: "JavaScript Advanced Concepts",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=200&h=150&fit=crop",
      totalLessons: 30,
      completedLessons: 18
    }
  ];

  const calculateProgress = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-semibold !text-gray-900 !text-base">
  My Courses
</h2>
<Link 
  to="/courses" 
  className="text-blue-500 text-sm font-medium hover:text-blue-600 transition flex items-center"
>
  View All <ChevronRight className="w-3.5 h-3.5 ml-1" />
</Link>
      </div>

      <div className="space-y-3">
        {courses.map((course, index) => {
          const progress = calculateProgress(course.completedLessons, course.totalLessons);
          
          return (
            <div 
              key={course.id}
              className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex items-center gap-3"
            >
              {/* Course Image */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-800 truncate flex items-center justify-start">
                  {course.title}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {course.completedLessons}/{course.totalLessons} lessons completed
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-0.5">
                    <span>Progress</span>
                    <span className="font-semibold text-gray-700">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

<Link 
  to={`/course/${course.id}`}
  className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors flex-shrink-0"
>
  <ChevronRight className="w-5 h-5 text-blue-500 hover:text-blue-600 transition-colors" />
</Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MyCourses;