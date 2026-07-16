import { ChevronLeft } from "lucide-react";

interface ProfileHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
}

function ProfileHeader({
  title = "Profile",
  subtitle = "Manage your account",
  onBack,
}: ProfileHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="mx-auto flex h-10 max-w-4xl items-center px-3">
        {onBack && (
          <button 
            onClick={onBack}  // ← Add this line
            className="mr-1.5 flex h-7 w-7 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
        )}

        <div className="flex items-center gap-2">
          <h1 className="!text-lg font-semibold !text-slate-800 leading-tight">
            {title}
          </h1>
          <span className="text-[10px] text-slate-400">•</span>
          <p className="text-[10px] text-slate-500 leading-tight">
            {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;