!function (e, t) {
  t.id = 'notice'; e(t);
}(initAPP, function (exportq) {
  var noticelist=document.createElement('div');
  noticelist.classList.add('noticelist');
  document.body.append(noticelist);
  // notice API
  var notice = {
    list: [],
    /**
     * Options like
     * ```javascript
     * {
     *    title:"Notify Title", // required
     *    content:"HTML Content", // required
     *    buttons:{ // not required,and default is it
     *      yes:{
     *        text:"OK",// required
     *        callback:function(){}
     *      },
     *      no:{
     *        text:"Cancel",// required
     *        callback:function(){}
     *      }
     *    },
     *    showtime:3000 // not required,and default is -1(not limit)
     * }
     * ```
     */
    show: function (options) {
      // 自己用就不做判断了
      var nof = document.createElement('div');
      nof.className = 'notice item';
      if (!options.buttons) {
        options.buttons = {
          yes: {
            text: "OK",// required
            callback: function () { }
          },
          no: {
            text: "Cancel",// required
            callback: function () { }
          }
        }
      }
      nof.innerHTML = '<div class="title">' + options.title + '</div>\
    <div class="content">'+ options.content + '</div>\
    <div class="btns">\
      <button class="cancel">'+ (options.buttons.no ? options.buttons.no.text : 'Cancel') + '</button>\
      <button class="ok">'+ (options.buttons.no ? options.buttons.yes.text : 'OK') + '</button>\
    </div>';
      noticelist.appendChild(nof);
      var nid = Math.random().toString() + Math.random().toString() + Math.random().toString();
      this.list.push({
        nid: nid,
        nof: nof
      });
      var _ = this;
      nof.querySelector('button.cancel').addEventListener('click', function () {
        for (var i = 0; i < _.list; i++) {
          if (_.list[i].nid == nid) {
            _.list.splice(i, 1);
          }
        }
        nof.style.animation = 'rightout .4s';
        setTimeout(function () {
          nof.remove();
        }, 300)
        if (options.buttons.no)
          if (options.buttons.no.callback)
            options.buttons.no.callback();
      })
      nof.querySelector('button.ok').addEventListener('click', function () {
        for (var i = 0; i < _.list; i++) {
          if (_.list[i].nid == nid) {
            _.list.splice(i, 1);
          }
        }
        nof.style.animation = 'rightout .4s';
        setTimeout(function () {
          nof.remove();
        }, 300)
        if (options.buttons.yes)
          if (options.buttons.yes.callback)
            options.buttons.yes.callback();
      })
      if (options.showtime) {
        if (options.showtime != -1) {
          setTimeout(function () {
            for (var i = 0; i < _.list; i++) {
              if (_.list[i].nid == nid) {
                _.list.splice(i, 1);
              }
            }
            nof.style.animation = 'rightout .4s';
            setTimeout(function () {
              nof.remove();
            }, 300)
          }, options.showtime)
        }
      }
    }
  }
  exportq(notice);
})