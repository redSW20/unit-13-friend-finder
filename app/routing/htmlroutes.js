module.exports = function(app,path){
    app.get("*", function(req, res) {
        switch(req.url){
            case '/survey':
                res.sendFile(path.join(__dirname, "../public/survey.html"));
                break;
            default:
                res.sendFile(path.join(__dirname, "../public/home.html"));
        }
    });
};
