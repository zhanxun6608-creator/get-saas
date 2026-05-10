"use client"

import Script from "next/script"
import { useCookieConsent } from "@/components/cookie-consent/cookie-consent-context"
import { useState, useEffect } from "react"

function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const { consent } = useCookieConsent()

  if (!gaId || gaId === "谷歌GA-ID") return null
  if (!consent?.analytics) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}

function PostHogAnalytics() {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"
  const { consent } = useCookieConsent()

  if (!posthogKey) return null
  if (!consent?.analytics) return null

  return (
    <Script id="posthog-analytics" strategy="afterInteractive">
      {`
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureFlagEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups getSessionId getSessionId alias set_config".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('${posthogKey}', {
          api_host: '${posthogHost}',
          person_profiles: 'identified_only',
        })
      `}
    </Script>
  )
}

function GoogleAdSense() {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-8477364429434453"
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Always load the base script for site verification. Ad display is still
  // consent-gated inside the AdUnit component (adsbygoogle.push only fires
  // when consent.marketing is true).
  if (!mounted) return null

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  )
}

export function Analytics() {
  const { consent } = useCookieConsent()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Don't render anything until consent is determined
  if (!mounted || !consent) return null

  return (
    <>
      <GoogleAnalytics />
      <PostHogAnalytics />
      <GoogleAdSense />
    </>
  )
}