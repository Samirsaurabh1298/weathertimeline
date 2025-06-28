import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Weather data is fetched directly from Open-Meteo API on the frontend
  // No backend routes needed for this weather dashboard
  
  const httpServer = createServer(app);
  return httpServer;
}
