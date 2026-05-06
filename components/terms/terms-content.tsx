import Link from 'next/link'

export function TermsContent() {
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
            <strong>Disclaimer:</strong> These terms of service are a template and have not been reviewed by a legal professional.
            They should not be considered legal advice. Consult with a qualified attorney before publishing.
          </p>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-slate-500 mb-12">Last updated: May 7, 2026</p>

        <div className="space-y-10">
          {/* 1. Acceptance */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-slate-400 leading-relaxed mb-3">
              By accessing or using DoWithAI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the service&rdquo;),
              you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms,
              you must not access or use the service.
            </p>
            <p className="text-slate-400 leading-relaxed">
              You represent that you are at least 16 years of age or the age of majority in your jurisdiction.
              If you are using the service on behalf of an organization, you represent that you have authority
              to bind that organization to these terms.
            </p>
          </section>

          {/* 2. Service Description */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Service Description</h2>
            <p className="text-slate-400 leading-relaxed">
              DoWithAI is an AI agent discovery platform that provides:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2 mt-2">
              <li>Curated directory of AI agents and tools for business automation</li>
              <li>Task-based recommendations matching your use case to the best tools</li>
              <li>Comparison tables, reviews, and workflow guides for AI tools</li>
              <li>Premium workflow packs (SOPs, prompts, templates) for purchase</li>
              <li>Affiliate links to third-party AI tools and services</li>
            </ul>
            <p className="text-slate-400 leading-relaxed mt-3">
              We do not host, operate, or control any of the third-party AI tools listed on our site. Our service is limited to
              providing information, recommendations, and curated resources.
            </p>
          </section>

          {/* 3. User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. User Accounts</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              To access certain features, you may need to create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li>Provide accurate, current, and complete registration information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password confidential and secure</li>
              <li>Be responsible for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p className="text-slate-400 leading-relaxed mt-2">
              We reserve the right to suspend or terminate accounts that violate these terms or that we determine,
              in our sole discretion, pose a risk to the service or other users.
            </p>
          </section>

          {/* 4. Acceptable Use */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Acceptable Use</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li>Use the service for any illegal purpose or in violation of any applicable law</li>
              <li>Attempt to gain unauthorized access to any part of the service, other accounts, or connected systems</li>
              <li>Interfere with or disrupt the service or servers, including through automated means (scraping, bots) except as permitted by robots.txt</li>
              <li>Upload or transmit viruses, malware, or any destructive code</li>
              <li>Use the service to harass, abuse, or harm others</li>
              <li>Misrepresent your affiliation with any person or entity</li>
              <li>Resell, redistribute, or sublicense any premium content without our written permission</li>
            </ul>
          </section>

          {/* 5. Affiliate Disclosure */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Affiliate Relationships and Disclosures</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              DoWithAI participates in affiliate marketing programs. This means:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li>We may earn a commission when you click on certain links and make a purchase, at no additional cost to you.</li>
              <li>Our rankings and recommendations are based on our independent assessment of each tool&apos;s capabilities, pricing, and user experience.</li>
              <li>Tools designated as &ldquo;Featured&rdquo; or &ldquo;Sponsored&rdquo; may have commercial relationships with us, and such designations will be clearly marked.</li>
              <li>We are not responsible for the quality, performance, or availability of any third-party tool or service linked from our platform.</li>
              <li>Any transaction between you and a third-party tool is solely between you and that third party.</li>
            </ul>
          </section>

          {/* 6. Purchases and Payments */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Purchases and Payments</h2>
            <h3 className="text-lg font-medium text-white mt-4 mb-2">6.1 Workflow Packs</h3>
            <p className="text-slate-400 leading-relaxed mb-2">
              We offer premium workflow packs for purchase. When you purchase a workflow pack:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li>You receive a non-exclusive, non-transferable license to use the workflow materials for your personal or business use.</li>
              <li>You may not resell, redistribute, or publicly share the workflow content.</li>
              <li>All prices are in US dollars and displayed exclusive of applicable taxes.</li>
              <li>Payment processing is handled by Stripe. We do not store your payment card details.</li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">6.2 Refunds</h3>
            <p className="text-slate-400 leading-relaxed">
              Due to the digital nature of our products, all sales of workflow packs are final. If you encounter
              a technical issue accessing your purchase, contact us at <a href="mailto:zhanxun6608@gmail.com" className="text-indigo-400 hover:text-indigo-300">zhanxun6608@gmail.com</a> and we
              will resolve it promptly.
            </p>
          </section>

          {/* 7. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Intellectual Property</h2>
            <h3 className="text-lg font-medium text-white mt-4 mb-2">7.1 Our Content</h3>
            <p className="text-slate-400 leading-relaxed">
              The DoWithAI website, including its design, text, graphics, logos, comparison data, workflow content,
              and overall selection and arrangement (&ldquo;our content&rdquo;) is owned by us and protected by
              copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify,
              or create derivative works of our content without our prior written consent.
            </p>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">7.2 Your Content</h3>
            <p className="text-slate-400 leading-relaxed">
              If you submit feedback, suggestions, or other content to us, you grant us a perpetual, irrevocable,
              worldwide, royalty-free license to use that content for any purpose, including improving our service.
            </p>
          </section>

          {/* 8. Third-Party Links */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Third-Party Links and Services</h2>
            <p className="text-slate-400 leading-relaxed">
              Our service contains links to third-party websites, tools, and services that are not owned or controlled
              by DoWithAI. We have no control over and assume no responsibility for the content, privacy policies, or
              practices of any third-party sites. You acknowledge and agree that DoWithAI shall not be liable for any
              damage or loss arising from your use of any third-party service. We strongly advise you to read the terms
              and privacy policies of any third-party service you visit.
            </p>
          </section>

          {/* 9. Disclaimer of Warranties */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">9. Disclaimer of Warranties</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT WARRANTIES
              OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
              INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
              <li>Warranties that the service will be uninterrupted, timely, secure, or error-free</li>
              <li>Warranties regarding the accuracy, reliability, or completeness of any information on the service</li>
              <li>Warranties regarding the quality, suitability, or performance of any third-party tool we review or recommend</li>
            </ul>
            <p className="text-slate-400 leading-relaxed mt-2">
              Your use of the service and any third-party tools is at your sole risk. You should conduct your own due
              diligence before purchasing or using any AI tool or service.
            </p>
          </section>

          {/* 10. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">10. Limitation of Liability</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DOWITHAI, ITS OWNER, AFFILIATES,
              OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
              RESULTING FROM:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li>Your use or inability to use the service</li>
              <li>Any conduct or content of any third party on the service</li>
              <li>Any content obtained from the service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              <li>Any transactions or relationships between you and any third-party tool or service</li>
            </ul>
            <p className="text-slate-400 leading-relaxed mt-2">
              Our total cumulative liability to you for all claims arising out of or relating to these terms or the
              service shall not exceed the greater of: (a) the amount you have paid to us in the twelve months
              preceding the claim, or (b) one hundred US dollars ($100.00).
            </p>
          </section>

          {/* 11. Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">11. Indemnification</h2>
            <p className="text-slate-400 leading-relaxed">
              You agree to indemnify, defend, and hold harmless DoWithAI and its owner from and against any claims,
              liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to:
              (a) your use of the service; (b) your violation of these terms; (c) your violation of any third-party
              right, including intellectual property or privacy rights; or (d) your violation of applicable law.
            </p>
          </section>

          {/* 12. Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">12. Termination</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              We may terminate or suspend your account and access to the service immediately, without prior notice,
              for any reason, including if you breach these terms. Upon termination:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li>Your right to use the service will immediately cease</li>
              <li>Any provisions of these terms that by their nature should survive termination shall survive (including Sections 7, 9, 10, 11, 13)</li>
            </ul>
          </section>

          {/* 13. Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">13. Governing Law and Dispute Resolution</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              These terms shall be governed by and construed in accordance with the laws of Hong Kong Special
              Administrative Region, without regard to its conflict of law principles.
            </p>
            <p className="text-slate-400 leading-relaxed mb-2">
              Any dispute arising out of or relating to these terms shall first be attempted to be resolved through
              informal negotiation. If the dispute cannot be resolved informally within 30 days, either party may
              pursue resolution through binding arbitration or, where applicable, through the courts of Hong Kong.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Nothing in this section prevents either party from seeking injunctive or equitable relief in any court
              of competent jurisdiction to prevent irreparable harm.
            </p>
          </section>

          {/* 14. Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">14. Changes to These Terms</h2>
            <p className="text-slate-400 leading-relaxed">
              We reserve the right to modify or replace these terms at any time. For material changes, we will
              make reasonable efforts to notify users at least 14 days before the changes take effect, such as
              by posting a notice on our website. Your continued use of the service after any changes constitutes
              acceptance of the new terms. If you do not agree to the new terms, you must stop using the service.
            </p>
          </section>

          {/* 15. General Provisions */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">15. General Provisions</h2>
            <ul className="list-disc list-inside text-slate-400 space-y-1.5 ml-2">
              <li><strong>Severability:</strong> if any provision of these terms is found unenforceable, the remaining provisions will remain in full effect.</li>
              <li><strong>No waiver:</strong> our failure to enforce any right or provision does not constitute a waiver of that right.</li>
              <li><strong>Entire agreement:</strong> these terms, together with our Privacy Policy, constitute the entire agreement between you and us regarding the service.</li>
              <li><strong>Assignment:</strong> you may not assign your rights under these terms without our written consent. We may assign our rights to any affiliate or successor.</li>
            </ul>
          </section>

          {/* 16. Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">16. Contact Us</h2>
            <p className="text-slate-400 leading-relaxed mb-2">
              If you have questions about these Terms of Service, please contact us at:
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