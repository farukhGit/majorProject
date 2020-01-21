module.exports.home = function(req, res){
    return res.render('home', {
        title : 'Home'
    });
}

module.exports.signUp = function(req, res){
    return res.render('_signup', {
        title : 'LOGO | Sign Up'
    })
}

module.exports.signIn = function(req, res){
    return res.render('_signin', {
        title : 'LOGO | Sign In'
    })
}