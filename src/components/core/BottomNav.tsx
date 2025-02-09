// components/BottomNav.tsx
'use client';
import { usePathname, useRouter } from 'next/navigation';
import { TrophyIcon, HandRaisedIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { HandRaisedIcon as HandRaisedSolid, TrophyIcon as TrophySolid, Cog6ToothIcon as CogSolid } from '@heroicons/react/24/solid';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    { 
      path: '/exercises',
      icon: HandRaisedIcon,
      activeIcon: HandRaisedSolid,
      label: 'Exercises'
    },
    { 
      path: '/workouts',
      icon: TrophyIcon,
      activeIcon: TrophySolid,
      label: 'Workouts'
    },
    { 
      path: '/settings',
      icon: Cog6ToothIcon,
      activeIcon: CogSolid,
      label: 'Settings'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-muted/20 z-20">
      <div className="max-w-2xl mx-auto px-16">
        <div className="flex justify-between items-center py-3">
          {routes.map((route) => {
            const isActive = pathname === route.path;
            const Icon = isActive ? route.activeIcon : route.icon;
            
            return (
              <button
                key={route.path}
                onClick={() => router.push(route.path)}
                className={`flex flex-col items-center px-4 py-2 rounded-xl transition-colors ${
                  isActive ? 'text-primary' : 'text-muted hover:text-primary/80'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium">{route.label}</span>
                {isActive && (
                  <div className="w-1 h-1 bg-primary rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
