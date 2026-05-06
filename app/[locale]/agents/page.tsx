import { getAllTools } from '@/lib/task-queries'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Agents Directory — DoWithAI',
  description: 'Browse AI agents for browser automation, research, coding, and task execution. Compare tools and find the best agent for your workflow.',
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  browser_agent: { label: 'Browser Agent', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  research_agent: { label: 'Research Agent', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  coding_agent: { label: 'Coding Agent', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  task_agent: { label: 'Task Agent', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
}

export default async function AgentsPage() {
  const tools = await getAllTools()

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-300">
      <nav className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-bold text-white">DoWithAI</Link>
            <Link href="/tasks" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Tasks</Link>
            <Link href="/agents" className="text-sm text-indigo-400 transition-colors">Agents</Link>
            <Link href="/workflows" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Workflows</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="text-center mb-12">
          <h1 className="text-[36px] md:text-[44px] font-bold text-white">AI Agents Directory</h1>
          <p className="text-lg text-slate-400 mt-3">Compare the best AI agents for browser automation, research, coding, and task execution.</p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => {
            const cat = categoryLabels[tool.category] || categoryLabels.task_agent
            return (
              <Link
                key={tool.id}
                href={`/agents/${tool.slug}`}
                className="group bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${cat.color}`}>{cat.label}</span>
                  {tool.featuredRank && tool.featuredRank <= 3 && (
                    <span className="text-xs text-amber-400 font-medium">Featured</span>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">{tool.name}</h2>
                <p className="text-sm text-slate-400 mt-2 flex-1">{tool.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{tool.pricing}</span>
                  <span className="text-xs text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">View →</span>
                </div>
              </Link>
            )
          })}
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