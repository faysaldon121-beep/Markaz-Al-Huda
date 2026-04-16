// models/PageContent.ts
import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    index: true,
  },
  lang: {
    type: String,
    required: true,
    enum: ['en', 'es', 'de', 'ur', 'hi', 'ru'],
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  metaDescription: String,
  metaKeywords: [String],
  // Add any other fields you need
}, {
  timestamps: true,
});

// Compound index for faster queries
PageContentSchema.index({ slug: 1, lang: 1 }, { unique: true });

export default mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
