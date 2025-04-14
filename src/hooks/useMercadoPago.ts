import { useEffect, useState } from 'react';
import { errorHandler } from '../utils/errorHandler';

export default function useMercadoPago(publicKey: string) {
  const [mp, setMp] = useState<MercadoPagoInstance | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;

    script.onload = () => {
      try {
        const mpInstance = new window.MercadoPago(publicKey);
        setMp(mpInstance);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    script.onerror = () => {
      setError(new Error('failed to load mercado pago sdk'));
      setIsLoading(false);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [publicKey]);
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return { mp, isLoading };
}
