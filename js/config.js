/**
 * ==============================================================================
 * HER LITTLE UNIVERSE — CENTRAL CONFIGURATION FILE
 * ==============================================================================
 * You can personalize the entire birthday experience directly from this file!
 * Change names, secret passwords, letter contents, photos, and quotes below.
 */

const BIRTHDAY_CONFIG = {
  // ----------------------------------------------------------------------------
  // 1. BASIC DETAILS
  // ----------------------------------------------------------------------------
  recipientName: "Maya",        // Replace with her name
  senderName: "Your Bestie",    // Replace with your name/nickname
  age: 21,                      // Her birthday age (optional display)
  
  // The secret passcode she needs to enter on the Vault screen.
  // Can be 4 to 6 digits (e.g., her birthday "1024", "0815", "1234", etc.)
  secretPassword: "0824",
  
  // Number of stars generated in the "Little Universe" scene (e.g., her age or 20)
  starCount: 20,

  // ----------------------------------------------------------------------------
  // 2. SCENE 1 & 2: DREAMY OPENING TEXTS
  // ----------------------------------------------------------------------------
  opening: {
    line1: "Hey… don't look away.",
    line2: "Something special found its way here for you…",
    line3: "Just stay for a little while. ❤️",
    subtext: "Tap anywhere to continue ✨"
  },

  // ----------------------------------------------------------------------------
  // 3. SCENE 3 & 4: CUPID & BANTER
  // ----------------------------------------------------------------------------
  cupidBanter: {
    dialogue: "“Fine. I guess I have to do this myself.”",
    afterImpact1: "HAPPY BIRTHDAY ❤️",
    afterImpact2: "to my favorite human.",
    playfulBanter: [
      "“Are we best friends?”",
      "“Obviously.”",
      "“Then why does this look like a love story?”",
      "“Don't ask questions. Just let the drama unfold.” 😂❤️"
    ]
  },

  // ----------------------------------------------------------------------------
  // 4. SCENE 5: SECRET LOCK & WRONG PASSWORD TEASERS
  // ----------------------------------------------------------------------------
  lockScreen: {
    heading: "A Little Secret Is Waiting",
    subheading: "Only one person in the universe knows the key.",
    prompt: "Enter your secret birthday passcode",
    hint: "Hint: Think of our special date or your birthday (Default: 0824)",
    
    // Playful messages when she types the wrong passcode
    wrongPasswordMessages: [
      "Nice try. 😌",
      "Nope. Think harder, birthday girl! 🧠✨",
      "That wasn't the secret. Try again!",
      "Your bestie privileges are being questioned right now. 😂",
      "Are you sure you're the real one? 🤔",
      "Okay okay… I believe in you. You know this! ❤️"
    ],

    // Quotes that gently cycle in the background on the lock screen
    cyclingQuotes: [
      "“Some people become memories. Some become moments. And some become your favorite part of life.”",
      "“Not every soulmate is a love story. Some are simply your favorite person to exist with.”",
      "“Some friendships are suspiciously close to magic.”",
      "“Two girls. One brain cell. Infinite chaotic memories.”"
    ]
  },

  // ----------------------------------------------------------------------------
  // 5. SCENE 7: LITTLE UNIVERSE LOADING STEPS
  // ----------------------------------------------------------------------------
  universeLoadingSteps: [
    { text: "Unlocking your little universe…", icon: "✨" },
    { text: "Gathering infinite warm hugs…", icon: "🫂" },
    { text: "Collecting unspoken wishes…", icon: "⭐" },
    { text: "Hiding tiny secrets & surprises…", icon: "🎀" },
    { text: "Replaying all our late-night laughter…", icon: "🌙" },
    { text: "Saving every ounce of our beautiful chaos…", icon: "💖" },
    { text: "Universe Unlocked. Welcome home. ✨", icon: "🌌" }
  ],

  // ----------------------------------------------------------------------------
  // 6. SCENE 8: INTERACTIVE STARS (When tapped in the starry night)
  // ----------------------------------------------------------------------------
  interactiveStars: [
    { id: 1, title: "For your laughs", text: "For every time you made me laugh until my stomach hurt." },
    { id: 2, title: "For the chaos", text: "For every 2 AM conversation that made zero sense but meant the world." },
    { id: 3, title: "For your comfort", text: "For every hug that somehow managed to quietly fix everything." },
    { id: 4, title: "For our soul bond", text: "Best friend by definition. Soulmate by accident." },
    { id: 5, title: "For our future", text: "For every future memory, trip, and crazy adventure waiting for us." },
    { id: 6, title: "Just because", text: "Because you deserve a whole sky filled with nothing but soft, golden things." }
  ],

  // ----------------------------------------------------------------------------
  // 7. SCENE 9: LOVE & FRIENDSHIP QUOTE CARDS
  // ----------------------------------------------------------------------------
  quoteCards: [
    {
      type: "emotional",
      title: "To My Person",
      lines: [
        "If I could give you one thing today…",
        "I'd give you the ability to see yourself through my eyes.",
        "Maybe then you'd understand just how rare and irreplaceable you really are."
      ],
      footnote: "You make existence feel a lot softer."
    },
    {
      type: "playful",
      title: "The Reality Check",
      lines: [
        "Friendship level: suspiciously romantic.",
        "Platonic? Romantic? Chaotic?",
        "Let's not investigate. We're just us."
      ],
      footnote: "And unfortunately for you… you're stuck with me forever. 😌❤️"
    },
    {
      type: "nostalgic",
      title: "A Gentle Reminder",
      lines: [
        "No matter how busy life gets, or how fast the days fly by…",
        "You will always have a safe corner with me.",
        "Through every phase, every crying session, and every win."
      ],
      footnote: "Always in your corner. No matter what."
    }
  ],

  // ----------------------------------------------------------------------------
  // 8. SCENE 10: HANDWRITTEN LETTER (Customizable Letter)
  // ----------------------------------------------------------------------------
  letter: {
    envelopeTag: "For My Favorite Human ❤️",
    date: "On Your Special Day",
    salutation: "My Dearest Bestie,",
    paragraphs: [
      "Happy Birthday! 🎉",
      "I was sitting here wondering how to put into words what you mean to me without making it sound like a dramatic wedding vow, but honestly? You deserve all the drama and every ounce of love today.",
      "Thank you for being my unhinged partner-in-crime, my therapist on speed dial, the person I send 40 reels to without context, and the one human who understands my mood before I even say a word.",
      "You have this rare, golden way of making the world feel less overwhelming just by being in the room. Thank you for your warmth, your chaotic brilliance, and for choosing to walk through life with me.",
      "I hope this year showers you with peace, big dreams realized, spontaneous adventures, and reasons to smile every single morning."
    ],
    closing: "Forever your favorite headache,",
    signature: "Your Soulmate Bestie ❤️"
  },

  // ----------------------------------------------------------------------------
  // 9. SCENE 11: SCRATCH CARD SECRET MESSAGE
  // ----------------------------------------------------------------------------
  scratchCard: {
    badge: "SECRET REVELATION",
    instruction: "Use your finger to scratch away the golden foil! ✨",
    hiddenTitle: "Surprise Unlocked! 🎁",
    hiddenMessage: "“Your biggest birthday gift is our eternal friendship… and a real celebration coming up soon! I love you so much!”",
    postScratchPrompt: "Tap to view our memories 📸"
  },

  // ----------------------------------------------------------------------------
  // 10. SCENE 12 & 13: MEMORY TIMELINE & FILM REEL
  // ----------------------------------------------------------------------------
  memories: [
    {
      id: "mem1",
      title: "Where It All Began",
      date: "Chapter 1",
      caption: "Two strangers who somehow decided to share one collective brain cell.",
      image: "assets/photos/photo01.svg",
      tag: "Origins ✨"
    },
    {
      id: "mem2",
      title: "That Unforgettable Day",
      date: "Pure Chaos",
      caption: "Laughing so hard we couldn't breathe in public. Zero regrets.",
      image: "assets/photos/photo02.svg",
      tag: "Unfiltered 😂"
    },
    {
      id: "mem3",
      title: "Comfort in the Chaos",
      date: "Safe Space",
      caption: "Proof that we can do absolutely nothing together and still have the best time.",
      image: "assets/photos/photo03.svg",
      tag: "Comfort ☕"
    },
    {
      id: "mem4",
      title: "Suspiciously Romantic Era",
      date: "Plot Twist",
      caption: "Looking like a main-character couple in a movie when it's literally just us getting snacks.",
      image: "assets/photos/photo04.svg",
      tag: "For The Plot 🎬"
    },
    {
      id: "mem5",
      title: "Late Night Heart-to-Hearts",
      date: "3:00 AM",
      caption: "Solving all the universe's problems from our bed.",
      image: "assets/photos/photo05.svg",
      tag: "Deep Talks 🌙"
    },
    {
      id: "mem6",
      title: "To A Million More Chapters",
      date: "Always & Forever",
      caption: "I wouldn't trade our story for anything in the world.",
      image: "assets/photos/photo06.svg",
      tag: "Eternal 💖"
    }
  ],

  // ----------------------------------------------------------------------------
  // 11. SCENE 14: INTIMATE FINAL HIDDEN MESSAGE
  // ----------------------------------------------------------------------------
  finalHiddenMessage: {
    line1: "Out of all the people in this giant, noisy world…",
    line2: "I'm really, really glad…",
    line3: "…I got you as my person.",
    line4: "Happy Birthday, Beautiful Soul. ❤️"
  },

  // ----------------------------------------------------------------------------
  // 12. SCENE 15: BIRTHDAY CAKE & CELEBRATION
  // ----------------------------------------------------------------------------
  celebration: {
    wishPrompt: "Make a wish in your heart… ✨",
    candlePrompt: "Tap the flame (or blow into mic) to blow out the candle 🎂",
    postBlowTitle: "HAPPY BIRTHDAY!",
    postBlowSubtext: "May your year be as radiant, chaotic, and beautiful as you are.",
    bestieSummary: [
      "Best friends.",
      "Occasional idiots.",
      "Professional overthinkers.",
      "Part-time lovers for the plot.",
      "Forever stuck with each other. ❤️"
    ]
  },

  // ----------------------------------------------------------------------------
  // 13. HIDDEN EASTER EGG (Found by tapping secret twinkling star)
  // ----------------------------------------------------------------------------
  easterEgg: {
    secretFoundTitle: "✨ You Found The Secret Star! ✨",
    secretMessage: "“You actually explored every little corner. You know me too well. Here's a reminder: I will always be proud of you, rooting for you, and screaming for you in the front row of your life. Forever and always.”",
    secretSign: "— From your #1 fan & best friend for life ❤️",
    secretImage: "assets/photos/secret.svg"
  }
};

// Export to window object for global availability
if (typeof window !== "undefined") {
  window.BIRTHDAY_CONFIG = BIRTHDAY_CONFIG;
}
