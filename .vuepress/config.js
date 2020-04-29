module.exports = {
  title: "DailyClack:))",
  description: "Do not go gentle into that good night.",  
  port: '9000',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '主站', link: 'https://m1n9z.cn' },
    ],
    sidebarDepth: 0,
    displayAllHeaders: true,
    lastUpdated: 'Last Updated',
    sidebar: [
      {
        title: '首页',
        collapsable: false,
        children: [
          'notes/001_home/home',
        ]
      },
      {
        title: 'HTML5',
        collapsable: false,
        children: [
          'notes/002_html5/002001_newFeaturesOfHTML5',
          'notes/002_html5/002002_draggableApi',
          'notes/002_html5/002003_historyApi',
          'notes/002_html5/002004_performanceApi',
          'notes/002_html5/002005_storageApi',
          'notes/002_html5/002006_event',
        ]
      },
      {
        title: 'Layout',
        collapsable: false,
        children: [
          'notes/003_layout/css3GpuHardwareAccelerated',
          'notes/003_layout/flex',
          'notes/003_layout/generalLayoutScheme',
          'notes/003_layout/pointerEvents',
          'notes/003_layout/cssDebuggerWithOneLineCode',
          'notes/003_layout/position',
        ]
      },
      {
        title: 'Javascript',
        collapsable: false,
        children: [
          'notes/004_javascript/clone',
          'notes/004_javascript/debounceAndThrottle',
          'notes/004_javascript/eventloop',
          'notes/004_javascript/nextTick',
          'notes/004_javascript/fireEvent',
          'notes/004_javascript/operatorPrecedence',
          'notes/004_javascript/templateEngineWith50LinesOfCode',
          'notes/004_javascript/operatorIn',
          'notes/004_javascript/momentjs',
          'notes/004_javascript/functionOverload',
          'notes/004_javascript/arrayPrototypeReduce',
          'notes/004_javascript/jsonStringify',
          'notes/004_javascript/promiseLimit',
          'notes/004_javascript/aboutLazyMan'
        ]
      },
      {
        title: 'Polyfill',
        collapsable: false,
        children: [
          'notes/004_javascript/polyfill/_promise',
          'notes/004_javascript/polyfill/bind',
          'notes/004_javascript/polyfill/callAndApply',
          'notes/004_javascript/polyfill/new',
          'notes/004_javascript/polyfill/promise',
        ]
      },
      {
        title: '模块化',
        collapsable: false,
        children: [
          'notes/004_javascript/modularization/CMDstandard',
          'notes/004_javascript/modularization/commonjsAndAmdAndEs6module',
        ]
      },
      {
        title: 'ECMAScript6',
        collapsable: false,
        children: [
          'notes/005_es6/005001_stringExtension',
          'notes/005_es6/005002_stringMethods',
          'notes/005_es6/005003_numberExtension',
          'notes/005_es6/005004_generator',
          'notes/005_es6/005005_generator',
          'notes/005_es6/005006_generator',
          'notes/005_es6/functionExtension',
          'notes/005_es6/arrayMethods',
          'notes/005_es6/objectExtension',
          'notes/005_es6/proxy',
          'notes/005_es6/reflect',
        ]
      },
      {
        title: 'FrontEnd',
        collapsable: false,
        children: [
          'notes/006_frontend/cache',
          'notes/006_frontend/complexity',
          'notes/006_frontend/curl',
          'notes/006_frontend/frommemorycacheAndFromdiskcache',
          'notes/006_frontend/interface',
          'notes/006_frontend/mime',
          'notes/006_frontend/wireshark',
          'notes/006_frontend/dollarInChrome',
        ]
      },
      {
        title: '网络协议',
        collapsable: false,
        children: [
          'notes/007_networkProtocol/httpNote',
          'notes/007_networkProtocol/cookie',
          'notes/007_networkProtocol/localhostAnd127.0.0.1',
          'notes/007_networkProtocol/queryStringAndFormDataAndRequestPayload.md',
        ]
      },
      {
        title: '算法',
        collapsable: false,
        children: [
          'notes/008_algorithm/arraySort',
          'notes/008_algorithm/otherArrayOperations',
          'notes/008_algorithm/interviewQuestion',
          'notes/008_algorithm/dynamicProgramming',
          'notes/008_algorithm/draft',
        ]
      },
      {
        title: 'Node',
        collapsable: false,
        children: [
          'notes/009_node/nodemodule',
          'notes/009_node/packagejsonMainModueAndBrowser',
          'notes/009_node/koa-compose',
          'notes/009_node/egg',
        ]
      },
      {
        title: 'Vue',
        collapsable: false,
        children: [
          'notes/010_vue/vueAsyncErrorHandler',
          'notes/010_vue/vueMini',
          'notes/010_vue/snabbdomCodeReview',
          'notes/010_vue/vueCli3',
        ]
      },
      {
        title: 'Vue Code Review' ,
        collapsable: false,
        children: [
          'notes/010_vue/vueCodeReview/010001001_codereview',
          'notes/010_vue/vueCodeReview/010001002_codereview',
          'notes/010_vue/vueCodeReview/010001003_codereview',
        ]
      },
      {
        title: 'Vue Api Review',
        collapsable: false,
        children: [
          'notes/010_vue/vueApiReview/essentials',
          'notes/010_vue/vueApiReview/componentsInDepth',
        ]
      },
      {
        title: '工程化',
        collapsable: false,
        children: [
          'notes/011_engineering/webpack/dy',
        ]
      },
      {
        title: '前端安全',
        collapsable: false,
        children: [
          'notes/012_webSecurity/xss',
          'notes/012_webSecurity/csrf',
        ]
      },
      {
        title: '[读书笔记]你不知道的JavaScript',
        collapsable: false,
        children: [
          'notes/100_readingNotes/uDontKnowJs/FirstVolumeChapterOne',
          'notes/100_readingNotes/uDontKnowJs/SecondVolumeChapterOne',
        ]
      },
      {
        title: '[读书笔记]JS框架设计',
        collapsable: false,
        children: [
          'notes/100_readingNotes/JsFrameworkDesign/JsFrameworkDesign',
        ]
      },
      {
        title: '[读书笔记]HTTP权威指南',
        collapsable: false,
        children: [
          'notes/100_readingNotes/theDefinitiveGuide4http/theDefinitiveGuide4http.md',
        ]
      },
      {
        title: '[读书笔记]高级程序设计',
        collapsable: false,
        children: [
          'notes/100_readingNotes/professional/chapter6',
          'notes/100_readingNotes/professional/chapter7',
          'notes/100_readingNotes/professional/chapter13',
          'notes/100_readingNotes/professional/chapter14',
        ]
      },
      {
        title: 'Mac',
        collapsable: false,
        children: [
          'notes/200_tools/mac/note',
          'notes/200_tools/mac/FANQIANG',
          'notes/200_tools/mac/terminalCommand',
        ]
      },
      {
        title: '杂记',
        collapsable: false,
        children: [
          'notes/200_tools/vuepress',
        ]
      },
      {
        title: '计算机基础',
        collapsable: false,
        children: [
          'notes/300_computer/base',
        ]
      },
      {
        title: '设计模式',
        collapsable: false,
        children: [
          'notes/400_designPatterns/singleton',
          'notes/400_designPatterns/watcher',
          'notes/400_designPatterns/decorator',
          'notes/400_designPatterns/producerconsumer',
          'notes/400_designPatterns/proxy',
        ]
      },
      {
        title: '键圈日记',
        collapsable: false,
        children: [
          'notes/500_keyboard/spKeycaps',
          'notes/500_keyboard/gmkKeycaps',
          'notes/500_keyboard/artisan',
          'notes/500_keyboard/keyboard',
          'notes/500_keyboard/collection',
          'notes/500_keyboard/nintendo',
        ]
      },
    ]
  }
}