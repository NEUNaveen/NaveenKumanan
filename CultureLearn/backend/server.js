const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/culture-learn', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes Example
app.get('/', (req, res) => {
    res.send('Hello MEAN Stack!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const Product = require('./models/Product');

// Get all products
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Add a new product
app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
});

const User = require('./models/User');

// Get all users
app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Add a new user
app.post('/api/users', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
});

const Post = require('./models/Post');

// Get all posts
app.get('/api/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

// Add a new post
app.post('/api/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
});