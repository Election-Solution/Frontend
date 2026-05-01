"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { mockIncidents, type Incident } from "@/data/mockIncidents";

export default function MapClient() {
  const [filter, setFilter] = useState<"all" | "issues" | "clear">("all");

  const visible = mockIncidents.filter((i) =>
    filter === "all"
      ? true
      : filter === "clear"
        ? i.status === "resolved"
        : i.status !== "resolved",
  );

  const colorFor = (i: Incident) =>
    i.status === "resolved" ? "hsl(153 70% 38%)" : "hsl(0 72% 55%)";

  return (
    <section className="container-page py-6 sm:py-10">
      <header className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Live Map</h1>
          <p className="mt-1 text-muted-foreground">
            Tap a dot to see the gist.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {[
            { k: "all", label: "All" },
            { k: "issues", label: "Issues" },
            { k: "clear", label: "All clear" },
          ].map((f) => (
            <button
              key={f.k}
              onClick={() => setFilter(f.k as typeof filter)}
              className={`rounded-full px-3 py-1.5 font-semibold transition-colors ${
                filter === f.k
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/70"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary/40 shadow-card">
        <MapContainer
          center={[9.082, 8.6753]} // center of Nigeria
          zoom={6}
          minZoom={5}
          maxZoom={18}
          scrollWheelZoom
          zoomControl={false}
          className="h-[60vh] w-full sm:h-[72vh]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <ZoomControl position="topright" />
          {visible.map((i) => {
            const color = colorFor(i);
            return (
              <CircleMarker
                key={i.id}
                center={[i.lat, i.lng]}
                radius={11}
                pathOptions={{
                  color: "white",
                  weight: 3,
                  fillColor: color,
                  fillOpacity: 1,
                }}
              >
                <Popup>
                  <div className="min-w-55 p-1">
                    <span
                      className="inline-block rounded-full px-2 py-0.5 text-[11px] font-bold"
                      style={{
                        background:
                          i.status === "resolved"
                            ? "hsl(153 60% 95%)"
                            : "hsl(0 80% 97%)",
                        color:
                          i.status === "resolved"
                            ? "hsl(153 70% 30%)"
                            : "hsl(0 72% 45%)",
                      }}
                    >
                      {i.status === "resolved" ? "All clear" : "Issue reported"}
                    </span>
                    <p className="mt-2 text-base font-extrabold leading-tight">
                      {i.pollingUnit}, {i.ward}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {i.lga}, {i.state}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">{i.summary}</p>
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      {i.reportedAt} • {i.id}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 border-t border-border bg-background/95 px-4 py-3 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-success" /> All clear
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-destructive" /> Issue
            reported
          </span>
          <span className="ml-auto hidden text-xs text-muted-foreground sm:inline">
            Showing {visible.length} of {mockIncidents.length}
          </span>
        </div>
      </div>
    </section>
  );
}
