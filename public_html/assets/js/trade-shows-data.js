// Dates other than TTG and WTM are provisional: confirm participation and dates
// before publishing. Travel & Adventure has multiple city editions; confirm this one.
// Keep ISO dates (YYYY-MM-DD). Do not assign statuses: they are calculated daily.
const tradeShows = [
  { name: "Vakantiebeurs / Travel Trade Day", start: "2026-01-08", end: "2026-01-08", city: "Utrecht", country: "Netherlands", booth: "", logo: "/assets/images/vakantiebeurs.png" },
  { name: "FITUR", start: "2026-01-21", end: "2026-01-25", city: "Madrid", country: "Spain", booth: "", logo: "/assets/images/fitur.png" },
  { name: "Travel & Adventure Show", start: "2026-01-24", end: "2026-01-25", city: "New York", country: "USA", booth: "", logo: "/assets/images/Travel-Adventure-Show.png" },
  { name: "ITB Berlin", start: "2026-03-03", end: "2026-03-05", city: "Berlin", country: "Germany", booth: "", logo: "/assets/images/itb-berlin.png" },
  { name: "IMEX", start: "2026-05-19", end: "2026-05-21", city: "Frankfurt", country: "Germany", booth: "", logo: "/assets/images/IMEX.png" },
  { name: "IFTM Top Resa", start: "2026-09-15", end: "2026-09-17", city: "Paris", country: "France", booth: "", logo: "/assets/images/TOPRESAS.png" },
  { name: "Tourism EXPO Japan", start: "2026-09-24", end: "2026-09-27", city: "Tokyo", country: "Japan", booth: "", logo: "/assets/images/jata-expo.jpg" },
  { name: "TTG Travel Experience", start: "2026-10-14", end: "2026-10-16", city: "Rimini", country: "Italy", booth: "N6-200", logo: "/assets/images/ttg.png" },
  { name: "WTM London", start: "2026-11-03", end: "2026-11-05", city: "London", country: "United Kingdom", booth: "", logo: "/assets/images/wtm_london.png" },
  { name: "BIT Milano", start: "2027-02-09", end: "2027-02-11", city: "Milan", country: "Italy", booth: "", logo: "/assets/images/bit_milano.jpg" }
];
if (typeof module !== 'undefined') module.exports = tradeShows;
