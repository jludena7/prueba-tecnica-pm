import { ObjectId } from "mongodb";

export interface RequestRateEntity extends Document {
  _id?: ObjectId;

  tipo_de_cambio: string;
  tasa_de_cambio: {
    _id: string;
    purchase_price: number;
    sale_price: number;
  };
  monto_enviar: number;
  monto_recibir: number;
  id_usuario: ObjectId;

  create_at: number;
}
