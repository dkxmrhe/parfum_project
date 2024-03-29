exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        //res.write("<script charset=\"utf-8\">alert('로그인이 필요합니다.');</script>");
        res.send("<script> alert('로그인이 필요합니다.'); window.location=\'/login\'; </script>");
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};