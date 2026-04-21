export type CampaignStatus = "Active" | "Paused" | "Completed";

export interface Campaign {
  id: string;
  name: string;
  clientName: string;
  startDate: string;
  status: CampaignStatus;
  createdAt: number;
}