# Migrations History

마이그레이션 내역을 기록하는 문서입니다
기록은 시간 순으로 나열하고 [다음 양식](https://github.com/TIL-Log-lab/Tilog-server-node-v2/discussions/4#discussioncomment-2568167)을 준수합니다

---

## 1.초기 마이그레이션 구성

> Migration filename : `20220410153137_init`  
> Pull Request : [Link](https://github.com/TIL-Log-lab/Tilog-server-node-v2/pull/6)

### Detail

- 레거시 데이터베이스를 Prisma로 마이그레이션 하기위해 초기 파일을 구성했습니다

---

## 2.사용하지 않는 테이블 삭제

> Migration filename : `20220411143849_delete_table`  
> Pull Request : [Link](https://github.com/TIL-Log-lab/Tilog-server-node-v2/pull/14)

### Detail

1. pinnedRepositories 테이블 삭제
2. pinnedRepositoryCategories 테이블 삭제
3. postsTags 테이블 삭제
4. tags 테이블 삭제
5. userblogCustomization 테이블 삭제
6. 연관된 FK 해제

---

## 3.users 테이블 불필요한 컬럼 삭제

> Migration filename : `20220411145117_delete_users_column`  
> Pull Request : [Link](https://github.com/TIL-Log-lab/Tilog-server-node-v2/pull/14)

### Detail

1. admin 컬럼 삭제
2. oAuthType 컬럼 삭제
3. password 컬럼 삭제
4. refreshToken 컬럼 삭제

---

## 4.comments 테이블 불필요한 컬럼 삭제

> Migration filename : `20220411145851_delete_comments_reply_level`  
> Pull Request : [Link](https://github.com/TIL-Log-lab/Tilog-server-node-v2/pull/14)

### Detail

1. replyLevel 컬럼 삭제

---

## 5.리프레시 토큰 관리를 위한 usersAuth 테이블 생성

> Migration filename : `20220412152427_create_users_auth_table`  
> Pull Request : [Link](https://github.com/TIL-Log-lab/Tilog-server-node-v2/pull/19)

### Detail

1. usersAuth 테이블 생성
   refreshToken, userId, userIp, userAgent, lastUseAt, expireAt 컬럼으로 구성

## 6.Oauth 처리를 위한 users 테이블 컬럼 추가

> Migration filename : `20220412154059_add_users_columns`  
> Pull Request : [Link](https://github.com/TIL-Log-lab/Tilog-server-node-v2/pull/19)

### Detail

1. provider 컬럼 추가
2. providerServiceId 컬럼 추가

- 기존 OauthType 컬럼을 대체하기 위해 provider를 생성 했습니다
- 기존 OauthServiceId 컬럼을 대체하기 위해 providerServiceId를 생성 했습니다

## 7.users 테이블 oAuthServiceID -> providerServiceId 데이터 이동

> Migration filename : `20220413050210_copy_users_provider_server_id`  
> Pull Request : [Link](https://github.com/TIL-Log-lab/Tilog-server-node-v2/pull/19)

### Detail

1. `providerServiceId` = `oAuthServiceID`
   컬럼명 변경을 위해 기존 `oAuthServiceID` 데이터를 `providerServiceId`로 이동했습니다

## 8.데이터 이동이 끝난 users.oAuthServiceID 컬럼 삭제

> Migration filename : `20220413062222_delete_users_column_o_auth_service_id`  
> Pull Request : [Link](https://github.com/TIL-Log-lab/Tilog-server-node-v2/pull/19)

### Detail

- 이전 마이그레이션에서 데이터 이동을 마친 후 oAuthServiceID 컬럼을 삭제했습니다

## 9.Posts.createdDay 컬럼 추가

> Migration filename : `20220418034331_add_posts_columns`  
> Pull Request : [Link](https://github.com/TIL-Log-lab/Tilog-server-node-v2/pull/32)

### Detail

- `createdDay` 컬럼을 생성하고 `createdAt` 데이터를 Sync 했습니다

## 10. Comments.content 컬럼 추가

> Migration filename : `20220420110539_add_comments_columns`  
> Pull Request : [Link](https://github.com/TIL-Log-lab/Tilog-server-node-v2/pull/40)

### Detail

- 기존 `htmlContent` 컬럼을 대체하기 위해 `content` 컬럼을 생성했습니다.

## 11. Comments 테이블 htmlContent -> content 데이터 이동

> Migration filename : `20220420110759_copy_comments_content`  
> Pull Request : [Link](https://github.com/TIL-Log-lab/Tilog-server-node-v2/pull/40)

### Detail

- `content` = `htmlContent`
- 컬럼명 변경을 위해 기존 `htmlContent` 데이터를 `content`로 이동했습니다

## 12. 데이터 이동이 끝난 Comments 테이블의 htmlContent 컬럼 삭제

> Migration filename : `20220420110926_delete_comments_column_html_content`  
> Pull Request : [Link](https://github.com/TIL-Log-lab/Tilog-server-node-v2/pull/40)

### Detail

- 이전 마이그레이션에서 데이터 이동을 마친 후 htmlContent 컬럼을 삭제했습니다
