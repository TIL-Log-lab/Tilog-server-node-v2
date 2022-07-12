# Environments

## file name

`.local.env` -> Local Environment  
`prod.env` -> Product Environment  
위 이름을 가진 환경설정 파일을 /environments 에 생성합니다.  
Create a configuration file in /environments with the name.

## .env

아래 환경설정값을 포함합니다  
Configure the .env file

```
# prisma Database connection URL
# Document: https://www.prisma.io/docs/reference/database-reference/connection-urls
DATABASE_URL="mysql://root:root@localhost:3306/Tilog?connect_timeout=100&pool_timeout=100&socket_timeout=100"

# server Port
# 서버 기본 설정
SERVER_PORT=80

# Oauth Settings
# Github Oauth 설정
OAUTH_GITHUB_CLIENT_ID=
OAUTH_GITHUB_CLIENT_SECRET=
OAUTH_GITHUB_CALLBACK_URL=http://localhost/auth/github/callback

# Access Token Settings
# 액세스 토큰 설정
JWT_SECRET_KEY=1q2w3e4r
JWT_EXPIRES_IN=30m

# Refresh Token Settings
# 리프레시 토큰 설정
JWT_REFRESH_SECRET_KEY=1q2w3e4r
JWT_REFRESH_EXPIRES_IN=1h

# Refresh Token Cookie Settings
# 리프레시 토큰 쿠키 설정
REFRESH_COOKIE_HTTP_ONLY=true
REFRESH_COOKIE_SECURE=true
REFRESH_COOKIE_PATH=/
REFRESH_COOKIE_SAME_SITE=none
REFRESH_COOKIE_DOMAIN=.localhost
REFRESH_COOKIE_MAX_AGE=3600

# CORS
# 교차 출처 리소스 공유 설정
# 쿠키를 사용하기 때문에 * 와일드 카드는 사용할 수 없습니다
# ','으로 각 옵션을 구분합니다
CORS_ORIGIN=http://localhost,http://127.0.0.1
CORS_METHOD=GET,HEAD,PUT,PATCH,POST,DELETE
CORS_CREDENTIALS=true

# AWS 구성
# S3
AWS_S3_BUCKET_NAME=
AWS_S3_ACCESS_KEY=
AWS_S3_KEY_SECRET=
```

## validation

.env 파일은 `/environments/validationSchema.ts` 에서 데이터를 검증합니다
