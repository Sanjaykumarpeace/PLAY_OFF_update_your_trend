"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Heart,
  MapPin,
  Menu,
  Moon,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
  X,
  Zap
} from "lucide-react";
import { collections, journal, navItems, store, visualImages } from "@/lib/brand-data";
import { cn, whatsappHref } from "@/lib/utils";
import img1 from "@/src/images/img-1.jpeg";
import img2 from "@/src/images/img-2.jpeg";
import img3 from "@/src/images/img-3.jpeg";
import img4 from "@/src/images/img-4.jpeg";
import img5 from "@/src/images/img-5.jpeg";
import img6 from "@/src/images/img-6.jpeg";
import img7 from "@/src/images/img-7.jpeg";
import img8 from "@/src/images/img-8.jpeg";
import img9 from "@/src/images/img-9.jpeg";
import img10 from "@/src/images/img-10.jpeg";
import img11 from "@/src/images/img-11.jpeg";

const localImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11] as const;

const products = [
  { name: "Jersey Statement Tee", category: "Oversized Tees", price: "Visit for latest price", badge: "Trending in Bengaluru", image: img6 },
  { name: "Sneaker Wall Drop", category: "Sneakers", price: "Ask on WhatsApp", badge: "Most Wanted", image: img10 },
  { name: "Denim Stack Edit", category: "Jeans", price: "In-store curation", badge: "Core Essential", image: img4 },
  { name: "Accessory Glass Case", category: "Accessories", price: "Limited pieces", badge: "Editor Pick", image: img8 },
  { name: "Sunglass Rotation", category: "Accessories", price: "Ask availability", badge: "Campus Favorite", image: img9 },
  { name: "Premium Casual Rack", category: "Shirts", price: "New Arrival", badge: "Sharp Fit", image: img11 }
];

type Product = (typeof products)[number];

type NavBarProps = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  cartCount: number;
  onCart: () => void;
  compact: boolean;
};

type ShopSectionProps = {
  query: string;
  setQuery: (query: string) => void;
  filtered: Product[];
  wishlist: string[];
  toggleWishlist: (name: string) => void;
};

const heroLines = ["UPDATE YOUR TREND.", "WEAR CONFIDENCE.", "THE STREETWEAR EXPERIENCE."];

export default function SiteExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [navCompact, setNavCompact] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 180]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setNavCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gsap-reveal", { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let shown = false;
    const show = () => {
      if (!shown) {
        shown = true;
        setPopup(true);
      }
    };
    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 8) show();
    };
    document.addEventListener("mouseleave", onMouseLeave);
    const timer = window.setTimeout(show, 30000);
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.clearTimeout(timer);
    };
  }, []);

  const filtered = useMemo(
    () => products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const toggleWishlist = (name: string) => {
    setWishlist((current) => (current.includes(name) ? current.filter((item) => item !== name) : [...current, name]));
  };

  return (
    <main className="min-h-screen">
      <LuxuryLoader />
      <NavBar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        theme={theme}
        setTheme={setTheme}
        cartCount={wishlist.length}
        onCart={() => setCartOpen(true)}
        compact={navCompact}
      />
      <AnimatePresence>{menuOpen && <FullScreenMenu onClose={() => setMenuOpen(false)} />}</AnimatePresence>
      <Hero heroY={heroY} />
      <ProofMarquee />
      <CollectionsSection />
      <ShopSection query={query} setQuery={setQuery} filtered={filtered} wishlist={wishlist} toggleWishlist={toggleWishlist} />
      <LookbookSection />
      <StoreSection />
      <ReviewsSection />
      <JournalSection />
      <FaqSection />
      <ContactSection />
      <Footer />
      <FloatingActions />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={wishlist} />
      <ExitPopup open={popup} onClose={() => setPopup(false)} />
    </main>
  );
}

function LuxuryLoader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), 1150);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-[100] grid place-items-center bg-obsidian">
          <motion.div initial={{ letterSpacing: "0.2em", opacity: 0 }} animate={{ letterSpacing: "0.55em", opacity: 1 }} className="text-center">
            <div className="text-xs uppercase text-signal">Yelahanka / Streetwear / 2017</div>
            <div className="mt-4 text-3xl font-black uppercase text-chrome md:text-6xl">PLAY OFF</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavBar({ menuOpen, setMenuOpen, theme, setTheme, cartCount, onCart, compact }: NavBarProps) {
  return (
    <header className={cn("fixed left-0 right-0 z-50 px-3 transition-all duration-500 md:px-4", compact ? "top-2" : "top-4")}>
      <nav className={cn("glass luxe-glow mx-auto flex max-w-7xl items-center justify-between rounded-full shadow-luxe transition-all duration-500", compact ? "px-3 py-2 md:max-w-5xl" : "px-4 py-3 md:px-6")}>
        <Link href="/" className="flex items-center gap-3">
          <span className={cn("sheen grid place-items-center rounded-full border border-white/20 bg-white font-black text-black transition-all", compact ? "h-9 w-9 text-xs" : "h-10 w-10 text-sm")}>PO</span>
          <span className="hidden text-xs font-black uppercase tracking-[0.22em] md:block">Play Off</span>
        </Link>
        <div className="hidden items-center gap-4 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72 lg:flex xl:gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-signal">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link href={store.phoneHref} aria-label={`Call ${store.phoneNumber}`} className="magnetic hidden h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-[10px] font-black uppercase tracking-[0.16em] text-white/78 hover:border-signal md:inline-flex">
            <Phone size={15} /> {store.phoneNumber}
          </Link>
          <button aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="magnetic grid h-10 w-10 place-items-center rounded-full border border-white/15">
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button aria-label="Open wishlist drawer" onClick={onCart} className="magnetic relative grid h-10 w-10 place-items-center rounded-full border border-white/15">
            <ShoppingBag size={17} />
            {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-signal text-[10px] font-black text-black">{cartCount}</span>}
          </button>
          <button aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)} className="magnetic grid h-10 w-10 place-items-center rounded-full bg-white text-black">
            <Menu size={18} />
          </button>
        </div>
      </nav>
    </header>
  );
}

function FullScreenMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[80] bg-obsidian px-6 py-8">
      <button aria-label="Close menu" onClick={onClose} className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white text-black">
        <X />
      </button>
      <div className="mx-auto flex h-full max-w-6xl flex-col justify-end pb-12">
        {[...navItems, { label: "Reviews", href: "/reviews" }, { label: "Contact", href: "/contact" }].map((item, index) => (
          <Link onClick={onClose} key={item.href} href={item.href} className="border-t border-white/10 py-4 text-4xl font-black uppercase tracking-normal text-white transition hover:pl-4 hover:text-signal md:text-7xl">
            <span className="mr-4 text-xs text-white/35 md:text-sm">0{index + 1}</span>
            {item.label}
          </Link>
        ))}
        <div className="mt-8 flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.16em]">
          <Link href={store.phoneHref} className="rounded-full bg-white px-5 py-3 text-black">
            Call {store.phoneNumber}
          </Link>
          <Link href={whatsappHref("Hi Play Off, I want to check the latest collection.")} className="rounded-full bg-signal px-5 py-3 text-black">
            WhatsApp
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function Hero({ heroY }: { heroY: MotionValue<number> }) {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 pt-32">
      <div className="ambient-splash left-[6%] top-[18%] h-36 w-36 bg-signal" />
      <div className="ambient-splash bottom-[18%] right-[8%] h-48 w-48 bg-ember [animation-delay:1.8s]" />
      <motion.div style={{ y: heroY }} className="absolute inset-0">
        <Image src={visualImages[0]} alt="Cinematic streetwear editorial" fill priority className="object-cover object-[62%_center] opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/38 via-black/58 to-obsidian" />
      </motion.div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-end pb-12">
        <div className="gsap-reveal mb-6 flex flex-wrap gap-3">
          <Badge label="Public rating 4.1 / 7 ratings" />
          <Badge label="Since 2017" />
          <Badge label="Kattigenahalli, Yelahanka" />
        </div>
        <div className="max-w-6xl">
          <p className="gsap-reveal mb-4 text-sm font-semibold uppercase tracking-[0.34em] text-signal">{store.tagline}</p>
          <h1 className="gsap-reveal text-balance text-[clamp(3.4rem,13vw,10rem)] font-black uppercase leading-[0.83] tracking-normal text-white">
            {heroLines[0]}
          </h1>
          <p className="gsap-reveal mt-7 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
            A Bengaluru streetwear destination reimagined as a premium fashion universe: denim, tees, shoes, jerseys, jackets and everyday confidence curated in-store.
          </p>
          <div className="gsap-reveal mt-9 flex flex-wrap gap-3">
            <PrimaryCta href="#shop">Explore Collection</PrimaryCta>
            <SecondaryCta href={store.mapsUrl}>Visit Store</SecondaryCta>
            <SecondaryCta href={whatsappHref("Hi Play Off, I want to check the latest trending collection.")}>WhatsApp Now</SecondaryCta>
            <SecondaryCta href={store.phoneHref}>Call {store.phoneNumber}</SecondaryCta>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ label }: { label: string }) {
  return <span className="rounded-full border border-white/18 bg-white/8 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/80 backdrop-blur md:px-4 md:text-xs">{label}</span>;
}

function PrimaryCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="magnetic luxe-glow inline-flex items-center gap-3 rounded-full bg-signal px-5 py-4 text-xs font-black uppercase tracking-[0.15em] text-black md:px-6 md:text-sm">
      {children} <ArrowRight size={17} />
    </Link>
  );
}

function SecondaryCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="magnetic luxe-glow inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-4 text-xs font-black uppercase tracking-[0.15em] text-white backdrop-blur hover:border-signal md:px-6 md:text-sm">
      {children}
    </Link>
  );
}

function ProofMarquee() {
  const items = ["Jeans", "Shoes", "T-Shirts", "Sportswear", "Shirts", "Jerseys", "Jackets", "Varsity Jackets", "Bagalur Main Road", "Open until 10:30 pm"];
  return (
    <section className="overflow-hidden border-y border-white/10 bg-white/[0.03] py-5">
      <div className="marquee-track flex w-max gap-8 text-sm font-black uppercase tracking-[0.28em] text-white/70">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            {item}
            <Sparkles className="text-signal" size={15} />
          </span>
        ))}
      </div>
    </section>
  );
}

function SectionIntro({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="mx-auto mb-12 max-w-7xl px-4">
      <p className="text-xs font-black uppercase tracking-[0.34em] text-signal">{kicker}</p>
      <h2 className="mt-4 max-w-5xl text-4xl font-black uppercase leading-none tracking-normal md:text-7xl">{title}</h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">{body}</p>
    </div>
  );
}

function CollectionsSection() {
  const collectionVisuals = [img6, img10, img11, img8];
  return (
    <section id="collections" className="py-24">
      <SectionIntro kicker="Featured Collections" title="Built for the outfit before the entrance." body="High-intent shopping paths designed around identity: campus, night, sneaker-first, matchday, and premium casual." />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-4">
        {collections.map((item, index) => (
          <motion.article whileHover={{ y: -8 }} key={item.title} className={cn("luxe-glow group relative min-h-[360px] overflow-hidden rounded-[8px] border border-white/10 md:min-h-[460px]", index === 0 && "md:col-span-2")}>
            <Image src={collectionVisuals[index] ?? item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/22 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-black">{item.tag}</span>
              <h3 className="mt-4 text-3xl font-black uppercase">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{item.mood}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ShopSection({ query, setQuery, filtered, wishlist, toggleWishlist }: ShopSectionProps) {
  return (
    <section id="shop" className="bg-white/[0.035] py-24">
      <SectionIntro kicker="Trending Now" title="A premium shopping cockpit, tuned for desire." body="Search, filter mentally, save favorites, and send a direct inquiry. Prices are intentionally inquiry-led because local inventory moves fast." />
      <div className="mx-auto max-w-7xl px-4">
        <div className="glass mb-6 flex items-center gap-3 rounded-full px-5 py-4">
          <Search size={19} className="text-signal" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tees, sneakers, denim, jerseys..." className="w-full bg-transparent text-sm outline-none placeholder:text-white/36" />
          <span className="hidden text-xs font-black uppercase tracking-[0.2em] text-white/40 md:block">AI style radar</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {filtered.map((product, index) => (
            <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -6 }} transition={{ delay: index * 0.04 }} key={product.name} className="spotlight luxe-glow rounded-[8px] border border-white/10 p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-black">
                <Image src={product.image} alt={product.name} fill className="object-cover opacity-90 transition duration-700 hover:scale-105" />
                <button aria-label={`Save ${product.name}`} onClick={() => toggleWishlist(product.name)} className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-black/60 backdrop-blur">
                  <Heart size={18} className={wishlist.includes(product.name) ? "fill-signal text-signal" : "text-white"} />
                </button>
              </div>
              <div className="pt-5">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-signal">{product.badge}</span>
                <h3 className="mt-2 text-2xl font-black uppercase">{product.name}</h3>
                <p className="mt-2 text-sm text-white/58">{product.category} / {product.price}</p>
                <Link href={whatsappHref(`Hi Play Off, is ${product.name} available today?`)} className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-white">
                  Ask availability <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LookbookSection() {
  return (
    <section id="lookbook" className="py-24">
      <SectionIntro kicker="Lookbook" title="Editorial scenes for the local fashion moment." body="The site sells the feeling first: confidence, status, belonging, and the anticipation of walking into the store." />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-12">
        {[img1, img3, img7, img9, img5].map((image, index) => (
          <motion.div key={image.src} whileHover={{ scale: 0.985 }} className={cn("luxe-glow relative min-h-[330px] overflow-hidden rounded-[8px] border border-white/10", index === 0 && "md:col-span-7 md:min-h-[620px]", index === 1 && "md:col-span-5", index > 1 && "md:col-span-4")}>
            <Image src={image} alt={`Play Off editorial look ${index + 1}`} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 to-transparent" />
            <div className="absolute bottom-5 left-5 text-xs font-black uppercase tracking-[0.24em] text-white/70">Look 0{index + 1}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function StoreSection() {
  return (
    <section id="visit" className="bg-white/[0.035] py-24">
      <SectionIntro kicker="Premium Store Experience" title="Local address. Global-level first impression." body="Real listing data grounds the brand in Yelahanka while the digital layer elevates the perceived value of every rack, drop, and visit." />
      <div className="mx-auto grid max-w-7xl gap-5 px-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass luxe-glow rounded-[8px] p-6 md:p-8">
          <MapPin className="mb-6 text-signal" />
          <h3 className="text-3xl font-black uppercase">Visit Play Off</h3>
          <p className="mt-4 text-white/68">{store.address}</p>
          <div className="mt-8 grid gap-3 text-sm">
            <InfoLine label="Call / WhatsApp" value={store.phoneNumber} />
            <InfoLine label="Hours" value={store.hours} />
            <InfoLine label="Established" value={store.established} />
            <InfoLine label="Payments" value={store.payments.join(", ")} />
            <InfoLine label="Public rating" value={`${store.rating} from ${store.ratingCount}`} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryCta href={store.mapsUrl}>Open Maps</PrimaryCta>
            <SecondaryCta href={store.phoneHref}>Call Store</SecondaryCta>
            <SecondaryCta href={whatsappHref("Hi Play Off, I want directions and today’s trending arrivals.")}>Plan Visit</SecondaryCta>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-2">
            {[img1, img2, img5].map((image, index) => (
              <div key={image.src} className="relative aspect-square overflow-hidden rounded-[6px] border border-white/10">
                <Image src={image} alt={`Play Off store proof ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-[8px] border border-white/10 bg-black">
          <iframe
            title="Play Off store map"
            src="https://www.google.com/maps?q=Dwarakanagar%2C%20Bagalur%20Main%20Road%2C%20Near%20SBI%2C%20Dwarakanagar%20IAF%20Post%20Yelahanka%2C%20Kattigenahalli%2C%20Bengaluru%20560063&output=embed"
            className="h-[520px] w-full grayscale"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
      <span className="text-white/42">{label}</span>
      <span className="max-w-[65%] text-right font-semibold text-white/82">{value}</span>
    </div>
  );
}

function ReviewsSection() {
  return (
    <section className="py-24">
      <SectionIntro kicker="Trust" title="Proof without pretending." body="The public listing confirms a 4.1 rating across 7 ratings. Review text was not publicly accessible during build, so the site highlights verified signals instead of fabricated testimonials." />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-3">
        {["4.1 public rating", "8 years in business", "Listed across fashion categories"].map((item, index) => (
          <div key={item} className="glass rounded-[8px] p-8">
            <Star className="mb-8 fill-signal text-signal" />
            <h3 className="text-4xl font-black uppercase">{item}</h3>
            <p className="mt-4 text-sm leading-6 text-white/58">
              {index === 0 ? "Based on 7 public ratings across the listing source." : index === 1 ? "Established in 2017 according to the public listing." : "Shoes, T-shirts, jeans, sportswear, shirts, jerseys, jackets and varsity jackets."}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function JournalSection() {
  return (
    <section className="bg-white/[0.035] py-24">
      <SectionIntro kicker="Style Journal" title="Fashion content that makes the brand feel alive." body="Editorial topics designed for SEO, social distribution, and repeat visits from the Bengaluru fashion community." />
      <div className="mx-auto max-w-7xl px-4">
        {journal.map((title, index) => (
          <Link href="/style-journal" key={title} className="group flex items-center justify-between border-t border-white/10 py-7 last:border-b">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.24em] text-signal">Journal 0{index + 1}</span>
              <h3 className="mt-2 text-2xl font-black uppercase transition group-hover:text-signal md:text-4xl">{title}</h3>
            </div>
            <ArrowRight className="shrink-0 transition group-hover:translate-x-2" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    ["Do you sell ripped jeans?", "Public listing FAQ says ripped jeans may be available depending on stock."],
    ["Can I buy jeans in bulk?", "The public listing mentions better deals for bulk purchases."],
    ["Can designs be customized?", "The listing says customization may be possible for large orders. Confirm directly with the store."],
    ["Where is Play Off located?", store.address]
  ];
  return (
    <section className="py-24">
      <SectionIntro kicker="FAQ" title="Fast answers for high-intent visitors." body="Conversion-oriented answers keep people moving toward a visit, a WhatsApp inquiry, or a map open." />
      <div className="mx-auto max-w-5xl px-4">
        {faqs.map(([question, answer]) => (
          <details key={question} className="group border-t border-white/10 py-6 last:border-b">
            <summary className="cursor-pointer list-none text-2xl font-black uppercase">{question}</summary>
            <p className="mt-4 max-w-3xl leading-7 text-white/62">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="px-4 pb-32">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[8px] border border-white/10 bg-white text-black">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="p-8 md:p-14">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-black/50">Conversion Suite</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-none sm:text-5xl md:text-7xl">Your next fit starts here.</h2>
            <p className="mt-5 max-w-xl text-black/62">Ask for today&apos;s arrivals, save a look, call the store, get directions, or walk in before 10:30 pm. The fastest path is WhatsApp or Maps.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={whatsappHref("Hi Play Off, show me today's premium streetwear arrivals.")} className="magnetic inline-flex items-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white">
                WhatsApp Now <Zap size={17} />
              </Link>
              <Link href={store.phoneHref} className="magnetic inline-flex items-center gap-3 rounded-full border border-black/15 px-6 py-4 text-sm font-black uppercase tracking-[0.18em]">
                <Phone size={17} /> {store.phoneNumber}
              </Link>
              <Link href={store.mapsUrl} className="magnetic inline-flex items-center gap-3 rounded-full border border-black/15 px-6 py-4 text-sm font-black uppercase tracking-[0.18em]">
                Get Directions
              </Link>
            </div>
          </div>
          <div className="relative min-h-[420px]">
            <Image src={img1} alt="Play Off storefront contact visual" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "Trending", href: "/trending" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "Reviews", href: "/reviews" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-4 pb-32 pt-16 md:pb-36">
      <div className="ambient-splash bottom-10 left-8 h-40 w-40 bg-signal" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="sheen grid h-12 w-12 place-items-center rounded-full bg-white text-sm font-black text-black">PO</span>
              <div>
                <h2 className="text-xl font-black uppercase tracking-[0.24em]">Play Off</h2>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-signal">Update Your Trend</p>
              </div>
            </div>
            <p className="mt-6 max-w-xl leading-7 text-white/62">
              A premium streetwear and lifestyle store in Kattigenahalli, Yelahanka, Bengaluru. Jeans, sneakers, tees, sportswear, shirts, jerseys, jackets and accessories with a sharper local fashion pulse.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {localImages.slice(0, 5).map((image, index) => (
                <div key={image.src} className="relative h-16 w-16 overflow-hidden rounded-[6px] border border-white/10">
                  <Image src={image} alt={`Play Off footer preview ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.24em] text-signal">Explore</h3>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-semibold text-white/68">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-signal">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.24em] text-signal">Visit / Contact</h3>
            <div className="mt-5 space-y-4 text-sm leading-6 text-white/66">
              <p>{store.address}</p>
              <p>{store.hours}</p>
              <Link href={store.phoneHref} className="inline-flex items-center gap-2 font-black text-white transition hover:text-signal">
                <Phone size={16} /> {store.phoneNumber}
              </Link>
              <div className="flex flex-wrap gap-2 pt-2">
                <Link href={whatsappHref("Hi Play Off, I found your website and want to check today's collection.")} className="rounded-full bg-signal px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-black">
                  WhatsApp
                </Link>
                <Link href={store.mapsUrl} className="rounded-full border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white">
                  Maps
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/42 md:flex-row md:items-center md:justify-between">
          <p>Copyright © 2026 Play Off. All rights reserved.</p>
          <p>Crafted with ❤️ in Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 hidden flex-col gap-2 md:flex">
        <Link aria-label={`Call Play Off ${store.phoneNumber}`} href={store.phoneHref} className="grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-glow">
          <Phone size={20} />
        </Link>
        <Link aria-label="WhatsApp Play Off" href={whatsappHref("Hi Play Off, I want to visit and check the latest collection.")} className="grid h-14 w-14 place-items-center rounded-full bg-signal text-black shadow-glow">
          <Zap size={20} />
        </Link>
        <Link aria-label="Open Play Off maps" href={store.mapsUrl} className="grid h-14 w-14 place-items-center rounded-full bg-white text-black">
          <MapPin size={20} />
        </Link>
      </div>
      <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 md:hidden">
        <Link href={store.phoneHref} className="rounded-full bg-white py-4 text-center text-[10px] font-black uppercase tracking-[0.12em] text-black">
          Call
        </Link>
        <Link href={whatsappHref("Hi Play Off, what is trending today?")} className="rounded-full bg-signal py-4 text-center text-[10px] font-black uppercase tracking-[0.12em] text-black">
          WhatsApp
        </Link>
        <Link href={store.mapsUrl} className="rounded-full bg-white py-4 text-center text-[10px] font-black uppercase tracking-[0.12em] text-black">
          Visit
        </Link>
      </div>
    </>
  );
}

function CartDrawer({ open, onClose, items }: { open: boolean; onClose: () => void; items: string[] }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.45 }} className="fixed bottom-0 right-0 top-0 z-[90] w-full max-w-md bg-obsidian p-6 shadow-luxe">
          <button aria-label="Close drawer" onClick={onClose} className="mb-8 grid h-11 w-11 place-items-center rounded-full bg-white text-black">
            <X />
          </button>
          <h2 className="text-4xl font-black uppercase">Saved Looks</h2>
          <p className="mt-3 text-sm text-white/58">Wishlist converts into an inquiry cart for local inventory.</p>
          <div className="mt-8 space-y-3">
            {items.length === 0 ? <p className="text-white/45">No saved looks yet.</p> : items.map((item) => <div key={item} className="rounded-[8px] border border-white/10 p-4 font-bold">{item}</div>)}
          </div>
          <Link href={whatsappHref(`Hi Play Off, I saved these looks: ${items.join(", ") || "show me your trending collection"}.`)} className="mt-8 flex justify-center rounded-full bg-signal px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-black">
            Send Inquiry
          </Link>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function ExitPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[95] grid place-items-center bg-black/70 px-4 backdrop-blur">
          <motion.div initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.96 }} className="relative max-w-lg rounded-[8px] bg-white p-8 text-black">
            <button aria-label="Close popup" onClick={onClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black text-white">
              <X size={16} />
            </button>
            <BadgeCheck className="mb-6 text-black" />
            <h3 className="text-4xl font-black uppercase leading-none">Before you bounce, catch today’s drop.</h3>
            <p className="mt-4 text-black/62">Send a one-tap inquiry and ask what is trending in-store right now.</p>
            <Link href={whatsappHref("Hi Play Off, what are today’s limited drops and trending fits?")} className="mt-7 inline-flex rounded-full bg-black px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white">
              Ask on WhatsApp
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
