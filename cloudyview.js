console.log('01');
// 引入fs模块
var fs = require('fs');

// 引入file json库
var jsonfile = require('jsonfile');

//定义写入的HTML文件,调试用
//var htmlPathString = './jsonContent.html';
//引入index.html文件
var indexWritePathString = './index.html';
var indexContentBegin = './indexBegin.html';
var indexContentEnd = './indexEnd.html';

// 定义要扫描的目标文件夹
var pathString = '../words-from-the-heart/';

// 用于存放所有心里话
var writePathString = './all_words.json';

// 用于存放格式不正确的json文件名
var errorPathString = './error_data.json';
console.log('02');

console.log('03');
//读取indexBegin.html内容，开始创建并写入index.html
var indexContent = fs.readFileSync(indexContentBegin);
fs.writeFileSync(indexWritePathString,indexContent );
    console.log('09');
    console.log('index.html created!!!');
    console.log('10');
    

// 调用fs的readdir函数读取所有文件
fs.readdir(pathString, function(err, files) {
  console.log('13');
  if (err) {
    console.log('14');
    console.log('读取文件失败');
    console.log('15');
    return;
  }

  //把含有"json"字符的文件名过滤出来,把所有文件保存在jsonFiles数组中
  console.log('16');
  var jsonFiles = [];
  console.log('17');
  for (var i = 0; i < files.length; i++) {
    //console.log('18');
    if (files[i].includes('.json')) {
    //  console.log('19');
      jsonFiles.push(files[i]);
    //  console.log('20');
    }
  }
  console.log('21');
  //循环读取json文件的内容，并都存在jsonList数组内。读取出错的文件名存在errorFiles数组内。
  var jsonList = [];
  var errorFiles = [];
  console.log('22');
  for (var i = 0; i < jsonFiles.length; i++) {
  //  console.log('23');
    try {
      // 读取json文件
      var content = jsonfile.readFileSync(pathString + jsonFiles[i] );
      jsonList.push(content);
   //   console.log('24');
      
      } catch (err) {
   //     console.log('25');
      // 如果读取错误就把错误的文件名写入到errorFiles数组内
      errorFiles.push(content);
    }
  }
  console.log('26');

  // 将收集到的数据写入到一个json文件中
  jsonfile.writeFileSync(writePathString, jsonList);
  console.log('27');
  // 将收集到的错误文件写入到一个json文件中
  jsonfile.writeFileSync(errorPathString, errorFiles);
  console.log('28');


  //将收集到的Json数据写入一个html文件
  var jsonListString = JSON.stringify(jsonList,'\n');
 // console.log(jsonListString);   //调试用
 console.log('29');

  fs.appendFile(indexWritePathString,jsonListString,function(err) {
    console.log('30');
    if (err){
      console.log('31');
      console.log('write file err!!!');
      console.log('32');
      return;
    }else{
      // console.log(jsonListString); 
      console.log('33');
      console.log('write file succeed!!');
      console.log('34');
    }
  })

  console.log('35');
  // 假如收集到的内容（json文件）格式乱怎么办？可以使用visual studio code的代码格式化插件自动调整格式，就会得出你想要的格式想过。
});
console.log('35-1');
fs.readFile(indexContentEnd , function(err,indexContent) {
  console.log('36');
  if (err) {
    console.log('37');
    console.log(err);
    console.log('38');
    return
    console.log('39');
  } else {
    console.log('40');
    fs.appendFile(indexWritePathString,indexContent,function(err){
      console.log('41');
      if (err) {
        console.log('42');
        console.log(err);
        console.log('43');
        return
        console.log('44');
      } else {
        console.log('45');
        console.log('index.html OK!!!');
        console.log('46');
      }
    })
  }
})
console.log('47');