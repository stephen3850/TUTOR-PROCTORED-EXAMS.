import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = {
  title: 'Cookie Policy | TUTOR PROCTORED EXAMS',
  description: 'Information regarding the use of cookies and tracking technologies on TUTOR PROCTORED EXAMS website.',
};

export default function CookiePolicyPage() {
  return (
    <PageContainer className="py-10 space-y-8 max-w-4xl">
      <Breadcrumb items={[{ label: 'Cookie Policy' }]} />

      <SectionHeading
        badge="Privacy & Tracking"
        title="Cookie Policy"
        subtitle="Last Updated: 2025"
      />

      <div className="prose prose-slate max-w-none text-brand-text space-y-4 text-sm leading-relaxed">
        <p>
          This Cookie Policy explains how TUTOR PROCTORED EXAMS uses cookies and similar technologies to recognize you when you visit our website.
        </p>

        <h3 className="text-lg font-bold text-brand-navy pt-2">1. What Are Cookies?</h3>
        <p>
          Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently and provide analytical information.
        </p>

        <h3 className="text-lg font-bold text-brand-navy pt-2">2. How We Use Cookies</h3>
        <p>
          We use essential cookies for website operation, navigation, and form submissions. We may also use basic performance analytics cookies to understand site traffic and improve page load performance.
        </p>

        <h3 className="text-lg font-bold text-brand-navy pt-2">3. Managing Cookies</h3>
        <p>
          You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though access to some functionality may be restricted.
        </p>
      </div>
    </PageContainer>
  );
}
