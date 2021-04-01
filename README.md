## Nodejs Express + Sequelize + Postgresql - Spatial(Postgis) #
> Sequelize 를 이용한 공간데이터 업로드 및 조회 기능

### Installation
```
git clone https://github.com/sbjang123456/nodejs-sequelize-spatial.git
cd nodejs-sequelize-spatial
npm install
```

## Config
### 구동 모드에 따른 DB 접속 정보 yaml 파일을 생성
```
# config/config.yaml
development:
  comm:
    nodePort: 3010
  db:
    database: 데이터베이스
    username: 유저명
    password: 패스워드
    host: host
    port: port
    dialect: postgres
    operatorAliases: false
    quoteIdentifiers: false
    timezone: "+09:00"
    logQueryParameters: false
    logging: true

production:
  comm:
    nodePort: 3011
  db:
    database: 데이터베이스
    username: 유저명
    password: 패스워드
    host: host
    port: port
    dialect: postgres
    operatorAliases: false
    quoteIdentifiers: false
    timezone: "+09:00"
    logQueryParameters: false
    logging: true
```

### Development
```
npm start
```