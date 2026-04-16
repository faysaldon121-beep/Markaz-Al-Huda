// lib/getPageContent.ts
import  connectDB from '@/lib/db/mongodb';
import PageContent from '@/models/PageContent';

export async function getPageContent(slug: string, lang: string = 'en') {
  try {
    await connectDB();
    
    const content = await PageContent.findOne({ 
      slug, 
      lang 
    }).lean();
    
    // Fallback to English if content not found in requested language
    if (!content) {
      const fallbackContent = await PageContent.findOne({ 
        slug, 
        lang: 'en' 
      }).lean();
      
      return fallbackContent;
    }
    
    return content;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return null;
  }
}
