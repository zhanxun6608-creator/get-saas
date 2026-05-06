import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { tools, affiliateClicks } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  const { toolId } = await params
  const searchParams = request.nextUrl.searchParams
  const taskId = searchParams.get('taskId') || null
  const sourcePage = searchParams.get('source') || '/go'
  const referrer = request.headers.get('referer') || null
  const userAgent = request.headers.get('user-agent') || null

  // Look up the tool
  const tool = await db.select().from(tools).where(eq(tools.slug, toolId)).limit(1)
  const toolData = tool[0]

  if (!toolData) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Record the click (fire and forget — don't block the redirect)
  db.insert(affiliateClicks).values({
    id: nanoid(),
    toolId: toolData.id,
    taskId,
    sourcePage,
    referrer,
    userAgent,
  }).catch(() => {
    // Silently ignore tracking errors
  })

  // Redirect to affiliate URL or website URL
  const targetUrl = toolData.affiliateUrl && toolData.affiliateUrl !== '#'
    ? toolData.affiliateUrl
    : toolData.websiteUrl

  return NextResponse.redirect(new URL(targetUrl))
}