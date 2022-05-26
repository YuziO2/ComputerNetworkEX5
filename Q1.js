//Q1:模拟网桥

let Interface = function (number) {
    this.number = number;
    this.host = [];
}

function main() {
    let frames = [];
    var fs = require("fs");
    fs.readFileSync('./framefile1').toString().split("||").forEach(element => frames.push(element));//第一层数组，按照发送端口分开
    fs.readFileSync('./framefile2').toString().split("||").forEach(element => frames.push(element));
    frames.forEach((element, index) => frames[index] = element.split(" "));//第二层数组，按连接分开
    console.log("监听开始");
    let forwardingTable = [];
    for (let i = 0; i < frames.length; i++) {
        forwardingTable.push(new Interface(i + 1));
        for (let j = 0; j < frames[i].length; j++) {
            if (!forwardingTable[i].host.includes(frames[i][j][0]))//检查接口是否有某个主机，若没有便加上
                forwardingTable[i].host.push(frames[i][j][0]);
            let flag = 0;
            forwardingTable.forEach(element => {
                if (element.host.includes(frames[i][j][1])) {//目的主机找到
                    flag = element.number;
                }
            });
            if (flag == 0) //表中没有目标主机
                console.log("转发表没有此目的地址,向其他接口转发");
            else if (forwardingTable[i].number == flag)
                console.log("目的主机" + frames[i][j][1] + "和来源主机" + frames[i][j][0] + "在同一个接口，不转发。");
            else
                console.log(frames[i][j][0] + "与位于" + flag + "端口的" + frames[i][j][1] + "建立了连接！");
        }
    }
    console.log("监听结束")
    for (i = 0; i < forwardingTable.length; i++)
        console.log("与接口" + (i + 1) + "相连的主机有：" + forwardingTable[i].host);
}

main();