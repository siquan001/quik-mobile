!function(e,t){
  t.id='weather';e(t);
}(initAPP,function(exportq){
   /**
   * 发起JSONP请求
   * @param {String} url 
   * @param {Function} callback 
   */
    function jsonp(url, callback) {
      var s = document.createElement('script');
      var fnname = 'a' + Math.random().toString().split('.')[1];
      s.src = url + '&callback=' + fnname;
      window[fnname] = callback;
      document.body.append(s);
      s.onload = function () { s.remove() };
    }
  var weather = {
    data: {
      isinit: false,
      location: null,
      weather: null,
    },
    getLocation: function (callback) {
      var _ = this;
      if (_.data.location) {
        callback(_.data.location);
        return;
      }
      jsonp('https://apis.map.qq.com/ws/location/v1/ip?key=DX2BZ-AGNK7-T62XY-H4KZZ-KOUWF-KAB3T&output=jsonp', function (res) {
        _.data.location = res;
        callback(res);
      })
    },
    getWeather: function (callback) {
      var _ = this;
      if (_.data.weather) {
        callback(_.data.weather);
        return;
      }
      if (!_.data.location) return false;
      jsonp('https://wis.qq.com/weather/common?source=pc&weather_type=observe%7Cforecast_1h%7Cforecast_24h%7Cindex%7Calarm%7Climit%7Ctips%7Crise%7Cair&province=' + _.data.location.result.ad_info.province + '&city=' + _.data.location.result.ad_info.city + '&county=' + _.data.location.result.ad_info.district + '&_=' + Date.now(), function (res) {
        _.data.weather = res;
        callback(res);
      })
    },
    init: function (callback) {
      var _ = this;
      _.getLocation(function () {
        _.getWeather(function () {
          _.data.isinit = true;
          callback(true);
        })
      })
    }
  }

  quik.cardview.registerCard({
    id:"weather",
    offset:[4,2],
    callback:function(card){
      $(card).css({
        'background':'#09f',
        'color':'#fff'
      })
      $(card).html('<div class="nowWeather"><div class="location"><i class="bi bi-geo-alt"></i><span> -- </span></div><div class="weatherss"><img src="https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/01.png"/><p class="weather-temp"> -- </p><p class="weather-wind"> -- </p></div></div><div class="otherWeather"><div class="tabque"><div class="item">七日天气</div><div class="item">24小时天气</div><div class="item">更多天气</div></div><div class="tabin"><div class="item a1"><ul></ul></div><div class="item a2"><ul></ul></div><div class="item a5"><p>更多天气请打开<a href="https://tianqi.qq.com/" target="_blank">腾讯天气</a></p></div></div></div>')
      if(weather.data.isinit){xrWea()}else{
        weather.init(function(){xrWea();console.log(weather.data.weather)});
      }

      function xrWea(){
        $(card).find('.location span').html(weather.data.location.result.ad_info.district);
        $(card).find('.nowWeather img').attr('src',"https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/"+weather.data.weather.data.observe.weather_code+".png")
        $(card).find('.nowWeather .weather-temp').html(weather.data.weather.data.observe.degree+'℃');
        var  windMap = {
          0: '无持续风向',
          1: '东北风',
          2: '东风',
          3: '东南风',
          4: '南风',
          5: '西南风',
          6: '西风',
          7: '西北风',
          8: '北风',
          9: '旋转风',
      };
        $(card).find('.nowWeather .weather-wind').html(windMap[weather.data.weather.data.observe.wind_direction]+weather.data.weather.data.observe.wind_power+'级');
        var d2=weather.data.weather.data.forecast_24h;
        for(var i in d2){
          $(card).find('.item.a1 ul').append('<li><p class="time">'+d2[i].time.split('-')[1] + '-' + d2[i].time.split('-')[2]+'</p><img src="https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/'+d2[i].day_weather_code+'.png"><img src="https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/night/'+d2[i].night_weather_code+'.png"><p class="temp">'+d2[i].min_degree+'℃~'+d2[i].max_degree+'℃</p><p class="wind">'+d2[i].day_wind_direction+d2[i].day_wind_power+'级-'+d2[i].night_wind_direction+d2[i].night_wind_power+'级'+'</p></li>')
        }
        $(card).find('.item.a1 ul').css('width',$(card).find('.item.a1 ul li').length*100+'px');
        var d = weather.data.weather.data.forecast_1h;
        for (var i in d) {
          $(card).find('.item.a2 ul').append('<li><p class="time">'+d[i].update_time.substring(8, 10)+':00</p><img src="https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/'+gsun(d[i].update_time.substring(8, 10))+'/'+d[i].weather_code+'.png"/><p class="temp">'+d[i].degree+'℃</p><p class="wind">'+d[i].wind_direction+d[i].wind_power+'级</p></li>');
        }
        $(card).find('.item.a2 ul').css('width',$(card).find('.item.a2 ul li').length*100+'px');
        function gsun(a) {
          a = r0(a);
          var b = weather.data.weather.data.rise;
          b = b[0];
          var c = [];
          c[0] = r0(b.sunrise.split(':')[0]);
          c[1] = r0(b.sunset.split(':')[0]);
          if (a > c[0] && a <= c[1]) {
            return 'day';
          } else {
            return 'night';
          }
        }
        function r0(a) {
          return a[0] == '0' ? (a[1] - 0) : (a - 0)
        }
      }

      $(card).find('.tabque .item').click(function(){
        acted($(this).index());
      });

      acted(0);

      function acted(index){
        $(card).find('.tabque .item').removeClass('act').eq(index).addClass('act');
        $(card).find('.tabin .item').hide().eq(index).show();
      }
    }
  })

  exportq({
    init:function(cb){
      if(weather.data.isinit){
        cb();
      }else{
        weather.init(cb);
      }
    },
    getWeather:function(){
      return weather.data.weather
    },
    getLocation:function(){
      return weather.data.location
    }
  })

})