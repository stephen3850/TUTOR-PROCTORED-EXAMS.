import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = {
  title: 'Academic Disclaimer | TUTOR PROCTORED EXAMS',
  description: 'Independent educational service disclaimer for TUTOR PROCTORED EXAMS.',
};

export default function DisclaimerPage() {
  return (
    <PageContainer className="py-10 space-y-8 max-w-4xl">
      <Breadcrumb items={[{ label: 'Academic Disclaimer' }]} />

      <SectionHeading
        badge="Independent Stance"
        title="Academic & Platform Disclaimer"
        subtitle="Important Legal Notice Regarding Third-Party Trademarks & Integrity"
      />

      <div className="prose prose-slate max-w-none text-brand-text space-y-4 text-sm leading-relaxed">
        <p>
          <strong>TUTOR PROCTORED EXAMS</strong> operates as an independent educational support service.
        </p>

        <h3 className="text-lg font-bold text-brand-navy pt-2">Non-Affiliation Notice</h3>
        <p>
          TUTOR PROCTORED EXAMS is not affiliated with, endorsed by, sponsored by, or officially associated with Respondus Inc., ExamSoft Worldwide LLC, Honorlock Inc., Meazure Learning / ProctorU, Proctorio Inc., Proctortrack / Verificient Technologies, Examity Inc., PSI Services LLC, Assessment Technologies Institute (ATI), Project Management Institute (PMI), CompTIA Inc., AAPC, NHA, or any other examination platform, university, testing vendor, or certification body.
        </p>

        <h3 className="text-lg font-bold text-brand-navy pt-2">Trademarks</h3>
        <p>
          All product names, logos, brands, trademarks, and registered trademarks mentioned on this website belong to their respective owners. Their use on this website is solely for identification and descriptive educational purposes and does not imply endorsement or partnership.
        </p>

        <h3 className="text-lg font-bold text-brand-navy pt-2">Commitment to Academic Honesty</h3>
        <p>
          All tutoring, test preparation materials, software technical guidance, and practice questions provided on this website are intended solely to assist students in authentic learning and independent test preparation. We strictly forbid any form of academic misconduct.
        </p>
      </div>
    </PageContainer>
  );
}
