!function(e,t){
  t.id='background';e(t);
}(initAPP,function(exportq){
  var bingimg;
  var bgf=document.createElement('div');
  bgf.classList.add('bgf-f');
  bgf.innerHTML='<div class="bgf"></div><div class="cover"></div>'
  document.body.append(bgf);

  bgf=bgf.querySelector('.bgf')
  quik.storage.get('background')||quik.storage.set('background',{type:0,src:0});
  quik.storage.get('bg-list')||quik.storage.set('bg-list',{img:[],color:[],video:[]});

  var dia=quik.dialog.open('<div class="bg-dia">\
  <h1>背景</h1><i class="bi bi-x-lg"></i>\
  <ul class="deful"><li>默认（无）</li></ul>\
  <h2>图片背景</h2>\
  <ul class="imglist"></ul>\
  <p class="exp">点击“+”添加图片，点击图片设置背景</p>\
  <h2>纯色背景</h2>\
  <ul class="colorlist"></ul>\
  <p class="exp">点击“+”添加颜色，点击颜色设置背景</p>\
  <h2>视频背景</h2>\
  <ul class="videolist"></ul>\
  <p class="exp">点击“+”添加视频，点击视频设置背景</p>\
  <h2>API背景</h2>\
  <ul class="apilist">\
  <li data-src="api:by"><p class="title">Bing每日壁纸</p><p class="text">获取Bing每日壁纸，并显示详情</p></li>\
  <li data-src="api:2cy"><p class="title">二次元壁纸</p><p class="text">获取随机二次元壁纸</p></li>\
  <li data-src="api:fj"><p class="title">风景壁纸</p><p class="text">获取随机风景壁纸</p></li>\
  <li data-src="api:tc"><p class="title">时间的颜色</p><p class="text">实时设置背景颜色为#HHmmss或#(ff-HH)(ff-mm)(ff-ss)</p></li>\
  </ul>\
  <p class="exp">点击对应背景API设置背景</p>\
  <h2>高级自定义背景</h2>\
  <div class="zdybginput"><input type="text"/><button>设置</button></div>\
  <p class="exp">参见 <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/background">CSS | background 属性</a></p>\
  </div>');

  var _tc=null;
  var api={
    get:function(){
      return quik.storage.get('background');
    },
    set:function(type,src){
      quik.storage.set('background',{type:type,src:src});
      bgf.innerHTML='';
      bgf.style.background='';
      $('.iconbtns-container .bgref-icon').hide();
      $('.bzms').remove();
      clearInterval(_tc);
      if(type==1){// img
        bgf.innerHTML='<img src="'+src+'"/>';
      }else if(type==2){ // video
        bgf.innerHTML='<video src="'+src+'" autoplay loop muted></video>';
      }else if(type==3){ // css
        bgf.style.background=src;
      }else if(type==4){
        if(src=='api:by'){
          bgf.innerHTML='<img src="https://bing.shangzhenyang.com/api/1080p" onerror="this.src=\'https://bing.shangzhenyang.com/api/1080p\'"/>';
          if(!bingimg){
            $.getJSON('https://bing.shangzhenyang.com/api/json',function(res){
              bingimg=res;
              xrbing();
            })
          }else{
            xrbing();
          }
          function xrbing(){
            var bzms=document.createElement('div');
            bzms.classList.add('bzms');
            $('main').append(bzms);
            bzms.innerHTML='<div class="title">'+bingimg.images[0].title+'</div><div class="copyright">'+bingimg.images[0].copyright.replace('(','<br>(')+'</div>';
            bzms.onclick=function(){
              window.open(bingimg.images[0].copyrightlink);
            }
          }
        }else if(src=='api:2cy'){
          bgf.innerHTML='<img src="https://api.gumengya.com/Api/DmImg?format=image"/>';
          enableBgRef();
        }else if(src=='api:fj'){
          bgf.innerHTML='<img src="https://imgapi.cn/api.php?zd=mobile&fl=fengjing&gs=images"/>';
          enableBgRef();
        }else if(src=='api:tc'){
          _tc=setInterval(function(){
            var d=new Date();
            if($('body').hasClass('dark')){
              bgf.style.background='rgb('+d.getHours()+','+d.getMinutes()+','+d.getSeconds()+')';
            }else{
              bgf.style.background='rgb('+(256-d.getHours())+','+(256-d.getMinutes())+','+(256-d.getSeconds())+')';
            }
          }, 1000);
        }
      }else if(type==5){
        bgf.style.background=src;
      }

      function enableBgRef(){
        if($('.iconbtns-container .bgref-icon').length){
          $('.iconbtns-container .bgref-icon').show();
        }else{
          var icon=document.createElement('div');
          icon.classList.add('bgref-icon');
          $('.iconbtns-container').append(icon);
          icon.classList.add('right');
          icon.innerHTML='<i class="bi bi-arrow-repeat"></i>'
          icon.onclick=function(){
            console.log(bgf.innerHTML);
            bgf.innerHTML=bgf.innerHTML.replace(/gs=images\S*"/,'gs=images&_='+Date.now()+'">').replace(/format=image\S*/,'format=image&_='+Date.now()+'">');
          }
        }
      }
    }
  }

  quik.cardview.registerCard({
    id:"background",
    offset:[1,1],
    callback:function(card){
      card.innerHTML='<img src="./img/background-icon.png"/><p>背景</p>'
      card.onclick=function(){
        quik.dialog.show(dia);
      }
    }
  });
  $(dia.dialogF).find('.d-c').addClass('bg-d-c');
  $(dia.dialogF).find('.bi-x-lg').click(function(){
    quik.dialog.hide(dia);
  })

  function xrdia(){
    var nowbg=api.get();
    var glist=quik.storage.get('bg-list');
    $(dia.dialogF).find('ul.imglist').html('');
    for(var i=0;i<glist.img.length;i++){
      $(dia.dialogF).find('ul.imglist').append('<li'+(nowbg.type==1&&nowbg.src==glist.img[i]?' class="act"':'')+'><i class="bi bi-x"></i><img src="'+glist.img[i]+'"/></li>');
    }
    $(dia.dialogF).find('ul.imglist').append('<li class="addli bi bi-plus-lg"></li>');
    $(dia.dialogF).find('ul.colorlist').html('');
    for(var i=0;i<glist.color.length;i++){
      $(dia.dialogF).find('ul.colorlist').append('<li'+(nowbg.type==3&&nowbg.src==glist.color[i]?' class="act"':'')+' data-color="'+glist.color[i]+'" style="background-color:'+glist.color[i]+'"><i class="bi bi-x"></i></li>');
    }
    $(dia.dialogF).find('ul.colorlist').append('<li class="addli bi bi-plus-lg"></li>');
    $(dia.dialogF).find('ul.videolist').html('');
    for(var i=0;i<glist.video.length;i++){
      $(dia.dialogF).find('ul.videolist').append('<li'+(nowbg.type==2&&nowbg.src==glist.video[i]?' class="act"':'')+'><i class="bi bi-x"></i><p>'+glist.video[i]+'</p></li>');
    }
    $(dia.dialogF).find('ul.videolist').append('<li class="addli bi bi-plus-lg"></li>');

    if(nowbg.type==4){
      $(dia.dialogF).find('ul.apilist li[data-src="'+nowbg.src+'"]').addClass('act');
    }else if(nowbg.type==0){
      $(dia.dialogF).find('ul.deful li').addClass('act');
    }else if(nowbg.type==5){
      $(dia.dialogF).find('.zdybginput input').val(nowbg.src);
    }
    $(dia.dialogF).find('ul.deful li').click(function(){
      api.set(0,0);
      $(dia.dialogF).find('ul li').removeClass('act');
      $(dia.dialogF).find('ul.deful li').addClass('act');
    })
    $(dia.dialogF).find('ul.imglist li').click(function(){
      if($(this).hasClass('addli')){
        var imguploaddia1=quik.dialog.open('<div class="uploader"><h1>输入图片网址</h1><input type="url"/><img/><a class="tolocalup">从本地上传图片</a><button class="cancelbtn">取消</button><button class="previewbtn">预览</button><button class="subwbtn">确定</button></div>');
        quik.dialog.show(imguploaddia1);
        $(imguploaddia1.dialogF).find('.tolocalup').click(function(){
          window.open('https://imgse.com/upload',undefined,'left=50,top=50,width=640,height=360')
        })
        $(imguploaddia1.dialogF).find('.cancelbtn').click(function(){
          quik.dialog.destory(imguploaddia1);
        })
        $(imguploaddia1.dialogF).find('.previewbtn').click(function(){
          var val=$(imguploaddia1.dialogF).find('input').val();
          $(imguploaddia1.dialogF).find('img').attr('src',val);
        })
        $(imguploaddia1.dialogF).find('.subwbtn').click(function(){
          if(!$(imguploaddia1.dialogF).find('input').val().trim()) return;
          var ss=quik.storage.get('bg-list');
          ss.img.push($(imguploaddia1.dialogF).find('input').val().trim());
          if('serviceWorker' in navigator){
            // navigator.serviceWorker.controller.postMessage({
            //   cmd:"addCache",
            //   url:$(imguploaddia1.dialogF).find('input').val().trim()
            // })
          }
          quik.storage.set('bg-list',ss);
          quik.dialog.destory(imguploaddia1);
          xrdia();
        })
      }else{
        api.set(1,$(this).find('img').attr('src'));
        $(dia.dialogF).find('ul li').removeClass('act');
        $(this).addClass('act');
      }
    })

    $(dia.dialogF).find('ul.imglist li i.bi-x').click(function(e){
      e.stopPropagation();
      var index=$(this).parents('li').index($(dia.dialogF).find('ul.imglist li'));
      var ss=quik.storage.get('bg-list');
          ss.img.splice(index,1);
          quik.storage.set('bg-list',ss);
      xrdia();
    })

    $(dia.dialogF).find('ul.colorlist li').click(function(){
      if($(this).hasClass('addli')){
        var colorselecterdia=quik.dialog.open('<div class="uploader"><h1>选择一个颜色</h1><input type="color"/><button class="cancelbtn">取消</button><button class="subwbtn">确定</button></div>');
        quik.dialog.show(colorselecterdia);
        $(colorselecterdia.dialogF).find('.cancelbtn').click(function(){
          quik.dialog.destory(colorselecterdia);
        })
        $(colorselecterdia.dialogF).find('.subwbtn').click(function(){
          var ss=quik.storage.get('bg-list');
          ss.color.push($(colorselecterdia.dialogF).find('input').val());
          quik.storage.set('bg-list',ss);
          quik.dialog.destory(colorselecterdia);
          xrdia();
        })
      }else{
        api.set(3,$(this).attr('data-color'));
        $(dia.dialogF).find('ul li').removeClass('act');
        $(this).addClass('act');
      }
    })

    $(dia.dialogF).find('ul.colorlist li i.bi-x').click(function(e){
      e.stopPropagation();
      var index=$(this).parents('li').index($(dia.dialogF).find('ul.colorlist li'));
      var ss=quik.storage.get('bg-list');
          ss.color.splice(index,1);
          quik.storage.set('bg-list',ss);
      xrdia();
    })

    $(dia.dialogF).find('ul.videolist li').click(function(){
      if($(this).hasClass('addli')){
        var videouploaderdia=quik.dialog.open('<div class="uploader"><h1>输入视频网址</h1><input type="url"/><button class="cancelbtn">取消</button><button class="subwbtn">确定</button></div>');
        quik.dialog.show(videouploaderdia);
        $(videouploaderdia.dialogF).find('.cancelbtn').click(function(){
          quik.dialog.destory(videouploaderdia);
        })
        $(videouploaderdia.dialogF).find('.subwbtn').click(function(){
          var ss=quik.storage.get('bg-list');
          ss.video.push($(videouploaderdia.dialogF).find('input').val());
          quik.storage.set('bg-list',ss);
          quik.dialog.destory(videouploaderdia);
          xrdia();
        })
      }else{
        api.set(2,$(this).find('p').html());
        $(dia.dialogF).find('ul li').removeClass('act');
        $(this).addClass('act');
      }
    })
  }

  $(dia.dialogF).find('ul.videolist li i.bi-x').click(function(e){
    e.stopPropagation();
    var index=$(this).parents('li').index($(dia.dialogF).find('ul.videolist li'));
    var ss=quik.storage.get('bg-list');
        ss.video.splice(index,1);
        quik.storage.set('bg-list',ss);
    xrdia();
  })

  $(dia.dialogF).find('ul.apilist li').click(function(){
    var t=$(this).attr('data-src');
    api.set(4,t);
    $(dia.dialogF).find('ul li').removeClass('act');
    $(this).addClass('act');
  })
  $(dia.dialogF).find('.zdybginput button').click(function(){
    var val=$(dia.dialogF).find('.zdybginput input').val();
    api.set(5,val);
    $(dia.dialogF).find('ul li').removeClass('act');
  })
  xrdia();
  api.set(api.get().type,api.get().src);
  exportq(api);

  quik.settings.registerUnit('背景',{
    skbg:{
      title:"设置背景",
      type:null,
      callback:function(){
        quik.dialog.show(dia);
      }
    },
    bgmb:{
      title:"背景蒙版浓度",
      type:"range",
      fw:[0,9],
      def:3,
      callback:function(v){
        $('.bgf-f .cover').css('opacity',v/10);
      }
    },
    bgmf:{
      title:"背景模糊",
      type:"range",
      fw:[0,20],
      def:0,
      callback:function(v){
        if(v>0)
        $('.bgf-f .bgf').css('filter','blur('+v+'px)');
        else
        $('.bgf-f .bgf').css('filter','');
      }
    }
  })
})