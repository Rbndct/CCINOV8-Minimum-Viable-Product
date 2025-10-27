import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MyRentalsScreenProps {
  onBack: () => void;
  onRentalClick: (id: string) => void;
}

const activeRentals = [
  {
    id: "1",
    title: "Power Drill Set",
    price: 250,
    dates: "Oct 28 - Oct 29",
    status: "active",
    image: "https://images.unsplash.com/photo-1689935421853-cb23a0bc92e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYxNTI2MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    owner: "Juan Dela Cruz"
  }
];

const pendingRentals = [
  {
    id: "2",
    title: "Professional Camera",
    price: 800,
    dates: "Nov 1 - Nov 3",
    status: "pending",
    image: "https://images.unsplash.com/photo-1565548058664-033014b26a80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBlcXVpcG1lbnQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjE0OTYyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    owner: "Ana Santos"
  }
];

const completedRentals = [
  {
    id: "3",
    title: "Extension Ladder",
    price: 350,
    dates: "Oct 20 - Oct 21",
    status: "completed",
    image: "https://images.unsplash.com/photo-1549030782-4935f80baeb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWRkZXIlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYxNTYwMDkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    owner: "Carlos Miguel"
  }
];

export function MyRentalsScreen({ onBack, onRentalClick }: MyRentalsScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3>My Rentals</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="active" className="h-full flex flex-col">
          <TabsList className="w-full rounded-none border-b border-border bg-transparent h-12 p-0">
            <TabsTrigger
              value="active"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="flex-1 overflow-y-auto px-6 py-6 mt-0">
            {activeRentals.length > 0 ? (
              <div className="space-y-3">
                {activeRentals.map((rental) => (
                  <Card
                    key={rental.id}
                    className="p-4 rounded-2xl border-border cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onRentalClick(rental.id)}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                        <ImageWithFallback
                          src={rental.image}
                          alt={rental.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="line-clamp-1">{rental.title}</h4>
                          <Badge className="bg-accent text-white border-0 ml-2">Active</Badge>
                        </div>
                        <p className="text-muted-foreground mb-1">{rental.owner}</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{rental.dates}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="mb-2">No Active Rentals</h4>
                <p className="text-muted-foreground">
                  Your active rentals will appear here
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="flex-1 overflow-y-auto px-6 py-6 mt-0">
            {pendingRentals.length > 0 ? (
              <div className="space-y-3">
                {pendingRentals.map((rental) => (
                  <Card
                    key={rental.id}
                    className="p-4 rounded-2xl border-border cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onRentalClick(rental.id)}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                        <ImageWithFallback
                          src={rental.image}
                          alt={rental.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="line-clamp-1">{rental.title}</h4>
                          <Badge variant="outline" className="border-primary text-primary ml-2">
                            Pending
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-1">{rental.owner}</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{rental.dates}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="mb-2">No Pending Rentals</h4>
                <p className="text-muted-foreground">
                  Your pending bookings will appear here
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="flex-1 overflow-y-auto px-6 py-6 mt-0">
            {completedRentals.length > 0 ? (
              <div className="space-y-3">
                {completedRentals.map((rental) => (
                  <Card
                    key={rental.id}
                    className="p-4 rounded-2xl border-border cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onRentalClick(rental.id)}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                        <ImageWithFallback
                          src={rental.image}
                          alt={rental.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="line-clamp-1">{rental.title}</h4>
                          <Badge variant="outline" className="ml-2">Completed</Badge>
                        </div>
                        <p className="text-muted-foreground mb-1">{rental.owner}</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{rental.dates}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="mb-2">No Completed Rentals</h4>
                <p className="text-muted-foreground">
                  Your rental history will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
