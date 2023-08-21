!function(e,t){
  t.id='drawboard';e(t);
}(initAPP,function(exportq){
  var dia=quik.dialog.open('<div class="draw-dia"><canvas></canvas><div class="controls"><input type="color"/><button class="bi bi-eraser"></button><button class="bi bi-x-lg"></button></div></div>')
  var color='#000000';
  $(dia.dialogF).find('.bi-x-lg').click(function(){
    quik.dialog.hide(dia);
  })
  quik.cardview.registerCard({
    id:"drawboard",
    offset:[1,1],
    callback:function(card){
      $(card).html('<i class="bi bi-palette"></i><p>画板</p>')
      $(card).click(function(){
        quik.dialog.show(dia);
      })
    }
  })
  var canvas=$(dia.dialogF).find('canvas')[0];
  var ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth - 40;
  canvas.height=450;
  ctx.fillStyle='#fff';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  var input_color=$(dia.dialogF).find('input');
  input_color.val(color);
  input_color.on('input',function(){
    if(isearser) return;
    color=$(this).val();
  })
  var isdown=false;
  var isearser=false;
  canvas.ontouchstart=function(e){
    console.log(e);
    e.preventDefault();
    isdown=true;
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.lineCap='round';
    ctx.lineWidth=isearser?100:3;
    ctx.moveTo(e.targetTouches[0].clientX-this.getBoundingClientRect().left,e.targetTouches[0].clientY-this.getBoundingClientRect().top);
  }
  canvas.ontouchmove=function(e){
    e.preventDefault();
    if(!isdown) return;
    ctx.lineTo(e.targetTouches[0].clientX-this.getBoundingClientRect().left,e.targetTouches[0].clientY-this.getBoundingClientRect().top);
    ctx.stroke();
  }
  canvas.ontouchend=function(e){
    e.preventDefault();
    isdown=false;
    ctx.stroke();
    ctx.closePath();
  }
  $(dia.dialogF).find('.bi-eraser').click(function(){
    if(isearser){
      color=$(input_color).val();
      $(this).css('color','');
    }else{
      $(this).css('color','#09f');
      color='#ffffff';
    }
    isearser=!isearser;
  });
  exportq({
    start:function(){
      quik.dialog.show(dia);
    }
  })
})