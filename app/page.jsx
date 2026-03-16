"use client";

import { useMemo, useState } from "react";

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

const listings = [
  {
    id: 1,
    title: "3 camere Virtuții, 71 mp, 2 băi, termopane",
    source: "Imobiliare.ro",
    zone: "Virtuții",
    price: 168500,
    size: 71,
    bathrooms: 2,
    year: 1989,
    floor: "2/8",
    walkMin: 8,
    score: 97,
    status: "Foarte potrivit",
    kitchenStyle: "îngrijită, luminoasă",
    roomCondition: "camere curate, bine proporționate",
  },
  {
    id: 2,
    title: "3 camere Lujerului, 72 mp, 2 băi",
    source: "Storia",
    zone: "Lujerului",
    price: 164900,
    size: 72,
    bathrooms: 2,
    year: 1988,
    floor: "3/8",
    walkMin: 6,
    score: 96,
    status: "Foarte potrivit",
    kitchenStyle: "îngrijită",
    roomCondition: "camere ok",
  },
  {
    id: 3,
    title: "3 camere Timpuri Noi, 68 mp, 2 băi",
    source: "OLX",
    zone: "Timpuri Noi",
    price: 169500,
    size: 68,
    bathrooms: 2,
    year: 1990,
    floor: "4/4",
    walkMin: 9,
    score: 91,
    status: "Potrivit",
    kitchenStyle: "îngrijită",
    roomCondition: "camere ok",
  },
  {
    id: 4,
    title: "3 camere Cotroceni, 70 mp, 2 băi",
    source: "Agenție mică",
    zone: "Cotroceni",
    price: 170000,
    size: 70,
    bathrooms: 2,
    year: 1986,
    floor: "2/6",
    walkMin: 12,
    score: 94,
    status: "Foarte potrivit",
    kitchenStyle: "îngrijită",
    roomCondition: "camere ok",
  },
];

function badgeStyle(bg, color) {
  return {
    background: bg,
    color,
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    display: "inline-block",
  };
}

function cardStyle() {
  return {
    background: "#ffffff",
    borderRadius: 24,
    padding: 20,
    boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
  };
}

export default function Page() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return listings.filter((item) => {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.zone.toLowerCase().includes(q)
      );
    });
  }, [search]);

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <div style={{ ...cardStyle(), marginBottom: 24 }}>
        <div style={{ color: "#be123c", fontSize: 14, marginBottom: 10 }}>
          Finder personalizat pentru apartamente în București
        </div>
        <h1 style={{ margin: 0, fontSize: 42 }}>Radar Apartamente București</h1>
        <p style={{ color: "#475569", fontSize: 18, maxWidth: 900 }}>
          Apartamente filtrate după criteriile tale: buget, zone, etaj, 2 băi,
          termopane, dormitor ferit de bulevard, transport și aspect bun.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          <span style={badgeStyle("#e2e8f0", "#334155")}>Buget max 170.000 €</span>
          <span style={badgeStyle("#e2e8f0", "#334155")}>3 camere</span>
          <span style={badgeStyle("#e2e8f0", "#334155")}>Minim 65 mp</span>
          <span style={badgeStyle("#e2e8f0", "#334155")}>An minim 1985</span>
          <span style={badgeStyle("#e2e8f0", "#334155")}>2 băi</span>
          <span style={badgeStyle("#e2e8f0", "#334155")}>Decomandat</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24 }}>
        <aside style={{ ...cardStyle(), alignSelf: "start" }}>
          <h3>Filtre salvate</h3>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Caută zonă sau titlu"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 14,
              border: "1px solid #cbd5e1",
              marginBottom: 20,
            }}
          />

          <h4>Zone preferate</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {preferredZones.map((zone) => (
              <span key={zone} style={badgeStyle("#dcfce7", "#166534")}>
                {zone}
              </span>
            ))}
          </div>

          <h4>Zone excluse</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {excludedZones.map((zone) => (
              <span key={zone} style={badgeStyle("#fee2e2", "#991b1b")}>
                {zone}
              </span>
            ))}
          </div>
        </aside>

        <section>
          <div style={{ ...cardStyle(), marginBottom: 24 }}>
            <h3 style={{ marginTop: 0 }}>Hartă demo București</h3>
            <div
              style={{
                height: 240,
                borderRadius: 20,
                background: "linear-gradient(135deg,#dbeafe 0%,#e2e8f0 40%,#f8fafc 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", left: "20%", top: "56%", width: "26%", height: "28%", border: "4px solid #e11d48", borderRadius: 999 }} />
              <div style={{ position: "absolute", left: "28%", top: "24%", width: "10%", height: "14%", border: "4px solid #e11d48", borderRadius: 999 }} />
              <div style={{ position: "absolute", left: "54%", top: "66%", width: "12%", height: "14%", border: "4px solid #e11d48", borderRadius: 999 }} />

              <div style={{ position: "absolute", left: "24%", top: "52%", background: "#059669", color: "white", padding: "8px 12px", borderRadius: 999, fontSize: 12 }}>
                Lujerului · 164.900€
              </div>
              <div style={{ position: "absolute", left: "57%", top: "70%", background: "#059669", color: "white", padding: "8px 12px", borderRadius: 999, fontSize: 12 }}>
                Timpuri Noi · 169.500€
              </div>
              <div style={{ position: "absolute", left: "36%", top: "28%", background: "#059669", color: "white", padding: "8px 12px", borderRadius: 999, fontSize: 12 }}>
                Cotroceni · 170.000€
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {filtered.map((item) => (
              <div key={item.id} style={cardStyle()}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                      <span style={badgeStyle("#e2e8f0", "#334155")}>{item.source}</span>
                      <span style={badgeStyle("#0f172a", "#ffffff")}>{item.status}</span>
                      <span style={badgeStyle("#e2e8f0", "#334155")}>Scor {item.score}/100</span>
                    </div>

                    <h3 style={{ margin: "0 0 8px 0" }}>{item.title}</h3>
                    <div style={{ fontSize: 28, fontWeight: 700 }}>
                      {item.price.toLocaleString("ro-RO")} €
                    </div>
                  </div>

                  <button
                    style={{
                      borderRadius: 16,
                      border: "1px solid #cbd5e1",
                      background: "white",
                      padding: "10px 14px",
                      height: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    Salvează
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 10,
                    marginTop: 20,
                    color: "#475569",
                  }}
                >
                  <div>{item.size} mp</div>
                  <div>{item.bathrooms} băi</div>
                  <div>An {item.year}</div>
                  <div>{item.walkMin} min transport</div>
                  <div>Etaj {item.floor}</div>
                  <div>{item.zone}</div>
                  <div>Termopane</div>
                  <div>Dormitor ferit de trafic</div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                    marginTop: 16,
                    color: "#475569",
                  }}
                >
                  <div><strong>Bucătărie:</strong> {item.kitchenStyle}</div>
                  <div><strong>Camere:</strong> {item.roomCondition}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
