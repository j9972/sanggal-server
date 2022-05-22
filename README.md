# sanggal-server

처음으로 짧은 시간안에 각자 server - client로 나눠서 만들고 배포해본 사이트
https://brave-snyder-75a495.netlify.app/


상주 갤러리
간단하게 만들어본 게시판으로 익명으로 글과 댓글을 다는 갤러리를 따라서 만들어 보았습니다

- Mysql & sequelize 를 사용해 sql query 문 없이 데이터 베이스 처리 & N : M 관계 사용
- Express의 다양한 모듈을 통해 이메일 형식 체크 등의 다양한 방법 사용
- .env , token을 사용한 보안 강화
- accessToken, refreshToken을 통한 JWT 매커니즘 사용 ( Expires를 두어 refresh 를 통한 accessToken 재발급 )
- accessToken에 관한 middelware사용으로 authorization 활용
