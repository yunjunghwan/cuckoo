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

        var position = $(window).scrollTop(), // 현재 스크롤바의 위치
    		headerHeight = $('#header').outerHeight(true),
    		asideBoxH  = $(".aside_box").outerHeight(true),
            topContH = $(".top_content").outerHeight(true)




        if(!($('#header').hasClass('all_menu_open'))){
            if(winSc > 0){
                $('#header').addClass('fixed');
            }else{
                $('#header').removeClass('fixed');
            }
        }

        if($(".aside_box").length > 0){
            var contTop = $('.content').offset().top;

            if(position > contTop){
    			$(".aside_box").css('top','72px');
    		}
            if(position+asideBoxH >= $('#footer').offset().top-72){
    			var top = ($('#footer').offset().top) - (position+asideBoxH+30);

    			$(".aside_box").css('top',top);

    		}
    		if((position > contTop) && (position+contTop <= $('#footer').offset().top)){
    			$(".aside_box").addClass('fixed');
    		}
    		if(position < topContH+headerHeight){
    			$(".aside_box").removeClass('fixed');
                $(".aside_box").css('top',0);
    		}
    	}

    });
    //main();
    layout();
    //scrollBg();
    //locationJS();
    object();
    comparisonLayer();
    uiTab();
    $(document).on('click', '.select_box > a', function(e){
        e.preventDefault();
        if(!($(this).parent().hasClass('disabled'))){
            if(!($(this).hasClass('on'))) {
                $('.select_box a').removeClass('on');
                //$(this).parent().siblings().find('a').removeClass('on');
                $(this).addClass('on');
                $(document).on('click', '.select_box .hidden a', function(e){
                    e.preventDefault();
                    var thisText = $(this).text();

                    $(this).closest('.hidden').prev().removeClass('on');
                    $(this).closest('.hidden').prev().addClass('selected');
                    $(this).closest('.hidden').prev().empty();
                    $(this).closest('.hidden').prev().append(thisText);
                    $(this).parents('.hidden').find('li').removeClass('on');
                    $(this).parent().addClass('on');
                });
            } else {
                $(this).removeClass('on');
            }
        }
    });

    var $wrap_tooltip = $('.tooltip_wrap'),
        $box_tooltip = $wrap_tooltip.find('.box_tooltip'),
        $ico_tooltip = $box_tooltip.find('.ico.tooltip'),
        $tooltip_cnt = $ico_tooltip.find('.tooltip_cnt');

    $ico_tooltip.on('mouseenter',function(){
        var $this = $(this);
        var arrow = '<span class="bg_arrow"></span>';
        var boxW = $this.parent().outerWidth();
        var icoW = $this.outerWidth();
        var arrowW = $('.bg_arrow').outerWidth();
        var tooltip_cntW = $('.tooltip_cnt').outerWidth();

        $this.parent().append(arrow);
        $this.next().fadeIn('fast');

        $this.parent().find('.bg_arrow').css('left',(boxW-(icoW/2))-$('.bg_arrow').outerWidth()/2);
        $this.parent().find('.tooltip_cnt').css('left',(boxW-(icoW/2))-$('.bg_arrow').outerWidth()/2 - (tooltip_cntW/2));

    });
    $ico_tooltip.on('mouseleave',function(){
        var $this = $(this);
        $this.next().fadeOut('fast');
        $this.parent().find('.bg_arrow').remove();

    });
    $('.star a').on('click', function(e){
		e.preventDefault();
		var starIndex = $(this).parent().index()+1;

		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
		$(this).parent().prevAll().addClass('on');

	});
    $('#inputFile').on('change', function(){
		$('.file-view-wrap').css('z-index',0);
		$('.close-view').show();
		readURL(this);
	});
	$('.close-view').on('click', function(){
		$(this).hide();
		$('#inputFile').val('');
		$('.file-view').attr('src','../../images/common/img_file.png');
		//$('.file-view-wrap').css('z-index',-100);
	});
    $(document).on('click', '.qa_list .more', function(e){
        e.preventDefault();
        if(!($(this).parents('li').hasClass('on'))){
            $(this).parents('li').addClass('on');
        }else{
            $(this).parents('li').removeClass('on');
        }

    });
    $(document).on('click', '.like', function(e){
        e.preventDefault();
        if(!($(this).hasClass('on'))){
            $(this).addClass('on');
        }else{
            $(this).removeClass('on');
        }
    });
    /*상품상세 앵커이동*/
    if($('#container').hasClass('prd_view')){
        var tabArray = [];
    	$('.prd_tab').each(function(index){
    		tabArray[index] = parseInt($(this).offset().top-73);//탭영역 제외
    	});

    	$('.prd_tab a').on('click', function(e){
    		e.preventDefault();
    		var index = $(this).parent().index();

    		$('html, body').stop().animate({scrollTop:tabArray[index]},500);
    	});
        $('.line_type input[type="text"], input[type="password"], input[type="number"], input[type="tel"]').on('focus', function(){
            $(this).closest('tr').addClass('on')
        });
        $('.line_type input[type="text"], input[type="password"], input[type="number"], input[type="tel"]').on('blur', function(){
            $(this).closest('tr').removeClass('on')
        });
    }

});
function layout() {
    var $header = $("#header");
    var $gnb = $header.find("#gnb"),
        $gnbOpenDepth = $gnb.find(".open_depth"),
        $gnbAllDepth = $gnb.find(".all_depth"),
        $gnbAllDepthWrap = $gnbAllDepth.find(".depth_wrap"),
        $allMenuWrap = $('.all_menu'),
        $allMenuClose = $('.all_menu_close');
    var _allDepthH = $gnbAllDepthWrap.innerHeight(),
        _allMenuH = $allMenuWrap.find('.inner').innerHeight();

    var $gnbDimmed = $("#gnbDimmed");
    var $allNavBtn = $("#allNavBtn");

    //gnb open/close
    $gnbOpenDepth.find("li a").mouseenter( function () {
        gnbOpen(_allDepthH);
    });
    $gnbAllDepth.mouseleave(function () {
        gnbClose();
    });
    $gnbDimmed.mouseenter  (function () {
        gnbClose();
    });


    function gnbOpen(_gnbHeight) {
        $gnbAllDepthWrap.addClass("open");
        TweenMax.to($gnbAllDepth, .3, {height: _gnbHeight, ease: es_step});
        TweenMax.to($gnbDimmed, .3, {display:"block", opacity:.8, ease:es_step});
    }

    function gnbClose() {
        $gnbAllDepthWrap.removeClass("open");
        TweenMax.to($gnbAllDepth, .3, {height: 0, ease: es_step});
        TweenMax.to($gnbDimmed, .3, {display:"none", opacity:0, ease:es_step});
    }

    $('#headerAllBtn').on('click', function(){
        $header.addClass('all_menu_open');
        TweenMax.to($allMenuClose, .3, {display:"block", opacity:.8, ease:es_step});
        TweenMax.to($allMenuWrap, .3, {height: _allMenuH, ease: es_step});
        TweenMax.to($gnbDimmed, .3, {display:"block", opacity:.8, ease:es_step});
    });
    $('.all_menu_close').on('click', function(){
        $header.removeClass('all_menu_open');
        TweenMax.to($allMenuClose, .3, {display:"none", opacity:0, ease:es_step, delay:.3});
        TweenMax.to($allMenuWrap, .3, {height: 0, ease: es_step});
        TweenMax.to($gnbDimmed, .3, {display:"none", opacity:0, ease:es_step});


    });

    //헤더 뉴스 모션
    var $headerNews = $header.find(".header_news"),
        $headerNewsObject = $headerNews.find("li"),
        _headerNewsLength = $headerNews.find("li").length;

    var headerNewsCrr = {};
    Object.defineProperty(headerNewsCrr, 'number', {
        get: function () {
            return this.num || 0;
        },
        set: function (_index) {
            _index = _index % _headerNewsLength;
            TweenMax.to($headerNewsObject.eq(_index-1), .3, {y: -20});
            TweenMax.fromTo($headerNewsObject.eq(_index), .3, {y: 20}, {y: 0});
            this.num = _index;
        }
    });

    var headerNewsDuration = 3000;
    var headerNewsTimer = setInterval(visualSet, headerNewsDuration);

    function visualSet(){
        headerNewsCrr.number++;
    }

    $headerNews.find("a").mouseenter(function () {
        clearInterval(headerNewsTimer);
    }).mouseleave(function () {
        headerNewsTimer = setInterval(visualSet, headerNewsDuration);
    });

    //장바구니, 검색 오픈
    var $headerCartSearchBtn = $header.find(".cart_btn, .search_btn");
    var $headerPopupClose = $header.find(".header_popup_close");
    $headerCartSearchBtn.click(function () {
        TweenMax.to($(this).siblings(".header_popup"), .3, {y:0, opacity:1, display:"block", ease:es_step});
        TweenMax.to($gnbDimmed, .3, {display:"block", opacity:.8, ease:es_step});
    });

    $headerPopupClose.click(function () {
        TweenMax.to($(this).parent(".header_popup"), .3, {y:20, opacity:0, display:"none", ease:es_step});
        TweenMax.to($gnbDimmed, .3, {display:"none", opacity:0, ease:es_step});
    });

    //gnb_search
    /*$allNavBtn.click(function () {
        var _this = $(this);
        if (!_this.hasClass("active")) {
            _this.addClass("active");
            TweenMax.to($headerSiteMap, .3, {height:525});
            TweenMax.to($navDimmed, .3, {display:"block", opacity:.6, ease:es_step});
            $fpNav.css({display: "none"});
            navOpen = true;
        } else {
            _this.removeClass("active");
            TweenMax.to($headerSiteMap, .3, {height:0});
            TweenMax.to($navDimmed, .3, {display:"none", opacity:0, ease:es_step});
            $fpNav.css({display: "block"});
            navOpen = false;
        }
    });*/

    //footer
    var $familySite = $("#familySite");
    var $familyBtn = $familySite.find(".tit");
    var $familySiteH = $familySite.find('.hidden').height() + 71;
    $familyBtn.click(function (e) {
        e.preventDefault();
        if(!$familySite.hasClass("on")){
            TweenMax.to($familySite, .2, {height:$familySiteH});
            $familySite.addClass("on");
        } else {
            TweenMax.to($familySite, .2, {height: 44});
            $familySite.removeClass("on");
        }
    });
    $familySite.mouseleave(function () {
        TweenMax.to($familySite, .2, {height: 44});
        $familySite.removeClass("on");
    });
    $('.datepicker_input').datepicker({
        dateFormat: 'yy-mm-dd',
        showMonthAfterYear:true ,
        monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'], //달력의 월 부분 Tooltip 텍스트 //달력의 월 부분 텍스트
        dayNamesMin: ['일','월','화','수','목','금','토'], //달력의 요일 부분 텍스트
    });


}

function object(){
    var $popup = $("#modalPopup");
    var $popupOpen = $(".popup_open");
    var $close = $(".popup_close");
    var $popupWrap = $popup.find(".popup_wrap");

    $popupOpen.click(function () {
        var _this = $(this);
        var _popUpName = _this.attr("id").replace("OpenBtn","");
        $("html").addClass("no_scroll");
        $("#"+_popUpName).show();
        TweenMax.to($popup, .5, {opacity: 1, display: "block"});
        TweenMax.fromTo($(".popup_container"), .5, {y: 50}, {y: 0, ease: es_step});
    });

    function noscroll(){
        $("html").removeClass("no_scroll");
        $popupWrap.hide();
    }

    $close.on("click", function () {
        TweenMax.to($popup, .3, {opacity: 0, display: "none", ease: es_step, onComplete: noscroll});
    });

    //쿠키 정책 팝업
    var $cookiePopup = $("#cookiePopup");
    var $cookieBtn = $cookiePopup.find("button");

    $cookieBtn.click(function () {
        TweenMax.to($cookiePopup, .3, {y:70});
    });
}

function comparisonLayer(){
    var $comparisonWrap = $('.comparison_wrap'),
        $comparsionBtn = $comparisonWrap.find('.btn-layer'),
        _comparsionBtnHeight = $comparsionBtn.innerHeight(),
        $comparsionBody = $comparisonWrap.find('.comparison_body'),
        _comparsionHeight = $comparsionBody.find('.inner').innerHeight();

    //gnb open/close
    $comparsionBtn.on("click", function () {
        if(!$(this).parent().hasClass('open')){
            $(this).parent().addClass('open');
            $comparsionBody.css('height',_comparsionHeight);
            $('.prd_list').addClass('comparsion_layer_open');
        }else{
            $(this).parent().removeClass('open');
            $comparsionBody.css('height',0)
            $('.prd_list').removeClass('comparsion_layer_open');
        }

    });

}


function layerPopOpen(obj){// 레이어팝업 열기, obj : 해당팝업 id
	$('.wrap_layer_pop').removeClass('open');
	var thisPop = $('#'+obj).find('.layer_pop');
    var winW = $(window).width();
    var winH = $(window).height();
	//dimOn();
    if($('#'+obj).length >= 1){
		$('#'+obj).addClass('open');

        thisPop.css("top", ((winH - thisPop.outerHeight()) / 2) + $(window).scrollTop());
        thisPop.css("left", ((winW - thisPop.outerWidth()) / 2) + $(window).scrollLeft());

        if($('#reviewPhoto').hasClass('open')){
            $('.photo_review').slick('refresh');
        }
    }

}

function layerPopClose(obj){// 레이어팝업 닫기, obj : 해당팝업 id

    $('#'+obj).removeClass('open');
}
function uiTab(){

    $(document).on('click', '.tab .tab_btn a', function(e){
        e.preventDefault();

        var index = $(this).parent().index();

        $(this).parent().siblings().removeClass('on');
        $(this).parent().addClass('on');
        $('.tab_cont_wrap').find('.cont').siblings().hide();
        $('.tab_cont_wrap').find('.cont').eq(index).show();

    });
}
function readURL(input) {
	if (input.files && input.files[0]) {
	var reader = new FileReader();

	reader.onload = function (e) {
			$('.file-view').attr('src', e.target.result);
		}
	  reader.readAsDataURL(input.files[0]);
	}
}


if (navigator.userAgent.match(/Trident\/7\./)) { //ie 픽스트 버그처리
    $('body').on("mousewheel", function () {
    event.preventDefault();

    var wheelDelta = event.wheelDelta;

    var currentScrollPosition = window.pageYOffset;
    window.scrollTo(0, currentScrollPosition - wheelDelta);
    });
};
