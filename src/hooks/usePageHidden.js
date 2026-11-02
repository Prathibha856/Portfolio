import { useEffect, useState } from 'react';

/**
 * Tracks whether the document is currently hidden (tab in the background).
 * Used to pause looping animations while the page is not visible.
 */
export default function usePageHidden() {
  const [hidden, setHidden] = useState(() => document.hidden);

  useEffect(() => {
    const onChange = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return hidden;
}
