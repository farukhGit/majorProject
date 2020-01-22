module.exports.home = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('welcome_page', {
        title : 'Social Media Website'
    });
}


