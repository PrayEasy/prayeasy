"use client";

import Link from "next/link";

// Regex to match Bible references like "Philippians 4:6-7", "John 3:16", "Psalm 23:1-6", "1 Corinthians 13:4-8"
// Handles books starting with numbers (1, 2, 3) and verse ranges
const SCRIPTURE_REGEX = /\b((?:[123]\s*)?[A-Za-z]+(?:\s+[A-Za-z]+)?)\s+(\d+)(?::(\d+(?:-\d+)?))?(?!\s*(?:am|pm|AM|PM))\b/g;

// Valid Bible book names (normalized lowercase for matching)
const BIBLE_BOOKS = new Set([
  "genesis", "exodus", "leviticus", "numbers", "deuteronomy",
  "joshua", "judges", "ruth", "1 samuel", "2 samuel",
  "1 kings", "2 kings", "1 chronicles", "2 chronicles", "ezra",
  "nehemiah", "esther", "job", "psalms", "psalm", "proverbs",
  "ecclesiastes", "song of solomon", "songs", "isaiah", "jeremiah", "lamentations",
  "ezekiel", "daniel", "hosea", "joel", "amos",
  "obadiah", "jonah", "micah", "nahum", "habakkuk",
  "zephaniah", "haggai", "zechariah", "malachi",
  "matthew", "mark", "luke", "john", "acts",
  "romans", "1 corinthians", "2 corinthians", "galatians", "ephesians",
  "philippians", "colossians", "1 thessalonians", "2 thessalonians",
  "1 timothy", "2 timothy", "titus", "philemon", "hebrews",
  "james", "1 peter", "2 peter", "1 john", "2 john",
  "3 john", "jude", "revelation"
]);

// Normalize book name for matching
function normalizeBookName(book: string): string {
  return book.toLowerCase().replace(/\s+/g, " ").trim();
}

// Check if a book name is valid
function isValidBook(book: string): boolean {
  const normalized = normalizeBookName(book);
  return BIBLE_BOOKS.has(normalized);
}

// Format scripture reference for URL
function formatScriptureUrl(book: string, chapter: string, verse?: string): string {
  let ref = `${book} ${chapter}`;
  if (verse) ref += `:${verse}`;
  return `/bible?verse=${encodeURIComponent(ref)}`;
}

interface ScriptureLinkProps {
  text: string;
  className?: string;
}

/**
 * Parses text and converts scripture references to clickable links
 * that navigate to the Bible Deep Dive page
 */
export default function ScriptureLink({ text, className = "" }: ScriptureLinkProps) {
  if (!text) return null;

  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Reset regex state
  SCRIPTURE_REGEX.lastIndex = 0;

  while ((match = SCRIPTURE_REGEX.exec(text)) !== null) {
    const [fullMatch, book, chapter, verse] = match;
    const startIndex = match.index;

    // Check if this is actually a Bible book
    if (!isValidBook(book)) {
      continue;
    }

    // Add text before the match
    if (startIndex > lastIndex) {
      parts.push(text.slice(lastIndex, startIndex));
    }

    // Create clickable link for the scripture reference
    const url = formatScriptureUrl(book, chapter, verse);
    parts.push(
      <Link
        key={`${startIndex}-${fullMatch}`}
        href={url}
        className="text-azure-600 dark:text-azure-400 hover:text-azure-700 dark:hover:text-azure-300 underline decoration-azure-400/50 hover:decoration-azure-500 transition-colors font-medium"
        title={`Open ${fullMatch} in Bible Deep Dive`}
      >
        {fullMatch}
      </Link>
    );

    lastIndex = startIndex + fullMatch.length;
  }

  // Add remaining text after last match
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  // If no matches, just return plain text
  if (parts.length === 0) {
    return <span className={className}>{text}</span>;
  }

  return <span className={className}>{parts}</span>;
}

/**
 * Use this component to wrap any text that might contain scripture references
 * Example: <ScriptureLink text="As it says in John 3:16, God loves you." />
 */
