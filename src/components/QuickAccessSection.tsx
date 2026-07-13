import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  File, 
  Video, 
  HelpCircle, 
  Bookmark, 
  Download, 
  MoreHorizontal,
  Award,
} from 'lucide-react';

interface QuickAccessItem {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  path: string;
}

function QuickAccessSection() {
  const quickAccessItems: QuickAccessItem[] = [
    {
      id: 'notes',
      label: 'Notes',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      path: '/notes'
    },
    {
      id: 'pdfs',
      label: 'PDFs',
      icon: File,
      color: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100',
      path: '/pdfs'
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: Video,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      path: '/videos'
    },
    {
      id: 'quizzes',
      label: 'Quizzes',
      icon: HelpCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
      path: '/quizzes'
    },
    {
      id: 'bookmarks',
      label: 'Bookmarks',
      icon: Bookmark,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 hover:bg-yellow-100',
      path: '/bookmarks'
    },
    {
      id: 'downloads',
      label: 'Downloads',
      icon: Download,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100',
      path: '/downloads'
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: Award,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 hover:bg-teal-100',
      path: '/achievements'
    },

    {
      id: 'more',
      label: 'More',
      icon: MoreHorizontal,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      path: '/more'
    }
  ];

  return (
    <section className="flex flex-col my-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold !text-gray-900 !text-base">
          Quick Access
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {quickAccessItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${item.bgColor} border border-transparent hover:border-gray-200 hover:shadow-md group`}
            >
              <div className={`p-2 rounded-lg ${item.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="text-[10px] font-medium text-gray-600 mt-1.5 text-center leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default QuickAccessSection;