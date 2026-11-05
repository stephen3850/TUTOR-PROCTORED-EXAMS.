export const CERTIFICATIONS_DATA = {
  pmp: {
    slug: 'pmp',
    title: 'PMP',
    fullName: 'Project Management Professional',
    category: 'Project Management',
    governingBody: 'Project Management Institute (PMI)',
    tagline: 'The gold standard certification for project managers across all industries worldwide.',
    overview:
      'The Project Management Professional (PMP)® certification validates your capability as a project manager, demonstrating that you have the skills to lead project teams and drive successful project outcomes using predictive, agile, and hybrid methodologies.',
    targetAudience: [
      'Project Managers and Project Leaders aiming to formalize their credentials',
      'Associate Project Managers, PMO Analysts, and Coordinators advancing their careers',
      'Engineering, IT, Healthcare, and Operations professionals managing complex initiatives',
      'Military veterans transitioning into corporate project management roles',
    ],
    examFormat: {
      totalQuestions: '180 questions (175 scored, 5 unscored pretest items)',
      duration: '230 minutes (with two 10-minute scheduled breaks)',
      passingScore: 'Criterion-referenced passing score determined by PMI psychometric analysis',
      format: 'Multiple-choice, multiple-response, matching, hotspot, and fill-in-the-blank questions',
      proctoring: 'Delivered via Pearson VUE online proctoring (OnVUE) or at Pearson VUE testing centers',
    },
    domains: [
      {
        name: 'People (42%)',
        description: 'Focuses on the soft skills required to effectively lead a team, build trust, manage conflict, empower team members, and negotiate project agreements.',
      },
      {
        name: 'Process (50%)',
        description: 'Reinforces the technical aspects of managing project scope, schedule, budget, quality, risk, communications, procurement, and integration across predictive and agile lifecycles.',
      },
      {
        name: 'Business Environment (8%)',
        description: 'Highlights the connection between projects and organizational strategy, compliance, deliverables value, and external business environmental changes.',
      },
    ],
    prepApproach: [
      'Review the latest PMI PMP Examination Content Outline (ECO) to understand domain weightings.',
      'Study both predictive (PMBOK® Guide 7th Edition) and agile/hybrid frameworks (Agile Practice Guide).',
      'Create a 6 to 12-week structured study timeline with daily question practice.',
      'Practice answering situational scenario-based questions that test application rather than memorization.',
    ],
    faqs: [
      {
        question: 'What are the eligibility requirements for the PMP exam?',
        answer:
          'Candidates with a 4-year degree need 36 months of project leadership experience and 35 hours of project management education (or CAPM certification). Candidates with a high school diploma need 60 months of project leadership experience and 35 hours of education.',
      },
      {
        question: 'How much of the PMP exam covers Agile and Hybrid project management?',
        answer:
          'Approximately 50% of the PMP exam represents predictive project management approaches, while the other 50% covers agile or hybrid methodologies.',
      },
      {
        question: 'How can TUTOR PROCTORED EXAMS help me prepare for the PMP exam?',
        answer:
          'We offer 1-on-1 coaching with experienced PMP certified tutors, situational question breakdown, study schedule planning, and dry-run practice exam reviews.',
      },
    ],
  },

  comptia: {
    slug: 'comptia',
    title: 'CompTIA Certifications',
    fullName: 'CompTIA Security+, A+, Network+',
    category: 'Information Technology',
    governingBody: 'Computing Technology Industry Association (CompTIA)',
    tagline: 'Vendor-neutral IT certifications establishing core cybersecurity, infrastructure, and helpdesk expertise.',
    overview:
      'CompTIA certifications—including Security+, A+, Network+, and CySA+—are recognized globally as foundational credentials for IT and cybersecurity professionals. They validate hands-on technical skills in networking, system administration, hardware troubleshooting, and threat mitigation.',
    targetAudience: [
      'Entry-level IT Technicians, Helpdesk Analysts, and System Administrators',
      'Cybersecurity Specialists, SOC Analysts, and Information Assurance Officers',
      'Network Technicians and Cloud Engineers expanding their credentials',
      'Department of Defense (DoD) contractors requiring 8140/8570 baseline compliance',
    ],
    examFormat: {
      totalQuestions: 'Up to 90 questions per exam (Multiple-choice and Performance-Based Questions - PBQs)',
      duration: '90 minutes per exam session',
      passingScore: 'Security+ (750 on a 100-900 scale), Network+ (720), A+ (675 for 1101, 700 for 1102)',
      format: 'Multiple-choice and interactive Performance-Based Questions (PBQs) testing hands-on CLI/GUI commands',
      proctoring: 'Delivered via Pearson VUE online proctoring (OnVUE) or at Pearson VUE testing centers',
    },
    domains: [
      {
        name: 'General Security Concepts & Architecture',
        description: 'Core cryptography principles, zero-trust architecture, identity and access management (IAM), and security controls.',
      },
      {
        name: 'Threats, Vulnerabilities & Mitigations',
        description: 'Identifying social engineering, malware types, vulnerability management, threat intelligence, and attack surfaces.',
      },
      {
        name: 'Security Operations & Incident Response',
        description: 'Monitoring logs, SIEM tools, firewall configurations, incident response lifecycles, and forensic basics.',
      },
      {
        name: 'Governance, Risk & Compliance (GRC)',
        description: 'Data privacy regulations, risk assessments, business continuity planning, and security policies.',
      },
    ],
    prepApproach: [
      'Master key acronyms, port numbers, and protocol standards (e.g., SSH 22, HTTPS 443, DNS 53).',
      'Practice hands-on Performance-Based Questions (PBQs) using CLI commands (ipconfig, ping, traceroute, netstat).',
      'Utilize flashcards for active recall of security controls, frameworks (NIST, ISO), and attack types.',
      'Take timed full-length practice tests to build stamina and time management.',
    ],
    faqs: [
      {
        question: 'Do CompTIA certifications satisfy DoD 8570 / 8140 requirements?',
        answer:
          'Yes! CompTIA Security+ is one of the most widely accepted baseline credentials for DoD cybersecurity roles (IAT Level II).',
      },
      {
        question: 'What are Performance-Based Questions (PBQs)?',
        answer:
          'PBQs are simulation items appearing at the beginning of CompTIA exams that test your ability to configure networks, set up firewalls, or resolve security incidents interactively.',
      },
      {
        question: 'How can TUTOR PROCTORED EXAMS support my CompTIA study?',
        answer:
          'We provide 1-on-1 tutoring focused on PBQ strategies, port memorization, networking concepts, and practice exam breakdown.',
      },
    ],
  },

  aapc: {
    slug: 'aapc',
    title: 'AAPC Certification Preparation',
    fullName: 'AAPC Medical Coding & Compliance Prep',
    category: 'Healthcare & Medical Coding',
    governingBody: 'American Academy of Professional Coders (AAPC)',
    tagline: 'Preparation resources for AAPC credentials including CPC, CIC, COC, and CPMA.',
    overview:
      'AAPC is the nation’s largest education and credentialing organization for medical coders, billers, auditors, and practice managers. Preparing for an AAPC exam requires deep familiarity with official CPT®, ICD-10-CM, and HCPCS Level II codebooks, guidelines, and reimbursement principles.',
    targetAudience: [
      'Medical Coders and Billing Specialists preparing for national credentialing',
      'Health Information Management (HIM) students and graduates',
      'Clinical staff and nurses transitioning into medical auditing and compliance',
      'Healthcare administrative personnel seeking career advancement',
    ],
    examFormat: {
      totalQuestions: '100 multiple-choice questions (for CPC® and core AAPC exams)',
      duration: '4 hours (240 minutes)',
      passingScore: '70% or higher correct score',
      format: 'Open codebook examination testing CPT, ICD-10-CM, HCPCS Level II, and coding guidelines',
      proctoring: 'Delivered via Meazure Learning online proctoring or in-person AAPC chapter testing centers',
    },
    domains: [
      {
        name: 'ICD-10-CM Official Guidelines & Diagnosis Coding',
        description: 'Applying diagnosis coding rules, sequencing conventions, and disease classification across all body systems.',
      },
      {
        name: 'CPT® Procedure Coding & Modifiers',
        description: 'Navigating Evaluation and Management (E/M), Surgery, Radiology, Pathology/Laboratory, and Medicine sections.',
      },
      {
        name: 'HCPCS Level II & Reimbursement Methodologies',
        description: 'Coding supplies, equipment, injectable drugs, Medicare NCCI edits, and compliance guidelines.',
      },
    ],
    prepApproach: [
      'Tab and highlight your official CPT®, ICD-10-CM, and HCPCS Level II codebooks prior to exam day.',
      'Practice rapid codebook lookup techniques to average under 2.4 minutes per question.',
      'Master Evaluation and Management (E/M) guideline changes and medical decision-making (MDM) tables.',
      'Work through full-length practice exams using physical codebooks under timed conditions.',
    ],
    faqs: [
      {
        question: 'Is AAPC itself a certification?',
        answer:
          'No. AAPC is the professional association that awards medical coding credentials such as CPC® (Certified Professional Coder), CIC®, and COC®.',
      },
      {
        question: 'Are codebooks allowed during AAPC online proctored exams?',
        answer:
          'Yes! AAPC exams are open-book examinations requiring approved physical codebooks (CPT®, ICD-10-CM, HCPCS Level II).',
      },
      {
        question: 'How does TUTOR PROCTORED EXAMS help with AAPC prep?',
        answer:
          'We offer 1-on-1 tutoring from certified medical coders covering codebook tabbing, operative report coding, E/M guidelines, and practice exams.',
      },
    ],
  },

  cpc: {
    slug: 'cpc',
    title: 'CPC',
    fullName: 'Certified Professional Coder',
    category: 'Healthcare & Medical Coding',
    governingBody: 'American Academy of Professional Coders (AAPC)',
    tagline: 'The gold standard medical coding certification for physician offices and outpatient clinics.',
    overview:
      'The Certified Professional Coder (CPC)® credential is the standard for medical coding in physician office and outpatient settings. CPC coders read clinical documentation, extract key procedures and diagnoses, and assign accurate CPT®, ICD-10-CM, and HCPCS Level II codes for reimbursement and compliance.',
    targetAudience: [
      'Outpatient Medical Coders working in physician clinics, surgical centers, and group practices',
      'Medical Billing Specialists expanding their career into certified coding roles',
      'Healthcare Management graduates entering medical records and revenue cycle management',
    ],
    examFormat: {
      totalQuestions: '100 multiple-choice questions',
      duration: '4 hours (240 minutes)',
      passingScore: '70% correct score required to pass',
      format: 'Open physical codebook exam divided into anatomical body systems, E/M, Anesthesia, Radiology, and Compliance',
      proctoring: 'Delivered via Meazure Learning live online proctoring or AAPC in-person proctored test centers',
    },
    domains: [
      {
        name: 'Surgical Coding & Body Systems (10000 - 60000 Series)',
        description: 'Integumentary, Musculoskeletal, Respiratory, Cardiovascular, Digestive, Urinary, and Endocrine procedure coding.',
      },
      {
        name: 'Evaluation & Management (E/M) & Anesthesia',
        description: 'Physician visit coding, Medical Decision Making (MDM) complexity levels, time-based coding, and anesthesia modifiers.',
      },
      {
        name: 'Radiology, Pathology & Laboratory',
        description: 'Diagnostic imaging, ultrasound, blood panels, surgical pathology, and molecular testing codes.',
      },
      {
        name: 'Anatomy, Medical Terminology & Compliance',
        description: 'Human anatomy fundamentals, medical prefix/suffix definitions, HIPAA, NCCI edits, and OIG guidelines.',
      },
    ],
    prepApproach: [
      'Pre-tab codebooks by anatomical section and major guideline appendices for speed.',
      'Practice coding real operative reports and clinical progress notes under timed exam conditions.',
      'Focus heavily on E/M coding guidelines and modifier applications (-25, -59, -50, -57).',
      'Work with a dedicated medical coding tutor to resolve recurring guideline misunderstandings.',
    ],
    faqs: [
      {
        question: 'What is the difference between CPC and CPC-A?',
        answer:
          'CPC-A indicates an Apprentice designation assigned to new coders. Once you complete 2 years of coding experience (or 1 year of experience + 80 hours of coding education), the apprentice designation is removed to award full CPC status.',
      },
      {
        question: 'What codebooks are required for the CPC exam?',
        answer:
          'You need current-year editions of CPT® Professional Edition (AMA), ICD-10-CM, and HCPCS Level II.',
      },
      {
        question: 'How can TUTOR PROCTORED EXAMS help me pass the CPC exam?',
        answer:
          'We provide personalized 1-on-1 CPC tutoring, operative report breakdown, codebook navigation strategies, and timed practice question reviews.',
      },
    ],
  },

  ccma: {
    slug: 'ccma',
    title: 'CCMA',
    fullName: 'Certified Clinical Medical Assistant',
    category: 'Healthcare & Medical Assisting',
    governingBody: 'National Healthcareer Association (NHA)',
    tagline: 'Nationally accredited clinical credential validating medical assistant patient care and administrative skills.',
    overview:
      'The Certified Clinical Medical Assistant (CCMA) credential awarded by NHA validates that healthcare professionals possess the clinical skills, medical terminology knowledge, phlebotomy, EKG, and administrative competence needed in modern ambulatory care settings.',
    targetAudience: [
      'Clinical Medical Assistants working in physician clinics, urgent care centers, and specialty practices',
      'Medical Assisting students completing their diploma or associate degree programs',
      'Healthcare workers seeking national NHA certification for career advancement',
    ],
    examFormat: {
      totalQuestions: '150 multiple-choice questions (135 scored, 15 pretest items)',
      duration: '3 hours (180 minutes)',
      passingScore: 'Scaled score of 390 or higher (out of 500)',
      format: 'Multiple-choice computer-based examination covering clinical, administrative, and safety domains',
      proctoring: 'Delivered via PSI online proctoring or at school/institution testing locations',
    },
    domains: [
      {
        name: 'Foundational Knowledge & Basic Science (10%)',
        description: 'Anatomy and physiology, medical terminology, nutrition, growth and development, and disease processes.',
      },
      {
        name: 'Anatomy & Physiology & Clinical Patient Care (56%)',
        description: 'Vital signs, patient history, infection control, assisting with physical exams, pharmacology, and medication administration.',
      },
      {
        name: 'Diagnostics, Phlebotomy & EKG (20%)',
        description: 'Venipuncture techniques, specimen handling, CLIA-waived testing, 12-lead EKG placement, and cardiac artifact identification.',
      },
      {
        name: 'Communication & Administrative Responsibilities (14%)',
        description: 'EHR documentation, appointment scheduling, patient communication, medical law, and HIPAA compliance.',
      },
    ],
    prepApproach: [
      'Review the official NHA CCMA test plan domain breakdown.',
      'Focus heavily on clinical patient care, infection control guidelines (CDC/OSHA), and pharmacology math.',
      'Practice EKG strip interpretation and phlebotomy order of draw flashcards.',
      'Complete timed full-length mock exams to practice pacing for 150 questions.',
    ],
    faqs: [
      {
        question: 'What organization awards the CCMA certification?',
        answer:
          'The CCMA (Certified Clinical Medical Assistant) credential is administered and awarded by the National Healthcareer Association (NHA).',
      },
      {
        question: 'How long is the CCMA exam, and how many questions are on it?',
        answer:
          'The CCMA exam contains 150 multiple-choice questions and allows 3 hours (180 minutes) to complete.',
      },
      {
        question: 'How can TUTOR PROCTORED EXAMS support my CCMA prep?',
        answer:
          'We offer 1-on-1 tutoring covering clinical procedures, pharmacology calculations, EKG/phlebotomy concepts, and full practice exam reviews.',
      },
    ],
  },
};
