![image](https://user-images.githubusercontent.com/13481627/83964721-cd187580-a8e9-11ea-97b2-c7d191a73b7f.png)

# ModuTable : 코드스테이츠 Immersive 4주 프로젝트

현대 생활에서 개인 성향이 강해지면서 가까운 이웃과 같은 동네에 함께 있어도 얼굴조차 모르고 지내게 되는 사람들이 점차 증가하고 있습니다.

어쩌면 이렇게 혼자서 시간을 보내는 것은 외롭고 쓸쓸한 일일 수도 있습니다.

**ModuTable**은 누군가와 함께 시간을 보내고 소중한 인연을 만들고자 하는 사람들을 위해 만든 서비스 입니다.

자신의 공간을 공유하고 초대받으며 여러 사람들과 함께 **한 끼의 식사**를 하며 네트워킹과 친목을 도모하도록 도와줄 수 있습니다.

무엇을 하든 혼자가 아니라 누군가와 함께하고 시간을 공유한다는 것은 어쩌면 내 일상에 많은 변화를 가져다 줄 수 있는 요소가 될 수도 있습니다.

<br/>

## 프로젝트 개요

- 기간 : 2019.05.29 ~ 6.23 (4주)

- 참여 : 프론트엔드([조진혁](https://github.com/gogoJH)), 백엔드([정인용](https://github.com/inyong-e))

- 서비스 종류 : Web application

<br>

## 기능 소개

- 카카오, 페이스북 계정을 이용하여 소셜 로그인을 할 수 있습니다.
- 호스트가 모임을 개설하고, 게스트들이 모임 중 하나를 선택하여 모임 신청을 할 수 있습니다.
- 모임이 끝난 후, 해당 모임이 어땠는지 리뷰를 남길 수 있습니다.
- 프로필 설정에서 자신의 프로필 이미지와 개인정보를 등록할 수 있습니다.
- 모임에 대해 궁금한 사항은 호스트와의 채팅 기능을 통해 문의를 할 수 있습니다.
- 지도를 통해 모임이 열리는 위치를 자세히 확인할 수 있습니다.

<br/>

![image](https://user-images.githubusercontent.com/13481627/83964784-444e0980-a8ea-11ea-92b7-158fe9deff58.png)

### [ModuTable 소개 영상 보러가기](https://drive.google.com/open?id=1lt2KuhIK5kvd7Vp6JfdSRR2M7dZVNMsa)

<br>

## 서비스 아키텍처

moduTable을 운영하는 서비스 전체 아키텍처는 다음과 같습니다.

![image](https://user-images.githubusercontent.com/13481627/83964843-88d9a500-a8ea-11ea-81db-ebcddcca6556.png)

## 사용 기술 스택

moduTable에서 사용되는 백엔드 단의 기술 스택은 다음과 같습니다.

- Typescript
- Node.js Express
- JWT
- passport.js
- socket io
- typeORM

<br/>

## 프로젝트 실행 방법

`npm install` : 프로젝트에 필요로 한 라이브러리 설치

`npm start` : 서버 실행

_(해당 프로젝트는 백엔드 전용 Repo이므로 [Client Repo](https://github.com/modutable)를 추가로 실행하셔야 합니다.)_

<br/>

## 프로젝트 진행 관리 문서 (Notion)

- https://www.notion.so/helloinyong/ModuTable-d528125dbf2542c5b07abd520d81b65e

<br>

## 기술관련 작업 내용 로그 & TIL

- [이머시브 12기 데모데이를 마치며](https://helloinyong.tistory.com/142)
- [lambda에서 sharp 라이브러리로 이미지 resizing 작업 시 주의사항](https://helloinyong.tistory.com/139)
- [serverless offline에서는 돌아가는데, 배포 후 eterner error나는 현상](https://helloinyong.tistory.com/138)
- [image base64 인코딩 및 디코딩 작업 시 주의사항](https://helloinyong.tistory.com/137)
- [Serverless framework를 이용하여 lambda 배포하는 법](https://helloinyong.tistory.com/135)
- [typeScript 빌드 후, js파일이 여전히 .ts파일을 참조하는 문제](https://helloinyong.tistory.com/133)
- [TypeORM relation column update하는 방법](https://helloinyong.tistory.com/132)
- [passport로 Facebook 로그인 시 cors 에러가 나던 문제](https://helloinyong.tistory.com/131)
- [암호화 bcrypt.compare가 무조건 false로 나던 문제](https://helloinyong.tistory.com/130)
- [passport deserializeUser 호출이 안되는 문제](https://helloinyong.tistory.com/129)
- [passport 세팅 후 LocalStrategy 호출이 안되는 현상](https://helloinyong.tistory.com/127)
- [gitignore에 반영을 해도 추가가 안되는 이유](https://helloinyong.tistory.com/125)
- [TypeScript 사용법](https://helloinyong.tistory.com/124)

<br>

## 프로젝트 진행 로그

- [이머시브 12기 데모데이를 마치며](https://helloinyong.tistory.com/143)
- [데모데이 당일, 발표 전](https://helloinyong.tistory.com/141)
- [데모데이 이틀을 남기며](https://helloinyong.tistory.com/140)
- [4주 프로젝트 3주차 시작](https://helloinyong.tistory.com/136)
- [4주 프로젝트 2주차를 마감하며](https://helloinyong.tistory.com/134)
- [4주 프로젝트 2주차 시작](https://helloinyong.tistory.com/128)
- [4주 프로젝트 5일차를 진행하며](https://helloinyong.tistory.com/1126)
- [4주 프로젝트 시작](https://helloinyong.tistory.com/123)
