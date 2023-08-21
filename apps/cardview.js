!function(e,t){
  t.id="cardview";e(t);
}(initAPP,function(exportq){
  var cardviewer=document.createElement('div');
  cardviewer.classList.add('cardviewer');
  $('body').append(cardviewer);
  $(cardviewer).html('<div class="topper"><div class="item bi bi-arrow-left"></div><div class="item bi bi-gear"></div><div class="item bi bi-arrow-repeat"></div></div><div class="card-container"></div>')
  $('.logo').click(function(){
    $('main').add('.searchbox').css({
      'opacity':'0'
    })
    $('main').add('.searchbox').hide();
    $(cardviewer).show().css({
      'animation':"fadein .3s"
    })
    
    if(!xred){
      xrcards();
    }else{
      $(cardviewer).find('.card').hide();
      for(var i=0;i<$(cardviewer).find('.card').length;i++){
        !function(i){
        setTimeout(function() {
          $(cardviewer).find('.card').eq(i).show();
        }, i*50);}(i);
      }
    }
  });
  $(cardviewer).find('.bi-arrow-left').click(function(){
    $('main').add('.searchbox').css({
      'opacity':'1'
    })
    $(cardviewer).css({
      'animation':"fadeout .3s"
    });
    setTimeout(function(){
      $(cardviewer).hide();
      $('main').add('.searchbox').show();
    },300)
  });
  $(cardviewer).find('.bi-arrow-repeat').click(function(){
    $(cardviewer).find('.card-container').html('');
    xrcards();
  })
  $(cardviewer).find('.bi-gear').click(function(){
    quik.settings.start();
  })
  var space=[];
  var spacewidth=4;
  var cards=[];
  var xred=false;
  function xrcards(){
    space=[];
    for (var i = 0; i < cards.length; i++) {
      var card=document.createElement('div');
      card.classList.add('card');
      $(cardviewer).find('.card-container').append(card);
      var jsw=370/4*cards[i].offset[0]-40;
      var jsh=370/4*cards[i].offset[1]-40;
      $(card).attr('data-id',cards[i].id).css({
        'width':jsw+'px',
        'height':jsh+'px',
      })
      var pos=getCanUsePosition(cards[i].offset);
      $(card).css({
        'left':pos[0]*370/4+'px',
        'top':pos[1]*370/4+'px'
      })
      card.style.opacity='0';
      !function(i,card){
        setTimeout(function(){
          card.style.opacity='1';
          card.style.animation='btin .3s';
        },i*50)
      }(i,card)
      
      cards[i].callback(card)
    }
    xred=true;
  }

  function getCanUsePosition(offset){
    var pos=[0,0];
    var maxLeft=spacewidth-offset[0]+1;
    while(true){
      for(var i=0;i<maxLeft;i++){
        pos=[i,pos[1]];
        var jy=[];
        for(var i2=0;i2<offset[0];i2++){
          for(var j=0;j<offset[1];j++){
            jy.push([i2+i,j+pos[1]]);
          }
        }
        var __q=false;
        for(var i3=0;i3<jy.length;i3++){
          var _q=false;
          for(var i4=0;i4<space.length;i4++){
            if(jy[i3][0]==space[i4][0]&&jy[i3][1]==space[i4][1]){
              _q=true;break;
            }
          }
          if(_q){__q=true;break;}
        }
        if(!__q){
          for(var i5=0;i5<jy.length;i5++){
            space.push(jy[i5]);
          }
          return pos;
        }
      }
      pos[1]++;
    }
  }
  exportq({
    registerCard:function(card){
      cards.push(card);
    }
  })
})