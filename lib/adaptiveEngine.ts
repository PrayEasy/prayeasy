// lib/adaptiveEngine.ts

type Emotion = "sad" | "anxious" | "thankful" | "hopeful" | "angry" | "neutral";

interface AdaptiveResponse {
  emotion: Emotion;
  scripture: string;
  prayer: string;
}

/**
 * Detect a basic emotion from user text (rule-based starter version).
 */
function detectEmotion(input: string): Emotion {
  const lower = input.toLowerCase();

  if (lower.includes("sad") || lower.includes("lonely") || lower.includes("depressed")) return "sad";
  if (lower.includes("worried") || lower.includes("anxious") || lower.includes("afraid")) return "anxious";
  if (lower.includes("thank") || lower.includes("grateful")) return "thankful";
  if (lower.includes("hope") || lower.includes("trust")) return "hopeful";
  if (lower.includes("angry") || lower.includes("frustrated")) return "angry";

  return "neutral";
}

/**
 * Choose scripture + prayer text depending on emotion.
 */
export function generateAdaptiveResponse(userInput: string): AdaptiveResponse {
  const emotion = detectEmotion(userInput);

  switch (emotion) {
    case "sad":
      return {
        emotion,
        scripture: "Psalm 34:18 - 'The Lord is close to the brokenhearted.'",
        prayer: "Dear Lord, lift up this weary heart. Bring comfort and peace to their soul."
      };

    case "anxious":
      return {
        emotion,
        scripture: "Philippians 4:6 - 'Do not be anxious about anything, but in every situation, pray.'",
        prayer: "Heavenly Father, calm the storm of worry. Replace anxious thoughts with Your peace."
      };

    case "thankful":
      return {
        emotion,
        scripture: "1 Thessalonians 5:18 - 'Give thanks in all circumstances.'",
        prayer: "Lord, we thank You for Your endless blessings. May gratitude overflow today."
      };

    case "hopeful":
      return {
        emotion,
        scripture: "Jeremiah 29:11 - 'For I know the plans I have for you,' declares the Lord.",
        prayer: "Lord, strengthen this faith and hope. Let Your purpose shine through every step."
      };

    case "angry":
      return {
        emotion,
        scripture: "James 1:19 - 'Be quick to listen, slow to speak and slow to become angry.'",
        prayer: "Lord, quiet the anger. Fill this heart with patience, gentleness, and understanding."
      };

    default:
      return {
        emotion: "neutral",
        scripture: "Psalm 46:10 - 'Be still, and know that I am God.'",
        prayer: "Lord, bring stillness and assurance in this moment. Draw this heart nearer to You."
      };
  }
}