function parfum_check() {
    let photo = document.querySelector('.writePhoto');
    let brname = document.querySelector('.writeBrandName');
    let name = document.querySelector('.writeParfumName');
    let component = document.querySelector('.writeParfumComponent');
    
    if(photo.value === "") {
        alert("사진을 등록하세요.");
        photo.focus();
        return false;
    };

    if(brname.value === "") {
        alert("브랜드이름 입력하세요.");
        brname.focus();
        return false;
    };
    
    if(name.value === "") {
        alert("향수 이름을 입력하세요.");
        name.focus();
        return false;
    };

    if(component.value === "") {
        alert("성분을 입력하세요.");
        component.focus();
        return false;
    };

    document.parfum_form.submit();
}