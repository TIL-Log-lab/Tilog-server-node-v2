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
```
