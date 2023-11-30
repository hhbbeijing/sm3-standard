# sm3-standard
国密SM3密码杂凑算法。基于中国国家密码管理局，2010年12月发布的版本。


安装
> 
>npm install --save sm3-standard
> 

使用
> 
1、main.ts
```
import sm3 from 'sm3-standard'
app.use(sm3)
```

2、xxx.vue
```
import sm3Hash from "sm3-standard/src/sm3";
...
console.log('明文：123')
console.log('密文：' + sm3Hash('123'))
```



## 作者备注
> 1、测试用例。
> 
>       在导出之前，应当编写测试用例。
> 
>       依赖：jest、ts-jest。 
>       npm install--save-devjest typescript ts-jest @types/jest    
>       npx ts-jest config:init
> 
> 2、代码注释。
> 
>       应当保持良好的代码注释。