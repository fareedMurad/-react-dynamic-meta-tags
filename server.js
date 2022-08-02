const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 5000;

const app = express();

const posts = [
    {
        title: "Post #1",
        description: "This is the first post",
        thumbnail: "https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
    },
    {
        title: "Post #2",
        description: "This is the second post",
        thumbnail: "https://images.unsplash.com/photo-1625034712314-7bd692b60ecb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    },
    {
        title: "Post #3",
        description: "This is the third post",
        thumbnail: "https://images.unsplash.com/photo-1625034892070-6a3cc12edb42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=766&q=80"
    }
]

app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, "./build", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return console.log(err);
        }

        const postId = req.query.id;
        const post = postId ? posts[postId] : posts[0];
        if (!post) return res.status(404).send("Post not found");

        data = data
            .replace(/__TITLE__/g, post.title)
            .replace(/__DESCRIPTION__/g, post.description);

        res.send(data)
    });
});

app.use(express.static(path.resolve(__dirname, "./build")))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
