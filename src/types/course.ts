export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  lessons_count: number;
  duration: string;
  rating: number;
  students_enrolled: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  is_published: boolean;
  image_url?: string;
}