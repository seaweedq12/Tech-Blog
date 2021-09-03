const sequelize = require('../config/connection');
const { User, Blog, Comments } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blog = await Blog.bulkCreate(blogData);
  
  const comment = await Comments.bulkCreate(commentData);
  
  process.exit(0);
};

seedDatabase();
