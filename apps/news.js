!function(e,t){
  t.id='news';e(t);
}(initAPP,function(exportq){
  var sd=quik.storage.get('news_select')||'bilibili';
  quik.cardview.registerCard({
    id:"news",
    offset:[4,4],
    callback:function(card){
      $(card).html('<div class="topp"><div>News</div><select class="news_select"></select></div><ul></ul>');
      for(var k in sq){
        $(card).find('.news_select').append('<option value="'+k+'">'+sq[k].name+'</option>');
      }
      $(card).find('.news_select').val(sd);
      $(card).find('.news_select').on('change',function(){
        xrul();
      })
      xrul();
      function xrul(){
        $(card).find('ul').html('');
        var k=$(card).find('.news_select').val();
        quik.storage.set('news_select',k);
        var res=sq[k].data;
        if(!res){
          $.getJSON(sq[k].url,function(res1){
            res=res1;
            sq[k].data=res1;
            _xr();
          })
        }else{
          _xr();
        }
        function _xr(){
          for(var i=0;i<res.data.length;i++){
            $(card).find('ul').append('<li><span>'+(i+1)+'</span><a href="'+res.data[i].url+'" target="_blank">'+res.data[i].title+'</a></li>')
          }
        }
      }
    }
  })

})