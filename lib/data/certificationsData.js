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

  capm: {
    slug: 'capm',
    title: 'CAPM',
    fullName: 'Certified Associate in Project Management',
    category: 'Project Management',
    governingBody: 'Project Management Institute (PMI)',
    tagline: 'Entry-level PMI project management credential establishing foundational PM and agile skills.',
    overview:
      'The Certified Associate in Project Management (CAPM)® credential awarded by PMI is the premier entry-level certification for project management. It validates understanding of core project management terminology, predictive process groups, agile frameworks, and business analysis principles.',
    targetAudience: [
      'Entry-level Project Coordinators, Junior Project Managers, and PMO Associates',
      'Undergraduate students and recent graduates building project management credentials',
      'Team members and professionals wanting to transition into project management roles',
    ],
    examFormat: {
      totalQuestions: '150 multiple-choice questions (135 scored, 15 pretest items)',
      duration: '185 minutes',
      passingScore: 'Criterion-referenced passing score set by PMI psychometric analysis',
      format: 'Computer-based exam featuring multiple-choice, matching, and scenario questions',
      proctoring: 'Delivered via Pearson VUE online proctoring (OnVUE) or Pearson VUE testing centers',
    },
    domains: [
      {
        name: 'Project Management Fundamentals & Core Concepts (36%)',
        description: 'Project lifecycles, project governance, organizational structures, stakeholder management, and project integration.',
      },
      {
        name: 'Predictive, Plan-Based Methodologies (20%)',
        description: 'Traditional waterfall processes, scope baselines, schedule network diagrams, Earned Value Management (EVM), and risk logs.',
      },
      {
        name: 'Agile Frameworks & Methodologies (20%)',
        description: 'Agile manifesto principles, Scrum ceremonies, Kanban boards, sprint planning, backlog refinement, and servant leadership.',
      },
      {
        name: 'Business Analysis Frameworks (24%)',
        description: 'Requirements gathering, business analysis roles, stakeholder engagement, traceability matrices, and value delivery.',
      },
    ],
    prepApproach: [
      'Review the latest PMI CAPM Examination Content Outline (ECO).',
      'Study PMBOK® Guide 7th Edition, Process Groups Practice Guide, and Business Analysis for Practitioners.',
      'Practice Earned Value Management (EVM) math formulas (CPI, SPI, CV, SV).',
      'Complete timed practice question banks covering Scrum, Kanban, and traditional PM processes.',
    ],
    faqs: [
      {
        question: 'What are the eligibility requirements for the CAPM exam?',
        answer:
          'Candidates need a high school diploma (or associate degree) and either 23 hours of project management education or 1,500 hours of project experience.',
      },
      {
        question: 'Does the new CAPM exam cover Agile and Business Analysis?',
        answer:
          'Yes! The CAPM exam content outline allocates 20% to Agile Frameworks and 24% to Business Analysis Frameworks.',
      },
      {
        question: 'How can TUTOR PROCTORED EXAMS help with CAPM prep?',
        answer:
          'We provide 1-on-1 coaching covering EVM math, Scrum principles, PMBOK concepts, and full mock exam reviews.',
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
      'Government and enterprise IT contractors requiring baseline compliance',
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
        question: 'Do CompTIA certifications satisfy baseline IT compliance requirements?',
        answer:
          'Yes! CompTIA Security+ is one of the most widely accepted baseline credentials for enterprise and government cybersecurity roles.',
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

  shrm: {
    slug: 'shrm',
    title: 'SHRM-CP / SHRM-SCP',
    fullName: 'Society for Human Resource Management Certifications',
    category: 'Human Resources & Management',
    governingBody: 'Society for Human Resource Management (SHRM)',
    tagline: 'Premier global HR credentials validating strategic leadership, behavioral competencies, and HR expertise.',
    overview:
      'The SHRM-CP (Certified Professional) and SHRM-SCP (Senior Certified Professional) credentials establish global recognition for HR practitioners. They validate behavioral competencies and technical HR knowledge required to lead organizational strategy, employee relations, talent acquisition, and compliance.',
    targetAudience: [
      'HR Specialists, Generalists, and Coordinators advancing to managerial roles (SHRM-CP)',
      'HR Directors, VPs, and Consultants driving organizational strategy (SHRM-SCP)',
      'Business leaders and recruiters seeking globally recognized HR credentialing',
    ],
    examFormat: {
      totalQuestions: '134 questions (80 knowledge-based, 54 situational judgment scenarios)',
      duration: '3 hours 40 minutes (220 minutes)',
      passingScore: 'Scaled score of 200 out of 200-500 scale',
      format: 'Computer-based exam featuring Knowledge Items and Situational Judgment Items (SJIs)',
      proctoring: 'Delivered via Prometric live online proctoring or Prometric test centers',
    },
    domains: [
      {
        name: 'Behavioral Competencies (Leadership, Interpersonal, Business)',
        description: 'Leadership & Navigation, Ethical Practice, Diversity, Equity & Inclusion, Relationship Management, Communication, and Business Acumen.',
      },
      {
        name: 'HR Expertise: People (Talent Acquisition & Employee Engagement)',
        description: 'HR Strategy, Talent Acquisition, Employee Engagement & Retention, Learning & Development, and Total Rewards.',
      },
      {
        name: 'HR Expertise: Organization & Workplace (Compliance & Risk)',
        description: 'Structure of HR, Organizational Effectiveness, Workforce Management, Employee Relations, Technology Management, and Global HR Compliance.',
      },
    ],
    prepApproach: [
      'Study the official SHRM Body of Applied Skills and Knowledge (SHRM BASK®).',
      'Focus heavily on Situational Judgment Items (SJIs), applying the "SHRM Mindset" to scenario questions.',
      'Review core labor laws, EEOC regulations, FMLA, FLSA, and ERISA compliance rules.',
      'Complete full-length timed mock exams and analyze item rationales with an HR specialist tutor.',
    ],
    faqs: [
      {
        question: 'What is the difference between SHRM-CP and SHRM-SCP?',
        answer:
          'SHRM-CP is designed for HR professionals performing operational/tactical duties, while SHRM-SCP is intended for senior HR leaders executing strategic organizational policy.',
      },
      {
        question: 'What are Situational Judgment Items (SJIs)?',
        answer:
          'SJIs are scenario-based questions that test your ability to evaluate workplace conflict and select the most effective HR action according to the SHRM BASK®.',
      },
      {
        question: 'How does TUTOR PROCTORED EXAMS support SHRM exam prep?',
        answer:
          'We provide 1-on-1 coaching focusing on SHRM BASK® competencies, SJI scenario breakdown, labor law compliance, and timed practice test reviews.',
      },
    ],
  },

  'real-estate': {
    slug: 'real-estate',
    title: 'Real Estate License',
    fullName: 'Real Estate Salesperson & Broker Licensing Exam',
    category: 'Real Estate & Business Licensing',
    governingBody: 'State Real Estate Licensing Commissions / PSI / Pearson VUE',
    tagline: 'Comprehensive prep for real estate salesperson and broker licensing examinations.',
    overview:
      'The Real Estate Licensing Exam is required to legally practice as a licensed real estate salesperson or broker. The exam tests national real estate principles, land use controls, contracts, financing math, agency law, and specific real estate statutes.',
    targetAudience: [
      'Aspiring Real Estate Agents completing pre-licensing coursework',
      'Salespersons preparing to upgrade to Licensed Real Estate Broker status',
      'Property Managers and Real Estate Investors seeking professional licensing',
    ],
    examFormat: {
      totalQuestions: '100-150 multiple-choice items (divided into National and State portions)',
      duration: '3.5 to 4 hours (210-240 minutes)',
      passingScore: '70% to 75% correct score depending on licensing board requirements',
      format: 'Computer-based exam with National Real Estate Principles and State Law sections',
      proctoring: 'Delivered via PSI, Pearson VUE, or AMP proctored test centers and online proctoring',
    },
    domains: [
      {
        name: 'National Real Estate Principles & Agency Law',
        description: 'Property ownership types, land description methods, agency relationships, fiduciary duties, and Fair Housing Acts.',
      },
      {
        name: 'Real Estate Contracts, Financing & Valuation',
        description: 'Purchase agreements, leases, options, mortgages, trust deeds, appraisal methods, and real estate math calculations.',
      },
      {
        name: 'State Laws, Licensing Rules & Commission Practices',
        description: 'Licensing statutes, disclosure requirements, escrow account management, disciplinary actions, and local regulations.',
      },
    ],
    prepApproach: [
      'Master national real estate vocabulary and core legal terminology.',
      'Practice real estate math calculations (commission splits, proration, LTV ratios, amortization, land square footage).',
      'Study specific licensing statutes, disclosure mandates, and escrow handling rules.',
      'Take timed practice exams for both the National and State portions with a real estate exam tutor.',
    ],
    faqs: [
      {
        question: 'What are the two main sections of the real estate licensing exam?',
        answer:
          'The exam includes a National portion (covering general real estate principles and math) and a State portion (covering local real estate laws and regulations).',
      },
      {
        question: 'What real estate math topics appear on the exam?',
        answer:
          'Expect calculations for property taxes, commission splits, loan-to-value ratios, net proceeds, acreage conversions, and proration.',
      },
      {
        question: 'How can TUTOR PROCTORED EXAMS help me pass my real estate exam?',
        answer:
          'We offer 1-on-1 tutoring covering real estate math formulas, agency law concepts, contract clauses, and state portion practice questions.',
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
      'AAPC is a premier education and credentialing organization for medical coders, billers, auditors, and practice managers. Preparing for an AAPC exam requires deep familiarity with official CPT®, ICD-10-CM, and HCPCS Level II codebooks, guidelines, and reimbursement principles.',
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
      proctoring: 'Delivered via Meazure Learning online proctoring or in-person testing centers',
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
        description: 'Coding supplies, equipment, injectable drugs, NCCI edits, and compliance guidelines.',
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
      proctoring: 'Delivered via Meazure Learning live online proctoring or in-person proctored test centers',
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
    tagline: 'Accredited clinical credential validating medical assistant patient care and administrative skills.',
    overview:
      'The Certified Clinical Medical Assistant (CCMA) credential awarded by NHA validates that healthcare professionals possess the clinical skills, medical terminology knowledge, phlebotomy, EKG, and administrative competence needed in modern ambulatory care settings.',
    targetAudience: [
      'Clinical Medical Assistants working in physician clinics, urgent care centers, and specialty practices',
      'Medical Assisting students completing their diploma or associate degree programs',
      'Healthcare workers seeking certification for career advancement',
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

  cna: {
    slug: 'cna',
    title: 'CNA',
    fullName: 'Certified Nursing Assistant',
    category: 'Healthcare & Nursing',
    governingBody: 'State Board of Nursing / Prometric / Pearson VUE / Credentia',
    tagline: 'Essential healthcare credential validating direct patient care, infection control, and clinical nursing skills.',
    overview:
      'The Certified Nursing Assistant (CNA) exam validates foundational patient care skills, safety protocols, infection control, and basic nursing concepts. Passing the state CNA competency exam is required to earn certification and practice in hospitals, long-term care facilities, and home health settings.',
    targetAudience: [
      'Nursing Assistant students preparing for state competency evaluation exams',
      'Pre-nursing students gaining clinical hours for RN/BSN program admissions',
      'Healthcare aides seeking state certification for employment in hospitals and care facilities',
    ],
    examFormat: {
      totalQuestions: '60-70 multiple-choice written items + 3-5 hand-on clinical skills evaluation',
      duration: '90 minutes written/oral exam + 30-45 minutes clinical skills evaluation',
      passingScore: 'State-specific passing score (typically 70%-75% written + 100% on safety skills)',
      format: 'Computer-based written/oral knowledge exam plus live clinical skills demonstration',
      proctoring: 'Prometric, Credentia, or Headmaster state-approved testing locations',
    },
    domains: [
      {
        name: 'Physical Care Skills & Basic Nursing (40%)',
        description: 'Assisting with activities of daily living (ADLs), hygiene, nutrition, mobility, vital signs, and catheter care.',
      },
      {
        name: 'Safety, Infection Control & Emergency Procedures (30%)',
        description: 'Hand hygiene guidelines, standard precautions, body mechanics, fire safety, and Heimlich maneuver.',
      },
      {
        name: 'Psychosocial Care & Communication Rights (30%)',
        description: 'Patient rights, emotional support, cultural competence, documentation, HIPAA, and abuse prevention reporting.',
      },
    ],
    prepApproach: [
      'Review official state CNA candidate handbooks and skill evaluation checklists.',
      'Practice timed written knowledge questions covering infection control and vital signs.',
      'Memorize step-by-step clinical skill steps, focusing on mandatory safety check steps.',
      'Work through practice exams and review rationale breakdowns with a healthcare tutor.',
    ],
    faqs: [
      {
        question: 'What are the two parts of the CNA exam?',
        answer:
          'The CNA exam consists of a written (or oral) knowledge examination and a hands-on clinical skills demonstration evaluated by an RN examiner.',
      },
      {
        question: 'Which organizations administer state CNA exams?',
        answer:
          'CNA competency exams are administered by state-contracted vendors including Credentia, Prometric, Headmaster (D&S Diversified), or Pearson VUE.',
      },
      {
        question: 'How can TUTOR PROCTORED EXAMS help me pass the CNA exam?',
        answer:
          'We offer 1-on-1 tutoring covering written exam concepts, clinical skill checklists, infection control guidelines, and practice question walkthroughs.',
      },
    ],
  },

  cpht: {
    slug: 'cpht',
    title: 'CPhT',
    fullName: 'Certified Pharmacy Technician',
    category: 'Healthcare & Pharmacy',
    governingBody: 'Pharmacy Technician Certification Board (PTCB)',
    tagline: 'Nationally recognized credential for pharmacy technicians in retail, hospital, and compounding settings.',
    overview:
      'The Certified Pharmacy Technician (CPhT) credential administered by PTCB is the national standard for pharmacy technicians. It validates competence in pharmacy calculations, pharmacology terminology, medication safety, federal drug laws, and sterile/non-sterile compounding principles.',
    targetAudience: [
      'Pharmacy Technician Trainees and Assistants seeking national PTCB certification',
      'Retail, Community, and Hospital Pharmacy staff advancing their qualifications',
      'Students pursuing careers in health sciences, pharmacology, or nursing',
    ],
    examFormat: {
      totalQuestions: '90 multiple-choice questions (80 scored, 10 unscored pretest items)',
      duration: '1 hour 50 minutes (110 minutes total seat time)',
      passingScore: 'Scaled score of 1400 or higher (scale ranges from 1000 to 1600)',
      format: 'Computer-based exam featuring multiple-choice items and pharmacy math calculations',
      proctoring: 'Delivered via Pearson VUE online proctoring or Pearson VUE test centers',
    },
    domains: [
      {
        name: 'Medications & Pharmacology (40%)',
        description: 'Generic vs. brand drug names, drug classifications, therapeutic equivalency, side effects, interactions, and contraindications.',
      },
      {
        name: 'Federal Requirements & Pharmacy Law (12.5%)',
        description: 'DEA regulations, Controlled Substances Act, FDA drug recalls, HIPAA, Poison Prevention Packaging Act, and USP guidelines.',
      },
      {
        name: 'Patient Safety & Quality Assurance (26.25%)',
        description: 'High-alert medications, error prevention strategies, look-alike/sound-alike drugs, ISMP guidelines, and cleaning/sanitizing.',
      },
      {
        name: 'Order Entry, Processing & Pharmacy Math (21.25%)',
        description: 'Dose calculations, Pearson square, allegation, IV flow rates, day supply math, inventory management, and prescription verification.',
      },
    ],
    prepApproach: [
      'Memorize Top 200 drug brand/generic names, indications, and drug classes.',
      'Master pharmacy math calculations (alligations, dosage math, IV drip rates, ratio proportions).',
      'Review federal drug statutes (Controlled Substances Act schedules I-V, DEA Form 222 rules).',
      'Work through timed PTCB practice exams and review calculation steps with a pharmacy tutor.',
    ],
    faqs: [
      {
        question: 'What organization awards the CPhT certification?',
        answer:
          'The CPhT credential is administered and awarded by the Pharmacy Technician Certification Board (PTCB).',
      },
      {
        question: 'What type of math appears on the PTCB CPhT exam?',
        answer:
          'Pharmacy math includes dosage calculations, allegation grid methods, IV flow rate formulas, percentage strength, and day supply calculations.',
      },
      {
        question: 'How can TUTOR PROCTORED EXAMS help me pass the PTCB exam?',
        answer:
          'We offer 1-on-1 tutoring covering pharmacy math walkthroughs, Top 200 drug flashcard strategies, DEA law reviews, and practice tests.',
      },
    ],
  },
};
