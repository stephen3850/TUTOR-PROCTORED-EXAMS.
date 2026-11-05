'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X, Settings, Check } from 'lucide-react';
import Button from './Button';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if consent has already been set in localStorage
    const savedConsent = localStorage.getItem('tpe_cookie_consent');
    if (!savedConsent) {
      // Show banner after 1 second delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = { essential: true, analytics: true, preferences: true, date: new Date().toISOString() };
    localStorage.setItem('tpe_cookie_consent', JSON.stringify(consent));
    setShowBanner(false);
    setShowCustomizeModal(false);
  };

  const handleRejectNonEssential = () => {
    const consent = { essential: true, analytics: false, preferences: false, date: new Date().toISOString() };
    localStorage.setItem('tpe_cookie_consent', JSON.stringify(consent));
    setShowBanner(false);
    setShowCustomizeModal(false);
  };

  const handleSaveCustomPreferences = () => {
    const consent = { ...preferences, essential: true, date: new Date().toISOString() };
    localStorage.setItem('tpe_cookie_consent', JSON.stringify(consent));
    setShowBanner(false);
    setShowCustomizeModal(false);
  };

  if (!showBanner && !showCustomizeModal) return null;

  return (
    <>
      {/* Bottom Sticky Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-brand-navy border-t border-brand-secondaryNavy text-white shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3 space-y-1">
              <ShieldCheck className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                <strong className="text-white font-semibold">Your Privacy Choices:</strong> We use essential cookies to ensure our website functions properly. We do not run invasive tracking or advertising scripts by default. Read our{' '}
                <Link href="/cookie-policy" className="text-brand-lightBlue hover:underline font-medium">
                  Cookie Policy
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="text-brand-lightBlue hover:underline font-medium">
                  Privacy Policy
                </Link>.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowCustomizeModal(true)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Reject Non-Essential
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAcceptAll}
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Customization Modal */}
      {showCustomizeModal && (
        <div className="fixed inset-0 z-50 bg-brand-navy/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-brand-border rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl text-brand-text animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-brand-blue" />
                <h3 className="text-xl font-bold text-brand-navy">Cookie Preferences</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCustomizeModal(false)}
                className="p-1 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-brand-bg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Category 1: Essential */}
              <div className="p-4 rounded-xl border border-brand-border bg-brand-bg space-y-1">
                <div className="flex items-center justify-between font-bold text-brand-navy">
                  <span>Essential Cookies (Required)</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">Always Active</span>
                </div>
                <p className="text-brand-muted text-xs leading-relaxed">
                  Necessary for basic navigation, security, form submissions, and remembering your privacy choices.
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div className="p-4 rounded-xl border border-brand-border bg-white space-y-2">
                <div className="flex items-center justify-between font-bold text-brand-navy">
                  <label htmlFor="toggle-analytics" className="cursor-pointer">
                    Performance & Analytics
                  </label>
                  <input
                    id="toggle-analytics"
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))}
                    className="w-4 h-4 text-brand-blue rounded border-brand-border focus:ring-brand-blue cursor-pointer"
                  />
                </div>
                <p className="text-brand-muted text-xs leading-relaxed">
                  Allows us to measure general traffic volume and page load speeds to improve site user experience. (Disabled by default).
                </p>
              </div>

              {/* Category 3: Preferences */}
              <div className="p-4 rounded-xl border border-brand-border bg-white space-y-2">
                <div className="flex items-center justify-between font-bold text-brand-navy">
                  <label htmlFor="toggle-preferences" className="cursor-pointer">
                    Functional Preferences
                  </label>
                  <input
                    id="toggle-preferences"
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={(e) => setPreferences((p) => ({ ...p, preferences: e.target.checked }))}
                    className="w-4 h-4 text-brand-blue rounded border-brand-border focus:ring-brand-blue cursor-pointer"
                  />
                </div>
                <p className="text-brand-muted text-xs leading-relaxed">
                  Remembers your functional choices (such as category filters) during browsing.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-brand-border">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-brand-muted hover:text-brand-navy hover:bg-brand-bg transition-colors"
              >
                Reject Non-Essential
              </button>
              <Button variant="primary" size="md" onClick={handleSaveCustomPreferences}>
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
