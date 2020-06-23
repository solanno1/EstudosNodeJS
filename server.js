const express = require('express')
const nunjucks = require('nunjucks')
const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://avatars3.githubusercontent.com/u/21224546?s=460&u=f6f93027fb8ff9bfee5c3c14883082a874fc68ef&v=4",
        name: "Solano Oliveira",
        role: "Developer",
        description: 'Estudando desenvolvimento web <a href="https://https://www.javascript.com/" target="_blank">Javascript</a>',
        links: [
            { name: "Github", url: "https://github.com/solanno1"},
            { name: "Facebook", url: "https://facebook.com/solanno.oliveira"},
            { name: "LinkedIn", url: "https://linkedin.com/in/solano-oliveira-998bb7130/"}
        ]
    }
    return res.render("about", {about})
})

server.get("/portfolio", function(req, res){
    return res.render("portfolio", {items: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id
    const video = videos.find(function(video){
        return video.id == id                        
    })

    if(!video){
        return res.status(404).render("not-found");
    }

    return res.render("video", {item: video})
    

    
})

server.listen(5000, function(){
    console.log("server is running")
})

server.use(function(req, res) {
    res.status(404).render("not-found");
  });