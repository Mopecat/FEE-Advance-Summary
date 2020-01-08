module.exports = {
  base: '/web/',
  dest: 'web',
  title: '前端进阶之路',
  description: '前端学习记录',
  themeConfig: {
    editLinks: false,
    docsDir: 'docs',
    nav: [],
    sidebar: [
      {
        title: '面试题记录',
        collapsable: true,
        path:'chapter1/'
      },
      {
        title: '设计模式学习记录',
        collapsable: true,
        path: 'chapter2/'
      },
      {
        title: 'JavaScript 进阶笔记',
        collapsable: true,
        children: [
          'chapter3/this篇/',
          'chapter3/闭包篇/',
          'chapter3/函数应用篇/',
          'chapter3/ES6+/',
          'chapter3/Promise篇/',
        ]
      },
      {
        title: 'Node 学习记录',
        collapsable: true,
        children: [
          'chapter4/',
          'chapter4/core/',
          'chapter4/http/http-1',
          'chapter4/http/http-2',
          'chapter4/http/http-3',
        ]
      },
      {
        title: 'npm 学习记录',
        collapsable: true,
        path: 'chapter5/'
      },
      {
        title: '性能优化',
        collapsable: true,
        path:'chapter6/'
      },
      {
        title: '数据结构与算法',
        collapsable: true,
        path:'chapter7/'
      },
    ]
  }
}
