<template>
  <div class="codex-login">
    <header class="login-header">
      <router-link to="/" class="login-brand" :aria-label="t('auth.loginShell.product')">
        <span class="login-logo">CG</span>
        <span class="login-brand-copy">
          <strong>{{ t('auth.loginShell.product') }}</strong>
          <small>{{ t('auth.loginShell.brandLine') }}</small>
        </span>
      </router-link>

      <div class="login-header-actions">
        <LocaleSwitcher />
        <button
          type="button"
          class="login-header-button"
          @click="toggleTheme"
          :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
        >
          {{ isDark ? t('home.station.actions.light') : t('home.station.actions.dark') }}
        </button>
        <router-link to="/" class="login-header-button">
          {{ t('auth.loginShell.home') }}
        </router-link>
      </div>
    </header>

    <main class="login-main">
      <section class="login-story" :aria-label="t('auth.loginShell.product')">
        <p class="login-pill">
          <span class="login-status-dot" aria-hidden="true"></span>
          {{ t('auth.loginShell.kicker') }}
        </p>
        <h1>{{ t('auth.loginShell.title') }}</h1>
        <p class="login-lede">{{ t('auth.loginShell.description') }}</p>

        <div class="login-command" aria-label="Gateway route preview">
          <div class="login-command-bar">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <strong>{{ t('auth.loginShell.commandTitle') }}</strong>
          </div>
          <div class="login-route-list">
            <div v-for="route in loginRouteRows" :key="route.model" class="login-route-row">
              <span>{{ route.model }}</span>
              <strong>{{ route.path }}</strong>
              <small>{{ route.status }}</small>
            </div>
          </div>
        </div>

        <div class="login-highlight-grid">
          <article v-for="item in loginHighlights" :key="item.code">
            <span>{{ item.code }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.desc }}</p>
          </article>
        </div>
      </section>

      <section class="login-panel" aria-labelledby="login-title">
        <div class="login-panel-head">
          <span>{{ t('auth.loginShell.panelLabel') }}</span>
          <h2 id="login-title">{{ t('auth.welcomeBack') }}</h2>
          <p>{{ t('auth.loginShell.panelHint') }}</p>
        </div>

        <div v-if="errorMessage" class="login-alert" role="alert">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div>
            <label for="email" class="input-label">
              {{ t('auth.emailLabel') }}
            </label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Icon name="mail" size="md" class="text-gray-400 dark:text-dark-500" />
              </div>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                autofocus
                autocomplete="email"
                :disabled="authActionDisabled"
                class="input pl-11"
                :class="{ 'input-error': errors.email }"
                :placeholder="t('auth.emailPlaceholder')"
              />
            </div>
          </div>

          <div>
            <div class="login-label-row">
              <label for="password" class="input-label">
                {{ t('auth.passwordLabel') }}
              </label>
              <router-link
                v-if="passwordResetEnabled && !backendModeEnabled"
                to="/forgot-password"
                class="login-inline-link"
              >
                {{ t('auth.forgotPassword') }}
              </router-link>
            </div>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Icon name="lock" size="md" class="text-gray-400 dark:text-dark-500" />
              </div>
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="current-password"
                :disabled="authActionDisabled"
                class="input pl-11 pr-11"
                :class="{ 'input-error': errors.password }"
                :placeholder="t('auth.passwordPlaceholder')"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                :disabled="authActionDisabled"
                class="login-password-toggle"
                :aria-label="showPassword ? t('auth.loginShell.hidePassword') : t('auth.loginShell.showPassword')"
              >
                <Icon v-if="showPassword" name="eyeOff" size="md" />
                <Icon v-else name="eye" size="md" />
              </button>
            </div>
          </div>

          <div v-if="turnstileEnabled && turnstileSiteKey" class="login-turnstile">
            <TurnstileWidget
              ref="turnstileRef"
              :site-key="turnstileSiteKey"
              @verify="onTurnstileVerify"
              @expire="onTurnstileExpire"
              @error="onTurnstileError"
            />
          </div>

          <button
            type="submit"
            :disabled="authActionDisabled || (turnstileEnabled && !turnstileToken)"
            class="btn btn-primary login-submit w-full"
          >
            <svg
              v-if="isLoading"
              class="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <Icon v-else name="login" size="md" class="mr-2" />
            {{ isLoading ? t('auth.signingIn') : t('auth.signIn') }}
          </button>

          <LoginAgreementPrompt
            v-if="loginAgreementEnabled"
            :accepted="agreementAccepted"
            :documents="loginAgreementDocuments"
            :mode="loginAgreementMode"
            :updated-at="loginAgreementUpdatedAt"
            :visible="showAgreementModal"
            @accept="acceptLoginAgreement"
            @reject="rejectLoginAgreement"
            @open="showAgreementModal = true"
          />

          <div v-if="showOAuthLogin" class="login-oauth">
            <div class="login-divider">
              <span>{{ t('auth.oauthOrContinue') }}</span>
            </div>

            <EmailOAuthButtons
              :disabled="authActionDisabled"
              :github-enabled="githubOAuthEnabled"
              :google-enabled="googleOAuthEnabled"
              :show-divider="false"
            />

            <LinuxDoOAuthSection
              v-if="linuxdoOAuthEnabled"
              :disabled="authActionDisabled"
              :show-divider="false"
            />
            <DingTalkOAuthSection
              v-if="dingtalkOAuthEnabled"
              :disabled="authActionDisabled"
              :show-divider="false"
            />
            <WechatOAuthSection
              v-if="wechatOAuthEnabled"
              :disabled="authActionDisabled"
              :show-divider="false"
            />
            <OidcOAuthSection
              v-if="oidcOAuthEnabled"
              :disabled="authActionDisabled"
              :provider-name="oidcOAuthProviderName"
              :show-divider="false"
            />
          </div>
        </form>

        <p v-if="!backendModeEnabled" class="login-register">
          <span>{{ t('auth.dontHaveAccount') }}</span>
          <router-link to="/register">
            {{ t('auth.signUp') }}
          </router-link>
        </p>
      </section>
    </main>
  </div>

  <!-- 2FA Modal -->
  <TotpLoginModal
    v-if="show2FAModal"
    ref="totpModalRef"
    :temp-token="totpTempToken"
    :user-email-masked="totpUserEmailMasked"
    @verify="handle2FAVerify"
    @cancel="handle2FACancel"
  />
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LinuxDoOAuthSection from '@/components/auth/LinuxDoOAuthSection.vue'
import DingTalkOAuthSection from '@/components/auth/DingTalkOAuthSection.vue'
import OidcOAuthSection from '@/components/auth/OidcOAuthSection.vue'
import WechatOAuthSection from '@/components/auth/WechatOAuthSection.vue'
import EmailOAuthButtons from '@/components/auth/EmailOAuthButtons.vue'
import LoginAgreementPrompt from '@/components/auth/LoginAgreementPrompt.vue'
import TotpLoginModal from '@/components/auth/TotpLoginModal.vue'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'
import TurnstileWidget from '@/components/TurnstileWidget.vue'
import { useAuthStore, useAppStore } from '@/stores'
import { getPublicSettings, isTotp2FARequired, isWeChatWebOAuthEnabled } from '@/api/auth'
import type { LoginAgreementDocument, TotpLoginResponse } from '@/types'
import { extractI18nErrorMessage } from '@/utils/apiError'
import { clearAllAffiliateReferralCodes } from '@/utils/oauthAffiliate'

const { t } = useI18n()
const LOGIN_AGREEMENT_STORAGE_KEY = 'sub2api_login_agreement_consent'

// ==================== Router & Stores ====================

const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()

// ==================== State ====================

const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const showPassword = ref<boolean>(false)
const publicSettingsLoaded = ref<boolean>(false)
const isDark = ref(document.documentElement.classList.contains('dark'))

// Public settings
const turnstileEnabled = ref<boolean>(false)
const turnstileSiteKey = ref<string>('')
const linuxdoOAuthEnabled = ref<boolean>(false)
const dingtalkOAuthEnabled = ref<boolean>(false)
const wechatOAuthEnabled = ref<boolean>(false)
const backendModeEnabled = ref<boolean>(false)
const oidcOAuthEnabled = ref<boolean>(false)
const oidcOAuthProviderName = ref<string>('OIDC')
const githubOAuthEnabled = ref<boolean>(false)
const googleOAuthEnabled = ref<boolean>(false)
const passwordResetEnabled = ref<boolean>(false)
const loginAgreementEnabled = ref<boolean>(false)
const loginAgreementMode = ref<'modal' | 'checkbox' | string>('modal')
const loginAgreementUpdatedAt = ref<string>('')
const loginAgreementRevision = ref<string>('')
const loginAgreementDocuments = ref<LoginAgreementDocument[]>([])
const agreementAccepted = ref<boolean>(false)
const showAgreementModal = ref<boolean>(false)

// Turnstile
const turnstileRef = ref<InstanceType<typeof TurnstileWidget> | null>(null)
const turnstileToken = ref<string>('')

// 2FA state
const show2FAModal = ref<boolean>(false)
const totpTempToken = ref<string>('')
const totpUserEmailMasked = ref<string>('')
const totpModalRef = ref<InstanceType<typeof TotpLoginModal> | null>(null)

const formData = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: '',
  turnstile: ''
})

const validationToastMessage = computed(
  () => errors.email || errors.password || errors.turnstile || ''
)

const agreementGateActive = computed(
  () => loginAgreementEnabled.value && !agreementAccepted.value
)

const authActionDisabled = computed(
  () => isLoading.value || !publicSettingsLoaded.value || agreementGateActive.value
)

const showOAuthLogin = computed(
  () =>
    !backendModeEnabled.value &&
    (linuxdoOAuthEnabled.value ||
      dingtalkOAuthEnabled.value ||
      wechatOAuthEnabled.value ||
      oidcOAuthEnabled.value ||
      githubOAuthEnabled.value ||
      googleOAuthEnabled.value)
)

const loginRouteRows = computed(() => [
  {
    model: 'Codex',
    path: '/v1/responses',
    status: t('auth.loginShell.routeReady')
  },
  {
    model: 'Claude',
    path: '/v1/messages',
    status: t('auth.loginShell.routeReady')
  },
  {
    model: 'Gemini',
    path: '/v1beta/models',
    status: t('auth.loginShell.routeStandby')
  }
])

const loginHighlights = computed(() => [
  {
    code: 'KEY',
    title: t('auth.loginShell.highlights.keys.title'),
    desc: t('auth.loginShell.highlights.keys.desc')
  },
  {
    code: 'FLOW',
    title: t('auth.loginShell.highlights.flow.title'),
    desc: t('auth.loginShell.highlights.flow.desc')
  },
  {
    code: 'COST',
    title: t('auth.loginShell.highlights.cost.title'),
    desc: t('auth.loginShell.highlights.cost.desc')
  }
])

watch(validationToastMessage, (value, previousValue) => {
  if (value && value !== previousValue) {
    appStore.showError(value)
  }
})

// ==================== Lifecycle ====================

onMounted(async () => {
  initTheme()

  const expiredFlag = sessionStorage.getItem('auth_expired')
  if (expiredFlag) {
    sessionStorage.removeItem('auth_expired')
    const message = t('auth.reloginRequired')
    errorMessage.value = message
    appStore.showWarning(message)
  }

  try {
    const settings = await getPublicSettings()
    turnstileEnabled.value = settings.turnstile_enabled
    turnstileSiteKey.value = settings.turnstile_site_key || ''
    linuxdoOAuthEnabled.value = settings.linuxdo_oauth_enabled
    dingtalkOAuthEnabled.value = settings.dingtalk_oauth_enabled ?? false
    wechatOAuthEnabled.value = isWeChatWebOAuthEnabled(settings)
    backendModeEnabled.value = settings.backend_mode_enabled
    oidcOAuthEnabled.value = settings.oidc_oauth_enabled
    oidcOAuthProviderName.value = settings.oidc_oauth_provider_name || 'OIDC'
    githubOAuthEnabled.value = settings.github_oauth_enabled
    googleOAuthEnabled.value = settings.google_oauth_enabled
    backendModeEnabled.value = settings.backend_mode_enabled
    passwordResetEnabled.value = settings.password_reset_enabled
    applyLoginAgreementSettings(settings)
  } catch (error) {
    console.error('Failed to load public settings:', error)
    loginAgreementEnabled.value = false
    agreementAccepted.value = true
  } finally {
    publicSettingsLoaded.value = true
  }
})

function toggleTheme(): void {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function initTheme(): void {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
}

// ==================== Login Agreement ====================

function applyLoginAgreementSettings(settings: {
  login_agreement_enabled?: boolean
  login_agreement_mode?: string
  login_agreement_updated_at?: string
  login_agreement_revision?: string
  login_agreement_documents?: LoginAgreementDocument[]
}): void {
  const documents = Array.isArray(settings.login_agreement_documents)
    ? settings.login_agreement_documents.filter((doc) => doc.title?.trim())
    : []
  loginAgreementDocuments.value = documents
  loginAgreementEnabled.value = settings.login_agreement_enabled === true && documents.length > 0
  loginAgreementMode.value = settings.login_agreement_mode === 'checkbox' ? 'checkbox' : 'modal'
  loginAgreementUpdatedAt.value = settings.login_agreement_updated_at || ''
  loginAgreementRevision.value =
    settings.login_agreement_revision ||
    `${loginAgreementUpdatedAt.value}:${documents.map((doc) => `${doc.id}:${doc.title}`).join('|')}`

  agreementAccepted.value = !loginAgreementEnabled.value || hasAcceptedLoginAgreement(loginAgreementRevision.value)
  showAgreementModal.value =
    loginAgreementEnabled.value && !agreementAccepted.value && loginAgreementMode.value !== 'checkbox'
}

function hasAcceptedLoginAgreement(revision: string): boolean {
  if (!revision) {
    return false
  }
  try {
    const raw = localStorage.getItem(LOGIN_AGREEMENT_STORAGE_KEY)
    if (!raw) {
      return false
    }
    const parsed = JSON.parse(raw) as { revision?: string }
    return parsed.revision === revision
  } catch {
    return false
  }
}

function acceptLoginAgreement(): void {
  if (loginAgreementRevision.value) {
    localStorage.setItem(
      LOGIN_AGREEMENT_STORAGE_KEY,
      JSON.stringify({
        revision: loginAgreementRevision.value,
        accepted_at: new Date().toISOString()
      })
    )
  }
  agreementAccepted.value = true
  showAgreementModal.value = false
}

function rejectLoginAgreement(): void {
  localStorage.removeItem(LOGIN_AGREEMENT_STORAGE_KEY)
  agreementAccepted.value = false
  showAgreementModal.value = false
  appStore.showWarning(t('legal.loginAgreementPrompt.loginRejectedWarning'))
}

// ==================== Turnstile Handlers ====================

function onTurnstileVerify(token: string): void {
  turnstileToken.value = token
  errors.turnstile = ''
}

function onTurnstileExpire(): void {
  turnstileToken.value = ''
  errors.turnstile = t('auth.turnstileExpired')
}

function onTurnstileError(): void {
  turnstileToken.value = ''
  errors.turnstile = t('auth.turnstileFailed')
}

// ==================== Validation ====================

function validateForm(): boolean {
  // Reset errors
  errors.email = ''
  errors.password = ''
  errors.turnstile = ''

  let isValid = true

  if (agreementGateActive.value) {
    appStore.showWarning(t('legal.loginAgreementPrompt.loginRequiredWarning'))
    if (loginAgreementMode.value !== 'checkbox') {
      showAgreementModal.value = true
    }
    return false
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = t('auth.emailRequired')
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = t('auth.invalidEmail')
    isValid = false
  }

  // Password validation
  if (!formData.password) {
    errors.password = t('auth.passwordRequired')
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = t('auth.passwordMinLength')
    isValid = false
  }

  // Turnstile validation
  if (turnstileEnabled.value && !turnstileToken.value) {
    errors.turnstile = t('auth.completeVerification')
    isValid = false
  }

  return isValid
}

// ==================== Form Handlers ====================

async function handleLogin(): Promise<void> {
  // Clear previous error
  errorMessage.value = ''

  // Validate form
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    // Call auth store login
    const response = await authStore.login({
      email: formData.email,
      password: formData.password,
      turnstile_token: turnstileEnabled.value ? turnstileToken.value : undefined
    })

    // Check if 2FA is required
    if (isTotp2FARequired(response)) {
      const totpResponse = response as TotpLoginResponse
      totpTempToken.value = totpResponse.temp_token || ''
      totpUserEmailMasked.value = totpResponse.user_email_masked || ''
      show2FAModal.value = true
      isLoading.value = false
      return
    }

    // Show success toast
    clearAllAffiliateReferralCodes()
    appStore.showSuccess(t('auth.loginSuccess'))

    // Redirect to dashboard or intended route
    const redirectTo = (router.currentRoute.value.query.redirect as string) || '/dashboard'
    await router.push(redirectTo)
  } catch (error: unknown) {
    // Reset Turnstile on error
    if (turnstileRef.value) {
      turnstileRef.value.reset()
      turnstileToken.value = ''
    }

    errorMessage.value = extractI18nErrorMessage(error, t, 'auth.errors', t('auth.loginFailed'))

    // Also show error toast
    appStore.showError(errorMessage.value)
  } finally {
    isLoading.value = false
  }
}

// ==================== 2FA Handlers ====================

async function handle2FAVerify(code: string): Promise<void> {
  if (totpModalRef.value) {
    totpModalRef.value.setVerifying(true)
  }

  try {
    await authStore.login2FA(totpTempToken.value, code)

    // Close modal and show success
    show2FAModal.value = false
    clearAllAffiliateReferralCodes()
    appStore.showSuccess(t('auth.loginSuccess'))

    // Redirect to dashboard or intended route
    const redirectTo = (router.currentRoute.value.query.redirect as string) || '/dashboard'
    await router.push(redirectTo)
  } catch (error: unknown) {
    const err = error as { message?: string; response?: { data?: { message?: string } } }
    const message = err.response?.data?.message || err.message || t('profile.totp.loginFailed')

    if (totpModalRef.value) {
      totpModalRef.value.setError(message)
      totpModalRef.value.setVerifying(false)
    }
  }
}

function handle2FACancel(): void {
  show2FAModal.value = false
  totpTempToken.value = ''
  totpUserEmailMasked.value = ''
}
</script>

<style scoped>
.codex-login {
  --login-bg: #f6f8f7;
  --login-surface: #ffffff;
  --login-surface-soft: #eef3f1;
  --login-ink: #111312;
  --login-muted: #626d68;
  --login-line: #dbe5e0;
  --login-dark: #0f1412;
  --login-mint: #14b981;
  --login-blue: #2563eb;
  --login-coral: #f05a4f;
  --login-shadow: 0 22px 60px rgba(16, 24, 21, 0.08);
  min-height: 100vh;
  overflow-x: hidden;
  background:
    linear-gradient(90deg, rgba(17, 19, 18, 0.035) 1px, transparent 1px),
    linear-gradient(180deg, #ffffff 0%, var(--login-bg) 42%, #f0f4f2 100%);
  background-size: 80px 80px, auto;
  color: var(--login-ink);
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

:global(.dark) .codex-login {
  --login-bg: #080d0b;
  --login-surface: #101714;
  --login-surface-soft: #16221d;
  --login-ink: #f3f7f5;
  --login-muted: #9cacaa;
  --login-line: #20302a;
  --login-dark: #eef6f2;
  --login-mint: #25d79b;
  --login-blue: #6ea8ff;
  --login-coral: #ff7b70;
  --login-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(180deg, #070b0a 0%, var(--login-bg) 48%, #0c1210 100%);
  background-size: 80px 80px, auto;
}

.login-header,
.login-main {
  width: min(100% - 48px, 1180px);
  margin: 0 auto;
}

.login-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  min-height: 72px;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  border-bottom: 1px solid var(--login-line);
  background: color-mix(in srgb, var(--login-bg) 88%, transparent);
  backdrop-filter: blur(18px);
}

.login-brand {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 12px;
  color: inherit;
  text-decoration: none;
}

.login-logo {
  display: inline-flex;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--login-line);
  border-radius: 8px;
  background: var(--login-dark);
  color: var(--login-bg);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  font-weight: 900;
}

.login-brand-copy {
  display: grid;
  min-width: 0;
  gap: 2px;
}

.login-brand-copy strong {
  color: var(--login-ink);
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 0;
}

.login-brand-copy small {
  color: var(--login-muted);
  font-size: 12px;
}

.login-header-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.login-header-button,
.login-header-actions :deep(> .relative > button) {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--login-line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--login-surface) 82%, transparent);
  color: var(--login-ink);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1;
  padding: 0 12px;
  text-decoration: none;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.login-header-actions :deep(> .relative > button) {
  gap: 6px;
}

.login-header-button:hover,
.login-header-actions :deep(> .relative > button:hover) {
  background: var(--login-surface-soft);
  color: var(--login-ink);
  transform: translateY(-1px);
}

.login-main {
  display: grid;
  min-height: calc(100vh - 72px);
  grid-template-columns: minmax(0, 1fr) minmax(388px, 456px);
  gap: 38px;
  align-items: center;
  padding: 48px 0 64px;
}

.login-story {
  display: grid;
  align-content: center;
}

.login-pill {
  display: inline-flex;
  width: fit-content;
  min-height: 36px;
  align-items: center;
  gap: 9px;
  margin: 0 0 18px;
  border: 1px solid var(--login-line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--login-surface) 84%, transparent);
  color: var(--login-muted);
  font-size: 13px;
  font-weight: 800;
  padding: 0 14px;
  box-shadow: var(--login-shadow);
}

.login-status-dot {
  display: inline-block;
  width: 9px;
  height: 9px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--login-mint);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--login-mint) 13%, transparent);
}

.login-story h1 {
  max-width: 720px;
  margin: 0;
  color: var(--login-ink);
  font-size: 58px;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.06;
}

.login-lede {
  max-width: 640px;
  margin: 20px 0 0;
  color: var(--login-muted);
  font-size: 17px;
  line-height: 1.85;
}

.login-command {
  overflow: hidden;
  max-width: 660px;
  margin-top: 30px;
  border: 1px solid var(--login-dark);
  border-radius: 8px;
  background: #0d1210;
  box-shadow: var(--login-shadow);
  color: #e8f7ef;
}

.login-command-bar {
  display: grid;
  min-height: 46px;
  grid-template-columns: repeat(3, 10px) minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 18px;
}

.login-command-bar span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2a3832;
}

.login-command-bar span:nth-child(1) {
  background: var(--login-coral);
}

.login-command-bar span:nth-child(2) {
  background: #f0b85b;
}

.login-command-bar span:nth-child(3) {
  background: var(--login-mint);
}

.login-command-bar strong {
  justify-self: end;
  color: #93a39c;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0;
}

.login-route-list {
  display: grid;
  gap: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.login-route-row {
  display: grid;
  min-height: 58px;
  grid-template-columns: 88px minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  background: #0d1210;
  padding: 0 18px;
}

.login-route-row span,
.login-route-row small {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 900;
}

.login-route-row span {
  color: var(--login-mint);
}

.login-route-row strong {
  min-width: 0;
  overflow: hidden;
  color: #ffffff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.login-route-row small {
  color: #93a39c;
}

.login-highlight-grid {
  display: grid;
  max-width: 660px;
  margin-top: 18px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.login-highlight-grid article {
  display: grid;
  min-height: 142px;
  align-content: start;
  gap: 9px;
  border: 1px solid var(--login-line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--login-surface) 88%, transparent);
  box-shadow: var(--login-shadow);
  padding: 18px;
}

.login-highlight-grid span {
  color: var(--login-coral);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 900;
}

.login-highlight-grid strong {
  color: var(--login-ink);
  font-size: 16px;
  font-weight: 900;
}

.login-highlight-grid p {
  margin: 0;
  color: var(--login-muted);
  font-size: 13px;
  line-height: 1.65;
}

.login-panel {
  border: 1px solid var(--login-line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--login-surface) 92%, transparent);
  box-shadow: var(--login-shadow);
  padding: 34px;
}

.login-panel-head {
  margin-bottom: 24px;
}

.login-panel-head span {
  color: var(--login-mint);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

.login-panel-head h2 {
  margin: 10px 0 0;
  color: var(--login-ink);
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.18;
}

.login-panel-head p {
  margin: 10px 0 0;
  color: var(--login-muted);
  font-size: 14px;
  line-height: 1.75;
}

.login-alert {
  margin-bottom: 18px;
  border: 1px solid color-mix(in srgb, var(--login-coral) 36%, var(--login-line));
  border-radius: 8px;
  background: color-mix(in srgb, var(--login-coral) 10%, var(--login-surface));
  color: var(--login-ink);
  font-size: 13px;
  line-height: 1.55;
  padding: 12px 14px;
}

.login-form {
  display: grid;
  gap: 18px;
}

.login-label-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}

.login-form :deep(.input-label) {
  display: inline-flex;
  margin-bottom: 8px;
  color: var(--login-ink);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0;
}

.login-form :deep(.input) {
  min-height: 50px;
  border: 1px solid var(--login-line);
  border-radius: 8px;
  background: var(--login-surface);
  color: var(--login-ink);
  font-size: 14px;
  font-weight: 600;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}

.login-form :deep(.input::placeholder) {
  color: color-mix(in srgb, var(--login-muted) 72%, transparent);
  font-weight: 500;
}

.login-form :deep(.input:focus) {
  border-color: var(--login-dark);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--login-dark) 10%, transparent);
}

.login-form :deep(.input:disabled) {
  cursor: not-allowed;
  opacity: 0.66;
}

.login-form :deep(.input-error) {
  border-color: var(--login-coral);
}

.login-inline-link {
  color: var(--login-blue);
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
}

.login-inline-link:hover {
  color: var(--login-ink);
}

.login-password-toggle {
  position: absolute;
  inset: 0 0 0 auto;
  display: inline-flex;
  width: 44px;
  align-items: center;
  justify-content: center;
  color: var(--login-muted);
  transition: color 180ms ease;
}

.login-password-toggle:hover {
  color: var(--login-ink);
}

.login-turnstile {
  display: grid;
  justify-items: center;
}

.login-submit {
  min-height: 50px;
  border: 0;
  border-radius: 8px;
  background: var(--login-dark) !important;
  color: var(--login-bg) !important;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0;
  box-shadow: 0 16px 38px rgba(17, 19, 18, 0.16);
  transition:
    opacity 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;
}

:global(.dark) .login-submit {
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.34);
}

.login-submit:hover:not(:disabled) {
  transform: translateY(-1px);
}

.login-submit:disabled {
  cursor: not-allowed;
  opacity: 0.55;
  transform: none;
}

.login-oauth {
  display: grid;
  gap: 12px;
  padding-top: 2px;
}

.login-oauth :deep(button),
.login-oauth :deep(a) {
  border-radius: 8px;
}

.login-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--login-muted);
  font-size: 12px;
  font-weight: 800;
}

.login-divider::before,
.login-divider::after {
  display: block;
  height: 1px;
  flex: 1;
  background: var(--login-line);
  content: "";
}

.login-register {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin: 22px 0 0;
  color: var(--login-muted);
  font-size: 14px;
}

.login-register a {
  color: var(--login-blue);
  font-weight: 900;
  text-decoration: none;
}

.login-register a:hover {
  color: var(--login-ink);
}

@media (max-width: 1040px) {
  .login-main {
    grid-template-columns: 1fr;
    align-items: start;
    padding-top: 36px;
  }

  .login-story,
  .login-panel {
    width: min(100%, 720px);
    margin: 0 auto;
  }

  .login-story h1,
  .login-lede {
    max-width: none;
  }

  .login-command,
  .login-highlight-grid {
    max-width: none;
  }
}

@media (max-width: 760px) {
  .login-header,
  .login-main {
    width: min(100% - 32px, 1180px);
  }

  .login-header {
    position: relative;
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 16px 0;
  }

  .login-header-actions {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .login-main {
    min-height: auto;
    gap: 26px;
    padding: 28px 0 42px;
  }

  .login-story h1 {
    font-size: 38px;
  }

  .login-lede {
    font-size: 15px;
    line-height: 1.75;
  }

  .login-route-row {
    grid-template-columns: 74px minmax(0, 1fr);
    min-height: 66px;
    gap: 8px 12px;
    padding: 12px 16px;
  }

  .login-route-row small {
    grid-column: 2;
  }

  .login-highlight-grid {
    grid-template-columns: 1fr;
  }

  .login-highlight-grid article {
    min-height: 0;
  }

  .login-panel {
    padding: 24px;
  }
}

@media (max-width: 460px) {
  .login-brand-copy small {
    display: none;
  }

  .login-header-actions {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 100%;
  }

  .login-header-actions :deep(> .relative),
  .login-header-actions :deep(> .relative > button),
  .login-header-button {
    width: 100%;
  }

  .login-story h1 {
    font-size: 32px;
  }

  .login-command-bar {
    grid-template-columns: repeat(3, 10px);
  }

  .login-command-bar strong {
    grid-column: 1 / -1;
    justify-self: start;
    padding-bottom: 12px;
  }

  .login-panel {
    padding: 20px;
  }
}
</style>
