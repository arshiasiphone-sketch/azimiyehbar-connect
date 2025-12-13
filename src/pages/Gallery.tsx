import { useState } from "react";
import { Header, Footer, FloatingContact } from "@/components/layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

// Sample gallery images (placeholder URLs)
const galleryImages = [
  { id: 1, url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600", title: "کامیون باربری", category: "ناوگان" },
  { id: 2, url: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", title: "بسته‌بندی اثاثیه", category: "بسته‌بندی" },
  { id: 3, url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600", title: "حمل بار سنگین", category: "پروژه‌ها" },
  { id: 4, url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600", title: "وانت باربری", category: "ناوگان" },
  { id: 5, url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600", title: "تیم کاری", category: "تیم" },
  { id: 6, url: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600", title: "انبار", category: "تأسیسات" },
];

const categories = ["همه", "ناوگان", "بسته‌بندی", "پروژه‌ها", "تیم", "تأسیسات"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero pt-32 pb-20">
          <div className="container-custom text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">گالری تصاویر</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              نمونه‌ای از پروژه‌ها و خدمات ما را مشاهده کنید
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-primary-foreground">
                      <p className="font-semibold">{image.title}</p>
                      <p className="text-sm text-primary-foreground/70">{image.category}</p>
                    </div>
                  </div>
                </div>
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
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
              
              {selectedImage && (
                <img
                  src={filteredImages.find((img) => img.id === selectedImage)?.url}
                  alt=""
                  className="w-full rounded-xl"
                />
              )}

              {currentImageIndex > 0 && (
                <button
                  onClick={goToPrev}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 flex items-center justify-center"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {currentImageIndex < filteredImages.length - 1 && (
                <button
                  onClick={goToNext}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 flex items-center justify-center"
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
