import { getAllTasks, getFeaturedTools } from '@/lib/task-queries'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DoWithAI — Find AI Agents for Real Work',
  description: 'Discover AI agents for research, lead generation, SEO, content creation, and business automation.',
}

export default async function HomePage() {
  const tasks = await getAllTasks()
  const featuredTools = await getFeaturedTools()

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-300">
      <nav className="border-b border-white/5 sticky top-0 bg-[#0b0f19]/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-bold text-white">DoWithAI</Link>
            <Link href="/tasks" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors hidden sm:block">Tasks</Link>
            <Link href="/agents" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors hidden sm:block">Agents</Link>
            <Link href="/workflows" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors hidden sm:block">Workflows</Link>
          </div>
          <div>
            <a href="#subscribe" className="px-4 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all">
              Get Workflows
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="py-20 md:py-28 px-6 text-center">
          <h1 className="text-[40px] md:text-[56px] font-bold leading-[1.08] text-white max-w-4xl mx-auto">
            Find AI Agents for Real Work
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mt-6 max-w-2xl mx-auto leading-relaxed">
            Discover AI agents for research, lead generation, SEO, content creation, and business automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/tasks"
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 text-lg"
            >
              Explore by Task
            </Link>
            <a
              href="#subscribe"
              className="px-8 py-3.5 border border-white/10 text-slate-300 font-semibold rounded-xl hover:border-indigo-500/30 transition-all text-lg"
            >
              Get Weekly AI Workflows
            </a>
          </div>
        </section>

        {/* Task Cards */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="text-2xl md:text-[32px] font-bold text-white text-center mb-10">
            What do you want to automate?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
              <Link
                key={task.id}
                href={`/tasks/${task.slug}`}
                className="group bg-[#111827] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  {task.title}
                </h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">{task.description}</p>
                {task.workflowSteps && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 rounded-full">
                    <span className="text-xs text-indigo-400">{task.workflowSteps.length}-step automation</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Agents */}
        {featuredTools.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 pb-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-[32px] font-bold text-white">
                Top Recommended Agents
              </h2>
              <Link href="/agents" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredTools.map((tool, i) => (
                <div key={tool.id} className="bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group">
                  {i === 0 && <div className="text-xs font-semibold text-amber-400 mb-2">Top Pick</div>}
                  <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                  <p className="text-xs text-indigo-400 mt-0.5 mb-3">Best for: {tool.bestFor?.join(', ')}</p>
                  <p className="text-sm text-slate-400 flex-1">{tool.description}</p>
                  <div className="mt-3 text-xs text-slate-500">{tool.pricing}</div>
                  <a
                    href={`/go/${tool.slug}`}
                    className="mt-4 block text-center py-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-xl hover:bg-indigo-500 hover:text-white transition-all text-sm font-medium"
                  >
                    Try Now
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Email Subscribe */}
        <section id="subscribe" className="max-w-4xl mx-auto px-6 pb-20">
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Get 20 AI Workflows</h2>
            <p className="text-slate-400 mb-6">
              Free AI workflows for research, SEO, and lead generation. No spam, unsubscribe anytime.
            </p>
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
                Get Free Workflows
              </button>
            </form>
            <p className="text-xs text-slate-600 mt-3">
              Join 500+ professionals getting AI workflows weekly.
            </p>
          </div>
        </section>

        {/* Social Proof */}
        <section className="max-w-6xl mx-auto px-6 pb-20 text-center">
          <p className="text-sm text-slate-500 uppercase tracking-wide mb-4">Trusted by professionals from</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40">
            <span className="text-slate-400 font-semibold text-sm">Notion</span>
            <span className="text-slate-400 font-semibold text-sm">Stripe</span>
            <span className="text-slate-400 font-semibold text-sm">Vercel</span>
            <span className="text-slate-400 font-semibold text-sm">Supabase</span>
            <span className="text-slate-400 font-semibold text-sm">Linear</span>
            <span className="text-slate-400 font-semibold text-sm">Gumroad</span>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#080c14]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm font-semibold text-white">DoWithAI</div>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link href="/tasks" className="hover:text-indigo-400 transition-colors">Tasks</Link>
            <Link href="/agents" className="hover:text-indigo-400 transition-colors">Agents</Link>
            <Link href="/workflows" className="hover:text-indigo-400 transition-colors">Workflows</Link>
            <a href="mailto:zhanxun6608@gmail.com" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} DoWithAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}