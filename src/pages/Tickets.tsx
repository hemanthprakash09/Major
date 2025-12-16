import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TicketCard } from '@/components/TicketCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ticketTypes } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Users, Globe, IndianRupee, CreditCard, ArrowRight } from 'lucide-react';

const Tickets = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [nationality, setNationality] = useState<'Indian' | 'Foreigner'>('Indian');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [visitDate, setVisitDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const selectedTicketData = ticketTypes.find(t => t.id === selectedTicket);
  const pricePerPerson = selectedTicketData 
    ? (nationality === 'Indian' ? selectedTicketData.priceIndian : selectedTicketData.priceForeigner)
    : 0;
  const childPrice = pricePerPerson * 0.5; // 50% for children
  const totalAmount = (adults * pricePerPerson) + (children * childPrice);

  const handleBooking = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book tickets.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!selectedTicket || !visitDate) {
      toast({
        title: "Incomplete Information",
        description: "Please select a ticket type and visit date.",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking success
    toast({
      title: "Booking Successful! 🎉",
      description: `Your ${selectedTicketData?.name} tickets have been booked for ${visitDate}.`,
    });

    navigate('/my-bookings');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Book Your Adventure
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Choose from our range of ticket options and plan your perfect zoo visit.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Nationality Selection */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Select Your Nationality
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Special pricing available for Indian citizens as per government regulations.
              </p>
              
              <RadioGroup
                value={nationality}
                onValueChange={(value) => setNationality(value as 'Indian' | 'Foreigner')}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="Indian" id="indian" className="peer sr-only" />
                  <Label
                    htmlFor="indian"
                    className="flex flex-col items-center justify-center rounded-xl border-2 border-border p-4 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <span className="text-3xl mb-2">🇮🇳</span>
                    <span className="font-semibold">Indian Citizen</span>
                    <span className="text-xs text-muted-foreground">Discounted rates</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="Foreigner" id="foreigner" className="peer sr-only" />
                  <Label
                    htmlFor="foreigner"
                    className="flex flex-col items-center justify-center rounded-xl border-2 border-border p-4 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <span className="text-3xl mb-2">🌍</span>
                    <span className="font-semibold">Foreign National</span>
                    <span className="text-xs text-muted-foreground">Standard rates</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Ticket Options */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-center mb-8">Choose Your Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {ticketTypes.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  nationality={nationality}
                  isSelected={selectedTicket === ticket.id}
                  onSelect={() => setSelectedTicket(ticket.id)}
                />
              ))}
            </div>
          </div>

          {/* Booking Details */}
          {selectedTicket && (
            <div className="max-w-2xl mx-auto animate-slide-up">
              <div className="bg-card rounded-2xl p-6 shadow-soft mb-8">
                <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Visit Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="date">Select Visit Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="adults" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Adults (12+ years)
                      </Label>
                      <Input
                        id="adults"
                        type="number"
                        min={1}
                        max={20}
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="children">Children (3-12 years)</Label>
                      <Input
                        id="children"
                        type="number"
                        min={0}
                        max={20}
                        value={children}
                        onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">50% discount for children</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  Price Summary
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {selectedTicketData?.name} x {adults} adult(s)
                    </span>
                    <span>₹{adults * pricePerPerson}</span>
                  </div>
                  {children > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {selectedTicketData?.name} x {children} child(ren) (50% off)
                      </span>
                      <span>₹{children * childPrice}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Nationality</span>
                    <span>{nationality}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold">Total Amount</span>
                    <span className="font-display text-2xl font-bold text-primary">₹{totalAmount}</span>
                  </div>
                </div>
                
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="w-full"
                  onClick={handleBooking}
                  disabled={!visitDate}
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Payment
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By proceeding, you agree to our terms and conditions.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tickets;
