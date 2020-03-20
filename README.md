# bitbar-js

一个 BitBar js 脚本辅助工具。

灵感来源于 [sindresorhus/bitbar](https://github.com/sindresorhus/bitbar)

Inspired by [sindresorhus/bitbar](https://github.com/sindresorhus/bitbar)

## 使用方法

在 BitBar 的插件目录，首先安装依赖

```bash
npm install bitbar-js
```

之后可以编写你的模块了，比如建立文件 `test.1d.js`：

```js
#!/usr/bin/env /usr/local/bin/node
const bitbar = require('bitbar-js');

bitbar([
  {
    text: '❤',
    color: 'red',
    dropdown: false
  }
])
```

## API

### bitbar(items, options?) 或 bitbar.create(items, options?)

**配置每个栏目item的例子**

```js
// 一个简单的例子
{
  text: '❤',
  color: 'red'
}

// 带有子栏目的例子
{
  text: 'AA',
  color: 'red',
  submenu: [
    {
      text: 'AA-1',
      color: 'blue'
    },
    'AA-2' // 对于只有 text 的情况，可以简写为字符串形式
  ]
}
```

`text` 为显示的内容，`submenu` 为子栏目。其它选项，参考 [BitBar-Plugin-API](https://github.com/matryer/bitbar#plugin-api)。

#### options

如果每个栏目都有相同的配置，可以直接配置到 `options` 上。例如：

```js
bitbar([
  { 
    text: 'AA',
  },
  {
    text: 'BB',
  },
  {
    text: 'CC',
    color: 'blue',
  }
], {color: 'red'})
```

等同于：

```js
bitbar([
  {
    text: 'AA',
    color: 'red',
  },
  {
    text: 'BB',
    color: 'red',
  },
  {
    text: 'CC',
    color: 'blue',
  }
])
```

### bitbar.separator

分隔符，也可以用字符串 `---` 代替。

### bitbar.darkMode

是否为深色模式。


## 已知问题

1. 内容中含有引号 `"` `'`，我也不知道如何处理。[sindresorhus/bitbar](https://github.com/sindresorhus/bitbar) 对 URL 进行了转义。

## 错误码

| 错误码  | 原因  |
|---|---|
| 1001  | 栏目item类型错误，每行数据支持 string / object |
| 1002  | 栏目item缺少字段，需要提供 `text` 字段 |
| 1003  | 栏目item中，字段的值类型错误，支持 string/number/boolean |
