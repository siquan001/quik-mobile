!function (e, t) {
  t.id = 'settings'; e(t);
}(initAPP, function (exportq) {
  var settingDia = quik.dialog.open('<div class="setting-dia"><div class="actionbar"><h1>设置</h1><i class="bi bi-x-lg"></i></div></div>');
  quik.storage.get('settings') || quik.storage.set('settings', {});
  $(settingDia.dialogF).find('.bi-x-lg').click(function () {
    quik.dialog.hide(settingDia);
  })
  settingDia.dialogF.querySelector('.d-c').classList.add('setting-d-c');
  function settinginputRet(type) {
    if (typeof type == 'string') {
      type = type.replace('string', 'text').replace('boolean', 'checkbox');
      return '<input type="' + type + '"/>';
    } else if (Array.isArray(type)) {
      var str = '';
      for (var i = 0; i < type.length; i++) {
        str += '<option value="' + type[i] + '">' + type[i] + '</option>';
      }
      return '<select>' + str + '</select>';
    } else if (type == null) {
      return "<i class=\"bi bi-chevron-right\"></i>";
    } else {
      console.warn('unkown type :settings');
    }
  }
  var sapi = {
    start: function (unit) {
      quik.dialog.show(settingDia);
    },
    /**
     * ```
     * details={
     *    attr:{
     *      title:"Title",
     *      exp:"Exp",
     *      type:"attr-type" || [selectItem,...] || null,
     *      callback: void(value)
     *      def:defaultValue
     *    },...
     * }
     * ```
     */
    registerUnit: function (unit, details) {
      var unit_el = document.createElement('div');
      unit_el.classList.add('unit');
      unit_el.setAttribute('data-unitname', unit);
      settingDia.dialogF.querySelector('.setting-dia').append(unit_el);
      unit_el.innerHTML = '<h2>' + unit + '</h2>';
      var ss = quik.storage.get('settings');
      ss[unit] = ss[unit] || {};
      var sq = ss[unit];
      for (var k in details) {
        $(unit_el).append('<div data-attrname="' + k + '"><span class="attr-title">' + details[k].title + '</span><div class="input-box">' + settinginputRet(details[k].type) + '</div></div>')
        sq[k] = sq[k] || details[k].def || '';
      }
      $(unit_el).find('[data-attrname]').each(function (i, e) {
        if (details[$(e).attr("data-attrname")].type != null) {
          if ($(e).find('.input-box>*').attr('type') == 'checkbox') {
            if (sq[$(e).attr("data-attrname")]) {
              console.log('checked');
              $(e).find('.input-box>*').click();
            }
            details[$(e).attr("data-attrname")].callback($(e).find('.input-box>*')[0].checked);
            $(e).find('.input-box>*').on('click', function () {
              sq[$(e).attr("data-attrname")] = $(this)[0].checked;
              quik.storage.set('settings', ss);
              details[$(e).attr("data-attrname")].callback($(this)[0].checked);
            })
          } else {
            $(e).find('.input-box>*').val(sq[$(e).attr("data-attrname")]);
            details[$(e).attr("data-attrname")].callback($(e).find('.input-box>*').val());
            if (details[$(e).attr("data-attrname")].type == 'range') {
              $(e).find('.input-box>*').val(sq[$(e).attr("data-attrname")] || 0);
              $(e).find('.input-box>*').attr('min', details[$(e).attr("data-attrname")].fw[0]).attr('max', details[$(e).attr("data-attrname")].fw[1]);
            }
            $(e).find('.input-box>*').on('change', function () {
              sq[$(e).attr("data-attrname")] = $(this).val();
              quik.storage.set('settings', ss);
              details[$(e).attr("data-attrname")].callback($(this).val());
            })
          }

        } else {
          $(e).on('click', function () {
            details[$(e).attr("data-attrname")].callback();
          })
        }
      })

    }
  }
  exportq(sapi);

  sapi.registerUnit('通用', {
    asif: {
      title: "把设置添加到第一界面",
      type: "boolean",
      def: true,
      callback: function (v) {
        if (v) {
          if ($('.iconbtns-container .setting-icon').length) {
            $('.iconbtns-container .setting-icon').show();
          } else {
            var icon = document.createElement('div');
            icon.classList.add('setting-icon');
            $('.iconbtns-container').append(icon);
            icon.title = '点击打开设置';
            icon.innerHTML = '<i class="bi bi-gear"></i>'
            icon.onclick = function () {
              sapi.start();
            }
          }
        } else {
          $('.iconbtns-container .setting-icon').hide();
        }

      }
    },
    msqh: {
      title: "颜色主题",
      type: ['浅色', '深色'],
      def: "浅色",
      callback: function (v) {
        if (v == '浅色') {
          $('body').removeClass('dark')
        } else {
          $('body').addClass('dark')
        }
        if ($('body').hasClass('dark')) {
          $(settingDia.dialogF).css('background-color', 'rgba(255,255,255,0.3)');
        } else {
          $(settingDia.dialogF).css('background-color', 'rgba(0,0,0,0.3)');
        }
      }
    },
    atfs: {
      title: "打开页面自动聚焦搜索框",
      type: "boolean",
      def: false,
      callback: function (v) {
        quik.storage.set('autofocuss', v);
      }
    },
    juse: {
      title: "搜索框仅搜索",
      type: "boolean",
      def: false,
      callback: function (v) {
        quik.storage.set('jusearch', v);
      }
    },
    qhttps: {
      title: "搜索框打开网址时使用https",
      type: "boolean",
      def: false,
      callback: function (v) {
        quik.storage.set('qhttps', v);
      }
    },
    smed: {
      title: "自定义搜索引擎列表",
      type: null,
      callback: function () {
        quik.smedit.open();
      }
    }
  })

  var timeinter;
  sapi.registerUnit('小组件', {
    awif: {
      title: "把“天气”添加到第一界面",
      type: "boolean",
      def: false,
      callback: function (v) {
        if (v) {
          if ($('.iconbtns-container .weather-icon').length) {
            $('.iconbtns-container .weather-icon').show();
          } else {
            var icon = document.createElement('div');
            icon.classList.add('weather-icon');
            icon.classList.add('right');
            icon.title = '点击进入第二界面查看天气';
            $('.iconbtns-container').append(icon);
            icon.innerHTML = '<i class="bi bi-cloud-sun"></i>'
            icon.onclick = function () {
              $('.logo').click();
            }
            var q = setInterval(function () {
              if (!quik.weather) return;
              quik.weather.init(function () {
                var w = quik.weather.getWeather();
                icon.innerHTML = '<img src="https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/' + w.data.observe.weather_code + '.png"/><p>' + w.data.observe.degree + '℃</p>'
              })
              clearInterval(q);
            }, 10)

          }
        } else {
          $('.iconbtns-container .weather-icon').hide();
        }
      }
    },
    adif: {
      title: "把“画板”添加到第一界面",
      type: "boolean",
      def: false,
      callback: function (v) {
        if (v) {
          if ($('.iconbtns-container .draw-icon').length) {
            $('.iconbtns-container .draw-icon').show();
          } else {
            var icon = document.createElement('div');
            icon.classList.add('draw-icon');
            $('.iconbtns-container').append(icon);
            icon.innerHTML = '<i class="bi bi-palette"></i>'
            icon.title = '点击打开画板';
            icon.onclick = function () {
              quik.drawboard.start();
            }
          }
        } else {
          $('.iconbtns-container .draw-icon').hide();
        }
      }
    },
    acif: {
      title: "把“计算器”添加到第一界面",
      type: "boolean",
      def: false,
      callback: function (v) {
        if (v) {
          if ($('.iconbtns-container .calc-icon').length) {
            $('.iconbtns-container .calc-icon').show();
          } else {
            var icon = document.createElement('div');
            icon.classList.add('calc-icon');
            $('.iconbtns-container').append(icon);
            icon.title = '点击打开计算器';
            icon.innerHTML = '<i class="bi bi-calculator"></i>'
            icon.onclick = function () {
              quik.calc.start();
            }
          }
        } else {
          $('.iconbtns-container .calc-icon').hide();
        }
      }
    },
    rptl: {
      title: "把时间作为LOGO",
      type: "boolean",
      def: false,
      callback: function (v) {
        clearInterval(timeinter);
        if (v) {
          $('.logo').html('<div class="t"></div>')
          timeinter = setInterval(function () {
            var d = new Date();
            function q0(a) { return a > 9 ? a : '0' + a };
            $('.logo .t').html(q0(d.getHours()) + ':' + q0(d.getMinutes()) + ':' + q0(d.getSeconds()))
          }, 100)
        } else {
          $('.logo').html('<img src="./img/logo.svg" alt="">')
        }
      }
    },
    adne: {
      title: "在第一界面添加“热点”组件",
      type: "boolean",
      def: false,
      callback: function (v) {
        var sd=quik.storage.get('news_select')||'bilibili';
        if (v) {
          if ($('.iconbtns-container .news-icon').length) {
            $('.iconbtns-container .news-icon').show();
          } else {
            var icon = document.createElement('div');
            icon.classList.add('news-icon');
            $('.iconbtns-container').append(icon);
            icon.title = '点击查看各大平台热榜';
            icon.innerHTML = '<i class="bi bi-newspaper"></i>';
            var newscontainer = document.createElement('div');
            var qb = false;
            newscontainer.classList.add('newscon');
            $('body').append(newscontainer);
            newscontainer.style.left=icon.getBoundingClientRect().left;
            $(newscontainer).html('<div class="topp"><div>News</div><select class="news_select"></select></div><ul></ul>');
            for (var k in sq) {
              $(newscontainer).find('.news_select').append('<option value="' + k + '">' + sq[k].name + '</option>');
            }
            $(newscontainer).find('.news_select').val(sd);
            $(newscontainer).find('.news_select').on('change', function () {
              xrul();
            })
            xrul();
            function xrul() {
              $(newscontainer).find('ul').html('');
              var k = $(newscontainer).find('.news_select').val();
              quik.storage.set('news_select', k);
              var res = sq[k].data;
              if (!res) {
                $.getJSON(sq[k].url, function (res1) {
                  res = res1;
                  sq[k].data = res1;
                  _xr();
                })
              } else {
                _xr();
              }
              function _xr() {
                for (var i = 0; i < res.data.length; i++) {
                  $(newscontainer).find('ul').append('<li><span>' + (i + 1) + '</span><a href="' + res.data[i].url + '" target="_blank">' + res.data[i].title + '</a></li>')
                }
              }
            }
            var __it_;
            var a_=false;
            icon.onclick = function () {
              if(a_){
                setTimeout(function () {
                  if (!qb) {
                    newscontainer.style.pointerEvents='';
                    newscontainer.style.opacity='';
                    newscontainer.style.bottom='';
                    clearTimeout(__it_);
                    __it_=setTimeout(function(){
                      newscontainer.style.display = '';
                    },300)
                  }
                }, 100)
                a_=false;
              }else{
                newscontainer.style.display = 'block';
                setTimeout(function(){
                  newscontainer.style.opacity='1';
                  newscontainer.style.bottom='40px';
                  clearTimeout(__it_);
                  __it_=setTimeout(function(){
                    newscontainer.style.pointerEvents='all';
                  },300)
                },6)
                a_=true;
              }
            }
          }
        } else {
          $('.iconbtns-container .news-icon').hide();
        }
      }
    },
  });
  sapi.registerUnit('数据', {
    imps: {
      title: "从文件导入数据",
      type: null,
      callback: function () {
        var f = document.createElement('input');
        f.type = 'file';
        f.accept = '*.json';
        f.click();
        f.onchange = function () {
          if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function () {
              localStorage.quik = reader.result;
              window.location.reload();
            }
            reader.readAsText(new Blob([this.files[0]]));
          }
          f = null;
        }
      }
    },
    exps: {
      title: "导出数据到文件",
      type: null,
      callback: function () {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([localStorage.quik]));
        a.download = 'quik-export.json';
        document.body.append(a);
        a.click();
        a.remove();
        a = null;
      }
    }
  })
})