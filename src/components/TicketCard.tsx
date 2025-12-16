import { TicketType } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Check, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TicketCardProps {
  ticket: TicketType;
  nationality: 'Indian' | 'Foreigner';
  isSelected: boolean;
  onSelect: () => void;
}

export function TicketCard({ ticket, nationality, isSelected, onSelect }: TicketCardProps) {
  const price = nationality === 'Indian' ? ticket.priceIndian : ticket.priceForeigner;
  const isPremium = ticket.id === 'premium';
  const isVIP = ticket.id === 'vip';

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-300 cursor-pointer",
        isSelected
          ? "bg-primary text-primary-foreground shadow-card scale-105"
          : "bg-card shadow-soft hover:shadow-card",
        isPremium && !isSelected && "border-2 border-secondary",
        isVIP && !isSelected && "border-2 border-amber"
      )}
      onClick={onSelect}
    >
      {isPremium && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full">
            POPULAR
          </span>
        </div>
      )}
      
      {isVIP && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-amber text-foreground text-xs font-bold px-3 py-1 rounded-full">
            BEST VALUE
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
          isSelected ? "bg-primary-foreground/20" : "bg-primary/10"
        )}>
          <Ticket className={cn("w-8 h-8", isSelected ? "text-primary-foreground" : "text-primary")} />
        </div>
        
        <h3 className="font-display text-xl font-bold mb-2">{ticket.name}</h3>
        <p className={cn(
          "text-sm mb-4",
          isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
        )}>
          {ticket.description}
        </p>
        
        <div className="mb-2">
          <span className="font-display text-4xl font-bold">₹{price}</span>
          <span className={cn(
            "text-sm ml-1",
            isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            /person
          </span>
        </div>
        
        <p className={cn(
          "text-xs",
          isSelected ? "text-primary-foreground/60" : "text-muted-foreground"
        )}>
          {nationality} Citizen Rate
        </p>
      </div>

      <ul className="space-y-3 mb-6">
        {ticket.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center",
              isSelected ? "bg-primary-foreground/20" : "bg-primary/10"
            )}>
              <Check className={cn("w-3 h-3", isSelected ? "text-primary-foreground" : "text-primary")} />
            </div>
            <span className={isSelected ? "text-primary-foreground/90" : ""}>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={isSelected ? "secondary" : "hero"}
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        {isSelected ? 'Selected' : 'Select Ticket'}
      </Button>
    </div>
  );
}
