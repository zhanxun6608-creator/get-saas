/**
 * DoWithAI Affiliate Link Manager
 * All affiliate/referral links managed in one place.
 * Replace placeholder URLs with your actual affiliate links.
 */

const AFFILIATE_LINKS = {
  // Browser Agents
  openclaw: {
    default: '#',           // 替换为 OpenClaw affiliate link
    quickstart: '#',        // 替换为 OpenClaw Quickstart (WarriorPlus) link
  },
  hermes: {
    default: '#',           // 替换为 Hermes Agent affiliate link
  },

  // Research Agents
  perplexity: {
    default: '#',           // Perplexity 官方 referral 已暂停，监控恢复
  },
  openai: {
    default: '#',           // OpenAI 目前无 affiliate 计划
  },

  // Task / Coding Agents
  devin: {
    default: '#',           // Devin 无 affiliate 计划
  },
  cursor: {
    default: '#',           // Cursor 无官方 affiliate，可从 PartnerStack 搜替代品
  },

  // Generic / Platform links
  partnerstack: 'https://partnerstack.com',
  impact: 'https://impact.com',
};

/**
 * Replace placeholder hrefs with actual affiliate links on page load.
 * Add data-affiliate="key" to any <a> tag to auto-populate its href.
 */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-affiliate]').forEach(el => {
    const key = el.getAttribute('data-affiliate');
    if (AFFILIATE_LINKS[key] && AFFILIATE_LINKS[key].default) {
      el.href = AFFILIATE_LINKS[key].default;
    }
  });
});