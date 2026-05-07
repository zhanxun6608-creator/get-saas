import { notFound } from 'next/navigation'
import { getWorkflowBySlug } from '@/lib/task-queries'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const wf = await getWorkflowBySlug(slug)
  if (!wf) return { title: 'Not Found' }
  return { title: `${wf.title} — DoWithAI`, description: wf.description }
}

export default async function WorkflowPage({ params }: Props) {
  const { slug } = await params
  const wf = await getWorkflowBySlug(slug)
  if (!wf) notFound()

  const buyUrl = wf.stripePaymentLink && wf.stripePaymentLink !== '#' ? wf.stripePaymentLink : null

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

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h1 className="text-[32px] md:text-[40px] font-bold text-white">{wf.title}</h1>
              <p className="text-lg text-slate-400 mt-3">{wf.description}</p>
            </section>
            {wf.targetUser && (
              <section className="bg-[#111827] border border-white/5 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">Who It's For</h3>
                <p className="text-slate-300">{wf.targetUser}</p>
              </section>
            )}
            {wf.steps && wf.steps.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-6">What's Included</h2>
                <div className="space-y-4">
                  {wf.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">{i + 1}</div>
                      <div className="bg-[#111827] border border-white/5 rounded-xl p-4 flex-1"><p className="text-slate-300 text-sm">{step}</p></div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {wf.promptTemplates && wf.promptTemplates.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4">Prompt Templates Included</h2>
                <div className="space-y-3">
                  {wf.promptTemplates.map((prompt, i) => (
                    <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-4">
                      <p className="text-xs text-slate-500 mb-1">Prompt {i + 1}</p>
                      <p className="text-sm text-slate-300">{prompt}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {wf.toolsIncluded && wf.toolsIncluded.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4">Tools Covered</h2>
                <div className="flex flex-wrap gap-2">
                  {wf.toolsIncluded.map((t, i) => <span key={i} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-400 text-sm rounded-full border border-indigo-500/20">{t}</span>)}
                </div>
              </section>
            )}
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-8 bg-[#111827] border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">${(wf.price || 0) / 100}</div>
                <p className="text-xs text-slate-500 mt-1">One-time purchase</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2"><span className="text-green-400">+</span> Step-by-step SOP</li>
                <li className="flex items-center gap-2"><span className="text-green-400">+</span> Prompt templates</li>
                <li className="flex items-center gap-2"><span className="text-green-400">+</span> Tool stack recommendations</li>
                <li className="flex items-center gap-2"><span className="text-green-400">+</span> Execution templates</li>
              </ul>
              {buyUrl ? (
                <a href={buyUrl} target="_blank" rel="noopener noreferrer" className="block text-center w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all">Buy Workflow Pack</a>
              ) : (
                <div className="block text-center w-full py-3 bg-slate-700 text-slate-400 font-semibold rounded-xl cursor-not-allowed">Coming Soon</div>
              )}
              <p className="text-xs text-slate-500 text-center">Instant download after purchase</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 bg-[#080c14]">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-xs text-slate-500">
          <div className="flex justify-center gap-4 mb-2">
            <a href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
          </div>
          &copy; {new Date().getFullYear()} DoWithAI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}