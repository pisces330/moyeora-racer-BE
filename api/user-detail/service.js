const UserDetail = require('./model');
const Board = require('../board/model');
const db = require('../../models');
const User = require('../user/model');
const { NotFoundException } = require('../../middlewares');

module.exports = {
  /**
   * 프로필 조회
   */
  async getProfile(userId) {
    const user = await User.findOne({
      include: [
        {
          model: UserDetail,
          attributes: [
            'img_path',
            'comment',
            'position',
            'generation',
            'profile_public',
          ],
        },
      ],
      where: { id: userId },
      attributes: ['name'],
    });

    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }
    console.log(user);
    return user;
  },

  /**
   * 이름, 직함, 소개, 사진 수정
   */
  async setProfile(
    userId,
    userName,
    userImg,
    position,
    intro,
    phase,
    track,
    profile_public
  ) {
    const user = await UserDetail.findOne({ where: { user_id: userId } });
    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }
    const generation = track + ' ' + phase;

    // 유저 테이블 name 변경
    const updateName = await User.update(
      { name: userName },
      { where: { id: userId } }
    );

    const updateProfile = await UserDetail.update(
      {
        position: position,
        comment: intro,
        img_path: userImg,
        generation: generation,
        profile_public: profile_public,
      },
      { where: { user_id: userId } }
    );
    if (!updateProfile || !updateName) {
      return;
    }

    return updateProfile;
  },

  /**
   * 내가 쓴 글 조회(서비스)
   */
  async getMyBoard(userId) {
    const myBoard = await Board.findAll(
      { where: { writer: userId } },
      { order: [['createdAt', 'DESC']] }
    );

    const comment_cnt = await Promise.all(
      myBoard.map((board) =>
        db.Comment.count({ where: { board_id: board.id } })
      )
    );
    console.log(comment_cnt);
    const like_cnt = await Promise.all(
      myBoard.map((board) => db.Like.count({ where: { board_id: board.id } }))
    );

    return myBoard.map((board, idx) => {
      const additionalData = {
        comment_cnt: comment_cnt[idx],
        like_cnt: like_cnt[idx],
      };

      return Object.assign({}, board.dataValues, additionalData);
    });
  },

  /**
   * 오픈 프로필 조회
   */
  async getOpenProfiles() {
    const userDetails = await UserDetail.findAll({
      where: { profile_public: 1 },
      attributes: ['user_id'],
    });

    const careers = await Promise.all(
      userDetails.map((user) =>
        db.Career.findAll({
          where: { user_id: user.user_id },
          attributes: ['company_name', 'position', 'hire_date', 'resign_date'],
        })
      )
    );

    const careersFormatted = careers.map((career) => {
      const hireDate = new Date(career.hire_date);
      const resignDate = new Date(career.resign_date)
        ? new Date(career.resign_date)
        : null;

      // hire_date와 resign_date가 존재하면 개월 수 계산
      const totalMonths = resignDate
        ? (resignDate.getFullYear() - hireDate.getFullYear()) * 12 +
          (resignDate.getMonth() - hireDate.getMonth())
        : null;

      // totalMonths로 년, 월 계산
      const years = totalMonths ? Math.floor(totalMonths / 12) : null;
      const remainingMonths = totalMonths ? totalMonths % 12 : null;

      // 근무 년,월
      let totalDate = '';
      if (years > 0) {
        totalDate += `${years}년`;
      }
      if (remainingMonths > 0) {
        totalDate += ` ${remainingMonths}개월`;
      }

      // hire_date와 resign_date 제외
      const { hire_date, resign_date, ...rest } = career;

      return {
        ...rest,
        totalWorkingDate: totalMonths ? totalDate : '재직중', //총 개월 수가 null일시, '재직중'으로 표시.
      };
    });
    const detailCareer = careersFormatted.map(({ ...rest }) => rest);

    const names = await Promise.all(
      userDetails.map((user) =>
        db.User.findOne({
          where: { id: user.user_id },
          attributes: ['name'],
        })
      )
    );
    const skills = await Promise.all(
      userDetails.map((user) =>
        db.sequelize.models.user_skills.findAll({
          where: { user_id: user.user_id },
          attributes: ['SkillId'],
        })
      )
    );

    const skills_name = await Promise.all(
      skills.map((skills) =>
        Promise.all(
          skills.map((skill) =>
            db.Skill.findOne({
              where: { id: skill.dataValues.SkillId },
              attributes: ['name'],
            })
          )
        )
      )
    );
    return userDetails.map((board, idx) => {
      const additionalData = {
        user_careers: detailCareer[idx],
        user: names[idx],
        user_skills: skills_name[idx],
      };

      return Object.assign({}, board.dataValues, additionalData);
    });
  },
};
