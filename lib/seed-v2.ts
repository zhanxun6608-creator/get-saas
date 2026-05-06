import { db } from './db'
import { tools, tasks, workflows } from './schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

async function seed() {
  console.log('Seeding V2 data...')

  // ============ TOOLS ============
  const toolData = [
    {
      id: nanoid(),
      name: 'OpenClaw',
      slug: 'openclaw',
      description: 'Autonomous browser agent that can navigate websites, fill forms, and extract data at scale.',
      longDescription: 'OpenClaw is an AI-powered browser automation agent that turns natural language instructions into automated web actions. It navigates websites, fills out forms, scrapes structured data, and handles multi-step workflows — all without writing code. Used by marketers, researchers, and sales teams for lead enrichment, competitor monitoring, and data extraction.',
      category: 'browser_agent',
      websiteUrl: 'https://openclaw.ai',
      affiliateUrl: '#',
      pricing: 'Freemium',
      bestFor: ['web-scraping', 'lead-generation', 'competitor-research'],
      pros: ['No-code setup', 'Handles CAPTCHA', 'Scales to thousands of pages'],
      cons: ['Credit-based pricing at scale', 'Limited API customization'],
      automationLevel: 'high',
      easeOfUse: 'beginner',
      featuredRank: 1,
      sponsorStatus: null,
    },
    {
      id: nanoid(),
      name: 'Hermes Agent',
      slug: 'hermes',
      description: 'Stealth browser agent for web scraping, data collection, and automated browsing at scale.',
      longDescription: 'Hermes is a high-performance browser agent focused on undetectable web automation. It uses advanced fingerprint evasion and session management to handle websites that actively block bots, making it ideal for competitive intelligence, price monitoring, and large-scale data collection.',
      category: 'browser_agent',
      websiteUrl: 'https://hermesagent.com',
      affiliateUrl: '#',
      pricing: 'Paid',
      bestFor: ['web-scraping', 'market-research', 'competitor-research'],
      pros: ['Undetectable browsing', 'Built-in proxy rotation', 'Structured data output'],
      cons: ['Higher cost', 'Requires some technical setup'],
      automationLevel: 'high',
      easeOfUse: 'intermediate',
      featuredRank: 2,
      sponsorStatus: null,
    },
    {
      id: nanoid(),
      name: 'Perplexity AI',
      slug: 'perplexity',
      description: 'AI-powered research assistant with real-time web search, deep research, and source citations.',
      longDescription: 'Perplexity AI is a research engine that combines large language models with real-time web search. Its Deep Research mode can autonomously explore a topic across dozens of sources, synthesize findings, and produce cited research reports — making it ideal for market analysis, competitor research, and due diligence.',
      category: 'research_agent',
      websiteUrl: 'https://perplexity.ai',
      affiliateUrl: '#',
      pricing: 'Freemium',
      bestFor: ['market-research', 'competitor-research', 'seo-content'],
      pros: ['Real-time citations', 'Deep Research mode', 'Free tier is generous'],
      cons: ['No persistent automation', 'Manual report export'],
      automationLevel: 'medium',
      easeOfUse: 'beginner',
      featuredRank: 3,
      sponsorStatus: null,
    },
    {
      id: nanoid(),
      name: 'OpenAI Deep Research',
      slug: 'openai-deep-research',
      description: 'Frontier research agent that autonomously explores complex topics and produces comprehensive reports.',
      longDescription: 'OpenAI Deep Research (powered by o3) is a frontier research agent capable of autonomously exploring complex topics across hundreds of sources. It produces detailed, cited research reports with analysis quality approaching that of a skilled research analyst. Best suited for deep competitive analysis, market intelligence, and strategic research.',
      category: 'research_agent',
      websiteUrl: 'https://chatgpt.com',
      affiliateUrl: '#',
      pricing: '$200/mo (ChatGPT Pro)',
      bestFor: ['market-research', 'competitor-research'],
      pros: ['Best-in-class depth', 'Full report generation', 'Enterprise-grade reliability'],
      cons: ['Expensive', 'Overkill for simple research'],
      automationLevel: 'high',
      easeOfUse: 'beginner',
      featuredRank: null,
      sponsorStatus: null,
    },
    {
      id: nanoid(),
      name: 'Cursor',
      slug: 'cursor',
      description: 'AI-first code editor that understands your codebase and can autonomously implement features.',
      longDescription: 'Cursor is an AI-first code editor built on VS Code that deeply understands your entire codebase. It can autonomously implement features, fix bugs, write tests, and explain code — all through natural language instructions. Ideal for developers who want to automate large portions of their coding workflow.',
      category: 'coding_agent',
      websiteUrl: 'https://cursor.com',
      affiliateUrl: '#',
      pricing: 'Freemium',
      bestFor: ['coding-automation', 'web-scraping'],
      pros: ['Full codebase context', 'Agent mode for complex tasks', 'Great VS Code integration'],
      cons: ['Limited to coding tasks', 'Paid plan needed for heavy use'],
      automationLevel: 'high',
      easeOfUse: 'intermediate',
      featuredRank: null,
      sponsorStatus: null,
    },
    {
      id: nanoid(),
      name: 'Devin',
      slug: 'devin',
      description: 'Fully autonomous AI software engineer that can plan, code, debug, and deploy entire features.',
      longDescription: 'Devin is a fully autonomous AI software engineer by Cognition AI. Unlike copilots, Devin operates independently — it plans the implementation, writes the code, runs tests, debugs errors, and can even deploy. It works in its own sandboxed environment with a full shell, editor, and browser.',
      category: 'coding_agent',
      websiteUrl: 'https://devin.ai',
      affiliateUrl: '#',
      pricing: '$500/mo',
      bestFor: ['coding-automation', 'seo-content'],
      pros: ['Fully autonomous', 'Handles entire SDLC', 'Sandboxed environment'],
      cons: ['Very expensive', 'Overkill for small tasks'],
      automationLevel: 'autonomous',
      easeOfUse: 'advanced',
      featuredRank: null,
      sponsorStatus: null,
    },
  ]

  // ============ TASKS ============
  const taskData = [
    {
      id: nanoid(),
      title: 'Competitor Research Automation',
      slug: 'competitor-research',
      description: 'Automate website analysis, pricing tracking, ad monitoring, and positioning research with AI agents.',
      problem: 'Manual competitor research takes hours per competitor. You need to visit every website, track changes over time, monitor their ads, and synthesize findings into actionable intelligence. AI agents can now automate the entire research pipeline — from discovery to reporting.',
      outcomeDescription: 'Automate competitor analysis, pricing monitoring, ad tracking, and generate comprehensive competitive intelligence reports.',
      recommendedToolIds: [] as string[], // filled after tool insert
      comparisonFields: ['price', 'speed', 'accuracy', 'automation', 'ease_of_use', 'best_use_case'],
      workflowSteps: [
        'Step 1: Discover competitors — Use AI research agents to identify direct and indirect competitors in your market.',
        'Step 2: Extract website data — Deploy browser agents to scrape competitor websites for pricing, features, and positioning.',
        'Step 3: Analyze positioning — Use research agents to synthesize findings into SWOT analysis and positioning maps.',
        'Step 4: Generate report — Compile findings into an automated competitive intelligence report with source citations.',
      ],
      premiumWorkflowId: null as string | null, // filled after workflow insert
      seoTitle: 'Best AI Agents for Competitor Research in 2026',
      seoDescription: 'Discover the best AI agents for automating competitor research. Compare tools for website analysis, pricing tracking, and competitive intelligence.',
    },
    {
      id: nanoid(),
      title: 'Lead Generation Automation',
      slug: 'lead-generation',
      description: 'Automate prospect discovery, enrichment, and outreach workflows with AI browser and research agents.',
      problem: 'Finding quality leads requires hours of manual searching across LinkedIn, company websites, and industry directories. AI browser agents can now automate the entire lead generation pipeline — from discovering prospects to enriching profiles and qualifying leads.',
      outcomeDescription: 'Build automated pipelines for lead discovery, data enrichment, and prospect qualification.',
      recommendedToolIds: [] as string[],
      comparisonFields: ['price', 'speed', 'accuracy', 'automation', 'ease_of_use', 'best_use_case'],
      workflowSteps: [
        'Step 1: Define ICP — Configure your ideal customer profile (industry, size, role, signals) for the AI agent.',
        'Step 2: Discover prospects — Deploy browser agents to search LinkedIn, directories, and company websites.',
        'Step 3: Enrich data — Use AI to extract and structure prospect information into your CRM-ready format.',
        'Step 4: Qualify leads — Apply scoring rules to rank and segment leads automatically.',
      ],
      premiumWorkflowId: null as string | null,
      seoTitle: 'Best AI Agents for Lead Generation in 2026',
      seoDescription: 'Compare the best AI agents for automated lead generation. Find tools for prospect discovery, data enrichment, and email outreach automation.',
    },
    {
      id: nanoid(),
      title: 'SEO Content Automation',
      slug: 'seo-content',
      description: 'Automate keyword research, content creation, and optimization with AI research and writing agents.',
      problem: 'SEO content at scale is a bottleneck — manual research, writing, and optimization takes dozens of hours per month. AI agents can now handle the full SEO content pipeline, from keyword discovery to content brief creation to first-draft generation.',
      outcomeDescription: 'Streamline keyword research, content planning, and AI-assisted content creation for consistent SEO output.',
      recommendedToolIds: [] as string[],
      comparisonFields: ['price', 'speed', 'accuracy', 'automation', 'ease_of_use', 'best_use_case'],
      workflowSteps: [
        'Step 1: Keyword discovery — Use AI research agents to find high-intent, low-competition keywords in your niche.',
        'Step 2: SERP analysis — Analyze top-ranking pages to understand what Google rewards for each keyword.',
        'Step 3: Content brief — Generate a detailed content brief with target keywords, structure, and outline.',
        'Step 4: AI content generation — Use AI writing agents to produce optimized first drafts that match search intent.',
      ],
      premiumWorkflowId: null as string | null,
      seoTitle: 'Best AI Agents for SEO Content Creation in 2026',
      seoDescription: 'Find the best AI agents for SEO content creation. Compare tools for keyword research, content generation, and search intent optimization.',
    },
    {
      id: nanoid(),
      title: 'Web Scraping Automation',
      slug: 'web-scraping',
      description: 'Automate data extraction from any website with AI browser agents — no coding required.',
      problem: 'Web scraping traditionally requires coding skills, proxy management, and constant maintenance as websites change. AI browser agents now handle all of this automatically — they can navigate complex websites, extract structured data, and adapt to page changes in real time.',
      outcomeDescription: 'Extract structured data from any website at scale, without writing a single line of code.',
      recommendedToolIds: [] as string[],
      comparisonFields: ['price', 'speed', 'accuracy', 'automation', 'ease_of_use', 'best_use_case'],
      workflowSteps: [
        'Step 1: Define targets — Specify the websites and data points you need to extract.',
        'Step 2: Configure agents — Set up browser agents with extraction rules and output format.',
        'Step 3: Run extraction — Execute scraping tasks at scale, with automatic retry and error handling.',
        'Step 4: Export data — Receive structured data in CSV, JSON, or direct database integration.',
      ],
      premiumWorkflowId: null as string | null,
      seoTitle: 'Best AI Agents for Web Scraping in 2026',
      seoDescription: 'Compare the best AI agents for automated web scraping. No-code tools for data extraction, competitor monitoring, and lead enrichment.',
    },
    {
      id: nanoid(),
      title: 'Market Research Automation',
      slug: 'market-research',
      description: 'Automate market analysis, trend tracking, and industry reports with AI research agents.',
      problem: 'Market research is time-intensive — you need to analyze industry reports, track trends, monitor news, and synthesize findings across dozens of sources. AI research agents can now autonomously explore a market, gather intelligence, and produce comprehensive analysis reports.',
      outcomeDescription: 'Generate comprehensive market analysis reports with AI-powered research, trend tracking, and competitive landscape mapping.',
      recommendedToolIds: [] as string[],
      comparisonFields: ['price', 'speed', 'accuracy', 'automation', 'ease_of_use', 'best_use_case'],
      workflowSteps: [
        'Step 1: Define scope — Specify the market, industry, or trend you want to analyze.',
        'Step 2: Gather intelligence — Deploy research agents to explore market reports, news, and industry data.',
        'Step 3: Analyze trends — Use AI to identify patterns, growth signals, and competitive dynamics.',
        'Step 4: Generate report — Produce a structured market analysis with findings, insights, and recommendations.',
      ],
      premiumWorkflowId: null as string | null,
      seoTitle: 'Best AI Agents for Market Research in 2026',
      seoDescription: 'Discover the best AI agents for automated market research. Compare tools for trend analysis, competitive intelligence, and industry reports.',
    },
  ]

  // ============ WORKFLOWS ============
  const workflowData = [
    {
      id: nanoid(),
      title: 'Competitor Research Workflow Pack',
      slug: 'competitor-research',
      description: 'Complete system for automating competitor research — from discovery to weekly intelligence reports.',
      targetUser: 'Founders, marketers, and strategy teams who need regular competitive intelligence without manual effort.',
      toolsIncluded: ['OpenClaw', 'Perplexity AI', 'OpenAI Deep Research'],
      steps: [
        'Define competitor universe and monitoring scope',
        'Configure automated weekly scans and alerts',
        'Set up AI research agent workflows for deep-dive analysis',
        'Build automated intelligence report templates',
        'Schedule recurring competitive audits with browser agents',
      ],
      templateLink: null,
      promptTemplates: [
        'Competitor discovery prompt: Identify all direct competitors for [company] in [industry]...',
        'SWOT analysis prompt: Analyze [competitor] strengths, weaknesses, opportunities, and threats...',
        'Pricing comparison prompt: Extract and compare pricing for [competitor products]...',
      ],
      price: 2900, // $29
      stripePaymentLink: '#',
      isPublished: true,
    },
    {
      id: nanoid(),
      title: 'Lead Generation Workflow Pack',
      slug: 'lead-generation',
      description: 'Automated prospect discovery and enrichment system — find, qualify, and organize leads at scale.',
      targetUser: 'Sales teams, agency owners, and founders who want to automate top-of-funnel lead generation.',
      toolsIncluded: ['OpenClaw', 'Hermes Agent'],
      steps: [
        'Define ideal customer profile and targeting criteria',
        'Configure browser agents for multi-platform prospect discovery',
        'Set up automated data enrichment workflows',
        'Build lead scoring and qualification rules',
        'Create CRM integration and automated export pipeline',
      ],
      templateLink: null,
      promptTemplates: [
        'ICP definition prompt: Define the ideal customer profile for [product/service]...',
        'Lead qualification prompt: Score this prospect based on [criteria]...',
        'Enrichment prompt: Extract and structure the following information for [prospect]...',
      ],
      price: 3900, // $39
      stripePaymentLink: '#',
      isPublished: true,
    },
    {
      id: nanoid(),
      title: 'SEO Automation Workflow Pack',
      slug: 'seo-automation',
      description: 'End-to-end SEO content system — keyword research, content planning, and AI-assisted creation.',
      targetUser: 'Content marketers, SEO specialists, and indie founders building organic traffic.',
      toolsIncluded: ['Perplexity AI', 'OpenAI Deep Research'],
      steps: [
        'Set up keyword discovery and prioritization pipeline',
        'Configure SERP analysis and content gap identification',
        'Build automated content brief and outline generation',
        'Create AI writing agent workflows for first drafts',
        'Implement optimization checklist and publishing calendar',
      ],
      templateLink: null,
      promptTemplates: [
        'Keyword research prompt: Find high-intent, low-competition keywords for [niche/topic]...',
        'Content brief prompt: Generate a detailed content brief for [target keyword]...',
        'SEO optimization prompt: Optimize this draft for [keyword] while maintaining readability...',
      ],
      price: 1900, // $19
      stripePaymentLink: '#',
      isPublished: true,
    },
  ]

  // Insert data
  console.log('Inserting tools...')
  for (const t of toolData) {
    await db.insert(tools).values(t).onConflictDoNothing()
  }

  console.log('Inserting tasks...')
  const insertedTools = await db.select().from(tools)
  const toolIdMap = new Map(insertedTools.map(t => [t.slug, t.id]))

  // Map task recommended tools by slug
  const taskToolMap: Record<string, string[]> = {
    'competitor-research': ['openclaw', 'hermes', 'perplexity', 'openai-deep-research'],
    'lead-generation': ['openclaw', 'hermes'],
    'seo-content': ['perplexity', 'openai-deep-research'],
    'web-scraping': ['openclaw', 'hermes'],
    'market-research': ['perplexity', 'openai-deep-research', 'openclaw'],
  }

  const taskIds: Record<string, string> = {}
  for (const t of taskData) {
    t.recommendedToolIds = (taskToolMap[t.slug] || [])
      .map(slug => toolIdMap.get(slug))
      .filter(Boolean) as string[]
    taskIds[t.slug] = t.id
    await db.insert(tasks).values(t).onConflictDoNothing()
  }

  console.log('Inserting workflows...')
  const workflowSlugToId: Record<string, string> = {}
  for (const w of workflowData) {
    workflowSlugToId[w.slug] = w.id
    await db.insert(workflows).values(w).onConflictDoNothing()
  }

  // Update tasks with premium workflow IDs
  const taskWorkflowMap: Record<string, string> = {
    'competitor-research': 'competitor-research',
    'lead-generation': 'lead-generation',
    'seo-content': 'seo-automation',
  }

  for (const [taskSlug, wfSlug] of Object.entries(taskWorkflowMap)) {
    const taskId = taskIds[taskSlug]
    const wfId = workflowSlugToId[wfSlug]
    if (taskId && wfId) {
      await db.update(tasks)
        .set({ premiumWorkflowId: wfId })
        .where(eq(tasks.id, taskId))
    }
  }

  console.log('Seed complete!')
  console.log(`  Tools: ${toolData.length}`)
  console.log(`  Tasks: ${taskData.length}`)
  console.log(`  Workflows: ${workflowData.length}`)
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})