import React from 'react';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Badge from '@/components/ui/Badge';
import { SITE_CONFIG } from '@/lib/utils';

export const metadata = {
  title: 'Privacy Policy | TUTOR PROCTORED EXAMS',
  description:
    'Detailed Privacy Policy for TUTOR PROCTORED EXAMS explaining how personal enquiry data, cookies, and website interactions are handled for US visitors.',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PageContainer className="py-10 space-y-8 max-w-4xl pb-20">
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      <SectionHeading
        badge="Legal & Data Protection"
        title="Privacy Policy"
        subtitle="Effective Date: 2025 | Last Updated: 2025"
      />

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed font-medium">
        <strong>Legal Review Notice:</strong> This website policy describes general data practices for TUTOR PROCTORED EXAMS. It is marked for formal review and confirmation by a qualified United States attorney prior to final commercial deployment. Registered entity details: <em>[Legal Operating Entity Name Pending Confirmation]</em>.
      </div>

      <div className="bg-brand-bg border border-brand-border rounded-xl p-6 space-y-3">
        <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">Document Contents</h3>
        <ol className="list-decimal pl-5 space-y-1.5 text-xs text-brand-blue font-semibold">
          <li><a href="#scope" className="hover:underline">1. Scope and Introduction</a></li>
          <li><a href="#info-collected" className="hover:underline">2. Information You Provide</a></li>
          <li><a href="#how-used" className="hover:underline">3. How Information Is Used</a></li>
          <li><a href="#cookies-analytics" className="hover:underline">4. Cookies and Tracking Technologies</a></li>
          <li><a href="#third-parties" className="hover:underline">5. Third-Party Service Processors</a></li>
          <li><a href="#data-security" className="hover:underline">6. Data Security and Safeguards</a></li>
          <li><a href="#data-retention" className="hover:underline">7. Data Retention Period</a></li>
          <li><a href="#childrens-privacy" className="hover:underline">8. Children&apos;s Privacy Considerations</a></li>
          <li><a href="#us-state-rights" className="hover:underline">9. US State Privacy Rights (CCPA / VCDPA)</a></li>
          <li><a href="#contact-privacy" className="hover:underline">10. Contacting Us About Privacy</a></li>
        </ol>
      </div>

      <div className="prose prose-slate max-w-none text-brand-text space-y-6 text-sm leading-relaxed border-t border-brand-border pt-6">
        <section id="scope" className="space-y-2 scroll-mt-24">
          <h2 className="text-xl font-bold text-brand-navy">1. Scope and Introduction</h2>
          <p>
            TUTOR PROCTORED EXAMS (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates this business website serving visitors and learners in the United States. This Privacy Policy explains how personal information provided during your visits or inquiry submissions is collected, processed, and protected.
          </p>
        </section>

        <section id="info-collected" className="space-y-2 scroll-mt-24">
          <h2 className="text-xl font-bold text-brand-navy">2. Information You Provide</h2>
          <p>
            We collect personal information that you voluntarily submit when filling out an inquiry or consultation form on our website.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-brand-muted">
            <li><strong>Inquiry Form Data:</strong> Full Name, Email Address, Subject/Course Name, Service of Interest, and Message content.</li>
            <li><strong>Technical Data:</strong> Basic browser parameters, IP address, and functional session preferences required for secure website operation.</li>
          </ul>
        </section>

        <section id="how-used" className="space-y-2 scroll-mt-24">
          <h2 className="text-xl font-bold text-brand-navy">3. How Information Is Used</h2>
          <p>
            Information submitted through our website is used strictly for legitimate business and educational purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-brand-muted">
            <li>To respond to your inquiries and match you with educational specialists.</li>
            <li>To schedule and deliver requested 1-on-1 tutoring or study planning sessions.</li>
            <li>To maintain website security and prevent spam or unauthorized form submissions.</li>
          </ul>
          <p className="font-semibold text-brand-navy">
            We do not sell, rent, or trade visitor email addresses or inquiry details to third-party marketers.
          </p>
        </section>

        <section id="cookies-analytics" className="space-y-2 scroll-mt-24">
          <h2 className="text-xl font-bold text-brand-navy">4. Cookies and Tracking Technologies</h2>
          <p>
            Our website utilizes essential functional cookies necessary for site navigation, form security, and remembering your cookie consent preferences. We do not inject invasive cross-site advertising trackers or behavioral profiling cookies by default. For detailed information, review our{' '}
            <Link href="/cookie-policy" className="text-brand-blue font-semibold hover:underline">
              Cookie Policy
            </Link>.
          </p>
        </section>

        <section id="third-parties" className="space-y-2 scroll-mt-24">
          <h2 className="text-xl font-bold text-brand-navy">5. Third-Party Service Processors</h2>
          <p>
            We may engage trusted third-party service providers (such as secure cloud hosting and transaction processing systems) strictly to perform infrastructure functions necessary to operate our website. These processors operate under confidential processing obligations.
          </p>
        </section>

        <section id="data-security" className="space-y-2 scroll-mt-24">
          <h2 className="text-xl font-bold text-brand-navy">6. Data Security and Safeguards</h2>
          <p>
            We implement industry-standard administrative, physical, and technical controls—including SSL/TLS transport encryption—to protect your submitted information from unauthorized access, loss, or alteration.
          </p>
        </section>

        <section id="data-retention" className="space-y-2 scroll-mt-24">
          <h2 className="text-xl font-bold text-brand-navy">7. Data Retention Period</h2>
          <p>
            Contact form inquiries and communication records are retained only as long as necessary to fulfill the requested educational support or maintain active student communication records.
          </p>
        </section>

        <section id="childrens-privacy" className="space-y-2 scroll-mt-24">
          <h2 className="text-xl font-bold text-brand-navy">8. Children&apos;s Privacy Considerations</h2>
          <p>
            Our website and educational services are directed to college students, adult learners, and working professionals aged 18 and older. We do not knowingly collect personal information from children under 13 without verified parental or legal guardian consent.
          </p>
        </section>

        <section id="us-state-rights" className="space-y-2 scroll-mt-24">
          <h2 className="text-xl font-bold text-brand-navy">9. US State Privacy Rights (CCPA / VCDPA)</h2>
          <p>
            Depending on your state of residence (e.g., California, Virginia, Colorado), you may possess specific statutory rights regarding your personal information, including the right to request access to or deletion of your personal inquiry records. To exercise these choices, contact us at our privacy address below.
          </p>
        </section>

        <section id="contact-privacy" className="space-y-2 scroll-mt-24 border-t border-brand-border pt-4">
          <h2 className="text-xl font-bold text-brand-navy">10. Contacting Us About Privacy</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data updates, please contact our privacy compliance inbox:
          </p>
          <div className="p-4 rounded-xl bg-brand-bg border border-brand-border text-xs font-mono space-y-1">
            <p><strong>Entity:</strong> TUTOR PROCTORED EXAMS</p>
            <p><strong>Email:</strong> {SITE_CONFIG.contactEmail}</p>
            <p><strong>Operating Region:</strong> Global / Worldwide (Online Educational Service)</p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
