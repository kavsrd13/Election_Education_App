// src/data/finalQuiz.ts

export interface QuizQuestion {
  id: number;
  question: string;
  options: Array<{ label: string; text: string; correct: boolean }>;
  explanation: string;
}

export const finalQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question:
      'Why is it important for a voter to check their name in the voter list before election day?',
    options: [
      { label: 'A', text: 'To know which candidate to vote for', correct: false },
      {
        label: 'B',
        text: 'To confirm your name is enrolled and you are eligible to vote at your assigned booth',
        correct: true,
      },
      { label: 'C', text: 'To get a discount on travel', correct: false },
      { label: 'D', text: 'It is not necessary to check the voter list', correct: false },
    ],
    explanation:
      'If your name is not in the voter list, you will not be allowed to vote. Always verify your name well before election day.',
  },
  {
    id: 2,
    question: 'What is the main purpose of voter registration?',
    options: [
      { label: 'A', text: 'To get a free government ID card', correct: false },
      { label: 'B', text: 'To be recognized as a political party member', correct: false },
      {
        label: 'C',
        text: 'To formally enrol your name in the electoral roll so you can vote',
        correct: true,
      },
      { label: 'D', text: 'To apply for government benefits', correct: false },
    ],
    explanation:
      'Voter registration is the process of enrolling your name in the electoral roll, which is required to participate in elections.',
  },
  {
    id: 3,
    question: 'What should a voter carry to the polling booth on voting day?',
    options: [
      { label: 'A', text: 'Only their party membership card', correct: false },
      { label: 'B', text: 'A valid photo ID such as EPIC, Aadhaar, or passport', correct: true },
      { label: 'C', text: 'Their last electricity bill only', correct: false },
      { label: 'D', text: 'Nothing — no documents are needed', correct: false },
    ],
    explanation:
      'Voters must carry a valid photo ID (EPIC/Voter ID card, Aadhaar, passport, etc.) to the polling booth for identity verification.',
  },
  {
    id: 4,
    question: 'What does an EVM (Electronic Voting Machine) help with?',
    options: [
      { label: 'A', text: 'Counting money at the bank', correct: false },
      { label: 'B', text: 'Recording and storing votes electronically during an election', correct: true },
      { label: 'C', text: 'Printing voter ID cards', correct: false },
      { label: 'D', text: 'Broadcasting election results on TV', correct: false },
    ],
    explanation:
      'The EVM records each vote cast electronically and stores results securely until the counting day.',
  },
  {
    id: 5,
    question: 'What does a VVPAT machine show to the voter?',
    options: [
      { label: 'A', text: 'The name of the winning candidate', correct: false },
      { label: 'B', text: 'The total number of votes cast so far', correct: false },
      {
        label: 'C',
        text: 'A printed paper slip confirming the candidate the voter just voted for',
        correct: true,
      },
      { label: 'D', text: 'The voter\'s ID details', correct: false },
    ],
    explanation:
      'VVPAT (Voter Verifiable Paper Audit Trail) shows a brief confirmation slip so the voter can verify their vote was recorded for the correct candidate.',
  },
  {
    id: 6,
    question: 'What should a voter do if they find that their details in the voter list are incorrect?',
    options: [
      { label: 'A', text: 'Just ignore the mistake and vote anyway', correct: false },
      { label: 'B', text: 'Complain to friends on social media', correct: false },
      {
        label: 'C',
        text: 'Submit a correction request (Form 8) to the Electoral Registration Officer',
        correct: true,
      },
      { label: 'D', text: 'Register again with a completely new application', correct: false },
    ],
    explanation:
      'Corrections to voter details are made by submitting Form 8 to the Electoral Registration Officer before the electoral roll is finalized.',
  },
  {
    id: 7,
    question: 'Is it acceptable to accept money or gifts from a candidate or their representatives in exchange for your vote?',
    options: [
      { label: 'A', text: 'Yes, it is a bonus for going to vote', correct: false },
      {
        label: 'B',
        text: 'No — accepting bribes for votes is illegal and undermines democracy',
        correct: true,
      },
      {
        label: 'C',
        text: 'Yes, as long as you vote for whoever you actually want to vote for',
        correct: false,
      },
      { label: 'D', text: 'Only small gifts are acceptable', correct: false },
    ],
    explanation:
      'Accepting bribes or gifts in exchange for votes is a criminal offence. Your vote must be free, independent, and ethical.',
  },
  {
    id: 8,
    question: 'Why should voters learn about candidates before voting?',
    options: [
      { label: 'A', text: 'To decide which political party is the most popular', correct: false },
      { label: 'B', text: 'To avoid standing in long queues at the booth', correct: false },
      {
        label: 'C',
        text: 'To make an informed choice based on candidates\' work, plans, and public service',
        correct: true,
      },
      { label: 'D', text: 'Because the government requires you to prove you know the candidates', correct: false },
    ],
    explanation:
      'Learning about candidates helps voters make thoughtful, informed choices based on merit and public interest rather than superficial reasons.',
  },
  {
    id: 9,
    question: 'What happens immediately after voting ends on election day?',
    options: [
      { label: 'A', text: 'Results are announced within one hour', correct: false },
      {
        label: 'B',
        text: 'EVMs are sealed and securely stored until the official counting day',
        correct: true,
      },
      { label: 'C', text: 'All voters must wait at the polling station', correct: false },
      { label: 'D', text: 'Candidates immediately count the votes themselves', correct: false },
    ],
    explanation:
      'After polling ends, EVMs are sealed, signed by polling agents, and stored under security until the official counting day.',
  },
  {
    id: 10,
    question: 'Which of the following best describes a responsible citizen when it comes to elections?',
    options: [
      {
        label: 'A',
        text: 'Someone who only votes if their preferred candidate is likely to win',
        correct: false,
      },
      { label: 'B', text: 'Someone who avoids politics entirely', correct: false },
      {
        label: 'C',
        text: 'Someone who votes freely, stays informed, does not spread misinformation, and respects democratic processes',
        correct: true,
      },
      {
        label: 'D',
        text: 'Someone who votes for whoever their family or employer tells them to',
        correct: false,
      },
    ],
    explanation:
      'A responsible citizen votes freely and independently, stays informed, rejects fake news, and upholds the values of democratic participation.',
  },
];
