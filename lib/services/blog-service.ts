// lib/services/blog-service.ts
import connectDB from '@/lib/db/mongodb';
import BlogPost, { IBlogPost } from '@/lib/db/models/BlogPost';
import { Language } from '@/lib/utils/language-detection';

export interface BlogPostInput {
  slug: string;
  translations: {
    [key in Language]?: {
      title: string;
      description: string;
      content: string;
      metaKeywords?: string[];
    };
  };
  category: string;
  tags: string[];
  coverImage?: string;
  status?: 'draft' | 'published' | 'archived';
  featured?: boolean;
  authorId: string;
  authorName: string;
  authorEmail: string;
}

export class BlogService {
  // Create a new blog post
  static async createPost(data: BlogPostInput): Promise<IBlogPost> {
    await connectDB();

    const post = await BlogPost.create({
      slug: data.slug,
      translations: data.translations,
      author: {
        id: data.authorId,
        name: data.authorName,
        email: data.authorEmail,
      },
      category: data.category,
      tags: data.tags,
      coverImage: data.coverImage,
      status: data.status || 'draft',
      featured: data.featured || false,
      publishedAt: data.status === 'published' ? new Date() : undefined,
    });

    return post;
  }

  // Update a blog post
  static async updatePost(
    slug: string,
    data: Partial<BlogPostInput>
  ): Promise<IBlogPost | null> {
    await connectDB();

    const updateData: any = { ...data };
    
    if (data.status === 'published' && !updateData.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const post = await BlogPost.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { new: true }
    );

    return post;
  }

  // Get all published posts with pagination
  static async getPublishedPosts(
    language: Language,
    page = 1,
    limit = 10,
    category?: string,
    tag?: string
  ) {
    await connectDB();

    const query: any = {
      status: 'published',
      [`translations.${language}`]: { $exists: true },
    };

    if (category) query.category = category;
    if (tag) query.tags = tag;

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(query),
    ]);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get single post by slug
  static async getPostBySlug(
    slug: string,
    language: Language
  ): Promise<IBlogPost | null> {
    await connectDB();

    const post = await BlogPost.findOne({
      slug,
      status: 'published',
      [`translations.${language}`]: { $exists: true },
    }).lean();

    return post;
  }

  // Get post for admin (all statuses)
  static async getPostBySlugAdmin(slug: string): Promise<IBlogPost | null> {
    await connectDB();
    return await BlogPost.findOne({ slug }).lean();
  }

  // Increment view count
  static async incrementViews(slug: string): Promise<void> {
    await connectDB();
    await BlogPost.findOneAndUpdate({ slug }, { $inc: { viewCount: 1 } });
  }

  // Get featured posts
  static async getFeaturedPosts(language: Language, limit = 5) {
    await connectDB();

    return await BlogPost.find({
      status: 'published',
      featured: true,
      [`translations.${language}`]: { $exists: true },
    })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();
  }

  // Get related posts
  static async getRelatedPosts(
    slug: string,
    language: Language,
    limit = 3
  ): Promise<IBlogPost[]> {
    await connectDB();

    const currentPost = await BlogPost.findOne({ slug }).lean();
    if (!currentPost) return [];

    return await BlogPost.find({
      slug: { $ne: slug },
      status: 'published',
      [`translations.${language}`]: { $exists: true },
      $or: [
        { category: currentPost.category },
        { tags: { $in: currentPost.tags } },
      ],
    })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();
  }

  // Get all posts for admin
  static async getAllPostsAdmin(page = 1, limit = 20) {
    await connectDB();

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      BlogPost.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(),
    ]);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Delete post
  static async deletePost(slug: string): Promise<boolean> {
    await connectDB();
    const result = await BlogPost.deleteOne({ slug });
    return result.deletedCount > 0;
  }

  // Get categories
  static async getCategories() {
    await connectDB();
    
    return await BlogPost.distinct('category', { status: 'published' });
  }

  // Get popular tags
  static async getPopularTags(limit = 20) {
    await connectDB();

    const result = await BlogPost.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);

    return result.map((r) => ({ tag: r._id, count: r.count }));
  }

  // Search posts
  static async searchPosts(query: string, language: Language, limit = 10) {
    await connectDB();

    const searchRegex = new RegExp(query, 'i');

    return await BlogPost.find({
      status: 'published',
      [`translations.${language}`]: { $exists: true },
      $or: [
        { [`translations.${language}.title`]: searchRegex },
        { [`translations.${language}.description`]: searchRegex },
        { tags: searchRegex },
      ],
    })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();
  }
}
