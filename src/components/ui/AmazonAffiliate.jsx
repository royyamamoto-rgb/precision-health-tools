const TAG = "precisionhealth-20";

const PRODUCTS = [
  {
    title: "Etekcity Food Kitchen Scale",
    brand: "Etekcity",
    desc: "Digital grams & ounces, stainless steel, LCD display",
    asin: "B0113UZJE2",
    rating: 4.5,
    reviews: "97k+",
    badge: "Best for Macros",
    badgeColor: "#0b57d0",
  },
  {
    title: "Gold Standard 100% Whey Protein",
    brand: "Optimum Nutrition",
    desc: "24g protein per scoop, 5.5g BCAAs, Double Rich Chocolate, 5 lb",
    asin: "B000QSNYGI",
    rating: 4.7,
    reviews: "120k+",
    badge: "#1 Best Seller",
    badgeColor: "#7c3aed",
  },
  {
    title: "BlenderBottle Classic V2 (28 oz)",
    brand: "BlenderBottle",
    desc: "Leak-proof shaker with BlenderBall wire whisk, BPA-free",
    asin: "B07TK681SZ",
    rating: 4.8,
    reviews: "98k+",
    badge: "Top Rated",
    badgeColor: "#0891b2",
  },
  {
    title: "Micronized Creatine Monohydrate",
    brand: "Optimum Nutrition",
    desc: "Unflavored, 120 servings (600g), Creapure quality",
    asin: "B002DYIZEO",
    rating: 4.7,
    reviews: "44k+",
    badge: "Essential",
    badgeColor: "#d97706",
  },
  {
    title: "High Absorption Magnesium Glycinate",
    brand: "Doctor's Best",
    desc: "200mg chelated magnesium, sleep & muscle support, 240 tablets",
    asin: "B000BD0RT0",
    rating: 4.6,
    reviews: "68k+",
    badge: "Recovery",
    badgeColor: "#059669",
  },
];

function amazonImg(asin) {
  return `https://m.media-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_SX200_.jpg`;
}

function amazonLink(asin) {
  return `https://www.amazon.com/dp/${asin}?tag=${TAG}`;
}

function Stars({ rating, reviews }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 20 20" fill={i < full ? "#f59e0b" : i === full && half ? "url(#halfStar)" : "#d1d5db"}>
          {i === full && half && (
            <defs>
              <linearGradient id="halfStar">
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
          )}
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-[10px] text-on-surface-muted">{rating} ({reviews})</span>
    </span>
  );
}

export default function AmazonAffiliate({ className = "" }) {
  return (
    <div className={`m3-card p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-on-surface">Recommended Gear</h3>
        <span className="text-[10px] text-on-surface-muted">Affiliate</span>
      </div>
      <div className="space-y-3">
        {PRODUCTS.map((p) => (
          <a
            key={p.asin}
            href={amazonLink(p.asin)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group flex items-center gap-3 rounded-xl bg-surface-dim p-2.5 no-underline transition-colors hover:bg-surface-container-high"
          >
            <img
              src={amazonImg(p.asin)}
              alt={p.title}
              width={56}
              height={56}
              loading="lazy"
              className="h-14 w-14 shrink-0 rounded-lg bg-white object-contain"
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium leading-tight text-on-surface group-hover:text-primary">
                {p.title}
              </div>
              <div className="mt-0.5 text-[11px] text-on-surface-muted">{p.brand} — {p.desc}</div>
              <div className="mt-1">
                <Stars rating={p.rating} reviews={p.reviews} />
              </div>
            </div>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
              style={{ backgroundColor: p.badgeColor }}
            >
              {p.badge}
            </span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-on-surface-muted">
        As an Amazon Associate we earn from qualifying purchases
      </p>
    </div>
  );
}
