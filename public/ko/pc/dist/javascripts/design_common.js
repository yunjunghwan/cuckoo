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
    //main();
    layout();
    //scrollBg();
    //locationJS();
    object();
    comparisonLayer();
    uiTab();
});
function layout() {
    var $header = $("#header");
    var $gnb = $header.find("#gnb"),
        $gnbOpenDepth = $gnb.find(".open_depth"),
        $gnbAllDepth = $gnb.find(".all_depth"),
        $gnbAllDepthWrap = $gnbAllDepth.find(".depth_wrap");
    var _allDepthH = $gnbAllDepthWrap.innerHeight();

    var $gnbDimmed = $("#gnbDimmed");
    var $allNavBtn = $("#allNavBtn");

    //gnb open/close
    $gnbOpenDepth.find("li a").mouseenter( function () {
        gnbOpen(_allDepthH);
    });
    $gnbAllDepth.mouseleave(function () {
        gnbClose();
    });

    function gnbOpen(_gnbHeight) {
        $gnbAllDepthWrap.addClass("open");
        TweenMax.to($gnbAllDepth, .5, {height: _gnbHeight, ease: es_step});
        TweenMax.to($gnbDimmed, .5, {display:"block", opacity:.8, ease:es_step});
    }

    function gnbClose() {
        $gnbAllDepthWrap.removeClass("open");
        TweenMax.to($gnbAllDepth, .5, {height: 0, ease: es_step});
        TweenMax.to($gnbDimmed, .5, {display:"none", opacity:0, ease:es_step});
    }

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
    });

    $headerPopupClose.click(function () {
        TweenMax.to($(this).parent(".header_popup"), .3, {y:20, opacity:0, display:"none", ease:es_step});
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
    var $familyBtn = $familySite.find("button");
    var $familySiteH = $familySite.find('div').height() + 41;
    $familyBtn.click(function () {
        if(!$familySite.hasClass("on")){
            TweenMax.to($familySite, .2, {height:$familySiteH});
            $familySite.addClass("on");
        } else {
            TweenMax.to($familySite, .2, {height: 41});
            $familySite.removeClass("on");
        }
    });
    $familySite.mouseleave(function () {
        TweenMax.to($familySite, .2, {height: 41});
        $familySite.removeClass("on");
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
    }
}

function layerPopClose(obj){// 레이어팝업 닫기, obj : 해당팝업 id

    $('#'+obj).removeClass('open');
}
function uiTab(){

    $(document).on('click', '.tab .tab_btn a', function(e){
        e.preventDefault();

        $(this).parent().siblings().removeClass('on');
        $(this).parent().addClass('on');
    });
}
