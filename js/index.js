!function () { 
  document.body.style.height=window.innerHeight+'px';
  if(!localStorage.quikmob)localStorage.quikmob='{}';
  /**
   * 获取网站Favicon
   * @param {String} url 
   * @returns {String} faviconUrl
   */
  function getFavicon(url) {
    var u = new URL(url);
    return 'https://api.iowen.cn/favicon/' + u.hostname + '.png';
  }

  /**
   * 创建一个Favicon
   * @param {String} p 
   * @returns {String} dataUrl
   */
  function createFavicon(p) {
    var cav = document.createElement('canvas');
    cav.width = 64;
    cav.height = 64;
    var ctx = cav.getContext('2d');
    ctx.font = "64px Airal";
    ctx.fillStyle = getRandomColor();
    ctx.fillText(p, 10, 55);
    var url = cav.toDataURL("image/png");
    cav = null;
    return url;
  }

  function getRandomColor(){
    return 'rgb('+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+')';
  }

  /**
   * 发起JSONP请求
   * @param {String} url 
   * @param {Function} callback 
   */
  function jsonp(url, callback,attr='callback') {
    var s = document.createElement('script');
    var fnname = 'a' + Math.random().toString().split('.')[1];
    s.src = url + '&'+attr+'=' + fnname;
    window[fnname] = callback;
    document.body.append(s);
    s.onload = function () { s.remove() };
  }

  window.searchmode = JSON.parse(localStorage.quikmob).searchmode||'bing';
  window.sq={
    bilibili:{
      name:"哔哩哔哩",
      url:"https://api.gumengya.com/Api/BiliBliHot?format=json",
      data:null
    },
    baidu:{
      name:"百度",
      url:"https://api.gumengya.com/Api/BaiduHot?format=json",
      data:null
    },
    zhihu:{
      name:"知乎",
      url:"https://api.gumengya.com/Api/ZhiHuHot?format=json",
      data:null
    },
    weibo:{
      name:"微博",
      url:"https://api.gumengya.com/Api/WeiBoHot?format=json",
      data:null
    },
    douyin:{
      name:"抖音",
      url:"https://api.gumengya.com/Api/DouYinHot?format=json",
      data:null
    },
    kuaishou:{
      name:"快手",
      url:"https://api.gumengya.com/Api/KuaiShouHot?format=json",
      data:null
    },
    tieba:{
      name:"贴吧",
      url:"https://api.gumengya.com/Api/BaiduTieBaHot?format=json",
      data:null
    },
    toutiao:{
      name:"今日头条",
      url:"https://api.gumengya.com/Api/TouTiaoHot?format=json",
      data:null
    },
  }
    /* 内置搜索模式列表*/
  var defsearchmodes = {
      'baidu': {
        icon: "https://www.baidu.com/favicon.ico",
        search: "https://www.baidu.com/s?wd={}"
      },
      'sogou': {
        icon: "https://www.sogou.com/favicon.ico",
        search: "https://www.sogou.com/web?query={}",
      },
      'so': {
        icon: "https://www.so.com/favicon.ico",
        search: "https://www.so.com/s?q={}"
      },
      'bing': {
        icon: "https://cn.bing.com/favicon.ico",
        search: "https://cn.bing.com/search?q={}"
      },
      'google': {
        icon: "https://api.iowen.cn/favicon/www.google.com.png",
        search: "https://www.google.com/search?q={}"
      }
    };
  
  window.searchmodes=JSON.parse(localStorage.quikmobmob).searchmodes||defsearchmodes;

  window.__bingimgtimeout__=setTimeout(function () {
    $('.bingimg').attr('src', './img/zy.gif').attr('data-zt', 'zy');
  }, 2000)
  $('#searchinput').focus(function () {
    $('.searchcover').css({
      'opacity': '1',
      'pointer-events': 'all'
    });
    $('.searchbox').css('height', 'auto');
    $('.searchbox ul').show();
    if ($('.bingimg').attr('data-zt') != 'by') {
      $('.bingimg').attr('src', './img/zby.gif').attr('data-zt', 'zby');
      clearTimeout(window.__bingimgtimeout__);
      window.__bingimgtimeout__ = setTimeout(function () {
        $('.bingimg').attr('src', './img/by.gif').attr('data-zt', 'by');
      }, 1500)
    }
  });

  $('#searchinput').blur(function () {
    setTimeout(function () {
      if (window.__LIMOUSEDOWNED__) {
        var qli = setInterval(function () {
          if (!window.__LIMOUSEDOWNED__) {
            blurs();
            clearInterval(qli);
          }
        }, 10)
      } else {
        blurs();
      }
    }, 6)
    var _this=this;
    function blurs() {
      $('.searchcover').css({
        'opacity': '',
        'pointer-events': ''
      });
      $('.searchbox').css('height', '');
      $('.searchbox ul').hide();
      if ($(_this).val().trim()) { } else {
        $('.bingimg').attr('src', './img/bzy.gif').attr('data-zt', 'bzy');
        clearTimeout(window.__bingimgtimeout__);
        window.__bingimgtimeout__ = setTimeout(function () {
          $('.bingimg').attr('src', './img/zy.gif').attr('data-zt', 'zy');
        }, 2000)
      }
    }
  });

  $('#searchinput').keydown(function (e) {
    if (e.key == 'Enter' && $(this).val().trim()) {
      if ($(".searchbox>ul li.hover").length > 0) {
        if($(".searchbox>ul li.hover").attr('type')=='url'){
          window.open($(".searchbox>ul li.hover").text());
        }else if($(".searchbox>ul li.hover").attr('type').indexOf('query')!=-1){
          goSearch($(".searchbox>ul li.hover").text())
        }
      } else {
        if(/^(((ht|f)tp(s?))\:\/\/)?([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&%\$\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})(\:[0-9]+)?(\/[^\/][a-zA-Z0-9\.\,\?\'\\\/\+&%\$#\=~_\-@]*)*$/.test($(this).val().trim())&&$(this).val().trim().indexOf(' ')==-1){
          if(/.+:\/\//.test($(this).val().trim())){
            window.open($(this).val().trim());
          }else{
            if($(this).val().indexOf('/')==-1){
              if(/\?$\(\)\[\]|\\/.test($(this).val())){
                goSearch($(this).val().trim());
              }
            }
            window.open((quik.storage.get('qhttps')?'https://':'http://')+$(this).val().trim());
          }
        }else{
          goSearch($(this).val().trim());
        }
      }
    } else if (e.key == 'ArrowUp') {
      e.preventDefault();
      if ($(".searchbox>ul li.hover").length > 0) {
        var i = $(".searchbox>ul li").index($(".searchbox>ul li.hover"));
        $(".searchbox>ul li.hover").removeClass('hover');
        if (i == 0) { } else {
          $(".searchbox>ul li").eq(i - 1).addClass('hover');
        }
      }
    } else if (e.key == 'ArrowDown') {
      e.preventDefault();
      if ($(".searchbox>ul li.hover").length > 0) {
        var i = $(".searchbox>ul li").index($(".searchbox>ul li.hover"));
        if (i == $(".searchbox>ul li").length - 1) { } else {
          $(".searchbox>ul li.hover").removeClass('hover');
          $(".searchbox>ul li").eq(i + 1).addClass('hover');
        }
      } else {
        $(".searchbox>ul li").eq(0).addClass('hover');
      }
    }
  });

  $('.searchbox button.bi').click(function () {
    if ($('#searchinput').val().trim()) {
      goSearch($('#searchinput').val().trim());
    }
  });
  $('.searchbox .searchicon').click(function () {
    if ($('.searchopts').hasClass('active')) {
      $('.searchopts').removeClass('active')
    } else {
      $('.searchopts').addClass('active')
    }
  })
  $('#searchinput').on('input', fangdou(function () {
    $('.searchbox ul li').remove();
    if($(this).val().trim()=='') return;
    if(!JSON.parse(localStorage.quikmob).jusearch&&/^(((ht|f)tp(s?))\:\/\/)?([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&%\$\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})(\:[0-9]+)?(\/[^\/][\s\S]*)*$/.test($(this).val().trim())&&$(this).val().trim().indexOf(' ')==-1){
      var li = document.createElement('li');
      li.setAttribute('type','url');
      if(/.+:\/\//.test($(this).val().trim())){
        li.innerText=$(this).val().trim();
      }else{
        li.innerHTML=(quik.storage.get('qhttps')?'https://':'http://')+$(this).val().trim();
      }
      $('.searchbox ul').append(li);
      li.onmousedown = function () {
        window.__LIMOUSEDOWNED__ = true;
      }
      li.onmouseup = function () {
        delete window.__LIMOUSEDOWNED__;
        window.open(li.innerText);
      }
    }
    var li = document.createElement('li');
      li.setAttribute('type','query2')
      li.innerText = $(this).val();
      $('.searchbox ul').append(li);
      li.onmousedown = function () {
        window.__LIMOUSEDOWNED__ = true;
      }
      li.onmouseup = function () {
        delete window.__LIMOUSEDOWNED__;
        goSearch(li.innerText);
      }
    jsonp('https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=' + $(this).val(), function (res) {
      $('.searchbox ul li[type=query]').remove();
      
      for (var i = 0; i < res.g.length; i++) {
        !function (i) {
          var li = document.createElement('li');
          li.setAttribute('type','query')
          li.innerText = res.g[i].q;
          $('.searchbox ul').append(li);
          li.onmousedown = function () {
            window.__LIMOUSEDOWNED__ = true;
          }
          li.onmouseup = function () {
            delete window.__LIMOUSEDOWNED__;
            goSearch(li.innerText);
          }
        }(i);
      }
    },'cb')
  }, 300))


  function goSearch(text) {
    window.open(searchmodes[searchmode].search.replace('{}', text));
  }

  function fangdou(fn, time) {
    var c;
    return function () {
      var _ = this;
      clearTimeout(c);
      c=setTimeout(function () {
        fn.call(_);
      }, time)
    }
  }
  function xrsearchopts(){
    $('.searchopts ul').html('');
    for (var k in searchmodes) {
      $('.searchopts ul').append('<li data-mode="' + k + '"><img src="' + searchmodes[k].icon + '"/></li>')
    }
    $('.searchopts ul li[data-mode="' + searchmode + '"]').addClass('act');
    $('.searchbox .searchicon img').attr('src', searchmodes[searchmode].icon);
    $('.searchopts ul li').click(function () {
      $('.searchopts ul li.act').removeClass('act');
      searchmode = $(this).attr('data-mode');
      $(this).addClass('act');
      $('.searchbox .searchicon img').attr('src', searchmodes[searchmode].icon);
      $('.searchopts').removeClass('active')
      quik.storage.set('searchmode',$(this).attr('data-mode'));
    })
  }
  xrsearchopts();

  window.quik = {
    searchmode:{
      xr:xrsearchopts
    },
    storage:{
      get:function(key){
        return JSON.parse(localStorage.quikmob)[key];
      },
      set:function(key,value){
        var s=JSON.parse(localStorage.quikmob);
        s[key]=value;
        localStorage.quikmob=JSON.stringify(s);
      },
      remove:function(key){
        var s=JSON.parse(localStorage.quikmob);
        delete s[key];
        localStorage.quikmob=JSON.stringify(s);
      },
      list:function(){
        var keys=[];
        for(var key in JSON.parse(localStorage.quikmob)){
          keys.push(key);
        }
        return keys;
      },
      clear:function(){
        localStorage.quikmob='';
      }
    },
    favicon:{
      get:getFavicon,
      create:createFavicon
    }
  }
  var initAPP=function(fn){
    var exportf=function(obj){
      window.quik[fn.id]=window.quik[fn.id]||{};
      for(var k in obj){
        window.quik[fn.id][k]=obj[k];
      }
    }
    fn(exportf);
  }

  function debug() {
    debugger;
  }
  window.initAPP=initAPP;
  window.debug=debug;

  if(quik.storage.get('autofocuss')){
    setTimeout(function(){
      $('.searchbox input').focus();
    },300)
  };

  if(!quik.storage.get('logined')){
    $('.initpage p').html('首次打开，正在初始化。。。');
    window.onload=function(){
      $('.initpage .anim-progress').css({
        'background':'#09f',
      });
      setTimeout(function(){
        $('.initpage').hide();
        var qida=quik.dialog.open('<div class="qida-dia"><iframe src="./assets/license.html"></iframe><button class="ok">同意并继续</button><button class="no">不同意退出</button></div>')
        quik.dialog.show(qida);
        $(qida.dialogF).find('.ok').click(function(){
          quik.dialog.hide(qida);
          quik.storage.set('logined',true);
          quik.storage.set('version',version);
          quik.notice.show({
            title:"欢迎体验QUIK起始页",
            content:"点击确定查看QUIK新手指南",
            buttons:{
              yes:{
                text:"确定",
                callback:function(){
                  quik.dialog.showifrdialog('./assets/docs.html');
                }
              },
              no:{
                text:"我超勇的",
                callback:function(){
                  
                }
              }
            }
          });
        })
        $(qida.dialogF).find('.no').click(function(){
          window.location.href="about:newtab"
        });
      },100)
    }
  }else{
    $('.initpage .anim-progress').css({
      'background':'#09f',
    });
    $('.initpage').hide();
  window.addEventListener('load',function(){

    if(quik.storage.get('version').code<version.code){
      quik.storage.set('version',version);
      quik.notice.show({
        title:"版本更新提醒",
        content:"QUIK起始页更新新版本："+version.name+"<br>"+version.exp,
        buttons:{
          yes:{
            text:"查看更新日志",
            callback:function(){
              quik.dialog.showifrdialog('./assets/changelog.html');
            }
          },
          no:{
            text:"我知道了",
            callback:function(){
            }
          }
        }
      })
    }
  });
  }
  window.addEventListener('load',function(){
    window.onoffline=function(){
      quik.notice.show({
        title:"断网提醒",
        content:"检测到你的网络已断开，请尽快重连！",
      })
    }
  })
}();