export default {
  batchImageGuide: {
    title: 'Batch Image Generation',
    description: 'Submit multiple prompts in one job and download the generated images when complete'
  },
  // Home Page
  home: {
    viewOnGithub: 'View on GitHub',
    viewDocs: 'View Documentation',
    docs: 'Docs',
    switchToLight: 'Switch to Light Mode',
    switchToDark: 'Switch to Dark Mode',
    dashboard: 'Dashboard',
    login: 'Login',
    getStarted: 'Get Started',
    goToDashboard: 'Go to Dashboard',
    station: {
      product: 'Codex Gateway',
      brandLine: 'Codex Gateway',
      notice: 'Codex gateway is ready: compatible with /v1, OpenAI SDKs, Codex CLI, and common developer plugins.',
      nav: {
        pricing: 'Pricing',
        features: 'Advantages',
        workflows: 'Workflows',
        faq: 'FAQ'
      },
      actions: {
        docs: 'Docs',
        light: 'Light',
        dark: 'Dark'
      },
      hero: {
        status: 'Online · multi-upstream routing available',
        eyebrow: 'For Codex, Claude Code, and development teams',
        titleA: 'A Codex gateway,',
        titleB: 'one API for every coding model.',
        description: 'The gateway turns OpenAI, Claude, Gemini, Antigravity, and custom upstreams into one access point: one key, transparent metering, sticky sessions, account-pool routing, and automatic fallback.',
        primaryCta: 'Start Now',
        secondaryCta: 'View Guide',
        consoleTitle: 'Route Console',
        consoleBadge: 'AI Gateway'
      },
      models: {
        ready: 'ready',
        standby: 'standby',
        codex: 'Codex and OpenAI-compatible lane',
        claude: 'Claude Code long-context workflows',
        gemini: 'Gemini Pro and OAuth account pools',
        antigravity: 'Antigravity client bridge'
      },
      console: {
        policy: {
          title: 'Policy routing',
          desc: 'Choose paths by model, group, health, and quota.'
        },
        pool: {
          title: 'Account pools',
          desc: 'Turn multiple upstream accounts into reliable capacity.'
        },
        meter: {
          title: 'Metered archive',
          desc: 'Requests, cost, quota, and errors land in one record.'
        }
      },
      pricing: {
        title: 'Transparent pricing',
        description: 'Put billing principles near the top so trial users know what to expect. Support credit-based, group-based, and custom plans.',
        rows: {
          mode: {
            label: 'Billing mode',
            value: 'Usage or plans'
          },
          rate: {
            label: 'Rate rules',
            value: 'Clearly shown'
          },
          limit: {
            label: 'Quota control',
            value: 'Key / group / user'
          }
        }
      },
      support: {
        title: 'Need help',
        description: 'Keep guides, docs, and support close to the purchase path so CLI and remote-server setup stays easy.',
        label: 'Support',
        value: 'Docs + console + GitHub'
      },
      spec: {
        title: 'Technical specs',
        items: {
          security: {
            title: 'Security',
            desc: 'Expose platform keys externally while upstream accounts stay centrally managed and isolated.'
          },
          compat: {
            title: 'Compatibility',
            desc: 'Works with OpenAI SDKs, Codex CLI, developer plugins, and common /v1 calls.'
          },
          failover: {
            title: 'Auto fallback',
            desc: 'Switch paths by policy when an upstream fails, without changing client settings.'
          },
          audit: {
            title: 'Audit',
            desc: 'Track usage, models, groups, and error states so teams can review operations.'
          }
        }
      },
      flow: {
        kicker: 'Why Codex Gateway',
        title: 'Five things developers care about, explained on one homepage.',
        description: 'The information rhythm follows long AI coding homepages, but the proof points belong to a Codex gateway: stability, transparency, compatibility, team control, and fallback.',
        items: {
          stable: {
            title: 'Stable fidelity',
            desc: 'Put upstream accounts behind health checks and route policies to reduce single-account limits, drops, and latency swings.',
            tags: {
              official: 'Official lanes',
              health: 'Health checks',
              lowLatency: 'Low latency'
            }
          },
          billing: {
            title: 'Clear metering',
            desc: 'Every call maps to a key, group, model, and cost record so teams can manage spend without guessing.',
            tags: {
              quota: 'Quota caps',
              detail: 'Billing detail',
              export: 'Usage export'
            }
          },
          compat: {
            title: 'Native compatibility',
            desc: 'Keep an OpenAI-style API entry so Codex CLI, SDKs, plugins, and remote servers need minimal config changes.',
            tags: {
              cli: 'Codex CLI',
              sdk: 'OpenAI SDK',
              plugin: 'Dev plugins'
            }
          },
          team: {
            title: 'Team control',
            desc: 'Bind members, projects, and models to different keys and group policies so permissions and budgets stay contained.',
            tags: {
              group: 'Groups',
              key: 'Keys',
              policy: 'Policies'
            }
          },
          fallback: {
            title: 'Failure fallback',
            desc: 'When one upstream is unavailable, the gateway switches to a standby path by rule to keep development flows moving.',
            tags: {
              auto: 'Auto switch',
              pool: 'Account pool',
              trace: 'Error trace'
            }
          }
        }
      },
      workflows: {
        kicker: 'Developer workflows',
        title: 'From personal CLI to team console, everything uses the same entry.',
        description: 'No fake testimonials. The page explains real use cases: local tools, remote servers, team projects, and cost review.',
        items: {
          cli: {
            title: 'Local Codex CLI',
            desc: 'Configure one base_url and API key locally while model switching, pools, and limits live in the platform.'
          },
          team: {
            title: 'Shared model pool',
            desc: 'Assign separate keys and budgets to projects while watching request volume, failure rate, and spend.'
          },
          ops: {
            title: 'Server scripts',
            desc: 'Remote tasks, CI scripts, and automation tools call multi-model capacity through an OpenAI-compatible interface.'
          },
          bill: {
            title: 'Cost review',
            desc: 'Review consumption by user, group, model, and date to quickly see where quota went.'
          }
        }
      },
      faq: {
        kicker: 'FAQ',
        title: 'Frequently asked questions',
        description: 'Common pre-purchase questions are surfaced early to make the first integration easier.',
        items: {
          rate: {
            question: 'How are rates and hidden fees handled?',
            answer: 'The console should show model rates, quota deductions, and plan rules clearly. This homepage promises transparency without hardcoding prices.'
          },
          codex: {
            question: 'Can it be used directly with Codex CLI?',
            answer: 'Yes. If the client supports an OpenAI-compatible base_url and API key, it can use the gateway through the /v1 path.'
          },
          remote: {
            question: 'How do remote servers or automation scripts connect?',
            answer: 'Point base_url to the gateway, replace the API key with a platform key, and most calls can stay unchanged.'
          },
          quota: {
            question: 'What happens when quota runs out?',
            answer: 'You can add credit, adjust group quota, or temporarily switch to a standby upstream policy in the console.'
          },
          provider: {
            question: 'Which upstream models are supported?',
            answer: 'The page presents Codex, OpenAI, Claude, Gemini, Antigravity, and custom OpenAI-compatible upstreams. Actual availability follows console configuration.'
          }
        }
      },
      cta: {
        kicker: 'Ready to connect',
        title: 'Bring scattered model accounts into one Codex gateway.',
        description: 'Create a key in the console, point the client base_url at the gateway, and let it handle routing, metering, and fallback.',
        button: 'Start Using'
      }
    },
    // User-focused value proposition
    heroSubtitle: 'One Key, All AI Models',
    heroDescription: 'No need to manage multiple subscriptions. Access Claude, GPT, Gemini and more with a single API key',
    tags: {
      subscriptionToApi: 'Subscription to API',
      stickySession: 'Session Persistence',
      realtimeBilling: 'Pay As You Go'
    },
    // Pain points section
    painPoints: {
      title: 'Sound Familiar?',
      items: {
        expensive: {
          title: 'High Subscription Costs',
          desc: 'Paying for multiple AI subscriptions that add up every month'
        },
        complex: {
          title: 'Account Chaos',
          desc: 'Managing scattered accounts and API keys across different platforms'
        },
        unstable: {
          title: 'Service Interruptions',
          desc: 'Single accounts hitting rate limits and disrupting your workflow'
        },
        noControl: {
          title: 'No Usage Control',
          desc: "Can't track where your money goes or limit team member usage"
        }
      }
    },
    // Solutions section
    solutions: {
      title: 'We Solve These Problems',
      subtitle: 'Three simple steps to stress-free AI access'
    },
    features: {
      unifiedGateway: 'One-Click Access',
      unifiedGatewayDesc: 'Get a single API key to call all connected AI models. No separate applications needed.',
      multiAccount: 'Always Reliable',
      multiAccountDesc: 'Smart routing across multiple upstream accounts with automatic failover. Say goodbye to errors.',
      balanceQuota: 'Pay What You Use',
      balanceQuotaDesc: 'Usage-based billing with quota limits. Full visibility into team consumption.'
    },
    // Comparison section
    comparison: {
      title: 'Why Choose Us?',
      headers: {
        feature: 'Comparison',
        official: 'Official Subscriptions',
        us: 'Our Platform'
      },
      items: {
        pricing: {
          feature: 'Pricing',
          official: 'Fixed monthly fee, pay even if unused',
          us: 'Pay only for what you use'
        },
        models: {
          feature: 'Model Selection',
          official: 'Single provider only',
          us: 'Switch between models freely'
        },
        management: {
          feature: 'Account Management',
          official: 'Manage each service separately',
          us: 'Unified key, one dashboard'
        },
        stability: {
          feature: 'Stability',
          official: 'Single account rate limits',
          us: 'Multi-account pool, auto-failover'
        },
        control: {
          feature: 'Usage Control',
          official: 'Not available',
          us: 'Quotas & detailed analytics'
        }
      }
    },
    providers: {
      title: 'Supported AI Models',
      description: 'One API, Multiple Choices',
      supported: 'Supported',
      soon: 'Soon',
      claude: 'Claude',
      gemini: 'Gemini',
      antigravity: 'Antigravity',
      more: 'More'
    },
    // CTA section
    cta: {
      title: 'Ready to Get Started?',
      description: 'Sign up now and get free trial credits to experience seamless AI access',
      button: 'Sign Up Free'
    },
    footer: {
      allRightsReserved: 'All rights reserved.'
    }
  },

  // Key Usage Query Page
  keyUsage: {
    title: 'API Key Usage',
    subtitle: 'Enter your API Key to view real-time spending and usage status',
    placeholder: 'sk-ant-mirror-xxxxxxxxxxxx',
    query: 'Query',
    querying: 'Querying...',
    privacyNote: 'Your Key is processed locally in the browser and will not be stored',
    dateRange: 'Date Range:',
    dateRangeToday: 'Today',
    dateRange7d: '7 Days',
    dateRange30d: '30 Days',
    dateRange90d: '90 Days',
    dateRangeCustom: 'Custom',
    apply: 'Apply',
    used: 'Used',
    detailInfo: 'Detail Information',
    tokenStats: 'Token Statistics',
    dailyDetail: 'Daily Detail',
    modelStats: 'Model Usage Statistics',
    // Table headers
    date: 'Date',
    model: 'Model',
    requests: 'Requests',
    inputTokens: 'Input Tokens',
    outputTokens: 'Output Tokens',
    cacheCreationTokens: 'Cache Creation',
    cacheReadTokens: 'Cache Read',
    cacheWriteTokens: 'Cache Write',
    totalTokens: 'Total Tokens',
    cost: 'Cost',
    // Status
    quotaMode: 'Key Quota Mode',
    walletBalance: 'Wallet Balance',
    // Ring card titles
    totalQuota: 'Total Quota',
    limit5h: '5-Hour Limit',
    limitDaily: 'Daily Limit',
    limit7d: '7-Day Limit',
    limitWeekly: 'Weekly Limit',
    limitMonthly: 'Monthly Limit',
    // Detail rows
    remainingQuota: 'Remaining Quota',
    expiresAt: 'Expires At',
    todayExpires: '(expires today)',
    daysLeft: '({days} days)',
    usedQuota: 'Used Quota',
    resetNow: 'Resetting soon',
    subscriptionType: 'Subscription Type',
    subscriptionExpires: 'Subscription Expires',
    // Usage stat cells
    todayRequests: 'Today Requests',
    todayInputTokens: 'Today Input',
    todayOutputTokens: 'Today Output',
    todayTokens: 'Today Tokens',
    todayCacheCreation: 'Today Cache Creation',
    todayCacheRead: 'Today Cache Read',
    todayCost: 'Today Cost',
    rpmTpm: 'RPM / TPM',
    totalRequests: 'Total Requests',
    totalInputTokens: 'Total Input',
    totalOutputTokens: 'Total Output',
    totalTokensLabel: 'Total Tokens',
    totalCacheCreation: 'Total Cache Creation',
    totalCacheRead: 'Total Cache Read',
    totalCost: 'Total Cost',
    avgDuration: 'Avg Duration',
    // Messages
    enterApiKey: 'Please enter an API Key',
    querySuccess: 'Query successful',
    queryFailed: 'Query failed',
    queryFailedRetry: 'Query failed, please try again later',
    noDailyUsage: 'No daily usage data',
  },

  // Setup Wizard
  setup: {
    title: 'Sub2API Setup',
    description: 'Configure your Sub2API instance',
    database: {
      title: 'Database Configuration',
      description: 'Connect to your PostgreSQL database',
      host: 'Host',
      port: 'Port',
      username: 'Username',
      password: 'Password',
      databaseName: 'Database Name',
      sslMode: 'SSL Mode',
      passwordPlaceholder: 'Password',
      ssl: {
        disable: 'Disable',
        require: 'Require',
        verifyCa: 'Verify CA',
        verifyFull: 'Verify Full'
      }
    },
    redis: {
      title: 'Redis Configuration',
      description: 'Connect to your Redis server',
      host: 'Host',
      port: 'Port',
      password: 'Password (optional)',
      database: 'Database',
      passwordPlaceholder: 'Password',
      enableTls: 'Enable TLS',
      enableTlsHint: 'Use TLS when connecting to Redis (public CA certs)'
    },
    admin: {
      title: 'Admin Account',
      description: 'Create your administrator account',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      passwordPlaceholder: 'Min 8 characters',
      confirmPasswordPlaceholder: 'Confirm password',
      passwordMismatch: 'Passwords do not match'
    },
    ready: {
      title: 'Ready to Install',
      description: 'Review your configuration and complete setup',
      database: 'Database',
      redis: 'Redis',
      adminEmail: 'Admin Email'
    },
    status: {
      testing: 'Testing...',
      success: 'Connection Successful',
      testConnection: 'Test Connection',
      installing: 'Installing...',
      completeInstallation: 'Complete Installation',
      completed: 'Installation completed!',
      redirecting: 'Redirecting to login page...',
      restarting: 'Service is restarting, please wait...',
      timeout: 'Service restart is taking longer than expected. Please refresh the page manually.'
    }
  },

  // Common
}
