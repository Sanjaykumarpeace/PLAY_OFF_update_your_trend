import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { collections, journal, store, visualImages } from "@/lib/brand-data";
import { whatsappHref } from "@/lib/utils";

const pageContent: Record<string, { title: string; kicker: string; body: string }> = {
  shop: {
    kicker: "Shop",
    title: "Inventory moves fast. Desire moves faster.",
    body: "Explore the digital shopping direction for Play Off: tees, shoes, denim, sportswear, jerseys, shirts and jackets curated for Bengaluru youth culture."
  },
  collections: {
    kicker: "Collections",
    title: "Signature categories with a premium editorial point of view.",
    body: "Oversized tees, sneakers, hoodies, casual wear, streetwear, premium fits, accessories, trending collections and new arrivals."
  },
  trending: {
    kicker: "Trending",
    title: "Most wanted fits in the Yelahanka circuit.",
    body: "A conversion-led view of the pieces people ask for first: clean denim, graphic tees, sneakers, varsity layers and matchday jerseys."
  },
  lookbook: {
    kicker: "Lookbook",
    title: "The cinematic style system.",
    body: "Editorial imagery and style stories designed to make every customer picture themselves walking into the store with more confidence."
  },
  "about-brand": {
    kicker: "About",
    title: "From local fashion store to premium streetwear identity.",
    body: "Play Off has been publicly listed since 2017 in Kattigenahalli, Yelahanka, Bengaluru. This brand system elevates that local trust into a global-feeling digital experience."
  },
  gallery: {
    kicker: "Gallery",
    title: "A visual world for the brand.",
    body: "Public listing photos were referenced as available, but this implementation uses cinematic licensed editorial imagery until owner-approved store photography is supplied."
  },
  reviews: {
    kicker: "Reviews",
    title: "Trust, stated accurately.",
    body: "The public listing shows a 4.1 rating across 7 ratings. Since written Google review text was not accessible during build, this site avoids fake testimonials."
  },
  "visit-store": {
    kicker: "Visit Store",
    title: "Find Play Off on Bagalur Main Road.",
    body: store.address
  },
  contact: {
    kicker: "Contact",
    title: "Start with WhatsApp, finish in-store.",
    body: "Phone and WhatsApp numbers were hidden on the public listing, so the CTA uses a prefilled WhatsApp share flow until the verified number is provided."
  },
  faqs: {
    kicker: "FAQs",
    title: "Answers that keep visitors moving.",
    body: "Availability changes fast. Use WhatsApp or Maps for the quickest store visit path."
  },
  "style-journal": {
    kicker: "Style Journal",
    title: "Bengaluru fashion culture, written like a brand.",
    body: "Journal ideas for SEO, Instagram captions, launch campaigns and in-store sales conversations."
  }
};

export function generateStaticParams() {
  return Object.keys(pageContent).map((slug) => ({ slug }));
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pageContent[slug];
  if (!page) notFound();

  return (
    <main className="min-h-screen px-4 pb-24 pt-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/70 hover:text-signal">
          <ArrowLeft size={16} /> Home
        </Link>
        <Link href={store.mapsUrl} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-black">
          <MapPin size={15} /> Visit
        </Link>
      </nav>

      <section className="relative mx-auto mt-6 min-h-[62vh] max-w-7xl overflow-hidden rounded-[8px] border border-white/10">
        <Image src={visualImages[Object.keys(pageContent).indexOf(slug) % visualImages.length]} alt={page.title} fill priority className="object-cover opacity-68" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.34em] text-signal">{page.kicker}</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black uppercase leading-none md:text-8xl">{page.title}</h1>
          <p className="mt-5 max-w-2xl leading-7 text-white/70">{page.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={whatsappHref(`Hi Play Off, I am interested in ${page.kicker}.`)} className="rounded-full bg-signal px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black">
              Ask Now
            </Link>
            <Link href="/#shop" className="rounded-full border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white">
              Explore Home
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-4 md:grid-cols-3">
        {(slug === "style-journal" ? journal : collections.map((item) => item.title)).map((item, index) => (
          <article key={item} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6">
            <Sparkles className="mb-8 text-signal" />
            <span className="text-xs font-black uppercase tracking-[0.22em] text-white/38">Feature 0{index + 1}</span>
            <h2 className="mt-3 text-2xl font-black uppercase">{item}</h2>
            <p className="mt-4 text-sm leading-6 text-white/58">
              Designed as a premium, conversion-ready content block that can be connected to real product inventory when available.
            </p>
            <Link href="/#shop" className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-signal">
              Continue <ArrowRight size={15} />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
