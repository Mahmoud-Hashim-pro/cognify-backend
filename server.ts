import express from "express";
import dotenv from "dotenv";

dotenv.config();

import { geminiRouter } from "./server/routes";
import securityAuditHandler from "./api/telemetry/securityAudit";
import countryHandler from "./api/geo/country";
import healthHandler from "./api/system/health";
import learningProfileHandler from "./api/student/learningProfile";
import imageProxyHandler from "./api/proxy-image";
import emergencyDispatchHandler from "./api/emergency/dispatch";
import deleteUserHandler from "./api/admin/deleteUser";
import { applyCorsHeaders } from "./api/_lib/cors";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: "2mb" }));

  // Set CORS and Security headers
  app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    if (!applyCorsHeaders(req, res)) return;
    next();
  });

  // API Health Check
  app.all("/api/system/health", (req, res) => {
    return healthHandler(req, res);
  });
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Telemetry: Security Audit IP extraction
  app.all("/api/telemetry/securityAudit", (req, res) => {
    return securityAuditHandler(req, res);
  });

  // Geo: visitor country (Vercel headers in prod, "Unknown" locally)
  app.all("/api/geo/country", (req, res) => {
    return countryHandler(req, res);
  });

  // Student Learning Profile
  app.all("/api/student/learningProfile", (req, res) => {
    return learningProfileHandler(req, res);
  });

  // Image Proxy
  app.all("/api/proxy-image", (req, res) => {
    return imageProxyHandler(req, res);
  });

  // Emergency SOS automated server-side dispatch
  app.all("/api/emergency/dispatch", (req, res) => {
    return emergencyDispatchHandler(req, res);
  });

  // Super Admin: Permanent Server-Side User & Data Purge
  app.all("/api/admin/deleteUser", (req, res) => {
    return deleteUserHandler(req, res);
  });

  // Gemini & AI Routes
  app.use("/api/gemini", geminiRouter);

  // Centralized Error Middleware for JSON parse failures or unhandled route errors
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("[Server Error Handler]:", err);
    if (res.headersSent) return;
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Cognify Backend running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal Server Startup Error:", err);
  process.exit(1);
});
