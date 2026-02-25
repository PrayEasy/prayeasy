// lib/adaptiveEngine.ts

type Emotion = "sad" | "anxious" | "thankful" | "hopeful" | "angry" | "neutral";

interface AdaptiveResponse {
  emotion: Emotion;
  scripture: string;
  message: string; // full natural pastoral response
}

function detectEmotion(input: string): Emotion {
  const lower = input.toLowerCase();

  if (lower.includes("sad") || lower.includes("lonely") || lower.includes("depressed")) return "sad";
  if (lower.includes("worried") || lower.includes("anxious") || lower.includes("afraid")) return "anxious";
  if (lower.includes("thank") || lower.includes("grateful")) return "thankful";
  if (lower.includes("hope") || lower.includes("trust")) return "hopeful";
  if (lower.includes("angry") || lower.includes("frustrated")) return "angry";

  return "neutral";
}

export function generateAdaptiveResponse(userInput: string): AdaptiveResponse {
  const emotion = detectEmotion(userInput);

  switch (emotion) {
    case "sad":
      return {
        emotion,
        scripture: "***Psalm 34:18 — 'The Lord is close to the brokenhearted.'***",
        message: `
I hear the depth of sorrow in your words. When sadness weighs heavy, it can feel like even God has gone silent. Please know, friend, that those tears are not wasted — God holds each one tenderly. You're not forgotten in the valley of grief.

Even David, who wrote so many Psalms, cried out with anguish and despair. Sorrow is not a sign of weakness, but of being fully human and fully alive before God.

***Psalm 34:18 reminds us: 'The Lord is close to the brokenhearted.'*** This is not theory, but truth. Picture the Good Shepherd kneeling beside you, wrapping His arms around you in the depths of this pain.

Pray with me: 
"Lord, I lift up this heart burdened by sorrow. Be present, bring healing, and remind them that even now Your love surrounds them."

Remember this: sorrow does not have the final word. You are beloved. In time, joy will return — a joy no grief can steal. 
        `
      };

    case "anxious":
      return {
        emotion,
        scripture: "***Philippians 4:6 — 'Do not be anxious about anything, but in every situation, pray.'***",
        message: `
I sense the weight of worry pressing against your chest. Anxiety often comes suddenly, like a storm over still waters. It can make the heart race and silence feel overwhelming. Yet you are not alone in this moment. 

Even the disciples trembled in fear during storms at sea. Jesus spoke to both the wind and to their hearts: "Peace, be still." In the same way, Christ speaks calm over your restless spirit now.

***Philippians 4:6 reminds us: 'Do not be anxious about anything, but in every situation, pray.'*** This isn’t meant to dismiss your fears, but to redirect them — to bring them into God’s capable hands.

Imagine a lighthouse that shines steadily while the waves crash hard below. God is that unwavering light, your safe point of focus when everything else feels uncertain.

Pray with me: 
"Lord, calm my restless thoughts and quiet my fears. Anchor my heart in Your peace and help me trust that You have not left me."

Remember this truth: you are defined not by fear, but by faith. You belong to the God who carries you through every storm. 
        `
      };

    case "thankful":
      return {
        emotion,
        scripture: "***1 Thessalonians 5:18 — 'Give thanks in all circumstances.'***",
        message: `
What a gift it is to hear gratitude flowing from your heart! Thankfulness has a way of opening doors into joy, even when circumstances seem ordinary or difficult. 

Gratitude aligns us with heaven’s perspective. It reminds us that every good and perfect gift comes from our Father above.

***1 Thessalonians 5:18 declares: 'Give thanks in all circumstances.'*** Not just when life is easy — but even in trials, because thanksgiving is a declaration of trust.

Think of gratitude like a melody played on a piano; as you play it, others around you hear and join the song. Your thankfulness is contagious.

Pray with me: 
"Lord, I thank You for blessings seen and unseen. Teach me to live in gratitude each day, and to shine joy for others who may be struggling."

And remember: joy multiplies when it is shared. You are a living testimony of God’s goodness.  
        `
      };

    case "hopeful":
      return {
        emotion,
        scripture: "***Jeremiah 29:11 — 'For I know the plans I have for you,' declares the Lord.***",
        message: `
I hear hope rising in your words — a spark of trust shining against life’s uncertainties. Hope is fragile, yet it is one of the most powerful gifts. It lights the path before us even when the road seems unclear. 

The exiles of Israel once struggled with despair, yet God gave them this assurance: ***Jeremiah 29:11 — 'For I know the plans I have for you.'*** This truth is not just for them, but also for you.

Think of dawn breaking after a long night — shadows must bow to the rising sun. Just as surely, God’s purposes will come to light in your journey.

Pray with me: 
"Lord, nurture this seed of hope and let it grow into steady faith. Help me trust Your plan, even when I cannot see it clearly."

Hold fast to this truth: You are chosen, cherished, and woven into God’s story of redemption. He is not finished with you yet. 
        `
      };

    case "angry":
      return {
        emotion,
        scripture: "***James 1:19 — 'Be quick to listen, slow to speak and slow to become angry.'***",
        message: `
I can sense frustration burning within you. Anger is a powerful emotion, and God does not shame you for it. Even Jesus expressed righteous anger at injustice. But He also shows us how to transform it into life-giving strength rather than destruction.

***James 1:19 calls us: 'Be quick to listen, slow to speak, and slow to become angry.'*** This is not easy — but with the Spirit’s guidance, even anger can be redeemed.

Anger is like fire; uncontrolled it consumes, but in a fireplace it warms and gives light. God can take your fire and make it a force for healing and change.

Pray with me: 
"Lord, quiet the fire of anger before it burns out of control. Shape this energy into wisdom, patience, and courage to act with love."

Remember: anger does not define you. You are God’s precious child, called into peace, chosen to be a light of reconciliation.  
        `
      };

    default:
      return {
        emotion: "neutral",
        scripture: "***Psalm 46:10 — 'Be still, and know that I am God.'***",
        message: `
I hear your heart reaching out, longing for steady ground. In seasons when you are unsure what to feel, God’s invitation is simple: rest in Him. 

***Psalm 46:10 declares: 'Be still, and know that I am God.'*** This stillness is not empty silence, but a space where His presence gently renews your soul.

Picture a calm stream flowing steadily through a forest. Even when storms rage overhead, those waters keep running clear and pure. God’s peace flows like that into your life.

Pray with me: 
"Lord, teach me to be still. Quiet my restless thoughts, and let me find peace in Your nearness."

Know this: you are deeply loved, sustained not by your strength but by His constant faithfulness.  
        `
      };
  }
}