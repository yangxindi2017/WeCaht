const gohttp = require('gohttp');
const wxkey = require('./gzhkey');

var token_api = `https://api.weixin.qq.com/cgi-bin/token`
                +`?grant_type=client_credential`
                +`&appid=${wxkey.appid}&secret=${wxkey.secret}`;

            
var menu_data = {
    button:[
        {
            name:"Send",
            type:"click", //type类型是click它后面跟的是key
            key:"click类型key值返回"
        },
        {
            name:"Send_Img",
            type:"pic_weixin",
            key:"rselfmenu_1_2"
        },
        {
            name:"其他功能",
            sub_button:[
                {
                    name:"发送位置",
                    type:"location_select",
                    key:"rselfmenu_2_0"
                }

            ]
            
        }
        
    ]
};//分号要么结尾加，要么下一个开头加，不然误会是传参

async function createMenu(){
    let ret= await gohttp.get(token_api);
    let t  = JSON.parse(ret);
    //如果没有成功获取access_Token则或输出错误信息并退出
    if(t.access_token === undefined){
        console.log(ret);
        process.exit(-1);
    }
    var create_menu_api = 
        `https://api.weixin.qq.com/cgi-bin/menu/create`
        +`?access_token=${t.access_token}`;

    ret = await gohttp.post(create_menu_api,{
        body:menu_data,
        headers:{
            //此扩展消息头的key值都应该小写
            'content-type':'text/plain'
        }
    });

    //输出处理结果
    console.log(ret);
}

createMenu();

