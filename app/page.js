import React from 'react';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  FileCheck,
  Award,
  Calendar,
  Cpu,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Target,
  Compass,
  Layers,
  ChevronRight,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import ContentCard from '@/components/ui/ContentCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import FaqAccordion from '@/components/ui/FaqAccordion';

export const metadata = {
  title: 'TUTOR PROCTORED EXAMS | Professional Tutoring & Exam Preparation',
  description:
    'Discover professional tutoring, structured exam preparation, practice resources, professional certification guidance (PMP, CompTIA, AAPC, CPC, CCMA), and legitimate examination software technical support for students and professionals worldwide.',
};

export default function HomePage() {
  // 1. Examination Platforms Data with direct links
  const examPlatforms = [
    {
      name: 'Respondus LockDown Browser',
      category: 'Browser Security',
      description: 'Custom browser environment guidance, system requirements verification, and pre-test setup checklists.',
      href: '/exam-platforms/respondus-lockdown-browser',
    },
    {
      name: 'Examplify',
      category: 'Assessment Software',
      description: 'ExamSoft system preparation, computer requirements checks, and offline exam download troubleshooting.',
      href: '/exam-platforms/examplify',
    },
    {
      name: 'Honorlock',
      category: 'Chrome Extension Proctoring',
      description: 'Chrome extension technical preparation, webcam setup guidelines, and network stability advice.',
      href: '/exam-platforms/honorlock',
    },
    {
      name: 'ProctorU / Meazure Learning',
      category: 'Live & Automated Proctoring',
      description: 'Live technician connection advice, room setup standards, and equipment compatibility reviews.',
      href: '/exam-platforms/proctoru-meazure-learning',
    },
    {
      name: 'Proctorio',
      category: 'Automated Monitoring',
      description: 'Browser permission checks, audio/video testing advice, and system diagnostic preparation.',
      href: '/exam-platforms/proctorio',
    },
    {
      name: 'Proctortrack',
      category: 'Identity Verification',
      description: 'Biometric profile setup requirements, system hardware guidance, and environment scans.',
      href: '/exam-platforms/proctortrack',
    },
    {
      name: 'Examity',
      category: 'Live & Auto Testing',
      description: 'Proctoring level specifications, authentication steps, and system performance checks.',
      href: '/exam-platforms/examity',
    },
    {
      name: 'PSI',
      category: 'Licensing & Certification',
      description: 'PSI Bridge browser requirements, candidate handbook review, and test environment readiness.',
      href: '/exam-platforms/psi',
    },
    {
      name: 'ATI',
      category: 'Nursing Education (TEAS)',
      description: 'ATI TEAS examination format review, subject tutoring, and dry-run equipment guidance.',
      href: '/exam-platforms/ati',
    },
  ];

  // 2. Professional Certifications Data with direct links
  const certifications = [
    {
      name: 'PMP',
      fullName: 'Project Management Professional',
      body: 'PMI',
      description: 'Structured domain coaching across People, Process, and Business Environment pillars with practice questions.',
      href: '/certifications/pmp',
    },
    {
      name: 'CompTIA',
      fullName: 'Security+, A+, Network+',
      body: 'CompTIA',
      description: 'Foundational and intermediate IT infrastructure, cybersecurity, and networking certification preparation.',
      href: '/certifications/comptia',
    },
    {
      name: 'AAPC',
      fullName: 'Medical Coding Prep',
      body: 'AAPC',
      description: 'Comprehensive ICD-10-CM, CPT, and HCPCS coding exam preparation and codebook navigation guides.',
      href: '/certifications/aapc',
    },
    {
      name: 'CPC',
      fullName: 'Certified Professional Coder',
      body: 'AAPC',
      description: 'Specialized preparation for physician practice coding exams, operative reports, and guidelines.',
      href: '/certifications/cpc',
    },
    {
      name: 'CCMA',
      fullName: 'Certified Clinical Medical Assistant',
      body: 'NHA',
      description: 'Clinical procedures, phlebotomy, EKG fundamentals, and medical office management exam preparation.',
      href: '/certifications/ccma',
    },
  ];

  // 3. Core Educational Services
  const coreServices = [
    {
      title: 'One-to-One Tutoring',
      description: 'Direct instruction with qualified subject specialists focused on identifying knowledge gaps and clarifying complex concepts.',
      icon: Users,
      badge: 'Personalized Learning',
      href: '/services/one-to-one-tutoring',
    },
    {
      title: 'Academic Exam Preparation',
      description: 'Structured study plans, key concept reviews, and active recall practice for midterms, finals, and standardized tests.',
      icon: BookOpen,
      badge: 'Exam Readiness',
      href: '/services/academic-exam-preparation',
    },
    {
      title: 'Practice Questions & Mock Tests',
      description: 'Authentic style practice question banks, detailed answer explanations, and timed mock exam walkthroughs.',
      icon: FileCheck,
      badge: 'Practice Resources',
      href: '/services/practice-questions-mock-tests',
    },
    {
      title: 'Professional Certification Prep',
      description: 'Targeted domain review, question strategy, and practice modules for PMP, CompTIA, AAPC, CPC, and CCMA credentials.',
      icon: Award,
      badge: 'Career Credentials',
      href: '/services/professional-certification-preparation',
    },
    {
      title: 'Study Planning & Revision Support',
      description: 'Customized weekly study schedules, spaced repetition roadmaps, and time management coaching for busy students.',
      icon: Calendar,
      badge: 'Structured Study',
      href: '/services/study-planning',
    },
    {
      title: 'Software Technical Guidance',
      description: 'Legitimate guidance on hardware specs, OS updates, camera setup, and software troubleshooting prior to exam day.',
      icon: Cpu,
      badge: 'System Guidance',
      href: '/services/examination-software-technical-guidance',
    },
  ];

  // 4. Why Choose Us Benefits
  const benefits = [
    {
      title: 'Structured Learning Support',
      description: 'Clear, step-by-step preparation frameworks designed to make study time productive and focused.',
      icon: Layers,
    },
    {
      title: 'Personalized Study Guidance',
      description: 'Tailored academic support aligned with your course syllabus, exam platform, or certification goals.',
      icon: Target,
    },
    {
      title: 'Clear Learning Resources',
      description: 'Comprehensive study notes, practice questions, and technical checklists without fluff.',
      icon: BookOpen,
    },
    {
      title: 'Flexible Support Options',
      description: 'Choose between 1-on-1 tutoring sessions, self-paced practice banks, or technical readiness checks.',
      icon: Compass,
    },
    {
      title: 'Professional Educational Approach',
      description: 'Ground in legitimate academic tutoring methods that build long-term understanding and confidence.',
      icon: ShieldCheck,
    },
    {
      title: 'Student-Focused Experience',
      description: 'Dedicated to helping college students and working professionals worldwide reach their educational milestones.',
      icon: Sparkles,
    },
  ];

  // 5. How It Works Steps
  const steps = [
    {
      step: '01',
      title: 'Explore Our Services',
      description: 'Review our directory of subject tutoring, certification prep, and proctoring software technical guides.',
    },
    {
      step: '02',
      title: 'Choose Your Learning Support',
      description: 'Select the specific subject area, certification roadmap, or system compatibility review you require.',
    },
    {
      step: '03',
      title: 'Get a Study Plan',
      description: 'Receive a structured study timeline and practice resources aligned with your target examination date.',
    },
    {
      step: '04',
      title: 'Work Toward Your Goals',
      description: 'Engage with our study materials and tutors to build the knowledge and confidence to test independently.',
    },
  ];

  // 6. Educational Articles & Resources
  const articles = [
    {
      title: 'How to Prepare for a Proctored Examination',
      description: 'Essential checklist covering room setup, identification verification, technical pre-checks, and mental preparation.',
      category: 'Exam Tips',
      slug: 'how-to-prepare-for-a-proctored-examination',
    },
    {
      title: 'Respondus LockDown Browser: Student Preparation Guide',
      description: 'Step-by-step guidance on system requirements, closing background applications, and troubleshooting webcams.',
      category: 'Software Guide',
      slug: 'respondus-lockdown-browser-student-guide',
    },
    {
      title: 'Understanding Professional Certification Exams',
      description: 'How knowledge domains are weighted on national exams and effective strategies for scenario-based questions.',
      category: 'Certifications',
      slug: 'understanding-professional-certification-exams',
    },
    {
      title: 'Effective Study Planning for College Students',
      description: 'Practical time-blocking, active recall, and spaced repetition methods for higher education success.',
      category: 'Study Habits',
      slug: 'effective-study-planning-college-students',
    },
    {
      title: 'How to Prepare for the PMP Certification',
      description: 'In-depth review of PMI exam syllabus changes, predictive vs. agile methodologies, and practice strategies.',
      category: 'PMP Prep',
      slug: 'pmp-certification-preparation-guide',
    },
  ];

  // 7. Master FAQs Data
  const faqs = [
    {
      question: 'What types of tutoring services do you provide?',
      answer:
        'We offer one-to-one online subject tutoring across undergraduate academic subjects, standardized test preparation, and technical guidance for software compatibility. All tutoring is focused on genuine subject understanding and skill development.',
    },
    {
      question: 'How do you support exam preparation?',
      answer:
        'Our exam preparation includes structured study planning, domain content reviews, practice question walkthroughs, and time management strategies to ensure students can take their exams independently and confidently.',
    },
    {
      question: 'What support is available for professional certifications?',
      answer:
        'We offer dedicated study roadmaps, practice questions, and syllabus reviews for high-demand certifications including PMP, CompTIA (Security+, A+, Network+), AAPC Medical Coding, CPC, and CCMA.',
    },
    {
      question: 'What is examination software technical guidance?',
      answer:
        'We provide legitimate technical advice on operating system compatibility, browser permissions, webcam/microphone setup, and resolving common software conflicts for platforms like Respondus, Examplify, Honorlock, and ProctorU before test day.',
    },
    {
      question: 'Do you take examinations for students or offer cheating services?',
      answer:
        'No. TUTOR PROCTORED EXAMS strictly adheres to academic integrity. We do NOT take exams for students, provide impersonation services, or assist in bypassing proctoring software. Our sole purpose is legitimate tutoring, preparation, and technical guidance.',
    },
    {
      question: 'How do I contact your team or get started?',
      answer:
        'You can get started by clicking "Get Started" or "Contact Our Team" to submit an inquiry through our Contact page. An educational specialist will connect with you to discuss your learning goals.',
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-14 pb-10">
      {/* 1. HERO SECTION WITH STUDENTS.JPG BACKGROUND */}
      <section className="relative text-white pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden bg-[#0F172A]">
        {/* Fully Visible Background Image: students .jpg */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-85"
          style={{ backgroundImage: "url('/students.jpg')" }}
        ></div>

        {/* Soft Dark Side Shade For Crisp Text Legibility */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/65 to-transparent"></div>

        <PageContainer className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <Badge variant="blue" className="bg-[#2563EB] text-white border-blue-400 px-3.5 py-1 text-xs shadow-md">
                Ethical Academic Support & Certification Guidance
              </Badge>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)]">
                Your Academic and Exams Success Starts With The Right Approach
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-100 leading-relaxed max-w-2xl text-balance drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] font-medium">
                Discover professional tutoring, structured exam preparation, practice resources, and certification guidance designed to help you pass your exams.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button href="/services" variant="primary" size="lg" icon={ArrowRight} className="bg-[#2563EB] hover:bg-[#1D4ED8] shadow-xl">
                  Explore Our Services
                </Button>
                <Link
                  href="/exam-platforms"
                  className="px-6 py-3 rounded-xl border-2 border-white/90 bg-[#0F172A]/70 text-white font-extrabold text-sm sm:text-base hover:bg-white hover:text-[#0F172A] transition-all backdrop-blur-md shadow-lg text-center flex items-center justify-center gap-2"
                >
                  <span>Explore Exam Platforms</span>
                </Link>
              </div>

              {/* Trust Intro Line */}
              <div className="pt-6 flex items-center gap-3 text-xs sm:text-sm text-white font-semibold border-t border-white/30 drop-shadow-md">
                <ShieldCheck className="w-5 h-5 text-[#356AE6] shrink-0" />
                <span>Ethical Academic Tutoring • Software Compatibility Guidance • Global Reach</span>
              </div>
            </div>

            {/* Visual Hero Feature Box (Matching Reference Image) */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden">
                <div className="flex items-center gap-3.5 border-b border-white/15 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-sm text-white shadow-inner shrink-0">
                    TPE
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-white leading-tight drop-shadow-sm">
                      Ethical Learning Commitment
                    </h4>
                    <span className="text-xs text-slate-300 font-medium block mt-0.5">
                      Global Educational Support
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm font-bold text-white">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-white/50 bg-white/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="drop-shadow-sm">1-on-1 Subject Coaching & Concept Reviews</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-white/50 bg-white/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="drop-shadow-sm">Proctoring Software System Checks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-white/50 bg-white/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="drop-shadow-sm">PMP, CompTIA, AAPC & CPC Exam Prep</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-white/50 bg-white/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="drop-shadow-sm">Independent Student Mastery Focus</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className="text-xs font-extrabold text-white underline underline-offset-4 inline-flex items-center gap-1.5 hover:text-blue-300 transition-colors"
                  >
                    <span>Read our integrity pledge</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 2. EXAMINATION PLATFORMS SECTION */}
      <section>
        <PageContainer>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <SectionHeading
              badge="Platform Directory"
              title="EXAM PLATFORMS WE SUPPORT"
              subtitle="Explore preparation resources and guidance for widely used examination and proctoring platforms."
            />
            <Button href="/exam-platforms" variant="outline" size="md" icon={ArrowRight}>
              View Platform Directory
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examPlatforms.map((platform, idx) => (
              <ContentCard
                key={idx}
                title={platform.name}
                description={platform.description}
                badge={platform.category}
                icon={Cpu}
                href={platform.href}
                actionText="Learn More"
              />
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-brand-lightBlue/40 border border-brand-blue/20 text-xs text-brand-muted text-center">
            <p>
              <strong>Disclaimer:</strong> TUTOR PROCTORED EXAMS provides independent technical guidance and study resources. We are not affiliated with or endorsed by any third-party proctoring software vendors.
            </p>
          </div>
        </PageContainer>
      </section>

      {/* 3. PROFESSIONAL CERTIFICATIONS SECTION */}
      <section className="bg-white py-8 sm:py-10 border-y border-brand-border">
        <PageContainer>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <SectionHeading
              badge="Career Advancement"
              title="PREPARE FOR YOUR NEXT PROFESSIONAL MILESTONE"
              subtitle="Specialized domain coaching, exam syllabus breakdowns, and practice question reviews for leading professional credentials."
            />
            <Button href="/certifications" variant="outline" size="md" icon={ArrowRight}>
              All Certifications
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <ContentCard
                key={idx}
                title={`${cert.name} — ${cert.fullName}`}
                description={cert.description}
                badge={cert.body}
                icon={Award}
                href={cert.href}
                actionText="Explore Certification"
              />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* 4. OUR SERVICES SECTION */}
      <section>
        <PageContainer>
          <SectionHeading
            badge="What We Offer"
            title="OUR EDUCATIONAL SERVICES"
            subtitle="Tailored academic support services focused strictly on student learning and independent test readiness."
            centered
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, idx) => (
              <ContentCard
                key={idx}
                title={service.title}
                description={service.description}
                icon={service.icon}
                badge={service.badge}
                href={service.href}
                actionText="View service details"
              />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="bg-white py-8 sm:py-10 border-y border-brand-border">
        <PageContainer>
          <SectionHeading
            badge="Our Advantages"
            title="WHY CHOOSE TUTOR PROCTORED EXAMS"
            subtitle="We do the best we can to help you pass your exams and be a qualified professional."
            centered
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const IconComp = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-brand-bg border border-brand-border rounded-xl p-6 space-y-3 transition-all duration-200 hover:shadow-card hover:bg-white"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-lightBlue text-brand-blue flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy">{benefit.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </PageContainer>
      </section>

      {/* 6. HOW IT WORKS */}
      <section>
        <PageContainer>
          <SectionHeading
            badge="Simple Process"
            title="HOW IT WORKS"
            subtitle="A straightforward four-step approach to achieving your educational and certification goals."
            centered
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-brand-border shadow-md">
              <img
                src="/how.jpg"
                alt="How TUTOR PROCTORED EXAMS Works"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative bg-white border border-brand-border rounded-xl p-5 space-y-2 hover:border-brand-blue/40 transition-colors shadow-sm"
                >
                  <div className="text-2xl font-extrabold text-brand-blue/30 font-mono">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-brand-navy">{step.title}</h3>
                  <p className="text-xs text-brand-muted leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 8. FAQ SECTION */}
      <section>
        <PageContainer>
          <SectionHeading
            badge="Got Questions?"
            title="FREQUENTLY ASKED QUESTIONS"
            subtitle="Clear answers about our tutoring services, certification coaching, software guidance, and ethical standards."
            centered
            className="mb-6"
          />

          <FaqAccordion items={faqs} />
        </PageContainer>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="bg-brand-navy text-white py-10 sm:py-12 rounded-2xl mx-4 sm:mx-6 lg:mx-8">
        <PageContainer>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="blue" className="bg-brand-blue/20 text-brand-lightBlue border-brand-blue/30 px-3 py-1">
              Start Your Preparation Today
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              READY TO TAKE THE NEXT STEP?
            </h2>

            <p className="text-base sm:text-lg text-brand-muted/90 leading-relaxed max-w-xl mx-auto text-balance">
              Find the educational support and preparation resources that match your goals.
            </p>

            <div className="pt-4 flex items-center justify-center">
              <Button href="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Contact Our Team
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
