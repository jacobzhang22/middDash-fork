import mongoose, { Schema, model, models } from 'mongoose';

const MenuItemsPage = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId, required: false },
    basePrice: { type: Number },
  },
  { timestamps: true },
);

const MenuItem = models?.MenuItem || model('MenuItem', MenuItemsPage);

export default MenuItem;
