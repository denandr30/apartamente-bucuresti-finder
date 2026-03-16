import { useMemo, useState } from "react";
import { Home, MapPin, Train, Bath, Ruler, Calendar, Building2, Heart, Search, X, Map, Bell, CheckCircle2, Shield, Layers3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const preferredZones = [
  "Lujerului",
  "Virtuții",
  "Uverturii",
  "Dreptății",
  "Gorjului",
  "Militari",
  "Timișoara",
  "Parcul Drumul Taberei",
  "Auchan Drumul Taberei",
  "Tineretului",
  "Timpuri Noi",
  "Crângași",
  "Tei",
  "Giurgiului",
  "Cotroceni",
  "Aviatorilor",
  "Aviației",
  "Dristor",
  "Unirii",
];

const excludedZones = [
  "Păcii",
  "Preciziei",
  "Militari Residence",
  "Titan",
  "Berceni",
  "Tudor Arghezi",
  "Rahova",
  "Ferentari",
  "Colentina",
  "Ghencea",
  "Gara de Nord",
];

const premiumFilters = [
  "exclude blocuri cu risc seismic / urgență dacă informația există",
  "penalizare pentru apartamente prea aproape de bulevarde mari",
  "scor mai bun pentru străzi secundare, mai liniștite",
  "prioritate pentru acces rapid la metrou sau transport",
  "marcare separată pentru blocuri mai bine întreținute",
];

const sourceCoverage = [
  { name: "Imobiliare.ro", type: "portal mare", status: "integrabil" },
  { name: "Storia", type: "portal mare", status: "integrabil" },
  { name: "OLX Imobiliare", type: "portal mare", status: "integrabil" },
  { name: "HomeZZ", type: "portal mare", status: "integrabil" },
  { name: "Publi24", type: "portal mare", status: "integrabil" },
  { name: "Anunțul", type: "anunțuri", status: "integrabil" },
  { name: "Agenții mici", type: "site-uri individuale", status: "parțial / etapizat" },
  { name: "Facebook Marketplace & grupuri", type: "surse limitate", status: "manual / instabil" },
];

const mapZones = [
  { name: "Militari preferat", left: "18%", top: "58%", width: "26%", height: "26%" },
  { name: "Crângași", left: "28%", top: "26%", width: "10%", height: "12%" },
  { name: "Aviatorilor / Aviației", left: "43%", top: "18%", width: "16%", height: "18%" },
  { name: "Timpuri Noi / Tineretului", left: "53%", top: "66%", width: "12%", height: "12%" },
];

const appMeta = {
  name: "Radar Apartamente București",
  subtitle: "finder personalizat pentru apartamente care chiar se potrivesc",
  version: "deploy-ready preview",
};

const roadmap = [
  "connect real listing sources and agency websites",
  "deduplicate repeated apartments across portals",
  "save favorites and notes for each property",
  "add real Google Maps pins from listing coordinates",
  "add alerts for new apartments that match your filters",
];

const listings = [
  {
    id: 0,
    title: "3 camere Virtuții, 71 mp, 2 băi, termopane, vedere retrasă",
    source: "Imobiliare.ro",
    sourceUrl: "#",
    zone: "Virtuții",
    price: 168500,
    size: 71,
    rooms: 3,
    bathrooms: 2,
    year: 1989,
    floor: "2/8",
    walkMin: 8,
    lastFloorOk: true,
    compartmentation: "Decomandat",
    bathroomStyle: "modernă neutră",
    kitchenStyle: "îngrijită, luminoasă",
    roomCondition: "camere curate, bine proporționate",
    thermopane: true,
    quietBedroom: true,
    fridgeOnHall: false,
    score: 97,
    status: "Foarte potrivit",
    notes: ["termopane", "dormitor ferit de bulevard", "bucătărie aspect plăcut", "baie modernă în tonuri neutre"],
  },
  {
    id: 1,
    title: "3 camere decomandat, Lujerului, 72 mp, 2 băi",
    source: "Storia",
    sourceUrl: "#",
    zone: "Lujerului",
    price: 164900,
    size: 72,
    rooms: 3,
    bathrooms: 2,
    year: 1988,
    floor: "3/8",
    walkMin: 6,
    lastFloorOk: true,
    compartmentation: "Decomandat",
    bathroomStyle: "neutră",
    kitchenStyle: "îngrijită",
    roomCondition: "camere ok",
    thermopane: true,
    quietBedroom: true,
    fridgeOnHall: false,
    score: 96,
    status: "Foarte potrivit",
    notes: ["aproape de metrou", "2 băi", "nu este ultimul etaj", "baie în tonuri neutre"],
  },
  {
    id: 2,
    title: "3 camere Timpuri Noi, 68 mp, bloc 1990, 2 băi",
    source: "OLX Imobiliare",
    sourceUrl: "#",
    zone: "Timpuri Noi",
    price: 169500,
    size: 68,
    rooms: 3,
    bathrooms: 2,
    year: 1990,
    floor: "4/4",
    walkMin: 9,
    lastFloorOk: true,
    compartmentation: "Decomandat",
    bathroomStyle: "neutră",
    kitchenStyle: "îngrijită",
    roomCondition: "camere ok",
    thermopane: true,
    quietBedroom: true,
    fridgeOnHall: false,
    score: 91,
    status: "Potrivit",
    notes: ["4 din 4 acceptat", "2 băi", "în buget", "transport aproape"],
  },
  {
    id: 3,
    title: "3 camere Cotroceni, 70 mp, bloc 1986",
    source: "Agenție mică",
    sourceUrl: "#",
    zone: "Cotroceni",
    price: 170000,
    size: 70,
    rooms: 3,
    bathrooms: 2,
    year: 1986,
    floor: "2/6",
    walkMin: 12,
    lastFloorOk: true,
    compartmentation: "Decomandat",
    bathroomStyle: "neutră",
    kitchenStyle: "îngrijită",
    roomCondition: "camere ok",
    thermopane: true,
    quietBedroom: true,
    fridgeOnHall: false,
    score: 94,
    status: "Foarte potrivit",
    notes: ["zonă foarte bună", "decomandat", "suprafață bună", "sub 15 min de transport"],
  },
  {
    id: 4,
    title: "3 camere Dristor, 66 mp, 2 băi, bloc 1985",
    source: "HomeZZ",
    sourceUrl: "#",
    zone: "Dristor",
    price: 158000,
    size: 66,
    rooms: 3,
    bathrooms: 2,
    year: 1985,
    floor: "8/8",
    walkMin: 7,
    lastFloorOk: false,
    compartmentation: "Decomandat",
    bathroomStyle: "neutră",
    kitchenStyle: "îngrijită",
    roomCondition: "camere ok",
    thermopane: true,
    quietBedroom: true,
    fridgeOnHall: false,
    score: 58,
    status: "Respins automat",
    notes: ["ultimul etaj peste 4 niveluri"],
  },
  {
    id: 5,
    title: "3 camere Aviatiei, 74 mp, 2 băi, bloc 1992",
    source: "Publi24",
    sourceUrl: "#",
    zone: "Aviației",
    price: 176000,
    size: 74,
    rooms: 3,
    bathrooms: 2,
    year: 1992,
    floor: "5/10",
    walkMin: 10,
    lastFloorOk: true,
    compartmentation: "Decomandat",
    bathroomStyle: "neutră",
    kitchenStyle: "îngrijită",
    roomCondition: "camere ok",
    thermopane: true,
    quietBedroom: true,
    fridgeOnHall: false,
    score: 72,
    status: "Aproape potrivit",
    notes: ["depășește puțin bugetul", "restul criteriilor sunt bune"],
  },
  {
    id: 6,
    title: "3 camere Unirii, 69 mp, bloc 1987, 2 băi",
    source: "Anunțul",
    sourceUrl: "#",
    zone: "Unirii",
    price: 167500,
    size: 69,
    rooms: 3,
    bathrooms: 2,
    year: 1987,
    floor: "6/8",
    walkMin: 11,
    lastFloorOk: true,
    compartmentation: "Decomandat",
    bathroomStyle: "neutră",
    kitchenStyle: "îngrijită",
    roomCondition: "camere ok",
    thermopane: true,
    quietBedroom: true,
    fridgeOnHall: false,
    score: 93,
    status: "Foarte potrivit",
    notes: ["central", "în buget", "2 băi", "decomandat"],
  },
];

function scoreColor(score) {
  if (score >= 90) return "bg-emerald-500";
  if (score >= 75) return "bg-amber-500";
  return "bg-rose-500";
}

export default function SitePreview() {
  const [search, setSearch] = useState("");
  const [showRejected, setShowRejected] = useState(false);
  const [mapOnlyTopMatches, setMapOnlyTopMatches] = useState(true);

  const visibleListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.zone.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (!showRejected && item.status === "Respins automat") return false;
      return true;
    });
  }, [search, showRejected]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div>
            <div className="text-lg font-semibold tracking-tight">{appMeta.name}</div>
            <div className="text-sm text-slate-500">{appMeta.subtitle}</div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1">{appMeta.version}</Badge>
            <Button className="rounded-2xl">Publică pe Vercel</Button>
          </div>
        </div>
      </header>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-4 py-1 text-sm font-medium text-rose-700 mb-4">
                Finder personalizat pentru apartamente în București
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Apartamente care trec prin filtrele tale reale, nu doar prin cele de pe site-uri.
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mb-6">
                Am transformat criteriile tale într-un panou unic: buget, zone, excluderi, etaj, an, suprafață, transport,
                2 băi, termopane, dormitor ferit de bulevarde mari, baie și bucătărie cu aspect plăcut și verificări vizuale din poze.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl">Vezi apartamente potrivite</Button>
                <Button variant="outline" className="rounded-2xl">Editează filtrele</Button>
              </div>
            </div>

            <Card className="rounded-3xl border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Home className="h-5 w-5" /> Profilul tău de căutare
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4"><div className="text-slate-500">Buget max</div><div className="text-lg font-semibold">170.000 €</div></div>
                  <div className="rounded-2xl bg-slate-50 p-4"><div className="text-slate-500">Configurație</div><div className="text-lg font-semibold">3 camere</div></div>
                  <div className="rounded-2xl bg-slate-50 p-4"><div className="text-slate-500">Suprafață minimă</div><div className="text-lg font-semibold">65 mp</div></div>
                  <div className="rounded-2xl bg-slate-50 p-4"><div className="text-slate-500">An minim</div><div className="text-lg font-semibold">1985</div></div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-slate-500 mb-2">Condiții esențiale</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Doar București",
                      "Decomandat 100%",
                      "2 băi",
                      "max 15 min transport",
                      "fără ultimul etaj",
                      "4/4 acceptat",
                      "frigiderul să nu fie pe hol",
                      "baie neutră, netipătoare",
                      "termopane",
                      "dormitor fără vedere la bulevard mare",
                      "bucătărie și camere să arate bine",
                    ].map((item) => (
                      <Badge key={item} variant="secondary" className="rounded-full px-3 py-1">{item}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Map view for apartments */}
        <Card className="rounded-3xl border-none shadow-sm mb-8 overflow-hidden">
          <CardHeader>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Hartă apartamente (București)
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={mapOnlyTopMatches ? "default" : "outline"}
                  className="rounded-2xl"
                  onClick={() => setMapOnlyTopMatches(true)}
                >
                  Doar potrivite
                </Button>
                <Button
                  variant={!mapOnlyTopMatches ? "default" : "outline"}
                  className="rounded-2xl"
                  onClick={() => setMapOnlyTopMatches(false)}
                >
                  Toate pe hartă
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-[460px] bg-slate-200 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.6),transparent_20%),linear-gradient(135deg,#dbeafe_0%,#e2e8f0_35%,#f8fafc_100%)]" />
              <div className="absolute inset-0 opacity-70">
                <div className="absolute left-[12%] top-[18%] h-[3px] w-[34%] rotate-[18deg] bg-slate-400/70" />
                <div className="absolute left-[22%] top-[54%] h-[4px] w-[42%] rotate-[-6deg] bg-slate-500/70" />
                <div className="absolute left-[48%] top-[22%] h-[3px] w-[26%] rotate-[78deg] bg-slate-400/70" />
                <div className="absolute left-[58%] top-[14%] h-[3px] w-[22%] rotate-[28deg] bg-slate-400/70" />
                <div className="absolute left-[62%] top-[58%] h-[3px] w-[20%] rotate-[-18deg] bg-slate-400/70" />
                <div className="absolute left-[6%] top-[40%] h-[140px] w-[140px] rounded-full bg-sky-300/55 blur-[1px]" />
                <div className="absolute left-[70%] top-[10%] h-[90px] w-[160px] rounded-[40%] bg-emerald-200/50" />
                <div className="absolute left-[14%] top-[70%] h-[70px] w-[120px] rounded-[40%] bg-emerald-200/45" />
                <div className="absolute left-[54%] top-[76%] h-[80px] w-[90px] rounded-[40%] bg-emerald-200/45" />
              </div>

              <div className="absolute inset-0 pointer-events-none">
                {mapZones.map((zone) => (
                  <div
                    key={zone.name}
                    className="absolute rounded-full border-4 border-rose-500/80 bg-rose-200/10"
                    style={{ left: zone.left, top: zone.top, width: zone.width, height: zone.height }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-slate-700 shadow">
                      {zone.name}
                    </div>
                  </div>
                ))}

                {(mapOnlyTopMatches ? listings.filter((x) => x.score >= 90) : listings).map((item, index) => {
                  const pinPositions = [
                    { left: "27%", top: "52%" },
                    { left: "24%", top: "34%" },
                    { left: "57%", top: "71%" },
                    { left: "36%", top: "30%" },
                    { left: "66%", top: "24%" },
                    { left: "60%", top: "56%" },
                    { left: "70%", top: "60%" },
                  ];
                  const pin = pinPositions[index % pinPositions.length];
                  const pinBg = item.score >= 90 ? "bg-emerald-600" : item.score >= 70 ? "bg-amber-500" : "bg-rose-500";

                  return (
                    <div
                      key={item.id}
                      className="absolute"
                      style={{ left: pin.left, top: pin.top }}
                    >
                      <div className={`pointer-events-auto flex items-center gap-2 rounded-full ${pinBg} px-3 py-2 text-xs font-semibold text-white shadow-lg`}>
                        <MapPin className="h-3.5 w-3.5 fill-white" />
                        {item.zone} · {item.price.toLocaleString("ro-RO")}€
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="absolute right-4 top-4 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur pointer-events-auto max-w-xs">
                <div className="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  Demo map in canvas. Real Google Maps can be added later in the deployable version.
                </div>
                <div className="text-sm font-semibold text-slate-900 mb-2">Legenda hărții</div>
                <div className="grid gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-600" /> foarte potrivit</div>
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-500" /> aproape potrivit</div>
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-500" /> respins / slab potrivit</div>
                  <div className="pt-2 text-slate-500">Cercurile roșii marchează zonele tale preferate.</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Card className="rounded-3xl border-none shadow-sm h-fit">
            <CardHeader>
              <CardTitle>Filtre salvate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-sm font-medium text-slate-700 mb-3">Caută în rezultate</div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Ex. Lujerului, Unirii, Cotroceni"
                    className="pl-9 rounded-2xl"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-slate-700 mb-3">Zone preferate</div>
                <div className="flex flex-wrap gap-2">
                  {preferredZones.map((zone) => (
                    <Badge key={zone} className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200">
                      {zone}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-slate-700 mb-3">Zone excluse</div>
                <div className="flex flex-wrap gap-2">
                  {excludedZones.map((zone) => (
                    <Badge key={zone} className="rounded-full bg-rose-50 text-rose-700 hover:bg-rose-50 border border-rose-200">
                      <X className="h-3 w-3 mr-1" /> {zone}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm font-medium text-slate-700 mb-2">Afișare rezultate</div>
                <Button
                  variant={showRejected ? "default" : "outline"}
                  className="w-full rounded-2xl"
                  onClick={() => setShowRejected((v) => !v)}
                >
                  {showRejected ? "Ascunde respinsele automat" : "Arată și respinsele automat"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-3xl border-none shadow-sm">
              <CardHeader>
                <CardTitle>Build roadmap</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-slate-600">
                {roadmap.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />
                    <div>{item}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="rounded-3xl border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Layers3 className="h-5 w-5" /> Surse urmărite</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 text-sm">
                  {sourceCoverage.map((source) => (
                    <div key={source.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <div>
                        <div className="font-medium text-slate-900">{source.name}</div>
                        <div className="text-slate-500">{source.type}</div>
                      </div>
                      <Badge variant="secondary" className="rounded-full">{source.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Radarul tău imobiliar</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 text-sm text-slate-600">
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"><CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" /><div>deduplicare: același apartament apărut pe mai multe site-uri va fi afișat o singură dată</div></div>
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"><Map className="h-5 w-5 text-rose-600 mt-0.5" /><div>scor de zonă + scor de liniște, inclusiv excludere pentru dormitoare orientate spre bulevarde mari</div></div>
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"><Bell className="h-5 w-5 text-amber-600 mt-0.5" /><div>alerte pentru anunțuri noi care intră în filtrele tale și au scor mare</div></div>
                </CardContent>
              </Card>
            </div>
            <Card className="rounded-3xl border-none shadow-sm">
              <CardHeader>
                <CardTitle>Filtru premium pentru București</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-slate-600">
                {premiumFilters.map((filter) => (
                  <div key={filter} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <Shield className="h-4 w-4 text-rose-600 mt-0.5" />
                    <div>{filter}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="rounded-3xl border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-500">Rezultate foarte potrivite</div>
                  <div className="text-3xl font-bold mt-1">{listings.filter((x) => x.score >= 90).length}</div>
                </CardContent>
              </Card>
              <Card className="rounded-3xl border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-500">Aproape potrivite</div>
                  <div className="text-3xl font-bold mt-1">{listings.filter((x) => x.score >= 70 && x.score < 90).length}</div>
                </CardContent>
              </Card>
              <Card className="rounded-3xl border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-500">Respinse automat</div>
                  <div className="text-3xl font-bold mt-1">{listings.filter((x) => x.status === "Respins automat").length}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-3xl border-none shadow-sm">
              <CardHeader>
                <CardTitle>Logică de filtrare suplimentară</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-slate-600">
                <div>• excludere automată pentru ultimul etaj în blocuri cu peste 4 etaje</div>
                <div>• acceptare explicită pentru 4 din 4</div>
                <div>• validare vizuală din poze pentru baie în tonuri neutre și aspect îngrijit</div>
                <div>• validare vizuală pentru bucătărie plăcută și camere în stare bună</div>
                <div>• validare: termopane prezente</div>
                <div>• excludere pentru dormitor cu vedere directă spre bulevard mare, cu trafic intens</div>
                <div>• validare vizuală: frigiderul să nu fie pe hol</div>
                <div>• zone preferate și zone excluse chiar dacă site-ul sursă nu le filtrează bine</div>
              </CardContent>
            </Card>

            <div className="grid gap-5">
              {visibleListings.map((item) => (
                <Card key={item.id} className="rounded-3xl border-none shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[260px_1fr]">
                      <div className="bg-gradient-to-br from-slate-200 via-slate-100 to-white min-h-[220px] flex items-center justify-center">
                        <div className="text-center p-6">
                          <Building2 className="h-10 w-10 mx-auto text-slate-500 mb-3" />
                          <div className="text-sm text-slate-500">Preview apartament</div>
                          <div className="font-medium">{item.zone}</div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge variant="outline" className="rounded-full">{item.source}</Badge>
                              <Badge className="rounded-full bg-slate-900">{item.status}</Badge>
                              <Badge variant="secondary" className="rounded-full">Scor {item.score}/100</Badge>
                            </div>
                            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                            <div className="text-2xl font-bold">{item.price.toLocaleString("ro-RO")} €</div>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild variant="outline" className="rounded-2xl">
                              <a href={item.sourceUrl}>Vezi anunțul original</a>
                            </Button>
                            <Button variant="outline" className="rounded-2xl"><Heart className="h-4 w-4 mr-2" /> Salvează</Button>
                          </div>
                        </div>

                        <div className="mt-5 mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-500">Compatibilitate cu filtrele tale</span>
                            <span className="font-medium">{item.score}%</span>
                          </div>
                          <Progress value={item.score} className="h-2" indicatorClassName={scoreColor(item.score)} />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 text-sm text-slate-700">
                          <div className="flex items-center gap-2"><Ruler className="h-4 w-4" /> {item.size} mp</div>
                          <div className="flex items-center gap-2"><Bath className="h-4 w-4" /> {item.bathrooms} băi</div>
                          <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {item.year}</div>
                          <div className="flex items-center gap-2"><Train className="h-4 w-4" /> {item.walkMin} min transport</div>
                          <div className="flex items-center gap-2"><Home className="h-4 w-4" /> {item.floor}</div>
                          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {item.zone}</div>
                          <div className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {item.compartmentation}</div>
                          <div className="flex items-center gap-2"><Bath className="h-4 w-4" /> baie {item.bathroomStyle}</div>
                          <div className="flex items-center gap-2"><Home className="h-4 w-4" /> {item.thermopane ? "termopane" : "fără termopane"}</div>
                          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {item.quietBedroom ? "dormitor ferit de trafic" : "dormitor la bulevard"}</div>
                        </div>

                        <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                          <div><span className="font-medium text-slate-800">Bucătărie:</span> {item.kitchenStyle}</div>
                          <div><span className="font-medium text-slate-800">Camere:</span> {item.roomCondition}</div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.notes.map((note) => (
                            <Badge key={note} variant="outline" className="rounded-full">{note}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm text-slate-600 md:px-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="font-medium text-slate-900">{appMeta.name}</div>
            <div>Pregătit pentru publicare și extindere cu surse reale, deduplicare și actualizare periodică.</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-2xl">Export cod</Button>
            <Button className="rounded-2xl">Deploy</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
