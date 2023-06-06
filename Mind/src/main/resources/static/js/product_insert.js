let count = 0;
let imgs = [];

function readURL(obj) {
    let reader = new FileReader();
    if(!obj.files.length) {
        return;
    }
    reader.readAsDataURL(obj.files[0]);
    reader.onload = function (e) {
        let img = $('<img />');
        $(img).attr('src', e.target.result);
        $(img).addClass("imgs");
        $('#photo_sign_up').prepend(img);
        imgs.push(e.target.result);
    }
    count++;
    console.log(imgs);
}

function productcontent(obj) {
    let reader = new FileReader();
    if(!obj.files.length) {
        return;
    }
    reader.readAsDataURL(obj.files[0]);
    reader.onload = function (e) {
        let img = $('<img />');
        $(img).attr('src', e.target.result);
        $('.content').append(img);
    }
}

$(document).ready(function(){
    $("#imageFile").on("change",function(){
        if(count < 3){
            readURL(this);
        }else{
            alert("3장 이상은 선택할 수 없습니다.");
            $("#image_plus").css('display', 'none');
        }
    });
    $(document).on("click",".imgs",function(e) {
        this.remove();
        count -= 1;
        let b = $(this).attr("src");
        for(let i = 0; i < imgs.length; i++){
            if(imgs[i] == b){
                imgs.splice(i, 1);
            }
        }
        console.log(imgs);



        $("#image_plus").css('display', 'inline-block');
    });

    $('#text_box').keyup(function () {
        let content = $(this).val();

        // 글자수 세기
        if (content.length == 0 || content == '') {
            $('.textCount').text('0자');
        } else {
            $('.textCount').text(content.length);
        }

        // 글자수 제한
        if (content.length > 500) {
            $(this).val($(this).val().substring(0, 500));
            $('.textCount').text(500);
            alert('글자수는 500자까지 입력 가능합니다.');
        };
    });

    $(".register_button").click(function(){
        let name = $("#title").val();
        let price = $("#price").val();
        let dpay = $("#dpay").val();
        let seller = $("#register").val();
        let count = $("#count").val();
        let memo = $("#memo").val();
        let type = $("#type option:selected").val();
        let content = $(".content").html();
        console.log(content);
        const product_data = {
            imgs : imgs,
            name : name,
            price : price,
            dpay : dpay,
            seller : seller,
            count : count,
            memo : memo,
            type : type,
            content : content
        }
        $.ajax({
            type : "POST",
            url : "/product/insert",
            data : product_data,
            success : function (data){
                location.replace("/petcesary");
            }
        });
    });

});

