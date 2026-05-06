import { pgTable, text, timestamp, boolean, integer, primaryKey } from 'drizzle-orm/pg-core'
import type { AdapterAccount } from 'next-auth/adapters'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  password: text('password'),
  resetToken: text('resetToken'),
  resetTokenExpiry: timestamp('resetTokenExpiry', { mode: 'date' }),
  role: text('role').default('user'),
  points: integer('points').default(0), // 用户积分总数
  purchasedPoints: integer('purchasedPoints').default(0), // 购买的积分（永不过期）
  giftedPoints: integer('giftedPoints').default(0), // 赠送的积分（订阅到期清零）
  // Stripe 相关字段
  stripeCustomerId: text('stripeCustomerId'),
  subscriptionId: text('subscriptionId'),
  subscriptionStatus: text('subscriptionStatus'), // active, cancelled, past_due, etc.
  subscriptionPlan: text('subscriptionPlan'), // pro, enterprise
  subscriptionCurrentPeriodEnd: timestamp('subscriptionCurrentPeriodEnd', { mode: 'date' }),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow(),
})

export const accounts = pgTable('accounts', {
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').$type<AdapterAccount['type']>().notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (account) => ({
  compoundKey: primaryKey({
    columns: [account.provider, account.providerAccountId],
  }),
}))

export const sessions = pgTable('sessions', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable('verificationTokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
}, (vt) => ({
  compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
}))

// ============ V2: Task-Driven Platform Tables ============

export const tools = pgTable('tools', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  longDescription: text('longDescription'),
  category: text('category').notNull(), // browser_agent, research_agent, task_agent, coding_agent
  logo: text('logo'),
  websiteUrl: text('websiteUrl').notNull(),
  affiliateUrl: text('affiliateUrl'),
  pricing: text('pricing'), // Free, Freemium, Paid, $10/mo etc.
  bestFor: text('bestFor').array(), // array of task slugs this tool is best for
  pros: text('pros').array(),
  cons: text('cons').array(),
  automationLevel: text('automationLevel'), // low, medium, high, autonomous
  easeOfUse: text('easeOfUse'), // beginner, intermediate, advanced
  featuredRank: integer('featuredRank'), // null = not featured, 1-3 = featured position
  sponsorStatus: text('sponsorStatus'), // none, sponsored, featured
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow(),
})

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  problem: text('problem').notNull(), // pain point explanation
  outcomeDescription: text('outcomeDescription'), // what user can achieve
  recommendedToolIds: text('recommendedToolIds').array().notNull(),
  comparisonFields: text('comparisonFields').array(), // price, speed, accuracy, automation, ease_of_use, best_use_case
  workflowSteps: text('workflowSteps').array(), // array of step descriptions
  premiumWorkflowId: text('premiumWorkflowId'),
  seoTitle: text('seoTitle'),
  seoDescription: text('seoDescription'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow(),
})

export const workflows = pgTable('workflows', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  targetUser: text('targetUser'), // who this workflow is for
  toolsIncluded: text('toolsIncluded').array(),
  steps: text('steps').array(), // detailed step-by-step
  templateLink: text('templateLink'), // downloadable template URL
  promptTemplates: text('promptTemplates').array(),
  price: integer('price'), // in USD cents, e.g. 1900 = $19
  stripePaymentLink: text('stripePaymentLink'), // Stripe payment link URL
  isPublished: boolean('isPublished').default(false),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow(),
})

export const affiliateClicks = pgTable('affiliateClicks', {
  id: text('id').primaryKey(),
  toolId: text('toolId').references(() => tools.id, { onDelete: 'set null' }),
  taskId: text('taskId'),
  sourcePage: text('sourcePage'), // /, /tasks/slug, /agents/slug etc.
  referrer: text('referrer'),
  userAgent: text('userAgent'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
})

export const emailVerificationTokens = pgTable('emailVerificationTokens', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  token: text('token').notNull().unique(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
})

export const newsletterSubscriptions = pgTable('newsletterSubscriptions', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  isActive: boolean('isActive').default(true),
  locale: text('locale').notNull().default('zh'), // 用户订阅时的语言偏好
  subscribedAt: timestamp('subscribedAt', { mode: 'date' }).defaultNow(),
  unsubscribedAt: timestamp('unsubscribedAt', { mode: 'date' }),
  unsubscribeToken: text('unsubscribeToken').unique(), // 用于取消订阅的令牌
})

export const pointsHistory = pgTable('pointsHistory', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  points: integer('points').notNull(), // 积分变动数量（正数为增加，负数为扣除）
  pointsType: text('pointsType').notNull().default('purchased'), // 积分类型：purchased(购买), gifted(赠送)
  action: text('action').notNull(), // 操作类型：register, email_verify, daily_login, referral, manual, purchase, subscription_gift, subscription_expired等
  description: text('description'), // 操作描述
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
})

// Stripe支付记录表
export const stripePayments = pgTable('stripePayments', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  stripeCustomerId: text('stripeCustomerId').notNull(),
  paymentIntentId: text('paymentIntentId'),
  checkoutSessionId: text('checkoutSessionId'),
  subscriptionId: text('subscriptionId'),
  invoiceId: text('invoiceId'),
  paymentStatus: text('paymentStatus').notNull(), // succeeded, failed, pending, refunded等
  paymentType: text('paymentType').notNull(), // subscription, points_purchase, one_time等
  amount: integer('amount').notNull(), // 支付金额（分为单位）
  currency: text('currency').notNull().default('usd'),
  productName: text('productName'),
  productDescription: text('productDescription'),
  priceId: text('priceId'),
  pointsAmount: integer('pointsAmount'), // 购买的积分数量
  pointsType: text('pointsType'), // purchased, gifted
  subscriptionPlan: text('subscriptionPlan'), // pro, enterprise
  subscriptionPeriodStart: timestamp('subscriptionPeriodStart', { mode: 'date' }),
  subscriptionPeriodEnd: timestamp('subscriptionPeriodEnd', { mode: 'date' }),
  refundAmount: integer('refundAmount'), // 退款金额（分为单位）
  refundReason: text('refundReason'),
  refundedAt: timestamp('refundedAt', { mode: 'date' }),
  metadata: text('metadata'), // JSON字符串，存储额外信息
  webhookEventId: text('webhookEventId'), // Stripe webhook事件ID
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow(),
}) 