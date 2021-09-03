const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');
const getdate = require('../../utils/date');

const date = getdate();


router.post('/', withAuth , async (req, res) => {
  try {
    const newBlog = await Comments.create({
      ...req.body,
      date: date,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;