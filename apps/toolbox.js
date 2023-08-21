!function(e,t){
  t.id='calc';e(t);
}(initAPP,function(exportq){
  var dia=quik.dialog.open('<div class="calc-dia"><div class="showf"><input class="a" type="text" readonly></input><input class="b" type="text" value="0" readonly></input></div>\
  <div class="btns">\
    <div class="btn">%</div>\
    <div class="btn">CE</div>\
    <div class="btn">C</div>\
    <div class="btn"><i class="bi bi-backspace"></i></div>\
    <div class="btn"><sup>1</sup>/<sub>x</sub></div>\
    <div class="btn">x<sup>2</sup></div>\
    <div class="btn"><sup>2</sup>√<span style="border-top:#000 solid 1px;">x</span></div>\
    <div class="btn">+</div>\
    <div class="btn">1</div>\
    <div class="btn">2</div>\
    <div class="btn">3</div>\
    <div class="btn">-</div>\
    <div class="btn">4</div>\
    <div class="btn">5</div>\
    <div class="btn">6</div>\
    <div class="btn">×</div>\
    <div class="btn">7</div>\
    <div class="btn">8</div>\
    <div class="btn">9</div>\
    <div class="btn">÷</div>\
    <div class="btn"><sup>+</sup>/<sub>-</sub></div>\
    <div class="btn">0</div>\
    <div class="btn">.</div>\
    <div class="btn">=</div>\
  </div>\
  <i class="bi bi-x-lg"></i>\
  </div>');
  $(dia.dialogF).find('.bi-x-lg').click(function(){
    quik.dialog.hide(dia);
  })
  $(dia.dialogF).find('.btn').click(function(){
    var t=$(this).text();
    var a=$(dia.dialogF).find('.showf .a');
    var b=$(dia.dialogF).find('.showf .b');
    var ts='1234567890';
    if(ts.indexOf(t)!=-1){
      if(b.val()=='0'){
        b.val(t);
      }else{
        b.val(b.val()+t);
      }
    }else if(t=='.'){
      if(b.val().indexOf('.')==-1&&b.val()){
        b.val(b.val()+t);
      }
    }else if(t=='%'){
      b.val(parseFloat(b.val())/100);
    }else if(t=='1/x'){
      b.val(1/parseFloat(b.val()));
    }else if(t=='x2'){
      b.val(parseFloat(b.val())*parseFloat(b.val()));
    }else if(t=='2√x'){
      b.val(Math.sqrt(parseFloat(b.val())));
    }else if(t=='+-÷'){
      b.val(parseFloat(b.val())*-1);
    }else if('+-×÷'.indexOf(t)!=-1){
      if(!a.val()){
        a.val(b.val()+t);
        b.val('0');
      }else{
        if(b.val()=='0'){
          a.val(a.val().substring(0,a.val().length-1)+t);
        }else{
          var ys=parseFloat(a.val().substring(0,a.val().length-1));
          var n=parseFloat(b.val());
          var fh=a.val()[a.val().length-1].replace('×','*').replace('÷','/');
          eval('var result='+ys+fh+n);
          a.val(result+t);
          b.val('0');
        }
      }
    }else if(t=='='){
      var ys=parseFloat(a.val().substring(0,a.val().length-1));
      var n=parseFloat(b.val());
      var fh=a.val()[a.val().length-1].replace('×','*').replace('÷','/');
      eval('var result='+ys+fh+n);
      a.val('');
      b.val(result);
    }else if(t=='CE'){
      b.val('0');
    }else if(t=='C'){
      a.val('');
      b.val('0')
    }else if(t=='+/-'){
      b.val(parseFloat(b.val())*-1);
    }else if(t==''){
      if(b.val()!='0'){
        b.val(b.val().substring(0,b.val().length-1))
        b.val(b.val()||'0');
      }
    }
  })
  quik.cardview.registerCard({
    id:"calc",
    offset:[1,1],
    callback:function(card){
      $(card).html('<span>+</span><span>-</span><span>×</span><span>÷</span>');
      $(card).click(function(){
        quik.dialog.show(dia);
      })
    }
  });
  exportq({
    start:function(){
      quik.dialog.show(dia);
    }
  })
})