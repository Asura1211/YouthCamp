#!/usr/bin/env node     
console.log('hello cli...')

//策略模式
program.version(require('../package').version)
program.command('init <name>')
    .description('init project') 
    .action(require('../lib/init'))
program.parse(process.argv)
