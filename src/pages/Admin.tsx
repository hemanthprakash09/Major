import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { animals, sampleBookings, ticketTypes } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  PawPrint, 
  Ticket, 
  Users, 
  TrendingUp,
  IndianRupee,
  Calendar,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const [searchBookings, setSearchBookings] = useState('');
  const [searchAnimals, setSearchAnimals] = useState('');

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const filteredBookings = sampleBookings.filter(booking =>
    booking.userName.toLowerCase().includes(searchBookings.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchBookings.toLowerCase())
  );

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchAnimals.toLowerCase()) ||
    animal.species.toLowerCase().includes(searchAnimals.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    Confirmed: 'bg-green-500/20 text-green-700 border-green-500/30',
    Pending: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
    Cancelled: 'bg-red-500/20 text-red-700 border-red-500/30',
  };

  const stats = [
    { label: 'Total Bookings', value: '156', icon: Ticket, change: '+12%' },
    { label: 'Revenue Today', value: '₹45,280', icon: IndianRupee, change: '+8%' },
    { label: 'Total Animals', value: animals.length.toString(), icon: PawPrint, change: '+2' },
    { label: 'Visitors Today', value: '324', icon: Users, change: '+15%' },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your zoo operations</p>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4" />
              Add New Animal
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="font-display text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="bg-card shadow-soft p-1">
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="animals" className="flex items-center gap-2">
                <PawPrint className="w-4 h-4" />
                Animals
              </TabsTrigger>
              <TabsTrigger value="tickets" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Ticket Types
              </TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <h2 className="font-display text-xl font-bold">Recent Bookings</h2>
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search bookings..."
                        value={searchBookings}
                        onChange={(e) => setSearchBookings(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 text-sm font-semibold">Booking ID</th>
                        <th className="text-left p-4 text-sm font-semibold">Customer</th>
                        <th className="text-left p-4 text-sm font-semibold">Ticket Type</th>
                        <th className="text-left p-4 text-sm font-semibold">Visit Date</th>
                        <th className="text-left p-4 text-sm font-semibold">Amount</th>
                        <th className="text-left p-4 text-sm font-semibold">Status</th>
                        <th className="text-left p-4 text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
                          <td className="p-4 font-mono text-sm">{booking.id}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{booking.userName}</p>
                              <p className="text-xs text-muted-foreground">{booking.userEmail}</p>
                            </div>
                          </td>
                          <td className="p-4">{booking.ticketType}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              {booking.visitDate}
                            </div>
                          </td>
                          <td className="p-4 font-semibold">₹{booking.totalAmount}</td>
                          <td className="p-4">
                            <Badge className={statusColors[booking.status]}>
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Animals Tab */}
            <TabsContent value="animals">
              <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <h2 className="font-display text-xl font-bold">Animal Registry</h2>
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search animals..."
                        value={searchAnimals}
                        onChange={(e) => setSearchAnimals(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 text-sm font-semibold">Animal</th>
                        <th className="text-left p-4 text-sm font-semibold">Species</th>
                        <th className="text-left p-4 text-sm font-semibold">Category</th>
                        <th className="text-left p-4 text-sm font-semibold">Age</th>
                        <th className="text-left p-4 text-sm font-semibold">Habitat</th>
                        <th className="text-left p-4 text-sm font-semibold">Status</th>
                        <th className="text-left p-4 text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAnimals.map((animal) => (
                        <tr key={animal.id} className="border-b border-border hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={animal.image}
                                alt={animal.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <span className="font-medium">{animal.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm italic">{animal.species}</td>
                          <td className="p-4">
                            <Badge variant="outline">{animal.category}</Badge>
                          </td>
                          <td className="p-4">{animal.age} years</td>
                          <td className="p-4 text-sm">{animal.habitat}</td>
                          <td className="p-4">
                            <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                              Healthy
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Ticket Types Tab */}
            <TabsContent value="tickets">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ticketTypes.map((ticket) => (
                  <div key={ticket.id} className="bg-card rounded-2xl p-6 shadow-soft">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-display text-xl font-bold">{ticket.name}</h3>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{ticket.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm flex items-center gap-2">
                          🇮🇳 Indian
                        </span>
                        <span className="font-bold">₹{ticket.priceIndian}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm flex items-center gap-2">
                          🌍 Foreigner
                        </span>
                        <span className="font-bold">₹{ticket.priceForeigner}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      <p className="font-semibold mb-2">Features:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {ticket.features.slice(0, 3).map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                        {ticket.features.length > 3 && (
                          <li>+{ticket.features.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
