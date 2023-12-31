const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const Board = require('./api/board/model');
const Hashtag = require('./api/hashtag/model');

const Quiz = require('./api/quiz/model');
const Skill = require('./api/skill/model');

const Admin = require('./api/admin/model');
const User = require('./api/user/model');
const UserDetail = require('./api/user-detail/model');
const Career = require('./api/career/model');
const { Plan, PlanLink } = require('./api/plan/model');
const Notice = require('./api/notice/model');
const Photo = require('./api/photo/model');
const Comment = require('./api/comment/model');
const Generation = require('./api/generation/model');
const Report = require('./api/report/model');
const Like = require('./api/like/model');
const Alert = require('./api/alert/model');
const Education = require('./api/education/model');
const Coffeechat = require('./api/coffeechat/model');
const Link = require('./api/link/model');

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Admin = Admin;
db.User = User;
db.UserDetail = UserDetail;
db.Quiz = Quiz;
db.Skill = Skill;
db.Plan = Plan;
db.PlanLink = PlanLink;
db.Notice = Notice;
db.Board = Board;
db.Hashtag = Hashtag;
db.Photo = Photo;
db.Comment = Comment;
db.Generation = Generation;
db.Report = Report;
db.Like = Like;
db.Career = Career;
db.Alert = Alert;
db.Education = Education;
db.Coffeechat = Coffeechat;
db.Link = Link;

Board.initiate(sequelize);
Hashtag.initiate(sequelize);
Admin.initiate(sequelize);
User.initiate(sequelize);
UserDetail.initiate(sequelize);
Quiz.initiate(sequelize);
Skill.initiate(sequelize);
Plan.initiate(sequelize);
PlanLink.initiate(sequelize);
Notice.initiate(sequelize);
Photo.initiate(sequelize);
Comment.initiate(sequelize);
Generation.initiate(sequelize);
Report.initiate(sequelize);
Like.initiate(sequelize);
Career.initiate(sequelize);
Alert.initiate(sequelize);
Education.initiate(sequelize);
Coffeechat.initiate(sequelize);
Link.initiate(sequelize);

Board.associate(db);
User.associate(db);
Hashtag.associate(db);
Admin.associate(db);
UserDetail.associate(db);
Plan.associate(db);
PlanLink.associate(db);
Notice.associate(db);
Photo.associate(db);
Comment.associate(db);
Generation.associate(db);
Report.associate(db);
Like.associate(db);
Career.associate(db);
Alert.associate(db);
Education.associate(db);
Coffeechat.associate(db);
Link.associate(db);

module.exports = db;
