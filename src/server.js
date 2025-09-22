require("dotenv").config();
const { prisma } = require("./middleware/db");
const app = require("./middleware/app");
const port = process.env.PORT;

// Post a new blog
app.post("/new", async (req, res) => {
  try {
    const { content, title, category, tags } = req.body;
    const newpost = await prisma.post.create({
      data: {
        content,
        title,
        category,
        tags,
      },
    });
    res
      .status(201)
      .json({ message: "successfully created a new post", post: newpost });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const getAllPosts = await prisma.post.findMany();
    if (getAllPosts.length > 0) {
      res.status(200).json({
        message: "succesfully retrieved all posts",
        posts: getAllPosts,
      });
    } else {
      res.status(200).json({ message: "you have not posted anything yet!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get a single post
app.get("/singlepost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getPost = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (getPost) {
      res.status(200).json({ post: getPost });
    } else {
      res.status(404).json({ message: "resources does not exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Update a single post
app.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { content, title, category, tags } = req.body;
    const updatepost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        content,
        title,
        category,
        tags,
      },
    });

    res.status(200).json({ message: "post updated", post: updatepost });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      res
        .status(404)
        .json({ message: "Resource does not exist or cannot be updated" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// delete a single
app.delete("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletePost = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    res
      .status(200)
      .json({ message: "post successfully deleted", post: deletePost });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      res
        .status(404)
        .json({ message: "Resource does not exist or cannot be updated" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

app.listen(port, () => {
  console.log(` app listening on localhost:${port}`);
});
