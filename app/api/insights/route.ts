import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import Papa from "papaparse";
import { fileURLToPath } from "url";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadVerses(): Verse[] {
  const csvPath = path.join(process.cwd(), "Fullverses_data.csv");
  const file = fs.readFileSync(csvPath, "utf8");
  const parsed = Papa.parse(file, { header: true });
  return parsed.data
    .filter((row: any) => row.Reference)
    .map((row: any) => ({
      Reference: row.Reference,
      KJV_Text: row.KJV_Text,
      WEB_Text: row.WEB_Text,
      Theme: row.Theme,
      Core_Emotion: row.Core_Emotion,
      Keywords: row.Keywords?.split(",").map((k: string) => k.trim()) || [],
    }));
}

function loadSermons(): Sermon[] {
  const file = fs.readFileSync(path.join(process.cwd(), "sermons_library.json"), "utf8");
  return JSON.parse(file);
}

function searchBibleAPI(query: string): Verse[] {
  return [
    {
      Reference: "Isaiah 41:10",
      KJV_Text: "Fear thou not; for I am with thee...",
      WEB_Text: "Don’t be afraid, for I am with you...",
      Theme: "Courage",
      Core_Emotion: "Fear",
      Keywords: ["fear", "strength", "courage"],
    },
  ];
}

function findRelevant(query: string) {
  const scriptures = loadVerses();
  const sermons = loadSermons();
  const q = query.toLowerCase();

  const matchedVerses = scriptures.filter((v) =>
    v.Core_Emotion?.toLowerCase().includes(q) ||
    v.Theme?.toLowerCase().includes(q) ||
    v.Keywords?.some((k) => k.toLowerCase().includes(q))
  );

  const matchedSermons = sermons.filter((s) =>
    s.themes.some((t) => t.toLowerCase().includes(q)) ||
    s.summary.toLowerCase().includes(q)
  );

  return {
    verses: matchedVerses.slice(0, 3),
    sermons: matchedSermons.slice(0, 2),
    bibleApi: searchBibleAPI(query),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "fear";

  const results = findRelevant(query);
  return NextResponse.json({ query, results });
}