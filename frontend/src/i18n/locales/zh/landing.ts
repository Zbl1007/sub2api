export default {
  batchImageGuide: {
    title: '图片批量生成',
    description: '一次提交多条提示词，任务完成后可统一下载图片结果'
  },
  // Home Page
  home: {
    viewOnGithub: '在 GitHub 上查看',
    viewDocs: '查看文档',
    docs: '文档',
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
    dashboard: '控制台',
    login: '登录',
    getStarted: '立即开始',
    goToDashboard: '进入控制台',
    station: {
      product: 'Codex 中转站',
      brandLine: 'Codex 中转站',
      notice: 'Codex 中转站已就绪：兼容 /v1、OpenAI SDK、Codex CLI 与常见开发插件。',
      nav: {
        pricing: '透明计费',
        features: '核心优势',
        workflows: '开发场景',
        faq: '常见问题'
      },
      actions: {
        docs: '文档',
        light: '浅色',
        dark: '深色'
      },
      hero: {
        status: 'Online · 多上游路由可用',
        eyebrow: '面向 Codex、Claude Code 和开发团队',
        titleA: 'Codex 中转站，',
        titleB: '一条 API 接入所有开发模型。',
        description: '这个网关把 OpenAI、Claude、Gemini、Antigravity 和自定义上游整理成统一入口：一把密钥、透明计量、会话保持、账号池调度和自动回退。',
        primaryCta: '立即使用',
        secondaryCta: '查看教程',
        consoleTitle: '路由控制台',
        consoleBadge: 'AI Gateway'
      },
      models: {
        ready: 'ready',
        standby: 'standby',
        codex: 'Codex 与 OpenAI 兼容通道',
        claude: 'Claude Code 长上下文工作流',
        gemini: 'Gemini Pro 与 OAuth 账号池',
        antigravity: 'Antigravity 客户端桥接'
      },
      console: {
        policy: {
          title: '策略路由',
          desc: '按模型、分组、账号健康和限额选择路径。'
        },
        pool: {
          title: '账号池调度',
          desc: '把多个上游整理成稳定的服务容量。'
        },
        meter: {
          title: '计量归档',
          desc: '请求、成本、配额和异常进入同一套记录。'
        }
      },
      pricing: {
        title: '透明定价',
        description: '首页直接说明计费原则，减少试用前的不确定感。支持按额度、按分组和自定义套餐管理。',
        rows: {
          mode: {
            label: '计费方式',
            value: '按量或套餐'
          },
          rate: {
            label: '倍率规则',
            value: '清晰展示'
          },
          limit: {
            label: '额度控制',
            value: '密钥 / 分组 / 用户'
          }
        }
      },
      support: {
        title: '遇到问题',
        description: '把教程、文档和支持入口放在购买路径旁边，远程服务器和 CLI 接入时不用来回找。',
        label: 'Support',
        value: '文档 + 控制台 + GitHub'
      },
      spec: {
        title: '技术规格',
        items: {
          security: {
            title: '安全',
            desc: '对外只暴露平台密钥，上游账号集中托管和隔离。'
          },
          compat: {
            title: '兼容性',
            desc: '兼容 OpenAI SDK、Codex CLI、开发插件和常见 /v1 调用。'
          },
          failover: {
            title: '自动回退',
            desc: '上游异常时按策略切换，客户端不需要改配置。'
          },
          audit: {
            title: '审计',
            desc: '用量、模型、分组和错误状态可追踪，方便团队复盘。'
          }
        }
      },
      flow: {
        kicker: '为什么选择 Codex 中转站',
        title: '开发者真正关心的五件事，首页一次讲清楚。',
        description: '参考长首页的信息节奏，但把内容改成 Codex 中转站自己的能力证明：稳定、透明、兼容、团队控制和故障回退。',
        items: {
          stable: {
            title: '稳定保真',
            desc: '把上游账号放进健康检查和路由策略里，减少单账号限流、掉线和响应波动。',
            tags: {
              official: '官方通道',
              health: '健康检查',
              lowLatency: '低延迟'
            }
          },
          billing: {
            title: '扣费透明',
            desc: '每次调用都能落到密钥、分组、模型和费用记录上，团队不用靠猜来控制成本。',
            tags: {
              quota: '配额上限',
              detail: '账单明细',
              export: '用量导出'
            }
          },
          compat: {
            title: '原生兼容',
            desc: '保持 OpenAI 风格 API 入口，让 Codex CLI、SDK、插件和远程服务器都能少改配置接入。',
            tags: {
              cli: 'Codex CLI',
              sdk: 'OpenAI SDK',
              plugin: '开发插件'
            }
          },
          team: {
            title: '团队可控',
            desc: '不同成员、项目和模型可以绑定不同密钥与分组策略，权限和预算更容易收住。',
            tags: {
              group: '分组',
              key: '密钥',
              policy: '策略'
            }
          },
          fallback: {
            title: '故障回退',
            desc: '当某个上游不可用时，网关按规则切换到备用路径，让正在跑的开发流程尽量不中断。',
            tags: {
              auto: '自动切换',
              pool: '账号池',
              trace: '异常记录'
            }
          }
        }
      },
      workflows: {
        kicker: '开发者场景',
        title: '从个人 CLI 到团队控制台，都走同一条入口。',
        description: '不伪造评价，用真实使用场景说明价值：你可以把网关放在本地、服务器、团队项目和成本管理流程里。',
        items: {
          cli: {
            title: '本地 Codex CLI',
            desc: '本地只配置一个 base_url 和 API Key，模型切换、账号池和限额由平台处理。'
          },
          team: {
            title: '团队共享模型池',
            desc: '给不同项目分配独立密钥和预算，统一观察请求量、失败率和费用。'
          },
          ops: {
            title: '服务器脚本接入',
            desc: '远程任务、CI 脚本和自动化工具通过 OpenAI 兼容接口调用多模型能力。'
          },
          bill: {
            title: '成本复盘',
            desc: '按用户、分组、模型和日期查看消耗，快速定位额度用在哪里。'
          }
        }
      },
      faq: {
        kicker: 'FAQ',
        title: '常见问题解答',
        description: '把购买前最常见的问题前置，和参考站一样降低第一次接入的犹豫。',
        items: {
          rate: {
            question: '倍率和隐藏收费怎么处理？',
            answer: '建议在控制台明确展示模型倍率、额度扣减和套餐规则；页面文案只承诺透明，不写死具体价格。'
          },
          codex: {
            question: '能直接给 Codex CLI 使用吗？',
            answer: '可以。只要客户端支持 OpenAI 兼容的 base_url 和 API Key，就可以接入网关的 /v1 路径。'
          },
          remote: {
            question: '远程服务器或自动化脚本怎么接？',
            answer: '把 base_url 指向网关地址，把 API Key 换成平台密钥，其他调用方式通常保持不变。'
          },
          quota: {
            question: '额度用完了怎么办？',
            answer: '可以在控制台补充额度、调整分组配额，或临时切换到备用上游策略。'
          },
          provider: {
            question: '支持哪些上游模型？',
            answer: '页面展示 Codex、OpenAI、Claude、Gemini、Antigravity 和自定义 OpenAI 兼容上游，实际以控制台配置为准。'
          }
        }
      },
      cta: {
        kicker: '准备接入',
        title: '把分散的模型账号，收进一个 Codex 中转站。',
        description: '先进入控制台创建密钥，再把客户端 base_url 指向网关地址。后续的路由、计量和回退都交给网关。',
        button: '开始使用'
      }
    },
    // 新增：面向用户的价值主张
    heroSubtitle: '一个密钥，畅用多个 AI 模型',
    heroDescription: '无需管理多个订阅账号，一站式接入 Claude、GPT、Gemini 等主流 AI 服务',
    tags: {
      subscriptionToApi: '订阅转 API',
      stickySession: '会话保持',
      realtimeBilling: '按量计费'
    },
    // 用户痛点区块
    painPoints: {
      title: '你是否也遇到这些问题？',
      items: {
        expensive: {
          title: '订阅费用高',
          desc: '每个 AI 服务都要单独订阅，每月支出越来越多'
        },
        complex: {
          title: '多账号难管理',
          desc: '不同平台的账号、密钥分散各处，管理起来很麻烦'
        },
        unstable: {
          title: '服务不稳定',
          desc: '单一账号容易触发限制，影响正常使用'
        },
        noControl: {
          title: '用量无法控制',
          desc: '不知道钱花在哪了，也无法限制团队成员的使用'
        }
      }
    },
    // 解决方案区块
    solutions: {
      title: '我们帮你解决',
      subtitle: '简单三步，开始省心使用 AI'
    },
    features: {
      unifiedGateway: '一键接入',
      unifiedGatewayDesc: '获取一个 API 密钥，即可调用所有已接入的 AI 模型，无需分别申请。',
      multiAccount: '稳定可靠',
      multiAccountDesc: '智能调度多个上游账号，自动切换和负载均衡，告别频繁报错。',
      balanceQuota: '用多少付多少',
      balanceQuotaDesc: '按实际使用量计费，支持设置配额上限，团队用量一目了然。'
    },
    // 优势对比
    comparison: {
      title: '为什么选择我们？',
      headers: {
        feature: '对比项',
        official: '官方订阅',
        us: '本平台'
      },
      items: {
        pricing: {
          feature: '付费方式',
          official: '固定月费，用不完也付',
          us: '按量付费，用多少付多少'
        },
        models: {
          feature: '模型选择',
          official: '单一服务商',
          us: '多模型随意切换'
        },
        management: {
          feature: '账号管理',
          official: '每个服务单独管理',
          us: '统一密钥，一站管理'
        },
        stability: {
          feature: '服务稳定性',
          official: '单账号易触发限制',
          us: '多账号池，自动切换'
        },
        control: {
          feature: '用量控制',
          official: '无法限制',
          us: '可设配额、查明细'
        }
      }
    },
    providers: {
      title: '已支持的 AI 模型',
      description: '一个 API，多种选择',
      supported: '已支持',
      soon: '即将推出',
      claude: 'Claude',
      gemini: 'Gemini',
      antigravity: 'Antigravity',
      more: '更多'
    },
    // CTA 区块
    cta: {
      title: '准备好开始了吗？',
      description: '注册即可获得免费试用额度，体验一站式 AI 服务',
      button: '免费注册'
    },
    footer: {
      allRightsReserved: '保留所有权利。'
    }
  },

  // Key Usage Query Page
  keyUsage: {
    title: 'API Key 用量查询',
    subtitle: '输入您的 API Key 以查看实时消费金额与使用状态',
    placeholder: 'sk-ant-mirror-xxxxxxxxxxxx',
    query: '查询',
    querying: '查询中...',
    privacyNote: '您的 Key 仅在浏览器本地处理，不会被存储',
    dateRange: '统计范围:',
    dateRangeToday: '今日',
    dateRange7d: '7 天',
    dateRange30d: '30 天',
    dateRange90d: '90 天',
    dateRangeCustom: '自定义',
    apply: '应用',
    used: '已使用',
    detailInfo: '详细信息',
    tokenStats: 'Token 统计',
    dailyDetail: '按日明细',
    modelStats: '模型用量统计',
    // Table headers
    date: '日期',
    model: '模型',
    requests: '请求数',
    inputTokens: '输入 Tokens',
    outputTokens: '输出 Tokens',
    cacheCreationTokens: '缓存创建',
    cacheReadTokens: '缓存读取',
    cacheWriteTokens: '缓存写入',
    totalTokens: '总 Tokens',
    cost: '费用',
    // Status
    quotaMode: 'Key 限额模式',
    walletBalance: '钱包余额',
    // Ring card titles
    totalQuota: '总额度',
    limit5h: '5 小时限额',
    limitDaily: '日限额',
    limit7d: '7 天限额',
    limitWeekly: '周限额',
    limitMonthly: '月限额',
    // Detail rows
    remainingQuota: '剩余额度',
    expiresAt: '过期时间',
    todayExpires: '(今日到期)',
    daysLeft: '({days} 天)',
    usedQuota: '已用额度',
    resetNow: '即将重置',
    subscriptionType: '订阅类型',
    subscriptionExpires: '订阅到期',
    // Usage stat cells
    todayRequests: '今日请求',
    todayInputTokens: '今日输入',
    todayOutputTokens: '今日输出',
    todayTokens: '今日 Tokens',
    todayCacheCreation: '今日缓存创建',
    todayCacheRead: '今日缓存读取',
    todayCost: '今日费用',
    rpmTpm: 'RPM / TPM',
    totalRequests: '累计请求',
    totalInputTokens: '累计输入',
    totalOutputTokens: '累计输出',
    totalTokensLabel: '累计 Tokens',
    totalCacheCreation: '累计缓存创建',
    totalCacheRead: '累计缓存读取',
    totalCost: '累计费用',
    avgDuration: '平均耗时',
    // Messages
    enterApiKey: '请输入 API Key',
    querySuccess: '查询成功',
    queryFailed: '查询失败',
    queryFailedRetry: '查询失败，请稍后重试',
    noDailyUsage: '暂无按日用量数据',
  },

  // Setup Wizard
  setup: {
    title: 'Sub2API 安装向导',
    description: '配置您的 Sub2API 实例',
    database: {
      title: '数据库配置',
      description: '连接到您的 PostgreSQL 数据库',
      host: '主机',
      port: '端口',
      username: '用户名',
      password: '密码',
      databaseName: '数据库名称',
      sslMode: 'SSL 模式',
      passwordPlaceholder: '密码',
      ssl: {
        disable: '禁用',
        require: '要求',
        verifyCa: '验证 CA',
        verifyFull: '完全验证'
      }
    },
    redis: {
      title: 'Redis 配置',
      description: '连接到您的 Redis 服务器',
      host: '主机',
      port: '端口',
      password: '密码（可选）',
      database: '数据库',
      passwordPlaceholder: '密码',
      enableTls: '启用 TLS',
      enableTlsHint: '连接 Redis 时使用 TLS（公共 CA 证书）'
    },
    admin: {
      title: '管理员账户',
      description: '创建您的管理员账户',
      email: '邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      passwordPlaceholder: '至少 8 个字符',
      confirmPasswordPlaceholder: '确认密码',
      passwordMismatch: '密码不匹配'
    },
    ready: {
      title: '准备安装',
      description: '检查您的配置并完成安装',
      database: '数据库',
      redis: 'Redis',
      adminEmail: '管理员邮箱'
    },
    status: {
      testing: '测试中...',
      success: '连接成功',
      testConnection: '测试连接',
      installing: '安装中...',
      completeInstallation: '完成安装',
      completed: '安装完成！',
      redirecting: '正在跳转到登录页面...',
      restarting: '服务正在重启，请稍候...',
      timeout: '服务重启时间超出预期，请手动刷新页面。'
    }
  },

  // Common
}
