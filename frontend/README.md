# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

여기부터는 프론트엔드 프로젝트 생성 순서 입니다.

1. Vite + Vue3 기본 프로젝트 생성

# Vite를 이용해 새 Vue 3 프로젝트 생성

npm create vite@latest frontend -- --template vue
npm install

Why?
→ Vite는 Vue 3 공식 추천 빌드툴입니다. 빠르고 가볍고 설정이 간단합니다.
→ vue 템플릿을 선택하면 기본 Composition API 구조로 바로 시작할 수 있습니다.

2. 주요 패키지 설치

# 라우터, 상태관리, API 통신, UI 프레임워크 설치

npm install vue-router@4 pinia axios element-plus

Why?
→ vue-router@4 : Vue 3 전용 라우터, 페이지 전환 담당
→ pinia : Vuex를 대체하는 공식 상태관리 툴 (더 간단하고 타입 지원 좋음)
→ axios : HTTP 통신용 (Open API나 백엔드 호출할 때 필요)
→ element-plus : Vue3 최적화된 UI 프레임워크 (버튼, 모달, 카드 등 빠른 개발 지원)

3. 기본폴더 구조 다듬기
   src/
   ├── assets/ # 이미지, CSS 등 정적 파일 저장
   ├── components/ # 재사용 가능한 소형 컴포넌트 (ex. MapView.vue)
   ├── pages/ # 라우팅 대상이 되는 페이지 (ex. HomePage.vue)
   ├── router/ # vue-router 설정 폴더
   ├── store/ # pinia 스토어 폴더 (상태관리)
   ├── App.vue # 메인 앱 컴포넌트
   └── main.js # 앱 시작 파일 (모든 플러그인 연결)

Why?
→ components와 pages를 분리하면 재사용성과 관리성이 좋아집니다.
→ store를 따로 두면 pinia를 쓰든 안 쓰든 확장성이 좋아요.
