import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export function useSectionData<T>(collectionName: string, fallbackData: T[]): T[] {
  const [data, setData] = useState<T[]>(fallbackData);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const snap = await getDocs(collection(db, collectionName));
        if (!snap.empty && isMounted) {
          const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as unknown as T[];
          setData(fetched);
        }
      } catch (error) {
        console.error(`Error fetching ${collectionName} from Firestore, using fallback.`, error);
        // On error (e.g. offline, bad config), we do nothing because `data` is already initialized to `fallbackData`
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [collectionName, fallbackData]);

  return data;
}
