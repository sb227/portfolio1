///////////// 전역변수 /////////////////

/// 0. 모바일용 코드 
var mob = 0; //0-모바일 아님, 1-모바일
if ($(window).width() <= 800) {
    mob = 1;
}

console.log("모바일코드:" + mob);


// 1. 페이지 번호
var pno = 0;
// 2. 전체 페이지 수 
const totnum = 5;
// const 는 변수 var와 달리 변경 불가한 상수를 말한다 
// 3. 광스크롤 방지
var psts = 0; //( 0은 허용 1은 불허용 )
// 4. 한페이지당 높이
var winH = $(window).height();

//////////// 전역변수 ////////////////

$(document).ready(function (e) {
    console.log("로딩완료!제이쿼리");

    $(".header_menu_icon").click(function () {
        $(".gnb_wrap,.menu")
            .toggleClass("on");
        $(".fixed_wrap").removeClass("on");

        //.menu에 class="on"이 없으면 즉, false이면~
        // 페이지 규칙에 따라 "on"을 넣고 뺄 수 있게 pageAction함수를 
        // 호출한다!
        // $(선택자).is(검사요소특성) -> 있으면 true, 없으면 false
        console.log($(".menu").is(".on"));
        if (!$(".menu").is(".on")) { //on없으면 들어감!
            setTimeout(pageAction, 300); // 현재페이지 셋팅으로 다시 셋업!
        } ///// if ////////////////////

    }); ///////////// 햄버거메뉴 클릭 //////////

    $(".top_btn").click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 800, "easeOutSine",function(){
            pageAction();
        });

        $(".indicator_area li").removeClass("on").first().addClass("on");
        
        pno = 0;
    }); //////// top 버튼 클릭 ///////

    $(".indicator_area a").click(function (e) {
        e.preventDefault();
        var idx = $(this).parent().index();

        pno = idx;

        var pid = $(this).attr("href");
        console.log(pid);

        var pgpos = $(pid).offset().top;
        console.log(pgpos);

        $("html,body").animate({
            scrollTop: (winH * pno) + "px"
        }, 800, "easeOutSine", function () {
            //페이지 도착후 변경사항
            loadAction();
        }); //// animate /////////////////

        // 페이지 이동과 동시에 실행
        setTimeout(pageAction, 800);
        $(this).parent().addClass("on").siblings().removeClass("on");
    }); ////////// 좌측 인디케이터 클릭 /////////////

    $(document).on("mousewheel DOMMouseScroll",
        function (e) {
            // 모바일일때 작동막기
            if (mob) return true;

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

            /*var pgpos = $(".pgnum").eq(pno).offset().top;
            console.log("위치 : " + pgpos);*/


            // 페이지 위치값을 잘 못읽어 올때 높이값 기준으로 계산한다!
            // 페이지높이값 * 페이지번호
            // = winH * pno

            $("html,body").stop().animate({
                scrollTop: (winH * pno) + "px"
            }, 800, "easeOutSine", function () {
                //페이지 도착후 변경사항
                loadAction();
            }); //// animate /////////////////

            // 페이지 이동과 동시에 실행
            setTimeout(pageAction, 800);

            $(".indicator_area a").eq(pno).parent().addClass("on").siblings().removeClass("on");
        }); ////////////////// mousewheel //////////////////////////
    
    mobHeader();
}); ///////////제이쿼리 구역///////////



/*//////////////////////////////////////////////
    함수명: pageAction
    기능: 페이지별 액션 셋팅
*/ //////////////////////////////////////////////
function pageAction() {
    console.log("페이지액션");

    // 두번째 페이지일때 class="on"넣기
    // 대상: .indicator_wrap, .fixed_wrap
    if (pno === 1 || pno === 2) {
        $(".indicator_wrap, .fixed_wrap, .gnb_sns_on").addClass("on");
    } else {
        $(".indicator_wrap, .fixed_wrap, .gnb_sns_on").removeClass("on");
    }

    if (pno === 1 || pno === 2 || pno === 4) {
        $(".top_btn img").eq(0).hide().next().show();
        $(".top_btn p").css({
            color: "#000"
        });
    } else if (pno === 0 || pno === 3) {
        $(".top_btn img").eq(1).hide().prev().show();
        $(".top_btn p").css({
            color: "#fff"
        });
    }

    if (pno === 4) {
        $(".scroll_wrap").css({
            display: "none"
        });
    } else {
        $(".scroll_wrap").css({
            display: "block"
        });
    }

} ////// pageAction 함수 //////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////



/*//////////////////////////////////////////////
    함수명: loadAction
    기능: 페이지별 액션 셋팅 (도착후)
*/ //////////////////////////////////////////////
function loadAction() {
    console.log("페이지로드액션");

    // 두번째 페이지일때 class="on"넣기
    // 대상: .indicator_wrap, .fixed_wrap
    if (pno === 1 ) {
        $("#page2 svg").addClass("on");
    } else if(pno === 2 ) {
        $("#page3 svg").addClass("on");
    }
    
} ////// loadAction 함수 //////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


/*//////////////////////////////////////////////
    함수명: mobHeader
    기능: 모바일 시 헤더 로고 검은색
*/ //////////////////////////////////////////////
function mobHeader() {
    console.log("모바일 헤더 함수");

    if (mob === 1) {
        $(".fixed_wrap").addClass("on");
    }


} ////// mobHeader 함수 //////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


