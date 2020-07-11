const express = require('express');
const app = express();
const fs = require('fs');
const { text } = require('express');


function getBlogPosts() {
    let text = fs.readFileSync('database.json');
    return JSON.parse(text);
}

function savePost(posts){
    let text = JSON.stringify(posts);
    fs.writeFileSync('database.json', text);
}






// GET ALL THE POSTS
app.get("/blogposts", function (req, res) {
    let blogPosts = getBlogPosts();
    return res.json(blogPosts);
});

// GET POST BY ID
app.get("/posts/:postsById", function (req, res) {
    let postId = parseInt(req.params.postId);
    let data = getBlogPosts().filter(post => post.id === postId);
    res.json(data[0]);
});

// POST
app.use(express.urlencoded);
app.use(express.json());

app.post("/post", function (req, res) {
    let newPost = req.body;
    let posts = getBlogPosts();
    newPost.id = posts.lenght + 1;
    posts.push(newPost);
    savePost(posts);
    return res.json(newPost);
});

// PUT THE ID IN THE URL
app.put("/post/:id", function (req, res) {
    let newPostData = req.body;
    let postId = parseInt(req.params.id);
    let newJson = getBlogPosts.filter((post) => postId !== post.id);
    newJson.push(newPostData);
    savePost(newJson);
    return res.json(newPostData);
});

// DELETE
app.delete("/post/:postId", function (req, res) {
    let postId = parseInt(req.params.postId);
    let posts = getBlogPosts();
    let differentPosts = posts.filter(post => post.id === postId);
    savePost(differentPosts);

    return res.json(postId);
});




app.listen(3000, function () {
    console.log('Server is listening on port 3000. Ready to accept requests!');
});