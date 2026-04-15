// lib/db/models/BlogPost.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITranslation {
  title: string;
  description: string;
  content: string;
  metaKeywords?: string[];
}

export interface IBlogPost extends Document {
  slug: string;
  translations: {
    en?: ITranslation;
    es?: ITranslation;
    de?: ITranslation;
    ur?: ITranslation;
    hi?: ITranslation;
    ru?: ITranslation;
  };
  author: {
    id: mongoose.Types.ObjectId;
    name: string;
    email: string;
  };
  category: string;
  tags: string[];
  coverImage?: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  publishedAt?: Date;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const TranslationSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  metaKeywords: [{ type: String }],
});

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    translations: {
      en: TranslationSchema,
      es: TranslationSchema,
      de: TranslationSchema,
      ur: TranslationSchema,
      hi: TranslationSchema,
      ru: TranslationSchema,
    },
    author: {
      id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Islamic Studies',
        'Quran',
        'Hadith',
        'Fiqh',
        'History',
        'Education',
        'Community',
        'News',
        'Other',
      ],
    },
    tags: [{ type: String }],
    coverImage: { type: String },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    featured: { type: Boolean, default: false },
    publishedAt: { type: Date },
    viewCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Indexes
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ status: 1, publishedAt: -1 });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ 'author.id': 1 });

// Methods
BlogPostSchema.methods.incrementViews = async function () {
  this.viewCount += 1;
  await this.save();
};

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
