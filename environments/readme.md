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
SERVER_PORT=80

# Oauth Settings
OAUTH_GITHUB_CLIENT_ID=
OAUTH_GITHUB_CLIENT_SECRET=
OAUTH_GITHUB_CALLBACK_URL=http://localhost/auth/github/callback

# Access Token Settings
JWT_SECRET_KEY=1q2w3e4r
JWT_EXPIRES_IN=30m

# Refresh Token Settings
JWT_REFRESH_SECRET_KEY=1q2w3e4r
JWT_REFRESH_EXPIRES_IN=7d

# Refresh Token Cookie Settings
REFRESH_COOKIE_HTTP_ONLY=true
REFRESH_COOKIE_SECURE=true
REFRESH_COOKIE_PATH=/
REFRESH_COOKIE_SAME_SITE=none
```

## validation

.env 파일은 `/environments/validationSchema.ts` 에서 데이터를 검증합니다
