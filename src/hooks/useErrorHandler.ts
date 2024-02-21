import { useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function useErrorHandler({ isError, error }: { isError: boolean; error: unknown }) {
  useEffect(() => {
    if (error != null) {
      errorHandler(error);
    }
  }, [isError]);
}
