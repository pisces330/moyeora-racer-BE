const express = require('express');
const router = express.Router();
const noticeController = require('./controller');
const { asyncHandler, loginRequired } = require('../../middlewares');

router.post(
  '/',
  loginRequired,
  asyncHandler(noticeController.addNotice)
  //  #swagger.description = '공지 등록'
  //  #swagger.tags = ['notices']
  /*  #swagger.parameters[''] = {
                in: 'body',
                schema: {
                    admin_id: 'admin',
                    title: '모여라레이서 사이트 사용 안내 공지',
                    content: '모여라레이서 사이트 사용 안내 내용', 
                }
} */
);

router.get(
  '/:keyword',
  loginRequired,
  asyncHandler(noticeController.getNotices)
  //  #swagger.description = '공지 검색'
  //  #swagger.tags = ['notices']
  /*  #swagger.responses[200] = {
            description: '공지 조회 성공',
            schema: {
                data: [
                  {
                    id: '2dfa7641-5498-44cf-9c0e-b7aea36b4e3f', 
                    title: '첫번째 공지', 
                    content: '첫번째 공지 내용', 
                    createdAt: '2023-06-03T15:02:55.000Z'
                    updatedAt: '2023-06-03T15:02:55.000Z'
                    admin_id: '1c711f6d-62b2-4407-8b4d-6b9cad9950b5'
                    Admin: {
                      name : 관리자2',
                      email : admin2'
                    }
                  }
                ]
            }
  } */
);

module.exports = router;
