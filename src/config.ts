export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  caption: string;
  image: string;
  tag?: string;
}

export interface InteractiveStarItem {
  id: number;
  title: string;
  text: string;
}

export interface QuoteCardItem {
  type: 'emotional' | 'playful' | 'nostalgic';
  title: string;
  lines: string[];
  footnote: string;
}

export interface PostBirthdayGiftConfig {
  characterText: string;
  cardPrompt: string;
  acceptBtn: string;
  declineBtn: string;
  rejectReactionTitle: string;
  rejectReactionSubtitle: string;
  tryAgainBtn: string;
  successTitle: string;
  successSubtitle: string;
}

export interface PenguinCharacterItem {
  id: 'sweet' | 'chaotic' | 'emotional';
  name: string;
  tagline: string;
  personality: string;
  illustration: string;
  message: string;
  footnote: string;
  badgeColor: string;
}

export interface PostBirthdayPenguinsConfig {
  heading: string;
  subheading: string;
  continueBtn: string;
  penguins: PenguinCharacterItem[];
}

export interface ScrapbookMemoryItem {
  id: string;
  title: string;
  date?: string;
  caption: string;
  image: string;
  tag?: string;
  washiColor?: string;
  rotation?: number;
}

export interface PostBirthdayScrapbookConfig {
  heading: string;
  subheading: string;
  continueBtn: string;
  memories: ScrapbookMemoryItem[];
}

export interface PostBirthdayProposalConfig {
  heading: string;
  subheading: string;
  yesBtn: string;
  thinkBtn: string;
  yesTitle: string;
  yesMessage: string;
  thinkTitle: string;
  thinkMessage: string;
  thinkChangeBtn: string;
  continueBtn: string;
}

export interface PostBirthdayHugConfig {
  heading: string;
  subheading: string;
  buttonText: string;
  revealTitle: string;
  revealSubtitle: string;
  continueBtn: string;
}

export interface PostBirthdayFinalLoveConfig {
  heading: string;
  messageLine1: string;
  recipientName: string;
  bestieTagline: string;
  replaySurpriseBtn: string;
  readLetterAgainBtn: string;
  replayMemoriesBtn: string;
}

export interface PostBirthdayConfig {
  gift: PostBirthdayGiftConfig;
  penguins: PostBirthdayPenguinsConfig;
  scrapbook: PostBirthdayScrapbookConfig;
  proposal: PostBirthdayProposalConfig;
  hug: PostBirthdayHugConfig;
  finalLove: PostBirthdayFinalLoveConfig;
}

export interface BirthdayConfig {
  recipientName: string;
  nickname: string;
  senderName: string;
  age: number;
  secretPassword: string;
  starCount: number;
  opening: {
    line1: string;
    line2: string;
    line3: string;
    subtext: string;
  };
  cupidBanter: {
    dialogue: string;
    afterImpact1: string;
    afterImpact2: string;
    playfulBanter: string[];
  };
  lockScreen: {
    heading: string;
    subheading: string;
    prompt: string;
    hint: string;
    wrongPasswordMessages: string[];
    cyclingQuotes: string[];
  };
  universeLoadingSteps: { text: string; icon: string }[];
  interactiveStars: InteractiveStarItem[];
  quoteCards: QuoteCardItem[];
  letter: {
    envelopeTag: string;
    date: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };
  scratchCard: {
    badge: string;
    instruction: string;
    hiddenTitle: string;
    hiddenMessage: string;
    postScratchPrompt: string;
  };
  memories: MemoryItem[];
  finalHiddenMessage: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
  };
  celebration: {
    wishPrompt: string;
    candlePrompt: string;
    postBlowTitle: string;
    postBlowSubtext: string;
    bestieSummary: string[];
  };
  easterEgg: {
    secretFoundTitle: string;
    secretMessage: string;
    secretSign: string;
    secretImage: string;
  };
  postBirthday: PostBirthdayConfig;
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  recipientName: "Anifa",
  nickname: "Pyaari",
  senderName: "Your Bestie",
  age: 21,
  secretPassword: "1517",
  starCount: 20,

  opening: {
    line1: "Hey… don't look away.",
    line2: "Something special found its way here for you…",
    line3: "Just stay for a little while. ❤️",
    subtext: "Tap anywhere to step inside ✨"
  },

  cupidBanter: {
    dialogue: "“Fine. I guess I have to do this myself.” 🏹",
    afterImpact1: "HAPPY BIRTHDAY ❤️",
    afterImpact2: "to my favorite human.",
    playfulBanter: [
      "“Are we best friends?”",
      "“Obviously.”",
      "“Then why does this whole thing look like a suspiciously romantic love story?”",
      "“Don't ask questions, Anifa (Pyaari). Just let the drama unfold.” 😂❤️"
    ]
  },

  lockScreen: {
    heading: "A Little Secret Is Waiting",
    subheading: "Only one person in the universe knows the key.",
    prompt: "Enter your 4-digit secret passcode",
    hint: "Hint: Think of our special date or secret code ✨",
    wrongPasswordMessages: [
      "Nice try. 😌",
      "Nope. Think harder, birthday girl! 🧠✨",
      "That wasn't the secret. Try again!",
      "Your bestie privileges are being questioned right now. 😂",
      "Are you sure you're the real one? 🤔",
      "Okay okay… I believe in you. You know this! ❤️"
    ],
    cyclingQuotes: [
      "“Some people become memories. Some become moments. And some become your favorite part of life.”",
      "“Not every soulmate is a love story. Some are simply your favorite person to exist with.”",
      "“Some friendships are suspiciously close to magic.”",
      "“Two girls. One brain cell. Infinite chaotic memories.”"
    ]
  },

  universeLoadingSteps: [
    { text: "Unlocking your little universe…", icon: "✨" },
    { text: "Gathering infinite warm hugs…", icon: "🫂" },
    { text: "Collecting unspoken wishes…", icon: "⭐" },
    { text: "Hiding tiny secrets & surprises…", icon: "🎀" },
    { text: "Replaying all our late-night laughter…", icon: "🌙" },
    { text: "Saving every ounce of our beautiful chaos…", icon: "💖" },
    { text: "Universe Unlocked. Welcome home. ✨", icon: "🌌" }
  ],

  interactiveStars: [
    { id: 1, title: "For your laughs", text: "For every time you made me laugh until my stomach hurt." },
    { id: 2, title: "For the chaos", text: "For every 2 AM conversation that made zero sense but meant the world." },
    { id: 3, title: "For your comfort", text: "For every hug that somehow managed to quietly fix everything." },
    { id: 4, title: "For our soul bond", text: "Best friend by definition. Soulmate by accident." },
    { id: 5, title: "For our future", text: "For every future memory, trip, and crazy adventure waiting for us." },
    { id: 6, title: "Just because", text: "Because you deserve a whole sky filled with nothing but soft, golden things." }
  ],

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

  letter: {
    envelopeTag: "For My Favorite Human ❤️",
    date: "On Your Special Day",
    salutation: "My Dearest Anifa,",
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

  scratchCard: {
    badge: "SECRET REVELATION",
    instruction: "Use your finger or mouse to scratch away the golden foil! ✨",
    hiddenTitle: "Surprise Unlocked! 🎁",
    hiddenMessage: "“Your biggest birthday gift is our eternal friendship… and a real celebration coming up soon! I love you so much!”",
    postScratchPrompt: "Tap to view our memories 📸"
  },

  memories: [
    {
      id: "mem1",
      title: "Where It All Began",
      date: "Chapter 1",
      caption: "Two strangers who somehow decided to share one collective brain cell.",
      image: "/assets/photos/photo01.png",
      tag: "Origins ✨"
    },
    {
      id: "mem2",
      title: "That Unforgettable Day",
      date: "Pure Chaos",
      caption: "Laughing so hard we couldn't breathe in public. Zero regrets.",
      image: "/assets/photos/photo02.png",
      tag: "Unfiltered 😂"
    },
    {
      id: "mem3",
      title: "Comfort in the Chaos",
      date: "Safe Space",
      caption: "Proof that we can do absolutely nothing together and still have the best time.",
      image: "/assets/photos/photo03.jpeg",
      tag: "Comfort ☕"
    },
    {
      id: "mem4",
      title: "Suspiciously Romantic Era",
      date: "Plot Twist",
      caption: "Looking like a main-character couple in a movie when it's literally just us getting snacks.",
      image: "/assets/photos/photo04.png",
      tag: "For The Plot 🎬"
    },
    {
      id: "mem5",
      title: "Late Night Heart-to-Hearts",
      date: "3:00 AM",
      caption: "Solving all the universe's problems from our bed.",
      image: "/assets/photos/photo05.png",
      tag: "Deep Talks 🌙"
    },
    {
      id: "mem6",
      title: "To A Million More Chapters",
      date: "Always & Forever",
      caption: "I wouldn't trade our story for anything in the world.",
      image: "/assets/photos/photo06.png",
      tag: "Eternal 💖"
    }
  ],

  finalHiddenMessage: {
    line1: "Out of all the people in this giant, noisy world…",
    line2: "I'm really, really glad…",
    line3: "…I got you as my person.",
    line4: "Happy Birthday, Anifa. ❤️"
  },

  celebration: {
    wishPrompt: "Make a wish in your heart… ✨",
    candlePrompt: "Tap the candle flame to blow it out 🎂",
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

  easterEgg: {
    secretFoundTitle: "✨ You Found The Secret Star! ✨",
    secretMessage: "“You actually explored every little corner. You know me too well. Here's a reminder: I will always be proud of you, rooting for you, and screaming for you in the front row of your life. Forever and always.”",
    secretSign: "— From your #1 fan & best friend for life ❤️",
    secretImage: "/assets/photos/secret.png"
  },

  postBirthday: {
    gift: {
      characterText: "Anifa, I have one more gift for you! 🎁",
      cardPrompt: "PLS ACCEPT THE GIFT",
      acceptBtn: "YES, I WANT IT! 💗",
      declineBtn: "NO 🙄",
      rejectReactionTitle: "WHY DID YOU CLICK NO?! 😭💔",
      rejectReactionSubtitle: "Excuse me miss ma'am?! After everything we've been through, you don't even have a choice anyway! 😂",
      tryAgainBtn: "TRY AGAIN 🥺",
      successTitle: "YAAAY! Opening your special surprise... ✨",
      successSubtitle: "Hold on tight to your heart!"
    },

    penguins: {
      heading: "Choose a penguin 🐧",
      subheading: "Each one has something special to say.",
      continueBtn: "Continue to Our Scrapbook 📸 →",
      penguins: [
        {
          id: "sweet",
          name: "Pip",
          personality: "The Sweet One",
          tagline: "Overflowing with pure soft love",
          illustration: "/assets/illustrations/penguin-sweet.svg",
          message: "You deserve every beautiful thing this world has to offer. ❤️",
          footnote: "— Your sweetest cheerleader forever",
          badgeColor: "bg-[#ff758f]"
        },
        {
          id: "chaotic",
          name: "Pops",
          personality: "The Chaotic One",
          tagline: "Dangerously unfiltered",
          illustration: "/assets/illustrations/penguin-chaotic.svg",
          message: "Unfortunately, you're stuck with me. No refunds. 😂",
          footnote: "— Contract signed in permanent marker",
          badgeColor: "bg-[#8338ec]"
        },
        {
          id: "emotional",
          name: "Pepe",
          personality: "The Secretly Emotional One",
          tagline: "Acts tough, actually a softie",
          illustration: "/assets/illustrations/penguin-emotional.svg",
          message: "Even on ordinary days, you're one of my favorite people.",
          footnote: "— Quietly loving you every single day",
          badgeColor: "bg-[#3a86ff]"
        }
      ]
    },

    scrapbook: {
      heading: "Our Little Memories 📸",
      subheading: "Handcrafted polaroids from our tiny universe",
      continueBtn: "A Very Serious Question Awaits... 💍 →",
      memories: [
        {
          id: "scrap1",
          title: "First Cafe Date",
          date: "Chapter 1",
          caption: "Us being us: talking for 5 hours straight without noticing the time.",
          image: "/assets/photos/photo01.png",
          tag: "Origins ✨",
          washiColor: "#ffccd5",
          rotation: -2
        },
        {
          id: "scrap2",
          title: "Public Embarrassment",
          date: "Pure Chaos",
          caption: "The chaos never ends. Laughing so loud in public people stared.",
          image: "/assets/photos/photo02.png",
          tag: "Unfiltered 😂",
          washiColor: "#c9ada7",
          rotation: 3
        },
        {
          id: "scrap3",
          title: "Zero Thoughts",
          date: "Safe Space",
          caption: "Proof that we share one brain cell and wouldn't have it any other way.",
          image: "/assets/photos/photo03.jpeg",
          tag: "Comfort ☕",
          washiColor: "#ffd166",
          rotation: -1
        },
        {
          id: "scrap4",
          title: "Suspiciously Romantic Era",
          date: "Plot Twist",
          caption: "Looking like a main-character couple in a movie when it's literally just us getting snacks.",
          image: "/assets/photos/photo04.png",
          tag: "For The Plot 🎬",
          washiColor: "#ff758f",
          rotation: 2
        },
        {
          id: "scrap5",
          title: "Late Night Debriefs",
          date: "3:00 AM",
          caption: "Solving all the universe's problems from our bed until our eyes hurt.",
          image: "/assets/photos/photo05.png",
          tag: "Deep Talks 🌙",
          washiColor: "#b5e2fa",
          rotation: -3
        },
        {
          id: "scrap6",
          title: "A Memory I Want To Keep Forever",
          date: "Always & Forever",
          caption: "One of my absolute favorite days. I wouldn't trade our story for anything in the world.",
          image: "/assets/photos/photo06.png",
          tag: "Eternal 💖",
          washiColor: "#f4a261",
          rotation: 1
        },
        {
          id: "scrap7",
          title: "Midnight Munchies",
          date: "2:00 AM",
          caption: "Emergency 2 AM Pizza & Gossip with zero regrets and full bellies.",
          image: "/assets/photos/photo07.png",
          tag: "Snack Run 🍕",
          washiColor: "#ffb3c6",
          rotation: -2
        },
        {
          id: "scrap8",
          title: "Sunset Watchers",
          date: "Golden Hour",
          caption: "Chasing sunsets with my person. Wherever you go, I go.",
          image: "/assets/photos/photo08.png",
          tag: "Golden Era 🌅",
          washiColor: "#ffe6a7",
          rotation: 2
        },
        {
          id: "scrap9",
          title: "Photobooth Madness",
          date: "Strip #47",
          caption: "Proof that we cannot be left unsupervised near a camera booth.",
          image: "/assets/photos/photo09.png",
          tag: "Crazy Poses 📸",
          washiColor: "#e8dff5",
          rotation: -1
        },
        {
          id: "scrap10",
          title: "Pinky Promise",
          date: "Till 90",
          caption: "Stuck with each other till we're 90 years old. A lifetime contract signed with love.",
          image: "/assets/photos/photo10.png",
          tag: "Promise 🤙",
          washiColor: "#fcd5ce",
          rotation: 3
        }
      ]
    },

    proposal: {
      heading: "Anifa (Pyaari)… will you be mine? 💗",
      subheading: "For tax benefits and infinite chaotic adventures.",
      yesBtn: "YES, OBVIOUSLY 💗",
      thinkBtn: "LET ME THINK 😂",
      yesTitle: "I KNEW YOU'D SAY YES. 😌❤️",
      yesMessage: "Your lifetime subscription to my chaos has officially been renewed! No cancellations, no returns, and definitely no refunds allowed.",
      thinkTitle: "EXCUSE ME?! AFTER EVERYTHING WE'VE BEEN THROUGH? 😭",
      thinkMessage: "I literally built you a whole interactive universe website and you have the audacity to THINK about it?! 💀",
      thinkChangeBtn: "Okay okay, YES! 💗",
      continueBtn: "Next: Claim Your Virtual Hug 🤗 →"
    },

    hug: {
      heading: "Virtual hug for you! 🥹",
      subheading: "Because I can't send one through the screen right now.",
      buttonText: "GIVE ME A HUG 💗",
      revealTitle: "I MISS YOU, YOU LITTLE IDIOT. 🥹💕",
      revealSubtitle: "Sending you the biggest, warmest virtual hug, Anifa. Squeeze tight!",
      continueBtn: "One Last Surprise... 💌 →"
    },

    finalLove: {
      heading: "A Special Note For You",
      messageLine1: "I LOVE YOU",
      recipientName: "ANIFA (PYAARI) ❤️",
      bestieTagline: "Besties forever. Lovers for the plot. 😂💗",
      replaySurpriseBtn: "🔄 Replay This Surprise",
      readLetterAgainBtn: "💌 Read My Birthday Letter Again",
      replayMemoriesBtn: "📸 Replay Our Memories"
    }
  }
};
