import { getAllWorkflows } from '@/lib/task-queries'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Agent Workflows — DoWithAI',
  description: 'Premium AI automation workflow packs. Step-by-step SOPs, prompt templates, and tool stacks for competitor research, lead generation, and SEO automation.',
}

export default async function WorkflowsPage() {
  const workflows = await getAllWorkflows()

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-300">
      <nav className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-bold text-white">DoWithAI</Link>
            <Link href="/tasks" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Tasks</Link>
            <Link href="/agents" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Agents</Link>
            <Link href="/workflows" className="text-sm text-indigo-400 transition-colors">Workflows</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="text-center mb-12">
          <h1 className="text-[36px] md:text-[44px] font-bold text-white">AI Workflow Packs</h1>
          <p className="text-lg text-slate-400 mt-3">Complete automation systems — SOPs, prompts, and tool stacks ready to deploy.</p>
        </section>

        <div className="grid md:grid-cols-3 gap-6">
          {workflows.map(wf => (
            <Link
              key={wf.id}
              href={`/workflows/${wf.slug}`}
              className="group bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all"
            >
              <h2 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">{wf.title}</h2>
              <p className="text-sm text-slate-400 mt-2 flex-1">{wf.description}</p>
              {wf.toolsIncluded && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {wf.toolsIncluded.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-xs rounded-full">{t}</span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-white">${(wf.price || 0) / 100}</span>
                <span className="text-xs text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">View Details →</span>
              </div>
            </Link>
          ))}
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