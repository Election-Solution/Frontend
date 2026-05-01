"use client";

import { useState } from "react";
import { Camera, CheckCircle2 } from "lucide-react";
import { ISSUE_TYPES, NIGERIAN_STATES } from "@/data/mockIncidents";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const fieldClass =
  "h-14 w-full rounded-2xl border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20";

const labelClass = "mb-2 block text-sm font-semibold text-foreground";

const Report = () => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    state: "",
    lga: "",
    ward: "",
    pollingUnit: "",
    issueType: "",
    details: "",
  });

  const update =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.state || !form.issueType || !form.details.trim()) {
      toast({
        title: "Small thing missing",
        description: "Pick a State, an Issue Type, and tell us what happened.",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Report sent ✅",
      description: "Thank you. Our team go check am sharp sharp.",
    });
    setTimeout(() => router.push("/map"), 1600);
  };

  if (submitted) {
    return (
      <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-12 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-primary-soft text-primary">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold">Report received</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Thank you for speaking up. Taking you to the live map…
        </p>
      </section>
    );
  }

  return (
    <section className="container-page py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          What is happening?
        </h1>
        <p className="mt-2 text-muted-foreground">
          Tell us small details. No need long story.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-6" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="state" className={labelClass}>
              State
            </label>
            <select
              id="state"
              className={fieldClass}
              value={form.state}
              onChange={update("state")}
              required
            >
              <option value="">Pick your state</option>
              {NIGERIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="lga" className={labelClass}>
              LGA
            </label>
            <select
              id="lga"
              className={fieldClass}
              value={form.lga}
              onChange={update("lga")}
            >
              <option value="">Pick LGA</option>
              <option>Ikeja</option>
              <option>Surulere</option>
              <option>Eti-Osa</option>
              <option>Nassarawa</option>
              <option>Port Harcourt</option>
              <option>Gwagwalada</option>
            </select>
          </div>
          <div>
            <label htmlFor="ward" className={labelClass}>
              Ward
            </label>
            <select
              id="ward"
              className={fieldClass}
              value={form.ward}
              onChange={update("ward")}
            >
              <option value="">Pick ward</option>
              {Array.from({ length: 10 }).map((_, i) => (
                <option key={i} value={`Ward ${i + 1}`}>
                  Ward {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pu" className={labelClass}>
              Polling Unit
            </label>
            <input
              id="pu"
              className={fieldClass}
              placeholder="e.g. PU 014"
              value={form.pollingUnit}
              onChange={update("pollingUnit")}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Issue Type</label>
          <div className="grid gap-3 sm:grid-cols-2">
            {ISSUE_TYPES.map((t) => {
              const active = form.issueType === t;
              return (
                <button
                  type="button"
                  key={t}
                  onClick={() => setForm({ ...form, issueType: t })}
                  className={`h-14 rounded-2xl border-2 px-4 text-left text-base font-semibold transition-colors ${
                    active
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-border bg-background text-foreground hover:bg-secondary"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="evidence" className={labelClass}>
            Evidence
          </label>
          <label
            htmlFor="evidence"
            className="flex h-28 cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-secondary/50 px-4 text-center text-muted-foreground hover:bg-secondary"
          >
            <Camera className="h-6 w-6" aria-hidden />
            <span>
              Add a photo or video <span className="text-xs">(Optional)</span>
            </span>
          </label>
          <input
            id="evidence"
            type="file"
            accept="image/*,video/*"
            className="sr-only"
          />
        </div>

        <div>
          <label htmlFor="details" className={labelClass}>
            Details
          </label>
          <textarea
            id="details"
            rows={5}
            className="w-full rounded-2xl border border-input bg-background p-4 text-base placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
            placeholder="Type what happened here..."
            value={form.details}
            onChange={update("details")}
            maxLength={1000}
            required
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">
            {form.details.length}/1000
          </p>
        </div>

        <button
          type="submit"
          className="h-16 w-full rounded-2xl bg-primary text-lg font-extrabold text-primary-foreground shadow-soft transition-colors hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-primary/30"
        >
          Oya, Submit Report
        </button>
      </form>
    </section>
  );
};

export default Report;
