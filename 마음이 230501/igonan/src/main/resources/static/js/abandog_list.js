$(document).ready(function(){

    $(".abandoned_dog-text p").on('click',function(e){
        let na = $(e.target);
        let a = na.text();
        console.log(a);
    });
});