import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CampaignStatus } from "../types/campaign";

interface Props {
  onSubmit: (data: {
    name: string;
    clientName: string;
    startDate: string;
    status: CampaignStatus;
  }) => void;
}

export const CampaignForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState<CampaignStatus>("Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !clientName || !startDate) return;
    
    onSubmit({ name, clientName, startDate, status });
    setName("");
    setClientName("");
    setStartDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Campaign Name</Label>
        <Input
          id="name"
          placeholder="Summer Sale 2024"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="client">Client Name</Label>
        <Input
          id="client"
          placeholder="Acme Corp"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Start Date</Label>
          <Input
            id="date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Initial Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as CampaignStatus)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Paused">Paused</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
        Create Campaign
      </Button>
    </form>
  );
};