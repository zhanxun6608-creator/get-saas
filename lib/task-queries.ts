import { db } from './db'
import { tools, tasks, workflows } from './schema'
import { eq, inArray } from 'drizzle-orm'

export async function getTaskBySlug(slug: string) {
  const result = await db.select().from(tasks).where(eq(tasks.slug, slug)).limit(1)
  return result[0] || null
}

export async function getAllTasks() {
  return await db.select().from(tasks).orderBy(tasks.createdAt)
}

export async function getToolsByIds(ids: string[]) {
  if (ids.length === 0) return []
  return await db.select().from(tools).where(inArray(tools.id, ids))
}

export async function getToolBySlug(slug: string) {
  const result = await db.select().from(tools).where(eq(tools.slug, slug)).limit(1)
  return result[0] || null
}

export async function getAllTools() {
  return await db.select().from(tools).orderBy(tools.createdAt)
}

export async function getFeaturedTools() {
  return await db.select().from(tools).where(inArray(tools.featuredRank, [1, 2, 3])).orderBy(tools.featuredRank)
}

export async function getWorkflowBySlug(slug: string) {
  const result = await db.select().from(workflows).where(eq(workflows.slug, slug)).limit(1)
  return result[0] || null
}

export async function getWorkflowById(id: string) {
  const result = await db.select().from(workflows).where(eq(workflows.id, id)).limit(1)
  return result[0] || null
}

export async function getAllWorkflows() {
  return await db.select().from(workflows).where(eq(workflows.isPublished, true)).orderBy(workflows.createdAt)
}