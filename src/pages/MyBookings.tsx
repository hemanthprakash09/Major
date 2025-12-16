import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { sampleBookings } from '@/lib/data';
import { Calendar, Users, Ticket, Download, ArrowRight } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const MyBookings = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Filter bookings for the current user (demo shows sample bookings)
  const userBookings = sampleBookings;

  const statusColors: Record<string, string> = {
    Confirmed: 'bg-green-500/20 text-green-700 border-green-500/30',
    Pending: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
    Cancelled: 'bg-red-500/20 text-red-700 border-red-500/30',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              My Bookings
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              View and manage all your zoo visit bookings.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {userBookings.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl shadow-soft">
              <span className="text-6xl mb-4 block">🎟️</span>
              <h3 className="font-display text-2xl font-bold mb-2">No Bookings Yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't made any bookings yet. Start planning your zoo adventure!
              </p>
              <Link to="/tickets">
                <Button variant="hero">
                  <Ticket className="w-4 h-4" />
                  Book Tickets
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {userBookings.map((booking) => (
                <div key={booking.id} className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-display text-xl font-bold">{booking.ticketType}</h3>
                        <Badge className={statusColors[booking.status]}>
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl font-bold text-primary">₹{booking.totalAmount}</p>
                      <p className="text-xs text-muted-foreground">{booking.nationality} Rate</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Visit Date</p>
                        <p className="text-sm font-medium">{booking.visitDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Adults</p>
                        <p className="text-sm font-medium">{booking.adults}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Children</p>
                        <p className="text-sm font-medium">{booking.children}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Booked On</p>
                        <p className="text-sm font-medium">{booking.createdAt}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                      Download Ticket
                    </Button>
                    {booking.status === 'Pending' && (
                      <Button variant="destructive" size="sm">
                        Cancel Booking
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MyBookings;
