import { Animal } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Utensils, Info, Sparkles } from 'lucide-react';

interface AnimalCardProps {
  animal: Animal;
}

const statusColors: Record<string, string> = {
  'Least Concern': 'bg-green-500/20 text-green-700 border-green-500/30',
  'Near Threatened': 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
  'Vulnerable': 'bg-orange-500/20 text-orange-700 border-orange-500/30',
  'Endangered': 'bg-red-500/20 text-red-700 border-red-500/30',
  'Critically Endangered': 'bg-red-700/20 text-red-800 border-red-700/30',
};

export function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group cursor-pointer bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2">
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Badge className={`absolute top-3 right-3 ${statusColors[animal.conservationStatus]}`}>
              {animal.conservationStatus}
            </Badge>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">{animal.name}</h3>
                <p className="text-muted-foreground text-sm italic">{animal.species}</p>
              </div>
              <Badge variant="outline" className="bg-muted">
                {animal.category}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2">{animal.description}</p>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{animal.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-64 object-cover"
            />
            <Badge className={`absolute top-3 right-3 ${statusColors[animal.conservationStatus]}`}>
              {animal.conservationStatus}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Species</p>
              <p className="font-semibold">{animal.species}</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Age & Gender</p>
              <p className="font-semibold">{animal.age} years • {animal.gender}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Habitat</p>
                <p className="font-medium">{animal.habitat}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Utensils className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Diet</p>
                <p className="font-medium">{animal.diet}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">About</p>
                <p className="font-medium">{animal.description}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-secondary/30 rounded-lg p-4">
              <Sparkles className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Fun Fact</p>
                <p className="font-medium">{animal.funFact}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
