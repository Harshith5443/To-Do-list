import { Badge } from "@/components/ui/badge";
import { CampaignStatus } from "../types/campaign";

interface Props {
  status: CampaignStatus;
}

export const CampaignStatusBadge = ({ status }: Props) => {
  const variants: Record<CampaignStatus, string> = {
    Active: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200",
    Paused: "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200",
    Completed: "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200",
  };

  return (
    <Badge variant="outline" className={`font-medium ${variants[status]}`}>
      {status}
    </Badge>
  );
};