const config = {
  title: "DailyClack:))",
  description: "Do not go gentle into that good night.",  
  port: '9000',
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.png' }]
  ],
  themeConfig: {
    nav: [
      // { text: '首页', link: '/' },
      // { text: '主站', link: 'https://m1n9z.cn' },
    ],
    sidebarDepth: 0,
    displayAllHeaders: true,
    lastUpdated: 'Last Updated',
    sidebar: [
      {
        title: 'Home',
        collapsable: false,
        children: [
          // 'articles/001_home/changelog',
          'articles/001_home/todos',
          'articles/001_home/bookmark',
        ]
      },
      {
        title: 'q&a',
        collapsable: false,
        children: [
          'articles/000_qa/000001_algorithm',
          'articles/000_qa/000002_browser',
          'articles/000_qa/000003_css',
          'articles/000_qa/000004_ecmascript',
          'articles/000_qa/000005_write',
          'articles/000_qa/000006_engineering',
          'articles/000_qa/000007_framework',
          'articles/000_qa/000008_network',
          'articles/000_qa/000009_nodejs',
          'articles/000_qa/000010_open',
        ]
      },
      {
        title: '[读书笔记]浏览器工作原理与实战',
        collapsable: false,
        children: [
          'articles/100_readingNotes/browser/macroPerspective',
          'articles/100_readingNotes/browser/executionMechanism',
          'articles/100_readingNotes/browser/howV8Works',
          'articles/100_readingNotes/browser/eventLoop',
          'articles/100_readingNotes/browser/pageInBrowser',
          'articles/100_readingNotes/browser/networkInBrowser',
          'articles/100_readingNotes/browser/browserSecurity',
        ]
      },
      {
        title: '标准库',
        collapsable: false,
        children: [
          'articles/004_javascript/standardLibrary/array',
          'articles/004_javascript/standardLibrary/object',
          'articles/004_javascript/standardLibrary/promise',
        ]
      },
      {
        title: 'Javascript',
        collapsable: false,
        children: [
          // 'articles/004_javascript/004001_non-recursionClone',
          'articles/004_javascript/004002_aboutLazyMan',
          'articles/004_javascript/004003_arrayPrototypeReduce',
          'articles/004_javascript/004007_aboutReduce',
          'articles/004_javascript/004004_debounceAndThrottle',
          'articles/004_javascript/004005_jsonStringify',
          'articles/004_javascript/004006_promiseLimit',
          'articles/004_javascript/004008_extensionCompare',
          'articles/004_javascript/004009_eventloopInBrowserOrNodejs',
          'articles/004_javascript/004010_completeAssign',
          'articles/004_javascript/004011_createAndAssignInExtends',
          'articles/004_javascript/clone',
          'articles/004_javascript/eventloop',
          'articles/004_javascript/nextTick',
          'articles/004_javascript/fireEvent',
          'articles/004_javascript/operatorPrecedence',
          'articles/004_javascript/templateEngineWith50LinesOfCode',
          'articles/004_javascript/operatorIn',
          'articles/004_javascript/momentjs',
          'articles/004_javascript/functionOverload',
          'articles/004_javascript/004013_80percent',
          'articles/004_javascript/004014_advantagesOfVirtualDom',
        ]
      },
      {
        title: '函数式编程',
        collapsable: false,
        children: [
          'articles/004_javascript/functional/compose',
        ]
      },
      {
        title: 'Polyfill',
        collapsable: false,
        children: [
          'articles/004_javascript/polyfill/mypromise',
          'articles/004_javascript/polyfill/promise',
          'articles/004_javascript/polyfill/bind',
          'articles/004_javascript/polyfill/call',
          'articles/004_javascript/polyfill/apply',
          'articles/004_javascript/polyfill/new',
          'articles/004_javascript/polyfill/const',
          'articles/004_javascript/polyfill/instanceof',
          'articles/004_javascript/polyfill/create'
        ]
      },
      {
        title: '工程化',
        collapsable: false,
        children: [
          'articles/011_engineering/011001_optimize',
          'articles/011_engineering/011002_hmr',
          'articles/011_engineering/011003_devServer',
          'articles/011_engineering/011004_babel',
          'articles/011_engineering/011006_feSeamlessBuryingPoint',
          'articles/011_engineering/011007_skeletonScreenSolution',
          'articles/011_engineering/011008_vueProjectPerformanceOptimization',
          'articles/011_engineering/011009_gitBestPractices',
          'articles/011_engineering/011010_microFe',
          'articles/011_engineering/011011_upload',
          'articles/011_engineering/011012_webpack',
          'articles/011_engineering/011013_i18ntester',
          ]
      },
      {
        title: '模块化',
        collapsable: false,
        children: [
          'articles/004_javascript/modularization/AMD',
          'articles/004_javascript/modularization/CMD',
          'articles/004_javascript/modularization/CJS',
          'articles/004_javascript/modularization/ESM',
          'articles/004_javascript/modularization/UMD',
          'articles/004_javascript/modularization/commonjsAndAmdAndEs6module',
        ]
      },
      {
        title: 'ECMAScript6',
        collapsable: false,
        children: [
          // 字符串的扩展
          'articles/005_es6/005001_stringExtension',
          // 字符串的新增方法
          'articles/005_es6/005002_stringMethods',
          // 数值的扩展
          'articles/005_es6/005003_numberExtension',
          // 函数的扩展
          'articles/005_es6/005004_functionExtension',
          // 数组的扩展
          'articles/005_es6/005005_arrayMethods',
          // 对象的扩展
          'articles/005_es6/005006_objectExtension',
          // 对象的新增方法
          'articles/005_es6/005007_objectMethods',
          // Symbol
          'articles/005_es6/005008_symbol',
          // Set & Map
          'articles/005_es6/005009_setmap',
          // Proxy
          'articles/005_es6/005010_proxy',
          // Reflect
          'articles/005_es6/005011_reflect',
          // Promise
          'articles/005_es6/005012_promise',
          // generator
          'articles/005_es6/005013_generator',
          'articles/005_es6/005014_generator',
          'articles/005_es6/005015_generator',
          // async函数
          'articles/005_es6/005016_async',
          // class
          'articles/005_es6/005017_class',
          // module
          'articles/005_es6/005018_module',
          // decorator
          'articles/005_es6/005019_decorator',
        ]
      },
      {
        title: 'HTML5',
        collapsable: false,
        children: [
          'articles/002_browser/002001_newFeaturesOfHTML5',
          'articles/002_browser/002003_historyApi',
          'articles/002_browser/002004_performanceApi',
          'articles/002_browser/002005_storageApi',
          'articles/002_browser/002006_event',
          'articles/002_browser/002002_draggableApi',
          'articles/002_browser/002007_intersectionObserverApi',
          'articles/002_browser/002008_messageChannelApi',
          'articles/002_browser/002009_performanceApiAndHtmlLifecycle',
          'articles/002_browser/002010_rasterization',
        ]
      },
      {
        title: 'CSS',
        collapsable: false,
        children: [
          'articles/003_layout/003001_flex',
          'articles/003_layout/003002_generalLayoutScheme',
          'articles/003_layout/003003_position',
          'articles/003_layout/003004_grailLayout',
          'articles/003_layout/003005_pointerEvents',
          'articles/003_layout/css3GpuHardwareAccelerated',
          'articles/003_layout/cssDebuggerWithOneLineCode',
        ]
      },
      {
        title: '前端',
        collapsable: false,
        children: [
          'articles/006_frontend/006001_frommemorycacheAndFromdiskcache',
          'articles/006_frontend/curl',
          'articles/006_frontend/mime',
          'articles/006_frontend/wireshark',
          'articles/006_frontend/dollarInChrome',
        ]
      },
      {
        title: '网络协议',
        collapsable: false,
        children: [
          'articles/007_networkProtocol/007001_cookie',
          'articles/007_networkProtocol/007002_httpNote',
          'articles/007_networkProtocol/007003_queryStringAndFormDataAndRequestPayload',
          'articles/007_networkProtocol/007004_tcp',
          'articles/007_networkProtocol/007005_https',
          'articles/007_networkProtocol/007006_http2',
          'articles/007_networkProtocol/007007_websocket',
          'articles/007_networkProtocol/007008_requestProcess',
          'articles/007_networkProtocol/007009_httpCache',
          'articles/007_networkProtocol/localhostAnd127.0.0.1',
          'articles/007_networkProtocol/007010_tcp',
        ]
      },
      {
        title: '算法',
        collapsable: false,
        children: [
          'articles/008_algorithm/008001_complexity',
          'articles/008_algorithm/008002_arraySort',
          'articles/008_algorithm/008003_arrayFlat',
          'articles/008_algorithm/008004_dynamicProgramming',
          'articles/008_algorithm/008005_draft',
          'articles/008_algorithm/008006_dataStructure',
          'articles/008_algorithm/008007_arraySortPlus',
          'articles/008_algorithm/008009_binaryTree',
          'articles/008_algorithm/008010_summary',
          'articles/008_algorithm/otherArrayOperations',
          'articles/008_algorithm/interviewQuestion',
        ]
      },
      {
        title: 'Nodejs',
        collapsable: false,
        children: [
          'articles/009_node/009001_koa-compose',
          'articles/009_node/009002_nodebestpractices',
          'articles/009_node/nodemodule',
          'articles/009_node/packagejsonMainModueAndBrowser',
        ]
      },
      {
        title: '框架',
        collapsable: false,
        children: [
          'articles/010_framework/010001_snabbdomCodeReview',
          'articles/010_framework/010002_vueCli3',
          'articles/010_framework/010003_vueMini',
          'articles/010_framework/010004_reactQA',
          'articles/010_framework/vueAsyncErrorHandler',
        ]
      },
      {
        title: 'Vue Code Review' ,
        collapsable: false,
        children: [
          'articles/010_framework/vueCodeReview/010001001_codereview',
          'articles/010_framework/vueCodeReview/010001002_codereview',
          'articles/010_framework/vueCodeReview/010001003_codereview',
        ]
      },
      // {
      //   title: 'Vue Api Review',
      //   collapsable: false,
      //   children: [
      //     'articles/010_framework/vueApiReview/essentials',
      //     'articles/010_framework/vueApiReview/componentsInDepth',
      //   ]
      // },
      {
        title: '前端安全',
        collapsable: false,
        children: [
          'articles/012_webSecurity/012001_xss',
          'articles/012_webSecurity/012002_csrf',
        ]
      },
      // {
      //   title: '转载内容梳理',
      //   collapsable: false,
      //   children: [
      //     'articles/020_reprint/inputUrlToDisplay',
      //   ]
      // },
      {
        title: '[读书笔记]你不知道的JavaScript',
        collapsable: false,
        children: [
          'articles/100_readingNotes/uDontKnowJs/FirstVolumeChapterOne',
          'articles/100_readingNotes/uDontKnowJs/SecondVolumeChapterOne',
        ]
      },
      // {
      //   title: '[读书笔记]JS框架设计',
      //   collapsable: false,
      //   children: [
      //     'articles/100_readingNotes/JsFrameworkDesign/JsFrameworkDesign',
      //   ]
      // },
      {
        title: '[读书笔记]HTTP权威指南',
        collapsable: false,
        children: [
          'articles/100_readingNotes/theDefinitiveGuide4http/theDefinitiveGuide4http.md',
        ]
      },
      {
        title: '[读书笔记]高级程序设计',
        collapsable: false,
        children: [
          'articles/100_readingNotes/professional/chapter6',
          'articles/100_readingNotes/professional/chapter7',
          'articles/100_readingNotes/professional/chapter13',
          'articles/100_readingNotes/professional/chapter14',
        ]
      },
      // {
      //   title: 'Mac',
      //   collapsable: false,
      //   children: [
      //     'articles/200_tools/mac/note',
      //     'articles/200_tools/mac/FANQIANG',
      //     'articles/200_tools/mac/terminalCommand',
      //   ]
      // },
      // {
      //   title: '杂记',
      //   collapsable: false,
      //   children: [
      //     'articles/200_tools/vuepress',
      //   ]
      // },
      {
        title: '计算机基础',
        collapsable: false,
        children: [
          'articles/300_computer/base',
          'articles/300_computer/300001_ipc',
        ]
      },
      // {
      //   title: '设计模式',
      //   collapsable: false,
      //   children: [
      //     'articles/400_designPatterns/singleton',
      //     'articles/400_designPatterns/watcher',
      //     'articles/400_designPatterns/decorator',
      //     'articles/400_designPatterns/producerconsumer',
      //     'articles/400_designPatterns/proxy',
      //   ]
      // },
      // {
      //   title: '键圈日记',
      //   collapsable: false,
      //   children: [
      //     'articles/500_keyboard/spKeycaps',
      //     'articles/500_keyboard/gmkKeycaps',
      //     'articles/500_keyboard/artisan',
      //     'articles/500_keyboard/keyboard',
      //     'articles/500_keyboard/collection',
      //     'articles/500_keyboard/nintendo',
      //   ]
      // },
      // {
      //   title: '树莓派',
      //   collapsable: false,
      //   children: [
      //     'articles/600_RaspberryPi/raspberryPiNote',
      //   ]
      // }
    ]
  }
}

// 收起
// config.themeConfig.sidebar.forEach((item) => {
//   item.collapsable = true;
// })

module.exports = config;