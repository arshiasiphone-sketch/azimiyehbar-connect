import { useState, useEffect } from "react";
import { Header, Footer, FloatingContact } from "@/components/layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

// Fallback images if database is empty
const fallbackImages: GalleryImage[] = [
  { id: "1", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600", title: "کامیون باربری کرج", category: "ناوگان" },
  { id: "2", url: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", title: "بسته‌بندی اثاثیه عظیمیه", category: "بسته‌بندی" },
  { id: "3", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600", title: "حمل بار سنگین کرج", category: "پروژه‌ها" },
  { id: "4", url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600", title: "وانت باربری عظیمیه", category: "ناوگان" },
  { id: "5", url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600", title: "تیم باربری کرج", category: "تیم" },
  { id: "6", url: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600", title: "انبار باربری عظیمیه بار", category: "تأسیسات" },
];

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(fallbackImages);
  const [categories, setCategories] = useState<string[]>(["همه", "ناوگان", "بسته‌بندی", "پروژه‌ها", "تیم", "تأسیسات"]);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch gallery from database
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          const images: GalleryImage[] = data.map(item => ({
            id: item.id,
            url: item.image_url,
            title: item.title,
            category: item.category || "سایر"
          }));
          setGalleryImages(images);
          
          // Extract unique categories
          const uniqueCategories = ["همه", ...new Set(images.map(img => img.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredImages = selectedCategory === "همه"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  const currentImageIndex = selectedImage !== null
    ? filteredImages.findIndex((img) => img.id === selectedImage)
    : -1;

  const goToNext = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentImageIndex + 1].id);
    }
  };

  const goToPrev = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(filteredImages[currentImageIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="گالری تصاویر | باربری در کرج - عظیمیه بار 1850"
        description="گالری تصاویر عظیمیه بار - مشاهده نمونه کارهای باربری در کرج، ناوگان حمل بار، بسته‌بندی حرفه‌ای و تیم متخصص باربری در عظیمیه"
        keywords={["گالری باربری کرج", "تصاویر باربری عظیمیه", "ناوگان حمل بار کرج"]}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero pt-32 pb-20">
          <div className="container-custom text-center text-primary-foreground">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">گالری تصاویر باربری کرج</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              نمونه‌ای از پروژه‌ها و خدمات باربری در عظیمیه را مشاهده کنید
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="active:scale-95 transition-transform"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {filteredImages.map((image, index) => (
                <AnimatedSection key={image.id} animation="scale" delay={index * 100}>
                  <div
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(image.id)}
                  >
                    <OptimizedImage
                      src={image.url}
                      alt={`${image.title} - باربری در کرج عظیمیه بار`}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity flex items-end p-3 md:p-4">
                      <div className="text-primary-foreground">
                        <p className="font-semibold text-sm md:text-base">{image.title}</p>
                        <p className="text-xs md:text-sm text-primary-foreground/70">{image.category}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center active:scale-95 transition-transform"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
              
              {selectedImage && (
                <img
                  src={filteredImages.find((img) => img.id === selectedImage)?.url}
                  alt={filteredImages.find((img) => img.id === selectedImage)?.title || "تصویر باربری کرج"}
                  className="w-full rounded-xl"
                  loading="lazy"
                />
              )}

              {currentImageIndex > 0 && (
                <button
                  onClick={goToPrev}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 flex items-center justify-center active:scale-95 transition-transform"
                  aria-label="تصویر قبلی"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {currentImageIndex < filteredImages.length - 1 && (
                <button
                  onClick={goToNext}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 flex items-center justify-center active:scale-95 transition-transform"
                  aria-label="تصویر بعدی"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Gallery;
