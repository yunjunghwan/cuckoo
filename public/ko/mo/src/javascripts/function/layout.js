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



