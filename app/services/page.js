import React from 'react';
import Link from 'next/link';
import { Users, BookOpen, FileCheck, Award, Calendar, Cpu, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContentCard from '@/components/ui/ContentCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { SERVICES_DATA } from '@/lib/data/servicesData';

export const metadata = {
  title: 'Our Educational Support Services | TUTOR PROCTORED EXAMS',
  description:
    'Explore personalized tutoring, structured examination preparation, practice question banks, professional certification prep, study planning, and proctoring software technical guidance.',
  keywords: [
    'educational support services',
    'one-to-one tutoring',
    'academic exam preparation',
    'practice questions mock tests',
    'professional certification preparation',
    'study planning revision support',
    'examination software technical guidance',
  ],
};

export default function ServicesHubPage() {
  const serviceList = Object.values(SERVICES_DATA);

  // Icon map matching service slugs
  const iconMap = {
    'one-to-one-tutoring': Users,
    'academic-exam-preparation': BookOpen,
    'practice-questions-mock-tests': FileCheck,
    'professional-certification-preparation': Award,
    'study-planning': Calendar,
    'examination-software-technical-guidance': Cpu,
  };

  return (
    <div className="space-y-16 py-10 pb-20">
      <PageContainer>
        <Breadcrumb items={[{ label: 'Our Services' }]} />

        {/* Hero Section */}
        <div className="relative bg-brand-navy text-white rounded-2xl p-8 sm:p-12 overflow-hidden my-6">
          <div className="absolute inset-0 z-0 opacity-25 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')" }}></div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-brand-blue/20 text-brand-lightBlue border-brand-blue/30 px-3 py-1">
              Academic & Technical Support
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              OUR EDUCATIONAL SUPPORT SERVICES
            </h1>

            <p className="text-base sm:text-lg text-brand-muted/90 leading-relaxed text-balance">
              Explore personalized tutoring, structured examination preparation, and professional certification study support designed to help you build knowledge, improve your skills, and pursue your academic and professional goals.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Contact Us
              </Button>
              <Button href="/about" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Integrity Policy
              </Button>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 text-xs text-brand-muted border-t border-white/10">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-blue" /> 100% Ethical Academic Standard</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-blue" /> Qualified Specialist Tutors</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-brand-blue" /> Individualized Study Guidance</span>
            </div>
          </div>
        </div>

        {/* 6 Services Grid */}
        <div className="space-y-8 mt-12">
          <SectionHeading
            badge="Service Directory"
            title="Tailored Services for Independent Success"
            subtitle="Select a service below to explore detailed offerings, target groups, study methodologies, and related certification roadmaps."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceList.map((service) => (
              <ContentCard
                key={service.slug}
                title={service.title}
                description={service.tagline || service.overview}
                badge={service.category}
                icon={iconMap[service.slug] || BookOpen}
                href={`/services/${service.slug}`}
                actionText="Explore This Service"
              />
            ))}
          </div>
        </div>

        {/* Educational Disclaimer Banner */}
        <div className="mt-14 bg-white p-6 rounded-xl border border-brand-border space-y-2">
          <h4 className="font-bold text-brand-navy text-sm">Academic Integrity Notice</h4>
          <p className="text-brand-muted text-xs leading-relaxed">
            TUTOR PROCTORED EXAMS is a professional academic support and tutoring service. We strictly adhere to academic integrity standards. All services are focused on genuine learning, concept explanations, study strategy coaching, practice testing, and legitimate hardware/software system guidance.
          </p>
        </div>

        {/* Conversion CTA */}
        <div className="mt-12 bg-brand-navy text-white rounded-xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Need Guidance Choosing the Right Service?</h3>
          <p className="text-brand-muted text-sm max-w-xl mx-auto">
            Our educational specialists are available to discuss your course syllabus, examination platform, or target certification to recommend the best learning support package.
          </p>
          <div>
            <Button href="/contact" variant="primary" size="md">
              Discuss Your Learning Goals
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
