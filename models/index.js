const User = require('./user');
const Blog = require('./blog');
const Comments = require('./comments');

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Blog.hasMany(Comments, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

Comments.belongsTo(User, {
  foreignKey: 'user_id'
});

Comments.belongsTo(Blog, {
  foreignKey: 'blog_id'
});

module.exports = { User, Blog, Comments };
