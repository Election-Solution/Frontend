import Link from "next/link";
import Navbar from "@/components/Navbar";
import LiveTicker from "@/components/LiveTicker";
import { SeverityBadge } from "@/components/Badges";
import { stats, mockIncidents } from "@/lib/mockData";
import {
  AlertTriangle,
  MapPin,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Eye,
  Zap,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function LandingPage() {
  const recentIncidents = mockIncidents.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative border-b-2 border-ng-dark overflow-hidden diagonal-bg">
        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-ng-dark opacity-5" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-ng-dark opacity-5" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-ng-dark opacity-5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="fade-in-up inline-flex items-center gap-2 bg-ng-green border-2 border-ng-dark px-3 py-1.5 mb-6 shadow-brutal-sm">
                <span className="pulse-dot w-2 h-2 rounded-full bg-white inline-block" />
                <span className="text-white font-display text-xs font-700 uppercase tracking-widest">
                  {stats.total} Incidents Tracked Today
                </span>
              </div>

              <h1 className="fade-in-up-delay-1 font-display text-4xl md:text-6xl font-800 text-ng-dark leading-[1.05] mb-6">
                WatchDog
                <br />
                <span className="text-ng-green">Alert.</span>
                <br />
                <span className="text-3xl md:text-4xl font-600 text-gray-600">
                  Real-Time Election
                </span>
                <br />
                <span className="text-3xl md:text-4xl font-600 text-gray-600">
                  Monitoring.
                </span>
              </h1>

              <p className="fade-in-up-delay-2 font-body text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
                Empowering citizens. Ensuring transparency.{" "}
                <strong className="text-ng-dark">
                  Report polling unit incidents instantly
                </strong>{" "}
                for rapid intervention.
              </p>

              <div className="fade-in-up-delay-3 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/report"
                  className="flex items-center justify-center gap-3 bg-ng-green text-white font-display font-700 text-base px-8 py-4 border-2 border-ng-dark shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all duration-150 group"
                >
                  <AlertTriangle size={20} />
                  Report an Incident
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href="/map"
                  className="flex items-center justify-center gap-3 bg-white text-ng-dark font-display font-700 text-base px-8 py-4 border-2 border-ng-dark shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all duration-150 group"
                >
                  <MapPin size={20} />
                  View Live Map
                </Link>
              </div>
            </div>

            {/* Right: stat cards */}
            <div className="fade-in-up-delay-4 grid grid-cols-2 gap-4">
              {[
                {
                  label: "Total Incidents",
                  value: stats.total,
                  icon: AlertTriangle,
                  color: "bg-ng-dark",
                  textColor: "text-white",
                },
                {
                  label: "Critical Alerts",
                  value: stats.critical,
                  icon: Zap,
                  color: "bg-ng-red",
                  textColor: "text-white",
                },
                {
                  label: "Interventions",
                  value: stats.dispatched,
                  icon: Shield,
                  color: "bg-ng-yellow",
                  textColor: "text-ng-dark",
                },
                {
                  label: "Resolved Today",
                  value: stats.resolved,
                  icon: CheckCircle,
                  color: "bg-ng-green",
                  textColor: "text-white",
                },
              ].map(({ label, value, icon: Icon, color, textColor }) => (
                <div
                  key={label}
                  className={`${color} border-2 border-ng-dark shadow-brutal p-5 card-hover`}
                >
                  <Icon size={22} className={`${textColor} mb-3 opacity-80`} />
                  <div
                    className={`font-display text-4xl font-800 ${textColor} mb-1`}
                  >
                    {value}
                  </div>
                  <div
                    className={`font-body text-xs ${textColor} opacity-80 uppercase tracking-wider`}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live ticker */}
        <LiveTicker />
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 border-b-2 border-ng-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-ng-green font-display font-700 text-sm uppercase tracking-widest mb-2">
                Process
              </p>
              <h2 className="font-display text-4xl font-800 text-ng-dark">
                How It Works
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: Eye,
                title: "Witness & Report",
                desc: "Any citizen, party agent, or observer witnesses an incident and submits a report via our secure form in under 60 seconds.",
                color: "bg-white",
              },
              {
                step: "02",
                icon: TrendingUp,
                title: "AI Triage",
                desc: "Our system auto-generates an urgency score, tags the incident type, and routes it to the appropriate response team.",
                color: "bg-ng-yellow",
              },
              {
                step: "03",
                icon: Shield,
                title: "Rapid Intervention",
                desc: "Security forces, electoral officers, or NGO observers are alerted within minutes for critical incidents.",
                color: "bg-ng-green",
              },
            ].map(({ step, icon: Icon, title, desc, color }) => (
              <div
                key={step}
                className={`${color} border-2 border-ng-dark p-8 shadow-brutal card-hover relative`}
              >
                <div className="absolute top-4 right-4 font-display text-6xl font-800 text-ng-dark opacity-10">
                  {step}
                </div>
                <Icon size={28} className="text-ng-dark mb-4" />
                <h3 className="font-display text-xl font-700 text-ng-dark mb-3">
                  {title}
                </h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RECENT INCIDENTS ─── */}
      <section className="py-20 border-b-2 border-ng-dark bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-ng-green font-display font-700 text-sm uppercase tracking-widest mb-2">
                Public Feed
              </p>
              <h2 className="font-display text-4xl font-800 text-ng-dark">
                Recent Alerts
              </h2>
            </div>
            <Link
              href="/map"
              className="hidden md:flex items-center gap-2 text-ng-dark font-display font-600 text-sm border-b-2 border-ng-dark pb-0.5 hover:text-ng-green hover:border-ng-green transition-colors"
            >
              View All on Map <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {recentIncidents.map((incident) => (
              <div
                key={incident.id}
                className="bg-white border-2 border-ng-dark shadow-brutal p-5 card-hover"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-2 flex-wrap">
                    <SeverityBadge severity={incident.severity} size="sm" />
                    <span className="bg-gray-100 border border-ng-dark text-[10px] font-display font-700 uppercase tracking-wider px-2 py-0.5 text-gray-600">
                      {incident.typeLabel}
                    </span>
                  </div>
                  <span className="text-xs font-body text-gray-400 flex items-center gap-1">
                    <Clock size={12} />{" "}
                    {new Date(incident.reportedAt).toLocaleTimeString("en-NG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={13} className="text-ng-green flex-shrink-0" />
                  <span className="font-display text-sm font-600 text-ng-dark">
                    {incident.ward}, {incident.lga} • {incident.state}
                  </span>
                </div>
                <p className="font-body text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {incident.summary}
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span
                    className={`text-xs font-display font-700 uppercase tracking-wider
                    ${
                      incident.status === "resolved"
                        ? "text-ng-green"
                        : incident.status === "dispatched"
                          ? "text-blue-600"
                          : incident.status === "verifying"
                            ? "text-amber-600"
                            : "text-ng-red"
                    }`}
                  >
                    {incident.status === "new"
                      ? "● New Alert"
                      : incident.status === "verifying"
                        ? "◐ Verifying"
                        : incident.status === "dispatched"
                          ? "⟳ Dispatched"
                          : "✓ Resolved"}
                  </span>
                  <span className="text-xs font-body text-gray-400">
                    {incident.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="bg-ng-dark border-b-2 border-ng-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-800 text-white mb-2">
              See something? Report it.
            </h2>
            <p className="font-body text-gray-400">
              Your report could trigger a life-saving intervention in minutes.
            </p>
          </div>
          <Link
            href="/report"
            className="flex-shrink-0 flex items-center gap-3 bg-ng-green text-white font-display font-700 text-base px-8 py-4 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all duration-150"
          >
            <AlertTriangle size={20} />
            Report an Incident Now
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-ng-green" />
            <span className="font-display text-sm font-700 text-ng-dark">
              WatchDog Alert
            </span>
            <span className="font-body text-xs text-gray-400 ml-2">
              © 2024 — Built for Democracy
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-gray-400" />
            <span className="font-body text-xs text-gray-400">
              Powered by citizen observers across Nigeria
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
