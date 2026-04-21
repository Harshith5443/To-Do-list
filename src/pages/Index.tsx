import { useState } from "react";
import { Plus, Trash2, MoreHorizontal, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCampaigns } from "../hooks/useCampaigns";
import { CampaignForm } from "../components/CampaignForm";
import { CampaignStatusBadge } from "../components/CampaignStatusBadge";
import { CampaignStatus } from "../types/campaign";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const { campaigns, addCampaign, updateStatus, deleteCampaign } = useCampaigns();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddCampaign = (data: any) => {
    addCampaign(data);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Campaign Tracker</h1>
              <p className="text-slate-500">Manage and monitor your marketing efforts</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-sm">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Campaign</DialogTitle>
                <DialogDescription>
                  Enter the details for your new marketing campaign.
                </DialogDescription>
              </DialogHeader>
              <CampaignForm onSubmit={handleAddCampaign} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Total Campaigns</CardDescription>
              <CardTitle className="text-3xl">{campaigns.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Active Now</CardDescription>
              <CardTitle className="text-3xl text-emerald-600">
                {campaigns.filter(c => c.status === 'Active').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Paused</CardDescription>
              <CardTitle className="text-3xl text-amber-600">
                {campaigns.filter(c => c.status === 'Paused').length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Campaigns Table */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-white border-b">
            <CardTitle>All Campaigns</CardTitle>
            <CardDescription>A list of all your marketing campaigns and their current status.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="font-semibold">Campaign Name</TableHead>
                    <TableHead className="font-semibold">Client</TableHead>
                    <TableHead className="font-semibold">Start Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                        No campaigns found. Create your first one!
                      </TableCell>
                    </TableRow>
                  ) : (
                    campaigns.map((campaign) => (
                      <TableRow key={campaign.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-medium text-slate-900">{campaign.name}</TableCell>
                        <TableCell className="text-slate-600">{campaign.clientName}</TableCell>
                        <TableCell className="text-slate-600">
                          {new Date(campaign.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <CampaignStatusBadge status={campaign.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => updateStatus(campaign.id, "Active")}>
                                Set to Active
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateStatus(campaign.id, "Paused")}>
                                Set to Paused
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateStatus(campaign.id, "Completed")}>
                                Set to Completed
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600"
                                onClick={() => deleteCampaign(campaign.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;