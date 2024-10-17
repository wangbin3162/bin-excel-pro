# Excel-pro

报表设计平台

1、安装基础依赖

```shell
pnpm add @univerjs/core @univerjs/design @univerjs/docs @univerjs/docs-ui @univerjs/engine-formula @univerjs/engine-render @univerjs/sheets @univerjs/sheets-formula @univerjs/sheets-ui @univerjs/ui
```

2、安装推荐 @univerjs/facade

```shell
pnpm add @univerjs/facade
```

3、全量更新

```shell
pnpm update "@univerjs/*" "@univerjs-pro/*" @latest
```

4、vite插件

```shell
pnpm add @univerjs/vite-plugin -D
```

5、将插件添加到 vite.config.js

```js
import { defineConfig } from 'vite'
import { univerPlugin } from '@univerjs/vite-plugin'

export default defineConfig({
  plugins: [univerPlugin()],
})
```
