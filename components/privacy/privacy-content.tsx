import Link from 'next/link'

export function PrivacyContent() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-300">
      <nav className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-bold text-white">DoWithAI</Link>
            <Link href="/tasks" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Tasks</Link>
            <Link href="/agents" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Agents</Link>
            <Link href="/workflows" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Workflows</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8">
          <p className="text-sm text-amber-300">
            <strong>Disclaimer:</strong> This privacy policy is a template and has not been reviewed by a legal professional.
            It should not be considered legal advice. Consult with a qualified privacy attorney before publishing.
          </p>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-slate-500 mb-12">Last updated: May 7, 2026</p>

        <div className="space-y-10">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Introduction</h2>
            <p className="text-slate-400 leading-relaxed mb-3">
              DoWithAI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the service&rdquo;) takes your privacy seriously.
              This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit
              our website <a href="https://dowithai.it.com" className="text-indigo-400 hover:text-indigo-300">dowithai.it.com</a>.
            </p>
            <p className="text-slate-400 leading-relaxed">
              By using our service, you agree to the collection and use of information in accordance with this policy.
              If you do not agree, please discontinue use of our service.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Information We Collect</h2>

            <h3 className="text-lg font-medium text-white mt-5 mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li><strong>Account information:</strong> when you register, we collect your email address and name (if provided). Passwords are hashed and never stored in plain text.</li>
              <li><strong>Newsletter subscription:</strong> when you subscribe to our newsletter, we collect your email address via ConvertKit.</li>
              <li><strong>Payment information:</strong> when you purchase a workflow pack, payment processing is handled entirely by Stripe. We do not receive or store your full credit card details.</li>
              <li><strong>Communications:</strong> if you contact us by email, we collect the contents of your message.</li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-5 mb-2">2.2 Information Collected Automatically</h3>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li><strong>Usage data:</strong> pages visited, time spent on pages, referral sources, and click patterns.</li>
              <li><strong>Device data:</strong> browser type, operating system, device type, and screen resolution.</li>
              <li><strong>Affiliate click data:</strong> when you click an affiliate link, we record the tool, source page, referrer, and timestamp for analytics and compliance purposes.</li>
              <li><strong>IP address:</strong> collected by our analytics providers and web server logs.</li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-5 mb-2">2.3 Cookies and Tracking Technologies</h3>
            <p className="text-slate-400 leading-relaxed mb-2">
              We use cookies and similar tracking technologies for:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li><strong>Analytics:</strong> Google Analytics and PostHog use cookies to understand how visitors interact with our site.</li>
              <li><strong>Authentication:</strong> session cookies to keep you signed in (if you create an account).</li>
              <li><strong>Preferences:</strong> storing your locale/language preference.</li>
            </ul>
            <p className="text-slate-400 leading-relaxed mt-2">
              You can control cookies through your browser settings. Disabling cookies may affect certain features of the service.
            </p>
          </section>

          {/* 3. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li>To provide, maintain, and improve our service</li>
              <li>To send newsletters and marketing communications (with your consent)</li>
              <li>To process transactions for workflow pack purchases</li>
              <li>To track affiliate link clicks for analytics and partner reporting</li>
              <li>To detect and prevent fraud, abuse, and security incidents</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* 4. Affiliate Disclosure */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Affiliate Disclosure</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              DoWithAI participates in affiliate marketing programs. When you click on links to third-party tools and
              services on our site and make a purchase, we may earn a commission at no additional cost to you.
            </p>
            <p className="text-slate-400 leading-relaxed mb-2">
              Affiliate links are tracked through our own redirect system (<code className="text-indigo-400 bg-indigo-500/10 px-1 rounded">/go/&lt;slug&gt;</code>).
              When you click an affiliate link, we record an anonymized click event (tool ID, source page, referrer, timestamp)
              for analytics and compliance purposes. We do not share this data with third parties beyond what is necessary
              for affiliate partner reporting.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our recommendations are based on our independent research and assessment. Affiliate relationships do not
              influence our rankings or reviews, though tools marked as &ldquo;Sponsored&rdquo; or &ldquo;Featured&rdquo; may
              have commercial arrangements with us.
            </p>
          </section>

          {/* 5. Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              We use the following third-party services that may collect data about you:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-3">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="py-2 pr-4 font-semibold text-slate-200">Service</th>
                    <th className="py-2 px-4 font-semibold text-slate-200">Purpose</th>
                    <th className="py-2 pl-4 font-semibold text-slate-200">Privacy Policy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-white">Google Analytics</td>
                    <td className="py-2 px-4 text-slate-400">Site analytics</td>
                    <td className="py-2 pl-4"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-xs">policies.google.com</a></td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-white">PostHog</td>
                    <td className="py-2 px-4 text-slate-400">Product analytics</td>
                    <td className="py-2 pl-4"><a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-xs">posthog.com/privacy</a></td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-white">Stripe</td>
                    <td className="py-2 px-4 text-slate-400">Payment processing</td>
                    <td className="py-2 pl-4"><a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-xs">stripe.com/privacy</a></td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-white">ConvertKit</td>
                    <td className="py-2 px-4 text-slate-400">Email newsletter</td>
                    <td className="py-2 pl-4"><a href="https://convertkit.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-xs">convertkit.com/privacy</a></td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-white">Neon</td>
                    <td className="py-2 px-4 text-slate-400">Database hosting</td>
                    <td className="py-2 pl-4"><a href="https://neon.tech/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-xs">neon.tech/privacy</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white">Vercel</td>
                    <td className="py-2 px-4 text-slate-400">Hosting & deployment</td>
                    <td className="py-2 pl-4"><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-xs">vercel.com/legal</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Data Sharing and Disclosure</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li><strong>Service providers:</strong> with third-party vendors who help us operate the service (listed in Section 5), subject to data processing agreements.</li>
              <li><strong>Legal compliance:</strong> if required by law, court order, or government regulation.</li>
              <li><strong>Business transfer:</strong> in connection with a merger, acquisition, or sale of assets, users will be notified.</li>
              <li><strong>With your consent:</strong> in any other circumstances with your explicit consent.</li>
            </ul>
          </section>

          {/* 7. Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Data Retention</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              We retain your personal information only as long as necessary:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li><strong>Account data:</strong> retained while your account is active. You may request deletion at any time.</li>
              <li><strong>Newsletter subscriptions:</strong> retained until you unsubscribe.</li>
              <li><strong>Affiliate click logs:</strong> retained for 24 months for analytics and compliance.</li>
              <li><strong>Payment records:</strong> retained as required by tax and accounting laws (typically 7 years).</li>
              <li><strong>Analytics data:</strong> retained per the policies of Google Analytics and PostHog.</li>
            </ul>
          </section>

          {/* 8. Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Data Security</h2>
            <p className="text-slate-400 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information, including:
              TLS encryption for all data in transit, hashed password storage, database encryption at rest, and access
              controls limiting data access to authorized personnel. However, no method of electronic storage or transmission
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* 9. Your Rights (GDPR) */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">9. Your Rights (GDPR)</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              If you are located in the European Economic Area (EEA) or the United Kingdom, you have the following rights under the GDPR:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li><strong>Right of access:</strong> request a copy of the personal data we hold about you.</li>
              <li><strong>Right to rectification:</strong> correct any inaccurate or incomplete data.</li>
              <li><strong>Right to erasure:</strong> request deletion of your personal data (&ldquo;right to be forgotten&rdquo;).</li>
              <li><strong>Right to restrict processing:</strong> request that we limit how we process your data.</li>
              <li><strong>Right to data portability:</strong> receive your data in a structured, machine-readable format.</li>
              <li><strong>Right to object:</strong> object to processing of your personal data for direct marketing.</li>
              <li><strong>Right to withdraw consent:</strong> withdraw consent at any time where processing is based on consent.</li>
            </ul>
            <p className="text-slate-400 leading-relaxed mt-2">
              To exercise any of these rights, contact us at <a href="mailto:zhanxun6608@gmail.com" className="text-indigo-400 hover:text-indigo-300">zhanxun6608@gmail.com</a>.
              We will respond within 30 days. You also have the right to lodge a complaint with your local data protection authority.
            </p>
          </section>

          {/* 10. CCPA Notice */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">10. California Privacy Rights (CCPA)</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              If you are a California resident, the California Consumer Privacy Act (CCPA) grants you the following rights:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li><strong>Right to know:</strong> request disclosure of the categories and specific pieces of personal information we have collected about you.</li>
              <li><strong>Right to delete:</strong> request deletion of your personal information.</li>
              <li><strong>Right to opt-out:</strong> we do not sell personal information as defined by the CCPA.</li>
              <li><strong>Right to non-discrimination:</strong> we will not discriminate against you for exercising your CCPA rights.</li>
            </ul>
            <p className="text-slate-400 leading-relaxed mt-2">
              To exercise your CCPA rights, contact us at <a href="mailto:zhanxun6608@gmail.com" className="text-indigo-400 hover:text-indigo-300">zhanxun6608@gmail.com</a>.
              We will verify your identity before processing your request.
            </p>
          </section>

          {/* 11. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">11. Children&apos;s Privacy</h2>
            <p className="text-slate-400 leading-relaxed">
              Our service is not directed to individuals under the age of 16. We do not knowingly collect personal
              information from children. If you believe a child has provided us with personal information, please contact
              us and we will delete it promptly.
            </p>
          </section>

          {/* 12. International Data Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">12. International Data Transfers</h2>
            <p className="text-slate-400 leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence,
              including the United States. We rely on adequacy decisions, standard contractual clauses, or other
              approved transfer mechanisms to ensure adequate protection for international data transfers.
            </p>
          </section>

          {/* 13. Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">13. Changes to This Privacy Policy</h2>
            <p className="text-slate-400 leading-relaxed">
              We may update this privacy policy from time to time. We will notify users of material changes by
              posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date. We encourage
              you to review this policy periodically. Continued use of the service after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          {/* 14. Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">14. Contact Us</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              If you have questions about this privacy policy or wish to exercise your data rights, contact us at:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li>Email: <a href="mailto:zhanxun6608@gmail.com" className="text-indigo-400 hover:text-indigo-300">zhanxun6608@gmail.com</a></li>
              <li>Website: <a href="https://dowithai.it.com" className="text-indigo-400 hover:text-indigo-300">dowithai.it.com</a></li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/5 bg-[#080c14]">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} DoWithAI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}