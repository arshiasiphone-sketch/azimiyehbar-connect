import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

const defaultKeywords = [
  "باربری در کرج",
  "باربری در عظیمیه", 
  "باربری کرج",
  "عظیمیه بار",
  "حمل بار کرج",
  "اسباب‌کشی کرج",
  "وانت‌بار کرج",
  "باربری عظیمیه کرج"
];

export function SEOHead({
  title = "باربری در کرج | عظیمیه بار 1850",
  description = "عظیمیه بار 1850 - بهترین خدمات باربری در کرج و باربری در عظیمیه. حمل اثاثیه منزل، باربری بین‌شهری با بیمه کامل.",
  keywords = defaultKeywords,
  canonicalUrl,
  ogImage
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta("description", description);
    updateMeta("keywords", keywords.join(", "));
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    
    if (ogImage) {
      updateMeta("og:image", ogImage, true);
    }

    // Update canonical
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }
  }, [title, description, keywords, canonicalUrl, ogImage]);

  return null;
}
