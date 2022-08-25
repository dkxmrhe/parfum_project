function mypage_check() {
    let uid = document.querySelector(".mypage_id");
    let pwd = document.querySelector(".mypage_pwd");
    let pwd_check = document.querySelector(".mypage_pwd2");
    let nick = document.querySelector(".mypage_nick");
    let name = document.querySelector(".mypage_name");
    let email1 = document.querySelector(".mypage_email1");
    let email2 = document.querySelector(".mypage_email2");
    let phone = document.querySelector(".mypage_phone");
    
    if(uid.value === "") {
        alert("아이디를 입력하세요.");
        uid.focus();
        return false;
    };

    if(pwd.value === "") {
        alert("비밀번호를 입력하세요.");
        pwd.focus();
        return false;
    };

    let checkpwd = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if(!checkpwd.test(pwd.value)) {
        alert("비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리로 사용해야 합니다.")
        pwd.focus();
        return false;
    };

    if(pwd_check.value !== pwd.value) {
        alert("비밀번호가 일치하지 않습니다.");
        pwd_check.focus();
        return false;
    };

    if(nick.value === "") {
        alert('닉네임을 입력하세요.');
        nick.focus();
        return false;
    };

    if(name.value == "") {
        alert("이름을 입력하세요.");
        name.focus();
        return false;
    };

    if(email1.value === "") {
        alert("이메일을 입력하세요.");
        email1.focus();
        return false;
    };

    if(email2.value === "") {
        alert('이메일을 입력하세요.');
        email2.focus();
        return false;
    };

    let num = /^[0-9]+/g;

    if(!num.test(phone.value)) {
        alert('전화번호는 숫자만 입력할 수 있습니다.');
        phone.focus();
        return false;
    };

    if(gender.value === "") {
        alert('성별을 입력하세요.');
        gender.focus();
        return false;
    };

    if(birth.value === "") {
        alert('생년월일을 입력하세요.');
        birth.focus();
        return false;
    };

    document.mypage_form.submit();
}