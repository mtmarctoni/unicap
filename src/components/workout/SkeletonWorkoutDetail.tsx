// components/Skeleton/SkeletonWorkoutDetail.tsx
export function SkeletonWorkoutDetail() {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        {/* Title */}
        <div className="h-8 bg-background-alt rounded w-1/2 mb-6"></div>
        
        {/* Duration & Difficulty */}
        <div className="space-y-2 mb-8">
          <div className="h-4 bg-background-alt rounded w-1/4"></div>
          <div className="h-4 bg-background-alt rounded w-1/4"></div>
        </div>
  
        {/* Exercises List */}
        <div className="space-y-6">
          <div className="h-6 bg-background-alt rounded w-1/3 mb-4"></div>
          
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-surface p-4 rounded-lg shadow">
              <div className="h-5 bg-background-alt rounded w-1/4 mb-3"></div>
              <div className="h-4 bg-background-alt rounded w-1/5"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  