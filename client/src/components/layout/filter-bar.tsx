import { useState } from "react";
import { Calendar, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppContext } from "@/contexts/AppContext";
import { LOCATIONS } from "@/lib/constants";

export default function FilterBar() {
  const { dateRange, setDateRange, location, setLocation } = useAppContext();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from && range?.to) {
      // Ensure max 3 months range
      const diffInMonths = (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24 * 30);
      if (diffInMonths <= 3) {
        setDateRange({ from: range.from, to: range.to });
        setIsDatePickerOpen(false);
      }
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-slate-700">Date Range:</label>
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors"
              >
                <CalendarIcon className="w-4 h-4 text-slate-500" />
                <span className="text-sm">
                  {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={handleDateSelect}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-slate-700">Location:</label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="min-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LOCATIONS).map(([key, locationData]) => (
                <SelectItem key={key} value={key}>
                  {locationData.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
