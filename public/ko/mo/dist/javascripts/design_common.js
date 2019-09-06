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
    $(window).scroll(function () {
        winSc = $(this).scrollTop();

        var position = $(window).scrollTop(); // 현재 스크롤바의 위치


        if(winSc > 60){
            $('.header_title_wrap').addClass('fixed');
        }else{
            $('.header_title_wrap').removeClass('fixed');
        }

    });
    uiAcodian();
});

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
