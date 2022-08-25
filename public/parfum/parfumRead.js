function boardWri_check() {
    let comment = document.querySelector(".comment_content");

    if(comment.value === "") {
        alert("댓글 내용을 입력하세요.");
        comment.focus();
        return false;
    }

    document.comment_form.submit();
}