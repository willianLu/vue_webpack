// 完整的node.js命令行解决方案
const { program } = require("commander");
// 子进程执行命令工具
const execa = require("execa");
const path = require("path");
const packageJson = require(path.join(__dirname, "../package.json"))

program
  .command('version')
  .description('当前版本')
  .action(() => {
    console.log(packageJson.version);
  });
  
program
  .command('build <mode>')
  .description('打包构建')
  .action((mode, destination) => {
    switch(mode) {
        case "prod":
            execa.sync("webpack", ['--config', './webpack.config.js'], { stdio: [0, 1, 2] });
            console.log("----------------执行成功")
            break;
    }
    console.log(mode, destination, 'clone command called');
  });


// 解析进程参数
program.parse(process.argv);

const options = program.opts();

console.timeLog(options)
