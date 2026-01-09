import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Image as ImageIcon, X } from "lucide-react";

// Placeholder data - will be replaced with real data from database
const galleryItems = [
  {
    id: 1,
    type: "video",
    title: "Sketch de Noël 2024",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    videoUrl: "#",
    date: "25 Déc 2024",
  },
  {
    id: 2,
    type: "image",
    title: "Danse de louange",
    thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80",
    date: "15 Nov 2024",
  },
  {
    id: 3,
    type: "video",
    title: "Pâques - La Résurrection",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
    videoUrl: "#",
    date: "31 Mar 2024",
  },
  {
    id: 4,
    type: "image",
    title: "Répétition générale",
    thumbnail: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&q=80",
    date: "10 Mar 2024",
  },
  {
    id: 5,
    type: "image",
    title: "Journée des talents",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
    date: "5 Fév 2024",
  },
  {
    id: 6,
    type: "video",
    title: "Nouvel An - Adoration",
    thumbnail: "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?w=600&q=80",
    videoUrl: "#",
    date: "1 Jan 2024",
  },
];

const GallerySection = () => {
  const [filter, setFilter] = useState<"all" | "video" | "image">("all");
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <section id="galerie" className="py-24 bg-gradient-section">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Notre Galerie
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Moments de <span className="text-gradient-gold">Gloire</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Revivez les moments forts de nos prestations à travers photos et vidéos
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={filter === "all" ? "gold" : "outline"}
            onClick={() => setFilter("all")}
          >
            Tout
          </Button>
          <Button
            variant={filter === "video" ? "gold" : "outline"}
            onClick={() => setFilter("video")}
          >
            <Play className="w-4 h-4 mr-1" />
            Vidéos
          </Button>
          <Button
            variant={filter === "image" ? "gold" : "outline"}
            onClick={() => setFilter("image")}
          >
            <ImageIcon className="w-4 h-4 mr-1" />
            Photos
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="group overflow-hidden cursor-pointer shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              onClick={() => setSelectedItem(item)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Play Button for Videos */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-7 h-7 text-primary-foreground ml-1" />
                    </div>
                  </div>
                )}

                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm text-cream/80">{item.date}</p>
                  <h3 className="font-display text-lg font-semibold text-cream">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Voir plus de contenu
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream hover:text-primary transition-colors"
            onClick={() => setSelectedItem(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="max-w-4xl w-full bg-card rounded-lg overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.thumbnail}
              alt={selectedItem.title}
              className="w-full aspect-video object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-primary">{selectedItem.date}</p>
              <h3 className="font-display text-2xl font-bold text-foreground mt-1">
                {selectedItem.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
