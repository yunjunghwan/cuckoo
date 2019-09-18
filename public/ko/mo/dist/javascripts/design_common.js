"use strict";
var winW;
var winH;
var es_step = "Expo.ease";
var $window = $(window);
var winSc;
var htmlH;

$window.load(function () {
    htmlH = $("body").outerHeight(true);
    winSc = $(this).scrollTop();
    $window.on("resize", function () {
        winW = $(this).width();
        winH = $(this).height();
    });
    $(this).trigger("resize");
    $(window).scroll(function () {
        winSc = $(this).scrollTop();
    });
    if($('html').hasClass('sub')){
        $('html, body').animate({scrollTop:60}, '500');
    }
    $(document).on('click', '.design_select > .btn-view', function(e){
        e.preventDefault();
        if(!($(this).parent().hasClass('disabled'))){
            if(!($(this).hasClass('on'))) {
                $('.design_select .btn-view').removeClass('on');
                //$(this).parent().siblings().find('a').removeClass('on');
                $(this).addClass('on');
                $(document).on('click', '.design_select .hidden_area a', function(e){
                    e.preventDefault();
                    var thisText = $(this).text();

                    $(this).closest('.hidden_area').prev().removeClass('on');
                    $(this).closest('.hidden_area').prev().addClass('selected');
                    $(this).closest('.hidden_area').prev().empty();
                    $(this).closest('.hidden_area').prev().append(thisText);
                    $(this).parents('.hidden_area').find('li').removeClass('on');
                    $(this).parent().addClass('on');
                });
            } else {
                $(this).removeClass('on');
            }
        }
    });
    $(document).on('click', '.btn-like', function(){
        if(!($(this).hasClass('on'))){
            $(this).addClass('on')
        }else{
            $(this).removeClass('on')
        }
    });

    $(window).scroll(function () {
        winSc = $(this).scrollTop();

        var position = $(window).scrollTop(), // 현재 스크롤바의 위치
            footerHeight = $('#footer').outerHeight(true),
            headerHeight = $('.header_logo_wrap').outerHeight(true);



        if(winSc > headerHeight){
            $('.header_title_wrap').addClass('fixed');
        }else{
            $('.header_title_wrap').removeClass('fixed');
        }
        if(winSc > 0){
            $('.btn-float').addClass('fixed');
            if(winSc >= (winH-footerHeight)-110){
               $('.btn-float').addClass('stop');

            }else{
               $('.btn-float').removeClass('stop');
            }
        }else{
            $('.btn-float').removeClass('fixed');
        }
    });
    $('.btn-menu').on('click', function(){
        if(!($('html').hasClass('menu_open'))){
            $('html').addClass('menu_open');
            $('.btn-menu-close').on('click', function(){
                $('html').removeClass('menu_open');
            });
        }
    });
    $('.btn-top').on('click', function(){
        $('html, body').animate({scrollTop:0}, '500');
    })
    uiAcodian();
});
if($('.datepicker_input').length > 0){
    $('.datepicker_input').datepicker({
        dateFormat: 'yy-mm-dd',
        showMonthAfterYear:true ,
        monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'], //달력의 월 부분 Tooltip 텍스트 //달력의 월 부분 텍스트
        dayNamesMin: ['일','월','화','수','목','금','토'], //달력의 요일 부분 텍스트
    });
    $(".datepicker_input").datepicker().datepicker("setDate", new Date());
}
function uiAcodian(){
    $(document).on('click', '.ui_acodian .btn-view', function(e){
        e.preventDefault();
        if(!($(this).parents('.ui_acodian').hasClass('on'))){
            $(this).parents('.ui_acodian').addClass('on');
        }else{
            $(this).parents('.ui_acodian').removeClass('on');
        }

    })
}

function layerPopOpen(obj){// 레이어팝업 열기, obj : 해당팝업 id
	$('.wrap_layer_pop').removeClass('open');
	var thisPop = $('#'+obj).find('.layer_pop');
    var winW = $(window).width();
    var winH = $(window).height();
	//dimOn();
    if($('#'+obj).length >= 1){
		$('#'+obj).addClass('open');
        $('html, body').css('overflow','hidden');
    }

}

function layerPopClose(obj){// 레이어팝업 닫기, obj : 해당팝업 id

    $('#'+obj).removeClass('open');
    $('html, body').css('overflow','auto');
}
