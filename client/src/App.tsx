import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Overview from "@/pages/overview";
import DetailedInsights from "@/pages/detailed-insights";
import Header from "@/components/layout/header";
import FilterBar from "@/components/layout/filter-bar";
import { AppProvider } from "@/contexts/AppContext";

function Router() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <FilterBar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Switch>
          <Route path="/" component={Overview} />
          <Route path="/detailed-insights" component={DetailedInsights} />
          <Route path="/overview" component={Overview} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Router />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
