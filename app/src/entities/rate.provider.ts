export interface RateDataProvider {
  status: boolean;
  _id: string;
  purchase_price: number;
  sale_price: number;
  purchase_price_comparative: number;
  sale_price_comparative: number;
  purchase_price_paralelo: number;
  sale_price_paralelo: number;
}

export interface ResponseRateProvider {
  error: boolean;
  message: string;
  status: number;
  data: RateDataProvider;
}
