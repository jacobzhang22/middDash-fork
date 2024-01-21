import { Schema } from 'mongoose';

const OrderSchema = new Schema({
  userEmail: String,
  phone: String,
  roomNumber: String,
  dorm: String,
  cartProducts: [],
});
