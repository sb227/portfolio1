///////////// 전역변수 /////////////////

// 1. 페이지 번호
var pno = 0;
// 2. 전체 페이지 수 
const totnum = 5;
// const 는 변수 var와 달리 변경 불가한 상수를 말한다 
// 3. 광스크롤 방지
var psts = 0; //( 0은 허용 1은 불허용 )

//////////// 전역변수 ////////////////


$(document).ready(function (e) {
    $(".header_menu_icon").click(function () {
        $(".gnb_wrap,.menu")
            .toggleClass("on");
        $(".fixed_wrap").removeClass("on");
    }); ///////////// 햄버거메뉴 클릭 //////////

    $(".top_btn").click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 800, "easeOutExpo");

        $(".indicator_area li").removeClass("on").first().addClass("on");
    }); //////// top 버튼 클릭 ///////

    $(".indicator_area a").click(function (e) {
        e.preventDefault();

        var pid = $(this).attr("href");
        console.log(pid);

        var pgpos = $(pid).offset().top;
        console.log(pgpos);

        $("html,body").animate({
            scrollTop: pgpos + "px"
        }, 800, "easeInOutSine");

        $(this).parent().addClass("on").siblings().removeClass("on");
    }); ////////// 좌측 인디케이터 클릭 /////////////

   /* $(document).on("mousewheel DOMMouseScroll",
        function (e) {
            //광스크롤막기 //
            if (psts === 1) return true;
            psts = 1; // 잠금(기존 0값을 변경)
            setTimeout(function () {
                psts = 0;
            }, 800); // 타임아웃
            console.log("휠~!~!~!");
            e = window.event || e;

            var delta = e.detail ? e.detail : e.wheelDelta;
            console.log("delta : " + delta);
            if (/Firefox/i.test(navigator.userAgent)) {
                delta = -delta;
            } ///// if 문 /////////////////////

            // 음수일 때 아랫방향                
            if (delta < 0) {
                pno++; // 1씩증가
                if (pno === totnum) pno = totnum - 1;
            } //////////// if//////////////////////
            // 양수일 때 윗방향
            else {
                pno--; // 1씩 감소
                if (pno === -1) pno = 0;
            } ///////////// else ////////////////////
            console.log("페이지번호 : " + pno);
            var pgpos = $(".pgnum").eq(pno).offset().top;
            console.log("위치 : " + pgpos);
            $("html,body").stop().animate({
                scrollTop: pgpos + "px"
            }, 800, "easeInOutSine");

            $(".indicator_area a").eq(pno).parent().addClass("on").siblings().removeClass("on");
        }); ////////////////// mousewheel //////////////////////////
*/
}); ///////////제이쿼리 구역///////////
