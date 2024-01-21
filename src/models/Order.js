import { Schema } from "mongoose";

// eslint-disable-next-line no-unused-vars
const OrderSchema = new Schema({
  userEmail: String,
  phone: String,
  roomNumber: String,
  dorm: String,
  cartProducts: [],
});
