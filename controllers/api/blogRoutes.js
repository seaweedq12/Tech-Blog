const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');
const getdate = require('../../utils/date');

const date = getdate();

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      date: date,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateBlog = await Blog.update({
        ...req.body,
        date: date,
      },
      {
      where: {
        id: req.params.id,
      },
    });
    
    res.status(200).json(updateBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteBlog = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(deleteBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
