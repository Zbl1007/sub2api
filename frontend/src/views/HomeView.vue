<template>
  <!-- Custom Home Content: Full Page Mode -->
  <div v-if="homeContent" class="min-h-screen">
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <!-- HTML mode - SECURITY: homeContent is admin-only setting, XSS risk is acceptable -->
    <div v-else v-html="homeContent"></div>
  </div>

  <!-- Default Home Page -->
  <div v-else class="codex-station">
    <div class="station-notice">
      <span class="station-status-dot" aria-hidden="true"></span>
      <span>{{ t('home.station.notice') }}</span>
    </div>

    <header class="station-header">
      <router-link to="/" class="station-brand" :aria-label="t('home.station.product')">
        <span class="station-logo">
          <img v-if="siteLogo" :src="siteLogo" alt="Logo" />
          <span v-else>S2</span>
        </span>
        <span class="station-brand-copy">
          <strong>{{ t('home.station.product') }}</strong>
          <small>{{ t('home.station.brandLine') }}</small>
        </span>
      </router-link>

      <nav class="station-nav" aria-label="Homepage sections">
        <a v-for="item in stationNav" :key="item.href" :href="item.href">
          {{ item.label }}
        </a>
      </nav>

      <div class="station-actions">
        <LocaleSwitcher />

        <a
          v-if="docUrl"
          :href="docUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="station-ghost-action station-doc-action"
        >
          {{ t('home.station.actions.docs') }}
        </a>

        <button
          type="button"
          class="station-ghost-action station-theme-action"
          @click="toggleTheme"
          :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
        >
          {{ isDark ? t('home.station.actions.light') : t('home.station.actions.dark') }}
        </button>

        <router-link
          :to="isAuthenticated ? dashboardPath : '/login'"
          class="station-login"
        >
          {{ isAuthenticated ? t('home.dashboard') : t('home.login') }}
        </router-link>
      </div>
    </header>

    <main>
      <section class="station-hero" :aria-label="t('home.station.product')">
        <div class="station-hero-copy">
          <p class="station-pill">
            <span class="station-status-dot" aria-hidden="true"></span>
            {{ t('home.station.hero.status') }}
          </p>
          <p class="station-eyebrow">{{ t('home.station.hero.eyebrow') }}</p>
          <h1>
            <span>{{ t('home.station.hero.titleA') }}</span>
            <span>{{ t('home.station.hero.titleB') }}</span>
          </h1>
          <p class="station-lede">{{ t('home.station.hero.description') }}</p>

          <div class="station-hero-actions">
            <router-link
              :to="isAuthenticated ? dashboardPath : '/login'"
              class="station-primary"
            >
              {{ isAuthenticated ? t('home.goToDashboard') : t('home.station.hero.primaryCta') }}
            </router-link>

            <a
              :href="docUrl || githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="station-secondary"
            >
              {{ t('home.station.hero.secondaryCta') }}
            </a>
          </div>
        </div>

        <div class="station-model-strip" aria-label="Supported routes">
          <div v-for="model in stationModels" :key="model.name" class="station-model">
            <span>{{ model.state }}</span>
            <strong>{{ model.name }}</strong>
            <small>{{ model.desc }}</small>
          </div>
        </div>

        <div class="station-console" aria-label="Route console preview">
          <div class="console-topbar">
            <span>{{ t('home.station.hero.consoleTitle') }}</span>
            <strong>{{ t('home.station.hero.consoleBadge') }}</strong>
          </div>
          <div class="console-body">
            <div class="console-code" aria-hidden="true">
              <span class="code-muted">POST</span>
              <span>/v1/chat/completions</span>
              <span class="code-muted">Authorization</span>
              <span>Bearer sk-codex-gateway</span>
              <span class="code-muted">model</span>
              <span>codex-best</span>
              <span class="code-muted">route</span>
              <span>health + quota + session</span>
            </div>
            <div class="console-flow">
              <div v-for="step in stationConsoleSteps" :key="step.title" class="flow-step">
                <span>{{ step.code }}</span>
                <strong>{{ step.title }}</strong>
                <small>{{ step.desc }}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" class="station-proof">
        <div class="proof-card proof-pricing">
          <span class="proof-index">01</span>
          <h2>{{ t('home.station.pricing.title') }}</h2>
          <p>{{ t('home.station.pricing.description') }}</p>
          <dl>
            <div v-for="row in stationPricingRows" :key="row.label">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>
        </div>

        <div class="proof-card proof-support">
          <span class="proof-index">02</span>
          <h2>{{ t('home.station.support.title') }}</h2>
          <p>{{ t('home.station.support.description') }}</p>
          <div class="support-box">
            <span>{{ t('home.station.support.label') }}</span>
            <strong>{{ t('home.station.support.value') }}</strong>
          </div>
        </div>

        <div class="proof-card proof-spec">
          <span class="proof-index">03</span>
          <h2>{{ t('home.station.spec.title') }}</h2>
          <div class="spec-grid">
            <div v-for="item in stationSpecItems" :key="item.title">
              <strong>{{ item.title }}</strong>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" class="station-section station-flow-section">
        <div class="station-section-heading">
          <p>{{ t('home.station.flow.kicker') }}</p>
          <h2>{{ t('home.station.flow.title') }}</h2>
          <span>{{ t('home.station.flow.description') }}</span>
        </div>

        <div class="station-flow">
          <article
            v-for="item in stationFlowItems"
            :key="item.number"
            class="station-flow-row"
          >
            <span class="flow-number">{{ item.number }}</span>
            <div class="flow-copy">
              <strong>{{ item.title }}</strong>
              <p>{{ item.desc }}</p>
              <div class="flow-tags">
                <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
            <div class="flow-signal" aria-hidden="true">
              <span></span>
            </div>
          </article>
        </div>
      </section>

      <section id="workflows" class="station-section station-workflows">
        <div class="station-section-heading">
          <p>{{ t('home.station.workflows.kicker') }}</p>
          <h2>{{ t('home.station.workflows.title') }}</h2>
          <span>{{ t('home.station.workflows.description') }}</span>
        </div>

        <div class="workflow-grid">
          <article v-for="item in stationWorkflowItems" :key="item.title" class="workflow-card">
            <span>{{ item.code }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.desc }}</p>
          </article>
        </div>
      </section>

      <section id="faq" class="station-section station-faq-section">
        <div class="station-section-heading">
          <p>{{ t('home.station.faq.kicker') }}</p>
          <h2>{{ t('home.station.faq.title') }}</h2>
          <span>{{ t('home.station.faq.description') }}</span>
        </div>

        <div class="faq-list">
          <details v-for="item in stationFaqItems" :key="item.question">
            <summary>
              <span>{{ item.number }}</span>
              <strong>{{ item.question }}</strong>
            </summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </section>

      <section class="station-final-cta">
        <p>{{ t('home.station.cta.kicker') }}</p>
        <h2>{{ t('home.station.cta.title') }}</h2>
        <span>{{ t('home.station.cta.description') }}</span>
        <router-link
          :to="isAuthenticated ? dashboardPath : '/login'"
          class="station-primary"
        >
          {{ isAuthenticated ? t('home.goToDashboard') : t('home.station.cta.button') }}
        </router-link>
      </section>
    </main>

    <footer class="station-footer">
      <router-link to="/" class="station-footer-brand" :aria-label="t('home.station.product')">
        <span class="station-logo station-logo-small">
          <img v-if="siteLogo" :src="siteLogo" alt="Logo" />
          <span v-else>S2</span>
        </span>
        <strong>{{ t('home.station.product') }}</strong>
      </router-link>

      <div class="station-footer-copy">
        <span>&copy; {{ currentYear }} {{ t('home.station.product') }}. {{ t('home.footer.allRightsReserved') }}</span>
        <a :href="githubUrl" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'

const { t } = useI18n()

const authStore = useAuthStore()
const appStore = useAppStore()

const siteLogo = computed(() => appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '')
const docUrl = computed(() => appStore.cachedPublicSettings?.doc_url || appStore.docUrl || '')
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')

const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

const isDark = ref(document.documentElement.classList.contains('dark'))

const githubUrl = 'https://github.com/Wei-Shaw/sub2api'

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')
const currentYear = computed(() => new Date().getFullYear())

const stationNav = computed(() => [
  { href: '#pricing', label: t('home.station.nav.pricing') },
  { href: '#features', label: t('home.station.nav.features') },
  { href: '#workflows', label: t('home.station.nav.workflows') },
  { href: '#faq', label: t('home.station.nav.faq') }
])

const stationModels = computed(() => [
  { name: 'Codex', desc: t('home.station.models.codex'), state: t('home.station.models.ready') },
  { name: 'Claude', desc: t('home.station.models.claude'), state: t('home.station.models.ready') },
  { name: 'Gemini', desc: t('home.station.models.gemini'), state: t('home.station.models.ready') },
  { name: 'Antigravity', desc: t('home.station.models.antigravity'), state: t('home.station.models.standby') }
])

const stationConsoleSteps = computed(() => [
  {
    code: '01',
    title: t('home.station.console.policy.title'),
    desc: t('home.station.console.policy.desc')
  },
  {
    code: '02',
    title: t('home.station.console.pool.title'),
    desc: t('home.station.console.pool.desc')
  },
  {
    code: '03',
    title: t('home.station.console.meter.title'),
    desc: t('home.station.console.meter.desc')
  }
])

const stationPricingRows = computed(() => [
  {
    label: t('home.station.pricing.rows.mode.label'),
    value: t('home.station.pricing.rows.mode.value')
  },
  {
    label: t('home.station.pricing.rows.rate.label'),
    value: t('home.station.pricing.rows.rate.value')
  },
  {
    label: t('home.station.pricing.rows.limit.label'),
    value: t('home.station.pricing.rows.limit.value')
  }
])

const stationSpecItems = computed(() => [
  {
    title: t('home.station.spec.items.security.title'),
    desc: t('home.station.spec.items.security.desc')
  },
  {
    title: t('home.station.spec.items.compat.title'),
    desc: t('home.station.spec.items.compat.desc')
  },
  {
    title: t('home.station.spec.items.failover.title'),
    desc: t('home.station.spec.items.failover.desc')
  },
  {
    title: t('home.station.spec.items.audit.title'),
    desc: t('home.station.spec.items.audit.desc')
  }
])

const stationFlowItems = computed(() => [
  {
    number: '01',
    title: t('home.station.flow.items.stable.title'),
    desc: t('home.station.flow.items.stable.desc'),
    tags: [
      t('home.station.flow.items.stable.tags.official'),
      t('home.station.flow.items.stable.tags.health'),
      t('home.station.flow.items.stable.tags.lowLatency')
    ]
  },
  {
    number: '02',
    title: t('home.station.flow.items.billing.title'),
    desc: t('home.station.flow.items.billing.desc'),
    tags: [
      t('home.station.flow.items.billing.tags.quota'),
      t('home.station.flow.items.billing.tags.detail'),
      t('home.station.flow.items.billing.tags.export')
    ]
  },
  {
    number: '03',
    title: t('home.station.flow.items.compat.title'),
    desc: t('home.station.flow.items.compat.desc'),
    tags: [
      t('home.station.flow.items.compat.tags.cli'),
      t('home.station.flow.items.compat.tags.sdk'),
      t('home.station.flow.items.compat.tags.plugin')
    ]
  },
  {
    number: '04',
    title: t('home.station.flow.items.team.title'),
    desc: t('home.station.flow.items.team.desc'),
    tags: [
      t('home.station.flow.items.team.tags.group'),
      t('home.station.flow.items.team.tags.key'),
      t('home.station.flow.items.team.tags.policy')
    ]
  },
  {
    number: '05',
    title: t('home.station.flow.items.fallback.title'),
    desc: t('home.station.flow.items.fallback.desc'),
    tags: [
      t('home.station.flow.items.fallback.tags.auto'),
      t('home.station.flow.items.fallback.tags.pool'),
      t('home.station.flow.items.fallback.tags.trace')
    ]
  }
])

const stationWorkflowItems = computed(() => [
  {
    code: 'CLI',
    title: t('home.station.workflows.items.cli.title'),
    desc: t('home.station.workflows.items.cli.desc')
  },
  {
    code: 'TEAM',
    title: t('home.station.workflows.items.team.title'),
    desc: t('home.station.workflows.items.team.desc')
  },
  {
    code: 'OPS',
    title: t('home.station.workflows.items.ops.title'),
    desc: t('home.station.workflows.items.ops.desc')
  },
  {
    code: 'BILL',
    title: t('home.station.workflows.items.bill.title'),
    desc: t('home.station.workflows.items.bill.desc')
  }
])

const stationFaqItems = computed(() => [
  {
    number: '01',
    question: t('home.station.faq.items.rate.question'),
    answer: t('home.station.faq.items.rate.answer')
  },
  {
    number: '02',
    question: t('home.station.faq.items.codex.question'),
    answer: t('home.station.faq.items.codex.answer')
  },
  {
    number: '03',
    question: t('home.station.faq.items.remote.question'),
    answer: t('home.station.faq.items.remote.answer')
  },
  {
    number: '04',
    question: t('home.station.faq.items.quota.question'),
    answer: t('home.station.faq.items.quota.answer')
  },
  {
    number: '05',
    question: t('home.station.faq.items.provider.question'),
    answer: t('home.station.faq.items.provider.answer')
  }
])

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
}

onMounted(() => {
  initTheme()
  authStore.checkAuth()

  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
})
</script>

<style scoped>
.codex-station {
  --station-bg: #f6f8f7;
  --station-surface: #ffffff;
  --station-surface-soft: #eef3f1;
  --station-ink: #111312;
  --station-muted: #626d68;
  --station-line: #dbe5e0;
  --station-dark: #0f1412;
  --station-mint: #14b981;
  --station-blue: #2563eb;
  --station-coral: #f05a4f;
  --station-amber: #c8841c;
  --station-shadow: 0 22px 60px rgba(16, 24, 21, 0.08);
  min-height: 100vh;
  overflow-x: hidden;
  background:
    linear-gradient(90deg, rgba(17, 19, 18, 0.035) 1px, transparent 1px),
    linear-gradient(180deg, #ffffff 0%, var(--station-bg) 34%, #f0f4f2 100%);
  background-size: 80px 80px, auto;
  color: var(--station-ink);
  font-family:
    "Noto Sans CJK SC",
    "Noto Sans SC",
    "PingFang SC",
    "Microsoft YaHei",
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

:global(.dark) .codex-station {
  --station-bg: #080d0b;
  --station-surface: #101714;
  --station-surface-soft: #16221d;
  --station-ink: #f3f7f5;
  --station-muted: #9cacaa;
  --station-line: #20302a;
  --station-dark: #eef6f2;
  --station-mint: #25d79b;
  --station-blue: #6ea8ff;
  --station-coral: #ff7b70;
  --station-amber: #f0b85b;
  --station-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(180deg, #070b0a 0%, var(--station-bg) 48%, #0c1210 100%);
  background-size: 80px 80px, auto;
}

.station-notice,
.station-header,
.station-hero,
.station-proof,
.station-section,
.station-final-cta,
.station-footer {
  width: min(100% - 48px, 1180px);
  margin: 0 auto;
}

.station-notice {
  display: flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border-bottom: 1px solid var(--station-line);
  color: var(--station-muted);
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}

.station-status-dot {
  display: inline-block;
  width: 9px;
  height: 9px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--station-mint);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--station-mint) 13%, transparent);
}

.station-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  min-height: 72px;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  border-bottom: 1px solid var(--station-line);
  background: color-mix(in srgb, var(--station-bg) 88%, transparent);
  backdrop-filter: blur(18px);
}

.station-brand,
.station-footer-brand {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 12px;
  color: inherit;
  text-decoration: none;
}

.station-logo {
  display: inline-flex;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid var(--station-line);
  border-radius: 8px;
  background: var(--station-dark);
  color: var(--station-bg);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  font-weight: 900;
}

.station-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.station-logo-small {
  width: 34px;
  height: 34px;
  font-size: 11px;
}

.station-brand-copy {
  display: grid;
  min-width: 0;
  gap: 2px;
}

.station-brand-copy strong {
  font-size: 15px;
  letter-spacing: 0;
}

.station-brand-copy small {
  color: var(--station-muted);
  font-size: 12px;
}

.station-nav {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.station-nav a,
.station-ghost-action,
.station-login,
.station-primary,
.station-secondary {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0;
  text-decoration: none;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.station-nav a {
  color: var(--station-muted);
  padding: 0 12px;
}

.station-nav a:hover,
.station-ghost-action:hover {
  background: var(--station-surface-soft);
  color: var(--station-ink);
}

.station-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.station-ghost-action {
  border: 1px solid var(--station-line);
  background: color-mix(in srgb, var(--station-surface) 82%, transparent);
  color: var(--station-ink);
  padding: 0 12px;
}

.station-login {
  background: var(--station-dark);
  color: var(--station-bg);
  padding: 0 15px;
}

.station-login:hover,
.station-primary:hover,
.station-secondary:hover {
  transform: translateY(-1px);
}

.station-hero {
  display: grid;
  min-height: 720px;
  padding: 68px 0 54px;
  gap: 30px;
  align-items: start;
}

.station-hero-copy {
  display: grid;
  justify-items: center;
  text-align: center;
}

.station-pill {
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  gap: 9px;
  margin: 0 0 18px;
  border: 1px solid var(--station-line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--station-surface) 84%, transparent);
  color: var(--station-muted);
  font-size: 13px;
  font-weight: 800;
  padding: 0 14px;
  box-shadow: var(--station-shadow);
}

.station-eyebrow,
.station-section-heading p,
.station-final-cta p {
  margin: 0 0 14px;
  color: var(--station-mint);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

.station-hero h1 {
  display: grid;
  max-width: 1040px;
  margin: 0;
  color: var(--station-ink);
  font-size: 68px;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.04;
}

.station-hero h1 span + span {
  color: var(--station-blue);
}

.station-lede {
  max-width: 780px;
  margin: 24px 0 0;
  color: var(--station-muted);
  font-size: 18px;
  line-height: 1.9;
}

.station-hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
}

.station-primary,
.station-secondary {
  min-height: 48px;
  padding: 0 20px;
  font-size: 14px;
}

.station-primary {
  background: var(--station-dark);
  color: var(--station-bg);
  box-shadow: 0 16px 38px rgba(17, 19, 18, 0.16);
}

:global(.dark) .station-primary {
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.34);
}

.station-secondary {
  border: 1px solid var(--station-line);
  background: var(--station-surface);
  color: var(--station-ink);
}

.station-model-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--station-line);
  border-radius: 8px;
  background: var(--station-line);
}

.station-model {
  display: grid;
  min-height: 104px;
  gap: 5px;
  background: color-mix(in srgb, var(--station-surface) 88%, transparent);
  padding: 18px;
}

.station-model span {
  color: var(--station-mint);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
}

.station-model strong {
  color: var(--station-ink);
  font-size: 17px;
}

.station-model small {
  color: var(--station-muted);
  font-size: 12px;
  line-height: 1.5;
}

.station-console {
  overflow: hidden;
  border: 1px solid var(--station-dark);
  border-radius: 8px;
  background: #0d1210;
  box-shadow: var(--station-shadow);
  color: #e8f7ef;
}

.console-topbar {
  display: flex;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 18px;
}

.console-topbar span {
  color: #93a39c;
  font-size: 13px;
  font-weight: 800;
}

.console-topbar strong {
  color: var(--station-mint);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  letter-spacing: 0;
}

.console-body {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.console-code,
.console-flow {
  background: #0d1210;
}

.console-code {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 12px 18px;
  padding: 24px;
  color: #e8f7ef;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.65;
}

.code-muted {
  color: #6f8179;
}

.console-flow {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
}

.flow-step {
  display: grid;
  min-height: 184px;
  align-content: center;
  gap: 10px;
  background: #111a16;
  padding: 20px;
}

.flow-step span {
  color: var(--station-amber);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-weight: 900;
}

.flow-step strong {
  color: #ffffff;
  font-size: 17px;
}

.flow-step small {
  color: #92a49c;
  font-size: 13px;
  line-height: 1.7;
}

.station-proof {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  padding: 38px 0 70px;
}

.proof-card,
.workflow-card {
  border: 1px solid var(--station-line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--station-surface) 90%, transparent);
  box-shadow: var(--station-shadow);
}

.proof-card {
  display: grid;
  min-height: 260px;
  align-content: start;
  padding: 28px;
}

.proof-index,
.workflow-card span {
  color: var(--station-coral);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 900;
}

.proof-card h2 {
  margin: 18px 0 0;
  color: var(--station-ink);
  font-size: 25px;
  font-weight: 900;
  letter-spacing: 0;
}

.proof-card p {
  margin: 12px 0 0;
  color: var(--station-muted);
  font-size: 14px;
  line-height: 1.75;
}

.proof-pricing dl {
  display: grid;
  margin: 24px 0 0;
}

.proof-pricing dl div {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  border-top: 1px solid var(--station-line);
  padding: 13px 0;
}

.proof-pricing dt,
.proof-pricing dd {
  margin: 0;
  font-size: 14px;
}

.proof-pricing dt {
  color: var(--station-muted);
}

.proof-pricing dd {
  color: var(--station-ink);
  font-weight: 900;
  text-align: right;
}

.support-box {
  display: grid;
  margin-top: 28px;
  gap: 6px;
  border: 1px solid var(--station-line);
  border-radius: 8px;
  background: var(--station-surface-soft);
  padding: 18px;
}

.support-box span {
  color: var(--station-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
}

.support-box strong {
  color: var(--station-ink);
  font-size: 20px;
}

.proof-spec {
  grid-column: 1 / -1;
}

.spec-grid {
  display: grid;
  margin-top: 24px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--station-line);
  border-radius: 8px;
  background: var(--station-line);
}

.spec-grid div {
  min-height: 136px;
  background: var(--station-surface-soft);
  padding: 18px;
}

.spec-grid strong {
  display: block;
  color: var(--station-ink);
  font-size: 15px;
}

.spec-grid p {
  margin-top: 9px;
  font-size: 13px;
}

.station-section {
  padding: 70px 0;
}

.station-flow-section {
  padding: 48px 0 54px;
}

.station-section-heading {
  display: grid;
  justify-items: center;
  margin: 0 auto 42px;
  text-align: center;
}

.station-section-heading h2,
.station-final-cta h2 {
  max-width: 820px;
  margin: 0;
  color: var(--station-ink);
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.18;
}

.station-section-heading span,
.station-final-cta span {
  max-width: 700px;
  margin-top: 14px;
  color: var(--station-muted);
  font-size: 16px;
  line-height: 1.8;
}

.station-flow-section .station-section-heading {
  margin-bottom: 26px;
}

.station-flow-section .station-section-heading h2 {
  max-width: 760px;
  font-size: 36px;
}

.station-flow-section .station-section-heading span {
  max-width: 640px;
  font-size: 15px;
  line-height: 1.7;
}

.station-flow {
  position: relative;
  display: grid;
  max-width: 1180px;
  margin: 0 auto;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.station-flow::before {
  display: none;
}

.station-flow-row {
  position: relative;
  display: grid;
  min-height: 246px;
  align-content: start;
  gap: 14px;
  border: 1px solid var(--station-line);
  border-radius: 8px;
  background: var(--station-surface);
  box-shadow: var(--station-shadow);
  padding: 20px;
}

.station-flow-row .flow-copy {
  grid-column: auto;
}

.station-flow-row .flow-number {
  grid-column: auto;
}

.station-flow-row .flow-signal {
  display: none;
}

.station-flow-row:nth-child(even) .flow-copy {
  grid-column: auto;
}

.station-flow-row:nth-child(even) .flow-number {
  grid-column: auto;
}

.station-flow-row:nth-child(even) .flow-signal {
  display: none;
}

.flow-number {
  position: relative;
  z-index: 1;
  display: inline-flex;
  width: fit-content;
  min-height: 28px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--station-line);
  border-radius: 8px;
  background: var(--station-surface-soft);
  color: var(--station-coral);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 900;
  padding: 0 9px;
}

.flow-copy {
  display: grid;
  min-width: 0;
}

.flow-copy strong {
  color: var(--station-ink);
  font-size: 18px;
  font-weight: 900;
}

.flow-copy p {
  margin: 10px 0 0;
  color: var(--station-muted);
  font-size: 13px;
  line-height: 1.65;
}

.flow-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.flow-tags span {
  border: 1px solid color-mix(in srgb, var(--station-mint) 28%, var(--station-line));
  border-radius: 8px;
  color: var(--station-mint);
  font-size: 11px;
  font-weight: 800;
  padding: 5px 7px;
}

.flow-signal {
  display: none;
}

.flow-signal span {
  width: 136px;
  height: 136px;
  border: 1px solid color-mix(in srgb, var(--station-blue) 42%, transparent);
  border-radius: 50%;
  box-shadow:
    inset 0 0 0 24px color-mix(in srgb, var(--station-blue) 7%, transparent),
    0 0 48px color-mix(in srgb, var(--station-blue) 16%, transparent);
}

.workflow-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.workflow-card {
  display: grid;
  min-height: 220px;
  align-content: start;
  gap: 14px;
  padding: 24px;
}

.workflow-card strong {
  color: var(--station-ink);
  font-size: 19px;
  font-weight: 900;
}

.workflow-card p {
  margin: 0;
  color: var(--station-muted);
  font-size: 14px;
  line-height: 1.8;
}

.station-faq-section {
  width: min(100% - 48px, 920px);
}

.faq-list {
  display: grid;
  gap: 12px;
}

.faq-list details {
  border: 1px solid var(--station-line);
  border-radius: 8px;
  background: var(--station-surface);
  box-shadow: var(--station-shadow);
}

.faq-list summary {
  display: grid;
  min-height: 58px;
  cursor: pointer;
  grid-template-columns: 48px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  padding: 0 18px;
  list-style: none;
}

.faq-list summary::-webkit-details-marker {
  display: none;
}

.faq-list summary span {
  color: var(--station-blue);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 900;
}

.faq-list summary strong {
  color: var(--station-ink);
  font-size: 15px;
}

.faq-list p {
  margin: 0;
  border-top: 1px solid var(--station-line);
  color: var(--station-muted);
  font-size: 14px;
  line-height: 1.8;
  padding: 16px 18px 18px 78px;
}

.station-final-cta {
  display: grid;
  justify-items: center;
  margin-top: 36px;
  margin-bottom: 54px;
  border: 1px solid var(--station-line);
  border-radius: 8px;
  background: var(--station-dark);
  color: var(--station-bg);
  padding: 54px 28px;
  text-align: center;
}

.station-final-cta h2 {
  color: var(--station-bg);
}

.station-final-cta span {
  color: color-mix(in srgb, var(--station-bg) 72%, transparent);
}

.station-final-cta .station-primary {
  margin-top: 26px;
  background: var(--station-bg);
  color: var(--station-dark);
  box-shadow: none;
}

.station-footer {
  display: flex;
  min-height: 104px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-top: 1px solid var(--station-line);
  color: var(--station-muted);
  font-size: 13px;
}

.station-footer-copy {
  display: flex;
  align-items: center;
  gap: 16px;
}

.station-footer a {
  color: inherit;
  font-weight: 800;
  text-decoration: none;
}

@media (max-width: 1040px) {
  .station-header {
    grid-template-columns: auto auto;
  }

  .station-nav {
    display: none;
  }

  .station-hero h1 {
    font-size: 54px;
  }

  .station-model-strip,
  .spec-grid,
  .workflow-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .station-flow {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .station-flow-row {
    min-height: 0;
  }

  .console-body,
  .station-proof {
    grid-template-columns: 1fr;
  }

  .console-flow {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .station-notice,
  .station-header,
  .station-hero,
  .station-proof,
  .station-section,
  .station-final-cta,
  .station-footer,
  .station-faq-section {
    width: min(100% - 32px, 1180px);
  }

  .station-notice {
    min-height: 46px;
    font-size: 12px;
    line-height: 1.5;
  }

  .station-header {
    min-height: 64px;
    gap: 12px;
  }

  .station-brand-copy,
  .station-doc-action,
  .station-theme-action {
    display: none;
  }

  .station-actions {
    gap: 6px;
  }

  .station-login {
    min-height: 36px;
    padding: 0 12px;
    font-size: 12px;
  }

  .station-hero {
    min-height: auto;
    padding: 36px 0 36px;
    gap: 22px;
  }

  .station-hero h1 {
    font-size: 42px;
    line-height: 1.1;
  }

  .station-lede {
    margin-top: 18px;
    font-size: 15px;
    line-height: 1.8;
  }

  .station-hero-actions {
    display: grid;
    width: 100%;
    margin-top: 24px;
  }

  .station-primary,
  .station-secondary {
    width: 100%;
  }

  .station-model-strip,
  .spec-grid,
  .workflow-grid {
    grid-template-columns: 1fr;
  }

  .station-model {
    min-height: 86px;
  }

  .console-topbar {
    min-height: 44px;
    padding: 0 14px;
  }

  .console-body,
  .console-flow {
    grid-template-columns: 1fr;
  }

  .console-code {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 18px;
    font-size: 12px;
  }

  .flow-step {
    min-height: 120px;
  }

  .station-proof {
    gap: 14px;
    padding: 20px 0 44px;
  }

  .proof-card {
    min-height: 0;
    padding: 22px;
  }

  .proof-pricing dl div {
    display: grid;
    gap: 6px;
  }

  .proof-pricing dd {
    text-align: left;
  }

  .spec-grid div {
    min-height: 0;
  }

  .station-section {
    padding: 48px 0;
  }

  .station-section-heading {
    margin-bottom: 28px;
  }

  .station-section-heading h2,
  .station-final-cta h2 {
    font-size: 30px;
    line-height: 1.24;
  }

  .station-section-heading span,
  .station-final-cta span {
    font-size: 14px;
  }

  .station-flow {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .station-flow-row,
  .station-flow-row:nth-child(even) {
    min-height: 0;
    gap: 12px;
    padding: 18px;
  }

  .flow-number {
    min-height: 26px;
    font-size: 12px;
  }

  .flow-copy strong {
    font-size: 19px;
  }

  .workflow-card {
    min-height: 0;
  }

  .faq-list summary {
    min-height: 56px;
    grid-template-columns: 34px minmax(0, 1fr);
    padding: 0 14px;
  }

  .faq-list p {
    padding: 14px 14px 16px 60px;
  }

  .station-final-cta {
    margin-top: 10px;
    margin-bottom: 36px;
    padding: 36px 20px;
  }

  .station-footer {
    min-height: 120px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .station-footer-copy {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
