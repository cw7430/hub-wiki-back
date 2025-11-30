# [카피 - 웹 백엔드 - 나무위키] 허브위키 v0.1

## 실행 하기

### 1. mysql server 8.4 설치

- <https://dev.mysql.com/downloads/mysql/8.4.html>

### 2. DBeaver 설치

- <https://dbeaver.io/download/>
- DB 연결 후 테이블 생성
  - hub_wiki_local

### 3. git clone

```bash
git clone https://github.com/cw7430/hub-wiki-back.git
cd hub-wiki-back
npm install
```

### 4. .env.local 작성

- .env.local.example 참고

```dotenv
FRONTEND_URL="http://localhost:3000"
CORS_ORIGIN="http://localhost:3000,http://localhost:5173"
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=hub_wiki_local
DB_CHARSET=utf8mb4
DB_TIMEZONE=Z
```

### 5. DB 마이그레이션

```bash
npm run drizzle:generate
npm run drizzle:migrate
```

### 6. 실행하기

```bash
npm run dev
```

## 프로젝트 목적

- NestJS 기반의 API 서버로, 나무위키 스타일 문서 시스템을 위한 버전 관리형 Wiki API를 제공한다
- 프론트엔드는 Nuxt 3 기반 SSR로 구성되어 있으며, 본 백엔드 API와 연동하여 문서 조회·생성·버전 관리를 수행한다

## 요구사항

- 누구나 새로운 위키 문서를 생성할 수 있다
- 누구나 모든 위키 문서를 열람할 수 있다
- 생성된 위키 문서는 수정, 삭제할 수 없다

## 기술 스택

- Backend: NestJS 11
- DB: Mysql 8.4, drizzle-orm 0.44
- Language: TypeScript

## 프로젝트 구조

```bash
└── src/
    ├── common/
    │    ├── api/
    │    ├── config/
    │    └── database/
    │
    ├── modules/
    │   └── doc/
    │         ├── dtos/
    │         ├── doc.module.ts
    │         ├── doc.repository.ts
    │         ├── doc.service.ts
    │         └── doc.controller.ts
    │
    ├── app.module.ts
    ├── app.service.ts
    ├── app.controller.ts
    └── main.ts
```

## DB 테이블

- wiki_doc: id(PK), title
- doc_version: id(PK), wiki_doc_id(FK), created_at, body, version

## 테이블 관계

- one to many
  - wiki_doc -> doc_version

## API

- 공통
  - 문서 제목으로 문서 찾기
    - Query wiki_doc_pk
- /w/[문서이름]
  - 해당 문서의 최신 버전 읽기
    - Query wiki_doc_pk
- /edit/[문서이름]
  - 해당 문서의 최신 버전 읽기
    - Query wiki_doc_pk
  - 새로운 문서 생성하기
    - Mutation insert_wiki_doc
  - 문서의 새로운 버전 생성하기
    - Mutation insert_doc_version
- /history[문서이름]
  - 해당 문서의 모든 버전 읽기
    - Query wiki_doc_pk

## 테스트

### 문서 검색

- 검색 창에 문서 이름을 입력한다
  - 문서가 있는 경우 최신 버전의 문서를 표시한다
  - 문서가 없는 경우 새 문서 작성 링크를 표시한다

### 새 문서 작성

- 새로운 문서를 작성 완료 하면 해당 문서 페이지로 이동한다

### 기존 문서 편집

- 기존 문서를 편집하면 해당 문서 페이지가 편집한 문서로 대체된다
- 기존 버전은 모두 유지된다

### 문서의 이전 버전 보기

- 해당 문서의 역사 페이지에서 문서의 모든 버전을 볼 수 있다
- 특정 버전을 클릭하면 그 버전의 문서를 볼 수 있다

## 작업 순서

1. 초기 설정
2. DB 설정
3. 백엔드 작업
4. 테스트
