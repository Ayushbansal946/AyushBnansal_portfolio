import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { fallbackProfile } from '../data/fallbackData';

export interface ProfileSettings {
  resumeUrl: string;
  phone: string;
  email: string;
  linkedin: string;
  behance: string;
}

export function useProfileSettings(): ProfileSettings {
  const [data, setData] = useState<ProfileSettings>(() => {
    const cached = localStorage.getItem('cache_profile_settings');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return fallbackProfile;
      }
    }
    return fallbackProfile;
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'profile'));
        if (snap.exists() && isMounted) {
          const fetched = { ...fallbackProfile, ...snap.data() } as ProfileSettings;
          setData(fetched);
          localStorage.setItem('cache_profile_settings', JSON.stringify(fetched));
        }
      } catch (error) {
        console.error('Error fetching profile settings from Firestore', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
}
