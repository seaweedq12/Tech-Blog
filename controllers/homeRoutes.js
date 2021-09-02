const router = require('express').Router();
const { Blog , User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

router.get('/dashboard/:id', withAuth , async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id,{
      include: [
        {
          model: Blog,
          attributes: [
            'id',
            'name',
          ],
        },
      ],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('dashboard', { 
      user, 
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/createblog', withAuth , (req, res) => {
  res.render('create',{ 
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
  });
});

router.get('/editblog/:id', withAuth , async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id,{});

    const blog = blogData.get({ plain: true });
    
    res.render('edit', { 
      ...blog , 
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
