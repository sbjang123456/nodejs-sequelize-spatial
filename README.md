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

## Notes
* gdal 라이브러리는 운영체제 및 Nodejs 버전에 따라 다시 설치해야할 수 있습니다.
```
npm uninstall --save gdal
npm install --save gdal
```
* multer package는 shp 파일을 업로드 하기 위해 사용했다.
* 업로드 할 shp 파일의 sequelize model 은 선행으로 만들어져있어야한다.
* shp 파일을 업로드 할 때, 반드시 '.shp, .dbf, .shx' 파일 3개를 업로드 해야한다.