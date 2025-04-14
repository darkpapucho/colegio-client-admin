import { useState } from 'react';
import useMercadoPago from '../../../../hooks/useMercadoPago';
import Loader from '../../Loader/Loader';
import { errorHandler } from '../../../../utils/errorHandler';
import { MP_PUBLIC_KEY } from '../../../../var/globals';
import Pagos from '../../../../models/Pagos';
import { updateToken } from '../../../../utils/utils';
// const mercadoPagoBaseUrl = 'https://api.mercadopago.com';
console.log({ MP_PUBLIC_KEY });
declare global {
  interface Window {
    MercadoPago: any;
  }
}
//for production
// const validatePhoneNumber = (number: string) => {
//   return /^9\d{8}$/.test(number); // Peruvian mobile format
// }
export default function Yape() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const { mp, isLoading } = useMercadoPago(MP_PUBLIC_KEY);
  const [loading, setLoading] = useState(false);
  return (
    <>
      {isLoading || (loading && <Loader />)}
      <div>
        <div>
          <label htmlFor="payerPhone">Phone Number</label>
          <input id="form-checkout__payerPhone" name="payerPhone" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.currentTarget.value)} />
        </div>
        <div>
          <label htmlFor="payerOTP">OTP</label>
          <input id="form-checkout__payerOTP" name="payerOTP" type="text" value={otp} onChange={(e) => setOtp(e.currentTarget.value)} />
        </div>
        <div>
          <button type="button" onClick={() => handleYape()}>
            Create YAPE
          </button>
        </div>
      </div>
    </>
  );

  async function handleYape() {
    if (!mp) return;
    const amount: number = 50;
    try {
      const yapeOptions: YapeOptions = {
        amount,
        otp,
        phoneNumber,
        requestId: Date.now().toString(),
      };
      setLoading(true);
      const yape = mp.yape(yapeOptions);
      const yapeToken = await yape.create();
      console.log({ yapeToken });
      const response = await Pagos.nuevoPago({ phone: phoneNumber, email: 'cristhiam@gmail.com', token: yapeToken.id, amount });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      console.log({ response });
    } catch (err) {
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }
}
