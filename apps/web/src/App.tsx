
import { useEffect, useState } from "react";
import api from "./services/api";

interface HealthResponse {
  success: boolean;
  message: string;
}

function App() {
  const [apiStatus, setApiStatus] = useState("Checking API...");
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    async function checkApi() {
      try {
        const response =
          await api.get<HealthResponse>("/health");

        setApiStatus(response.data.message);
        setApiConnected(response.data.success);
      } catch {
        setApiStatus("Backend is not reachable");
        setApiConnected(false);
      }
    }

    checkApi();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              ResolveNest
            </h1>

            <p className="text-sm text-slate-500">
              AI-powered support ticket management
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              apiConnected
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {apiConnected ? "API Connected" : "API Disconnected"}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">
            Welcome to ResolveNest
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Manage customer support tickets, organize conversations,
            track service-level agreements, and assist support agents
            with AI-powered insights.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Total Tickets
              </p>

              <p className="mt-2 text-2xl font-bold">
                0
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Open Tickets
              </p>

              <p className="mt-2 text-2xl font-bold">
                0
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Resolved Tickets
              </p>

              <p className="mt-2 text-2xl font-bold">
                0
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-700">
              Backend Status
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {apiStatus}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
