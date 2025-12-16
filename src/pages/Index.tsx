import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnimalCard } from '@/components/AnimalCard';
import { animals } from '@/lib/data';
import { ArrowRight, Ticket, Users, Leaf, Camera, MapPin, Calendar } from 'lucide-react';

const Index = () => {
  const featuredAnimals = animals.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
              <span className="text-2xl">🌿</span>
              <span className="text-primary-foreground text-sm font-medium">India's Premier Wildlife Experience</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up">
              Discover the Magic of
              <span className="block text-secondary">Wildlife</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Embark on an unforgettable journey through our world-class zoo. 
              Home to over 500 species, educational programs, and conservation efforts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/tickets">
                <Button variant="amber" size="xl" className="w-full sm:w-auto">
                  <Ticket className="w-5 h-5" />
                  Book Tickets Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/animals">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Explore Animals
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {[
                { value: '500+', label: 'Animal Species' },
                { value: '50K+', label: 'Monthly Visitors' },
                { value: '100+', label: 'Acres of Land' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</p>
                  <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Animals */}
        <div className="absolute bottom-10 left-10 text-6xl animate-float hidden lg:block">🐘</div>
        <div className="absolute top-32 right-20 text-5xl animate-float hidden lg:block" style={{ animationDelay: '1s' }}>🦁</div>
        <div className="absolute bottom-32 right-32 text-4xl animate-float hidden lg:block" style={{ animationDelay: '2s' }}>🦚</div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">Why Visit Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience wildlife like never before with our world-class facilities and conservation programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: 'Family Friendly', desc: 'Safe environment for visitors of all ages' },
              { icon: Leaf, title: 'Conservation', desc: 'Supporting wildlife preservation globally' },
              { icon: Camera, title: 'Photo Spots', desc: 'Capture memories at scenic locations' },
              { icon: MapPin, title: 'Guided Tours', desc: 'Expert-led educational experiences' },
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Animals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-2">Meet Our Stars</h2>
              <p className="text-muted-foreground">Get to know some of our most beloved residents.</p>
            </div>
            <Link to="/animals">
              <Button variant="outline" className="mt-4 md:mt-0">
                View All Animals
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready for an Adventure?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Book your tickets today and create memories that last a lifetime. 
              Special rates available for Indian citizens!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tickets">
                <Button variant="amber" size="xl">
                  <Calendar className="w-5 h-5" />
                  Book Now
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Create Account
                </Button>
              </Link>
            </div>

            {/* Pricing Preview */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <p className="text-primary-foreground/70 text-sm mb-1">Indian Citizens</p>
                <p className="font-display text-3xl font-bold text-primary-foreground">From ₹100</p>
                <p className="text-primary-foreground/60 text-xs mt-1">Per person</p>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-left">
                <p className="text-primary-foreground/70 text-sm mb-1">Foreign Nationals</p>
                <p className="font-display text-3xl font-bold text-primary-foreground">From ₹500</p>
                <p className="text-primary-foreground/60 text-xs mt-1">Per person</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
