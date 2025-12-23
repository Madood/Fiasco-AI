// contexts/ProfileContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProfileId, PROFILES, UserProfile } from '../types/profile';

interface ProfileContextType {
  profile: UserProfile | null;
  setProfile: (profileId: ProfileId) => void;
  getProfile: () => UserProfile | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);

  const setProfile = (id: ProfileId) => {
    const newProfile = PROFILES[id];
    setProfileState(newProfile);
  };

  const getProfile = () => {
    return profile;
  };

  const value = {
    profile,
    setProfile,
    getProfile,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}