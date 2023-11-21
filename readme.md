# sm3-standard
国密SM3密码杂凑算法。基于中国国家密码管理局，2010年12月发布的版本。


安装
> 
>npm install --save sm-crypto
> 

使用
```ts
import { sm3 } from 'sm3-standard'

let hashData = sm3('abc') // 杂凑

// hmac
hashData = sm3('abc', {
    key: 'daac25c1512fe50f79b0e4526b93f5c0e1460cef40b6dd44af13caec62e8c60e0d885f3c6d6fb51e530889e6fd4ac743a6d332e68a0f2a3923f42585dceb93e9', // 要求为 16 进制串或字节数组
})
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