const siteMeta = {
  brand: "Xiewanying",
  title: "谢琬滢 Xiewanying",
  tagline: "影像 / 感知 / 系统",
  intro: "在视觉创作与产品思维之间工作，以摄影、视频与叙事构建具有温度的观看经验。",
  description:
    "谢琬滢个人作品集，包含摄影、视频与长期影像研究。网站以杂志式浏览体验呈现作品与履历。",
  contact: {
    phone: "17835651741",
    email: "17835651741@163.com",
    weibo: "https://weibo.com/u/5540621302",
    xiaohongshu: "https://xhslink.com/m/A3vremvtoSX",
    wechatId: "Anniebyblue",
    wechatQr: "./assets/contact/wechat-qr.jpg"
  },
  hero: {
    about: {
      title: "谢琬滢",
      subtitle: "影像 / 感知 / 系统",
      description: "在视觉创作与产品思维之间工作。",
      image: {
        src: "./assets/profile/home-hero-portrait.jpg",
        alt: "谢琬滢肖像"
      }
    },
    photography: {
      title: "让感知变得可见",
      subtitle: "Photography",
      description: "从人像到空镜，以留白、气味与时间感组织图像。",
      image: {
        src: "./assets/photography/空镜/DSCF6909.jpg",
        alt: "摄影首页主视觉"
      }
    },
    video: {
      title: "从生成的世界到流动的真实瞬间",
      subtitle: "Films",
      description: "纪录片、AI 影像与自媒体作品在同一语法里并置。",
      image: {
        src: "./assets/photography/人文/DSCF8099.jpg",
        alt: "视频首页主视觉"
      }
    }
  },
  about: {
    summary: [
      "视觉创作者、摄影师、影像效果设计师。",
      "在结构化思考与影像创作之间切换。",
      "将模糊需求转译为可执行的视觉与产品系统。"
    ],
    focusAreas: ["影像系统", "用户感知", "产品逻辑", "AI生成影像", "纪录与叙事"],
    strengths: [
      "用户洞察与产品策略设计，具备从 0 到 1 的策略拆解经验。",
      "复杂项目协同与供应商管理，能够建立执行闭环与质量标准。",
      "独立完成摄影、AI 视频、剪辑与内容传播的全流程创作。"
    ],
    experience: [
      {
        period: "2024.08 - 至今",
        role: "影像效果设计师",
        organization: "vivo · 影像算法研究部",
        points: [
          "用户洞察 × 产品策略",
          "参与影像产品共创，将用户行为转化为产品策略。",
          "构建相册 agent 策略框架，提炼核心场景与需求结构，推动方案进入设计与决策流程。",
          "系统设计 × 执行闭环",
          "主导海外人像数据项目，转译算法需求为执行系统。",
          "建立「验收—反馈—执行」闭环机制，完成4000+数据交付。",
          "搭建供应商协作SOP，提升跨团队执行效率。",
          "数据采集 × 标准体系",
          "推动核心项目逆光人像采集方案0→1落地，建立拍摄规范与数据质量标准，合格率达92%，并构建可复用的数据采集与培训体系。",
          "使用agent搭建团队数据采集进度平台，开发提升工作效率的轻量工具。",
          "AI影像 × 生成创作",
          "独立完成AI短片全流程制作（剧本 / 分镜 / 生成 / 剪辑 / 声效），交付成果直接进入公司总年会的正式使用。"
        ]
      },
      {
        period: "2019.11 - 2024.06",
        role: "独立摄影师",
        organization: "自由职业",
        points: [
          "从事商业摄影与个人影像创作，服务时尚品牌与个人客户。",
          "完成从策划、拍摄到后期交付的完整影像生产流程。",
          "作品在社交平台累计曝光超过 200 万。"
        ]
      },
      {
        period: "2023.05 - 2023.08",
        role: "策划执行",
        organization: "南京弘毅文化传播有限公司",
        points: [
          "参与文化项目方案设计与线下活动执行。",
          "负责影像记录、剪辑与传播内容输出。"
        ]
      },
      {
        period: "2019.04 - 2019.07",
        role: "记者",
        organization: "山西晚报",
        points: [
          "参与现场采访、摄影与稿件撰写。",
          "多篇稿件刊登于报纸头版。"
        ]
      }
    ],
    honors: [
      "2023年获江苏省网络文化节摄影作品一等奖；",
      "2023年入展丽水摄影节；",
      "2023年入展平遥国际摄影展；",
      "2022年获“盛夏光影”国际青年摄影大展中最高奖项典藏奖（1/1）；",
      "2022年入展世界摄影大会“青春集结，共创未来”主题摄影展（1/15）；",
      "2022年获南京师范大学美术学院摄影大赛一等奖（1/2）；",
      "2021年入展釜山国际环境艺术节；",
      "2020年纪录片《捕鱼人与他的鸬鹚》获校园微电影大赛一等奖（1/1）；"
    ]
  }
};

const photographyCategoryImages = {
  commercial: [
    "./assets/photography/商业/DSCF5415.jpg",
    "./assets/photography/商业/he2.jpg",
    "./assets/photography/商业/he3.jpg",
    "./assets/photography/商业/he5.jpg",
    "./assets/photography/商业/he6.jpg",
    "./assets/photography/商业/he7.jpg",
    "./assets/photography/商业/he8.jpg",
    "./assets/photography/商业/未标题-1.jpg",
    "./assets/photography/商业/未标题-4.jpg",
    "./assets/photography/商业/未标题-5.jpg",
    "./assets/photography/商业/未标题-7.jpg"
  ],
  portrait: [
    "./assets/photography/人像/6寸1 3.jpg",
    "./assets/photography/人像/8寸 1  2_副本.jpg",
    "./assets/photography/人像/DSCF0008.jpg",
    "./assets/photography/人像/DSCF0015.jpg",
    "./assets/photography/人像/DSCF0110.jpg",
    "./assets/photography/人像/DSCF0173.jpg",
    "./assets/photography/人像/DSCF1502wsy.jpg",
    "./assets/photography/人像/DSCF1539.jpg",
    "./assets/photography/人像/DSCF1574.jpg",
    "./assets/photography/人像/DSCF1651.jpg",
    "./assets/photography/人像/DSCF1728.jpg",
    "./assets/photography/人像/DSCF1980.jpg",
    "./assets/photography/人像/DSCF2010.jpg",
    "./assets/photography/人像/DSCF2200.jpg",
    "./assets/photography/人像/DSCF2206.jpg",
    "./assets/photography/人像/DSCF2218.jpg",
    "./assets/photography/人像/DSCF2247 sy.jpg",
    "./assets/photography/人像/DSCF2263.jpg",
    "./assets/photography/人像/DSCF2268.jpg",
    "./assets/photography/人像/DSCF2272 sy.jpg",
    "./assets/photography/人像/DSCF2273.jpg",
    "./assets/photography/人像/DSCF2275.jpg",
    "./assets/photography/人像/DSCF2290.jpg",
    "./assets/photography/人像/DSCF2305.jpg",
    "./assets/photography/人像/DSCF2325.jpg",
    "./assets/photography/人像/DSCF2332.jpg",
    "./assets/photography/人像/DSCF2336.jpg",
    "./assets/photography/人像/DSCF2350.jpg",
    "./assets/photography/人像/DSCF2409.jpg",
    "./assets/photography/人像/DSCF2631.jpg",
    "./assets/photography/人像/DSCF2992.jpg",
    "./assets/photography/人像/DSCF3739.jpg",
    "./assets/photography/人像/DSCF3767.jpg",
    "./assets/photography/人像/DSCF4680.jpg",
    "./assets/photography/人像/DSCF4686.jpg",
    "./assets/photography/人像/DSCF4699.jpg",
    "./assets/photography/人像/DSCF4720.jpg",
    "./assets/photography/人像/DSCF5061.jpg",
    "./assets/photography/人像/DSCF5298.jpg",
    "./assets/photography/人像/DSCF5374.jpg",
    "./assets/photography/人像/DSCF5441.jpg",
    "./assets/photography/人像/DSCF5631.jpg",
    "./assets/photography/人像/DSCF5633.jpg",
    "./assets/photography/人像/DSCF5691.jpg",
    "./assets/photography/人像/DSCF5748 拷贝1.jpg",
    "./assets/photography/人像/DSCF7489.jpg",
    "./assets/photography/人像/DSCF7561.jpg",
    "./assets/photography/人像/DSCF7593.jpg",
    "./assets/photography/人像/DSCF8469.jpg",
    "./assets/photography/人像/DSCF8638.jpg",
    "./assets/photography/人像/DSCF9445.jpg",
    "./assets/photography/人像/U2-2.jpg",
    "./assets/photography/人像/j2.jpg",
    "./assets/photography/人像/j3.jpg",
    "./assets/photography/人像/j4.jpg",
    "./assets/photography/人像/j5.jpg",
    "./assets/photography/人像/爱丽丝.jpg",
    "./assets/photography/人像/作者照片.jpg"
  ],
  humanities: [
    "./assets/photography/人文/DSCF2119.jpg",
    "./assets/photography/人文/DSCF2141.jpg",
    "./assets/photography/人文/DSCF2152.jpg",
    "./assets/photography/人文/DSCF2777.jpg",
    "./assets/photography/人文/DSCF2797 2.jpg",
    "./assets/photography/人文/DSCF3318.jpg",
    "./assets/photography/人文/DSCF5303.jpg",
    "./assets/photography/人文/DSCF6398.jpg",
    "./assets/photography/人文/DSCF7113.jpg",
    "./assets/photography/人文/DSCF7194.jpg",
    "./assets/photography/人文/DSCF7196.jpg",
    "./assets/photography/人文/DSCF8099.jpg",
    "./assets/photography/人文/DSCF8481.jpg",
    "./assets/photography/人文/DSCF9536.jpg",
    "./assets/photography/人文/DSC_0497.jpg"
  ],
  "empty-scene": [
    "./assets/photography/空镜/1.jpg",
    "./assets/photography/空镜/DSCF0893.jpg",
    "./assets/photography/空镜/DSCF0921.jpg",
    "./assets/photography/空镜/DSCF0927.jpg",
    "./assets/photography/空镜/DSCF1057.jpg",
    "./assets/photography/空镜/DSCF1330 无水印.jpg",
    "./assets/photography/空镜/DSCF1436.jpg",
    "./assets/photography/空镜/DSCF1476.jpg",
    "./assets/photography/空镜/DSCF1532.jpg",
    "./assets/photography/空镜/DSCF1806.jpg",
    "./assets/photography/空镜/DSCF1917-2.jpg",
    "./assets/photography/空镜/DSCF1926.jpg",
    "./assets/photography/空镜/DSCF1928.jpg",
    "./assets/photography/空镜/DSCF1982 拷贝.jpg",
    "./assets/photography/空镜/DSCF2133.jpg",
    "./assets/photography/空镜/DSCF3304.jpg",
    "./assets/photography/空镜/DSCF3322.jpg",
    "./assets/photography/空镜/DSCF3364.jpg",
    "./assets/photography/空镜/DSCF3700.jpg",
    "./assets/photography/空镜/DSCF3882.jpg",
    "./assets/photography/空镜/DSCF3923.jpg",
    "./assets/photography/空镜/DSCF5315.jpg",
    "./assets/photography/空镜/DSCF6290.jpg",
    "./assets/photography/空镜/DSCF6651.jpg",
    "./assets/photography/空镜/DSCF6909.jpg",
    "./assets/photography/空镜/DSCF7125.jpg",
    "./assets/photography/空镜/DSCF7144 拷贝 2.jpg",
    "./assets/photography/空镜/DSCF7199.jpg",
    "./assets/photography/空镜/DSCF7248.jpg",
    "./assets/photography/空镜/DSCF7256.jpg",
    "./assets/photography/空镜/DSCF7275.jpg",
    "./assets/photography/空镜/DSCF7748.jpg",
    "./assets/photography/空镜/DSCF7767.jpg",
    "./assets/photography/空镜/DSCF7848.jpg",
    "./assets/photography/空镜/DSCF7853.jpg",
    "./assets/photography/空镜/DSCF7857.jpg",
    "./assets/photography/空镜/DSCF7866.jpg",
    "./assets/photography/空镜/DSCF7894.jpg",
    "./assets/photography/空镜/DSCF7992.jpg",
    "./assets/photography/空镜/DSCF8022.jpg",
    "./assets/photography/空镜/DSCF8040.jpg",
    "./assets/photography/空镜/DSCF8042_副本.jpg",
    "./assets/photography/空镜/DSCF8050.jpg",
    "./assets/photography/空镜/DSCF8085.jpg",
    "./assets/photography/空镜/DSCF8087.jpg",
    "./assets/photography/空镜/DSCF8089.jpg",
    "./assets/photography/空镜/DSCF8293.jpg",
    "./assets/photography/空镜/DSCF8300.jpg",
    "./assets/photography/空镜/DSCF8318.jpg",
    "./assets/photography/空镜/DSCF8640无水印.jpg",
    "./assets/photography/空镜/DSCF8657无水印.jpg",
    "./assets/photography/空镜/DSCF8661无水印.jpg",
    "./assets/photography/空镜/DSCF8725.jpg",
    "./assets/photography/空镜/DSCF8728.jpg",
    "./assets/photography/空镜/DSCF8868.jpg",
    "./assets/photography/空镜/DSCF9196.jpg",
    "./assets/photography/空镜/DSCF9489.jpg",
    "./assets/photography/空镜/DSCF9513.jpg",
    "./assets/photography/空镜/ead572b0-14a1-11ec-8983-8196a900a5d7_gallery.jpeg"
  ]
};

const photographyCategories = [
  { slug: "commercial", label: "商业", folder: "商业", hero: "./assets/photography/商业/DSCF0480.jpg", images: photographyCategoryImages.commercial },
  { slug: "portrait", label: "人像", folder: "人像", hero: "./assets/photography/人像/DSCF7489-cover.jpg", images: photographyCategoryImages.portrait },
  { slug: "empty-scene", label: "空镜", folder: "空镜", hero: "./assets/photography/空镜/DSCF7256-cover.jpg", images: photographyCategoryImages["empty-scene"] },
  { slug: "humanities", label: "人文", folder: "人文", hero: "./assets/photography/人文/DSCF2141-cover.jpg", images: photographyCategoryImages.humanities }
];

const videoCategories = [
  { slug: "ai-creation", label: "AI作品", folder: "AI创作", hero: "./assets/video/AI创作/cover-page.JPG", targetSlug: "ai-dream-fragments" },
  { slug: "documentary", label: "纪录片", folder: "纪录片", hero: "./assets/video/纪录片/cover-page.jpg", targetSlug: "fisherman-and-cormorant" },
  { slug: "social-media", label: "旅行", folder: "自媒体", hero: "./assets/video/自媒体/cover-page.jpg", targetSlug: "travel-series" }
];

const photographyWorks = [
  {
    slug: "through-the-trees",
    title: "树影之间",
    category: "人像",
    categorySlug: "portrait",
    date: "2026.06",
    location: "南京",
    cover: { src: "./assets/photography/人像/DSCF3739.jpg", alt: "人像作品 树影之间 封面" },
    hero: { src: "./assets/photography/人像/DSCF3739.jpg", alt: "树影之间 主图" },
    description: [
      "一组关于身体与树荫关系的肖像练习。画面不追求直接叙事，而是让人物被风、树皮与光线共同包围。",
      "参考杂志式的观看节奏，图像之间保留长距离留白，让姿态和注视在页面中自然停顿。"
    ],
    gallery: [
      { src: "./assets/photography/人像/DSCF3739.jpg", alt: "树影之间 图一", caption: "树荫与人物形成第一层关系。", layout: "full" },
      { src: "./assets/photography/人像/DSCF3767.jpg", alt: "树影之间 图二", caption: "更近的面部与手势。", layout: "contained" },
      { src: "./assets/photography/人像/DSCF4680.jpg", alt: "树影之间 图三", caption: "光线向前推进。", layout: "centered" },
      { src: "./assets/photography/人像/DSCF4686.jpg", alt: "树影之间 图四", caption: "静止中的微动作。", layout: "contained" },
      { src: "./assets/photography/人像/DSCF4699.jpg", alt: "树影之间 图五", caption: "留白拉开呼吸感。", layout: "full" }
    ]
  },
  {
    slug: "alice-in-soft-light",
    title: "爱丽丝",
    category: "人像",
    categorySlug: "portrait",
    date: "2025.11",
    location: "上海",
    cover: { src: "./assets/photography/人像/爱丽丝.jpg", alt: "爱丽丝 封面" },
    hero: { src: "./assets/photography/人像/爱丽丝.jpg", alt: "爱丽丝 主图" },
    description: [
      "以极轻的情绪和偏低的饱和度处理人物，弱化故事线，保留观看中的犹疑。"
    ],
    gallery: [
      { src: "./assets/photography/人像/爱丽丝.jpg", alt: "爱丽丝 图一", caption: "更靠近人物状态本身。", layout: "full" },
      { src: "./assets/photography/人像/DSCF5441.jpg", alt: "爱丽丝 图二", caption: "侧身与停顿。", layout: "centered" },
      { src: "./assets/photography/人像/DSCF5631.jpg", alt: "爱丽丝 图三", caption: "柔和的表情控制。", layout: "contained" },
      { src: "./assets/photography/人像/DSCF5633.jpg", alt: "爱丽丝 图四", caption: "光从边缘进入。", layout: "contained" }
    ]
  },
  {
    slug: "air-between-buildings",
    title: "空镜练习",
    category: "空镜",
    categorySlug: "empty-scene",
    date: "2026.05",
    location: "东京 / 南京",
    cover: { src: "./assets/photography/空镜/DSCF6909.jpg", alt: "空镜练习 封面" },
    hero: { src: "./assets/photography/空镜/DSCF6909.jpg", alt: "空镜练习 主图" },
    description: [
      "这一组围绕建筑边缘、街道转角与阴影展开。它们不承担事件，而是提供一种情绪温度。",
      "空镜并非背景，而是时间停顿时最接近记忆的部分。"
    ],
    gallery: [
      { src: "./assets/photography/空镜/DSCF6909.jpg", alt: "空镜练习 图一", caption: "城市的开场。", layout: "full" },
      { src: "./assets/photography/空镜/DSCF7125.jpg", alt: "空镜练习 图二", caption: "边缘与线条。", layout: "contained" },
      { src: "./assets/photography/空镜/DSCF7248.jpg", alt: "空镜练习 图三", caption: "路面上的光。", layout: "centered" },
      { src: "./assets/photography/空镜/DSCF7857.jpg", alt: "空镜练习 图四", caption: "风景接近抽象。", layout: "contained" },
      { src: "./assets/photography/空镜/DSCF8640无水印.jpg", alt: "空镜练习 图五", caption: "安静的深色块面。", layout: "full" }
    ]
  },
  {
    slug: "wet-evening",
    title: "潮湿傍晚",
    category: "空镜",
    categorySlug: "empty-scene",
    date: "2024.09",
    location: "苏州",
    cover: { src: "./assets/photography/空镜/DSCF8087.jpg", alt: "潮湿傍晚 封面" },
    hero: { src: "./assets/photography/空镜/DSCF8087.jpg", alt: "潮湿傍晚 主图" },
    description: [
      "在潮湿天气里记录表面如何反光、吸光，如何把空间变得更慢。"
    ],
    gallery: [
      { src: "./assets/photography/空镜/DSCF8087.jpg", alt: "潮湿傍晚 图一", caption: "傍晚刚开始落下。", layout: "full" },
      { src: "./assets/photography/空镜/DSCF8089.jpg", alt: "潮湿傍晚 图二", caption: "风穿过空旷区域。", layout: "contained" },
      { src: "./assets/photography/空镜/DSCF8293.jpg", alt: "潮湿傍晚 图三", caption: "层次开始压低。", layout: "contained" },
      { src: "./assets/photography/空镜/DSCF9395.jpg", alt: "潮湿傍晚 图四", caption: "雨后留下的结构。", layout: "centered" }
    ]
  },
  {
    slug: "commercial-samples",
    title: "商业样片",
    category: "商业",
    categorySlug: "commercial",
    date: "2025.03",
    location: "杭州 / 上海",
    cover: { src: "./assets/photography/商业/he2.jpg", alt: "商业样片 封面" },
    hero: { src: "./assets/photography/商业/he2.jpg", alt: "商业样片 主图" },
    description: [
      "商业拍摄部分强调质感控制与交付稳定性，在品牌语境里仍然保留个人审美中的克制与留白。"
    ],
    gallery: [
      { src: "./assets/photography/商业/he2.jpg", alt: "商业样片 图一", caption: "产品与人物之间的平衡。", layout: "full" },
      { src: "./assets/photography/商业/he3.jpg", alt: "商业样片 图二", caption: "更明确的视觉导向。", layout: "contained" },
      { src: "./assets/photography/商业/he5.jpg", alt: "商业样片 图三", caption: "保留画面呼吸。", layout: "contained" },
      { src: "./assets/photography/商业/he6.jpg", alt: "商业样片 图四", caption: "细节的秩序感。", layout: "centered" },
      { src: "./assets/photography/商业/he8.jpg", alt: "商业样片 图五", caption: "更强的商业完成度。", layout: "full" }
    ]
  },
  {
    slug: "human-traces",
    title: "人的痕迹",
    category: "人文",
    categorySlug: "humanities",
    date: "2024.12",
    location: "山西 / 南京",
    cover: { src: "./assets/photography/人文/DSCF7196.jpg", alt: "人的痕迹 封面" },
    hero: { src: "./assets/photography/人文/DSCF7196.jpg", alt: "人的痕迹 主图" },
    description: [
      "人文部分更接近观察与等待。人物并不总在画面中心，但总会留下某种气息与秩序。"
    ],
    gallery: [
      { src: "./assets/photography/人文/DSCF7196.jpg", alt: "人的痕迹 图一", caption: "人物与环境互相让位。", layout: "full" },
      { src: "./assets/photography/人文/DSCF8099.jpg", alt: "人的痕迹 图二", caption: "日常中的陌生感。", layout: "contained" },
      { src: "./assets/photography/人文/DSCF8481.jpg", alt: "人的痕迹 图三", caption: "更靠近现场。", layout: "contained" },
      { src: "./assets/photography/人文/DSCF9536.jpg", alt: "人的痕迹 图四", caption: "观看被延长。", layout: "centered" },
      { src: "./assets/photography/人文/DSC_0497.jpg", alt: "人的痕迹 图五", caption: "最后回到更直接的人。", layout: "full" }
    ]
  }
];

const videoWorks = [
  {
    slug: "ai-dream-fragments",
    title: "V world",
    category: "AI作品",
    categorySlug: "ai-creation",
    date: "2025.12",
    duration: "06:00",
    cover: { src: "./assets/video/AI创作/IMG_9956.JPG", alt: "AI创作片段 封面" },
    menuThumb: "./assets/video/AI创作/cover-page.JPG",
    hero: { src: "./assets/video/AI创作/IMG_9956.JPG", alt: "AI创作片段 主视觉" },
    video: {
      src: "./assets/video/AI创作/ai-dream-fragments-web.mp4",
      poster: "./assets/video/AI创作/IMG_9956.JPG"
    },
    externalUrl: "https://www.bilibili.com/video/BV1tUZtBqEcb/?spm_id_from=333.1387.upload.video_card.click",
    externalLabel: "前往完整观看",
    description: [
      "深空基站中屹立着的蓝色液态处理器，是该世界的心脏，五位机甲战士各司其职，默默守护世界的平衡。",
      "当天外来客突袭，巨型Boss现身，五位卫士即刻集结，展开了一场平行时空的守护之战。"
    ],
    stills: [
      { src: "./assets/video/AI创作/IMG_9879.JPG", alt: "AI创作 剧照一", caption: "图像作为情绪界面。" },
      { src: "./assets/video/AI创作/IMG_9917.JPG", alt: "AI创作 剧照二", caption: "色块和人物之间的距离。" },
      { src: "./assets/video/AI创作/IMG_9963 2.JPG", alt: "AI创作 剧照三", caption: "生成世界的边缘。" },
      { src: "./assets/video/AI创作/IMG_9964.JPG", alt: "AI创作 剧照四", caption: "结构被故意保留。" },
      { src: "./assets/video/AI创作/IMG_9987.JPG", alt: "AI创作 剧照五", caption: "节奏偏慢，画面偏静。" }
    ]
  },
  {
    slug: "island-three-sounds",
    title: "海岛三声",
    category: "AI作品",
    categorySlug: "ai-creation",
    status: "in-progress",
    date: "2026.06",
    duration: "制作中",
    cover: { src: "./assets/video/AI创作/island-three-sounds-01.png", alt: "海岛三声 封面" },
    menuThumb: "./assets/video/AI创作/island-three-sounds-01.png",
    hero: { src: "./assets/video/AI创作/island-three-sounds-01.png", alt: "海岛三声 主视觉" },
    description: [],
    stills: [],
    inProgressImages: [
      { src: "./assets/dabao/island-three-sounds.png", alt: "海岛三声 展示图" }
    ],
    interactiveSection: `
<style>
  .island-story-root {
    --text-main:  #1A1712;
    --text-warm:  #6B6459;
    --text-muted: rgba(107,100,89,0.3);
    --font-serif: 'Noto Serif SC', Georgia, serif;
    --font-sans:  'Noto Sans SC', system-ui, sans-serif;
    font-family: var(--font-serif);
    color: var(--text-main);
    line-height: 1.8;
    position: relative;
    margin: 40px 0;
    padding: 0;
    background: transparent; /* 融入网页背景 */
  }
  .island-story-root .cover { 
    position: relative; 
    width: 100%; 
    height: 80vh; 
    overflow: hidden; 
    margin-bottom: 80px;
  }
  .island-story-root .cover-img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    filter: brightness(0.7); 
    /* 移除遮挡内容的 mask */
  }
  .island-story-root .story-section { 
    position: relative; 
    padding: 100px 20px; 
    max-width: 800px; 
    margin: 0 auto; 
    min-height: 1500px; /* 确保能装下所有侧边文字 */
  }
  /* 侧边引文：位置编排 */
  .island-story-root .sq { 
    position: absolute; 
    color: var(--text-warm); 
    cursor: pointer; 
    width: 200px; 
    z-index: 10; 
    transition: opacity 0.4s, transform 0.4s;
    letter-spacing: 0.15em;
    line-height: 2;
    font-family: var(--font-serif);
  }
  .island-story-root .sq:hover { opacity: 0.9 !important; transform: translateY(-2px); }
  
  .sq-l { right: calc(50% + 390px); text-align: right; max-width: 180px; }
  .sq-r { left: calc(50% + 390px);  text-align: left;  max-width: 180px; }

  .sq-1 { top: 80px;  font-size: 1.15rem; opacity: 0.58; }
  .sq-2 { top: 280px; font-size: 0.92rem; opacity: 0.42; }
  .sq-3 { top: 520px; font-size: 0.85rem; opacity: 0.36; }
  .sq-4 { top: 740px; font-size: 1.0rem;  opacity: 0.46; }
  .sq-5 { top: 960px; font-size: 1.05rem; opacity: 0.52; }

  /* 呼吸提示线 */
  .sq-hint-wrap {
    position: absolute;
    top: 50%; transform: translateY(-50%);
    right: calc(100% + 8px); /* 缩短距离，从 16px 改为 8px */
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    pointer-events: none;
    animation: sqBreathe 3.2s ease-in-out infinite;
  }
  .sq-hint-line {
    width: 1.2px; height: 28px;
    background: linear-gradient(to bottom, transparent, #7A5C3A 40%, #7A5C3A 60%, transparent);
  }
  .sq-hint-text {
    writing-mode: vertical-rl;
    font-size: 0.7rem; letter-spacing: 0.3em; color: #7A5C3A;
    font-family: var(--font-sans);
    opacity: 0.8;
  }
  @keyframes sqBreathe {
    0%,100% { opacity: 0.2; }
    50%      { opacity: 1; }
  }

  .island-story-root .novel-card { 
    position: relative; 
    width: 100%; 
    margin: 0 auto; 
    background: transparent; /* 移除白色背景 */
    padding: 0; 
  }
  .island-story-root canvas { 
    position: absolute; 
    top: -20px; left: -20px; 
    width: calc(100% + 40px); height: calc(100% + 40px); 
    pointer-events: none; 
    opacity: 0.6;
  }
  .island-story-root .novel-text { 
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: clamp(1.0rem, 1.9vw, 1.15rem);
    line-height: 2.2;
    color: #1A1712;
    letter-spacing: 0.07em;
    text-align: justify;
    white-space: pre-wrap;
    min-height: 800px; /* 增加高度以适配两侧引文长度 */
  }
  .island-story-root .novel-nav { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-top: 60px; 
    font-family: var(--font-sans);
    opacity: 0.6;
  }
  .island-story-root .novel-nav button {
    background: none;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 4px 12px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s;
  }
  .island-story-root .novel-nav button:hover { border-color: #333; opacity: 1; }
  
  @media (max-width: 1200px) { 
    .island-story-root .sq { position: static; width: 100%; text-align: center; margin: 20px 0; opacity: 0.7; }
    .island-story-root .sq-l, .island-story-root .sq-r { right: auto; left: auto; }
  }
</style>
<div class="island-story-root" id="islandStoryRoot">
  <section class="cover">
    <img class="cover-img" src="./assets/video/AI创作/island-three-sounds-01.png" />
    <!-- 移除了原有的 cover-title 文字 -->
  </section>
  <section class="story-section">
    <div class="sq sq-l sq-1" id="sq0">
      夜是星的原野。
      <span class="sq-hint-wrap">
        <span class="sq-hint-line"></span>
        <span class="sq-hint-text">触碰</span>
      </span>
    </div>
    <div class="sq sq-r sq-2" id="sq1">你的方向是我的自由。</div>
    <div class="sq sq-l sq-3" id="sq2">海潮的私语。<br>生命的赠礼。<br>撼动的惊鸣。</div>
    <div class="sq sq-r sq-4" id="sq3">这熊熊燃起的火焰，<br>是流淌在我身体里的血液，<br>献给你就成为光明。</div>
    <div class="sq sq-l sq-5" id="sq4">黑夜里没有星星。<br>灰烬上没有篝火。</div>
    
    <div class="novel-card">
      <canvas id="islandWaveCanvas"></canvas>
      <div style="position:relative;z-index:1">
        <div id="islandText" class="novel-text" style="transition:opacity 0.6s ease-in-out"></div>
        <div class="novel-nav">
          <button id="islandPrevBtn">previous</button>
          <span id="islandPageNum">1 / 3</span>
          <button id="islandNextBtn">next</button>
        </div>
      </div>
    </div>
  </section>
</div>
`,

  },
  {
    slug: "fisherman-and-cormorant",
    title: "捕鱼人与他的鸬鹚",
    category: "纪录片",
    categorySlug: "documentary",
    date: "2020.08",
    duration: "08:00",
    cover: { src: "./assets/video/纪录片/DSCF7294.jpg", alt: "捕鱼人与他的鸬鹚 封面" },
    menuThumb: "./assets/video/纪录片/cover-page.jpg",
    hero: { src: "./assets/video/纪录片/DSCF7294.jpg", alt: "捕鱼人与他的鸬鹚 主视觉" },
    video: {
      src: "./assets/video/纪录片/fisherman-and-cormorant-web.mp4",
      poster: "./assets/video/纪录片/DSCF7294.jpg"
    },
    externalUrl: "https://www.bilibili.com/video/BV1av41117Ci/?spm_id_from=333.1387.upload.video_card.click&vd_source=fa35f7a2968b51d83701848a2ff1c6b6",
    externalLabel: "前往完整观看",
    description: [
      "此片由本人全程独立制作，创作于2019-2020年，见证了张家渔村这座具有百年历史的古老村落最终的消失。",
      "整个影片采用旁观者的视角进行纪实拍摄，旨在展现人与自然之间深厚的羁绊，同时揭示在时代高速发展的背景下，传统质朴文化快速消逝的现象。"
    ],
    stills: [
      { src: "./assets/video/纪录片/DSCF7270.jpg", alt: "纪录片 剧照一", caption: "先进入人物所在的环境。" },
      { src: "./assets/video/纪录片/DSCF7294.jpg", alt: "纪录片 剧照二", caption: "主体与器物一起出现。" },
      { src: "./assets/video/纪录片/DSCF7307.jpg", alt: "纪录片 剧照三", caption: "更贴近真实劳作时刻。" },
      { src: "./assets/video/纪录片/微信图片_20200909173524.jpg", alt: "纪录片 剧照四", caption: "旧照片作为补充信息。" }
    ]
  },
  {
    slug: "travel-series",
    title: "旅行短片",
    category: "旅行",
    categorySlug: "social-media",
    date: "2024.04",
    duration: "多条短片",
    cover: { src: "./assets/video/自媒体/cover-page.jpg", alt: "旅行短片 封面" },
    menuThumb: "./assets/video/自媒体/cover-page.jpg",
    hero: { src: "./assets/video/自媒体/cover-page.jpg", alt: "旅行短片 主视觉" },
    video: {
      src: "./assets/video/自媒体/gatsby-lookalike-web.mp4",
      poster: "./assets/video/自媒体/cover-page.jpg"
    },
    description: [],
    stills: [],
    travelVideos: [
      { src: "./assets/video/自媒体/gatsby-lookalike-web.mp4", poster: "./assets/video/自媒体/微信图片_20260626090012_25_3.jpg", thumb: "./assets/video/自媒体/微信图片_20260626090012_25_3.jpg" },
      { src: "./assets/video/自媒体/carriage-film-web.mp4", poster: "./assets/video/自媒体/微信图片_20260626085727_24_3.jpg", thumb: "./assets/video/自媒体/微信图片_20260626085727_24_3.jpg" },
      { src: "./assets/video/自媒体/opening-title.mov", poster: "./assets/video/自媒体/DSCF8087.jpg", thumb: "./assets/video/自媒体/DSCF8087.jpg" },
      { src: "./assets/video/自媒体/04.mp4", poster: "./assets/video/自媒体/微信图片_20260626084315_23_3.jpg", thumb: "./assets/video/自媒体/微信图片_20260626084315_23_3.jpg" }
    ]
  }
];

const writingEntries = [
  {
    slug: "field-notes-on-looking",
    title: "关于观看的现场笔记",
    category: "日志",
    date: "2026.06",
    cover: { src: "./assets/photography/空镜/DSCF9196.jpg", alt: "关于观看的现场笔记 封面" },
    body: [
      "摄影对我来说不是抓住一个瞬间，而是判断什么时候应该停下来。",
      "在很多工作现场里，我更在意气味、温度、噪音和等待的长度。图像只是这些感受的最后出口。",
      "这也是为什么我偏爱留白。留白不是空，而是给观看保留未完成的部分。"
    ]
  },
  {
    slug: "notes-between-product-and-image",
    title: "影像与产品之间",
    category: "日志",
    date: "2026.04",
    cover: { src: "./assets/photography/人像/作者照片.jpg", alt: "影像与产品之间 封面" },
    body: [
      "在产品策略工作里，我学习的是如何把模糊感受变成执行结构；在影像创作里，我又反过来把结构重新还给感受。",
      "这两种方法并不冲突，它们共同决定我如何理解叙事。"
    ]
  }
];

function getPhotographyCategory(slug) {
  return photographyCategories.find((item) => item.slug === slug);
}

function getVideoCategory(slug) {
  return videoCategories.find((item) => item.slug === slug);
}

function getMixedFeed() {
  return [
    ...photographyWorks.map((item) => ({ ...item, type: "photography" })),
    ...videoWorks.map((item) => ({ ...item, type: "video" }))
  ].sort((left, right) => right.date.localeCompare(left.date));
}

const projectCategories = [
  {
    slug: "luodi",
    label: "落地",
    subtitle: "把事情真正做出来。数据、流程、项目推进，让方案能够真正落地。",
    subtitleLines: ["把事情真正做出来。", "数据、流程、项目推进，", "让方案能够真正落地。"],
    emoji: "",
    tags: ["数据生产", "流程建设", "项目管理"],
    count: 2
  },
  {
    slug: "dongcha",
    label: "洞察",
    subtitle: "先想明白，再开始做。从用户体验到产品策略，把问题拆开，再找到答案。",
    subtitleLines: ["先想明白，再开始做。", "从用户体验到产品策略，", "把问题拆开，再找到答案。"],
    emoji: "",
    tags: ["用户研究", "竞品分析", "产品策略"],
    count: 3
  },
  {
    slug: "chuangzao",
    label: "创造",
    subtitle: "把想法做成产品。复现脑中的想法，再一点点把它打磨完整。",
    subtitleLines: ["把想法做成产品。", "复现脑中的想法，", "再一点点把它打磨完整。"],
    emoji: "",
    tags: ["Vibe Coding", "AI 产品", "原型开发"],
    count: 2
  }
];

const projectWorks = [
  {
    slug: "overseas-portrait",
    title: "海外影像数据项目管理",
    category: "落地",
    categorySlug: "luodi",
    role: "项目统筹 / 现场流程管理",
    status: "一期结项 · 二期执行中",
    summary: "统筹多场景、多模特的人像数据采集项目，在工期紧、执行端新人占比高的条件下，从0到1建立可复用的标准化流程，保障数千级影像的稳定交付。",
    tags: ["项目统筹", "流程建设", "现场管理"],
    capabilities: [
      {
        title: "① 预防性机制建设",
        subtitle: "流程标准化 · 风险前置拦截",
        body: "一期结束后梳理所有高频问题，形成可复用的标准化资产，并在二期前置到合同端。",
        points: [
          "输出《一期高频问题清单》（镜头/内存/命名/版本排查等7类风险）",
          "输出《需求-执行对照表》，将算法需求逐条映射为拍摄端动作",
          "输出拍摄端/传输端双端SOP模板",
          "二期将「团队须划分拍摄组与传输组」「培训后操作不当须无偿重拍」写入合同条款"
        ],
        result: "二期首次对接，供应商已能依据对照表提前对齐需求，理解偏差在启动前即被消除"
      },
      {
        title: "② 现场紧急诊断与流程重构",
        subtitle: "应急决策 · 现场执行管理",
        body: "一期执行首日爆发多类操作问题，即时叫停并完成现场重整。",
        points: [
          "叫停无序拍摄，现场将供应商团队拆分为拍摄组与传输组",
          "当场指定各组对接人，建立信息传递通道",
          "针对已发生问题逐条规范培训：数据命名规则、清空前日数据、物理降温操作"
        ],
        result: "当天拍摄秩序恢复，后续未再因同类操作失误造成批量数据无效"
      },
      {
        title: "③ 基于真实效率的排期重构",
        subtitle: "数据驱动排期 · 进度管控",
        body: "弃用供应商提供的理想排期，基于首日实际产能独立重算。",
        points: [
          "采集首日实际产出效率、传输耗时、问题损耗三项数据",
          "独立重新推算每日合理拍摄量",
          "提出分组拍摄、优化衔接流程的提速方案",
          "二期合同中设置T+1交付目标与试运行评估机制"
        ],
        result: "排期从「纸面承诺」变为每日可追踪、可核验的落地工具"
      },
      {
        title: "④ 跨角色质量翻译与闭环",
        subtitle: "需求翻译 · 质量闭环",
        body: "充当算法需求方与供应商执行端之间的转化层，确保质量要求传递不衰减。",
        points: [
          "每次需求方质量反馈（表情姿态重复/长焦构图/色温单一等）转化为拍摄端SOP更新",
          "组织执行人员再培训 + 现场验证调整效果",
          "建立「反馈-整改-验证」闭环流程",
          "合同约定监制人员须1v1对接每一位执行人员"
        ],
        result: "需求变更落地周期显著缩短，批量返工风险大幅降低"
      }
    ],
    outputs: ["需求-执行对照表", "一期高频问题清单", "拍摄端/传输端SOP模板", "动态排期总表"]
  },
  {
    slug: "backlight-portrait",
    title: "逆光数据方案与风格化探索",
    category: "落地",
    categorySlug: "luodi",
    role: "数据方案负责人",
    status: "已结项",
    summary: "逆光人像是手机影像领域重点攻坚方向，旨在解决「大光比冲突」场景下的成像问题。从0到1搭建完整数据生产链路，在基础合格率92%之上完成发丝光、神明少女两大风格化方案落地，实现从「能用」到「好看」的美学跃迁。",
    tags: ["数据方案", "风格化探索", "供应商培训"],
    capabilities: [
      {
        title: "① 建标准：从0到1搭建数据生产链路",
        subtitle: "方案设计 · 标准制定",
        body: "主导拍摄方案从试验到效果确认的全流程，针对不同逆光场景类型输出定制化采集策略。",
        points: [
          "对逆光场景进行分类拆解：冲光 / 大逆光 / 极限暗逆光",
          "覆盖明星场景：夕阳 / 绿光森林 / 室内外交界",
          "完成从效果确认、需求定义到流程设计的完整数据方案",
          "输出《供应商需求招募方案》",
          "制作《数据质量规范PPT》，细化肤色均匀性、发丝边缘过渡、人景交界规避等验收维度",
          "编写《采集事项操作手册》"
        ],
        result: "算法需求被系统性地「翻译」为可执行的采集标准，供应商第一次拿到完整可参考的操作蓝本"
      },
      {
        title: "② 抓落地：培训赋能与供应商管理",
        subtitle: "培训赋能 · 流程管理",
        body: "将复杂的算法语言转化为执行端可理解、可操作的动作指令，确保标准不打折落地。",
        points: [
          "组织试拍培训，撰写培训讲稿，向供应商团队精准传达实操逻辑",
          "确保执行端对「什么叫效果达标」的理解与算法侧对齐",
          "建立认知-算法-供应商三方对接的审核改进流程",
          "整理后期整理操作文档，规范交付物格式"
        ],
        result: "新增供应商在首次执行时即有明确的参照系，多端信息传递的偏差被有效压缩"
      },
      {
        title: "③ 风格化探索与量产",
        subtitle: "发丝光 · 神明少女",
        body: "在默认效果达标的基础上，主导两大风格化专项的方案探究与量产，填补模型在氛围感数据上的空白。",
        points: [
          "主导「发丝光」专项：反复试验光位与布光逻辑，解决「人脸发蒙」痛点",
          "主导「神明少女」专项：攻克「立体感生硬」问题，形成可控的布光方案",
          "完成两大风格化方案从试验到量产的完整流程，高质量满足模型缺口数据量"
        ],
        result: "成功落地2大风格化方案，为算法提供了此前缺失的极限逆光美学数据"
      },
      {
        title: "④ 量化成果",
        subtitle: "数据佐证",
        body: "关键指标全部可量化验证。",
        points: [],
        result: "默认效果合格率：92%，显著降低算法侧清洗成本；风格化方案落地：2大专项（发丝光、神明少女）；核心规范文档：5+份（招标方案、质量规范、配准操作等）；管理资产：覆盖全部新增供应商的培训体系 + 三方对接审核流程"
      }
    ],
    methodology: "沉淀了一套从 需求解读 → 方案试验 → 标准制定 → 供应商培训 → 风格化探索 的完整数据生产方法论，具备独立负责复杂影像项目数据链路的综合能力。",
    outputs: ["供应商需求招募方案", "数据质量规范PPT", "采集事项操作手册", "培训讲稿与试拍流程", "三方对接审核流程文档", "后期整理操作文档", "发丝光布光方案", "神明少女布光方案"]
  },
  {
    slug: "gimbal-camera-diagnosis",
    title: "云台相机竞品体验报告",
    category: "洞察",
    categorySlug: "dongcha",
    role: "产品策略",
    status: "战略级报告 · 已向高层汇报",
    summary: "从真实创作者视角出发，对 Pocket 3 进行全链路体验拆解，识别隐性体验问题，并输出硬件、交互与生态的系统性优化方案。不只关注「功能好不好用」，更关注「用户为什么不愿意用」。",
    tags: ["产品策略", "竞品分析", "体验诊断"],
    report: {
      quote: "不只关注「功能好不好用」，更关注「用户为什么不愿意用」。",
      overview: {
        title: "项目概览",
        body: "完整覆盖真实创作者的使用链路，而不仅关注单一功能体验。",
        steps: ["📷 Pocket 3", "🚶 携带", "⚡ 启动", "🎥 拍摄", "📤 导出", "📱 分享"]
      },
      methodology: {
        title: "我的分析方式",
        body: "关注的不只是「哪里不好用」，而是问题为什么发生、如何降低用户挫败感。",
        steps: ["真实体验", "记录问题", "归类整理", "定位根因", "提出方案", "形成完整诊断报告"]
      },
      insights: [
        {
          title: "① 跟随失败，用户却不知道",
          tag: "用户信任 · 状态反馈",
          finding: "自动跟随失败只有回看素材时才能发现，损失不可逆。",
          solutions: ["跟随状态震动反馈", "可调节反馈强度", "重建用户信任"]
        },
        {
          title: "② 模式切换容易误判",
          tag: "操作确定性 · 交互设计",
          finding: "用户频繁混淆云台控制与变焦模式。",
          solutions: ["实体切换按键", "视觉 + 震动双反馈", "建立肌肉记忆"]
        },
        {
          title: "③ 启动速度限制记录",
          tag: "快速启动 · 硬件创新",
          finding: "真正想拍的时候，设备还没准备好。",
          solutions: ["弹出式镜头结构", "秒开拍摄模式", "同时优化便携性"]
        },
        {
          title: "④ 从工具走向陪伴",
          tag: "AI Robot · 情绪价值",
          finding: "产品拥有功能，却缺少人格。",
          solutions: ["AI Robot 伙伴模式", "表情化 UI", "AI 场景协作能力"]
        }
      ],
      moreFindings: [
        {
          title: "📦 使用前",
          items: ["保护壳笨重 → 更轻薄的环绕式方案", "挂绳体验差 → 长挂绳 + 快拆结构", "与手机割裂 → 靠近即连接"]
        },
        {
          title: "🎥 使用中",
          items: ["变焦控制不流畅", "缺少教学引导", "不支持热点追踪", "Live Photo 缺失"]
        },
        {
          title: "📤 使用后",
          items: ["导出体积过大", "传输链路割裂", "灵感标记无法同步"]
        }
      ],
      stats: [
        { value: "14", label: "体验问题" },
        { value: "16+", label: "优化建议" },
        { value: "4", label: "核心创新方向" },
        { value: "1", label: "完整诊断报告" }
      ],
      outputs: ["全链路体验诊断报告", "硬件优化方案", "交互设计方案", "AI Robot 概念设计", "痛点优先级矩阵"]
    }
  },
  {
    slug: "album-agent-strategy",
    title: "相册智能推荐策略",
    category: "洞察",
    categorySlug: "dongcha",
    role: "产品策略",
    status: "已输出完整策略方案",
    summary: "为相册搜索页设计智能推荐系统，让搜索不止找到照片，而是主动帮助用户完成下一步。",
    tags: ["产品策略", "推荐系统", "用户体验"],
    report: {
      proposition: {
        title: "项目命题",
        quote: "搜索结束之后，用户还会做什么？",
        body: "大多数相册搜索停留在「找到照片」。而我的目标，是继续帮助用户完成：搜索 → 编辑 → 分享，缩短操作路径，让推荐真正参与用户决策。"
      },
      strategyFlow: {
        title: "我的策略框架",
        body: "推荐系统不是功能集合，而是一套持续学习用户行为的策略体系。",
        steps: ["理解用户", "判断意图", "建立信任", "推荐能力", "持续学习", "形成长期使用"]
      },
      strategyCards: [
        {
          title: "建立信任，而不是增加推荐",
          tag: "推荐准确率",
          insight: "不是所有功能都值得推荐。只有足够准确，用户才会相信下一次推荐。",
          points: ["推荐准确率分层", "高准确率优先曝光", "中低准确率持续优化"],
          value: "先建立信任，再提升推荐接受率。"
        },
        {
          title: "推荐下一步，而不是结束操作",
          tag: "编辑链路",
          insight: "用户完成一个功能后，其实仍然处于编辑状态。这时才是下一次推荐的最佳时机。",
          points: ["设计「猜你想用」浮窗", "串联编辑能力，让体验不断线"],
          value: "从单次推荐变成连续服务。"
        },
        {
          title: "越用越懂用户",
          tag: "个性化模型",
          insight: "推荐的不只是照片。而是用户习惯。",
          points: ["结合内容画像与行为画像", "建立个人推荐模型"],
          value: "推荐越来越符合个人偏好。"
        },
        {
          title: "用数据创造回访理由",
          tag: "数据季报",
          insight: "数据报告不是总结。而是下一次使用的理由。",
          points: ["生成可分享的数据季报", "结合使用行为、标签偏好、AI 文案、视觉报告"],
          value: "提升留存与分享意愿。"
        }
      ],
      howItWorks: {
        title: "推荐系统如何工作",
        steps: ["用户搜索", "识别搜索内容", "理解搜索意图", "匹配推荐能力", "完成编辑", "猜你想用", "继续推荐", "持续学习用户偏好"]
      },
      designConcepts: [
        "推荐不是越多越好，而是越值得相信越好。",
        "推荐不是越早越好，而是在用户最需要的时候出现。",
        "推荐不是固定排序，而是持续学习。",
        "推荐不是完成任务，而是培养长期使用。"
      ],
      moreStrategies: [
        {
          title: "🔍 用户行为分析",
          items: ["高频功能", "中频功能", "待激活功能", "用户需求分层"]
        },
        {
          title: "✨ 搜索体验优化",
          items: ["多维组合搜索", "自然语言搜索", "搜索意图解析", "推荐理由展示"]
        },
        {
          title: "🧩 功能推荐映射",
          items: ["展示各功能对应的推荐场景与搜索关键词"]
        }
      ],
      stats: [
        { value: "12+", label: "推荐策略" },
        { value: "4", label: "核心策略" },
        { value: "2", label: "个性化模型" },
        { value: "1", label: "完整策略方案" }
      ],
      outputs: ["用户行为分析", "推荐策略框架", "功能推荐体系", "个性化模型设计", "情感化体验方案", "完整策略文档"]
    }
  },
  {
    slug: "4d-live-creative",
    title: "4D Live 影像创意策划",
    category: "洞察",
    categorySlug: "dongcha",
    role: "创意策划",
    status: "已输出完整创意方案",
    summary: "从苹果空间照片出发，探索影像还能如何被体验，让照片从「被看」变成「被探索」。",
    tags: ["创意策划", "体验创新", "传播设计"],
    report: {
      proposition: {
        title: "项目命题",
        quote: "空间照片已经解决了「看起来更真实」，还能不能让用户更愿意互动？",
        body: "苹果空间照片完成了：平面 → 空间、静态 → 轻动态、观看 → 轻参与。而我的思考是继续向前一步：如何让一张照片，变成一个值得探索的场景？"
      },
      strategyFlow: {
        title: "我的思考路径",
        body: "关注的不只是「照片怎么动」，而是用户为什么愿意反复玩、主动分享。",
        steps: ["空间照片", "重新定义体验", "设计互动方式", "创造传播玩法", "形成内容生态"]
      },
      strategyCards: [
        {
          title: "① 呼吸感影像",
          tag: "空间感 · 轻动态",
          insight: "不是让照片一直动。而是让用户感觉：它好像活着。",
          points: ["人物轻微呼吸、眨眼", "背景产生空间呼吸感", "手机倾斜触发空间位移"],
          value: "增强沉浸感，让用户愿意反复观察细节。"
        },
        {
          title: "② 口袋星球",
          tag: "玩具感 · 传播性",
          insight: "把世界缩进口袋。不是为了炫技，而是让用户产生：「这是我的世界。」",
          points: ["AI 自动生成星球效果", "手机倾斜产生球形运镜", "支持多人拼接与社交传播"],
          value: "低门槛、高视觉冲击，具备天然分享属性。"
        },
        {
          title: "③ 隐藏日记",
          tag: "探索感 · 情绪表达",
          insight: "照片不只是展示。还能藏内容。",
          points: ["转动手机出现隐藏文字", "双图片切换", "私密日记模式"],
          value: "从观看变成探索，让照片拥有「第二层内容」。"
        },
        {
          title: "④ 空间留言",
          tag: "空间交互 · 寻宝体验",
          insight: "贴纸不是贴在照片上。而是放进照片里。",
          points: ["空间深度定位", "物理惯性动画", "多角度触发隐藏内容"],
          value: "把照片变成可互动的空间。"
        }
      ],
      conceptMap: {
        title: "创意体系",
        body: "四个玩法并不是独立功能，而是一套围绕空间影像构建的新体验。",
        tree: ["空间照片", "├── 呼吸感", "├── 探索感", "├── 玩具感", "└── 社交感", "↓", "4D Live", "↓", "从观看", "↓", "到探索", "↓", "到分享"]
      },
      designConcepts: [
        "不是增加动画，而是增加「生命感」。",
        "不是增加玩法，而是增加探索欲。",
        "不是增加滤镜，而是创造新的表达方式。",
        "不是做一次传播，而是创造可以持续模仿的玩法。"
      ],
      moreStrategies: [
        {
          title: "📱 为什么适合小红书？",
          items: ["一眼理解玩法", "转动手机即可体验", "天然具备「试试看」传播钩子", "用户容易模仿与二创"]
        },
        {
          title: "🎥 短视频传播路径",
          items: ["口袋星球", "合拍玩法", "运镜卡点", "世界系列内容"]
        },
        {
          title: "✨ 概念包装",
          items: ["呼吸感影像：让照片拥有轻微空间生命感", "口袋星球：把世界握在手中"]
        }
      ],
      stats: [
        { value: "4", label: "核心玩法" },
        { value: "2", label: "传播概念" },
        { value: "5+", label: "场景脚本" },
        { value: "1", label: "完整创意方案" }
      ],
      outputs: ["4D Live 创意方案", "空间影像体验框架", "口袋星球传播方案", "隐藏日记玩法设计", "空间留言交互方案", "平台传播策略"]
    }
  },
  {
    slug: "data-management-platform",
    title: "数据采集管理平台",
    category: "创造",
    categorySlug: "chuangzao",
    role: "产品定义 / 交互设计 / Agent协同开发",
    status: "已上线使用",
    techStack: "待补充（React + 图表库 + 组件库 + 状态管理等）",
    preview: "全流程数据管理平台，涵盖不同角色权限、进度追踪、AI健康诊断与经验沉淀。从0到1由Vibe Coding驱动。",
    summary: "为数据采集团队搭建的内部管理平台，覆盖从项目创建、进度填报、人力追踪到经验复盘的完整链路。",
    tags: ["Vibe Coding", "产品定义"],
    buildFlow: {
      title: "开发方式：需求梳理 × AI Agent 结对开发",
      body: "平台的角色体系、信息架构与全部界面均由本人独立定义与设计，交互细节和前端工程实现通过 AI Agent 结对开发快速迭代——从需求到可用原型，是「设计驱动 + Agent 增效」的一次完整实践。",
      steps: ["角色与权限梳理", "信息架构 + 交互稿", "Agent 生成前端工程代码", "联调 · 细节打磨", "上线 · 持续迭代"]
    },
    capabilities: [
      {
        title: "① 身份鉴权与四级权限体系",
        subtitle: "RBAC · 行级权限 · 设备指纹",
        body: "登录鉴权层是整个平台的入口，不同身份所见及所能操作的内容完全不同，权限逐级收窄。",
        points: [
          "账号密码登录：识别管理员身份并分配对应权限",
          "演示登录：一键切换管理员 / 成员 / 访客身份，用于快速演示",
          "外部访客登录向导：三步引导（姓名白名单验证→设密码→完成），支持 Canvas 设备指纹免密二次登录",
          "四级角色权限逐级收窄：管理员全局读写 → 成员仅编辑本人数据行 → 访客只读汇总 → 外部访客仅填报"
        ],
        result: "一套系统覆盖内部管理与外部协作，身份边界清晰、数据安全可控"
      },
      {
        title: "② 项目导航与智能建项",
        subtitle: "卡片流 · Excel 五步导入向导",
        body: "项目列表页以卡片形式概览所有项目，是进入各项目详情的中枢，同时承担快速建项的入口。",
        points: [
          "项目卡片展示：状态徽章、进度条、负责人、周期等关键信息一览无余",
          "角色数据过滤：成员仅看到自己参与的项目，访客仅显示提示文字",
          "新建项目：弹窗表单录入项目基本信息并创建",
          "导入 Excel 建项：五步向导（上传文件→识别 Sheet→字段映射→数据校验→确认导入）"
        ],
        result: "从0到1建项的时间成本，从半天缩短到几分钟"
      },
      {
        title: "③ 汇总看板与AI健康诊断",
        subtitle: "数据可视化 · 智能评估",
        body: "通过图表和指标卡片，直观展示项目整体健康度和进度，降低管理者的数据解读成本。",
        points: [
          "AI健康诊断卡片：综合进度、效率、人力指标自动评定健康度（健康/关注/异常），打字机动效呈现",
          "四大核心指标卡 + 拍摄量趋势图 + 人力投入分布图，数字滚动与环形图动效呈现",
          "里程碑进度图 + 项目时间轴泳道图（算法侧/数据侧/外部三泳道）",
          "问题/风险汇总：按次数列出无效数据原因Top6，附快捷链接管理"
        ],
        result: "管理者无需翻阅多张表格，一屏即可掌握项目全貌"
      },
      {
        title: "④ 项目时间线与进度填报",
        subtitle: "里程碑管理 · 日进度 · 人力投入",
        body: "时间线、日进度、人力投入三张表共同构成项目执行的核心记录链路。",
        points: [
          "项目时间线：单主线时间轴设计，节点按业务侧（算法/数据/外部）着色，仅标注关键事件，告别割裂的百分比进度条",
          "日进度填报：双类型列头切换（画质/人像），无效数量自动计算，有效率渐变进度条预警，超7天自动锁定",
          "人力投入：按人天记录四类投入，当日自动求和，额外人力单元格自动标黄预警",
          "成员行隔离 + 实时汇总栏，随筛选联动更新"
        ],
        result: "进度、人力、异常在同一条时间轴上，被管理者一眼看穿"
      },
      {
        title: "⑤ 经验复盘与知识沉淀",
        subtitle: "标签分类 · 团队知识库",
        body: "项目结项不等于经验归零，复盘模块把踩坑与心得沉淀为团队可复用的知识资产。",
        points: [
          "经验录入：标题 + 正文内容，选择标签分类（经验总结/踩坑记录/流程优化/设备心得/其他）",
          "标签管理：预置5色标签，支持新增和删除自定义标签",
          "经验历史列表：按标签颜色区分，展示条目及作者、日期信息",
          "复盘详情页：独立页面呈现单条复盘的背景目标、关键问题、改进措施与后续建议",
          "文件上传区：拖拽交互，用于关联参考文件"
        ],
        result: "团队经验不再随人员流动而流失"
      },
      {
        title: "⑥ 通用能力基建",
        subtitle: "分享链接 · 审计日志 · 回收站 · 移动端",
        body: "跨模块的通用能力，覆盖协作、安全、容错、多端四大维度，让平台具备企业级工具的完整度。",
        points: [
          "最新动态：操作人+时间+内容的变更流水，重大变更支持一键回溯版本，普通编辑不打扰",
          "分享链接：三级权限（仅查看/可编辑/编辑+删除），可选提取码与有效期",
          "管理后台：审计日志（上限500条）、分享链接管理、数据回收站、账号管理",
          "数据回收站：软删除保留30天，支持一键恢复",
          "移动端适配：768px断点切换卡片表单布局；键盘快捷键 Ctrl+F 查找 / Ctrl+H 替换 / Ctrl+Z 撤销"
        ],
        result: "从单点功能集合，跃迁为系统性的产品能力"
      }
    ],
    platformMockups: {
      intro: "",
      projectList: {
        title: "项目列表页",
        desc: "卡片流总览 · 角色自动过滤 · Excel 五步导入建项",
        cards: [
          { name: "海外人像采集项目", status: "进行中", percent: 72, owner: "陈曦", manager: "林悦", requester: "算法组 · 周牧", cycle: "03-01 ~ 08-31" },
          { name: "逆光方案探索项目", status: "进行中", percent: 58, owner: "苏晴", manager: "赵航", requester: "数据组 · 黄漫", cycle: "04-15 ~ 09-30" },
          { name: "场景分类采集项目", status: "已结项", percent: 95, owner: "沈墨", manager: "韩雪", requester: "产品组 · 陈曦", cycle: "01-10 ~ 06-20" }
        ]
      },
      dashboard: {
        title: "汇总看板",
        desc: "AI健康诊断 · 核心指标 · 拍摄趋势曲线 · 人力分布 · 风险汇总",
        projectName: "海外人像采集项目",
        health: { level: "健康", note: "进度正常，建议关注人力瓶颈" },
        metrics: [
          { label: "当前采集量", value: "12,847" },
          { label: "目标总量", value: "20,000" },
          { label: "完成进度", value: "64.2%" },
          { label: "累计人力", value: "1,247 人天" }
        ],
        trend: [
          { day: "07-05", shot: 60, valid: 52 },
          { day: "07-07", shot: 72, valid: 64 },
          { day: "07-09", shot: 54, valid: 40 },
          { day: "07-11", shot: 88, valid: 80 },
          { day: "07-13", shot: 65, valid: 58 },
          { day: "07-14", shot: 93, valid: 86 }
        ],
        labor: [
          { label: "对齐拉通", value: 18, color: "var(--pm-blue)" },
          { label: "数据拍摄", value: 46, color: "var(--pm-sage)" },
          { label: "数据处理", value: 27, color: "var(--pm-taupe)" },
          { label: "额外人力", value: 9, color: "var(--pm-rose)" }
        ],
        risks: [
          { reason: "命名不规范", count: 34 },
          { reason: "镜头未擦拭", count: 27 },
          { reason: "画面偏移", count: 21 },
          { reason: "光线不足", count: 16 },
          { reason: "重复拍摄", count: 11 },
          { reason: "设备故障", count: 6 }
        ]
      },
      timeline: {
        title: "项目时间线",
        desc: "单一时间主轴 · 节点色区分业务侧 · 仅标注关键节点",
        legend: [
          { side: "algorithm", label: "算法侧", color: "var(--pm-red)" },
          { side: "data", label: "数据侧", color: "var(--pm-blue)" },
          { side: "external", label: "外部侧", color: "var(--pm-amber)" }
        ],
        nodes: [
          { date: "03-02", side: "algorithm", label: "算法侧提出采集需求", key: true },
          { date: "03-10", side: "data", label: "", key: false },
          { date: "03-18", side: "external", label: "", key: false },
          { date: "04-02", side: "data", label: "启动会召开", key: true },
          { date: "04-18", side: "external", label: "供应商筹备完成", key: true },
          { date: "05-02", side: "data", label: "第一阶段采集启动", key: true },
          { date: "06-10", side: "algorithm", label: "", key: false },
          { date: "07-01", side: "algorithm", label: "中期复盘完成", key: true }
        ]
      },
      activity: {
        title: "最新动态",
        desc: "操作人 · 修改时间 · 修改内容 · 重大变更支持一键回溯版本",
        items: [
          { operator: "陈曦", time: "07-14 16:20", content: "更新日进度填报规则：连续超7天未提交自动锁定", major: true },
          { operator: "林悦", time: "07-14 10:05", content: "修正项目卡片进度百分比显示口径", major: false },
          { operator: "周牧", time: "07-13 09:40", content: "新增「场景分类采集项目」并导入历史数据", major: true },
          { operator: "苏晴", time: "07-12 18:02", content: "调整看板筛选器默认时间范围", major: false },
          { operator: "赵航", time: "07-11 14:15", content: "移除里程碑百分比展示，改为时间线节点标注", major: true }
        ]
      },
      dailyReport: {
        title: "日进度填报",
        desc: "双类型列头 · 有效率预警 · 超7天自动锁定",
        rows: [
          { date: "07-14", shot: 320, valid: 298, invalid: 22, rate: 93, operator: "陈曦", locked: false, warn: false },
          { date: "07-13", shot: 280, valid: 251, invalid: 29, rate: 89, operator: "苏晴", locked: false, warn: false },
          { date: "07-12", shot: 150, valid: 112, invalid: 38, rate: 74, operator: "沈墨", locked: false, warn: false },
          { date: "07-11", shot: 410, valid: 385, invalid: 25, rate: 94, operator: "陈曦", locked: false, warn: false },
          { date: "07-02", shot: 180, valid: 84, invalid: 96, rate: 47, operator: "苏晴", locked: true, warn: true }
        ]
      },
      retro: {
        title: "项目复盘详情页",
        desc: "完整复盘内容 · 标签分类 · 附件关联 · 独立详情界面",
        entryTitle: "海外人像采集项目 · 中期复盘",
        tags: ["经验总结", "流程优化"],
        author: "陈曦",
        date: "2026-07-01",
        sections: [
          { heading: "背景与目标", content: "项目进入第一阶段中期，采集量已完成过半，需同步风险与人力投入情况，为第二阶段排期提供依据。" },
          { heading: "关键问题", content: "无效数据占比阶段性上升，主因设备未及时校准；外部供应商到货延迟5天，影响第一阶段启动节奏。" },
          { heading: "改进措施", content: "建立每周设备自检清单；供应商筹备节点提前至需求确认后48小时内锁定。" },
          { heading: "后续建议", content: "第二阶段前追加一次跨团队对齐会，提前锁定人力排期，避免额外人力集中在采集高峰期。" }
        ],
        attachments: ["采集规范_v2.pdf", "供应商筹备清单.xlsx"]
      }
    },
    metrics: [
      "4种角色 + 行级数据隔离",
      "5大功能标签页",
      "分享链接 · 审计日志 · 回收站",
      "已上线 · 覆盖团队日常管理全流程"
    ],
    outputs: ["权限体系设计方案", "五大功能模块交互原型", "AI健康诊断算法逻辑", "多端适配响应式方案", "平台全部页面UI"]
  },
  {
    slug: "dabao-pet",
    title: "Dabao Lens",
    category: "创造",
    categorySlug: "chuangzao",
    role: "产品定义 / 交互与体验设计 / 全栈开发",
    status: "持续迭代中",
    techStack: "Python + PySide6 + SQLite + APScheduler + OpenAI API",
    preview: "愿意使用的工具才是好工具——所以它先让自己变得可爱。",
    summary: "愿意使用的工具才是好工具——所以它先让自己变得可爱。",
    tags: ["Vibe Coding", "产品设计", "桌面应用"],
    capabilities: [
      {
        title: "你说一句话，它帮你落地",
        body: "「明天下午三点和小李开会，提前半小时提醒我」——达宝听懂了：时间解析出来了，提醒设置好了，月历上也标上了。你不需要打开任何 App，不需要切换任何界面。",
        points: [
          "意图解析：精准识别语言中的时间、地点、事件",
          "日程联动：一句话同时创建日程 + 定时提醒",
          "模式切换：工作指令和情感陪伴无缝切换",
          "主动推送：你关心什么，它告诉你什么（天气/新闻）"
        ]
      },
      {
        title: "图书馆：你的 AI 知识库",
        body: "粘贴任意文字进去——会议记录、文章段落、随手想法——达宝自动帮你生成标题、摘要和核心要点。碎片信息沉淀为可检索资产。再也不会「我记得看过这个但找不到了」。",
        points: [
          "自动生成标题 + 摘要 + 核心要点",
          "支持语义 + 关键词搜索，模糊词也能召回",
          "笔记一键推送为日程待办，知道了就去做"
        ]
      },
      {
        title: "会议小秘书：开完会直接落地",
        body: "把会议内容往达宝里一粘贴——输入一堆乱糟糟的会议内容，输出目标 / 重点 / 行动待办，行动项联动日程，纪要自动归档进图书馆。开完会，行动项直接进日历。不再有「开了会但没有下文」的窒息感。",
        points: [
          "自动提取目标、重点与行动待办",
          "行动待办联动日程，直接进日历",
          "纪要自动存入图书馆，沉淀为可检索资产"
        ]
      },
      {
        title: "摸摸虾呗（番茄钟）",
        body: "不是普通的计时器。专注时，达宝陪你安静地工作。休息时，它开始鼓励动画，把你从屏幕前拉回来。每一个番茄自动进复盘报告，专注数据可视化，成就感看得见。",
        points: [
          "专注 / 休息两种状态各自配套动画，不是冷冰冰的计时器",
          "每一个番茄自动进复盘报告",
          "专注数据可视化，成就感看得见"
        ]
      },
      {
        title: "复盘报告：对自己诚实",
        body: "达宝记得你做的每一件事：多少日程完成了、心情怎么样、专注了几小时——周报 / 月报 / 年报自动生成，还附赠 AI 温情洞察与执行建议。",
        points: [
          "自动生成周报 / 月报 / 年报",
          "AI 温情洞察 + 执行建议",
          "「你三月份的专注时长比二月多了40%，但心情日记里的'累'字也多了——要不要试试每天少排一个任务？」"
        ]
      },
      {
        title: "它完全是你的",
        body: "性格随心调（活泼 / 温柔 / 傲娇 / 鼓励型），背景可更换 MP4 动态背景，大小从 40% 到 300% 自由拖调。数据不上云，API Key 可选填，无网也能用。",
        points: [
          "性格随心调：换一个人设，达宝的语气和反应完全不同",
          "背景可更换：把小鸟放进你喜欢的世界里",
          "大小可拖调：角落里的存在感自己定",
          "本地优先：数据不上云，无网也能用"
        ]
      }
    ],
    petDemo: {
      images: {
        idle: "./assets/dabao/idle.jpg",
        work: "./assets/dabao/work.jpg",
        rest: "./assets/dabao/rest.jpg",
        alert: "./assets/dabao/alert.jpg",
        exercise: "./assets/dabao/exercise.jpg",
        fly: "./assets/dabao/fly.jpg"
      },
      background: "./assets/dabao/bg-winter.jpg"
    }
  }
];

window.SiteData = {
  getMixedFeed,
  getPhotographyCategory,
  getVideoCategory,
  photographyCategories,
  photographyWorks,
  siteMeta,
  videoCategories,
  videoWorks,
  writingEntries,
  projectCategories,
  projectWorks
};
