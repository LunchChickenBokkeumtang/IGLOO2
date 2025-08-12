[주요 업무]
	UXUI 설계 및 구현
	동적 기능 및 인터랙션 개발
	접근성,크로스브라우징 고려
	빌드 배포 성능 최적화


[활용 기술]
1.	Vanila JS & DOM API
이벤트 핸들링 (addEventListner 등)
IntersectionObserver를 이용한 요소 가시성 제어
ResizeObserver를 통한 캔버스 리사이즈 감지
HTML5 Video API (playbackRate, play(), pause() 등)
Touch & Pull-to-Refresh 제어 
iOS Safari touchstart/touchmove 로직으로 Pull-to-Refresh 방지
2.	jQuery
간단한 이벤트 제어($(document)on(‘click’,…)
UI 플러그인 초기화 및 설정
($(‘.animate’).scrolla({…})
3.	Swiper.js
반응형,루프,페이드 효과 슬라이더 구현
자동재생, 속도, 콜백 (slideChangeTransitionStart)
4.	GSAP
gsap.timeline 등 애니메이션 시퀀스 작성
ScrollTrigger  플러그인으로 스크롤 기반 트리거
5.	Canvas 2D API & Custom Elements
커스텀 엘리먼트로 픽셀 반짝임 효과
Canvas 2D 컨텍스트를 이용한 픽셀그리기(fillRect) 및 애니메이션 루프
6.	Three.js
WebGL 렌더러로 3D 정팔면체 및 포인트 렌더링
카메라,씬,렌더러 설정과 애니메이션 루프
7.	SVG animation
getTotalLength() →
 strokeDasharray/strokeDashoffset 세팅
GSAP Timeline, ScrollTrigger로 라인 드로잉
8.	Reservation Calendar Logic
동적 DOM  생성과 이벤트 바인딩으로 캘린더 날짜, 시간 선택 구현
과거 날짜 비활성화, 선택된 날짜,시간 데이터 관리
9.	GitHub 기반 CI/CD 파이프라인 구축
워크플로우로 main 브랜치 푸시 시 자동 빌드 및 배포 트리거
