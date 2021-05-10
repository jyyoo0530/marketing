var sizes = {
  w : window.innerWidth,
  h : window.innerHeight
}
var _mobile = 1024;

var
  $window = $(window),
  $header = $('.header'),
  $footer = $('.footer'),
  $btnAlarm = $('.btn_alarm'),
  $logo = $('.logo_wrap h1'),
  _logoScaleNum,
  _logoTopNum,
  $kvWrap = $('.kv_wrap'),
  $visualDaily = $('.visual_daily'),
  $characterWrap = $('.character_wrap'),
  $familyWrap = $('.family_wrap'),
  $alarmWrap = $('.alarm_wrap'),
  $tabWrap = $('.tab_wrap'),
  $picWrap = $('.pic_wrap'),
  $btnMenu = $('.btn_menu')
;

var smols = function(){
  var _init = function(){
    $header.find('h1 a').on('click',function(e){
      e.preventDefault();
      $('html, body').stop().animate({scrollTop : 0},300);
    });

    $header.find('ul li a').on('click',function(e){
      e.preventDefault();
      var _this = $(this);
      $header.css('height','60px');
      $btnMenu.removeClass('active');

      if(_this.parent().index() == 0){
        $('html, body').stop().animate({scrollTop : $kvWrap.find('.kv_img').offset().top+$header.height()*1.2},300);
      }
      if(_this.parent().index() == 1){
        $('html, body').stop().animate({scrollTop : $visualDaily.offset().top},300);
      }
      if(_this.parent().index() == 2){
        $('html, body').stop().animate({scrollTop : $alarmWrap.offset().top},300);
      }
    });
    $btnMenu.on('click',function(){
      var _this = $(this);
      if(!_this.hasClass('active')){
        _this.addClass('active');
        $header.stop().animate({'height' : '144px'},300);
      }else{
        _this.removeClass('active');
        $header.stop().animate({'height' : '60px'},300);
      }
    });

    $btnAlarm.on('click',function(){
      $('html, body').stop().animate({scrollTop : $alarmWrap.offset().top},300);
    });

    $tabWrap.find('li a').on('click',function(e){
      e.preventDefault();
      var _this = $(this);
      var _idx = $(this).parent().index();
      _this.parents('ul').find('li').removeClass('active');
      _this.parent().addClass('active');
      _this.parent().parent().parent().next().find('ul li').removeClass('active').eq(_idx).addClass('active');
    });
  }
  var _scroll = function(){
    var _nowTop = $window.scrollTop();

    if(sizes.w > _mobile){
      // if(_nowTop <= $kvWrap.find('.kv_img').height()*0.3){
      //   var _bigTitScale = 1 - (Math.min(1,(_nowTop) / ($kvWrap.find('.kv_img').height()*0.33)));
      //   var _headerTop = Math.max(0,_nowTop-$kvWrap.find('.kv_img').height()*0.12);
      //   $bigTit.css({
      //     'transform':'translateX(-50%) scale(' + _bigTitScale + ')'
      //   });
      //   if(_nowTop >= $kvWrap.find('.kv_img').height()*0.12){
      //     $header.css({
      //       'margin-top':-_headerTop
      //     });
      //   }else{
      //     $header.css({
      //       'margin-top':0
      //     });
      //   }
      // }

      if(_nowTop >= $kvWrap.find('.kv_img').offset().top){
        $header.addClass('active');
      }else{
        $header.removeClass('active');
      }

      if(_nowTop >= $characterWrap.find('.sticky_wrap.type2').offset().top+sizes.h*0.2){
        $characterWrap.find('.type2 ul').addClass('step1');
      }else{
        $characterWrap.find('.type2 ul').removeClass('step1');
      }
      if(_nowTop >= $characterWrap.find('.sticky_wrap.type2').offset().top+sizes.h*0.6){
        $characterWrap.find('.type2 ul').addClass('step2');
      }else{
        $characterWrap.find('.type2 ul').removeClass('step2');
      }

      if(_nowTop >= $familyWrap.offset().top + (sizes.h*0.2)){
        $familyWrap.find('.type1').addClass('step1');
      }else{
        $familyWrap.find('.type1').removeClass('step1');
      }
      if(_nowTop >= $familyWrap.offset().top + (sizes.h*0.65)){
        $familyWrap.find('.type1').addClass('step2');
      }else{
        $familyWrap.find('.type1').removeClass('step2');
      }
      
      if(_nowTop >= $familyWrap.offset().top + (sizes.h*2) + (sizes.h*0.1)){
        $familyWrap.find('.type2').addClass('step1');
      }else{
        $familyWrap.find('.type2').removeClass('step1');
      }
      if(_nowTop >= $familyWrap.offset().top + (sizes.h*2) + (sizes.h*0.5)){
        $familyWrap.find('.type2').addClass('step2');
      }else{
        $familyWrap.find('.type2').removeClass('step2');
      }
    }else{
      if(_nowTop <= 170){
        $header.removeClass('active').css({
          'margin-top':-_nowTop
        });
      }else{
        $header.addClass('active').css({
          'margin-top':0
        });
      }

      if(_nowTop >= $familyWrap.find('.sticky_wrap.type1').offset().top - (sizes.h/2)){
        $familyWrap.find('.type1').addClass('step1 step2');
      }else{
        $familyWrap.find('.type1').removeClass('step1 step2');
      }
    }

    if(sizes.w >= 1440){
      _logoScaleNum = 13
      _logTopNum = 123
    }else if(sizes.w >= 1025 && sizes.w < 1440){
      _logoScaleNum = 13.3
      _logTopNum = 67
    }else{
      _logoScaleNum = 3.9
      _logTopNum = 95
    }

    if(_nowTop <= $kvWrap.find('.kv_img').offset().top){
      var _bigTitScale = Math.max(1, _logoScaleNum - (((_logoScaleNum-0.1) * _nowTop) / $kvWrap.find('.kv_img').offset().top));
      var _bigTitTop = Math.max(22, _logTopNum - (((_logTopNum-0.1) * _nowTop) / $kvWrap.find('.kv_img').offset().top));
      var _headerTop = Math.max(0,_nowTop-$kvWrap.find('.kv_img').height()*0.05);
      $logo.css({
        'transform':'scale(' + _bigTitScale + ')',
        'margin-top' : _bigTitTop
      });
      if(_nowTop >= $kvWrap.find('.kv_img').height()*0.05){
        $header.find('ul').css({
          'margin-top':-_headerTop
        });
      }else{
        $header.find('ul').css({
          'margin-top':0
        });
      }
    }else{
      $logo.css({
        'transform':'scale(1)',
        'margin-top' : 22
      });
      $header.find('ul').css({
        'margin-top':0
      });
    }


    if(_nowTop >= $footer.offset().top - sizes.h){
      $btnAlarm.addClass('absol');
    }else{
      $btnAlarm.removeClass('absol');
    }


    $header.find('ul li').removeClass();
    if(_nowTop >= $kvWrap.find('.kv_img').offset().top-$header.height() && _nowTop < $visualDaily.offset().top-$header.height()){
      $header.find('ul li').eq(0).addClass('on');
    }else if(_nowTop >= $visualDaily.offset().top-$header.height() && _nowTop < $alarmWrap.offset().top-$header.height()){
      $header.find('ul li').eq(1).addClass('on');
    }else if(_nowTop >= $alarmWrap.offset().top-$header.height()){
      $header.find('ul li').eq(2).addClass('on');
    }

    $picWrap.find('ul li').each(function(){
      var _this = $(this);
      var _top = _this.offset().top - (sizes.h*0.6);
      var _top2 = _this.offset().top - (sizes.h*0.35);
      if(_nowTop >= _top) _this.addClass('active');
      if(_nowTop >= _top2) _this.find('p').addClass('active');
    });


    $alarmWrap.find('.btn_step1').on('click',function(e){
      e.preventDefault();
      $(this).fadeOut(300);
      $alarmWrap.find('.form_wrap').addClass('step2').find('.email_form').delay(300).fadeIn(300);
    });

  }
  var _resize = function(){
    sizes.w = window.innerWidth;
    sizes.h = window.innerHeight;
    
    smols().scroll();
  }

  return {
      init: _init,
      scroll: _scroll,
      resize: _resize
  }
}
$(function(){
  smols().init();
  smols().scroll();
  $window.on('scroll',function(){
    smols().scroll();
  })
  $window.on('resize',function(){
    smols().resize();
  })
})
