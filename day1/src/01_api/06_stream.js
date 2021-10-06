const fs = require('fs')
// 做的事：1.png => 2.png 
// 如果用 fs read write，需要将图片先全部读进内存，再写出
// 流，类比把一个游泳池的水移到另一个池————pipe
const rs = fs.createReadStream('./1.png')
const ws = fs.createWriteStream('./2.png')
// 连接两个流
rs.pipe(ws)