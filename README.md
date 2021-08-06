## Nodejs Express + Sequelize + Postgresql - Spatial(Postgis) #
> Sequelize 를 이용한 공간데이터 업로드 및 조회 기능

### Installation
```
git clone https://github.com/sbjang123456/nodejs-sequelize-spatial.git
cd nodejs-sequelize-spatial
docker-compose up -d
npm install
```

### Development
```
npm run server:dev
```

## Notes
* 프로젝트 실행에 앞서 postgresql + postgis 를 설치하거나 도커를 이용해 실행시켜야한다.
  - 이 프로젝트에서는 docker-compose 로 postgresql 을 실행시킨다.
* gdal 라이브러리는 운영체제 및 Nodejs 버전에 따라 다시 설치해야할 수 있습니다.
```
npm uninstall --save gdal
npm install --save gdal
```
* multer package는 shp 파일을 업로드 하기 위해 사용했다.
* 업로드 할 shp 파일의 sequelize model 은 선행으로 만들어져있어야한다.
* shp 파일을 업로드 할 때, 반드시 '.shp, .dbf, .shx' 파일 3개를 업로드 해야한다.
