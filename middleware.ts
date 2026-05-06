import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix: 'always'
})

export const config = {
  // Skip middleware for V2 marketing pages, API, static files, and go redirects
  matcher: ['/((?!api|_next|_vercel|go|tasks|agents|workflows|.*\\..*).*)']
} 