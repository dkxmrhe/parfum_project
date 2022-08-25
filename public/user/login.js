function login_check() {
    let uid = document.querySelector(".login_id");
    let pwd = document.querySelector(".login_pwd");

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
    
    document.login_form.submit();
}