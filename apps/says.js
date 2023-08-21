!function(e,t){
  t.id="says";e(t);
}(initAPP,function(exportq){
  var says='海内存知己，天涯若比邻。';
  if(quik.storage.get('says')){
    says=quik.storage.get('says')
  }else{
    quik.storage.set('says',says);
  }
  var fm=document.createElement('div');
  fm.classList.add('says');
  $('main').append(fm);
  quik.settings.registerUnit('一言',{
    atqd:{
      title:"底部一言随机生成",
      type:'boolean',
      def:false,
      callback:function(v){
        if(v){
          $(fm).html('<span></span>');
          $(fm).find('span').text('...');

          qq();
          $(fm).find('span').click(function(){
            $(fm).find('span').text('...');
            qq();
          });
          var _ajax;
          function qq(){
            if(_ajax) _ajax.abort();
            $.ajax({
              url: 'https://v1.hitokoto.cn/',
              type: 'get',
              dataType: 'json',
              data:{
                format:'json'
              },
              success:function(res){
                $(fm).find('span').text(res.hitokoto);
              }
            })
          }
        }else{
          $(fm).html('<span></span><input type="text" style="display:none;"/>');
          $(fm).find('span').text(says);
          $(fm).find('input').val(says);
          $(fm).find('span').click(function(){
            $(fm).find('span').hide();
            $(fm).find('input').show().focus();
          })
          $(fm).find('input').blur(function(){
            says=$(this).val();
            quik.storage.set('says',says);
            $(fm).find('span').text(says).show();
            $(fm).find('input').hide();
          })
          $(fm).find('input').keydown(function(e){
            if(e.key=='Enter'){
              e.preventDefault();
              $(this).blur();
            }
          })
        }
      }
    }
  })
})