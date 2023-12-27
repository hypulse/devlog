A blogging system developed with Next.js

## Tech Stack

1. 프론트엔드 개발:

   - React: 웹 인터페이스 구축을 위한 주요 라이브러리
   - Next.js: 서버 사이드 렌더링(SSR) 및 정적 사이트 생성을 위한 프레임워크
   - Tailwind CSS: 유틸리티 중심의 CSS 프레임워크

2. 백엔드 개발:

   - Node.js: 서버사이드 JavaScript 실행 환경
   - MariaDB: SQL 데이터베이스 관리 시스템
   - Mongoose: MongoDB 객체 모델링 도구
   - Sequelize: Node.js를 위한 SQL ORM
   - Redis: 인메모리 데이터 구조 저장소

3. 인증 및 보안:

   - bcrypt: 비밀번호 해싱 (bcrypt).
   - jsonwebtoken: JSON 웹 토큰 생성 및 검증

4. 개발 도구 및 라이브러리:

   - TypeScript: JavaScript에 타입을 추가하는 언어
   - dotenv: 환경 변수 관리

5. 마크다운 및 문서 처리:

   - marked: 마크다운 파싱 및 컴파일
   - highlight.js: 코드 하이라이팅
   - React Markdown Editor Lite: 리액트 기반 마크다운 에디터

6. 기타 유틸리티:

   - marked-gfm-heading-id, marked-highlight, marked-mangle: 마크다운 처리를 위한 추가 라이브러리

## Features

- A simple CMS exists to manage your content.
- A special code snippets page to manage and share your code snippets
- Provide a backup API to save content in markdown format.
- Basic login security features are implemented.
- Various features to prevent data loss, including backups and local drafts.
