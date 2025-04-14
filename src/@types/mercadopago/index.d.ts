interface YapeOptions {
  amount: number;
  otp: string;
  requestId: string;
  amount: string;
  phoneNumber: string;
  description?: string;
  paymentMethodId?: string;
  additionalInfo?: Record<string, unknown>;
}

interface YapeInstance {
  create(): Promise<{
    id: string;
    status: string;
    [key: string]: unknown;
  }>;
}

interface MercadoPagoInstance {
  yape(options: YapeOptions): YapeInstance;
  // Add other methods you might use
  checkout: (options: any) => any;
}

declare global {
  interface Window {
    MercadoPago: {
      new (
        publicKey: string,
        options?: {
          locale?: string;
          advancedFraudPrevention?: boolean;
        },
      ): MercadoPagoInstance;
    };
  }
}
