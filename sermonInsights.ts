import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { fileURLToPath } from "url";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types
interface Verse {
  Reference: string;
  KJV_Text: string;
  WEB_Text: string;
  Theme: string;
  Core_Emotion: string;
  Keywords: string[];
}

interface Sermon {
  title: string;
  pastor: string;
  summary: string;
  key_quotes: string[];
  themes: string[];
}

interface InsightBundle {
  verses: Verse[];
  sermons: Sermon[];
  bibleApi: Verse[];
}

// Load Data
function loadVerses(csvPath: string): Verse[] {
  const file = fs.readFileSync(csvPath, "utf8");
  const parsed = Papa.parse(file, { header: true });
  return parsed.data
    .filter((row: any) => row.Reference) // filter out blank rows
    .map((row: any) => ({
      Reference: row.Reference,
      KJV_Text: row.KJV_Text,
      WEB_Text: row.WEB_Text,
      Theme: row.Theme,
      Core_Emotion: row.Core_Emotion,
      Keywords: row.Keywords?.split(",").map((k: string) => k.trim()) || [],
    }));
}

function loadSermons(jsonPath: string): Sermon[] {
  const file = fs.readFileSync(jsonPath, "utf8");
  return JSON.parse(file);
}

// CSV + Sermon Matching
function findRelevant(scriptures: Verse[], sermons: Sermon[], query: string) {
  const q = query.toLowerCase();

  const matchedVerses = scriptures.filter(v =>
    v.Core_Emotion?.toLowerCase().includes(q) ||
    v.Theme?.toLowerCase().includes(q) ||
    v.Keywords?.some(k => k.toLowerCase().includes(q))
  );

  const matchedSermons = sermons.filter(s =>
    s.themes.some(t => t.toLowerCase().includes(q)) ||
    s.summary.toLowerCase().includes(q)
  );

  return { verses: matchedVerses, sermons: matchedSermons };
}

// Mock Bible API (to demonstrate until we swap a real API)
function searchBibleAPI(query: string): Verse[] {
  return [
    {
      Reference: "Isaiah 41:10",
      KJV_Text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God...",
      WEB_Text: "Don’t be afraid, for I am with you. Don’t be dismayed, for I am your God...",
      Theme: "Courage",
      Core_Emotion: "Fear",
      Keywords: ["fear", "strength", "courage"]
    }
  ];
}

// Main wrapper
export function getInsights(query: string): InsightBundle {
  const scriptures = loadVerses(path.join(__dirname, "Fullverses_data.csv"));
  const sermons = loadSermons(path.join(__dirname, "sermons_library.json"));

  const { verses, sermons: sermonMatches } = findRelevant(scriptures, sermons, query);
  const bibleApiResults = searchBibleAPI(query);

  return {
    verses: verses.slice(0, 3),
    sermons: sermonMatches.slice(0, 2),
    bibleApi: bibleApiResults
  };
}

// Command-line runner
const args = process.argv.slice(2);

// Default 29 queries (emotions/themes)
const defaultQueries = [
  "joy", "peace", "fear", "anger", "anxiety", "loneliness", "hope",
  "courage", "trust", "faith", "salvation", "renewal", "repentance",
  "wisdom", "strength", "patience", "perseverance", "gratitude",
  "service", "compassion", "prayer", "suffering", "doubt", "temptation",
  "forgiveness", "guidance", "love", "obedience", "humility",
  "mercy", "justice", "grace", "restoration"
];

(async () => {
  const queries = args.length > 0 ? args : defaultQueries;

  for (const query of queries) {
    const insights = getInsights(query);

    console.log("\n=======================================");
    console.log(`👉 Results for query: "${query}"\n`);

    console.log("Verses:");
    if (insights.verses.length > 0) {
      insights.verses.forEach(v => console.log(` - ${v.Reference} (${v.Theme})`));
    } else {
      console.log(" - No direct verse match from CSV");
    }

    console.log("\nSermons:");
    if (insights.sermons.length > 0) {
      insights.sermons.forEach(s => console.log(` - ${s.title} (${s.pastor})`));
    } else {
      console.log(" - No direct sermon match");
    }

    console.log("\nBible API Mock:");
    insights.bibleApi.forEach(v => console.log(` - ${v.Reference}`));

    console.log("\n✅ Full JSON is still available below:");
    console.log(JSON.stringify(insights, null, 2));
  }
})();