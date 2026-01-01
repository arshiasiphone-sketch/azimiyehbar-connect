import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  type?: "website" | "article";
}

const defaultKeywords = [
  "باربری در کرج",
  "باربری کرج",
  "باربری در عظیمیه",
  "باربری در مهرشهر",
  "باربری در گوهردشت",
  "عظیمیه بار",
  "حمل بار کرج",
  "اسباب‌کشی کرج",
  "وانت‌بار کرج",
  "باربری عظیمیه کرج",
  "حمل اثاثیه کرج",
];

export function SEOHead({
  title = "باربری در کرج | عظیمیه بار 1850 - باربری در عظیمیه",
  description = "عظیمیه بار 1850 - بهترین خدمات باربری در کرج، باربری در عظیمیه، مهرشهر و گوهردشت. حمل اثاثیه منزل، باربری بین‌شهری با بیمه کامل. تماس: 1850",
  keywords = defaultKeywords,
  canonicalUrl,
  ogImage = "/og-image.jpg",
  type = "website",
}: SEOHeadProps) {
  const fullUrl = canonicalUrl || "https://azimiyabar.ir";

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="IR-06" />
      <meta name="geo.placename" content="کرج، البرز، ایران" />
      <meta name="geo.position" content="35.8400;50.9391" />
      <meta name="ICBM" content="35.8400, 50.9391" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:site_name" content="عظیمیه بار کرج" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
      
      {/* JSON-LD LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://azimiyabar.ir",
          name: "عظیمیه بار 1850",
          alternateName: ["باربری در کرج", "باربری کرج", "باربری عظیمیه"],
          description: "بهترین خدمات باربری در کرج، عظیمیه، مهرشهر و گوهردشت - حمل اثاثیه، باربری بین‌شهری و داخل شهری با بیمه کامل",
          telephone: "1850",
          url: "https://azimiyabar.ir",
          image: "https://azimiyabar.ir/og-image.jpg",
          priceRange: "$$",
          currenciesAccepted: "IRR",
          paymentAccepted: "Cash, Card",
          areaServed: [
            { "@type": "City", name: "کرج" },
            { "@type": "Place", name: "عظیمیه" },
            { "@type": "Place", name: "مهرشهر" },
            { "@type": "Place", name: "گوهردشت" },
            { "@type": "Place", name: "فردیس" },
            { "@type": "Place", name: "شهریار" },
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "عظیمیه",
            addressLocality: "کرج",
            addressRegion: "البرز",
            postalCode: "3149713731",
            addressCountry: "IR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "35.8400",
            longitude: "50.9391",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "08:00",
              closes: "22:00",
            },
          ],
          sameAs: [
            "https://instagram.com/azimiyabar",
            "https://t.me/azimiyabar",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+981850",
            contactType: "customer service",
            areaServed: "IR",
            availableLanguage: "Persian",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "خدمات باربری",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "باربری بین‌شهری" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "باربری داخل شهری کرج" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "حمل اثاثیه منزل" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "بسته‌بندی حرفه‌ای" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "وانت‌بار کرج" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "کامیونت‌بار" } },
            ],
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "5000",
            bestRating: "5",
            worstRating: "1",
          },
        })}
      </script>
    </Helmet>
  );
}
