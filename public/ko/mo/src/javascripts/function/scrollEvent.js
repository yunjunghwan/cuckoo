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









