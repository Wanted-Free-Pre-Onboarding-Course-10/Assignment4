# Assignment4
원티드 X 위코드 프리 온보딩 2주차 기업형 과제(8퍼센트)

## 설명

본 프로젝트는 원티드x위코드 백엔드 프리온보딩  [8퍼센트]에서 출제한 과제를 기반으로 제작 되었습니다.

[과제 소개](https://www.notion.so/wecode/8-75d7f2d760ce4382a4fb6366bdb4f139)

## 코드 컨벤션
[코드 컨벤션](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment4/wiki/%EC%BD%94%EB%93%9C%EC%BB%A8%EB%B2%A4%EC%85%98)

## 시나리오
[시나리오](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment4/wiki/%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4)

## 요구사항 분석
**REST API 기능**
- 거래내역 조회 API
  - 계좌의 소유주만 요청 가능 
  - 거래내역 시간별로 필터링
  - 출금, 입금, 전체 선택하여 필터링
  - 거래내역 페이지네이션
- 입금 API
  - 계좌의 소유주만 요청 가능
  - 자신의 계좌에 입금 가능
  - 계좌의 입금 거래내역 생성
  - 계좌의 잔액 변경
- 출금 API
  - 계좌의 소유주만 요청 가능
  - 자신의 계좌에 잔액 내에서만 출금 가능
  - 계좌의 출금 거래내역 생성
  - 계좌의 잔액 변경
- 송금 API
  - 계좌의 소유주만 요청 가능
  - 자신의 계좌의 잔액 내에서만 송금 가능
  - 송금 계좌의 출금 거래내역 생성
  - 송금 받는 계좌의 입금 거래내역 생성
  - 송금 계좌의 잔액 변경
  - 송금 받는 계좌의 잔액 변경


## 과제 구현사항


|| 구현사항  | 구현 여부                                          |
|---| ------ | ----------------------------------------------- |
|거래내역 조회|  계좌의 소유주만 거래내역 조회 가능| OK| 
||거래내역 시간별로 필터링 하여 조회|OK |
||출금, 입금 전체 필터링하여 거래내역 조회| OK | 
||거래내역 페이지네이션| OK | 
|입금|계좌의 소유주만 자신의 계좌에 입금 가능 | OK | 
||계좌의 입금 거래내역 생성| OK | 
||입금시 계좌의 잔액 변경| OK | 
|출금|계좌의 소유주만 자신의 계좌에서 출금 가능 | OK | 
||계좌의 출금 거래내역 생성| OK | 
||출금시 계좌의 잔액 변경| OK | 
||계좌의 잔액 내에서만 출금 가능| OK | 
|송금|계좌의 소유주만 송금 가능 | OK | 
||자신의 계좌 잔액 내에서만 송금 가능| OK | 
||송금 계좌의 출금 거래내역 생성|OK  | 
||송금 받는 계좌의 입금 거래내역 생성| OK | 
||송금 계좌의 잔액 변경|  OK| 
||송금 받는 계좌의 잔액 변경|OK  | 
|무결성| |  | 
||트랜잭션 사용| OK | 
||송금 받는 계좌의 잔액 변경| OK |
## 사용 스택

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=SQLite&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/TYPEORM-red?style=for-the-badge&logo=TYPEORM&logoColor=white" />
## DB 스키마


![Copy of 8퍼센트](https://user-images.githubusercontent.com/81801012/141456569-5456cc6a-0318-4b71-8530-a3bf8f35455f.png)




## API
[API문서](https://documenter.getpostman.com/view/13568025/UVC8Ckf6)

## API 테스트
1. 우측 링크를 클릭해서 postman으로 들어갑니다.[링크](https://www.postman.com/martian-satellite-348039/workspace/10-8-api-test/overview) 
2. 정의된 server가 올바른지 확인 합니다.()




3. 이후, API 테스트를 시도해 주세요.

## 설치 및 실행 방법

### 프로젝트 설치
```
git clone https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment4.git
```


 ### 환경 구축 및 
```
npm install

npm run start:dev
```


## 팀원

| 이름   | github                                          | 담당 역할                  | 회고록             |
| ------ | ----------------------------------------------- | -------------------------- |------------------|
| 박지율 | [earthkingman](https://github.com/earthkingman) |송금(출입금) API, 리팩토링 |      [회고록]()          |
| 염재선 | [Yeom Jae Seon](https://github.com/YeomJaeSeon) |DB설계, 테스트 데이터 추가 api, 리팩토링|   [회고록]()                  |
| 김태희 | [김태희](https://github.com/godtaehee)            |      |        [회고록]()            |
| 박상엽 | [큰형](  https://github.com/lotus0204)            | 회원가입,로그인 기능,API 보안      |     [회고록]()                   |

## 개발 일정

![]()

## 개발도중 고민들
- [DB설계시 고민](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment4/wiki/DB-%EC%84%A4%EA%B3%84)
- [DB 동시성 문제 고민](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment4/wiki/%EB%8F%88%EC%9D%98-%EB%AC%B4%EA%B2%B0%EC%84%B1%EC%9D%84-%EC%A7%80%ED%82%A4%EB%8A%94-%EB%B0%A9%EB%B2%95)
- [무결성 고민](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment4/wiki/%EB%AC%B4%EA%B2%B0%EC%84%B1%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%B4%EA%B3%A0,-%EC%9A%B0%EB%A6%AC-%EC%84%9C%EB%B9%84%EC%8A%A4%EC%97%90-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%A0%81%EC%9A%A9%EC%8B%9C%ED%82%AC%EA%B2%83%EC%9D%B8%EA%B0%80%3F)
- [입출금 로그 고민](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment4/wiki/%EC%9E%85%EC%B6%9C%EA%B8%88-%EB%82%B4%EC%97%AD%EC%9D%84-%EB%A1%9C%EA%B7%B8%EB%A1%9C-%EB%82%A8%EA%B8%B0%EA%B8%B0)
- [거래내역 테이블 설계 고민](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment4/wiki/%EA%B1%B0%EB%9E%98%EB%82%B4%EC%97%AD-%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%84%A4%EA%B3%84)

## 협업 방식

[잡초 협업하기](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2/wiki/%ED%98%91%EC%97%85-%EB%B0%A9%EC%8B%9D)

## 개발 과정

[입출금 API (트랜잭션)](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment4/wiki/%EB%8F%88%EC%9D%98-%EB%AC%B4%EA%B2%B0%EC%84%B1%EC%9D%84-%EC%A7%80%ED%82%A4%EB%8A%94-%EC%B2%AB%EB%B2%88%EC%A7%B8-%EB%B0%A9%EB%B2%95(%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98)) 

[입출금 API(동시성)](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment4/wiki/%EB%8F%88%EC%9D%98-%EB%AC%B4%EA%B2%B0%EC%84%B1%EC%9D%84-%EC%A7%80%ED%82%A4%EB%8A%94-%EB%91%90%EB%B2%88%EC%A7%B8-%EB%B0%A9%EB%B2%95(%EB%8F%99%EC%8B%9C%EC%84%B1))


## 테스트 

