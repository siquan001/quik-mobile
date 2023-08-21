!function(e,t){
  t.id="smedit";e(t);
}(initAPP,function(exportq){
  quik.storage.get('searchmodes')||quik.storage.set('searchmodes',searchmodes);
  var dia=quik.dialog.open('<div class="sme-dia"><h1>搜索引擎列表</h1><i class="bi bi-x-lg"></i><ul></ul><button>保存</button></div>')
  $(dia.dialogF).find('.bi-x-lg').click(function(){
    quik.dialog.hide(dia);
  });
  var _i_=0;
  function xrdia(){
    $(dia.dialogF).find('ul').html('');
    for(var k in searchmodes){
      $(dia.dialogF).find('ul').append('<li><img src="'+searchmodes[k].icon+'"/><div class="i_title">'+k+'</div><div class="i_url">'+searchmodes[k].search+'</div><i class="bi bi-x"></i></li>');
    }
    $(dia.dialogF).find('ul li').each(function(){
      initLi.call(this);
    })
    function initLi(){
      $(this).find('.i_title').click(function(){
        if($(this).find('input').length==0){
          $(this).html('<input type="text" data-yl="'+$(this).html()+'" value="'+$(this).html()+'"/>');
          $(this).find('input').keydown(function(e){
            if(e.key=='Enter'){
              submitTi($(this).val());
            }
          })
          $(this).find('input').blur(function(){
            submitTi($(this).val());
          })
          $(this).find('input').focus();
          var _=this;
          function submitTi(val){
            var isvaild=false;
            if(!/^[a-zA-Z0-9_u4e00-u9fa5-]+$/.test(val)){
              isvaild=true;
            }else{
              for(var i=0;i<$(dia.dialogF).find('ul li').length;i++){
                if($(dia.dialogF).find('ul li').eq(i).find('.i_title input').length==0){
                  if(val==$(dia.dialogF).find('ul li').eq(i).find('.i_title').text()){
                    isvaild=true;
                  }
                }
              }
            }
            
            if(isvaild){
              alert('描述符必须由小写英文字母、数字和下滑线组成！并且不能重复！');
              $(_).html($(_).find('input').attr('data-yl'));
            }else{
              $(_).html($(_).find('input').val());
            }
          }
        }
      })
      $(this).find('.i_url').click(function(){
        if($(this).find('input').length==0){
          $(this).html('<input type="text" data-yl="'+$(this).html()+'" value="'+$(this).html()+'"/>');
          $(this).find('input').keydown(function(e){
            if(e.key=='Enter'){
              submitTi($(this).val());
            }
          })
          $(this).find('input').blur(function(){
            submitTi($(this).val());
          })
          $(this).find('input').focus();
          var _=this;
          function submitTi(val){
            var isvaild=val.indexOf('{}')==-1;
            if(isvaild){
              alert('URL必须包含“{}”（搜索内容将替换{}）');
              $(_).text($(_).find('input').attr('data-yl'));
            }else{
              $(_).parents('li').find('img').attr('src',quik.favicon.get($(_).find('input').val()));
              $(_).text($(_).find('input').val());
            }
          }
        }
      })
      $(this).find('.bi-x').click(function(){
        if($(dia.dialogF).find('ul li').length<=1){
          alert('至少要有一个搜索引擎！');
        }
        if(confirm('确定删除吗？')){
          $(this).parents('li').remove();
        }
      })
    }
    $(dia.dialogF).find('ul').append('<li class="add"><i class="bi bi-plus"></i> 添加</li>')
    $(dia.dialogF).find('ul li.add').click(function(){
      var li=document.createElement('li');
      _i_++;
      li.innerHTML='<img src="https://www.baidu.com/favicon.ico"/><div class="i_title">new_'+_i_+'</div><div class="i_url">https://www.baidu.com/s?wd={}</div><i class="bi bi-x"></i>'
      $(this)[0].parentElement.insertBefore(li,$(this)[0]);
      initLi.call(li);
    })
    $(dia.dialogF).find('button').click(function(){
      var ls={};
      $(dia.dialogF).find('ul li').each(function(){
        if($(this).hasClass('add')) return;
        ls[$(this).find('.i_title').text()]={
          icon:$(this).find('img').attr('src'),
          search:$(this).find('.i_url').text()
        }
      })
      if(!ls[quik.storage.get('searchmode')]){
        quik.storage.set('searchmode',$(dia.dialogF).find('ul li').eq(0).find('.i_title').text());
        window.searchmode = quik.storage.get('searchmode')||'bing';
      }
      searchmodes=ls;
      quik.storage.set('searchmodes',ls);
      quik.searchmode.xr();
      quik.dialog.hide(dia);
    })
  }
  exportq({
    open:function(){
      xrdia();
      quik.dialog.show(dia);
    }
  })
})