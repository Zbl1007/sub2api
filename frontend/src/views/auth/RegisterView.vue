<template>
  <div class="codex-register">
    <header class="register-header">
      <router-link to="/" class="register-brand" :aria-label="t('auth.registerShell.product')">
        <span class="register-logo">CG</span>
        <span class="register-brand-copy">
          <strong>{{ t('auth.registerShell.product') }}</strong>
          <small>{{ t('auth.registerShell.brandLine') }}</small>
        </span>
      </router-link>

      <div class="register-header-actions">
        <LocaleSwitcher />
        <button
          type="button"
          class="register-header-button"
          @click="toggleTheme"
          :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
        >
          {{ isDark ? t('home.station.actions.light') : t('home.station.actions.dark') }}
        </button>
        <router-link to="/" class="register-header-button">
          {{ t('auth.registerShell.home') }}
        </router-link>
      </div>
    </header>

    <main class="register-main">
      <section class="register-story" :aria-label="t('auth.registerShell.product')">
        <p class="register-pill">
          <span class="register-status-dot" aria-hidden="true"></span>
          {{ t('auth.registerShell.kicker') }}
        </p>
        <h1>{{ t('auth.registerShell.title') }}</h1>
        <p class="register-lede">{{ t('auth.registerShell.description') }}</p>

        <div class="register-process" aria-label="Registration process preview">
          <div class="register-process-bar">
            <strong>{{ t('auth.registerShell.commandTitle') }}</strong>
            <span>{{ settingsLoaded ? t('auth.registerShell.loaded') : t('auth.registerShell.loading') }}</span>
          </div>
          <div class="register-process-list">
            <article v-for="step in registerSteps" :key="step.code">
              <span>{{ step.code }}</span>
              <strong>{{ step.title }}</strong>
              <p>{{ step.desc }}</p>
            </article>
          </div>
        </div>

        <div class="register-highlight-grid">
          <article v-for="item in registerHighlights" :key="item.code">
            <span>{{ item.code }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.desc }}</p>
          </article>
        </div>
      </section>

      <section class="register-panel" aria-labelledby="register-title">
        <div class="register-panel-head">
          <span>{{ t('auth.registerShell.panelLabel') }}</span>
          <h2 id="register-title">{{ t('auth.createAccount') }}</h2>
          <p>{{ t('auth.registerShell.panelHint') }}</p>
        </div>

        <div v-if="errorMessage" class="register-alert" role="alert">
          {{ errorMessage }}
        </div>

        <div v-if="!registrationEnabled && settingsLoaded" class="register-disabled">
          <div class="register-disabled-icon" aria-hidden="true">
            <Icon name="exclamationCircle" size="lg" />
          </div>
          <strong>{{ t('auth.registerShell.closedTitle') }}</strong>
          <p>{{ t('auth.registrationDisabled') }}</p>
          <router-link to="/login" class="register-secondary-action">
            {{ t('auth.signIn') }}
          </router-link>
        </div>

        <form v-else @submit.prevent="handleRegister" class="register-form">
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
                :disabled="registrationActionDisabled"
                class="input pl-11"
                :class="{ 'input-error': errors.email }"
                :placeholder="t('auth.emailPlaceholder')"
              />
            </div>
          </div>

          <div>
            <label for="password" class="input-label">
              {{ t('auth.passwordLabel') }}
            </label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Icon name="lock" size="md" class="text-gray-400 dark:text-dark-500" />
              </div>
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="new-password"
                :disabled="registrationActionDisabled"
                class="input pl-11 pr-11"
                :class="{ 'input-error': errors.password }"
                :placeholder="t('auth.createPasswordPlaceholder')"
              />
              <button
                type="button"
                :disabled="registrationActionDisabled"
                @click="showPassword = !showPassword"
                class="register-password-toggle"
                :aria-label="showPassword ? t('auth.registerShell.hidePassword') : t('auth.registerShell.showPassword')"
              >
                <Icon v-if="showPassword" name="eyeOff" size="md" />
                <Icon v-else name="eye" size="md" />
              </button>
            </div>
            <p class="register-input-hint">
              {{ t('auth.passwordHint') }}
            </p>
          </div>

          <div v-if="invitationCodeEnabled">
            <label for="invitation_code" class="input-label">
              {{ t('auth.invitationCodeLabel') }}
            </label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Icon
                  name="key"
                  size="md"
                  :class="invitationValidation.valid ? 'text-green-500' : 'text-gray-400 dark:text-dark-500'"
                />
              </div>
              <input
                id="invitation_code"
                v-model="formData.invitation_code"
                type="text"
                :disabled="registrationActionDisabled"
                class="input pl-11 pr-10"
                :class="{
                  'register-input-valid': invitationValidation.valid,
                  'register-input-error': invitationValidation.invalid || errors.invitation_code
                }"
                :placeholder="t('auth.invitationCodePlaceholder')"
                @input="handleInvitationCodeInput"
              />
              <div v-if="invitationValidating" class="register-field-status">
                <svg class="h-4 w-4 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div v-else-if="invitationValidation.valid" class="register-field-status">
                <Icon name="checkCircle" size="md" class="text-green-500" />
              </div>
              <div v-else-if="invitationValidation.invalid || errors.invitation_code" class="register-field-status">
                <Icon name="exclamationCircle" size="md" class="text-red-500" />
              </div>
            </div>
            <transition name="fade">
              <div v-if="invitationValidation.valid" class="register-field-note register-field-note-success">
                <Icon name="checkCircle" size="sm" />
                {{ t('auth.invitationCodeValid') }}
              </div>
            </transition>
          </div>

          <div v-if="promoCodeEnabled">
            <label for="promo_code" class="input-label">
              {{ t('auth.promoCodeLabel') }}
              <span class="register-optional">({{ t('common.optional') }})</span>
            </label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Icon
                  name="gift"
                  size="md"
                  :class="promoValidation.valid ? 'text-green-500' : 'text-gray-400 dark:text-dark-500'"
                />
              </div>
              <input
                id="promo_code"
                v-model="formData.promo_code"
                type="text"
                :disabled="registrationActionDisabled"
                class="input pl-11 pr-10"
                :class="{
                  'register-input-valid': promoValidation.valid,
                  'register-input-error': promoValidation.invalid
                }"
                :placeholder="t('auth.promoCodePlaceholder')"
                @input="handlePromoCodeInput"
              />
              <div v-if="promoValidating" class="register-field-status">
                <svg class="h-4 w-4 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div v-else-if="promoValidation.valid" class="register-field-status">
                <Icon name="checkCircle" size="md" class="text-green-500" />
              </div>
              <div v-else-if="promoValidation.invalid" class="register-field-status">
                <Icon name="exclamationCircle" size="md" class="text-red-500" />
              </div>
            </div>
            <transition name="fade">
              <div v-if="promoValidation.valid" class="register-field-note register-field-note-success">
                <Icon name="gift" size="sm" />
                {{ t('auth.promoCodeValid', { amount: promoValidation.bonusAmount?.toFixed(2) }) }}
              </div>
            </transition>
          </div>

          <div v-if="turnstileEnabled && turnstileSiteKey" class="register-turnstile">
            <TurnstileWidget
              ref="turnstileRef"
              :site-key="turnstileSiteKey"
              @verify="onTurnstileVerify"
              @expire="onTurnstileExpire"
              @error="onTurnstileError"
            />
          </div>

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

          <button
            type="submit"
            :disabled="registrationActionDisabled || (turnstileEnabled && !turnstileToken)"
            class="btn btn-primary register-submit w-full"
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
            <Icon v-else name="userPlus" size="md" class="mr-2" />
            {{
              isLoading
                ? t('auth.processing')
                : emailVerifyEnabled
                  ? t('auth.continue')
                  : t('auth.createAccount')
            }}
          </button>
        </form>

        <div v-if="showOAuthLogin" class="register-oauth">
          <div class="register-divider">
            <span>{{ t('auth.oauthOrContinue') }}</span>
          </div>

          <EmailOAuthButtons
            :disabled="registrationActionDisabled"
            :aff-code="formData.aff_code"
            :github-enabled="githubOAuthEnabled"
            :google-enabled="googleOAuthEnabled"
            :show-divider="false"
          />

          <LinuxDoOAuthSection
            v-if="linuxdoOAuthEnabled"
            :disabled="registrationActionDisabled"
            :aff-code="formData.aff_code"
            :show-divider="false"
          />
          <WechatOAuthSection
            v-if="wechatOAuthEnabled"
            :disabled="registrationActionDisabled"
            :aff-code="formData.aff_code"
            :show-divider="false"
          />
          <OidcOAuthSection
            v-if="oidcOAuthEnabled"
            :disabled="registrationActionDisabled"
            :provider-name="oidcOAuthProviderName"
            :aff-code="formData.aff_code"
            :show-divider="false"
          />
        </div>

        <p class="register-login">
          <span>{{ t('auth.alreadyHaveAccount') }}</span>
          <router-link to="/login">
            {{ t('auth.signIn') }}
          </router-link>
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LinuxDoOAuthSection from '@/components/auth/LinuxDoOAuthSection.vue'
import OidcOAuthSection from '@/components/auth/OidcOAuthSection.vue'
import WechatOAuthSection from '@/components/auth/WechatOAuthSection.vue'
import EmailOAuthButtons from '@/components/auth/EmailOAuthButtons.vue'
import LoginAgreementPrompt from '@/components/auth/LoginAgreementPrompt.vue'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'
import TurnstileWidget from '@/components/TurnstileWidget.vue'
import { useAuthStore, useAppStore } from '@/stores'
import {
  getPublicSettings,
  isWeChatWebOAuthEnabled,
  validatePromoCode,
  validateInvitationCode
} from '@/api/auth'
import { buildAuthErrorMessage } from '@/utils/authError'
import {
  formatRegistrationEmailSuffixWhitelistForMessage,
  isRegistrationEmailSuffixAllowed,
  normalizeRegistrationEmailSuffixWhitelist
} from '@/utils/registrationEmailPolicy'
import {
  clearAffiliateReferralCode,
  loadAffiliateReferralCode,
  resolveAffiliateReferralCode
} from '@/utils/oauthAffiliate'
import type { LoginAgreementDocument } from '@/types'

const { t, locale } = useI18n()
const LOGIN_AGREEMENT_STORAGE_KEY = 'sub2api_login_agreement_consent'

// ==================== Router & Stores ====================

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const appStore = useAppStore()

// ==================== State ====================

const isLoading = ref<boolean>(false)
const settingsLoaded = ref<boolean>(false)
const errorMessage = ref<string>('')
const showPassword = ref<boolean>(false)
const isDark = ref(document.documentElement.classList.contains('dark'))

// Public settings
const registrationEnabled = ref<boolean>(true)
const emailVerifyEnabled = ref<boolean>(false)
const promoCodeEnabled = ref<boolean>(true)
const invitationCodeEnabled = ref<boolean>(false)
const turnstileEnabled = ref<boolean>(false)
const turnstileSiteKey = ref<string>('')
const siteName = ref<string>('Sub2API')
const linuxdoOAuthEnabled = ref<boolean>(false)
const wechatOAuthEnabled = ref<boolean>(false)
const oidcOAuthEnabled = ref<boolean>(false)
const oidcOAuthProviderName = ref<string>('OIDC')
const githubOAuthEnabled = ref<boolean>(false)
const googleOAuthEnabled = ref<boolean>(false)
const registrationEmailSuffixWhitelist = ref<string[]>([])
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

// Promo code validation
const promoValidating = ref<boolean>(false)
const promoValidation = reactive({
  valid: false,
  invalid: false,
  bonusAmount: null as number | null,
  message: ''
})
let promoValidateTimeout: ReturnType<typeof setTimeout> | null = null

// Invitation code validation
const invitationValidating = ref<boolean>(false)
const invitationValidation = reactive({
  valid: false,
  invalid: false,
  message: ''
})
let invitationValidateTimeout: ReturnType<typeof setTimeout> | null = null

const formData = reactive({
  email: '',
  password: '',
  promo_code: '',
  invitation_code: '',
  aff_code: ''
})

const errors = reactive({
  email: '',
  password: '',
  turnstile: '',
  invitation_code: ''
})

const validationToastMessage = computed(() =>
  errors.email ||
  errors.password ||
  (invitationValidation.invalid ? invitationValidation.message : '') ||
  errors.invitation_code ||
  (promoValidation.invalid ? promoValidation.message : '') ||
  errors.turnstile ||
  ''
)

const showOAuthLogin = computed(
  () =>
    linuxdoOAuthEnabled.value ||
    wechatOAuthEnabled.value ||
    oidcOAuthEnabled.value ||
    githubOAuthEnabled.value ||
    googleOAuthEnabled.value
)

const agreementGateActive = computed(
  () => loginAgreementEnabled.value && !agreementAccepted.value
)

const registrationActionDisabled = computed(
  () => isLoading.value || !settingsLoaded.value || agreementGateActive.value
)

const registerSteps = computed(() => [
  {
    code: '01',
    title: t('auth.registerShell.steps.identity.title'),
    desc: t('auth.registerShell.steps.identity.desc')
  },
  {
    code: '02',
    title: t('auth.registerShell.steps.policy.title'),
    desc: t('auth.registerShell.steps.policy.desc')
  },
  {
    code: '03',
    title: t('auth.registerShell.steps.ready.title'),
    desc: t('auth.registerShell.steps.ready.desc')
  }
])

const registerHighlights = computed(() => [
  {
    code: 'ACCESS',
    title: t('auth.registerShell.highlights.access.title'),
    desc: t('auth.registerShell.highlights.access.desc')
  },
  {
    code: 'QUOTA',
    title: t('auth.registerShell.highlights.quota.title'),
    desc: t('auth.registerShell.highlights.quota.desc')
  },
  {
    code: 'ROUTE',
    title: t('auth.registerShell.highlights.route.title'),
    desc: t('auth.registerShell.highlights.route.desc')
  }
])

watch(validationToastMessage, (value, previousValue) => {
  if (value && value !== previousValue) {
    appStore.showError(value)
  }
})

function syncAffiliateReferralCode(): string {
  const code = resolveAffiliateReferralCode(route.query.aff, route.query.aff_code)
  if (code) {
    formData.aff_code = code
  }
  return code
}

// ==================== Lifecycle ====================

onMounted(async () => {
  initTheme()
  syncAffiliateReferralCode()

  try {
    const settings = await getPublicSettings()
    registrationEnabled.value = settings.registration_enabled
    emailVerifyEnabled.value = settings.email_verify_enabled
    promoCodeEnabled.value = settings.promo_code_enabled
    invitationCodeEnabled.value = settings.invitation_code_enabled
    turnstileEnabled.value = settings.turnstile_enabled
    turnstileSiteKey.value = settings.turnstile_site_key || ''
    siteName.value = settings.site_name || 'Sub2API'
    linuxdoOAuthEnabled.value = settings.linuxdo_oauth_enabled
    wechatOAuthEnabled.value = isWeChatWebOAuthEnabled(settings)
    oidcOAuthEnabled.value = settings.oidc_oauth_enabled
    oidcOAuthProviderName.value = settings.oidc_oauth_provider_name || 'OIDC'
    githubOAuthEnabled.value = settings.github_oauth_enabled
    googleOAuthEnabled.value = settings.google_oauth_enabled
    registrationEmailSuffixWhitelist.value = normalizeRegistrationEmailSuffixWhitelist(
      settings.registration_email_suffix_whitelist || []
    )
    applyLoginAgreementSettings(settings)

    // Read promo code from URL parameter only if promo code is enabled
    if (promoCodeEnabled.value) {
      const promoParam = route.query.promo as string
      if (promoParam) {
        formData.promo_code = promoParam
        // Validate the promo code from URL
        await validatePromoCodeDebounced(promoParam)
      }
    }
    syncAffiliateReferralCode()
  } catch (error) {
    console.error('Failed to load public settings:', error)
    loginAgreementEnabled.value = false
    agreementAccepted.value = true
  } finally {
    settingsLoaded.value = true
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

watch(
  () => [route.query.aff, route.query.aff_code],
  () => {
    syncAffiliateReferralCode()
  }
)

onUnmounted(() => {
  if (promoValidateTimeout) {
    clearTimeout(promoValidateTimeout)
  }
  if (invitationValidateTimeout) {
    clearTimeout(invitationValidateTimeout)
  }
})

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
  appStore.showWarning(t('legal.loginAgreementPrompt.registerRejectedWarning'))
}

// ==================== Promo Code Validation ====================

function handlePromoCodeInput(): void {
  const code = formData.promo_code.trim()

  // Clear previous validation
  promoValidation.valid = false
  promoValidation.invalid = false
  promoValidation.bonusAmount = null
  promoValidation.message = ''

  if (!code) {
    promoValidating.value = false
    return
  }

  // Debounce validation
  if (promoValidateTimeout) {
    clearTimeout(promoValidateTimeout)
  }

  promoValidateTimeout = setTimeout(() => {
    validatePromoCodeDebounced(code)
  }, 500)
}

async function validatePromoCodeDebounced(code: string): Promise<void> {
  if (!code.trim()) return

  promoValidating.value = true

  try {
    const result = await validatePromoCode(code)

    if (result.valid) {
      promoValidation.valid = true
      promoValidation.invalid = false
      promoValidation.bonusAmount = result.bonus_amount || 0
      promoValidation.message = ''
    } else {
      promoValidation.valid = false
      promoValidation.invalid = true
      promoValidation.bonusAmount = null
      // 根据错误码显示对应的翻译
      promoValidation.message = getPromoErrorMessage(result.error_code)
    }
  } catch (error) {
    console.error('Failed to validate promo code:', error)
    promoValidation.valid = false
    promoValidation.invalid = true
    promoValidation.message = t('auth.promoCodeInvalid')
  } finally {
    promoValidating.value = false
  }
}

function getPromoErrorMessage(errorCode?: string): string {
  switch (errorCode) {
    case 'PROMO_CODE_NOT_FOUND':
      return t('auth.promoCodeNotFound')
    case 'PROMO_CODE_EXPIRED':
      return t('auth.promoCodeExpired')
    case 'PROMO_CODE_DISABLED':
      return t('auth.promoCodeDisabled')
    case 'PROMO_CODE_MAX_USED':
      return t('auth.promoCodeMaxUsed')
    case 'PROMO_CODE_ALREADY_USED':
      return t('auth.promoCodeAlreadyUsed')
    default:
      return t('auth.promoCodeInvalid')
  }
}

// ==================== Invitation Code Validation ====================

function handleInvitationCodeInput(): void {
  const code = formData.invitation_code.trim()

  // Clear previous validation
  invitationValidation.valid = false
  invitationValidation.invalid = false
  invitationValidation.message = ''
  errors.invitation_code = ''

  if (!code) {
    return
  }

  // Debounce validation
  if (invitationValidateTimeout) {
    clearTimeout(invitationValidateTimeout)
  }

  invitationValidateTimeout = setTimeout(() => {
    validateInvitationCodeDebounced(code)
  }, 500)
}

async function validateInvitationCodeDebounced(code: string): Promise<void> {
  invitationValidating.value = true

  try {
    const result = await validateInvitationCode(code)

    if (result.valid) {
      invitationValidation.valid = true
      invitationValidation.invalid = false
      invitationValidation.message = ''
    } else {
      invitationValidation.valid = false
      invitationValidation.invalid = true
      invitationValidation.message = getInvitationErrorMessage(result.error_code)
    }
  } catch {
    invitationValidation.valid = false
    invitationValidation.invalid = true
    invitationValidation.message = t('auth.invitationCodeInvalid')
  } finally {
    invitationValidating.value = false
  }
}

function getInvitationErrorMessage(errorCode?: string): string {
  switch (errorCode) {
    case 'INVITATION_CODE_NOT_FOUND':
      return t('auth.invitationCodeInvalid')
    case 'INVITATION_CODE_INVALID':
      return t('auth.invitationCodeInvalid')
    case 'INVITATION_CODE_USED':
      return t('auth.invitationCodeInvalid')
    case 'INVITATION_CODE_DISABLED':
      return t('auth.invitationCodeInvalid')
    default:
      return t('auth.invitationCodeInvalid')
  }
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

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function buildEmailSuffixNotAllowedMessage(): string {
  const normalizedWhitelist = normalizeRegistrationEmailSuffixWhitelist(
    registrationEmailSuffixWhitelist.value
  )
  if (normalizedWhitelist.length === 0) {
    return t('auth.emailSuffixNotAllowed')
  }
  const separator = String(locale.value || '').toLowerCase().startsWith('zh') ? '、' : ', '
  return t('auth.emailSuffixNotAllowedWithAllowed', {
    suffixes: formatRegistrationEmailSuffixWhitelistForMessage(normalizedWhitelist, {
      separator,
      more: (count) => t('auth.emailSuffixAllowedMore', { count })
    })
  })
}

function validateForm(): boolean {
  // Reset errors
  errors.email = ''
  errors.password = ''
  errors.turnstile = ''
  errors.invitation_code = ''

  let isValid = true

  if (agreementGateActive.value) {
    appStore.showWarning(t('legal.loginAgreementPrompt.registerRequiredWarning'))
    if (loginAgreementMode.value !== 'checkbox') {
      showAgreementModal.value = true
    }
    return false
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = t('auth.emailRequired')
    isValid = false
  } else if (!validateEmail(formData.email)) {
    errors.email = t('auth.invalidEmail')
    isValid = false
  } else if (
    !isRegistrationEmailSuffixAllowed(formData.email, registrationEmailSuffixWhitelist.value)
  ) {
    errors.email = buildEmailSuffixNotAllowedMessage()
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

  // Invitation code validation (required when enabled)
  if (invitationCodeEnabled.value) {
    if (!formData.invitation_code.trim()) {
      errors.invitation_code = t('auth.invitationCodeRequired')
      isValid = false
    }
  }

  // Turnstile validation
  if (turnstileEnabled.value && !turnstileToken.value) {
    errors.turnstile = t('auth.completeVerification')
    isValid = false
  }

  return isValid
}

// ==================== Form Handlers ====================

async function handleRegister(): Promise<void> {
  // Clear previous error
  errorMessage.value = ''

  // Validate form
  if (!validateForm()) {
    return
  }

  // Check promo code validation status
  if (formData.promo_code.trim()) {
    // If promo code is being validated, wait
    if (promoValidating.value) {
      errorMessage.value = t('auth.promoCodeValidating')
      return
    }
    // If promo code is invalid, block submission
    if (promoValidation.invalid) {
      errorMessage.value = t('auth.promoCodeInvalidCannotRegister')
      return
    }
  }

  // Check invitation code validation status (if enabled and code provided)
  if (invitationCodeEnabled.value) {
    // If still validating, wait
    if (invitationValidating.value) {
      errorMessage.value = t('auth.invitationCodeValidating')
      return
    }
    // If invitation code is invalid, block submission
    if (invitationValidation.invalid) {
      errorMessage.value = t('auth.invitationCodeInvalidCannotRegister')
      return
    }
    // If invitation code is required but not validated yet
    if (formData.invitation_code.trim() && !invitationValidation.valid) {
      errorMessage.value = t('auth.invitationCodeValidating')
      // Trigger validation
      await validateInvitationCodeDebounced(formData.invitation_code.trim())
      if (!invitationValidation.valid) {
        errorMessage.value = t('auth.invitationCodeInvalidCannotRegister')
        return
      }
    }
  }

  isLoading.value = true

  try {
    const affCode = formData.aff_code.trim() || loadAffiliateReferralCode()
    if (affCode) {
      formData.aff_code = affCode
    }

    // If email verification is enabled, redirect to verification page
    if (emailVerifyEnabled.value) {
      // Store registration data in sessionStorage
      sessionStorage.setItem(
        'register_data',
        JSON.stringify({
          email: formData.email,
          password: formData.password,
          turnstile_token: turnstileToken.value,
          promo_code: formData.promo_code || undefined,
          invitation_code: formData.invitation_code || undefined,
          ...(affCode ? { aff_code: affCode } : {})
        })
      )

      // Navigate to email verification page
      await router.push('/email-verify')
      return
    }

    // Otherwise, directly register
    await authStore.register({
      email: formData.email,
      password: formData.password,
      turnstile_token: turnstileEnabled.value ? turnstileToken.value : undefined,
      promo_code: formData.promo_code || undefined,
      invitation_code: formData.invitation_code || undefined,
      ...(affCode ? { aff_code: affCode } : {})
    })
    clearAffiliateReferralCode()

    // Show success toast
    appStore.showSuccess(t('auth.accountCreatedSuccess', { siteName: siteName.value }))

    // Redirect to dashboard
    await router.push('/dashboard')
  } catch (error: unknown) {
    // Reset Turnstile on error
    if (turnstileRef.value) {
      turnstileRef.value.reset()
      turnstileToken.value = ''
    }

    // Handle registration error
    errorMessage.value = buildAuthErrorMessage(error, {
      fallback: t('auth.registrationFailed')
    })

    // Also show error toast
    appStore.showError(errorMessage.value)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.codex-register {
  --register-bg: #f6f8f7;
  --register-surface: #ffffff;
  --register-surface-soft: #eef3f1;
  --register-ink: #111312;
  --register-muted: #626d68;
  --register-line: #dbe5e0;
  --register-dark: #0f1412;
  --register-mint: #14b981;
  --register-blue: #2563eb;
  --register-coral: #f05a4f;
  --register-amber: #c8841c;
  --register-shadow: 0 22px 60px rgba(16, 24, 21, 0.08);
  min-height: 100vh;
  overflow-x: hidden;
  background:
    linear-gradient(90deg, rgba(17, 19, 18, 0.035) 1px, transparent 1px),
    linear-gradient(180deg, #ffffff 0%, var(--register-bg) 42%, #f0f4f2 100%);
  background-size: 80px 80px, auto;
  color: var(--register-ink);
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

:global(.dark) .codex-register {
  --register-bg: #080d0b;
  --register-surface: #101714;
  --register-surface-soft: #16221d;
  --register-ink: #f3f7f5;
  --register-muted: #9cacaa;
  --register-line: #20302a;
  --register-dark: #eef6f2;
  --register-mint: #25d79b;
  --register-blue: #6ea8ff;
  --register-coral: #ff7b70;
  --register-amber: #f0b85b;
  --register-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(180deg, #070b0a 0%, var(--register-bg) 48%, #0c1210 100%);
  background-size: 80px 80px, auto;
}

.register-header,
.register-main {
  width: min(100% - 48px, 1180px);
  margin: 0 auto;
}

.register-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  min-height: 72px;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  border-bottom: 1px solid var(--register-line);
  background: color-mix(in srgb, var(--register-bg) 88%, transparent);
  backdrop-filter: blur(18px);
}

.register-brand {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 12px;
  color: inherit;
  text-decoration: none;
}

.register-logo {
  display: inline-flex;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--register-line);
  border-radius: 8px;
  background: var(--register-dark);
  color: var(--register-bg);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  font-weight: 900;
}

.register-brand-copy {
  display: grid;
  min-width: 0;
  gap: 2px;
}

.register-brand-copy strong {
  color: var(--register-ink);
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 0;
}

.register-brand-copy small {
  color: var(--register-muted);
  font-size: 12px;
}

.register-header-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.register-header-button,
.register-header-actions :deep(> .relative > button) {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--register-line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--register-surface) 82%, transparent);
  color: var(--register-ink);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1;
  padding: 0 12px;
  text-decoration: none;
  transition:
    background 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.register-header-actions :deep(> .relative > button) {
  gap: 6px;
}

.register-header-button:hover,
.register-header-actions :deep(> .relative > button:hover) {
  background: var(--register-surface-soft);
  color: var(--register-ink);
  transform: translateY(-1px);
}

.register-main {
  display: grid;
  min-height: calc(100vh - 72px);
  grid-template-columns: minmax(0, 1fr) minmax(390px, 470px);
  gap: 38px;
  align-items: center;
  padding: 48px 0 64px;
}

.register-story {
  display: grid;
  align-content: center;
}

.register-pill {
  display: inline-flex;
  width: fit-content;
  min-height: 36px;
  align-items: center;
  gap: 9px;
  margin: 0 0 18px;
  border: 1px solid var(--register-line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--register-surface) 84%, transparent);
  color: var(--register-muted);
  font-size: 13px;
  font-weight: 800;
  padding: 0 14px;
  box-shadow: var(--register-shadow);
}

.register-status-dot {
  display: inline-block;
  width: 9px;
  height: 9px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--register-mint);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--register-mint) 13%, transparent);
}

.register-story h1 {
  max-width: 720px;
  margin: 0;
  color: var(--register-ink);
  font-size: 58px;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.06;
}

.register-lede {
  max-width: 640px;
  margin: 20px 0 0;
  color: var(--register-muted);
  font-size: 17px;
  line-height: 1.85;
}

.register-process {
  overflow: hidden;
  max-width: 660px;
  margin-top: 30px;
  border: 1px solid var(--register-dark);
  border-radius: 8px;
  background: #0d1210;
  box-shadow: var(--register-shadow);
  color: #e8f7ef;
}

.register-process-bar {
  display: flex;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 18px;
}

.register-process-bar strong,
.register-process-bar span,
.register-process-list article span {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0;
}

.register-process-bar strong {
  color: #93a39c;
}

.register-process-bar span,
.register-process-list article span {
  color: var(--register-mint);
}

.register-process-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.register-process-list article {
  display: grid;
  min-height: 176px;
  align-content: center;
  gap: 10px;
  background: #0d1210;
  padding: 20px;
}

.register-process-list article strong {
  color: #ffffff;
  font-size: 17px;
  font-weight: 900;
}

.register-process-list article p {
  margin: 0;
  color: #92a49c;
  font-size: 13px;
  line-height: 1.7;
}

.register-highlight-grid {
  display: grid;
  max-width: 660px;
  margin-top: 18px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.register-highlight-grid article {
  display: grid;
  min-height: 142px;
  align-content: start;
  gap: 9px;
  border: 1px solid var(--register-line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--register-surface) 88%, transparent);
  box-shadow: var(--register-shadow);
  padding: 18px;
}

.register-highlight-grid span {
  color: var(--register-coral);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 900;
}

.register-highlight-grid strong {
  color: var(--register-ink);
  font-size: 16px;
  font-weight: 900;
}

.register-highlight-grid p {
  margin: 0;
  color: var(--register-muted);
  font-size: 13px;
  line-height: 1.65;
}

.register-panel {
  border: 1px solid var(--register-line);
  border-radius: 8px;
  background: color-mix(in srgb, var(--register-surface) 92%, transparent);
  box-shadow: var(--register-shadow);
  padding: 34px;
}

.register-panel-head {
  margin-bottom: 24px;
}

.register-panel-head span {
  color: var(--register-mint);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

.register-panel-head h2 {
  margin: 10px 0 0;
  color: var(--register-ink);
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.18;
}

.register-panel-head p {
  margin: 10px 0 0;
  color: var(--register-muted);
  font-size: 14px;
  line-height: 1.75;
}

.register-alert,
.register-disabled {
  border: 1px solid color-mix(in srgb, var(--register-coral) 36%, var(--register-line));
  border-radius: 8px;
  background: color-mix(in srgb, var(--register-coral) 9%, var(--register-surface));
}

.register-alert {
  margin-bottom: 18px;
  color: var(--register-ink);
  font-size: 13px;
  line-height: 1.55;
  padding: 12px 14px;
}

.register-disabled {
  display: grid;
  justify-items: start;
  gap: 13px;
  padding: 20px;
}

.register-disabled-icon {
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--register-coral) 35%, var(--register-line));
  border-radius: 8px;
  background: var(--register-surface);
  color: var(--register-coral);
}

.register-disabled strong {
  color: var(--register-ink);
  font-size: 18px;
  font-weight: 900;
}

.register-disabled p {
  margin: 0;
  color: var(--register-muted);
  font-size: 14px;
  line-height: 1.75;
}

.register-secondary-action {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--register-line);
  border-radius: 8px;
  background: var(--register-surface);
  color: var(--register-ink);
  font-size: 13px;
  font-weight: 900;
  padding: 0 14px;
  text-decoration: none;
}

.register-form {
  display: grid;
  gap: 18px;
}

.register-form :deep(.input-label) {
  display: inline-flex;
  margin-bottom: 8px;
  color: var(--register-ink);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0;
}

.register-form :deep(.input) {
  min-height: 50px;
  border: 1px solid var(--register-line);
  border-radius: 8px;
  background: var(--register-surface);
  color: var(--register-ink);
  font-size: 14px;
  font-weight: 600;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}

.register-form :deep(.input::placeholder) {
  color: color-mix(in srgb, var(--register-muted) 72%, transparent);
  font-weight: 500;
}

.register-form :deep(.input:focus) {
  border-color: var(--register-dark);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--register-dark) 10%, transparent);
}

.register-form :deep(.input:disabled) {
  cursor: not-allowed;
  opacity: 0.66;
}

.register-form :deep(.input-error),
.register-input-error {
  border-color: var(--register-coral) !important;
}

.register-input-valid {
  border-color: var(--register-mint) !important;
}

.register-input-hint {
  margin: 8px 0 0;
  color: var(--register-muted);
  font-size: 12px;
  line-height: 1.5;
}

.register-optional {
  margin-left: 6px;
  color: var(--register-muted);
  font-size: 12px;
  font-weight: 600;
}

.register-password-toggle,
.register-field-status {
  position: absolute;
  inset: 0 0 0 auto;
  display: inline-flex;
  width: 44px;
  align-items: center;
  justify-content: center;
}

.register-password-toggle {
  color: var(--register-muted);
  transition: color 180ms ease;
}

.register-password-toggle:hover {
  color: var(--register-ink);
}

.register-field-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  border: 1px solid var(--register-line);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
  padding: 10px 12px;
}

.register-field-note-success {
  border-color: color-mix(in srgb, var(--register-mint) 30%, var(--register-line));
  background: color-mix(in srgb, var(--register-mint) 10%, var(--register-surface));
  color: color-mix(in srgb, var(--register-mint) 70%, var(--register-ink));
}

.register-turnstile {
  display: grid;
  justify-items: center;
}

.register-submit {
  min-height: 50px;
  border: 0;
  border-radius: 8px;
  background: var(--register-dark) !important;
  color: var(--register-bg) !important;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0;
  box-shadow: 0 16px 38px rgba(17, 19, 18, 0.16);
  transition:
    opacity 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;
}

:global(.dark) .register-submit {
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.34);
}

.register-submit:hover:not(:disabled) {
  transform: translateY(-1px);
}

.register-submit:disabled {
  cursor: not-allowed;
  opacity: 0.55;
  transform: none;
}

.register-oauth {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.register-oauth :deep(button),
.register-oauth :deep(a) {
  border-radius: 8px;
}

.register-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--register-muted);
  font-size: 12px;
  font-weight: 800;
}

.register-divider::before,
.register-divider::after {
  display: block;
  height: 1px;
  flex: 1;
  background: var(--register-line);
  content: "";
}

.register-login {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin: 22px 0 0;
  color: var(--register-muted);
  font-size: 14px;
}

.register-login a {
  color: var(--register-blue);
  font-weight: 900;
  text-decoration: none;
}

.register-login a:hover {
  color: var(--register-ink);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1040px) {
  .register-main {
    grid-template-columns: 1fr;
    align-items: start;
    padding-top: 36px;
  }

  .register-story,
  .register-panel {
    width: min(100%, 720px);
    margin: 0 auto;
  }

  .register-story h1,
  .register-lede,
  .register-process,
  .register-highlight-grid {
    max-width: none;
  }
}

@media (max-width: 760px) {
  .register-header,
  .register-main {
    width: min(100% - 32px, 1180px);
  }

  .register-header {
    position: relative;
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 16px 0;
  }

  .register-header-actions {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .register-main {
    min-height: auto;
    gap: 26px;
    padding: 28px 0 42px;
  }

  .register-story h1 {
    font-size: 38px;
  }

  .register-lede {
    font-size: 15px;
    line-height: 1.75;
  }

  .register-process-list,
  .register-highlight-grid {
    grid-template-columns: 1fr;
  }

  .register-process-list article,
  .register-highlight-grid article {
    min-height: 0;
  }

  .register-process-list article {
    padding: 18px;
  }

  .register-panel {
    padding: 24px;
  }
}

@media (max-width: 460px) {
  .register-brand-copy small {
    display: none;
  }

  .register-header-actions {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 100%;
  }

  .register-header-actions :deep(> .relative),
  .register-header-actions :deep(> .relative > button),
  .register-header-button {
    width: 100%;
  }

  .register-story h1 {
    font-size: 32px;
  }

  .register-process-bar {
    display: grid;
    align-content: center;
    gap: 6px;
    padding: 12px 16px;
  }

  .register-panel {
    padding: 20px;
  }
}
</style>
