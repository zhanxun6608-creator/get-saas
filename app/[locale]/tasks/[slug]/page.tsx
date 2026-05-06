import { notFound } from 'next/navigation'
import { getTaskBySlug, getToolsByIds, getWorkflowById } from '@/lib/task-queries'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const task = await getTaskBySlug(slug)
  if (!task) return { title: 'Not Found' }
  return {
    title: task.seoTitle || task.title,
    description: task.seoDescription || task.description,
  }
}

export default async function TaskPage({ params }: Props) {
  const { slug } = await params
  const task = await getTaskBySlug(slug)
  if (!task) notFound()

  const recommendedTools = await getToolsByIds(task.recommendedToolIds || [])
  const premiumWorkflow = task.premiumWorkflowId ? await getWorkflowById(task.premiumWorkflowId) : null

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-300">
      {/* Nav */}
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

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* 1. Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-[36px] md:text-[44px] font-bold text-white leading-tight">
            {task.title}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {task.description}
          </p>
          {recommendedTools[0] && (
            <Link
              href={`/go/${recommendedTools[0].slug}`}
              className="inline-block mt-4 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
            >
              Start with the Best Tool
            </Link>
          )}
        </section>

        {/* 2. Problem */}
        <section className="bg-[#111827] border border-white/5 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-3">The Problem</h2>
          <p className="text-slate-400 leading-relaxed">{task.problem}</p>
          {task.outcomeDescription && (
            <div className="mt-4 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
              <p className="text-sm text-indigo-300 font-medium">What you can achieve:</p>
              <p className="text-slate-300 mt-1">{task.outcomeDescription}</p>
            </div>
          )}
        </section>

        {/* 3. Top Recommended Agents */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Top Recommended Agents</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedTools.slice(0, 3).map((tool, i) => (
              <div key={tool.id} className="bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group">
                {i === 0 && <div className="text-xs font-semibold text-amber-400 mb-2">Top Pick</div>}
                <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                <p className="text-xs text-indigo-400 mt-0.5 mb-3">Best for: {tool.bestFor?.join(', ')}</p>
                <p className="text-sm text-slate-400 flex-1">{tool.description}</p>
                {tool.pros && tool.pros.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {tool.pros.slice(0, 2).map((pro, j) => (
                      <li key={j} className="text-xs text-green-400 flex items-center gap-1">+ {pro}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-3 text-xs text-slate-500">{tool.pricing}</div>
                <Link
                  href={`/go/${tool.slug}`}
                  className="mt-4 block text-center py-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-xl hover:bg-indigo-500 hover:text-white transition-all text-sm font-medium"
                >
                  Try Now
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Comparison Table */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-white/10 text-left">
                  <th className="py-3 pr-4 font-semibold text-slate-200">Tool</th>
                  <th className="py-3 px-4 font-semibold text-slate-200">Price</th>
                  <th className="py-3 px-4 font-semibold text-slate-200">Automation</th>
                  <th className="py-3 px-4 font-semibold text-slate-200">Ease of Use</th>
                  <th className="py-3 px-4 font-semibold text-slate-200">Best For</th>
                  <th className="py-3 pl-4 font-semibold text-slate-200"></th>
                </tr>
              </thead>
              <tbody>
                {recommendedTools.map(tool => (
                  <tr key={tool.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-4 font-medium text-white">{tool.name}</td>
                    <td className="py-3 px-4 text-slate-400">{tool.pricing}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        tool.automationLevel === 'high' || tool.automationLevel === 'autonomous'
                          ? 'bg-green-500/10 text-green-400'
                          : tool.automationLevel === 'medium'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-slate-500/10 text-slate-400'
                      }`}>{tool.automationLevel}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        tool.easeOfUse === 'beginner' ? 'bg-green-500/10 text-green-400'
                        : tool.easeOfUse === 'intermediate' ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-red-500/10 text-red-400'
                      }`}>{tool.easeOfUse}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-xs">{tool.bestFor?.slice(0, 2).join(', ')}</td>
                    <td className="py-3 pl-4">
                      <Link
                        href={`/go/${tool.slug}`}
                        className="text-indigo-400 hover:text-indigo-300 text-xs font-medium whitespace-nowrap"
                      >
                        Try →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Workflow Steps */}
        {task.workflowSteps && task.workflowSteps.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">How to Automate This</h2>
            <div className="space-y-6">
              {task.workflowSteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 bg-[#111827] border border-white/5 rounded-xl p-5">
                    <p className="text-slate-300 leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Premium Workflow CTA */}
        {premiumWorkflow && (
          <section className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get the Full Workflow Pack</h3>
            <p className="text-slate-400 mb-4">{premiumWorkflow.description}</p>
            <div className="text-2xl font-bold text-white mb-4">${(premiumWorkflow.price || 0) / 100}</div>
            <Link
              href={`/workflows/${premiumWorkflow.slug}`}
              className="inline-block px-8 py-3 bg-white text-[#0b0f19] font-semibold rounded-xl hover:bg-slate-200 transition-all"
            >
              Get Full Workflow Pack
            </Link>
            <p className="text-xs text-slate-500 mt-2">Step-by-step SOP + prompts + templates</p>
          </section>
        )}

        {/* 7. Email Capture */}
        <section className="bg-[#111827] border border-white/5 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Get More AI Workflows Weekly</h3>
          <p className="text-slate-400 mb-4">Free AI workflows for research, SEO, and lead generation. No spam, unsubscribe anytime.</p>
          <form
            action="https://app.convertkit.com/forms/placeholder"
            method="post"
            className="flex gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email_address"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-[#0b0f19] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#080c14]">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} DoWithAI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}