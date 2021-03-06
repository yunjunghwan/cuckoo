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
    main();
    layout();
    scrollBg();
    locationJS();
    object();
});
function layout() {
    var $header = $("#header");

    var $gnb = $("#gnb");
    var $allNavBtn = $("#allNavBtn");
    var $gnbDepth1 = $gnb.find(".depth1");
    var $gnbDimmed = $("#gnbDimmed");
    var $navDimmed = $("#navDimmed");
    var $headerSiteMap = $("#headerSiteMap");
    var navOpen = false;

    //gnb open/close
    $gnbDepth1.find("> li").mouseenter( function () {
        var _this = $(this);
        var _index = _this.index();
        if(navOpen === false){
            gnbOpen(493);
        }
    });
    $header.mouseleave(function () {
        gnbClose();
    });
    function gnbOpen(_gnbHeight) {
        TweenMax.to($header, .3, {height: _gnbHeight, ease: es_step});
        TweenMax.to($gnbDimmed, .3, {display:"block", opacity:.6, ease:es_step});
    }

    function gnbClose() {
        TweenMax.to($header, .3, {height: 140, ease: es_step});
        TweenMax.to($gnbDimmed, .3, {display:"none", opacity:0, ease:es_step});
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




function locationJS(){

}
function main() {
    //mainVisual
    var $mainVisual = $("#mainVisual");
    var $visualImg = $mainVisual.find(".visual_img li"),
        $visualTxt = $mainVisual.find(".visual_txt li");
    var _visualLength = $visualImg.length;

    //인디게이터
    var $mainIndi = $("#mainIndi"),
        $indiBtn = $mainIndi.find("button");
    var $visualController = $("#visualController");

    var zIndexPrev = 0;
    var zIndexNext = 1;
    var visualDuration = 1;

    //비쥬얼 갯수 체크
    /*for(var i=0; i<_visualLength-1; i++){
        $mainIndi.append("<li><button type='button'><span></span></button></li>");
    }
    if(_visualLength <= 1){
        $mainIndi.hide();
    }*/

    //비쥬얼 모션
    var visualCrr = {};
    Object.defineProperty(visualCrr, 'number', {
        get: function () {
            return this.num || 0;
        },
        set: function (_index) {
            _index = _index % _visualLength;
            if (!TweenMax.isTweening($visualImg)) {
                if(visualCrr.number < _index){
                    TweenMax.fromTo($visualImg, visualDuration + 0.2,
                        {zIndex: zIndexPrev, right: "auto", left: 0},
                        {width: "0%", ease: Expo.easeOut}
                    );
                    TweenMax.fromTo($visualImg.eq(_index), visualDuration,
                        {zIndex: zIndexNext, left: "auto", right: 0},
                        {width: "100%", ease: Expo.easeOut}
                    );

                    TweenMax.to($visualTxt.find(".tit,.txt,a"), visualDuration,
                        {x:-30, opacity:0, display:"none", ease:Expo.easeOut}
                    );
                    TweenMax.staggerFromTo($visualTxt.eq(_index).find("p,a"), visualDuration,
                        {x:30},
                        {x:0, opacity:1, display:"block", ease:Expo.easeOut}, .1
                    );
                } else {
                    TweenMax.fromTo($visualImg, visualDuration + 0.2,
                        {zIndex: zIndexPrev, left: "auto", right: 0},
                        {width: "0%", ease:Expo.easeOut}
                    );
                    TweenMax.fromTo($visualImg.eq(_index), visualDuration,
                        {zIndex: zIndexNext, right: "auto", left: 0},
                        {width: "100%", ease:Expo.easeOut}
                    );

                    TweenMax.to($visualTxt.find("p,a"), visualDuration,
                        {x:30, opacity:0, display:"none", ease:Expo.easeOut}
                    );
                    TweenMax.staggerFromTo($visualTxt.eq(_index).find("p,a"), visualDuration,
                        {x:-30},
                        {x:0, opacity:1, display:"block", ease:Expo.easeOut}, .1
                    );
                }
                $mainIndi.find("button").removeClass("active");
                $mainIndi.find("li").eq(_index).find("button").addClass("active");
                this.num = _index;
            }
        }
    });

    var interDuration = 4000;
    var visualTimer = setInterval(visualSet, interDuration);

    function visualSet(){
        visualCrr.number = visualCrr.number+1;
    }

    $visualController.click(function () {
        var _this = $(this);
        if (_this.hasClass("stop")) {
            clearInterval(visualTimer);
            _this.removeClass("stop").addClass("play");
        } else {
            visualTimer = setInterval(visualSet, interDuration);
            _this.removeClass("play").addClass("stop");
        }
    });

    $indiBtn.click(function () {
        var _this = $(this).parent();
        var _index = _this.index();
        if(!$visualController.hasClass("stop")){
            clearInterval(visualTimer);
            visualCrr.number = _index;
        } else {
            clearInterval(visualTimer);
            visualTimer = setInterval(visualSet, interDuration);
            visualCrr.number = _index;
        }
    });

   /* $nextBtn.click(function () {
        if (!TweenMax.isTweening($visualImg)) {
            visualCrr.number++;
            TweenMax.fromTo($visualImg, visualDuration+0.2,
                {zIndex: zIndexPrev, right:"auto", left:0},
                {width:"0%", ease:Expo.easeOut}
            );
            TweenMax.fromTo($visualImg.eq(visualCrr.number), visualDuration,
                {zIndex: zIndexNext, left: "auto", right: 0},
                {width: "100%", ease:Expo.easeOut}
            );

            TweenMax.to($visualTxt.find("h1,p,a"), visualDuration,
                {x:-20, opacity:0, display:"none", ease:Expo.easeOut}
            );
            TweenMax.fromTo($visualTxt.eq(visualCrr.number).find("h1,p,a"), visualDuration,
                {x:20},
                {x:0, opacity:1, display:"block", ease:Expo.easeOut}
            );
        }
    });
    $prevBtn.click(function () {
        if (!TweenMax.isTweening($visualImg)) {
            visualCrr.number--;
            TweenMax.fromTo($visualImg, visualDuration + 0.2,
                {zIndex: zIndexPrev, left: "auto", right: 0},
                {width: "0%", ease:Expo.easeOut}
            );
            TweenMax.fromTo($visualImg.eq(visualCrr.number), visualDuration,
                {zIndex: zIndexNext, right: "auto", left: 0},
                {width: "100%", ease:Expo.easeOut}
            );

            TweenMax.to($visualTxt.find("h1,p,a"), visualDuration,
                {x:20, opacity:0, display:"none", ease:Expo.easeOut}
            );
            TweenMax.fromTo($visualTxt.eq(visualCrr.number).find("h1,p,a"), visualDuration,
                {x:-20},
                {x:0, opacity:1, display:"block", ease:Expo.easeOut}
            );
        }
    });*/

    //주요제품
    var $productSlide = $("#productSlide");
    //텍스트
    var $txtSlide = $productSlide.find(".txt_slide article");
    //이미지
    var $productImg = $productSlide.find(".img_wrap div");
    //이전, 다음 버튼
    var $prevBtn = $productSlide.find("#prevBtn"),
        $nextBtn = $productSlide.find("#nextBtn");
    //카테고리
    var $categoryLeft = $productSlide.find(".category_left"),
        $categoryRight = $productSlide.find(".category_right"),
        //리스트 버튼
        $categoryBtn = $productSlide.find(".category_btn button"),
        //리스트 불렛
        $categoryDot = $productSlide.find(".active_dot");

    var productCrr = {};
    var _productLength = 10;

    Object.defineProperty(productCrr, 'number', {
        get: function () {
            return this.num || 0;
        },
        set: function (_index) {
            _index = _index % _productLength;
            if(_index < 0){
                _index = 9;
            }
            //이미지
            TweenMax.to($productImg, 2, {opacity:0, ease:es_step});
            TweenMax.to($productImg.eq(_index), .5, {opacity:1, ease:es_step});

            //텍스트
            TweenMax.to($txtSlide, 1, {opacity:0, display:"none", ease:es_step});
            TweenMax.to($txtSlide.eq(_index), .2, {opacity:1, display:"block", ease:es_step});

            //리스트
            TweenMax.to($categoryLeft, .5, {width: _index * 118, ease: es_step});
            TweenMax.to($categoryRight, .5, {width: 1180 - _index * 118 - 118, ease: es_step});

            TweenMax.to($categoryDot, .5, {left: 118 * _index + 49, ease:es_step});
            this.num = _index;
        }
    });
    //다음 버튼
    $nextBtn.click(function () {
        productCrr.number++;
    });
    //이전 버튼
    $prevBtn.click(function () {
        productCrr.number--;
    });
    //리스트 버튼
    $categoryBtn.click(function () {
        var _this = $(this);
        var _index = _this.parent().index();

        productCrr.number = _index;
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








function scrollBg(){
    var $topBtn = $("#topBtn");
    $(window).scroll(function () {

        $(".pall_bg, #subVisual").each(function () {
            var offset = $(this).offset();
            var offsetTop = offset.top;
            var _this_h = $(this).innerHeight();
            var bg_p = (winSc - offsetTop) / _this_h * 100;
            $(this).css({"background-position-y": -bg_p.toFixed(2) / 2 + "%"});
        });
        if( winSc > 0) {
            $topBtn.addClass("scroll_st");
        } else {
            $topBtn.removeClass("scroll_st");
        }
        if (winSc > htmlH - 216 - winH) {
            $topBtn.addClass("fixed");
        } else {
            $topBtn.removeClass("fixed");
        }

        if (winSc > 600) {
            $subLocation.addClass("fixed");
        } else {
            $subLocation.removeClass("fixed");
        }
    });

    $topBtn.click(function () {
        TweenMax.to($("html, body"), .3, {scrollTop:0, ease:es_step});
    });

    var $jsScrSec = $(".js-scr-sec"); // js-scr-sec - 패럴럭스 효과 시작 박스 / 하위 js-scr-box 와 셋트
    var scrInnerStep = []; // 각 페이지의 js-scr-sec 위치 저장
    function scrollEvent() {
        $window.scroll(function () {
            scrollMotion(winSc);
        });
        $jsScrSec.each(function(){
            var _this = $(this);
            var secTop = _this.offset().top;
            var secInner = secTop - (winH / 2) - 350;
            scrInnerStep.push([_this,secInner]);
        });
        function scrollMotion(_winSc) {
            $.each(scrInnerStep, function (i, v) {
                if (_winSc >= v[1]) {
                    if (v[0].motion === undefined) {
                        v[0].addClass("js-motion-end");
                        TweenMax.staggerTo(v[0].find(".js-scr-box"), .8, {
                            y: 0, opacity: 1, ease: es_step
                        }, .2);
                        v[0].motion = true;
                    }
                }
            });
        }
        scrollMotion(winSc);
    }
    scrollEvent();
}









