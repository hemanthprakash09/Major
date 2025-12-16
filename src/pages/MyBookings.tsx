import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Booking } from '@/lib/data';
import { fetchBookings } from '@/lib/api';
import { Calendar, Users, Ticket, Download, ArrowRight, Loader2 } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (error) {
        console.error('Failed to load bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userBookings = bookings;

  const statusColors: Record<string, string> = {
    Confirmed: 'bg-green-500/20 text-green-700 border-green-500/30',
    Pending: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
    Cancelled: 'bg-red-500/20 text-red-700 border-red-500/30',
  };

  const handleDownloadTicket = (booking: Booking) => {
    // Generate HTML ticket content
    const ticketHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Zoo Ticket - ${booking.id}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background: #f5f5f5; }
          .ticket { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
          .ticket-header { background: linear-gradient(135deg, #2d5016 0%, #4a7c23 100%); color: white; padding: 30px; text-align: center; }
          .ticket-header h1 { font-size: 28px; margin-bottom: 8px; }
          .ticket-header p { opacity: 0.9; }
          .ticket-body { padding: 30px; }
          .ticket-id { text-align: center; margin-bottom: 24px; }
          .ticket-id span { background: #f0f0f0; padding: 8px 20px; border-radius: 20px; font-family: monospace; font-size: 18px; font-weight: bold; }
          .ticket-details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
          .detail-item { padding: 16px; background: #f9f9f9; border-radius: 12px; }
          .detail-item label { display: block; font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 4px; }
          .detail-item value { display: block; font-size: 16px; font-weight: 600; color: #333; }
          .ticket-type { text-align: center; padding: 20px; background: linear-gradient(135deg, #fff9e6 0%, #fff3cc 100%); border-radius: 12px; margin-bottom: 24px; }
          .ticket-type h2 { font-size: 24px; color: #b8860b; margin-bottom: 4px; }
          .ticket-type .price { font-size: 32px; font-weight: bold; color: #2d5016; }
          .qr-placeholder { text-align: center; padding: 20px; border: 2px dashed #ddd; border-radius: 12px; }
          .qr-placeholder .qr-box { width: 120px; height: 120px; background: #333; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; }
          .footer { text-align: center; padding: 20px; background: #f5f5f5; font-size: 12px; color: #666; }
          .status { display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: 600; }
          .status.Confirmed { background: #d4edda; color: #155724; }
          .status.Pending { background: #fff3cd; color: #856404; }
          @media print { body { padding: 0; background: white; } .ticket { box-shadow: none; } }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="ticket-header">
            <h1>🦁 WildLife Zoo</h1>
            <p>India's Premier Wildlife Experience</p>
          </div>
          <div class="ticket-body">
            <div class="ticket-id">
              <span>${booking.id}</span>
            </div>
            <div class="ticket-type">
              <h2>${booking.ticketType}</h2>
              <p class="price">₹${booking.totalAmount}</p>
              <span class="status ${booking.status}">${booking.status}</span>
            </div>
            <div class="ticket-details">
              <div class="detail-item">
                <label>Visitor Name</label>
                <value>${booking.userName}</value>
              </div>
              <div class="detail-item">
                <label>Visit Date</label>
                <value>${booking.visitDate}</value>
              </div>
              <div class="detail-item">
                <label>Adults</label>
                <value>${booking.adults}</value>
              </div>
              <div class="detail-item">
                <label>Children</label>
                <value>${booking.children}</value>
              </div>
              <div class="detail-item">
                <label>Nationality</label>
                <value>${booking.nationality}</value>
              </div>
              <div class="detail-item">
                <label>Booked On</label>
                <value>${booking.createdAt}</value>
              </div>
            </div>
            <div class="qr-placeholder">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=WILDLIFE-ZOO-TICKET-${booking.id}" alt="QR Code" style="width: 120px; height: 120px; margin: 0 auto 12px; display: block;" />
              <p>Scan this code at the zoo entrance</p>
            </div>
          </div>
          <div class="footer">
            <p>Thank you for choosing WildLife Zoo! Present this ticket at the entrance.</p>
            <p style="margin-top: 8px;">For queries: support@wildlifezoo.com | +91 1800-123-4567</p>
          </div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `;

    // Open in new window and trigger print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(ticketHTML);
      printWindow.document.close();
      toast.success('Ticket opened for printing!');
    } else {
      toast.error('Please allow popups to download ticket');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Loading bookings...</span>
        </div>
      </div>
    );
  }

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
                    <Button variant="outline" size="sm" onClick={() => handleDownloadTicket(booking)}>
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
