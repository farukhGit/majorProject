module.exports.home = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/user_home');
    }

    return res.render('welcome_page', {
        title : 'Social Media Website'
    });
}


