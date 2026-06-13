import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
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
    let isMounted = true;

    const fetchData = async () => {
      try {
        const snap = await getDocs(collection(db, collectionName));
        if (!snap.empty && isMounted) {
          let fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
          
          // Sort items by num if they have it
          fetched.sort((a, b) => {
             if (a.num && b.num) return a.num.localeCompare(b.num);
             return 0;
          });

          setData(fetched);
          localStorage.setItem(`cache_${collectionName}`, JSON.stringify(fetched));
        } else if (snap.empty && isMounted && data.length === 0) {
           setData(fallbackData);
        }
      } catch (error) {
        console.error(`Error fetching ${collectionName} from Firestore, using fallback.`, error);
        if (isMounted && data.length === 0) {
          setData(fallbackData);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [collectionName]);

  return data;
}
