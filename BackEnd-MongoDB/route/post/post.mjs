import express from 'express'
import { postmodel } from '../../models/post/post.mjs'
import { isValidObjectId } from "mongoose"

const router = express.Router()

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
      description: req.body.description
    })

    return res.send({
      message: "Post created Successfuly"
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "internal server error"
    })
  }
})

router.get('/post', async (req, res, next) => {
  try {

    
    // console.log("Current User Login API...." , req.currentUser)

    const allpost = await postmodel.find()

    return res.send({
      message: "Post Fatched Successfuly",
      data: allpost
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "internal server error"
    })
  }
})

router.get('/post/:postId', async (req, res, next) => {
  try {

    const postId = req.params.postId

    if (!postId) {
      return res.status(400).send({
        message: "postId is required"
      })
    }

    if (!isValidObjectId(postId)) {
      return res.status(400).send({
        message: "id is invalid"
      })
    }

    const singlePost = await postmodel.findById(postId)

    if (!singlePost) {
      return res.status(404).send({
        message: "Post Not Found"
      })
    }

    return res.send({
      message: "singlePost Fatched Successfuly",
      data: singlePost
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "internal server error"
    })
  }
})

router.put('/post/:postId', async (req, res, next) => {
  try {

    const postId = req.params.postId

    if (!postId) {
      return res.status(400).send({
        message: "PostId Is Required"
      })
    }

    const updatedPost = await postmodel.findByIdAndUpdate({ _id: postId }, {
      $set: {
      title: req.body.title,
      description: req.body.description,
    }
    })

if (!updatedPost) {
  return res.status(404).send({
    message: "Post Not Found"
  })
}

return res.send({
  message: "Post Edit Successfuly",
  data: updatedPost
})
  } catch (error) {
  console.error(error)
  return res.status(500).send({
    message: "internal server error"
  })
}
})

router.delete('/post/:postId', async (req, res, next) => {
  try {

    const postId = req.params.postId

    if (!postId) {
      return res.status(400).send({
        message: "id is required"
      })
    }

    if (!isValidObjectId(postId)) {
      return res.status(400).send({
        message: "id is invalid"
      })
    }

    const deletedPost = await postmodel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).send({
        message: "Post not found"
      });
    }

    return res.send({
      message: "single post deleted successfully",
      data: deletedPost
    });

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "internal server error"
    })
  }
})

export default router