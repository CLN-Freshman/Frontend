import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  image_url: string;
  price: number;
  created_at: string;
}

function CourseDetail() {
  const { id } = useParams<{ id: string }>();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
  return <div>Loading...</div>;
}

if (!course) {
  return <div>Course not found.</div>;
}

return (
  <div className="p-6">
    <h1>{course.title}</h1>
  </div>
);}

export default CourseDetail;