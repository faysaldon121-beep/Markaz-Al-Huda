// lib/db/models/Category.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: {
    en: string;
    es: string;
    de: string;
    ur: string;
    hi: string;
    ru: string;
  };
  slug: string;
  description?: string;
  postCount: number;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      en: { type: String, required: true },
      es: { type: String, required: true },
      de: { type: String, required: true },
      ur: { type: String, required: true },
      hi: { type: String, required: true },
      ru: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    postCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
