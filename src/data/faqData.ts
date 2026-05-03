// src/data/faqData.ts

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  emoji: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'who-can-vote',
    emoji: '🙋',
    question: 'Who can vote in India?',
    answer:
      'Any Indian citizen who meets the minimum voting age requirement and whose name is enrolled in the electoral roll (voter list) of their constituency can vote. You must be ordinarily resident in the place where you are registered.',
  },
  {
    id: 'why-registration',
    emoji: '📝',
    question: 'Why is voter registration important?',
    answer:
      'Voter registration is your formal entry into the electoral roll. Without it, you cannot vote. Registration ensures that each eligible citizen is counted exactly once, maintaining the integrity of elections.',
  },
  {
    id: 'what-is-voter-list',
    emoji: '📋',
    question: 'What is a voter list (electoral roll)?',
    answer:
      'The electoral roll is the official, comprehensive list of all registered voters in a constituency. It is maintained and updated by the Electoral Registration Officer. Your name must be in this list for you to vote.',
  },
  {
    id: 'what-is-polling-booth',
    emoji: '🏫',
    question: 'What is a polling booth?',
    answer:
      'A polling booth (or polling station) is the officially designated place where voters go to cast their votes. It is usually set up at a school, community hall, or government building. Each voter is assigned a specific booth based on their residential address.',
  },
  {
    id: 'what-is-evm',
    emoji: '🖥️',
    question: 'What is an EVM?',
    answer:
      'EVM stands for Electronic Voting Machine. It is used to record votes electronically. The EVM has two parts: the Ballot Unit (where voters press a button to cast their vote) and the Control Unit (operated by polling staff). EVMs are battery-operated and tamper-resistant.',
  },
  {
    id: 'what-is-vvpat',
    emoji: '🧾',
    question: 'What is VVPAT?',
    answer:
      'VVPAT stands for Voter Verifiable Paper Audit Trail. After you press a button on the EVM, a printed slip appears in the VVPAT window showing the symbol/details of the candidate you voted for. The slip is visible for a few seconds before dropping into a sealed container. This lets you verify your vote was recorded correctly.',
  },
  {
    id: 'carry-voting-day',
    emoji: '🪪',
    question: 'What should I carry on voting day?',
    answer:
      'Carry a valid photo identification document. Accepted IDs include: EPIC (Voter ID Card), Aadhaar Card, Passport, Driving Licence, PAN Card, MNREGA Job Card, Smart Card issued by RGI, Bank/Post Office passbook with photo, or Pension document with photo. Also note your polling booth address and your serial number in the voter list.',
  },
  {
    id: 'ethical-voting',
    emoji: '⚖️',
    question: 'What is ethical voting?',
    answer:
      'Ethical voting means casting your vote freely, independently, and without accepting bribes or being pressured. It means making an informed choice based on merit, not on gifts, threats, caste, religion, or fake news. Your vote is secret — exercise it with integrity.',
  },
  {
    id: 'counting-process',
    emoji: '📊',
    question: 'What happens during vote counting?',
    answer:
      'After polling ends, EVMs are sealed and stored securely. On counting day, EVMs are opened under official supervision and the votes stored in them are tallied. Authorized representatives of candidates can observe the counting. Results are declared round by round, and the candidate with the most valid votes in that constituency wins.',
  },
  {
    id: 'form-6',
    emoji: '📄',
    question: 'What is Form 6 used for?',
    answer:
      'Form 6 is the application form used by new voters to register themselves in the electoral roll. You need to submit it to the Electoral Registration Officer of your area, along with required documents like age proof, address proof, and a photograph.',
  },
  {
    id: 'form-8',
    emoji: '✏️',
    question: 'What is Form 8 used for?',
    answer:
      'Form 8 is used to make corrections or updates to your existing voter registration. This includes correcting spelling mistakes, updating address after shifting residence, applying for a replacement EPIC (voter ID card), or marking your disability (PwD) status.',
  },
];
