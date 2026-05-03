// src/data/lessons.ts

export interface QuizOption {
  label: string;
  text: string;
  correct: boolean;
}

export interface LessonStep {
  id: number;
  title: string;
  emoji: string;
  badgeLabel: string;
  shortDescription: string;
  keyPoints: string[];
  activityType:
    | 'start'
    | 'true-false'
    | 'fill-blank'
    | 'matching'
    | 'checklist'
    | 'voter-search'
    | 'scenario'
    | 'good-bad'
    | 'voting-checklist'
    | 'voting-simulation'
    | 'evm-vvpat'
    | 'counting'
    | 'myth-fact'
    | 'final-quiz'
    | 'certificate';
  quizQuestion?: string;
  quizOptions?: QuizOption[];
  trueFalseItems?: Array<{ statement: string; isTrue: boolean; explanation: string }>;
  fillBlankItems?: Array<{ sentenceParts: string[]; correctAnswer: string; options: string[] }>;
  matchingPairs?: Array<{ id: string; left: string; right: string }>;
  checklistItems?: string[];
  scenarioQuestion?: string;
  scenarioOptions?: Array<{ text: string; correct: boolean; explanation: string }>;
  goodBadItems?: Array<{ text: string; isGood: boolean; explanation: string }>;
  mythFactItems?: Array<{ myth: string; fact: string }>;
}

export const lessons: LessonStep[] = [
  {
    id: 1,
    title: 'Welcome: First-Time Voter',
    emoji: '🗳️',
    badgeLabel: 'Explorer',
    shortDescription:
      'Welcome to Election Journey! Elections are how citizens choose their representatives. Voting is not just a right — it is a responsibility.',
    keyPoints: [
      'Elections allow citizens to choose their representatives at all levels.',
      'Voting is one of the most powerful tools a citizen has.',
      'This journey will teach you registration, voter list, voting day, EVM/VVPAT, counting, and responsible participation.',
      'By the end, you will earn the Responsible Citizen certificate!',
    ],
    activityType: 'start',
  },
  {
    id: 2,
    title: 'Eligibility to Vote',
    emoji: '📋',
    badgeLabel: 'Eligible',
    shortDescription:
      'Before you can vote, you must meet certain eligibility criteria. Let\'s find out what they are!',
    keyPoints: [
      'You must be a citizen of India.',
      'You must meet the minimum voting age requirement as defined by law.',
      'Your name must be enrolled in the electoral roll (voter list) of your constituency.',
      'A voter ID (EPIC) card is issued to enrolled voters.',
    ],
    activityType: 'true-false',
    trueFalseItems: [
      {
        statement: 'You can vote even if your name is not on the voter list, as long as you have an Aadhaar card.',
        isTrue: false,
        explanation: 'Your name MUST be on the official electoral roll (voter list) of your constituency to vote.'
      },
      {
        statement: 'You must be at least 18 years old to vote in India.',
        isTrue: true,
        explanation: 'Yes! The minimum voting age in India is 18 years.'
      }
    ]
  },
  {
    id: 3,
    title: 'Voter Registration',
    emoji: '📝',
    badgeLabel: 'Registered',
    shortDescription:
      'Registration is your first step. New voters apply using Form 6 to get enrolled in the electoral roll.',
    keyPoints: [
      'New voters apply for voter registration using Form 6.',
      'Registration is linked to your ordinary place of residence.',
      'You will need to provide personal details, address proof, age proof, and a photo.',
      'After successful enrolment, your details appear in the electoral roll.',
      'You can register online at the official Election Commission portal.',
    ],
    activityType: 'checklist',
    checklistItems: [
      'Valid Age Proof (birth certificate, school certificate, etc.)',
      'Address Details (current residential address)',
      'Recent Photograph',
      'Personal Details (name, date of birth, etc.)',
    ],
  },
  {
    id: 4,
    title: 'Voter List Verification',
    emoji: '🔍',
    badgeLabel: 'Verified',
    shortDescription:
      'Getting registered is not enough. You must verify that your name appears correctly in the electoral roll before election day!',
    keyPoints: [
      'The electoral roll is the official list of all registered voters in your constituency.',
      'You should verify your name in the voter list well before election day.',
      'If your name is missing or has errors, you must request a correction.',
      'You can check your voter list status online through official portals.',
    ],
    activityType: 'voter-search',
  },
  {
    id: 5,
    title: 'Correction / Update Details',
    emoji: '✏️',
    badgeLabel: 'Updated',
    shortDescription:
      'Life changes — and so might your details. Here\'s how to keep your voter information accurate.',
    keyPoints: [
      'If you shift residence, you need to update your voter registration.',
      'Spelling mistakes in your name can be corrected through an official request.',
      'You can apply for a replacement EPIC (Voter ID) if your card is lost.',
      'Voters with disabilities can mark their PwD (Person with Disability) status.',
      'Form 8 is used for corrections, shifting residence, replacement EPIC, and PwD marking.',
    ],
    activityType: 'fill-blank',
    fillBlankItems: [
      {
        sentenceParts: ['If Riya moves to a new city, she should use Form ', ' to update her voter address.'],
        correctAnswer: '8',
        options: ['6', '8', '11']
      },
      {
        sentenceParts: ['To fix a spelling mistake in your Voter ID, you submit an official ', ' request.'],
        correctAnswer: 'Correction',
        options: ['Deletion', 'Correction', 'Complaint']
      }
    ]
  },
  {
    id: 6,
    title: 'Candidates and Campaigning',
    emoji: '📣',
    badgeLabel: 'Informed',
    shortDescription:
      'Multiple candidates contest elections. As a responsible voter, you should learn about candidates and their work — and not be misled!',
    keyPoints: [
      'Candidates represent different viewpoints and contest for your votes.',
      'Learn about candidates through their public records and work, not just promises.',
      'Ethical campaigning follows election rules and does not use fear or bribery.',
      'Always verify information before sharing — fake news spreads quickly.',
      'Your vote should be free — never accept money or gifts in exchange for your vote.',
    ],
    activityType: 'matching',
    matchingPairs: [
      { id: '1', left: 'Ethical Campaign', right: 'Discussing public issues' },
      { id: '2', left: 'Illegal Practice', right: 'Bribing voters' },
      { id: '3', left: 'Informed Choice', right: 'Researching candidate background' },
      { id: '4', left: 'Fake News', right: 'Unverified WhatsApp forwards' }
    ]
  },
  {
    id: 7,
    title: 'Polling Booth Preparation',
    emoji: '🏫',
    badgeLabel: 'Prepared',
    shortDescription:
      'Voting day preparation starts well before the big day! Know your booth, carry valid ID, and be ready.',
    keyPoints: [
      'Find out your polling station location in advance using official apps or portals.',
      'Check the date, time, and your booth/serial number on your voter slip.',
      'Carry a valid photo ID on voting day (EPIC, Aadhaar, passport, etc.).',
      'Plan your travel and arrive on time — avoid last-minute rush.',
      'Follow all instructions given by polling staff at the booth.',
    ],
    activityType: 'voting-checklist',
  },
  {
    id: 8,
    title: 'Voting Day Simulation',
    emoji: '🗳️',
    badgeLabel: 'Participant',
    shortDescription:
      'Experience what actually happens inside a polling booth — step by step. This is what voting day feels like!',
    keyPoints: [
      'Polling booths are set up at schools, community halls, and other public places.',
      'Trained polling staff conduct the entire voting process.',
      'The process is designed to be quick, orderly, and completely secret.',
      'Any person who is in the queue when polling ends is allowed to vote.',
    ],
    activityType: 'voting-simulation',
  },
  {
    id: 9,
    title: 'EVM & VVPAT Learning',
    emoji: '🖥️',
    badgeLabel: 'Tech-Aware',
    shortDescription:
      'Learn how India\'s Electronic Voting Machines work — and why VVPAT gives you a visual confirmation!',
    keyPoints: [
      'EVM stands for Electronic Voting Machine — it records votes electronically.',
      'EVMs have two units: the Ballot Unit (for voters) and the Control Unit (with polling officer).',
      'VVPAT stands for Voter Verifiable Paper Audit Trail.',
      'After casting your vote, a paper slip appears in the VVPAT window for a few seconds.',
      'The slip shows the symbol/details you voted for — confirming your vote was recorded.',
      'Your vote is completely secret — no one can trace who you voted for.',
    ],
    activityType: 'evm-vvpat',
  },
  {
    id: 10,
    title: 'Counting and Results',
    emoji: '📊',
    badgeLabel: 'Observer',
    shortDescription:
      'After all votes are cast, comes the exciting counting process. Let\'s see how winners are determined!',
    keyPoints: [
      'After polling ends, EVMs are sealed and stored under strict security.',
      'Counting happens on a designated day, under official supervision.',
      'Authorized agents of candidates can observe the counting process.',
      'Results are tallied round by round and officially declared.',
      'The candidate who gets the highest number of valid votes wins (First Past the Post system).',
    ],
    activityType: 'counting',
  },
  {
    id: 11,
    title: 'Becoming a Responsible Citizen',
    emoji: '🌟',
    badgeLabel: 'Responsible',
    shortDescription:
      'The election process doesn\'t end when you vote. True democratic participation means being responsible every step of the way.',
    keyPoints: [
      'Vote freely — your vote is a personal and private decision.',
      'Never sell your vote — it undermines democracy.',
      'Do not spread fake news or misinformation about candidates or the process.',
      'Report election violations to official authorities like the Election Commission helpline.',
      'Respect election outcomes and peaceful democratic processes.',
      'Stay engaged — responsible citizenship goes beyond election day.',
    ],
    activityType: 'myth-fact',
    mythFactItems: [
      {
        myth: 'My one vote doesn\'t matter — it won\'t change anything.',
        fact: 'Every single vote counts. Elections have been decided by very narrow margins. Your vote contributes to democracy.',
      },
      {
        myth: 'It is okay to accept gifts or money and still vote for whoever I like.',
        fact: 'Accepting gifts in exchange for votes is illegal. Voting must be free, independent, and ethical.',
      },
      {
        myth: 'I don\'t need to verify information — if my friend shared it, it must be true.',
        fact: 'Always verify information from official sources. Fake news spreads fast and harms democracy.',
      },
      {
        myth: 'If I am busy on election day, it is okay to skip voting.',
        fact: 'Voting is a civic responsibility. Plan your day around it — it only takes a short time and makes a big difference.',
      },
    ],
  },
  {
    id: 12,
    title: 'Final Quiz',
    emoji: '🧠',
    badgeLabel: 'Scholar',
    shortDescription:
      'Time to test everything you\'ve learned! Answer 10 questions about the election process. Good luck!',
    keyPoints: [
      'This quiz covers all the topics from your Election Journey.',
      'Take your time and think carefully before answering.',
      'Your score will be shown on your certificate.',
    ],
    activityType: 'final-quiz',
  },
  {
    id: 13,
    title: 'Your Certificate',
    emoji: '🏆',
    badgeLabel: 'Certified',
    shortDescription:
      'Congratulations on completing the Election Journey! Download your Responsible Citizen Certificate.',
    keyPoints: [
      'You have learned about voter registration, electoral rolls, the voting process, EVM/VVPAT, counting, and responsible citizenship.',
      'Share your knowledge with family, friends, and community.',
      'Encourage every eligible person around you to register and vote.',
    ],
    activityType: 'certificate',
  },
];
