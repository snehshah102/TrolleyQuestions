export const trolleyQuestions = [
  {
    id: 1,
    title: "Trends vs GPA",
    scenario: "Would you give up being on the latest trends (social media, stocks, news, gaming, etc…) if it meant raising your gpa by 0.5? (L1)", // If you need an extra scenario text, put it here. Otherwise leave empty."
    choices: [
      {
        id: "a",
        text: "Stick with the latest trends"
      },
      {
        id: "b",
        text: "Raise my GPA"
      }
    ],
    analysisA: 
      "By choosing the “latest trends”, we are valuing: cultural relevance and social connection, where we have a sense of belonging, relevance, and staying updated with friends. (valuing connection, entertainment, and immediate gratification).",
    analysisB: 
      "By choosing “GPA”, we are valuing: personal achievement (GPA & Academic Success). The value at play here is potential long-term benefits such as improved job prospects, personal growth, etc… (Prioritizing tangible markers of achievement).",
    analysisOverall: 
      "Overall Analysis: To achieve a goal, sacrifices must be made. This question forces participants to weigh delayed gratification and long-term goals (raising GPA) against the immediate benefits of being culturally attuned and socially connected."
  },
  {
    id: 2,
    title: "Experience vs Time",
    scenario: "Would you sacrifice 1 year of your life if it gave you 5 years worth of experience from someone else’s life? (L1)",
    choices: [
      {
        id: "a",
        text: "Yes, I’d trade 1 year of my life for 5 years of someone else’s experience"
      },
      {
        id: "b",
        text: "No, I’d keep my own time and experience"
      }
    ],
    analysisA: 
      "By picking the “5 years of experience”, we are valuing: accelerating personal growth through the insights, lessons, and expertise of others. (sees time as a resource to optimize).",
    analysisB: 
      "By “choosing your own life”, we are valuing: time in our life regardless of the external gains. Living each moment to its fullest and believing that choices and decisions are made for a reason.",
    analysisOverall: 
      "Overall Analysis: The question forces individuals to weigh the quantitative aspect of life (years lived) against the qualitative enhancement of life (wisdom gained). That is to say, living longer on your terms vs. living more effectively with borrowed experience and wisdom."
  },
  {
    id: 3,
    title: "Admiration vs Self-Love",
    scenario: "Would you rather be someone everyone admires but you don’t like the person you are or someone who loves themself but is constantly judged for their actions? (L2)",
    choices: [
      {
        id: "a",
        text: "Be someone everyone admires (but I’m unhappy inside)"
      },
      {
        id: "b",
        text: "Be someone who truly loves themself (but is judged by others)"
      }
    ],
    analysisA: 
      "By picking “someone everyone admires”, we are valuing: external admiration, where our persona is built and satisfied from others’ opinions and comments, even if it comes at a cost of personal authenticity or dissatisfaction.",
    analysisB: 
      "By picking “someone who loves themself”, we are valuing: intrinsic admiration, where our validation and satisfaction comes from within. Being true to oneself, even if it means facing criticism from others.",
    analysisOverall: 
      "Overall Analysis: This question forces individuals to consider whether external admiration and societal approval outweigh the importance of authenticity and self-respect."
  },
  {
    id: 4,
    title: "Emotions vs Control",
    scenario: "Would you rather have complete control over your emotions but feel detached from others, or let your emotions run wild, making every moment feel intense and real but unpredictable? (L2)",
    choices: [
      {
        id: "a",
        text: "Have complete control over emotions"
      },
      {
        id: "b",
        text: "Let my emotions run wild"
      }
    ],
    analysisA: 
      "By choosing “complete control over emotions”, we are valuing: emotional regulation, where we have complete control over what/how/why we feel. This leads to better decision-making and rationality, with a sense of mastery over life’s ups and downs.",
    analysisB: 
      "By choosing “letting our emotions run wild”, we are valuing: emotional intensity, where we value authenticity and the power of experience. It can lead to vibrant and memorable experiences.",
    analysisOverall: 
      "Overall Analysis: This question forces participants to consider emotional mastery vs. intensity — a stable, measured life vs. an unpredictable but experientially “rich” life."
  },
  {
    id: 5,
    title: "Fun vs Support",
    scenario: "Would you rather only have one friend who’s always there for fun, but disappears when you need support, or only one friend who is always supportive but hard to have fun with? (L3)",
    choices: [
      {
        id: "a",
        text: "The fun friend"
      },
      {
        id: "b",
        text: "The supportive friend"
      }
    ],
    analysisA: 
      "By choosing “the fun friend”, we are valuing: the enjoyment of relationships (lighthearted fun, shared laughter, and the joy of having a companion for good times).",
    analysisB: 
      "By choosing “the supportive friend”, we are valuing: the reliability of relationships (valuing unwavering support, trust, during challenging times).",
    analysisOverall: 
      "Overall Analysis: This question explores what aspect of friendship you find more essential—enjoying good moments together or having someone to lean on during hard ones. It also prompts reflection on which one we *actually* keep, and which one we *are* to others."
  },
  {
    id: 6,
    title: "Fulfill vs Sacrifice",
    scenario: "You get the opportunity to fulfill your dreams but someone you love will never be able to fulfill theirs—would you do it? (L3)",
    choices: [
      {
        id: "a",
        text: "Fulfill my own dreams"
      },
      {
        id: "b",
        text: "Sacrifice my dreams for someone I love"
      }
    ],
    analysisA: 
      "By choosing “to fulfill our own dreams”, we are valuing: personal ambition—pursuit of our own dreams, self-fulfillment, and personal goals.",
    analysisB: 
      "By choosing “to sacrifice our dreams”, we are valuing: sacrificing our ambitions for the happiness and opportunities of someone else (highlighting empathy, altruism, and responsibility).",
    analysisOverall: 
      "Overall Analysis: The tension here is between individual fulfillment and moral responsibility to those we love. How far would we go to achieve our goals vs. what sacrifices are we willing to make for love and connection?"
  },
  {
    id: 7,
    title: "Memory vs Life",
    scenario: "Would you rather your parents lose 10 years of their life or lose all memory of you? (L3)",
    choices: [
      {
        id: "a",
        text: "Parents lose 10 years of their life"
      },
      {
        id: "b",
        text: "They keep their years but forget all about me"
      }
    ],
    analysisA: 
      "By choosing “parents losing 10 years”, we are valuing: a willingness to trade longevity for the continuation of a bond—emphasis on the worth of life and time they have. (some might see it as self-serving)",
    analysisB: 
      "By choosing “all memories of us”, we are valuing: the importance of them being healthier and living longer, even if it means they no longer remember us. A very altruistic or selfless choice.",
    analysisOverall: 
      "Overall Analysis: This question compares time spent alive vs. depth and continuity of relationships. Do we accept them forgetting us to preserve their lifespan, or do we preserve the bond but shorten their life?"
  },
  {
    id: 8,
    title: "Mobile vs Guruji Private One-on-One",
    scenario: "Would you go a week without your mobile device if in return Guruji answers any questions you have in a private one-on-one? (L1)",
    choices: [
      {
        id: "a",
        text: "Keep my mobile device"
      },
      {
        id: "b",
        text: "Give it up for a week to have Guruji’s guidance"
      }
    ],
    analysisA: 
      "By choosing “our mobile device”, we are valuing: convenience and connectivity—yearning for information, socialization, entertainment, and avoiding FOMO.",
    analysisB: 
      "By choosing “private one-on-one with Guruji”, we are valuing: wisdom and guidance (the value of Guruji’s insights), prioritizing clarity and meaningful answers to life’s questions (spiritual growth).",
    analysisOverall: 
      "Overall Analysis: This question makes us weigh the comfort and convenience of everyday digital habits against a rare opportunity for personal growth through guidance. Do we value routine digital life more than potentially life-changing wisdom?"
  }
];
