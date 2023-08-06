#### app

- 데미 데이터 최종 제거하고 API 연동하기
- useIntersectionObserver 사용하는 useEffect 예제 엄밀 구현, 각 페이지에 적용하기
- ~~공유 및 복사시 메시지 뜨는 거 만들기~~
- 로그인 페이지 만들기
- 공통 버튼 만들기
- 태그 컴포넌트 분리하기(관리자 태그 관리에 필요)
- getStaticPaths 등 적용하기

#### 관리자 페이지 필요한 것

- 태그 CRUD
- Aritlce CRUD (멀티 선택, 삭제 가능)
- 삭제는 전부 soft delete
- 백업 작업 수행
- status 스키마에 추가 active, inactive, deleted => 권한 주의
- 관리자 페이지에서도 삭제된 것 볼 수 없음 => 간단하게 하기 위해서

#### 기타

- 몽고DB 클라이언트 작업

##### 2023-8-7

- 태그 관련 작업
- 태그 관리 페이지
- 더미 데이터, Date 관련 작업 검토
