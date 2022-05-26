//Q2：计算校验和

var fs = require("fs");
var data = fs.readFileSync('./infile').toString();
console.log("文件的内容为：" + data);

if (data.length % 2) {//长度为奇数
    data += 0;//补一个0
}
let temp = "";
let buffer = [];
for (let i = 0; i < data.length; i++) {
    temp += data[i].charCodeAt().toString(16);//转为16进制ASCII码
    if (temp.length == 4) {//长度满2，合并
        buffer.push(parseInt(temp, 16));
        temp = "";
    }
}

let sum = 0;
buffer.forEach(element => {
    sum += element;
});
let carry = sum.toString(16).slice(0, -4);
sum = parseInt(sum.toString(16).slice(-4), 16);
sum += parseInt(carry);
console.log("文件的校验和为：" + sum.toString(16));
