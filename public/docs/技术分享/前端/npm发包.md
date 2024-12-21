# 一、创建账号

在 [npm 官网](https://www.npmjs.com) 注册并创建 npm 账号

# 二、创建 npm 包

创建并初始化 package.json 文件

```powershell
npm init
# or
yarn init
# or
pnpm init
```

大概结构如下：

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

目录结构先这样就行，后面有需要再添加或修改

# 三、编写代码

按正常写代码那样写就好，自己需要什么功能就写什么功能。例如在更目录下创建一个`index.js` 文件

```javascript
console.log("第一个插件！");
```

# 四、打包

我们打包一下，这里使用 rollup 打包，当然你也可以使用 webpack 打包，或者其他的打包工具，这里不做过多介绍

```shell
npm i rollup -D
```

在根目录下创建一个`rollup.config.js`文件，内容如下：

```javascript
import path from "path";

// 一个Rollup插件，用于从node_modules里加载模块, 安装命令: pnpm i @rollup/plugin-node-resolve -D
import resolve from "@rollup/plugin-node-resolve";

// 一个Rollup插件，用于将TypeScript转换为JavaScript, 安装命令: pnpm i rollup-plugin-typescript2 -D
// 这里没有使用 ts 所以注释掉了
// import { terser } from "rollup-plugin-terser";

// 一个Rollup插件，用于将TypeScript转换为JavaScript, 安装命令: pnpm i rollup-plugin-typescript2 -D
// 这里没有使用 ts 所以注释掉了
// import typescript from "rollup-plugin-typescript2";

// 一个Rollup插件，用于将CommonJS模块转换为ES6，以便将其包含在Rollup包中, 安装命令: pnpm i @rollup/plugin-commonjs -D
// 如果你的代码中使用了CommonJS模块，那么就需要使用这个插件，我这里不需要，所以注释掉了
// import commonjs from "@rollup/plugin-commonjs";

// 一个Rollup插件，用于从JSON文件中读取数据,  安装命令: pnpm i @rollup/plugin-json -D
// 如果你的代码中使用了JSON文件，那么就需要使用这个插件
// import json from "@rollup/plugin-json";
// import pkg from "./package.json";

const resolveFile = function (filePath) {
  return path.join(__dirname, filePath);
};

export default {
  // 这里是打包入口文件
  input: resolveFile("index.js"),
  /**
   * 打包出口文件
   * 这里看自己的需求添加
   * 可以只打包成 umd 模块，也可以打包成 umd 和 es module 模块
   */
  output: [
    // 这里是打包成 es module 模块的配置, commonjs 模块
    {
      file: resolveFile('dist/index.js'),
      format: "cjs",
    },
    // 这里是打包成 umd 模块的配置 es module 模块
    {
      file: resolveFile('dist/index.esm.js'),
      format: "es",
    },
    // 这里是打包成 umd 模块的配置 umd 模块
    {
      file: resolveFile('dist/index.umd.js'),
      format: "umd",
      name: "plugin-name",
    },
  ],
  // 这里是要使用的插件,这里看自己的需求添加
  plugins:{
    resolve(),
    //   commonjs(),
    json(),
    //   typescript({
    //     tsconfig: resolveFile("tsconfig.json"),
    //   }),
  },
};
```

然后在`package.json`文件中添加打包命令

```json
{
  "scripts": {
    "build": "rollup -c"
  }
}
```

你也可以添加一些其他的,例如：

```json
{
  "name": "plugin-name", // 包名
  "version": "1.0.0", // 包版本号
  "description": "代码块 Vue", // 包描述
  "keywords": [
    // 关键字, 用于搜索
    "codeblock"
  ],
  "type": "module", // 包的类型，可以是 commonjs 或者 es module
  "main": "dist/index.js", // 默认入口文件

  // 下面注释是可选的，可以根据需要添加，如果需要打包成 umd 模块或者 es module 模块，可以添加
  // "module": "dist/index.esm.js",        // es mouule 入口文件
  // "browser": "dist/index.js",           // 浏览器入口文件

  // 这个是 ts 的声明文件入口文件，如果你的包是用 ts 写的，那么可以添加
  // "types": "dist/index.d.ts",           // ts 声明文件入口文件

  // 这个是你要发布的文件，可以是文件夹，也可以是文件，如果是文件夹，那么会发布文件夹下的所有文件
  "files": [
    // 需要发布的文件
    "dist"
  ],
  "author": "xie392", // 作者
  "license": "MIT", // 开源协议
  // 这里是添加的配置，后面会讲到
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rollup -c"
  },
  // 仓库地址
  "repository": {
    "type": "git",
    "url": "git+https://github.com/xie392/plugin-name.git"
  }
}
```

执行打包命令

```shell
npm run build
```

# 五、发布

1、添加用户

```shell
npm adduser
```

输入用户名、密码、邮箱，在此之前需要在 [npm 官网](https://www.npmjs.com) 注册并创建 npm 账号，还有 npm 的源一定要是官方的源，不然会出现各种问题,如果不是请换回来。

查看源

```shell
npm config get registry
```

如果不是官方源: `https://registry.npmjs.org`，那么就换成官方源

```shell
npm config set registry https://registry.npmjs.org
```

2、发布

```shell
npm publish
```

如果你的包是私有的，那么就需要添加`--access=public`参数

```shell
npm publish --access=public
```

如果包名已经存在，那么就需要修改包名，然后再发布,修改包名的命令如下：

```shell
npm unpublish 包名 --force
```

怎么知道包名是否存在呢？可以在 [npm 官网](https://www.npmjs.com) 搜索一下，如果存在，那么就不能使用这个包名，如果不存在，那么就可以使用这个包名。

# 六、使用

```shell
npm i plugin-name -S
```

# 七、更新 npm 包

更新 npm 包就需要用到以下命令了

查看当前版本

```shell
npm view plugin-name version
```

小更新可以使用以下命令，会自动更新版本号
```shell
# 小更新版本号，例如 1.0.0 -> 1.0.1
npm version patch

# 发布
npm publish
```

大更新可以使用以下命令，会自动更新版本号
```shell
# 大更新版本号，例如 1.0.0 -> 1.1.0
npm version minor

# 发布
npm publish
```

超大更新可以使用以下命令，会自动更新版本号
```shell
# 超大更新版本号，例如 1.0.0 -> 2.0.0
npm version major

# 发布
npm publish
```
