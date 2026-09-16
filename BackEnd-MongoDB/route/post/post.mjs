import express from 'express'
import { postmodel } from '../../models/post/post.mjs'
import { isValidObjectId } from "mongoose"

const router = express.Router()

// CREATE POST
router.post('/post', async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({
        message: "Title is required"
      })
    }

    if (!req.body.description) {
      return res.status(400).send({
        message: "Description is required"
      })
    }

    await postmodel.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.currentUser._id
    })

    return res.send({
      message: "Post created Successfully"
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "Internal server error"
    })
  }
})

// GET ALL POSTS
router.get('/post', async (req, res, next) => {
  try {
    const allpost = await postmodel.find().populate("userId")

    return res.send({
      message: "Posts Fetched Successfully",
      data: allpost
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "Internal server error"
    })
  }
})

// GET SINGLE POST
router.get('/post/:postId', async (req, res, next) => {
  try {
    const postId = req.params.postId

    if (!postId || !isValidObjectId(postId)) {
      return res.status(400).send({
        message: "Valid postId is required"
      })
    }

    const singlePost = await postmodel.findById(postId).populate("userId")

    if (!singlePost) {
      return res.status(404).send({
        message: "Post Not Found"
      })
    }

    return res.send({
      message: "Single Post Fetched Successfully",
      data: singlePost
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "Internal server error"
    })
  }
})

// UPDATE POST 
router.put('/post/:postId', async (req, res, next) => {
  try {
    const postId = req.params.postId

    if (!postId || !isValidObjectId(postId)) {
      return res.status(400).send({
        message: "Valid PostId Is Required"
      })
    }

    // 1. Pehle Post dhoondo
    const post = await postmodel.findById(postId)

    if (!post) {
      return res.status(404).send({
        message: "Post Not Found"
      })
    }

    // 2. Authorization check (Pehle check karein phir update karein)
    const postOwnerId = post.userId?._id?.toString() || post.userId?.toString();
    const currentUserId = req.currentUser?._id?.toString() || req.currentUser?.id?.toString();

    if (postOwnerId !== currentUserId) {
      return res.status(403).send({
        message: "You are not authorized to update this post"
      })
    }

    // 3. Post Update karein
    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    const updatedPost = await post.save();

    return res.send({
      message: "Post Edited Successfully",
      data: updatedPost
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "Internal server error"
    })
  }
})

// DELETE POST 
router.delete('/post/:postId', async (req, res, next) => {
  try {
    const postId = req.params.postId

    if (!postId || !isValidObjectId(postId)) {
      return res.status(400).send({
        message: "Valid Id is required"
      })
    }

    // 1. Pehle post check karein
    const post = await postmodel.findById(postId)

    if (!post) {
      return res.status(404).send({
        message: "Post not found"
      });
    }

    // 2. Authorization Check
    const postOwnerId = post.userId?._id?.toString() || post.userId?.toString();
    const currentUserId = req.currentUser?._id?.toString() || req.currentUser?.id?.toString();

    if (postOwnerId !== currentUserId) {
      return res.status(403).send({
        message: "You are not authorized to delete this post"
      })
    }

    // 3. Delete karein
    await postmodel.findByIdAndDelete(postId);

    return res.send({
      message: "Single post deleted successfully",
      data: post
    });

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "Internal server error"
    })
  }
})

export default router