//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Meet Prithvi, a dynamic individual currently studying at SRM University. With a love for sports, reading, writing, and music, Prithvi is someone who enjoys exploring a diverse range of interests and hobbies.As a student at SRM University, Prithvi is likely working hard to pursue his academic goals and aspirations. However, he also knows the value of balancing work with play. Whether he's hitting the field for a game of football or basketball, diving into a good book, writing creatively, or jamming out to his favorite tunes, Prithvi makes time for the things that bring him joy and fulfillment.Overall, Prithvi is a well-rounded individual with a zest for life and a desire to make the most of his college years. His interests and passions reflect a curious and adventurous spirit, and he is sure to make an impact in whatever he sets his mind to.";
const aboutContent = "Hi, I'm Prithvi, a student currently studying at SRM University. When I'm not studying, you can often find me pursuing one of my many hobbies. I'm a big sports fan, and I love playing football and basketball whenever I get the chance. I also enjoy reading and writing, whether it's getting lost in a good novel or jotting down my thoughts in a journal. And of course, music is a big part of my life as well - I love discovering new artists and genres, and I play the guitar whenever I need to unwind.Overall, I consider myself a curious and adventurous person. I'm always seeking out new experiences and learning opportunities, both inside and outside of the classroom. I believe in the importance of balance, and I try to make time for the things that bring me joy and fulfillment. Whether it's trying a new hobby, meeting new people, or challenging myself in new ways, I'm always up for an adventure.";
const contactContent = "If you'd like to get in touch with me, there are a few ways to do so. You can reach me by email at pn7190@srmist.edu.in - I try to check my inbox regularly, so I should be able to get back to you fairly quickly. Alternatively, you can give me a call or send me a text at 9136XXXXXX. If I don't answer right away, feel free to leave a message and I'll get back to you as soon as I can.If you prefer to send mail, my address is in Mumbai, specifically Mira Road, with the zip code 401107. However, please note that email or phone is likely to be the quickest way to reach me.I'm always happy to hear from new people, whether it's to discuss a shared interest, collaborate on a project, or just say hello. So don't hesitate to reach out if you have something on your mind - I look forward to hearing from you!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
