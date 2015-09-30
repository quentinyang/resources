# 前端页面与App页面的跳转

## 需求：点击前端HTML页面上的按钮（如：查看App）

- 如果手机上已经安装App，则直接打开App进入首页。
- 如果手机没有安装App，则打开下载App的页面。

## HTML页面

HTML编码如下：

```
<a href="#" data-iphone-protocol="https://itunes.apple.com/cn/app/an-ge-jia/id971625893?mt=8GIT"
       data-iphone-url="https://itunes.apple.com/cn/app/an-ge-jia/id971625893?mt=8GIT"
       data-android-protocol="openangejia://app.angejia.com/"
       data-android-url="https://api.angejia.com/d/apk/angejia.apk?from=pcHP"
       class="openlink-or-gotoapp">If installed app then go to app, else open web url. </a>
```


## JS代码

放在统一的JS里：（假设是用的jQuery）
```
$(function() {
    $('.openlink-or-gotoapp').on('click', function(e){

        var target = $(this);

        var params = {
            iphone: {
                protocol: target.data('iphone-protocol'),
                url: target.data('iphone-url')
            },
            android: {
                protocol: target.data('android-protocol'),
                url: target.data('android-url')
            }
        }

        openLink(params);
    });
});
```

```
function openLink(opts) {
   var userAgent = navigator.userAgent;
   if (userAgent.match(/(iPhone|iPod|iPad);?/i)) {
       var loadDateTime = new Date();
       window.setTimeout(function() {
           var timeOutDateTime = new Date();
           if (timeOutDateTime - loadDateTime < 5000) {
               window.location = opts.iphone.url;
           } else {
               window.close();
           }
       }, 25);
       window.location = opts.iphone.protocol;
   } else if (userAgent.match(/android/i)) {
       var state = null;
       try {
           state = window.open(opts.android.protocol, '_blank');
       } catch(e) {

       }

       if (state) {
           window.close();
       } else {
           window.location = opts.android.url;
       }
   }
}
```