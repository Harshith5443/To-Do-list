import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Trash2, 
  MoreHorizontal, 
  LayoutDashboard, 
  Search, 
  Filter,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCampaigns } from "../hooks/useCampaigns";
import { CampaignForm } from "../components/CampaignForm";
import { CampaignStatusBadge } from "../components/CampaignStatusBadge";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const { campaigns, addCampaign, updateStatus, deleteCampaign } = useCampaigns();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.clientName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, searchQuery, statusFilter]);

  const handleAddCampaign = (data: any) => {
    addCampaign(data);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3.5 bg-primary rounded-2xl shadow-xl shadow-primary/20">
              <LayoutDashboard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
              <p className="text-slate-500 font-medium">Welcome back to your campaign hub</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-12 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Plus className="w-5 h-5 mr-2" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[450px] rounded-3xl border-none shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Create Campaign</DialogTitle>
                  <DialogDescription className="text-slate-500">
                    Fill in the details to launch your next big thing.
                  </DialogDescription>
                </DialogHeader>
                <CampaignForm onSubmit={handleAddCampaign} />
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleLogout} className="h-12 px-5 border-slate-200 hover:bg-slate-50 rounded-xl font-semibold text-slate-600">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
            <div className="h-1.5 bg-primary w-full" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardDescription className="font-bold text-slate-500 uppercase tracking-wider text-xs">Total Campaigns</CardDescription>
              <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-slate-900">{campaigns.length}</div>
              <p className="text-sm text-slate-400 mt-2 font-medium">Across all active clients</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
            <div className="h-1.5 bg-emerald-500 w-full" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardDescription className="font-bold text-slate-500 uppercase tracking-wider text-xs">Active Now</CardDescription>
              <div className="p-2 bg-emerald-50/80 rounded-lg group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-emerald-600">
                {campaigns.filter(c => c.status === 'Active').length}
              </div>
              <p className="text-sm text-slate-400 mt-2 font-medium">Currently generating results</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
            <div className="h-1.5 bg-amber-500 w-full" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardDescription className="font-bold text-slate-500 uppercase tracking-wider text-xs">Paused</CardDescription>
              <div className="p-2 bg-amber-50/80 rounded-lg group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-amber-600">
                {campaigns.filter(c => c.status === 'Paused').length}
              </div>
              <p className="text-sm text-slate-400 mt-2 font-medium">Awaiting further action</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white/60 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-white/20">
            <div className="relative w-full lg:w-[450px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input 
                placeholder="Search by campaign or client name..." 
                className="h-12 pl-12 bg-slate-50/50 border-slate-100 focus:ring-primary/20 rounded-xl font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Filter</span>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-12 w-full lg:w-[200px] bg-slate-50/50 border-slate-100 rounded-xl font-semibold text-slate-700">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-none shadow-xl">
                  <SelectItem value="all" className="font-medium">All Statuses</SelectItem>
                  <SelectItem value="Active" className="font-medium">Active</SelectItem>
                  <SelectItem value="Paused" className="font-medium">Paused</SelectItem>
                  <SelectItem value="Completed" className="font-medium">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table Card */}
          <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
            <CardHeader className="px-8 py-6 border-b border-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Campaign List</CardTitle>
                  <CardDescription className="font-medium text-slate-400">
                    Showing {filteredCampaigns.length} results
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/30">
                    <TableRow className="hover:bg-transparent border-none">
                      <TableHead className="px-8 py-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">Campaign Details</TableHead>
                      <TableHead className="py-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">Client</TableHead>
                      <TableHead className="py-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">Timeline</TableHead>
                      <TableHead className="py-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">Status</TableHead>
                      <TableHead className="px-8 py-4 text-right font-bold text-slate-500 uppercase tracking-wider text-[11px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-64 text-center">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="p-4 bg-slate-50 rounded-full">
                              <Search className="w-8 h-8 text-slate-300" />
                            </div>
                            <p className="text-slate-500 font-bold text-lg">No campaigns found</p>
                            <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCampaigns.map((campaign) => (
                        <TableRow key={campaign.id} className="group hover:bg-slate-50/50 transition-colors border-slate-50">
                          <TableCell className="px-8 py-5">
                            <div className="font-bold text-slate-900 text-base">{campaign.name}</div>
                            <div className="text-xs text-slate-400 font-medium mt-0.5">ID: {campaign.id.slice(0, 8)}</div>
                          </TableCell>
                          <TableCell className="py-5">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                {campaign.clientName.charAt(0)}
                              </div>
                              <span className="font-semibold text-slate-700">{campaign.clientName}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-5">
                            <div className="flex items-center gap-2 text-slate-600 font-medium">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              {new Date(campaign.startDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </div>
                          </TableCell>
                          <TableCell className="py-5">
                            <CampaignStatusBadge status={campaign.status} />
                          </TableCell>
                          <TableCell className="px-8 py-5 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-none shadow-2xl">
                                <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Update Status</DropdownMenuLabel>
                                <DropdownMenuItem className="rounded-xl font-semibold py-2.5 cursor-pointer" onClick={() => updateStatus(campaign.id, "Active")}>
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-3" />
                                  Set to Active
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl font-semibold py-2.5 cursor-pointer" onClick={() => updateStatus(campaign.id, "Paused")}>
                                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-3" />
                                  Set to Paused
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl font-semibold py-2.5 cursor-pointer" onClick={() => updateStatus(campaign.id, "Completed")}>
                                  <div className="w-2 h-2 rounded-full bg-slate-400 mr-3" />
                                  Set to Completed
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="my-2 bg-slate-50" />
                                <DropdownMenuItem 
                                  className="rounded-xl font-semibold py-2.5 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                                  onClick={() => deleteCampaign(campaign.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-3" />
                                  Delete Campaign
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
        </div>
        
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;