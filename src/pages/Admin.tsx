import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Animal, Booking, TicketType } from '@/lib/data';
import {
  fetchAnimals, fetchBookings, fetchTickets,
  createAnimal, updateAnimal, deleteAnimal,
  updateBooking, deleteBooking
} from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
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
  Eye,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const [searchBookings, setSearchBookings] = useState('');
  const [searchAnimals, setSearchAnimals] = useState('');

  // API data states
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [addAnimalOpen, setAddAnimalOpen] = useState(false);
  const [editAnimalOpen, setEditAnimalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  // New animal form state
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    species: '',
    category: '',
    age: 0,
    gender: 'Male' as 'Male' | 'Female',
    habitat: '',
    diet: '',
    description: '',
    image: '',
    conservationStatus: 'Least Concern' as Animal['conservationStatus'],
    funFact: ''
  });

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [animalsData, bookingsData, ticketsData] = await Promise.all([
          fetchAnimals(),
          fetchBookings(),
          fetchTickets()
        ]);
        setAnimals(animalsData);
        setBookings(bookingsData);
        setTicketTypes(ticketsData);
      } catch (error) {
        console.error('Failed to load data:', error);
        toast.error('Failed to load data. Make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const filteredBookings = bookings.filter(booking =>
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
    { label: 'Total Bookings', value: bookings.length.toString(), icon: Ticket, change: '+12%' },
    { label: 'Revenue Today', value: '₹' + bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString(), icon: IndianRupee, change: '+8%' },
    { label: 'Total Animals', value: animals.length.toString(), icon: PawPrint, change: '+2' },
    { label: 'Visitors Today', value: '324', icon: Users, change: '+15%' },
  ];

  // CRUD Handlers
  const handleAddAnimal = async () => {
    try {
      const created = await createAnimal(newAnimal);
      setAnimals([...animals, created]);
      setAddAnimalOpen(false);
      setNewAnimal({
        name: '', species: '', category: '', age: 0, gender: 'Male',
        habitat: '', diet: '', description: '', image: '',
        conservationStatus: 'Least Concern', funFact: ''
      });
      toast.success('Animal added successfully!');
    } catch (error) {
      toast.error('Failed to add animal');
    }
  };

  const handleUpdateAnimal = async () => {
    if (!selectedAnimal) return;
    try {
      const updated = await updateAnimal(selectedAnimal.id, selectedAnimal);
      setAnimals(animals.map(a => a.id === updated.id ? updated : a));
      setEditAnimalOpen(false);
      setSelectedAnimal(null);
      toast.success('Animal updated successfully!');
    } catch (error) {
      toast.error('Failed to update animal');
    }
  };

  const handleDeleteAnimal = async (id: string) => {
    if (!confirm('Are you sure you want to delete this animal?')) return;
    try {
      await deleteAnimal(id);
      setAnimals(animals.filter(a => a.id !== id));
      toast.success('Animal deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete animal');
    }
  };

  const handleUpdateBookingStatus = async (id: string, status: Booking['status']) => {
    try {
      const updated = await updateBooking(id, { status });
      setBookings(bookings.map(b => b.id === updated.id ? updated : b));
      toast.success(`Booking ${status.toLowerCase()}!`);
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      await deleteBooking(id);
      setBookings(bookings.filter(b => b.id !== id));
      toast.success('Booking deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Loading data...</span>
      </div>
    );
  }

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
            <Dialog open={addAnimalOpen} onOpenChange={setAddAnimalOpen}>
              <DialogTrigger asChild>
                <Button variant="hero">
                  <Plus className="w-4 h-4" />
                  Add New Animal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Animal</DialogTitle>
                  <DialogDescription>Fill in the details for the new animal.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={newAnimal.name} onChange={e => setNewAnimal({ ...newAnimal, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="species">Species</Label>
                      <Input id="species" value={newAnimal.species} onChange={e => setNewAnimal({ ...newAnimal, species: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" value={newAnimal.category} onChange={e => setNewAnimal({ ...newAnimal, category: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" type="number" value={newAnimal.age} onChange={e => setNewAnimal({ ...newAnimal, age: parseInt(e.target.value) || 0 })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <select id="gender" className="w-full p-2 border rounded-md" value={newAnimal.gender} onChange={e => setNewAnimal({ ...newAnimal, gender: e.target.value as 'Male' | 'Female' })}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="conservation">Conservation Status</Label>
                      <select id="conservation" className="w-full p-2 border rounded-md" value={newAnimal.conservationStatus} onChange={e => setNewAnimal({ ...newAnimal, conservationStatus: e.target.value as Animal['conservationStatus'] })}>
                        <option value="Least Concern">Least Concern</option>
                        <option value="Near Threatened">Near Threatened</option>
                        <option value="Vulnerable">Vulnerable</option>
                        <option value="Endangered">Endangered</option>
                        <option value="Critically Endangered">Critically Endangered</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="habitat">Habitat</Label>
                    <Input id="habitat" value={newAnimal.habitat} onChange={e => setNewAnimal({ ...newAnimal, habitat: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diet">Diet</Label>
                    <Input id="diet" value={newAnimal.diet} onChange={e => setNewAnimal({ ...newAnimal, diet: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" value={newAnimal.image} onChange={e => setNewAnimal({ ...newAnimal, image: e.target.value })} placeholder="https://..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea id="description" className="w-full p-2 border rounded-md min-h-[80px]" value={newAnimal.description} onChange={e => setNewAnimal({ ...newAnimal, description: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="funFact">Fun Fact</Label>
                    <Input id="funFact" value={newAnimal.funFact} onChange={e => setNewAnimal({ ...newAnimal, funFact: e.target.value })} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddAnimalOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddAnimal}>Add Animal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                            <div className="flex gap-1">
                              {booking.status === 'Pending' && (
                                <Button variant="ghost" size="sm" onClick={() => handleUpdateBookingStatus(booking.id, 'Confirmed')}>
                                  Confirm
                                </Button>
                              )}
                              <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteBooking(booking.id)}>
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
                              <Button variant="ghost" size="icon" onClick={() => { setSelectedAnimal(animal); setEditAnimalOpen(true); }}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteAnimal(animal.id)}>
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

      {/* Edit Animal Dialog */}
      <Dialog open={editAnimalOpen} onOpenChange={setEditAnimalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Animal</DialogTitle>
            <DialogDescription>Update the animal details.</DialogDescription>
          </DialogHeader>
          {selectedAnimal && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input id="edit-name" value={selectedAnimal.name} onChange={e => setSelectedAnimal({ ...selectedAnimal, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-species">Species</Label>
                  <Input id="edit-species" value={selectedAnimal.species} onChange={e => setSelectedAnimal({ ...selectedAnimal, species: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Input id="edit-category" value={selectedAnimal.category} onChange={e => setSelectedAnimal({ ...selectedAnimal, category: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-age">Age</Label>
                  <Input id="edit-age" type="number" value={selectedAnimal.age} onChange={e => setSelectedAnimal({ ...selectedAnimal, age: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-habitat">Habitat</Label>
                <Input id="edit-habitat" value={selectedAnimal.habitat} onChange={e => setSelectedAnimal({ ...selectedAnimal, habitat: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-diet">Diet</Label>
                <Input id="edit-diet" value={selectedAnimal.diet} onChange={e => setSelectedAnimal({ ...selectedAnimal, diet: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input id="edit-image" value={selectedAnimal.image} onChange={e => setSelectedAnimal({ ...selectedAnimal, image: e.target.value })} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditAnimalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateAnimal}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
