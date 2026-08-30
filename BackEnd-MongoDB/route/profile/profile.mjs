import express from 'express'
import { UserModel } from '../../models/user/index.mjs'
import bcrypt from 'bcryptjs'

const router = express.Router()

router.get('/profile', async (req, res, next) => {
  try {

    return res.send({
      message: 'Profile Fetched',
      data: req.currentUser
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "internal server error"
    })
  }
})

router.put('/profile', async (req, res, next) => {
  try {
    const firstname = req.body.firstname
    const lastname = req.body.lastname

    const user = await UserModel.findOne({ _id: req.currentUser._id })

    if (!user) {
      return res.status(404).send({
        message: 'Acount not found'
      })
    }

    if (firstname) {
      user.firstname = firstname
    }

    if (lastname) {
      user.lastname = lastname
    }

    await user.save()

    return res.send({
      message: 'Update Profile'
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      message: "internal server error"
    })
  }
})
router.put('/password', async (req, res, next) => {
  try {
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    const iscurrentpasswordTrue = await bcrypt.compare(currentPassword, req.currentUser.password);

    if (!iscurrentpasswordTrue) {
      return res.status(400).send({
        message: 'password is invalid'
      });
    }

    const newpasswordhash = await bcrypt.hash(newPassword, 12);

    await UserModel.findByIdAndUpdate({ _id: req.currentUser._id }, {
      $set: {
        password: newpasswordhash
      }
    });

    return res.send({
      message: 'Update Password Successfully'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "internal server error"
    });
  }
});

export default router;
