let regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/; // 휴대폰 번호 검사 



$("#btn").on('click', function(){
    if(!regExp){
        console.log(regExp);
        return false;
    }
    console.log(regExp);
});