module.exports = {
  runtimeCompiler:true //默认为false
  //true表示完整版：包含运行时和编译器，体积比运行时版大10K左右，程序运行时把模板换成render函数
  //false编译为运行时版：不支持template模板，需要打包的时候提前编译,需要我们自己写render函数
}