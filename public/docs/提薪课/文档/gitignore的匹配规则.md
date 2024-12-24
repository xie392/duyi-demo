---
    title: gitignore的匹配规则
    updated: 2024-12-23
    author: xie392
    url: https://v.douyin.com/ieubq13C/
---


## 目录

```shell
|-- src
|   |-- demo
|   |   |-- 1.jpg
|   |-- demo2
|   |   |-- 1.jpg
```

## 匹配

```shell
*.1.jpg  # 匹配 1.jpg
*.?.jpg  # 匹配所有 .jpg
*.jpg    # 匹配所有 .jpg

src/**/*/*      # 匹配所有 src 目录下的所有文件
*.[0-9].jpg     # 匹配所有 [0-9].jpg
![0-9].jpg      # 匹配所有 不是 [0-9].jpg
```


