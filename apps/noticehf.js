!function(e,t){
  t.id='noticehf';e(t);
}(initAPP,function(exportq){
  quik.cardview.registerCard({
    id:"noticehf",
    offset:[4,1],
    callback:function(card){
      $(card).html('<i class="bi bi-volume-down-fill"></i><p>QUIK起始页新手必看指南</p>')
      $(card).find('p').click(function(){
        quik.dialog.showifrdialog('./assets/docs.html');
      })
    }
  })
})