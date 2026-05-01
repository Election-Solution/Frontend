"use client";

import { useMemo, useState } from "react";
import {
  mockIncidents,
  type Incident,
  type IncidentStatus,
  type Severity,
} from "@/data/mockIncidents";
import { MapPin, Sparkles } from "lucide-react";

const columns: { key: IncidentStatus; title: string; hint: string }[] = [
  { key: "new", title: "New Reports", hint: "Fresh — needs eyes" },
  { key: "checking", title: "Checking", hint: "Team is verifying" },
  { key: "resolved", title: "Resolved", hint: "All sorted" },
];

const severityStyles: Record<Severity, string> = {
  low: "bg-success-soft text-success",
  medium: "bg-warning-soft text-warning-foreground",
  high: "bg-destructive-soft text-destructive",
};

const severityLabel: Record<Severity, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const Admin = () => {
  const [items, setItems] = useState<Incident[]>(mockIncidents);

  const grouped = useMemo(() => {
    return columns.reduce(
      (acc, c) => {
        acc[c.key] = items.filter((i) => i.status === c.key);
        return acc;
      },
      {} as Record<IncidentStatus, Incident[]>,
    );
  }, [items]);

  const advance = (id: string) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const next: IncidentStatus =
          i.status === "new"
            ? "checking"
            : i.status === "checking"
              ? "resolved"
              : "resolved";
        return { ...i, status: next };
      }),
    );
  };

  return (
    <section className="container-page py-8 sm:py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Admin Desk</h1>
          <p className="mt-1 text-muted-foreground">
            Triage incoming reports. Keep am moving.
          </p>
        </div>
        <div className="flex gap-2">
          {columns.map((c) => (
            <span key={c.key} className="pill bg-secondary text-foreground">
              {c.title}:{" "}
              <strong className="ml-1">{grouped[c.key].length}</strong>
            </span>
          ))}
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((col) => (
          <div key={col.key} className="rounded-3xl bg-secondary/60 p-4">
            <div className="mb-3 flex items-baseline justify-between px-1">
              <h2 className="text-base font-bold">{col.title}</h2>
              <span className="text-xs text-muted-foreground">{col.hint}</span>
            </div>
            <ul className="space-y-3">
              {grouped[col.key].length === 0 && (
                <li className="rounded-2xl bg-background p-5 text-center text-sm text-muted-foreground">
                  Nothing here. Calm.
                </li>
              )}
              {grouped[col.key].map((i) => (
                <li
                  key={i.id}
                  className="rounded-2xl bg-background p-4 shadow-card"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 text-sm font-semibold">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span>
                        {i.pollingUnit}, {i.ward}
                        <span className="block text-xs font-normal text-muted-foreground">
                          {i.lga}, {i.state}
                        </span>
                      </span>
                    </div>
                    <span className={`pill ${severityStyles[i.severity]}`}>
                      {severityLabel[i.severity]}
                    </span>
                  </div>

                  <div className="mt-3 rounded-xl bg-secondary/70 p-3">
                    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                      <Sparkles className="h-3 w-3" aria-hidden /> AI summary
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground">
                      {i.summary}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {i.reportedAt} • {i.id}
                    </span>
                    {i.status !== "resolved" && (
                      <button
                        onClick={() => advance(i.id)}
                        className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary-hover"
                      >
                        {i.status === "new"
                          ? "Start checking"
                          : "Mark resolved"}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Admin;
