// app/settings/page.tsx
'use client';
import DarkThemeToggle from '@/components/features/DarkThemeToggle';
import { Switch } from '@headlessui/react';
import { useState } from 'react';

export default function SettingsPage() {
//   const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-text-primary mb-8">
          Settings
        </h1>

        <div className="space-y-6">
          {/* Appearance Section */}
          <div className="bg-surface rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Appearance
            </h2>
            <div className="flex items-center justify-between">
                          <span className="text-muted">Dark Mode</span>
                <DarkThemeToggle />
              {/* <Switch
                checked={darkMode}
                onChange={setDarkMode}
                className={`${
                  darkMode ? 'bg-primary' : 'bg-muted/20'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch> */}
            </div>
          </div>

          {/* Account Section */}
          <div className="bg-surface rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Account
            </h2>
            <button className="w-full text-left py-2 text-primary hover:text-primary-dark">
              Change Password
            </button>
            <button className="w-full text-left py-2 text-red-500 hover:text-red-700">
              Delete Account
            </button>
          </div>

          {/* Notifications Section */}
          <div className="bg-surface rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Notifications
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-muted">Email Notifications</span>
              <Switch
                checked={notifications}
                onChange={setNotifications}
                className={`${
                  notifications ? 'bg-primary' : 'bg-muted/20'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
