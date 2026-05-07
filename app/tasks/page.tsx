import { getAllTasks } from '@/lib/task-queries'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Agent Tasks — DoWithAI',
  description: 'Find AI agents to automate your work. Browse tasks like competitor research, lead generation, SEO content, web scraping, and market research.',
}

export default async function TasksPage() {
  const tasks = await getAllTasks()

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-300">
      <nav className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-bold text-white">DoWithAI</Link>
            <Link href="/tasks" className="text-sm text-indigo-400">Tasks</Link>
            <Link href="/agents" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Agents</Link>
            <Link href="/workflows" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Workflows</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="text-center mb-12">
          <h1 className="text-[36px] md:text-[44px] font-bold text-white">What do you want to automate?</h1>
          <p className="text-lg text-slate-400 mt-3">Pick a task and discover the best AI agents to get it done.</p>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map(task => (
            <Link
              key={task.id}
              href={`/tasks/${task.slug}`}
              className="group bg-[#111827] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all"
            >
              <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">{task.title}</h2>
              <p className="text-sm text-slate-400 mt-2">{task.description}</p>
              {task.workflowSteps && (
                <div className="mt-3 text-xs text-indigo-400">{task.workflowSteps.length}-step workflow</div>
              )}
            </Link>
          ))}
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