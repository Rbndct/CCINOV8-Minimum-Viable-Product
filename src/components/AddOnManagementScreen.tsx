import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, Plus, Edit2, Trash2, Package } from "lucide-react";

interface AddOn {
  id: string;
  name: string;
  price: number;
  enabled: boolean;
}

interface AddOnManagementScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export function AddOnManagementScreen({ onBack, onSave }: AddOnManagementScreenProps) {
  const [addOns, setAddOns] = useState<AddOn[]>([
    { id: "1", name: "Drill Bits Set (10pcs)", price: 50, enabled: true },
    { id: "2", name: "Extension Cord (5m)", price: 30, enabled: true },
    { id: "3", name: "Safety Goggles", price: 20, enabled: false }
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddOnName, setNewAddOnName] = useState("");
  const [newAddOnPrice, setNewAddOnPrice] = useState("");

  const handleAddNew = () => {
    if (newAddOnName && newAddOnPrice) {
      const newAddOn: AddOn = {
        id: Date.now().toString(),
        name: newAddOnName,
        price: parseFloat(newAddOnPrice),
        enabled: true
      };
      setAddOns([...addOns, newAddOn]);
      setNewAddOnName("");
      setNewAddOnPrice("");
      setIsAddingNew(false);
    }
  };

  const handleToggle = (id: string) => {
    setAddOns(addOns.map(addon => 
      addon.id === id ? { ...addon, enabled: !addon.enabled } : addon
    ));
  };

  const handleDelete = (id: string) => {
    setAddOns(addOns.filter(addon => addon.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/80">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-white">Manage Add-Ons</h2>
        </div>
        <p className="text-white/90">Offer extras to increase your earnings</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-28">
        {/* Info Card */}
        <Card className="p-4 mb-6 rounded-2xl border-border bg-accent/5">
          <div className="flex items-start gap-2">
            <Package className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="mb-1 text-accent">About Add-Ons</h4>
              <p className="text-foreground/80">
                Add-ons are optional extras renters can choose during booking. They help you earn more and provide better service.
              </p>
            </div>
          </div>
        </Card>

        {/* Add-Ons List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3>Your Add-Ons</h3>
            <Button
              onClick={() => setIsAddingNew(true)}
              variant="outline"
              className="rounded-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>

          <div className="space-y-3">
            {addOns.map((addon) => (
              <Card key={addon.id} className="p-4 rounded-2xl border-border">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`addon-${addon.id}`}
                    checked={addon.enabled}
                    onCheckedChange={() => handleToggle(addon.id)}
                  />
                  <div className="flex-1">
                    <h4>{addon.name}</h4>
                    <p className="text-primary">+₱{addon.price}/day</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary">
                      <Edit2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleDelete(addon.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Add New Form */}
        {isAddingNew && (
          <Card className="p-5 rounded-2xl border-primary">
            <h4 className="mb-4">Add New Add-On</h4>
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-2 block">Add-On Name</label>
                <Input
                  placeholder="e.g., Extra Battery Pack"
                  value={newAddOnName}
                  onChange={(e) => setNewAddOnName(e.target.value)}
                  className="h-12 bg-white rounded-xl"
                />
              </div>
              <div>
                <label className="text-muted-foreground mb-2 block">Price per Day</label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">₱</span>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newAddOnPrice}
                    onChange={(e) => setNewAddOnPrice(e.target.value)}
                    className="h-12 bg-white rounded-xl"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleAddNew}
                  disabled={!newAddOnName || !newAddOnPrice}
                  className="flex-1 h-12 bg-primary hover:bg-primary/90 rounded-xl"
                >
                  Add
                </Button>
                <Button
                  onClick={() => {
                    setIsAddingNew(false);
                    setNewAddOnName("");
                    setNewAddOnPrice("");
                  }}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Tips */}
        <Card className="p-4 rounded-2xl border-border bg-primary/5 mt-6">
          <h4 className="mb-3">Tips for Great Add-Ons</h4>
          <ul className="space-y-2 text-foreground/90">
            <li className="flex gap-2">
              <span>•</span>
              <span>Offer items that complement your main listing</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Price add-ons fairly to encourage bookings</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Keep descriptions clear and specific</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Update availability if items need maintenance</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
        <Button
          onClick={onSave}
          className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
