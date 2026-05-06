import { notFound } from 'next/navigation'
import { getToolBySlug, getAllTasks } from '@/lib/task-queries'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = await getToolBySlug(slug)
  if (!tool) return { title: 'Not Found' }
  return { title: `${tool.name} — AI Agent Review | DoWithAI`, description: tool.description }
}

export default async function AgentPage({ params }: Props) {
  const { slug } = await params
  const tool = await getToolBySlug(slug)
  if (!tool) notFound()

  const allTasks = await getAllTasks()
  const relatedTasks = allTasks.filter(t => t.recommendedToolIds?.includes(tool.id))

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

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <section>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium border bg-indigo-500/10 text-indigo-400 border-indigo-500/20">{tool.category?.replace('_', ' ')}</span>
            {tool.featuredRank && tool.featuredRank <= 3 && <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">Featured Pick</span>}
          </div>
          <h1 className="text-[36px] md:text-[44px] font-bold text-white">{tool.name}</h1>
          <p className="text-lg text-slate-400 mt-3 max-w-2xl">{tool.longDescription || tool.description}</p>
          <div className="mt-6 flex gap-4">
            <a href={`/go/${tool.slug}`} className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25">Try {tool.name} →</a>
            <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-white/10 text-slate-300 font-medium rounded-xl hover:border-indigo-500/30 transition-all">Visit Website</a>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          {tool.pros && tool.pros.length > 0 && (
            <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Strengths</h3>
              <ul className="space-y-2">{tool.pros.map((pro, i) => <li key={i} className="flex items-start gap-2 text-sm text-slate-400"><span className="text-green-400 mt-0.5">+</span>{pro}</li>)}</ul>
            </div>
          )}
          {tool.cons && tool.cons.length > 0 && (
            <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Limitations</h3>
              <ul className="space-y-2">{tool.cons.map((con, i) => <li key={i} className="flex items-start gap-2 text-sm text-slate-400"><span className="text-red-400 mt-0.5">-</span>{con}</li>)}</ul>
            </div>
          )}
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{l:'Pricing',v:tool.pricing},{l:'Automation',v:tool.automationLevel},{l:'Ease of Use',v:tool.easeOfUse},{l:'Category',v:tool.category?.replace('_',' ')}].map((item,i) => (
            <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">{item.l}</div>
              <div className="text-sm font-medium text-white capitalize">{item.v}</div>
            </div>
          ))}
        </section>

        {relatedTasks.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Best for These Tasks</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedTasks.map(task => (
                <Link key={task.id} href={`/tasks/${task.slug}`} className="bg-[#111827] border border-white/5 rounded-xl p-5 hover:border-indigo-500/30 transition-all group">
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">{task.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{task.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="text-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-2">Ready to automate your workflow?</h3>
          <p className="text-slate-400 mb-4">Start using {tool.name} today.</p>
          <a href={`/go/${tool.slug}`} className="inline-block px-8 py-3 bg-white text-[#0b0f19] font-semibold rounded-xl hover:bg-slate-200 transition-all">Get Started Free →</a>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#080c14]">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-xs text-slate-500">&copy; {new Date().getFullYear()} DoWithAI. All rights reserved.</div>
      </footer>
    </div>
  )
}