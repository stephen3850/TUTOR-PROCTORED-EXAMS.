import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = {
  title: 'Terms of Service | TUTOR PROCTORED EXAMS',
  description: 'Terms of Service governing the use of TUTOR PROCTORED EXAMS website and educational support services.',
};

export default function TermsOfServicePage() {
  return (
    <PageContainer className="py-10 space-y-8 max-w-4xl">
      <Breadcrumb items={[{ label: 'Terms of Service' }]} />

      <SectionHeading
        badge="Legal Agreement"
        title="Terms of Service"
        subtitle="Last Updated: 2025"
      />

      <div className="prose prose-slate max-w-none text-brand-text space-y-4 text-sm leading-relaxed">
        <p>
          Welcome to TUTOR PROCTORED EXAMS. By accessing or using our website, you agree to be bound by these Terms of Service.
        </p>

        <h3 className="text-lg font-bold text-brand-navy pt-2">1. Scope of Educational Services</h3>
        <p>
          TUTOR PROCTORED EXAMS provides online tutoring, study strategy coaching, practice resources, and software system compatibility guidance. Our services are intended strictly for educational enrichment and preparation.
        </p>

        <h3 className="text-lg font-bold text-brand-navy pt-2">2. Academic Integrity Policy</h3>
        <p>
          Users agree to utilize our services ethically. We strictly prohibit any use of our platform or services for impersonation, taking examinations on behalf of another individual, cheating, or bypassing examination security controls. Violation of this policy results in immediate termination of services.
        </p>

        <h3 className="text-lg font-bold text-brand-navy pt-2">3. Intellectual Property</h3>
        <p>
          All content, logos, and materials on this website are the property of TUTOR PROCTORED EXAMS or its content suppliers and are protected by applicable trademark and copyright laws.
        </p>
      </div>
    </PageContainer>
  );
}
