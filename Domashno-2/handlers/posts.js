const validateSchema  = require("../helper/validateSchema");
const { remove } = require("../models/blogs");
const { getSingle } = require("../models/blogs");
const { create, getAll, update } = require("../models/blogs");
const { BlogCreate, BlogUpdate } = require("../models/blogs/validate");

const getAllPosts = async (req, res) => {
    try {
        const data = await getAll(req.auth.id);
        return res.status(200).send(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error!");
    }
};

const createPost = async (req, res) => {
    try {
        const data = {
            ...req.body,
            user_id: req.auth.id,
        };

        await validateSchema(data, BlogCreate);
        const newPost = await create(data);

        return res.status(200).send(newPost);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error!");
    }
};

const updatePost = async (req, res) => {
    try {
        const data = {
            ...req.body,
            user_id: req.auth.id,
        };

        await validateSchema(data, BlogUpdate);

        const checkPost = await getSingle(req.params.id);
        if (!checkPost) {
            return res.status(400).send("Post not found!");
        }

        console.log("check user", checkPost.user_id);
        console.log("auth id", req.auth.id);

        if (checkPost.user_id.toString() !== req.auth.id.toString()) {
            return res.status(400).send("User is not owner of this post!");
        }

        const updatedPost = await update(req.params.id, data);
        return res.status(200).send(updatedPost);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error!");
    }
};

const removePost = async (req, res) => {
    try {
        const checkPost = await getSingle(req.params.id);

        if (!checkPost) {
            return res.status(400).send("Post not found!");
        }

        if (checkPost.user_id.toString() !== req.auth.id.toString()) {
            return res.status(400).send("User is not owner of this post!");
        }

        const removedPost = await remove(req.params.id);
        return res.status(200).send(removedPost);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error!");
    }
};

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    removePost,
};