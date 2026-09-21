# Cognify 2.0 — Backend & Serverless AI Engine

Autonomous AI Learning Assistant API and Serverless Intelligence Gateway for Cognify.

## 🚀 Architecture
- **Framework**: Vercel Serverless Functions + Express Hybrid Gateway
- **Runtime**: Node.js ESNext (v20+ / v22+)
- **AI Providers**: Google Gemini (Flash 2.5), NVIDIA NIM (GLM-5.2 / DeepSeek-R1), Groq (Llama 3.3 70B), xAI (Grok-2)
- **Security**: RS256 Firebase JWT Authentication Guard, OWASP API1:2023 BOLA protection, IP + User dual-tier rate limiting.

## 📡 API Endpoints
| Endpoint | Method | Purpose |
|---|---|---|
| `/api/system/health` | GET | Real-time provider health, circuit breaker state, memory telemetry |
| `/api/gemini/generateAdaptiveResponse` | POST | Non-streaming adaptive response with student state calibration |
| `/api/gemini/generateAdaptiveResponseStream` | POST | Server-Sent Events (SSE) streaming adaptive chat |
| `/api/gemini/generateBenchmarkComparison` | POST | Independent self-review critique and answer refinement |
| `/api/gemini/generateContent` | POST | Multimodal vision & audio generation (sign, dysarthria, captions) |
| `/api/gemini/generateLogicResponse` | POST | Socratic logic sandboxing |
| `/api/gemini/generateProactiveInsights` | POST | Proactive learning recommendations and breakthroughs |
| `/api/student/learningProfile` | GET/POST | Canonical Personal Learning Profile generation |
| `/api/telemetry/securityAudit` | ALL | DevTools probe detection and client IP extraction |
| `/api/geo/country` | GET | Visitor edge geolocation extraction |
| `/api/proxy-image` | GET | SSRF-safe authenticated image proxy |

## 🔑 Environment Variables
Configure these in your Vercel Project Settings (`Settings -> Environment Variables`):

```env
FIREBASE_PROJECT_ID=gen-lang-client-0347404066
GEMINI_API_KEY=your_gemini_api_key
NVIDIA_API_KEY=your_nvidia_api_key
GROQ_API_KEY=your_groq_api_key
XAI_API_KEY=your_xai_api_key
ALLOWED_ORIGINS=https://cognify-frontend.vercel.app,http://localhost:5173
```

## 💻 Local Development
```bash
npm install
npm run dev     # Runs on http://localhost:3000
npm run build   # Bundles production server to dist/server.cjs
npm run lint    # Runs type check (tsc --noEmit)
```
