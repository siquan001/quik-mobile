!function (e, t) {
  t.id = 'dialog'; e(t);
}(initAPP, function (exportq) {
  var zindex=99;
  var dialog={
    open:function(content){
      var dialogF=document.createElement('div');
      dialogF.classList.add('dialog');
      var id='dia'+Math.random().toString()+Math.random().toString();
      dialogF.setAttribute('data-id',id);
      dialogF.innerHTML='<div class="d-c">'+content+'</div>';
      document.body.append(dialogF);
      return {
        dialogF:dialogF,
        id:id
      }
    },
    show:function(details){
      zindex++;
      $(details.dialogF).find('.d-c').css('animation','scale08-1 .3s');
      $(details.dialogF).css('display','flex');
      $(details.dialogF).css('z-index',zindex);
      if($('body').hasClass('dark')){
        $(details.dialogF).css('background-color','rgba(255,255,255,0.3)');
      }else{
        $(details.dialogF).css('background-color','rgba(0,0,0,0.3)');
      }
    },
    hide:function(details){
      $(details.dialogF).find('.d-c').css('animation','scale1-08 .3s');
      $(details.dialogF).css('background-color','')
      setTimeout(function(){
        $(details.dialogF).css('display','')
      },300);
    },
    destory:function(details){
      $(details.dialogF).remove();
    },
    showifrdialog:function(url,details={}){
      $(ifrdia.dialogF).find('iframe').attr('src',url);
      if(details.height){
        $(ifrdia.dialogF).find('iframe').css('height',details.height);
      }else{
        $(ifrdia.dialogF).find('iframe').css('height','90vh');
      }
        $(ifrdia.dialogF).find('iframe').css('width','100%');

      dialog.show(ifrdia);
    }
  }
  var ifrdia=dialog.open('<iframe frameborder="0"></iframe><i class="bi bi-x-lg"></i>');
  $(ifrdia.dialogF).find('.d-c').css({
    'position':'relative'
  })
  $(ifrdia.dialogF).find('i').css({
    'position':'absolute',
    'top':'0',
    'right': '0',
    'font-size': '16px',
    'cursor': 'pointer',
    'padding': '10px',
  }).click(function(){
    dialog.hide(ifrdia);
    $(ifrdia.dialogF).find('iframe').attr('src','');
  })
  exportq(dialog);
});