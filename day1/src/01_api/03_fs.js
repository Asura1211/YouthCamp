// const fs = require('fs').promises
// 异步IO
// fs.readFile

// 同步读取 二进制文件 图片 视频
// const data = fs.readFileSync('./conf.js')
// console.log('data', data.toString())

// 异步读取
// fs.readFile('./conf.js' , (err, data) => {
//     // 错误优先的回调
//     if (err) throw err;
//     console.log(data.toString())
// })

// 异步主要用promise 风格的 api 用 async/await 
// 1.const fs = require('fs').promises

(async () => {
    const fs = require('fs')
    // 2.promisify
    const { promisify } = require('util')
    // 这样就直接变成 promise 风格
    const readFile = promisify(fs.readFile)
    const data = await readFile('./conf.js')
    console.log(data.toString())
})()



