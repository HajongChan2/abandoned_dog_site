$(document).ready(function(){
    let num = localStorage.getItem("num");
    let str = '';
    let input;
    let img = '';
    let btn = '';

    $("#correct_bt a").click(function(){
        location.replace("/admin/product/update");
    });

    $.ajax({
        type:"POST",
        url:"/product/detail/"+num,
        dataType : "json",
        success : function(data){
            console.log(data);
            str += `
                <div id="content_top_font">
                <h2>펫세사리 상세</h2>
            </div>
            <div id="product_info">
                <div id="product_image">
                    <div class="slide">
                        <img src="https://github.com/HajongChan2/abandoned_dog_site/blob/main/Mind/src/main/resources/static/img/btn_arrow_left.png?raw=true" alt="left" class="prev">
                        <img src="https://github.com/HajongChan2/abandoned_dog_site/blob/main/Mind/src/main/resources/static/img/btn_arrow_right.png?raw=true" alt="right" class="next">
                        <ul class="panel">

                        </ul>
                        <ul class="dot">

                        </ul>
                     </div>
                </div>
                <div class="description">
                    <div class="description info">
                        <ul class="description_content">
                            <li>이름</li>
                            <li>가격</li>
                            <li>배송</li>
                            <li>판매자</li>
                            <li>수량</li>
                        </ul>
                        <ul class="description_content">
                            <li>${data[0].prName}</li>
                            <li>${data[0].prPrice}</li>
                            <li>${data[0].prDpay}</li>
                            <li>관리자</li>
                            <div class="count-wrap count">
                                <button type="button" class="minus">-</button>
                                <input type="text" class="inp" value="1" />
                                <button type="button" class="plus">+</button>
                            </div>
                        </ul>
                    </div>
                      
                </div>
            </div>
            `
            $("form").prepend(str);
            productImage();
            product_content(data);
            input = $(".inp");
        }
    });
    function productImage(){
        $.ajax({
            url : "/productimagelist/"+num,
            type : "POST",
            dataType : "json",
            success : function(data){
                console.log(data);
                productimage(data);
                $(".panel").append(img);
                $(".dot").append(btn);
                slide();
            }
        });
    }

    function productimage(list){

        list.map(function(product){
            img +=
                `<li><img src="${product.imgSrc}" alt="asd"></li>
            `
            btn += `
                <li>슬라이드</li>
            `
        });

    }

    function product_content(data){

        let contentHeader = `<h1>${data[0].prName}</h1>
        <h4>${data[0].prMemo}</h4>`
        let content = data[0].prContent;
        $(".product_name").append(contentHeader);
        $(".product_img").append(content);
    }



    $(document).on("click",".plus",function(){
        let plus = $(".plus");
        let pl_in = parseInt(input.val());
        if(pl_in < 99){
            input.val(pl_in + 1);
            $(".minus").removeAttr('disabled');
        }else{
            alert("더이상 추가할 수 없습니다.");
        }
        
    });
    $(document).on("click",".minus",function(){
        let minus = $(".minus");
        let pl_in = parseInt(input.val());
        if(pl_in > 1){
            input.val(pl_in - 1);
        }else{
            alert("더이상 내릴 수 없습니다.");
            minus.attr('disabled', true);
        }
    });
    $(document).on('click',"#mem_purchase", function(){
        $("form").attr("action", "/payment");
        localStorage.setItem('count',input.val());
    });
    $(document).on('click', '#non_purchase', function(){
        alert("로그인 후 이용 가능합니다.");
        $("form").attr("action", "/login");
    });

    $(document).on(".inp","propertychange change keyup paste input", function(){
        let input = $(".inp");
        let inputval = $(this).val();
        if(inputval >= 1 && inputval <= 100){
            input.val(input.val());
        }else{
            alert("이 수량은 선택할 수 없습니다.");
            input.val("1");
            input.focus();
        }
    });

    function del_btn(){
        $.ajax({
            url : "/product/delete",
            type : "POST",
            data : {num : num},
            success : function(){
                alert('삭제가 완료되었습니다.');
                location.replace("/petcesary");
            }
        });
    }
    $("#del_bt").click(function(){
        if (confirm("해당 글을 삭제하시겠습니까 ?")) {
            del_btn();
        } else {

        }
    });
    
});


// 슬라이드
function slide() {
    var wid = 0;
    var now_num = 0;
    var slide_length = 0;
    var auto = null;
    var $dotli = $('.dot>li');
    var $panel = $('.panel');
    var $panelLi = $panel.children('li');
    $(".dot li:first-child").attr('class', 'on');

    // 변수 초기화
    function init() {
        wid = $('.slide').width();
        now_num = $('.dot>li.on').index();
        slide_length = $dotli.length;
    }

    // 이벤트 묶음
    function slideEvent() {

        // 슬라이드 하단 dot버튼 클릭했을때
        $dotli.click(function() {
            now_num = $(this).index();
            slideMove();
        });

        // 이후 버튼 클릭했을때
        $('.next').click(function() {
            nextChkPlay();
        });

        // 이전 버튼 클릭했을때
        $('.prev').click(function() {
            prevChkPlay();
        });

        // 오토플레이
        autoPlay();

        // 오토플레이 멈춤
        autoPlayStop();

        // 오토플레이 재시작
        autoPlayRestart();

        // 화면크기 재설정 되었을때
        resize();
    }

    // 자동실행 함수
    function autoPlay() {
        auto = setInterval(function() {
            nextChkPlay();
        }, 4000);
    }

    // 자동실행 멈춤
    function autoPlayStop() {
        $panelLi.mouseenter(function() {
            clearInterval(auto);
        });
    }


    // 자동실행 멈췄다가 재실행
    function autoPlayRestart() {
        $panelLi.mouseleave(function() {
            auto = setInterval(function() {
                nextChkPlay();
            }, 3000);
        });
    }

    // 이전 버튼 클릭시 조건 검사후 슬라이드 무브
    function prevChkPlay() {
        if (now_num == 0) {
            now_num = slide_length - 1;
        } else {
            now_num--;
        }
        slideMove();
    }

    // 이후 버튼 클릭시 조건 검사후 슬라이드 무브
    function nextChkPlay() {
        if (now_num == slide_length - 1) {
            now_num = 0;
        } else {
            now_num++;
        }
        slideMove();
    }

    // 슬라이드 무브
    function slideMove() {
        $panel.stop().animate({
            'margin-left': -wid * now_num
        });
        $dotli.removeClass('on');
        $dotli.eq(now_num).addClass('on');
    }

    // 화면크기 조정시 화면 재설정
    function resize() {
        $(window).resize(function() {
            init();
            $panel.css({
                'margin-left': -wid * now_num
            });
        });
    }
    init();
    slideEvent();
}

