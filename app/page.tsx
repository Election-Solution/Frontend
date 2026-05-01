import { ArrowRight, MapPin, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

const Index = () => {
  return (
    <section className="container-page py-12 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="pill bg-primary-soft text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" /> Live during
          election day
        </span>

        <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          WatchDog <span className="text-primary">Alert.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground sm:text-xl">
          See something, say something. Let’s keep the elections safe.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/report"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-8 text-lg font-bold text-primary-foreground shadow-soft transition-colors hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-primary/30"
          >
            Report Wahala
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
          <Link
            href="/map"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-background px-8 text-lg font-bold text-primary transition-colors hover:bg-primary-soft focus:outline-none focus:ring-4 focus:ring-primary/30"
          >
            See Live Map
          </Link>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Free to use. No login wahala. Just speak up.
        </p>
      </div>

      {/* 3 simple value props */}
      <div className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            title: "Safe & private",
            body: "Your details stay protected. Report freely.",
          },
          {
            icon: MapPin,
            title: "Local & live",
            body: "Pin the exact polling unit affected.",
          },
          {
            icon: Users,
            title: "For everybody",
            body: "Built simple — anyone fit use am.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-2xl bg-secondary/60 p-5 text-left"
          >
            <f.icon className="h-6 w-6 text-primary" aria-hidden />
            <h3 className="mt-3 text-base font-bold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Index;
