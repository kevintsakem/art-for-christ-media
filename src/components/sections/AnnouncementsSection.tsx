import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

// Placeholder data - will be replaced with real data from database
const announcements = [
  {
    id: 1,
    title: "Grande Célébration de Pâques",
    description:
      "Rejoignez-nous pour une prestation spéciale mêlant sketches et danses pour célébrer la résurrection de notre Seigneur.",
    date: "20 Avril 2025",
    time: "10h00",
    location: "Temple MEEC Centre",
    category: "Événement",
    featured: true,
  },
  {
    id: 2,
    title: "Auditions Nouveaux Membres",
    description:
      "Vous avez un talent artistique et souhaitez glorifier Dieu ? Venez passer les auditions pour rejoindre notre équipe !",
    date: "15 Février 2025",
    time: "14h00",
    location: "Salle de répétition",
    category: "Audition",
    featured: false,
  },
  {
    id: 3,
    title: "Répétition Générale",
    description:
      "Rappel à tous les membres : répétition générale obligatoire pour préparer la prestation de Pâques.",
    date: "13 Avril 2025",
    time: "16h00",
    location: "Temple MEEC Centre",
    category: "Répétition",
    featured: false,
  },
];

const AnnouncementsSection = () => {
  return (
    <section id="annonces" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Annonces
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Restez <span className="text-gradient-gold">Informés</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Découvrez nos prochains événements et annonces importantes
          </p>
        </div>

        {/* Featured Announcement */}
        {announcements
          .filter((a) => a.featured)
          .map((announcement) => (
            <Card
              key={announcement.id}
              className="mb-8 overflow-hidden border-primary/20 shadow-elevated bg-gradient-to-r from-card to-muted"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-gradient-gold text-primary-foreground text-xs font-semibold">
                    À la une
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                    {announcement.category}
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {announcement.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-6 max-w-3xl">
                  {announcement.description}
                </p>
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {announcement.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    {announcement.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {announcement.location}
                  </div>
                </div>
                <Button variant="gold">
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}

        {/* Other Announcements */}
        <div className="grid md:grid-cols-2 gap-6">
          {announcements
            .filter((a) => !a.featured)
            .map((announcement) => (
              <Card
                key={announcement.id}
                className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                      {announcement.category}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {announcement.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {announcement.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      {announcement.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {announcement.time}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
