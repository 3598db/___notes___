const config = {
  title: "DailyClack:))",
  description: "Do not go gentle into that good night.",  
  port: '9000',
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.png' }]
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
          'notes/001_home/bookmark',
        ]
      },
      {
        title: '掘墓' ,
        collapsable: false,
        children: [
          'notes/000_secret/000001_fe',
          'notes/000_secret/000002_es',
          'notes/000_secret/000003_react',
        ]
      },
      {
        title: 'HTML5',
        collapsable: false,
        children: [
          'notes/002_html5/002001_newFeaturesOfHTML5',
          'notes/002_html5/002003_historyApi',
          'notes/002_html5/002004_performanceApi',
          'notes/002_html5/002005_storageApi',
          'notes/002_html5/002006_event',
          'notes/002_html5/002002_draggableApi',
          'notes/002_html5/002007_intersectionObserverApi',
          'notes/002_html5/002008_messageChannelApi',
        ]
      },
      {
        title: 'Layout',
        collapsable: false,
        children: [
          'notes/003_layout/003001_flex',
          'notes/003_layout/003002_generalLayoutScheme',
          'notes/003_layout/003003_position',
          'notes/003_layout/003004_grailLayout',
          'notes/003_layout/css3GpuHardwareAccelerated',
          'notes/003_layout/pointerEvents',
          'notes/003_layout/cssDebuggerWithOneLineCode',
        ]
      },
      {
        title: 'Javascript',
        collapsable: false,
        children: [
          'notes/004_javascript/004001_non-recursionClone',
          'notes/004_javascript/004002_aboutLazyMan',
          'notes/004_javascript/004003_arrayPrototypeReduce',
          'notes/004_javascript/004007_aboutReduce',
          'notes/004_javascript/004004_debounceAndThrottle',
          'notes/004_javascript/004005_jsonStringify',
          'notes/004_javascript/004006_promiseLimit',
          'notes/004_javascript/004008_extensionCompare',
          'notes/004_javascript/004009_eventloopInBrowserOrNodejs',
          'notes/004_javascript/004010_completeAssign',
          'notes/004_javascript/004011_createAndAssignInExtends',
          'notes/004_javascript/clone',
          'notes/004_javascript/eventloop',
          'notes/004_javascript/nextTick',
          'notes/004_javascript/fireEvent',
          'notes/004_javascript/operatorPrecedence',
          'notes/004_javascript/templateEngineWith50LinesOfCode',
          'notes/004_javascript/operatorIn',
          'notes/004_javascript/momentjs',
          'notes/004_javascript/functionOverload',
          'notes/004_javascript/004013_80percent',
        ]
      },
      {
        title: 'Polyfill',
        collapsable: false,
        children: [
          'notes/004_javascript/polyfill/mypromise',
          'notes/004_javascript/polyfill/promise',
          'notes/004_javascript/polyfill/bind',
          'notes/004_javascript/polyfill/call',
          'notes/004_javascript/polyfill/apply',
          'notes/004_javascript/polyfill/new',
          'notes/004_javascript/polyfill/const',
          'notes/004_javascript/polyfill/instanceof',
          'notes/004_javascript/polyfill/create'
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
          // 字符串的扩展
          'notes/005_es6/005001_stringExtension',
          // 字符串的新增方法
          'notes/005_es6/005002_stringMethods',
          // 数值的扩展
          'notes/005_es6/005003_numberExtension',
          // 函数的扩展
          'notes/005_es6/005004_functionExtension',
          // 数组的扩展
          'notes/005_es6/005005_arrayMethods',
          // 对象的扩展
          'notes/005_es6/005006_objectExtension',
          // 对象的新增方法
          'notes/005_es6/005007_objectMethods',
          // Symbol
          'notes/005_es6/005008_symbol',
          // Set & Map
          'notes/005_es6/005009_setmap',
          // Proxy
          'notes/005_es6/005010_proxy',
          // Reflect
          'notes/005_es6/005011_reflect',
          // Promise
          'notes/005_es6/005012_promise',
          // generator
          'notes/005_es6/005013_generator',
          'notes/005_es6/005014_generator',
          'notes/005_es6/005015_generator',
          // async函数
          'notes/005_es6/005016_async',
          // class
          'notes/005_es6/005017_class',
          // module
          'notes/005_es6/005018_module',
          // decorator
          'notes/005_es6/005019_decorator',
        ]
      },
      {
        title: 'FrontEnd',
        collapsable: false,
        children: [
          'notes/006_frontend/006001_frommemorycacheAndFromdiskcache',
          'notes/006_frontend/curl',
          'notes/006_frontend/mime',
          'notes/006_frontend/wireshark',
          'notes/006_frontend/dollarInChrome',
        ]
      },
      {
        title: '网络协议',
        collapsable: false,
        children: [
          'notes/007_networkProtocol/007001_cookie',
          'notes/007_networkProtocol/007002_httpNote',
          'notes/007_networkProtocol/007003_queryStringAndFormDataAndRequestPayload',
          'notes/007_networkProtocol/007004_tcp',
          'notes/007_networkProtocol/007005_https',
          'notes/007_networkProtocol/007006_http2',
          'notes/007_networkProtocol/007007_websocket',
          'notes/007_networkProtocol/007008_requestProcess',
          'notes/007_networkProtocol/007009_httpCache',
          'notes/007_networkProtocol/localhostAnd127.0.0.1',
        ]
      },
      {
        title: '算法',
        collapsable: false,
        children: [
          'notes/008_algorithm/008001_complexity',
          'notes/008_algorithm/008002_arraySort',
          'notes/008_algorithm/008003_arrayFlat',
          'notes/008_algorithm/008004_dynamicProgramming',
          'notes/008_algorithm/008005_draft',
          'notes/008_algorithm/008006_dataStructure',
          'notes/008_algorithm/008007_arraySortPlus',
          'notes/008_algorithm/008009_binaryTree',
          'notes/008_algorithm/otherArrayOperations',
          'notes/008_algorithm/interviewQuestion',
        ]
      },
      {
        title: 'Node',
        collapsable: false,
        children: [
          'notes/009_node/009001_koa-compose',
          'notes/009_node/009002_nodebestpractices',
          'notes/009_node/nodemodule',
          'notes/009_node/packagejsonMainModueAndBrowser',
        ]
      },
      {
        title: 'Vue',
        collapsable: false,
        children: [
          'notes/010_vue/010001_snabbdomCodeReview',
          'notes/010_vue/010002_vueCli3',
          'notes/010_vue/010003_vueMini',
          'notes/010_vue/vueAsyncErrorHandler',
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
          'notes/011_engineering/011001_optimize',
          'notes/011_engineering/011002_hmr',
          'notes/011_engineering/011003_devServer',
          'notes/011_engineering/011004_babel',
        ]
      },
      {
        title: '前端安全',
        collapsable: false,
        children: [
          'notes/012_webSecurity/012001_xss',
          'notes/012_webSecurity/012002_csrf',
        ]
      },
      {
        title: '转载内容梳理',
        collapsable: false,
        children: [
          'notes/020_reprint/inputUrlToDisplay',
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
      // {
      //   title: '键圈日记',
      //   collapsable: false,
      //   children: [
      //     'notes/500_keyboard/spKeycaps',
      //     'notes/500_keyboard/gmkKeycaps',
      //     'notes/500_keyboard/artisan',
      //     'notes/500_keyboard/keyboard',
      //     'notes/500_keyboard/collection',
      //     'notes/500_keyboard/nintendo',
      //   ]
      // },
      {
        title: '树莓派',
        collapsable: false,
        children: [
          'notes/600_RaspberryPi/raspberryPiNote',
        ]
      }
    ]
  }
}

// 收起
// config.themeConfig.sidebar.forEach((item) => {
//   item.collapsable = true;
// })

module.exports = config;