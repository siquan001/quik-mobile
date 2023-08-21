!function (e, t) {
  t.id = 'links'; e(t);
}(initAPP, function (exportq) {
  var pins = [
    {
      url: "https://fanyi.baidu.com/",
      name: "百度翻译"
    }
  ];
  if (quik.storage.get('pins')) {
    pins = quik.storage.get('pins')
  } else {
    quik.storage.set('pins', pins);
  }
  function getImgNatural(img, callback) {
    if (typeof img.naturalWidth == "undefined") {// IE6/7/8
      var temImg = new Image();
      temImg.onload = function () {
        callback({ width: temImg.width, height: temImg.height });
      }
      temImg.src = img.src;
    } else {// 支持H5的现代浏览器
      callback({ width: img.naturalWidth, height: img.naturalHeight });
    }
  }

  var linkeditDialog = quik.dialog.open('<form class="linkedit"><h1>添加链接</h1><p>URL：<input type="url" placeholder="必填URL" required /></p><p>标题：<input type="text" placeholder="必填标题" required /></p><p>位置：<input type="number" placeholder="选填位置" min="0" /></p><div class="btnc">  <div class="deletebtn">删除</div>  <div class="cancelbtn">取消</div>  <button type="submit">添加</button></div></form>')
  var linkeditStatu;

  function xrlinks() {
    $('.links ul').html('');
    for (var i = 0; i < pins.length; i++) {
      // 闭包以解决异步i错误的问题
      (function (i) {
        var li = document.createElement('li');
        li.innerHTML = '<a href="'+pins[i].url+'" target="_blank" rel="noopener noreferrer"><img src="'+quik.favicon.get(pins[i].url)+'" alt=""><p></p></a><div class="bi bi-pencil"></div>';
        li.querySelector('p').innerText=pins[i].name;
        $('.links ul').append(li);
        //做img过小的问题
        $(li).find('img').on('load', function () {
          getImgNatural($(li).find('img')[0], function (offset) {
            if (offset.width < 32) {
              // 将favicon换成自定义的
              $(li).find('img').attr('src', quik.favicon.create(pins[i].name[0]));
            }
          })
        });
        $(li).find('img').on('error', function () {
          $(li).find('img').attr('src', quik.favicon.create(pins[i].name[0]));
        });

        //添加修改按钮
        $(li).find('div.bi').click(function () {
          linkeditStatu = $(li).index('.links ul li');
          quik.dialog.show(linkeditDialog);
          var f=$(linkeditDialog.dialogF);
          f.find('.deletebtn').show();
          f.find('[type=url]').val(pins[linkeditStatu].url);
          f.find('[type=text]').val(pins[linkeditStatu].name);
          f.find('[type=number]').val(linkeditStatu);
          f.find('[type=number]').attr('max',pins.length-1);
          f.find('h1').html('修改链接');
          f.find('button[type=submit]').html('修改');
        })
      })(i)
    }

    //添加pins-item按钮
    var addli = document.createElement('li');
    addli.innerHTML = `<div class="bi bi-plus-lg"></div>`;
    addli.classList.add('addlinkbtn');
    $('.links ul').append(addli);
    addli.onclick = function () {
      linkeditStatu = -1;
      quik.dialog.show(linkeditDialog);
      var f=$(linkeditDialog.dialogF);
          f.find('.deletebtn').hide();
          f.find('[type=url]').val('');
          f.find('[type=text]').val('');
          f.find('[type=number]').val('');
          f.find('[type=number]').attr('max',pins.length);
          f.find('h1').html('添加链接');
          f.find('button[type=submit]').html('添加');
    }
  }
  $(linkeditDialog.dialogF).find('.deletebtn').click(function(){
    pins.splice(linkeditStatu,1);
    quik.storage.set('pins', pins);
    quik.dialog.hide(linkeditDialog);
    xrlinks();
  });
  $(linkeditDialog.dialogF).find('.cancelbtn').click(function(){
    quik.dialog.hide(linkeditDialog);
  });
  $(linkeditDialog.dialogF).find('form').on('submit',function(e){
    e.preventDefault();
    var url = $(this).find('[type=url]').val();
    var title = $(this).find('[type=text]').val();
    var index = $(this).find('[type=number]').val();
    if(linkeditStatu==-1){
      index=index||pins.length;
    }else{
      index=index||linkeditStatu;
      pins.splice(linkeditStatu,1);
    }
    pins.splice(index, 0, {
      url: url,
      name: title
    })
    quik.storage.set('pins', pins);
    quik.dialog.hide(linkeditDialog);
    xrlinks();
  });
  xrlinks();
})