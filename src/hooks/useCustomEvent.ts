import { useEffect } from 'react';
import { subscribeCustomEvent, unsubscribeCustomEvent } from '../utils/customEvent';

export default function useCustomEvent(eventName: string, listener: any) {
  useEffect(() => {
    subscribeCustomEvent(eventName, listener);
    return () => unsubscribeCustomEvent(eventName, listener);
  }, []);
}
