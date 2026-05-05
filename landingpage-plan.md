# DoWithAI 落地页 — 最终技术实现方案

> 综合设计师 / 架构师 / 用户 / 运营 / 隐私法务 / **DPO（数据保护官）** 六角色评审，一版定稿。

---

## 零、方案变更摘要（相较上一版）

| # | 变更 | 来源 |
|---|------|------|
| 1 | Tailwind CDN → CLI 构建静态 CSS | 架构师 |
| 2 | Lucide CDN → 内联 SVG（~20 个） | 架构师 |
| 3 | Google Fonts CDN → 本地托管 Inter woff2 | 架构师 + 隐私法务 |
| 4 | 10 工具全列 → 每分类 2 个核心工具（共 6 卡片） | 用户 + 运营 |
| 5 | Hero CTA 从并列改为主次分明 | 运营 |
| 6 | 痛点从 5 条精简为 4 条 | 运营 |
| 7 | 导航从 4 链接精简为 3 链接 | 运营 |
| 8 | FAQ 从 6 个精简为 5 个 | 运营 |
| 9 | 底部增加微转化桥（免费指南 / 收藏 / 订阅 三选一） | 运营 |
| 10 | 趋势判断区浓缩为 3 信号卡片 + 展开链接 | 运营 |
| 11 | 选择建议区 CTA 加具体工具名 | 运营 |
| 12 | H1 字号从 56px 调整为 52px | 设计师 |
| 13 | 15 个 Section 设置交替底色节奏 | 设计师 |
| 14 | Hero 右侧装饰明确为 3 张分类层叠卡片 | 设计师 |
| 15 | 新增 SEO 结构化数据（JSON-LD） | 架构师 |
| 16 | 新增 Accessibility 基线 | 架构师 |
| 17 | 新增 Footer 法律链接 + Privacy Policy / Terms 页面 | 隐私法务 |
| 18 | 新增邮箱 Opt-in 复选框 + 用途说明 | 隐私法务 |
| 19 | 新增页面底部通用免责声明 | 隐私法务 |
| 20 | 字体本地托管（避免 Google Fonts GDPR 风险） | 隐私法务 |
| 21 | 隐私政策展开为 13 章完整文案（原为 9 条大纲） | DPO 审查 |
| 22 | 使用条款展开为 15 章完整文案（原为 7 条大纲） | DPO 审查 |
| 23 | 隐私政策新增数据控制者实体信息（GDPR Art.13(1)(a)） | DPO 审查 |
| 24 | 隐私政策新增数据保留期限和删除策略（GDPR Art.13(2)(a)） | DPO 审查 |
| 25 | 邮件服务商从模糊表述改为具体公司名称+地址+DPF 认证号 | DPO 审查 |
| 26 | 隐私政策新增数据泄露通知程序（GDPR Art.33/34） | DPO 审查 |
| 27 | 隐私政策新增完整权利表格（8 项权利+法规引用+响应承诺） | DPO 审查 |
| 28 | 隐私政策国际传输从笼统提及改为 DPF 三框架逐项列明 | DPO 审查 |
| 29 | 使用条款管辖法律从无效条款改为指定司法管辖区 | DPO 审查 |
| 30 | 使用条款新增可分割性条款（Severability） | DPO 审查 |
| 31 | 使用条款新增完整协议条款（Entire Agreement） | DPO 审查 |
| 32 | 使用条款新增 DMCA 版权侵权投诉程序（17 U.S.C. §512） | DPO 审查 |
| 33 | 使用条款新增赔偿（Indemnification）、终止（Termination）、不可抗力（Force Majeure）、权利转让（Assignment）、不弃权（No Waiver）等标准条款 | DPO 审查 |
| 34 | 全局：隐私/条款中所有口语化表述替换为正式法律用语 | DPO 审查 |

---

## 一、技术栈

| 层 | 选型 | 说明 |
|----|------|------|
| HTML | 纯静态 HTML5 单文件 | 落地页无需框架 |
| CSS | Tailwind CSS v4 CLI 构建 → `output.css` | ~15KB gzip，零运行时 |
| 补充 CSS | 一个 `<style>` 标签，约 80 行 | 覆盖 Tailwind 不便处理的：卡片装饰、自定义动画、focus-visible、print |
| 字体 | Inter woff2，本地托管，4 字重 Latin 子集 | 避免 Google Fonts CDN 的 GDPR 风险 |
| Icon | 内联 SVG，约 20 个 | 取自 Lucide，直接嵌入 HTML，零请求 |
| JS | 原生 ES6 约 100 行，内联 `<script>` | FAQ 折叠、平滑滚动、导航高亮、邮箱验证 |
| 构建 | 单次 CLI 命令 | `npx @tailwindcss/cli -i input.css -o output.css --minify` |
| 部署 | 任意静态托管 | Cloudflare Pages / Netlify / Vercel / GitHub Pages |

**预计整页加载（首次/二次）：**
| 资源 | 首次 | 二次（缓存后） |
|------|------|---------------|
| HTML | ~50KB | ~50KB |
| CSS（Tailwind 构建） | ~15KB gzip | 0（缓存） |
| 补充 CSS（内联） | ~2KB | 内联于 HTML |
| Inter 字体（4 woff2） | ~120KB | 0（缓存 1 年） |
| 内联 SVG | ~5KB | 内联于 HTML |
| JS（内联） | ~3KB | 内联于 HTML |
| **合计** | **~195KB** | **~55KB** |
| LCP 预估 | **< 1.5s** | **< 0.8s** |

---

## 二、文件清单

```
/
├── landingpage.html        ← 落地页主文件
├── privacy-policy.html     ← 隐私政策（精简版，~500 字）
├── terms-of-use.html       ← 使用条款（精简版，~500 字）
├── fonts/
│   ├── inter-latin-400.woff2
│   ├── inter-latin-500.woff2
│   ├── inter-latin-600.woff2
│   └── inter-latin-700.woff2
├── css/
│   └── output.css          ← Tailwind CLI 构建产物
├── input.css               ← Tailwind 源文件（仅 @tailwind 指令 + 自定义层）
└── package.json            ← 仅含 build 命令
```

---

## 三、配色方案（终版）

```
━━ 背景体系 ━━
Hero 背景渐变         #0f172a → #1e3a5f （slate-900 → 海军蓝）
正文白色区            #ffffff
浅灰交替区            #f8fafc （slate-50）
底部 CTA 区           #0f172a （slate-900 满宽）
Footer 背景           #1e293b （slate-800）

━━ 文字体系 ━━
主标题               #0f172a （slate-900）
正文                 #334155 （slate-700）
次级文字             #64748b （slate-500）
反白文字（深底上）    #f1f5f9 （slate-100）
反白次级             #94a3b8 （slate-400）

━━ 交互体系 ━━
主按钮底             #2563eb （blue-600）
主按钮 hover         #1d4ed8 （blue-700）
主按钮文字           #ffffff
次按钮底             透明 + #e2e8f0 边框
次按钮 hover         浅蓝底 #eff6ff
链接色               #2563eb （blue-600）

━━ 语义体系 ━━
强调/高亮数据         #f59e0b （amber-500）
成功/适合             #10b981 （emerald-500）
警告/门槛/风险        #f59e0b （amber-500）+ amber-50 底
错误/删除             #ef4444 （red-500）

━━ 分类 Badge 体系 ━━
浏览器 Agent Badge    底 #dbeafe 字 #1e40af （蓝系）
调研 Agent Badge      底 #d1fae5 字 #065f46 （绿系）
编程 Agent Badge      底 #ede9fe 字 #5b21b6 （紫系）

━━ 卡片体系 ━━
卡片底               #ffffff
卡片边框             #e2e8f0 （slate-200）
卡片 hover 阴影      0 8px 30px rgba(0,0,0,0.08)
卡片 hover 位移       translateY(-4px)
```

---

## 四、字体层级（终版）

```
H1         Inter 700   52px / 1.1 / -0.02em     Hero 主标题
H2         Inter 700   36px / 1.2 / -0.01em     Section 标题
H3         Inter 600   24px / 1.3                 卡片标题
H4         Inter 600   18px / 1.4                 子标题
正文 Lg    Inter 400   18px / 1.7                 正文
正文       Inter 400   16px / 1.7                 卡片内文字
小字       Inter 500   14px / 1.5                 Badge / 标签 / 门槛
按钮       Inter 600   16px / 1.0                 所有按钮
微文案     Inter 400   13px / 1.5                 免责声明 / 版权

移动端覆盖：
H1         36px
H2         28px
H3         22px
```

---

## 五、完整页面结构（14 Section + Header + Footer）

```
Section 00  Sticky 导航栏              — 白色半透明毛玻璃
Section 01  Hero 首屏                  — 深色渐变背景
Section 02  痛点共鸣区                 — 白色背景
Section 03  快速导航区                 — 白色背景
Section 04  工具分类区                 — slate-50 浅灰背景
              ├ 浏览器 Agent (2 卡片)
              ├ 调研 Agent (2 卡片)
              └ 编程 Agent (2 卡片)
Section 05  实际效果区                 — 白色背景
Section 06  门槛说明区                 — slate-50 浅灰背景
Section 07  vs 传统 AI 对比区          — 白色背景
Section 08  选择建议区                 — slate-50 浅灰背景
Section 09  适合谁 / 不适合谁          — 白色背景
Section 10  趋势判断区                 — slate-50 浅灰背景
Section 11  更新与信任区               — 白色背景
Section 12  FAQ 区                     — slate-50 浅灰背景
Section 13  底部 CTA + 微转化桥       — 深色满宽背景
Section 14  通用免责声明               — 深色背景内
Footer      页脚 + 法律链接            — slate-800 背景
```

**视觉节奏：白 → 白 → 灰 → 白 → 灰 → 白 → 灰 → 白 → 灰 → 白 → 灰 → 深色**

---

## 六、逐 Section 组件规格

### Section 00 — Sticky 导航栏

```
桌面端：
┌─────────────────────────────────────────────┐
│  DoWithAI          AI Agents  Compare  About │
│                              [浏览 AI 工具]  │
└─────────────────────────────────────────────┘

移动端：
┌───────────────────────────────┐
│  DoWithAI              [☰]   │  ← 汉堡菜单
└───────────────────────────────┘
```

- 白色底 + `backdrop-blur-md` 毛玻璃
- 滚动超过 100px 后加 `shadow-sm`
- 导航项 3 个（非 4 个），减少认知负担
- 右侧 CTA 为主按钮样式
- 移动端汉堡菜单，展开后全屏覆盖

---

### Section 01 — Hero 首屏

```
┌─────────────────────────────────────────────────────┐
│  [深蓝→海军蓝渐变全宽背景]                            │
│                                                     │
│  ┌──────────────────────┐  ┌────────────────────┐   │
│  │                      │  │                    │   │
│  │  H1: 让 AI 替你干活  │  │  ┌──────────────┐ │   │
│  │      不只是聊天      │  │  │ 📚 Research   │ │   │  ← 3 张层叠卡片
│  │                      │  │  │    Agents     │ │   │    旋转角度
│  │  Sub: 精选真正能自动  │  │  └──────────────┘ │   │    -5° / 0° / 5°
│  │  执行任务的 AI 工具   │  │    ┌────────────┐│   │
│  │                      │  │    │ ⚙️ Task     ││   │
│  │  [找到你的 AI 工具]   │  │    │   Agents   ││   │
│  │  先看案例 →          │  │    └────────────┘│   │
│  │                      │  │  ┌──────────────┐ │   │
│  │                      │  │  │ 🧭 Browser   │ │   │
│  │                      │  │  │    Agents    │ │   │
│  │                      │  │  └──────────────┘ │   │
│  └──────────────────────┘  └────────────────────┘   │
│                                                     │
│  Browser Automation · Research · Task Execution      │
└─────────────────────────────────────────────────────┘
```

**规格：**
- 左侧文字 60%，右侧装饰 40%
- H1 两行，主 CTA 蓝色实心按钮（`找到你的 AI 工具`），次 CTA 文字链接（`先看案例 →`）
- **主次 CTA 垂直排列，不并列**——主按钮在上，次链接在下
- 右侧 3 张卡片：`border-radius: 16px`，轻微 box-shadow，旋转 `-5° / 0° / 5°`，z-index 层叠
- 每张卡片含 icon + 分类名（6-8 字），纯装饰但传达分类信息
- 底部一行小标签：`Browser Automation · Research · Task Execution`

---

### Section 02 — 痛点共鸣区

**背景：白色**

4 条痛点，左对齐，每条前用 amber 色圆点：

```
● 每天打开五六个网页后台，反复点按钮、填表单、复制粘贴数据
● 调研一个话题要开几十个标签页，看完还要自己汇总整理，半天就没了
● ChatGPT 只能回复文字，真正需要操作的步骤一步也帮不了你
● 每次听说新 AI 工具，注册完折腾一圈发现还是不知道从哪开始

  不是你用错了 AI，是你还没用上会做事的 AI。
```

- 每条之间间距 16px
- 最后一句加粗，用稍微醒目的文字颜色（slate-800），不另设强调色

---

### Section 03 — 快速导航区

**背景：白色**

3 个横向大按钮卡片，hover 上浮 + 边框变蓝：

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  🧭              │  │  📚              │  │  ⚙️              │
│  自动操作网页     │  │  查资料写报告    │  │  写代码做任务    │
│                  │  │                  │  │                  │
│  填表·登录·采集   │  │  调研·竞品·汇总  │  │  修Bug·测试·PR  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

- 点击平滑滚动到 Section 04 对应分类区
- 卡片圆角 16px，内 padding 32px
- hover 时 `translateY(-4px)` + 边框从 slate-200 变 blue-400

---

### Section 04 — 工具分类区（核心）

**背景：slate-50 浅灰**

3 个 H2 分隔，每分类展示 2 个核心工具卡片，共 6 个。

**桌面端 2 列网格，平板/移动 1 列。**

每分类底部一个右对齐链接：
> 查看全部 4 个浏览器 Agent →

**工具卡片结构（6 元素）：**

```
┌─────────────────────────────────────────┐
│ [浏览器 Agent Badge 蓝色小标签]         │
│                                         │
│ OpenClaw                                │
│ AI 自动操作真实浏览器，完成多步网页任务  │
│                                         │
│ 适合：运营、增长、数据分析师             │
│                                         │
│ ✅ 自动填表与表单提交                    │
│ ✅ 跨页面导航与数据采集                  │
│ ✅ 多步 UI 流程自动执行                  │
│                                         │
│ ⚠️ 需要桌面浏览器环境                   │
│ ⚠️ 复杂工作流需首次配置                  │
│                                         │
│ → 了解更多                               │
└─────────────────────────────────────────┘
```

**展示的 6 个工具（按理解门槛从低到高排列）：**

| 分类 | 工具 1 | 工具 2 |
|------|--------|--------|
| 浏览器 Agent | OpenClaw | Hermes Agent |
| 调研 Agent | Perplexity Deep Research | OpenAI Deep Research |
| 编程 Agent | Devin | Cursor Agent |

**不展示的 4 个（放到分类页）：** Claude Computer Use、UI-TARS、Gemini Deep Research、GitHub Copilot Workspace

---

### Section 05 — 实际效果区

**背景：白色**

3 列 Case 卡片，每张含具体数据（amber 色高亮数字）：

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Case 01         │  │  Case 02         │  │  Case 03         │
│                  │  │                  │  │                  │
│ 运营人员使用      │  │ 投资人使用       │  │ 开发者使用       │
│ OpenClaw 自动    │  │ Perplexity 调研  │  │ Devin 修复开源   │
│ 采集 5 个竞品    │  │ AI Agent 赛道    │  │ 项目 Bug        │
│ 网站数据         │  │ 融资趋势         │  │                 │
│                  │  │                  │  │                 │
│ 从 40 分钟 →     │  │ 从 4 小时 →      │  │ 从 半天搭环境 → │
│ 10 分钟          │  │ 20 分钟          │  │ 只需审核结果    │
│                  │  │                  │  │                 │
│ 自动登录→翻页→   │  │ 自动搜索50+信源  │  │ 读代码→定位→    │
│ 采集→汇总表格    │  │ →对比→带引用报告 │  │ 修改→测试→PR    │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

- 数字用 amber-500 色 + 加粗
- 每张卡片底部若有对应工具链接，用文字链接

---

### Section 06 — 门槛说明区

**背景：slate-50**

3 列 icon + 标题 + 描述：

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  ✋ 要不要写代码  │  │  ⏱ 多久能上手    │  │ 📦 需要安装什么  │
│                  │  │                  │  │                 │
│ 浏览器 & 调研类  │  │ 调研类：5 分钟   │  │ 调研类：零安装   │
│ 不需要写代码     │  │ 浏览器类：15-30  │  │ 浏览器类：桌面   │
│ 编程类需开发基础 │  │ 分钟首次配置     │  │ 浏览器/Docker   │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

底部醒目提示框（amber-50 底 + amber-500 左边框 4px）：

> ⚠️ **诚实地说：** 复杂任务仍建议有人监督。一个 10 步任务每步成功率 95%，整体成功率约 60%。当前阶段 AI Agent 能大幅减少你的操作时间，但还做不到 100% 无人值守零失误。高价值任务建议人机协作。

---

### Section 07 — vs 传统 AI 对比区

**背景：白色**

居中双列表格 + 下方简短比喻说明：

```
┌──────────────────────────────────────────────┐
│              传统 AI          AI Agent       │
│ 工作方式    一问一答          目标→计划→      │
│                              执行→修正       │
│ 能不能做事  只能输出文字      操作网页/       │
│                              调用工具        │
│ 多步执行    ✗ 不支持          ✓ 自动拆解     │
│ 本质       超级文本生成器      替你干活的     │
│                              数字员工        │
│ 一句话     会说话的 AI        会做事的 AI    │
└──────────────────────────────────────────────┘
```

下方一段说明（默认展开，不像上一版建议折叠——架构精简后这段话不再构成负担）：

> AI Agent 不是一个新模型，而是在大语言模型之上加了一整套外部架构——规划模块、工具调用、记忆系统、执行环境。就像 CPU 被装进一台完整电脑，配上内存和硬盘，才能真正工作。同一个底座模型（GPT-4o、Claude、Qwen3）可以被不同团队封装成完全不同的 Agent 产品。

---

### Section 08 — 选择建议区

**背景：slate-50**

3 条 if/then 引导，每条末尾 CTA 带具体工具名：

```
不确定从哪开始？

→ 如果你想自动操作网页 → 从浏览器 Agent 开始 → 推荐先看 OpenClaw
→ 如果你需要查资料写报告 → 从调研 Agent 开始 → 推荐先看 Perplexity
→ 如果你想省掉重复编码时间 → 从编程 Agent 开始 → 推荐先看 Devin

或者查看完整对比指南 →
```

- 每条一行，箭头 icon 引导视觉
- 具体工具名用蓝色链接色
- 底部放一个次级 CTA 链到对比页

---

### Section 09 — 适合谁 / 不适合谁

**背景：白色**

双列对比布局：

```
┌─────────────────────────┐  ┌─────────────────────────┐
│  ✅ 适合你，如果你      │  │  ❌ 不太适合，如果你    │
│                         │  │                         │
│  ✓ 每天有重复网页操作   │  │  ✗ 只需一次性简单问答  │
│  ✓ 经常做信息调研整理   │  │  ✗ 偏好完全手动控制    │
│  ✓ 想用AI但不知从哪开始 │  │  ✗ 想学底层框架架构    │
│  ✓ 运营/分析/创业/轻开  │  │  ✗ 期望AI 100%不翻车   │
│     发                  │  │                         │
└─────────────────────────┘  └─────────────────────────┘
```

- 左列绿基调（emerald），右列灰基调（slate）
- 敢说"不适合"是信任放大器

---

### Section 10 — 趋势判断区

**背景：slate-50**

3 个信号卡片（浓缩版，每卡片 3 行以内） + 底部展开链接：

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ 01 搜索已变  │  │ 02 产品涌现  │  │ 03 巨头入场  │
│              │  │              │  │              │
│ 用户从问     │  │ Rising 词出  │  │ OpenAI/      │
│ "什么是" 转  │  │ 现具体产品名 │  │ Anthropic/   │
│ 向问 "怎么   │  │ (+2800%)    │  │ Google/      │
│ 用/哪个好"   │  │              │  │ Salesforce   │
│              │  │ 概念→工具→   │  │ 全部战略级   │
│              │  │ 产品迁移中   │  │ 投入         │
└──────────────┘  └──────────────┘  └──────────────┘

深度分析：为什么 2024 年才爆发、Google Trends 完整数据、风险与局限 →
```

- 卡片内数据用 amber 色高亮
- 底部链接指向独立趋势分析页

---

### Section 11 — 更新与信任区

**背景：白色**

4 项横向排列：

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ 每周更新     │  │ 实测非搬运   │  │ 非赞助列表   │  │ 过时即替换   │
│              │  │              │  │              │  │              │
│ 新工具第一   │  │ 每个工具真   │  │ 排序基于真   │  │ 不堆数量     │
│ 时间收录     │  │ 正跑过踩过坑 │  │ 实使用价值   │  │ 只留能用的   │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

---

### Section 12 — FAQ 区

**背景：slate-50**

手风琴折叠，5 个问题（精简自原来的 6 个），默认展开第一个：

```
▼ 这些 AI 工具安全吗？用的时候要注意什么？
  Agent 拥有操作浏览器的权限，建议敏感操作先人工确认，不在 Agent 环境输入
  核心密码，优先使用有安全审计的企业级产品。

▶ 需要写代码吗？
▶ 免费还是付费？
▶ 我该从哪个工具开始？
▶ 这个目录多久更新一次？
```

- 每个折叠项：标题 + `chevron-down` icon（展开时旋转 180°）
- 点击展开/收起，transition 300ms ease
- `aria-expanded` + `aria-controls` + `role="button"` + 键盘 Enter/Space 可操作
- 回答 2-4 行，不写长文

---

### Section 13 — 底部 CTA + 微转化桥

**背景：slate-900 深色满宽**

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                 让 AI 做那些重复劳动                     │
│          找到真正能干活的工具，从现在开始省时间           │
│                                                         │
│                 [找到你的 AI 工具]                       │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ 📋 免费指南  │  │ ⭐ 收藏本站  │  │ 📧 邮件订阅  │   │
│  │              │  │              │  │              │   │
│  │《10个你现在  │  │ 工具列表每周 │  │ 每周推送新   │   │
│  │ 就能用AI自动 │  │ 更新，按     │  │ 工具+使用    │   │
│  │ 完成的任务》 │  │ Ctrl+D /    │  │ 技巧         │   │
│  │              │  │ Cmd+D       │  │              │   │
│  │ [输入邮箱]   │  │              │  │ [输入邮箱]   │   │
│  │ [获取指南]   │  │              │  │ [订阅]       │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                         │
│  □ 我同意接收 DoWithAI 邮件，可随时退订。               │
│     查看 [隐私政策]                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**规格：**
- 深色背景 + 白色文字
- 三个微转化入口横向排列（移动端纵向堆叠）
- **邮箱输入框 + 按钮 + opt-in 复选框（默认不打勾！）**
- 用途说明文字 + 隐私政策链接在复选框旁
- "免费指南"是其中最突出的（给用户的价值最大）
- 收藏那个不需要邮箱，降低另一部分用户的行动摩擦

---

### Section 14 — 免责声明区

**背景：同 Section 13 深色背景底部**

小字（13px），浅色文字（slate-400），左对齐：

> **Disclaimer:** DoWithAI provides information about third-party AI tools for general informational purposes only. We do not endorse, guarantee, or assume responsibility for any third-party product, service, or website. Users should independently evaluate each tool before use, review its terms and privacy policy, and exercise caution when granting access to sensitive systems. AI agents operate with varying degrees of autonomy and may produce unintended results — human supervision is recommended for critical tasks. Tool features and pricing may change. Check the official website for the latest information. All product names, logos, and brands are property of their respective owners.

---

### Footer

**背景：slate-800**

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  DoWithAI                                               │
│  Find AI tools that actually get work done.             │
│                                                         │
│  [AI Agents]  [Browser Agents]  [Research Agents]        │
│  [Task Agents]  [Compare]  [About]                      │
│                                                         │
│  © 2026 DoWithAI. All rights reserved.                  │
│  [Privacy Policy] · [Terms of Use] · [Disclaimer]       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- 4 列布局：品牌 + 链接 + 法律 + 留白
- 所有法律链接可点击，指向独立 HTML 页面

---

## 七、内联 SVG Icon 清单

共约 20 个 icon，全部取自 Lucide 的 24px 线条风格，直接内联为 `<svg>`：

| 用途 | Icon | 数量 |
|------|------|------|
| 导航菜单（汉堡） | `menu` / `x` | 2 |
| Hero 装饰卡片 | `globe` / `search` / `code` | 3 |
| 快速导航按钮 | `monitor` / `book-open` / `terminal` | 3 |
| 工具卡片能力 | `check` | 若干（跟随每个能力项） |
| 工具卡片门槛 | `alert-triangle` | 若干 |
| Case 卡片 | `zap` | 1 |
| 门槛说明 | `hand` / `clock` / `package` | 3 |
| 适合/不适合 | `check-circle` / `x-circle` | 2 |
| 信任区 | `refresh-cw` / `eye` / `shield` / `trash-2` | 4 |
| FAQ | `chevron-down` | 1 |
| 留存桥 | `download` / `bookmark` / `mail` | 3 |
| Footer 社交占位 | `twitter` | 1 |

总计约 20 个独立 SVG，每个 200-500 字节，**总计 < 5KB 内联**。

---

## 八、交互行为规格

| 交互 | 触发 | 行为 | JS 实现 |
|------|------|------|---------|
| FAQ 折叠 | 点击标题 | 展开/收起，chevron 旋转 180° | `toggle` class + `aria-expanded` |
| 快速导航 | 点击标签按钮 | `scrollIntoView({ behavior: 'smooth' })` 到对应分类 | `element.scrollIntoView()` |
| 导航链接 | 点击导航项 | 同上平滑滚动 | 同上 |
| 卡片 hover | `:hover` | `translateY(-4px)` + 阴影加深 | CSS `transition` |
| 按钮 hover | `:hover` | 色值过渡 200ms | CSS `transition` |
| 导航阴影 | `scroll` 事件 | 滚动 > 100px → 加阴影 | `scroll` listener + class toggle |
| 邮箱验证 | 表单提交 | 基本的 email regex 校验 | `preventDefault` + regex |
| 汉堡菜单 | 点击 | 展开/收起全屏导航 | class toggle |

**不做的交互：**
- 没有轮播/自动播放
- 没有滚动动画库（AOS/ScrollReveal 等）——减少 JS 依赖
- 没有模态弹窗

---

## 九、SEO 与结构化数据

### Meta 标签

```html
<title>DoWithAI — Find AI Tools That Actually Get Work Done</title>
<meta name="description" content="Discover AI agents and tools that don't just chat — they act. Automate browser tasks, research faster, and execute real workflows. Hand-picked tools you can use today.">
<link rel="canonical" href="https://dowithai.com/">
<meta property="og:title" content="DoWithAI — Find AI Tools That Get Real Work Done">
<meta property="og:description" content="Discover AI agents that automate browser tasks, research, and coding workflows.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://dowithai.com/">
<meta name="twitter:card" content="summary_large_image">
```

### JSON-LD 结构化数据

3 个 schema 块内联在 `<head>` 中：

1. **WebSite** — 站点类型、名称、URL、描述
2. **FAQPage** — FAQ 区块的 5 个问答对，用于 Google 富文本搜索结果
3. **BreadcrumbList** — 面包屑导航

### H1-H3 层级

```
H1 × 1  — 让 AI 替你干活，不只是聊天
H2 × 12 — 每个 Section 标题
H3 × 6  — 6 个工具卡片标题
```

---

## 十、Accessibility 清单

| # | 要求 | 实现 |
|---|------|------|
| 1 | 所有交互元素可键盘操作 | FAQ `Enter/Space`，导航 `Tab`，表单 `Enter` |
| 2 | Focus 可见 | `focus-visible:ring-2 ring-blue-500` 全局样式 |
| 3 | FAQ 状态可被屏幕阅读器读取 | `aria-expanded` + `aria-controls` + `role="button"` |
| 4 | 对比表语义正确 | `<th scope="row">` / `<th scope="col">` |
| 5 | 图片有 alt（包括 SVG icon） | 所有 `<svg>` 带 `aria-label` 或相邻文字 |
| 6 | 色彩对比度 ≥ WCAG AA (4.5:1) | 文字/背景组合全部过 contrast 检查 |
| 7 | 减少动画偏好 | `@media (prefers-reduced-motion: reduce)` 关闭所有 transition |
| 8 | 表单有 label | 邮箱输入框有关联 `<label>` |
| 9 | skip-to-content 链接 | 页面顶部隐藏链接，`Tab` 时显示，跳到 `#main-content` |

---

## 十一、响应式断点

| 断点 | 宽度 | 布局变化 |
|------|------|----------|
| Desktop | ≥ 1280px | 容器 1200px，3 列/2 列，完整排版 |
| Small Desktop | 1024-1279px | 容器 960px，部分 3 列变 2 列 |
| Tablet | 768-1023px | 容器 720px，全 1 列，导航缩为汉堡菜单 |
| Mobile | < 768px | 容器满宽 - 32px padding，H1 36px，H2 28px |

---

## 十二、构建流程

```bash
# 1. 初始化（仅一次）
npm init -y
npm install -D @tailwindcss/cli

# 2. 创建 input.css
cat > input.css << 'EOF'
@import "tailwindcss";
@theme {
  --font-sans: 'Inter', sans-serif;
}
EOF

# 3. 构建
npx @tailwindcss/cli -i input.css -o css/output.css --minify

# 4. 字体下载（手动从 Google Fonts 下载 Inter woff2）
# https://fonts.google.com/specimen/Inter
# 下载 4 个字重：400 / 500 / 600 / 700
# 子集：Latin
# 放入 fonts/ 目录

# 5. 部署
# 整个目录推到 Cloudflare Pages / Netlify / Vercel 即可
```

---

## 十三、Privacy Policy 页面规格（独立文件）

**privacy-policy.html**，完整英文文案，纳入 HTML 生成范围。

> 数据控制者信息已填入：Zhang Xun，Sole Proprietor，China。

页面布局与 landingpage.html 保持一致的视觉风格（复用同一套 Tailwind 样式 + Inter 字体），顶部导航简化为「← Back to DoWithAI」链接，正文使用 720px 最大宽度容器，排版清晰。

### 完整英文文案

```
# Privacy Policy

**Last updated: May 2026**

## 1. Who We Are

This website (dowithai.com, the "Site") is operated by Zhang Xun, 
a sole proprietor based in China, trading as DoWithAI.

In this policy, "we", "us", and "our" refer to Zhang Xun (DoWithAI).

For the purposes of the GDPR (Regulation (EU) 2016/679), we are the "data controller" 
of the personal data described in this policy. For the CCPA (California Consumer 
Privacy Act), we are the "business" that collects your information.

**Contact for privacy matters:**
- Email: **zhanxun6608@gmail.com**

## 2. What Information We Collect

**Email address — and that is the only personal data we collect.**

We collect your email address only when you voluntarily provide it, specifically when you:

- Request our free guide ("10 Tasks You Can Automate with AI Agents Right Now")
- Subscribe to our newsletter for weekly tool updates

We do not use tracking cookies, analytics scripts, fingerprinting, or any other form 
of passive data collection. We do not infer, derive, or purchase additional data about 
you. If you do not provide your email address, we hold no personal data about you.

## 3. How We Use Your Email (Purpose and Legal Basis)

We use your email address strictly for the purpose you consented to:

| You signed up for | We send | Legal basis (GDPR) |
|-------------------|---------|---------------------|
| Free guide | One email containing the guide download link | Consent — Art. 6(1)(a) |
| Newsletter | Weekly emails with new AI tools and usage tips | Consent — Art. 6(1)(a) |

We process your email address under GDPR Art. 6(1)(a) (consent). You may withdraw 
consent at any time (see Section 6). Withdrawal does not affect the lawfulness of 
processing carried out before you withdrew consent.

## 4. How We Store Your Data and How Long We Keep It

**Storage location and processor:** Your email address is stored on servers operated 
by ConvertKit LLC (500 W. 5th Street, Suite 300, Austin, TX 78701, United States), 
our email delivery provider. ConvertKit is SOC 2 Type II certified and participates 
in the EU-US Data Privacy Framework (EU-US DPF), the UK Extension to the EU-US DPF, 
and the Swiss-US DPF. ConvertKit acts as our data processor under a data processing 
agreement that complies with GDPR Art. 28.

We do not store your email address on servers we directly control, except for backup 
copies held temporarily by our hosting provider for disaster-recovery purposes (these 
copies are deleted within standard rotation cycles of no more than 30 days).

**Data retention:**
- **Free guide requests:** Your email is deleted from ConvertKit within 30 days of 
  the guide delivery email being sent, unless you separately subscribe to the newsletter.
- **Newsletter subscribers:** Your email is retained until you unsubscribe or until 
  the newsletter is discontinued. If you do not open any newsletter email for 24 
  consecutive months, we will send a re-consent email. If you do not respond within 
  30 days, your email is permanently deleted.
- You may request immediate deletion at any time (see Section 6).

## 5. What We Do NOT Do

We do not:
- Sell your email address to any third party
- Rent, trade, or disclose your data to advertisers, data brokers, or business partners
- Use your email for any purpose other than the one you consented to
- Cross-reference your email with external databases or data brokers
- Make automated decisions about you based on your data (no profiling, no scoring)
- Share your data with any government agency unless required by a valid legal order

## 6. Your Rights Under GDPR, CCPA, and UK DPA

Depending on where you live, you have the following rights. We extend these rights to 
all users regardless of location, as a matter of policy:

| Right | What it means | Legal source |
|-------|---------------|--------------|
| Access | Request a copy of the personal data we hold about you | GDPR Art.15 / CCPA §1798.110 |
| Rectification | Ask us to correct inaccurate or incomplete data | GDPR Art.16 |
| Erasure | Request deletion of your data ("right to be forgotten") | GDPR Art.17 / CCPA §1798.105 |
| Portability | Receive your data in a structured, machine-readable format | GDPR Art.20 |
| Restrict processing | Limit how we use your data | GDPR Art.18 |
| Withdraw consent | Unsubscribe at any time via the link in every email, or by emailing us | GDPR Art.7(3) |
| Object to processing | Object where processing is based on legitimate interest | GDPR Art.21 |
| Non-discrimination | Exercise your rights without being penalized | CCPA §1798.125 |
| Lodge a complaint | File a complaint with your local data protection authority | GDPR Art.77 |

To exercise any of these rights, email **zhanxun6608@gmail.com**. We will:
- Acknowledge your request within 72 hours
- Respond substantively within 30 calendar days (as required by GDPR Art.12)
- Not charge a fee, unless the request is manifestly unfounded or excessive

**Unsubscribing:** Every email we send includes a one-click unsubscribe link in the 
footer. Clicking it instantly removes you from the relevant list. You can also email 
zhanxun6608@gmail.com with "unsubscribe" in the subject line, and we will process it 
within 48 hours.

## 7. Cookies and Tracking Technologies

**We do not use cookies.** The Site is built as a static HTML page. We do not set:
- Analytics or performance cookies
- Advertising or targeting cookies
- Session or functional cookies
- Any other tracking mechanism

If this changes in the future, we will update this policy, add the relevant cookie 
details, and — where required by law — display a consent banner before non-essential 
cookies are set.

## 8. Data Breach Notification

In the event of a personal data breach that is likely to result in a risk to your 
rights and freedoms, we will:
- Notify the relevant supervisory authority within 72 hours of becoming aware of the 
  breach (per GDPR Art. 33)
- Notify affected users without undue delay if the breach is likely to result in a 
  high risk to their rights and freedoms (per GDPR Art. 34)
- Describe the nature of the breach, the likely consequences, and the measures we 
  have taken or propose to take to address it

Given that we hold only email addresses and no sensitive personal data, the risk 
profile is inherently limited.

## 9. Third-Party Links

The Site links to third-party AI tools and services (such as OpenClaw, Perplexity, 
Devin, Cursor, and others). These services are operated independently and have their 
own privacy policies and terms of service. Our linking to them does not imply 
endorsement, and we are not responsible for their data handling practices. Before 
using any linked service, review its privacy policy.

## 10. Children's Privacy

The Site is not directed at individuals under the age of 16. We do not knowingly 
collect personal data from anyone under 16. If you are a parent or guardian and 
believe your child has provided us with personal data, contact us immediately at 
zhanxun6608@gmail.com. We will delete the data and confirm deletion to you.

(The age threshold may vary by EU member state — some countries set it at 13. We 
apply the higher threshold of 16 as a conservative measure.)

## 11. International Data Transfers

If you are in the EU/EEA, UK, or Switzerland, your email address is transferred to 
and processed in the United States, where ConvertKit's servers are located.

This transfer is safeguarded by one or more of the following mechanisms (depending on 
your location):
- **EU-US Data Privacy Framework** (EU-US DPF) — ConvertKit is a certified participant
- **UK Extension to the EU-US DPF** — for UK residents
- **Swiss-US Data Privacy Framework** — for Swiss residents
- **Standard Contractual Clauses (SCCs)** — as adopted by the European Commission 
  (2021/914/EU), incorporated into the data processing agreement with ConvertKit

Where SCCs are relied upon, we have conducted a transfer impact assessment and 
concluded that, given the limited nature of the data (email address only) and 
ConvertKit's security certifications, the transfer provides an essentially equivalent 
level of protection.

## 12. Changes to This Policy

We will update this policy if our data practices change. The "Last updated" date at 
the top of this page will be revised accordingly.

For material changes, we will:
- Notify current newsletter subscribers by email at least 14 days before the change 
  takes effect
- State clearly what changed and why
- Remind subscribers of their right to unsubscribe

If you do not agree with the updated policy, use the unsubscribe link in any email 
to have your data deleted. Continued subscription after the effective date of a 
material change will be taken as acceptance of the updated policy.

## 13. Contact and Complaints

**Email:** zhanxun6608@gmail.com

We will respond to all privacy inquiries. We prefer to resolve concerns directly 
with users before any formal escalation.

**Supervisory authority:** If you believe our processing of your personal data 
infringes applicable data protection law, you have the right to lodge a complaint 
with the data protection supervisory authority in your EU/EEA member state, the 
UK Information Commissioner's Office (ICO), or the relevant authority in your 
jurisdiction.

A list of EU data protection authorities is available at:
https://edpb.europa.eu/about-edpb/about-edpb/members_en

We would, however, appreciate the opportunity to address your concern first — 
please email us before escalating.
```

### 对应的 HTML 结构

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy — DoWithAI</title>
  <meta name="description" content="DoWithAI Privacy Policy — how we handle your data.">
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="css/output.css">
  <!-- 复用同一套 Inter 本地字体 -->
</head>
<body>
  <nav>← Back to DoWithAI (链接回 landingpage.html)</nav>
  <main class="max-w-[720px] mx-auto px-6 py-16">
    <!-- 按上方文案逐段排版 -->
  </main>
  <footer>© 2026 DoWithAI · same footer as landingpage</footer>
</body>
</html>
```

**注意：** `meta robots` 设为 `noindex` — 法律页面不应被搜索引擎索引，避免被误判为 doorway page。

---

## 十四、Terms of Use 页面规格（独立文件）

**terms-of-use.html**，完整英文文案，纳入 HTML 生成范围。

与 Privacy Policy 页面保持相同的视觉结构和布局，`meta robots` 同样设为 `noindex`。

### 完整英文文案

```
# Terms of Use

**Last updated: May 2026**

## 1. Acceptance of Terms

By accessing or using the DoWithAI website (dowithai.com, the "Site"), you agree to 
be bound by these Terms of Use. If you do not agree to these Terms, you may not 
access or use the Site.

These Terms form a binding legal agreement between you and Zhang Xun, 
a sole proprietor trading as DoWithAI ("DoWithAI," "we," "us," or "our"), 
the operator of the Site, based in China.

## 2. About DoWithAI

DoWithAI is an independent tool discovery platform. We research, test, and organize 
information about third-party AI agents and tools so that users can evaluate options 
quickly without spending weeks searching. We do not own, operate, resell, or control 
any of the tools we feature.

## 3. Informational Purpose Only — Not Professional Advice

All content on the Site is provided for general informational purposes only.

- **Not professional advice:** Nothing on the Site constitutes professional, legal, 
  financial, investment, medical, or technical advice.
- **No advisor-client relationship:** Your use of the Site does not create any 
  professional or fiduciary relationship with DoWithAI.
- **Do your own research:** Before acting on any information found on the Site, 
  consult a qualified professional who understands your specific circumstances.
- **Tool information may change:** Tool features, pricing, and availability are 
  subject to change by the tool provider. We aim for weekly accuracy reviews but 
  do not guarantee real-time accuracy.

## 4. Third-Party Tools — No Warranty

We feature third-party AI agents and tools (including but not limited to OpenClaw, 
Perplexity, Devin, Cursor, Hermes Agent, OpenAI Deep Research, and others). We are 
independent from these third parties. We do not:

- Own, operate, or control any third-party tool
- Resell, license, or distribute any third-party tool
- Receive compensation for featuring tools (as of the date of these Terms)
- Assume responsibility for a tool's performance, output, or availability

**THE SITE AND ALL THIRD-PARTY TOOLS FEATURED ON IT ARE PROVIDED ON AN "AS IS" AND 
"AS AVAILABLE" BASIS. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM 
ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.**

We do not warrant that:
- Any tool's description is current, complete, or error-free
- Any tool will perform as described for your specific use case
- Any tool's output will be accurate, safe, or free of errors
- The Site will be available without interruption

AI agents are non-deterministic by nature: they may produce different results on 
different runs, including unintended, incorrect, or harmful outputs. You should 
independently evaluate any tool before using it for critical tasks involving 
sensitive data, financial transactions, or production systems.

## 5. Your Responsibilities When Using Third-Party Tools

When you choose to use any AI agent or tool featured on the Site:

- Read the tool's own Terms of Service and Privacy Policy before use — they are 
  separate legal agreements between you and the tool provider
- Do not input sensitive personal credentials, passwords, API keys, payment 
  information, or other confidential data into tools you have not independently 
  verified and trust
- Supervise AI agents during operations that could have material consequences 
  (financial, reputational, operational)
- Understand the permission boundaries of each tool — what it can access, modify, 
  or delete on your systems
- Comply with the terms of service of any website or platform the AI agent 
  interacts with on your behalf — using an AI agent does not exempt you from 
  those terms

## 6. Intellectual Property Rights

**Our content:** All original text, graphics, site structure, tool descriptions, 
comparisons, and the compilation of information on the Site (collectively, the 
"Content") are owned by DoWithAI or its licensors, and are protected by copyright 
and other intellectual property laws.

You may:
- View the Content in your browser for personal, non-commercial use
- Quote short excerpts (up to 150 words) with clear attribution and a hyperlink 
  to the original page on dowithai.com

You may not:
- Reproduce, redistribute, republish, or create derivative works from the Content 
  without our prior written permission
- Scrape, mine, or otherwise extract Content by automated means for republication 
  or competitive purposes
- Use the Content to train machine learning models without our express consent

**Third-party trademarks:** All product names, logos, brands, and trademarks 
mentioned on the Site are the property of their respective owners. Their mention 
on the Site does not imply endorsement of DoWithAI, nor does DoWithAI's featuring 
of a tool imply endorsement by the trademark holder. Use of third-party marks is 
for identification and descriptive purposes only and falls within nominative fair 
use principles.

## 7. Digital Millennium Copyright Act (DMCA) Notice

We respect the intellectual property rights of others. If you believe any Content 
on the Site infringes your copyright, send a DMCA takedown notice to:

**Email:** zhanxun6608@gmail.com

Your notice must include (per 17 U.S.C. § 512(c)(3)):
1. Your physical or electronic signature
2. Identification of the copyrighted work you claim has been infringed
3. Identification of the allegedly infringing material and its location on the Site
4. Your contact information (address, phone, email)
5. A statement that you have a good-faith belief the use is not authorized by the 
   copyright owner, its agent, or the law
6. A statement, under penalty of perjury, that the information in the notice is 
   accurate and that you are the copyright owner or authorized to act on their behalf

We will respond to valid DMCA notices in accordance with applicable law, including 
removal of the identified material and notification of the party who posted it.

## 8. Limitation of Liability

TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, AND SUBJECT TO THE EXCEPTIONS 
NOTED BELOW:

(a) DoWithAI, its operator, and its affiliates shall not be liable for any direct, 
indirect, incidental, special, consequential, exemplary, or punitive damages 
(including but not limited to loss of profits, loss of data, loss of use, business 
interruption, reputational harm, cost of procurement of substitute services, or 
security breaches) arising out of or in any way connected with:
- Your use of, or inability to use, the Site
- Your use of, or reliance on, any third-party AI tool or service featured on the Site
- Any action, omission, or output of any AI agent or tool listed on the Site
- Any unauthorized access to or alteration of your data by any third-party tool
- Errors, omissions, or inaccuracies in the Content on the Site

(b) These limitations apply regardless of the legal theory on which the claim is 
based (whether contract, tort — including negligence, strict liability, or otherwise), 
even if DoWithAI has been advised of the possibility of such damages, and even if a 
remedy set forth herein is found to have failed its essential purpose.

**Exceptions for jurisdictions that restrict liability limitations:**
Some jurisdictions (including certain EU/EEA member states and the United Kingdom) 
do not allow the exclusion or limitation of certain warranties, or the exclusion or 
limitation of liability for death or personal injury resulting from negligence, 
fraudulent misrepresentation, or willful misconduct. In those jurisdictions:

- The above disclaimers and limitations apply only to the extent permitted by law
- Liability for death or personal injury arising from our negligence, for fraud or 
  fraudulent misrepresentation, and for any other liability that cannot be excluded 
  or limited by applicable law is not excluded or limited by these Terms
- Where liability cannot be excluded but can be limited, our aggregate liability is 
  limited to the maximum extent permitted, and in any event shall not exceed the 
  greater of (i) £100 / €100 / $100 USD, or (ii) the amount you paid to DoWithAI 
  (which is zero, as the Site is free to use)

## 9. Indemnification

You agree to indemnify, defend, and hold harmless DoWithAI, its operator, and its 
affiliates from and against any and all claims, liabilities, damages, losses, costs, 
and expenses (including reasonable legal fees) arising out of or in connection with:
- Your use of the Site
- Your violation of these Terms
- Your use of any third-party AI tool or service featured on the Site
- Your violation of any third-party's rights, including intellectual property rights

We reserve the right, at our own expense, to assume the exclusive defense and 
control of any matter otherwise subject to indemnification by you. You agree to 
cooperate with our defense of such claims.

## 10. External Links and Third-Party Content

The Site contains links to external websites, tools, and services operated by third 
parties. These links are provided for your convenience and informational purposes 
only. A link does not imply:
- Endorsement of the linked website or service by DoWithAI
- Any commercial relationship with the linked third party
- Verification of the linked site's accuracy, safety, or legality

We are not responsible for the content, availability, privacy practices, or terms 
of any linked third-party site. You access linked sites at your own risk.

## 11. Modifications to These Terms

We may modify these Terms from time to time. When we do:

- The "Last updated" date at the top of this page will be revised
- For material modifications, we will post a notice on the Site (e.g., a banner or 
  update notice on the landing page) for at least 14 days before the changes take 
  effect
- Your continued use of the Site after the effective date of modified Terms constitutes 
  your acceptance of the modified Terms
- If you do not agree with the modified Terms, your sole remedy is to discontinue 
  use of the Site

## 12. Termination

We reserve the right to restrict or terminate your access to the Site at our sole 
discretion, without notice, for conduct that we believe violates these Terms or is 
harmful to other users, us, or third parties, or for any other reason.

Sections 3 (Not Professional Advice), 4 (No Warranty), 6 (Intellectual Property), 
7 (DMCA), 8 (Limitation of Liability), 9 (Indemnification), 13 (Governing Law and 
Dispute Resolution), and 14 (General Provisions) survive any termination of these 
Terms or your access to the Site.

## 13. Governing Law and Dispute Resolution

**Governing law:** These Terms are governed by and construed in accordance with the 
laws of China, without regard to its conflict of law principles. You agree 
to submit to the jurisdiction of the courts located in China for the 
resolution of any disputes arising out of or relating to these Terms or the Site.

Note: If you are a consumer residing in the EU/EEA, UK, Switzerland, or another 
jurisdiction with mandatory consumer protection laws, you may also benefit from the 
protections afforded by the laws of your country of residence, and may bring claims 
in your local courts.

**Pre-litigation resolution:** Before filing any formal legal action, we strongly 
encourage you to contact us at **zhanxun6608@gmail.com** to attempt to resolve the dispute 
informally. We will respond within 30 days and will work in good faith to reach a 
mutually satisfactory resolution.

**Arbitration opt-out:** Nothing in this section prevents either party from seeking 
injunctive or other equitable relief from a court of competent jurisdiction to prevent 
imminent and irreparable harm. You retain the right to bring claims in small claims 
court in your local jurisdiction where applicable.

## 14. General Provisions

**Severability:** If any provision of these Terms is found by a court of competent 
jurisdiction to be invalid, illegal, or unenforceable, that provision shall be 
enforced to the maximum extent permissible so as to reflect the original intent of 
the parties, and the remaining provisions of these Terms shall remain in full force 
and effect. The invalidity of any provision shall not affect the validity of the 
remaining Terms.

**Entire agreement:** These Terms, together with our Privacy Policy, constitute the 
entire agreement between you and DoWithAI concerning your use of the Site, and 
supersede all prior or contemporaneous understandings, agreements, representations, 
and warranties, whether written or oral, relating to the subject matter.

**No waiver:** Our failure to enforce any right or provision of these Terms shall 
not be considered a waiver of that right or provision. A waiver of any breach of 
these Terms shall not be deemed a waiver of any subsequent breach. Any waiver 
must be in writing and signed by an authorized representative of DoWithAI.

**Assignment:** You may not assign or transfer any of your rights or obligations 
under these Terms without our prior written consent. We may assign or transfer 
these Terms and our rights and obligations hereunder at our discretion. These Terms 
will be binding upon and inure to the benefit of the parties' successors and 
permitted assigns.

**Force majeure:** We shall not be liable for any delay or failure to perform 
resulting from causes beyond our reasonable control, including but not limited to 
acts of God, natural disasters, war, terrorism, civil unrest, government orders, 
labor disputes, internet infrastructure failures, or third-party service outages.

**Headings:** Section headings in these Terms are for convenience only and have 
no legal or contractual effect.

## 15. Contact

**Email:** zhanxun6608@gmail.com

We welcome questions about these Terms. If you believe any information on the Site 
is inaccurate, if a tool we featured caused problems, or if you have any other 
concern — please contact us. We respond to all inquiries and take user feedback 
seriously in maintaining and improving the Site.
```

### 对应的 HTML 结构

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Use — DoWithAI</title>
  <meta name="description" content="DoWithAI Terms of Use.">
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="css/output.css">
</head>
<body>
  <nav>← Back to DoWithAI</nav>
  <main class="max-w-[720px] mx-auto px-6 py-16">
    <!-- 按上方文案逐段排版 -->
  </main>
  <footer>© 2026 DoWithAI · same footer</footer>
</body>
</html>
```

---

## 十五、不做的事（MVP 范围外）

| 不做 | 原因 |
|------|------|
| 分类页 / 工具详情页 | MVP 先把落地页跑通 |
| Google Analytics | 避免 cookie consent 复杂度，后续可用 Plausible |
| Affiliate 链接 | 先不做商业化，等流量验证后再接入 |
| 暗色模式 | MVP 不需要，等用户反馈 |
| 动画库（AOS 等） | 增加 JS 体积，纯 CSS transition 足够 |
| CMS / 后端 | 纯静态，改内容直接改 HTML |
| 多语言 | 先英文站 |
| 自定义域名 | 部署后再说 |

---

## 十六、上线 CheckList

| # | 检查项 | 角色 |
|---|--------|------|
| 1 | Tailwind CLI 构建通过，output.css 正常加载 | 架构师 |
| 2 | Inter 字体本地托管，preload + display=swap 生效 | 架构师 |
| 3 | 所有内联 SVG 正常渲染 | 设计师 |
| 4 | 6 个工具卡片信息准确 | 用户 |
| 5 | 3 张 Hero 装饰卡片视觉效果达标 | 设计师 |
| 6 | 所有 CTA 链接目标正确（或占位 #） | 运营 |
| 7 | FAQ 折叠/展开正常，aria 属性正确 | 架构师 |
| 8 | 邮箱表单验证可用，opt-in 复选框默认不打勾 | 隐私法务 |
| 9 | Footer 法律链接可点击，Privacy Policy / Terms 页面可访问 | 隐私法务 |
| 10 | 免责声明在页面底部可见 | 隐私法务 |
| 11 | 移动端汉堡菜单正常 | 设计师 |
| 12 | 所有断点下布局无破损 | 设计师 |
| 13 | 色彩对比度通过 WCAG AA | 架构师 |
| 14 | 键盘 Tab 可遍历所有交互元素 | 架构师 |
| 15 | JSON-LD 结构化数据语法正确 | 架构师 |
| 16 | `<title>` + `<meta description>` + OG 标签齐全 | 运营 |

---

**方案审批通过后，下一步直接按此规格生成完整 HTML 文件。**
