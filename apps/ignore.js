!function(e,t){
  t.id='time';e(t);
}(initAPP,function(exportq){
  quik.settings.registerUnit('关于',[{
    type:null,
    title:"关于我们",
    callback:function(){
      quik.dialog.showifrdialog('./assets/about.html');
    }
  },{
    type:null,
    title:"给我反馈",
    callback:function(){
      quik.dialog.showifrdialog('./assets/feedback.html');
    }
  },{
    type:null,
    title:"用户协议与隐私政策",
    callback:function(){
      quik.dialog.showifrdialog('./assets/license.html');
    }
  },{
    type:null,
    title:"更新日志",
    callback:function(){
      quik.dialog.showifrdialog('./assets/changelog.html');
    }
  },{
    type:null,
    title:"特别鸣谢",
    callback:function(){
      quik.dialog.showifrdialog('./assets/thanks.html');
    }
  }])
})