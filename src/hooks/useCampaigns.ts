import { useState, useEffect } from "react";
import { Campaign, CampaignStatus } from "../types/campaign";
import { showSuccess } from "../utils/toast";

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("campaigns");
    if (saved) {
      setCampaigns(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever campaigns change
  useEffect(() => {
    localStorage.setItem("campaigns", JSON.stringify(campaigns));
  }, [campaigns]);

  const addCampaign = (campaign: Omit<Campaign, "id" | "createdAt">) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
    showSuccess("Campaign added successfully!");
  };

  const updateStatus = (id: string, status: CampaignStatus) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
    showSuccess(`Status updated to ${status}`);
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    showSuccess("Campaign deleted");
  };

  return {
    campaigns,
    addCampaign,
    updateStatus,
    deleteCampaign,
  };
};