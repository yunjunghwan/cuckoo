"use strict";
var winW;
var winH;
var es_step = "Expo.ease";
var $window = $(window);
var winSc;
var htmlH;

/* 팝업슬라이드 빌드/삭제 */
function buildSwiper(){
	var swiper = new Swiper('.prd_photo_slide .swiper-container', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.photo_slide-next',
			prevEl: '.photo_slide-prev',
		},

	});
}
function removeSwiper(){
	var swiper = new Swiper('.prd_photo_slide .swiper-container');
	swiper.destroy();
}
/* // 팝업슬라이드 빌드/삭제 */

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
            $(this).addClass('on');
        }else{
            $(this).removeClass('on');
        }
    });
    $(document).on('click', '.btn-sub-menu', function(){
        if(!($(this).parents('.header_title').hasClass('on'))){
            $(this).parents('.header_title').addClass('on');
            $('html').addClass('sub_menu_open');
            $('html, body').css('overflow','hidden');
            $(document).on('click', '.sub_menu li a', function(e){
                e.preventDefault();
                $(this).parent().siblings().removeClass('on');
                $(this).parent().addClass('on');
            });
        }else{
            $('html').removeClass('sub_menu_open');
            $(this).parents('.header_title').removeClass('on');
            $('html, body').css('overflow','auto');
        }
    });
    $(document).on('click', '.tab_btn li a', function(e){
        e.preventDefault();
        var index = $(this).parent().index();
        $(this).parent().siblings().removeClass('on');
        $(this).parent().addClass('on');
        $('.tab_cont_wrap').find('.cont').siblings().hide();
        $('.tab_cont_wrap').find('.cont').eq(index).show();
    });
	
    $(window).scroll(function () {
        winSc = $(this).scrollTop();
		var wh = $('body').height();
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
            if(winSc >= (htmlH-footerHeight)-110){
               $('.btn-float').addClass('stop');
			   $('.compare_btn').hide();

            }else{
               $('.btn-float').removeClass('stop');
			   $('.compare_btn').show();
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
    $(document).on('click', '.tooltip', function(){
        if(!($(this).parents('.tooltip_wrap').hasClass('on'))){
            $(this).parents('.tooltip_wrap').addClass('on');
            $('.tooltip_wrap .btn-close').on('click', function(){
                $(this).parents('.tooltip_wrap').removeClass('on');
            });
        }else{
            $(this).parents('.tooltip_wrap').removeClass('on');
        }
    });
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
var currentTop = $(window).scrollTop();
function layerPopOpen(obj){// 레이어팝업 열기, obj : 해당팝업 id
	$('.wrap_layer_pop').removeClass('open');
	var thisPop = $('#'+obj).find('.layer_pop');
    var winW = $(window).width();
    var winH = $(window).height();

	//dimOn();
    if($('#'+obj).length >= 1){
		$('#'+obj).addClass('open');
        $('html, body').css('overflow','hidden');
        $('body').css({
		  //'position':'fixed',
		  //'top':-currentTop,
		  //'left':0,
		  //'right':0
	  });

    }
	buildSwiper();
}


function layerPopClose(obj){// 레이어팝업 닫기, obj : 해당팝업 id

    $('#'+obj).removeClass('open');
    $('html, body').css('overflow','auto');
    $('body').removeAttr('style');
	//$('body').scrollTop(currentTop);	
	removeSwiper();
}

function cartOpen(obj){
	$('#'+obj).show();
	$('html, body').css('overflow','hidden');
	$('.dimmed').show();
}
function cartClose(obj){
	$('#'+obj).hide();
	$('html, body').css('overflow','auto');
	$('.dimmed').hide();
}
$('#inputFile').on('change', function(){
	$('.file-view-wrap').css('z-index',0);
	$('.close-view').show();
	readURL(this);
});
	$('.close-view').on('click', function(){
	$(this).hide();
	$('#inputFile').val('');
	$('.file-view').attr('src','../../images/common/addfile.png');
	//$('.file-view-wrap').css('z-index',-100);
});

var uploadFile = $('.fileBox2 .uploadBtn');
uploadFile.on('change', function(){
	if(window.FileReader){
		var filename = $(this)[0].files[0].name;
	} else {
		var filename = $(this).val().split('/').pop().split('\\').pop();
	}
	$(this).siblings('.fileName').val(filename);
});
function readURL(input) {
	if (input.files && input.files[0]) {
	var reader = new FileReader();

	reader.onload = function (e) {
			$('.file-view').attr('src', e.target.result);
		}
	  reader.readAsDataURL(input.files[0]);
	}
}

$('.prd_detail_vew_btn > button').click(function(){
	$('.prd_detail_vew_btn').toggleClass('on');
	$('.prd_detail_vew').toggleClass('on');
	
});