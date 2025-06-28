import { Link, useLocation } from "wouter";
import { BarChart3 } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900">Weather Analytics</h1>
        </div>

        <nav className="flex space-x-8">
          <Link href="/">
            <button
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                location === "/" || location === "/overview"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Overview
            </button>
          </Link>
          <Link href="/detailed-insights">
            <button
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                location === "/detailed-insights"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Drilldown
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
