import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export function useSectionData<T>(collectionName: string, fallbackData: T[]): T[] {
  const [data, setData] = useState<T[]>(() => {
    const cached = localStorage.getItem(`cache_${collectionName}`);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return [];
      }
    }
    // We intentionally do not use fallbackData as the initial state here anymore.
    // If we did, returning visitors would see a "flash" of the old hardcoded data 
    // before the live Firebase data loads. 
    return []; 
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, collectionName), (snap) => {
      if (!snap.empty) {
        let fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
        
        // Sort items by num if they have it
        fetched.sort((a, b) => {
           if (a.num && b.num) return a.num.localeCompare(b.num);
           return 0;
        });

        setData(fetched);
        localStorage.setItem(`cache_${collectionName}`, JSON.stringify(fetched));
      } else if (snap.empty && data.length === 0) {
         setData(fallbackData);
      }
    }, (error) => {
      console.error(`Error fetching ${collectionName} from Firestore, using fallback.`, error);
      if (data.length === 0) {
        setData(fallbackData);
      }
    });

    return () => unsubscribe();
  }, [collectionName]);

  return data;
}
