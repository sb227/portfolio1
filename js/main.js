// 로드구역 //
window.addEventListener("DOMContentLoaded", function () {
    console.log("로딩 완료");
    
    var snum = 1;
    var restart;
    
    var slideShow = setInterval(function () {
        console.log("슬라이드 흘러가라~!!~!");
        // 타겟 설정
        var tg = document.getElementsByClassName("slide")[0];

        tg.style.left = "-100%";
        tg.style.transition = "left .8s";

        // 추가변경: 블릿(.indic)의 li 현재 슬라이드 순번에 
        // class = "on" 주기
        var indic = document.querySelectorAll(".ban_wrap li");

        for (var i = 0; i < indic.length; i++) {
            indic[i].classList.remove("on");
        } //// for문 /////////////////////

        // 슬라이드 순번(snum)과 동일한 블릿순번에 class를 넣는다!
        indic[snum].classList.add("on");
        snum++
        if (snum > 2) snum = 0;

        // left, transition 초기화
        setTimeout(function () {
            var tgli = document.getElementsByClassName("slide")[0].getElementsByTagName("li");

            tg.appendChild(tgli[0]);
            tg.style.left = "0";
            tg.style.transition = "none";
        }, 1000);
    }, 3000); ////////// 슬라이드 돌아 ////////////

    $(".ban_wrap a").click(function () {
        var banNum = $(".ban_wrap a").index(this);
        console.log("인덱스 : " + banNum);
        $(".slide").css({
            left: (-100 * banNum) + "%",
            transition: "left .8s"
        }); //////// css ////////////
        $(this).parent().addClass("on").siblings().removeClass("on");
        clearInterval(slideShow);
        
    }); ////// ban_wrap li 버튼 ////////////
}); ////////////// 로드 구역 /////////////////////////

