


$(document).on('click', 'a[href="#"]', e => e.preventDefault());




// IOS 아이폰 스크롤 새로고침 오류 해결
let maybePreventPullToRefresh = false;
let lastTouchY = 0;

document.addEventListener('touchstart', e => {
  if (e.touches.length !== 1) return;
  lastTouchY = e.touches[0].clientY;
  // 페이지 최상단일 때만 당겨서 새로고침 가능 상태로 표시
  maybePreventPullToRefresh = (window.pageYOffset === 0);
}, { passive: false });

document.addEventListener('touchmove', e => {
  const touchY = e.touches[0].clientY;
  const touchYDelta = touchY - lastTouchY;
  lastTouchY = touchY;

  if (maybePreventPullToRefresh) {
    maybePreventPullToRefresh = false;
    if (touchYDelta > 0) {
      // 아래로 당기는 첫 동작에 대해서만 기본 동작(새로고침)을 막음
      e.preventDefault();
      return;
    }
  }
}, { passive: false });














// 1) 비디오 요소 참조 & 재생 속도 설정
const firstVideo  = document.getElementById('firstVideo');
const homeVideo   = document.getElementById('homeVideo');
const homeVideo2  = document.getElementById('homeVideo2');

// 플레이백 레이트 & 스타일
firstVideo.playbackRate  = 1.5;
homeVideo.playbackRate   = 3.3;
homeVideo2.playbackRate  = 3.3;
homeVideo2.style.opacity = 0.4;

// 2) Swiper 초기화 (init 콜백 포함)
const homeSwiper = new Swiper('.swiper-home', {
  effect: 'fade',
  fadeEffect: { crossFade: true },
  loop: true,
  speed: 2000,
  // Swiper 자체 autoplay 옵션은 켜둬도 되고, 만약 충돌이 생기면 disableOnInteraction만 false로
  autoplay: {
    delay: 800,
    disableOnInteraction: false,
  },
  on: {
    // 첫 렌더링 시
    init() {
      // 모든 슬라이드 비디오 pause
      this.slides.forEach(slide => {
        slide.querySelector('video')?.pause();
      });
      // 활성 슬라이드 비디오만재생
      const vid = this.slides[this.activeIndex].querySelector('video');
      if (vid) {
        vid.currentTime = 0;
        vid.play();
      }
    },
    // 슬라이드 전환이 시작될 때
    slideChangeTransitionStart() {
      // 이전 슬라이드 비디오 정지
      const prevVid = this.slides[this.previousIndex].querySelector('video');
      prevVid?.pause();

      // 새 슬라이드 비디오 재생
      const currVid = this.slides[this.activeIndex].querySelector('video');
      if (currVid) {
        currVid.currentTime = 0;
        currVid.play();
      }
    },
  },
});

// 3) init 수동 트리거 (Swiper를 new한 뒤 한 번만 호출)
homeSwiper.init();






























// 밤하늘에 별을
class StarryNight {
    constructor() {
        this.container = document.getElementById('starsContainer');
        this.stars = [];
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        
        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        this.createStars();
        this.createShootingStars();
        this.createConstellations();
    }

    createStars() {
        const numStars = 300;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // 별 크기 랜덤 설정
            const size = Math.random();
            if (size > 0.8)       star.classList.add('large');
            else if (size > 0.5)  star.classList.add('medium');
            else                  star.classList.add('small');
            
            // 위치 설정
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const z = Math.random() * 2000 - 1000; // Z 범위
            
            star.style.left           = x + 'px';
            star.style.top            = y + 'px';
            star.style.transform      = `translateZ(${z}px)`;
            star.style.animationDelay = Math.random() * 3 + 's';
            
            this.container.appendChild(star);
            this.stars.push({ element: star, x, y, z, originalX: x, originalY: y });
        }
    }

    createShootingStars() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.addShootingStar();
            }
        }, 3000 + Math.random() * 4000);
    }

    addShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        const direction = Math.random();
        let startX, startY, angle;
        
        if (direction < 0.25) {
            startX = Math.random() * window.innerWidth * 0.3;
            startY = Math.random() * window.innerHeight * 0.3;
            angle  = 45;
        } else if (direction < 0.5) {
            startX = window.innerWidth * 0.7 + Math.random() * window.innerWidth * 0.3;
            startY = Math.random() * window.innerHeight * 0.3;
            angle  = 135;
        } else if (direction < 0.75) {
            startX = Math.random() * window.innerWidth;
            startY = -50;
            angle  = 90 + (Math.random() - 0.5) * 30;
        } else {
            startX = window.innerWidth + 50;
            startY = Math.random() * window.innerHeight * 0.6;
            angle  = 180 + (Math.random() - 0.5) * 30;
        }
        
        shootingStar.style.left              = startX + 'px';
        shootingStar.style.top               = startY + 'px';
        shootingStar.style.transform         = `rotateZ(${angle}deg)`;
        shootingStar.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        this.container.appendChild(shootingStar);
        
        setTimeout(() => {
            if (shootingStar.parentNode) {
                shootingStar.parentNode.removeChild(shootingStar);
            }
        }, parseFloat(shootingStar.style.animationDuration) * 1000);
    }

    createConstellations() {
        const constellations = [
            [
                { x: 200, y: 100 },
                { x: 250, y: 120 },
                { x: 300, y: 110 },
                { x: 350, y: 140 },
                { x: 320, y: 180 },
                { x: 280, y: 200 },
                { x: 240, y: 190 }
            ]
        ];
        constellations.forEach(constellation => {
            for (let i = 0; i < constellation.length - 1; i++) {
                const line = document.createElement('div');
                line.className = 'constellation-line';
                const [p1, p2] = [constellation[i], constellation[i + 1]];
                const length = Math.hypot(p2.x - p1.x, p2.y - p1.y);
                const angle  = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
                line.style.left     = p1.x + 'px';
                line.style.top      = p1.y + 'px';
                line.style.width    = length + 'px';
                line.style.transform = `rotate(${angle}deg)`;
                this.container.appendChild(line);
            }
        });
    }

    bindEvents() {
        document.addEventListener('mousemove', e => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        document.addEventListener('click', e => {
            this.createClickEffect(e.clientX, e.clientY);
        });
    }

    createClickEffect(x, y) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'star large';
            sparkle.style.left      = x + (Math.random() - 0.5) * 50 + 'px';
            sparkle.style.top       = y + (Math.random() - 0.5) * 50 + 'px';
            sparkle.style.animation = 'twinkle 0.6s ease-out';
            this.container.appendChild(sparkle);
            setTimeout(() => {
                if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
            }, 600);
        }
    }

    animate() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX  = (this.mouseX - centerX) / centerX;
        const deltaY  = (this.mouseY - centerY) / centerY;
        
        this.stars.forEach(star => {
            const pm = star.z / 200;
            const px = deltaX * pm;
            const py = deltaY * pm;
            const rx = deltaY * (star.z / 500);
            const ry = deltaX * (star.z / 500);
            star.element.style.transform = `
                translateZ(${star.z}px)
                translateX(${px}px)
                translateY(${py}px)
                rotateX(${rx}deg)
                rotateY(${ry}deg)
            `;
            star.element.style.opacity = Math.max(0.3, 1 - Math.abs(star.z) / 1500);
        });
        
        this.container.style.transform = `
            perspective(1000px)
            rotateY(${deltaX * 8}deg)
            rotateX(${-deltaY * 8}deg)
        `;
        requestAnimationFrame(() => this.animate());
    }
}

// 페이지 로드 후, 화면 폭이 480px 초과일 때만 스타필드 실행
window.addEventListener('load', () => {
    if (window.innerWidth > 480) {
        new StarryNight();
    }
});

// ————————————————
// 화면 리사이즈/회전 시 새로고침 분기 로직
// ————————————————

function reloadPage() {
  location.reload();
}

const isMobile = /Android|iP(hone|od)/.test(navigator.userAgent);
// 초기 로드 시 현재 너비 저장
let previousWidth = window.innerWidth;

if (isMobile) {
  // 스마트폰에서는 회전만 감지
  window.addEventListener('orientationchange', reloadPage);
} else {
  // 데스크탑·태블릿: 1400px 경계만 넘거나 벗어날 때만 새로고침
  window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;

    // 1400px 이하↔초과로 상태가 바뀌었을 때만 reload
    if (
      (previousWidth <= 1400 && currentWidth > 1400) ||
      (previousWidth > 1400 && currentWidth <= 1400)
    ) {
      reloadPage();
    }

    // 다음 비교를 위해 너비 업데이트
    previousWidth = currentWidth;
  });
}










/* ----------------------------------------------------- */
/* main+header 글자 이동 */

function activateOnceOnScroll(element) {
  const st = ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    onEnter: () => {
      element.classList.add('active');
      st.kill(); // 한 번 실행 후 트리거 제거
    },
    // once: true, // 이 옵션 대신 직접 kill() 사용
    //markers: true,
  });
}

activateOnceOnScroll(document.querySelector('header'));
activateOnceOnScroll(document.querySelector('.home .inner .container'));




































// ---------------------------------------
//스크롤라(scrolla)
$(function() {
  $('.animate').scrolla({
    mobile: true,
    once: true,
  });
}); 

//excellence 타이틀 애니메이션 
const excellenceTitle = document.querySelector('.Excellence .container .titBox');
gsap.registerPlugin(ScrollTrigger);
gsap.timeline({
  scrollTrigger: {
    trigger: excellenceTitle,
    start: '50% 80%',
    end: '100% 0%',
    toggleClass: 'active',
    //markers: true
  }
})
.from(excellenceTitle, { y: '30%', opacity: 0, duration: 1});


const boxul = document.querySelector('.Excellence .container .boxInner .boxUl');
gsap.registerPlugin(ScrollTrigger);
gsap.timeline({
  scrollTrigger: {
    trigger: boxul,
    start: '-10% bottom',
    end: 'bottom top',
    toggleClass: 'active',
    //markers: true
  }
})


//excellence Scroll 슬라이드 효과
const scrollItems = [
  { selector: '.box.n1'},
  { selector: '.box.n2'},
  { selector: '.box.n3'},
  { selector: '.box.n4'},
  { selector: '.box.n5'},
  { selector: '.box.n6'},
  { selector: '.box.n7'},
  { selector: '.box.n8'},
  { selector: '.box.n9'},
  { selector: '.box.n10'},
  { selector: '.box.n11'},

];

scrollItems.forEach(({ selector, start, y }) => {
  gsap.from(selector,
    { 
      y:'30%', 
      opacity: 0,
      scrollTrigger: {
        trigger: selector,
        start:'top 90%',
        end: '10% 50%',
        scrub: 0.2,
        ease: "power2",
        //markers: true,
      },
    });
});




// ---------------------------------------
//excellence  svg 애니메이션
const boxUl = document.querySelector('.boxUl');
const string1 = boxUl.querySelector('.string1'); // 또는 다른 적절한 요소

gsap.timeline({
  scrollTrigger: {
    trigger: boxUl,
    start: '50% 80%',
    end: '100% 0%',
    toggleClass: { targets: string1, className: 'active' },
    //markers: true,
  }
});

const string2 = boxUl.querySelector('.string2'); // 또는 다른 적절한 요소

gsap.timeline({
  scrollTrigger: {
    trigger: boxUl,
    start: '50% 80%',
    end: '100% 0%',
    toggleClass: { targets: string2, className: 'active' },
    //markers: true,
  }
});












//solution 타이틀 애니메이션 
const solutionTitle = document.querySelector('.solution .inner .stickyBox');

gsap.timeline({
  scrollTrigger: {
    trigger: solutionTitle,
    start: '50% 80%',
    end: '100% 0%',
    //markers: true
  }
})
.from(solutionTitle, { y: '30%', opacity: 0, duration: 1}); 




$(window).on('load', function() {
    const isNarrow = window.innerWidth <= 480;
    $('.partners .circle').attr('data-iteration', isNarrow ? 1 : 'infinite');
    $('.partners').scrolla({
        mobile: true,
        once: isNarrow
    });
});




      













// newsroom 섹션 슬라이드

//newsroom 타이틀 애니메이션 
const newsroomTitle = document.querySelector('.newsroom .container .stacked_head');

gsap.timeline({
  scrollTrigger: {
    trigger: newsroomTitle,
    start: '50% 80%',
    end: '100% 0%',
    //markers: true
  }
})
.from(newsroomTitle, { y: '30%', opacity: 0, duration: 1});

// 1) GSAP과 ScrollTrigger 등록
gsap.registerPlugin(ScrollTrigger);

// 2) DOM 요소 셀렉션
const items       = gsap.utils.toArray('.swiperSlide .item');  // 슬라이드 아이템 배열
const total       = items.length;                              // 총 슬라이드 개수
const fill        = document.querySelector('.bar-fill');       // 게이지 바 채우기 요소
const numberList  = document.querySelector('.number-list');    // 숫자 카운트업 ul
const digitHeight = 20;                                        // 숫자 한 줄 높이(px)
let prevIdx       = -1;                                        // 이전에 보여준 슬라이드 인덱스

// 3) 슬라이드당 스크롤 높이 비율 (0.5 = 뷰포트 높이의 50%)
const slideRatio = 0.65;

// 4) 초기 상태 설정
gsap.set(items, {
  autoAlpha: 0,
  xPercent:  -50,
  yPercent:  100,
  scale:     0.8
});

// 전체 슬라이드 개수를 두 자리 수 형식으로 표시
document.querySelector('.progress-total').textContent =
  String(total).padStart(2, '0');

// 5) ScrollTrigger 생성
ScrollTrigger.create({
  trigger: '.newsroom',
  start:   'top top',
  end:     () => `+=${ total * window.innerHeight * slideRatio }`,
  scrub:   true,
  pin:     true,
  onUpdate(self) {
    // ——————————————————
    // 1) 게이지 바 업데이트
    // ——————————————————
    // 최대 400px 높이 중 진행도에 비례해 채움
    fill.style.height = `${ Math.min(400, self.progress * 400) }px`;

    // ——————————————————
    // 2) 슬라이드 전환 & 숫자 카운트업
    // ——————————————————
    const idx = Math.min(total - 1, Math.floor(self.progress * total));
    if (idx !== prevIdx) {
      // 이전 슬라이드 숨기기
      if (prevIdx >= 0) {
        gsap.to(items[prevIdx], {
          autoAlpha: 0,
          yPercent:  20,
          scale:     0.3,
          duration:  0.4,
          ease:      'sine.inOut',
          overwrite: 'auto'
        });
      }
      // 현재 슬라이드 보이기
      gsap.to(items[idx], {
        autoAlpha: 1,
        xPercent: -50,
        yPercent: -50,
        scale:    1,
        duration: 0.4,
        ease:     'sine.inOut',
        overwrite:'auto'
      });
      // 숫자 리스트 y 위치 이동
      gsap.to(numberList, {
        y:         -idx * digitHeight,
        duration:  0.3,
        ease:      'power2.out',
        overwrite: 'auto'
      });
      prevIdx = idx;
    }
  }
});





// ----------------------------------[partners]-----------------------------------------


// 미디어쿼리 객체 (재사용)
const mq = window.matchMedia('(max-width: 1024px)');
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.boxes').forEach((box, rowIndex) => {
  const ul        = box.querySelector('ul');
  const originals = Array.from(ul.children);

  // 1-1) 원본 복제
  originals.forEach(li => ul.appendChild(li.cloneNode(true)));

  // 1-2) 한 세트 너비 계산
  const totalWidth = ul.scrollWidth / 2;

  // 2) 초기 위치 세팅
  if (rowIndex % 2 === 1) {
    gsap.set(ul, { x: -totalWidth });
  } else {
    gsap.set(ul, { x: 0 });
  }

  // 3) 무한 반복 타임라인 생성
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
  if (rowIndex % 2 === 1) {
    tl.to(ul, { x: 0,    duration: 200 }).set(ul, { x: -totalWidth });
  } else {
    tl.to(ul, { x: -totalWidth, duration: 100 }).set(ul, { x: 0 });
  }

  
  // 4) 핸들러 함수 정의
  const handleClick      = () => { tl.pause(); setTimeout(() => tl.resume(), 1000); };
  const handleMouseEnter = () => tl.pause();
  const handleMouseLeave = () => tl.resume();
  

  // 5) 이벤트(재)등록 함수
  function updateHandlers(e) {
    // 기존 이벤트 제거
    box.removeEventListener('click',      handleClick);
    box.removeEventListener('mouseenter', handleMouseEnter);
    box.removeEventListener('mouseleave', handleMouseLeave);

    if (e.matches) {
      // 1024px 이하: 클릭으로 제어
      box.addEventListener('click', handleClick);
    } else {
      // 1025px 이상: hover로 제어
      box.addEventListener('mouseenter', handleMouseEnter);
      box.addEventListener('mouseleave', handleMouseLeave);
    }
  }

  // 초기 바인딩
  updateHandlers(mq);
  // 뷰포트 변경 시 재바인딩
  mq.addEventListener('change', updateHandlers);
});








// 박스 반짝이
class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }

    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }

    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

class PixelCanvas extends HTMLElement {
  static register(tag = "pixel-canvas") {
    if ("customElements" in window) {
      customElements.define(tag, this);
    }
  }

static css = `
  :host {
    position: relative;
    display: grid;
    inline-size: 100%;
    block-size: 100%;
    overflow: hidden;
  }

  /* 캔버스를 호스트 안에서 절대 위치시키기 */
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
`;


  get colors() {
    return this.dataset.colors?.split(",") || ["#f8fafc", "#f1f5f9", "#cbd5e1"];
  }

  get gap() {
    const value = this.dataset.gap || 5;
    const min = 4;
    const max = 50;

    if (value <= min) {
      return min;
    } else if (value >= max) {
      return max;
    } else {
      return parseInt(value);
    }
  }

  get speed() {
    const value = this.dataset.speed || 35;
    const min = 0;
    const max = 100;
    const throttle = 0.001;

    if (value <= min || this.reducedMotion) {
      return min;
    } else if (value >= max) {
      return max * throttle;
    } else {
      return parseInt(value) * throttle;
    }
  }

  get noFocus() {
    return this.hasAttribute("data-no-focus");
  }

  connectedCallback() {
    const canvas = document.createElement("canvas");
    const sheet = new CSSStyleSheet();
    const slot = document.createElement('slot');
// slot 요소의 CSS는 adopt된 stylesheet에서 관리


    this._parent = this.parentNode;
    this.shadowroot = this.attachShadow({ mode: "open" });

    sheet.replaceSync(PixelCanvas.css);
    

    this.shadowroot.adoptedStyleSheets = [sheet];
    this.shadowroot.append(slot, canvas);
    this.canvas = this.shadowroot.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.timeInterval = 1000 / 60;
    this.timePrevious = performance.now();
    this.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    this.init();
    this.resizeObserver = new ResizeObserver(() => this.init());
    this.resizeObserver.observe(this);

    this._parent.addEventListener("mouseenter", this);
    this._parent.addEventListener("mouseleave", this);

    if (!this.noFocus) {
      this._parent.addEventListener("focusin", this);
      this._parent.addEventListener("focusout", this);
    }
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
    this._parent.removeEventListener("mouseenter", this);
    this._parent.removeEventListener("mouseleave", this);

    if (!this.noFocus) {
      this._parent.removeEventListener("focusin", this);
      this._parent.removeEventListener("focusout", this);
    }

    delete this._parent;
  }

  handleEvent(event) {
    this[`on${event.type}`](event);
  }

  onmouseenter() {
    this.handleAnimation("appear");
  }

  onmouseleave() {
    this.handleAnimation("disappear");
  }

  onfocusin(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    this.handleAnimation("appear");
  }

  onfocusout(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    this.handleAnimation("disappear");
  }

  handleAnimation(name) {
    cancelAnimationFrame(this.animation);
    this.animation = this.animate(name);
  }

  init() {
    const rect = this.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    this.pixels = [];
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.createPixels();
  }

  getDistanceToCanvasCenter(x, y) {
    const dx = x - this.canvas.width / 2;
    const dy = y - this.canvas.height / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance;
  }

  createPixels() {
    for (let x = 0; x < this.canvas.width; x += this.gap) {
      for (let y = 0; y < this.canvas.height; y += this.gap) {
        const color = this.colors[
          Math.floor(Math.random() * this.colors.length)
        ];
        const delay = this.reducedMotion
          ? 0
          : this.getDistanceToCanvasCenter(x, y);

        this.pixels.push(
          new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay)
        );
      }
    }
  }

  animate(fnName) {
    this.animation = requestAnimationFrame(() => this.animate(fnName));

    const timeNow = performance.now();
    const timePassed = timeNow - this.timePrevious;

    if (timePassed < this.timeInterval) return;

    this.timePrevious = timeNow - (timePassed % this.timeInterval);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.pixels.length; i++) {
      this.pixels[i][fnName]();
    }

    if (this.pixels.every((pixel) => pixel.isIdle)) {
      cancelAnimationFrame(this.animation);
    }
  }
}

PixelCanvas.register();



// script.js

function setupTouchInteractions() {
  const mq = window.matchMedia('(max-width: 1024px)');
  const boxes = document.querySelectorAll('.partners .box');
  
  function touchHandler() {
    // this === box element
    this.classList.add('is-active');
    
    // 슬라이드 일시정지 로직(필요시)
    if (this.timeline) {
      this.timeline.pause();
    }

    // 1초 뒤 원복
    setTimeout(() => {
      this.classList.remove('is-active');

      // 슬라이드 재개 로직(필요시)
      if (this.timeline) {
        this.timeline.resume();
      }
    }, 1000);
  }

  function bindTouches() {
    boxes.forEach(box => {
      // 이미 바인딩된 핸들러 제거 후 다시 등록
      box.removeEventListener('touchstart', touchHandler);
      box.addEventListener('touchstart', touchHandler);
    });
  }

  // 초기 바인딩
  if (mq.matches) bindTouches();

  // 뷰포트 변경 시 바인딩/해제
  mq.addEventListener('change', e => {
    if (e.matches) bindTouches();
    else        boxes.forEach(box => box.removeEventListener('touchstart', touchHandler));
  });
}

// DOM 준비 후 실행
document.addEventListener('DOMContentLoaded', setupTouchInteractions);
















// script.js

// ——————————————
// Text Scramble 클래스
// ——————————————
class TextScramble {
  constructor(el) {
    this.el     = el;
    this.chars  = "abcdef*//*/__)(&&^*)#@#$rsdctuM4567$%^&*()";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length  = Math.max(oldText.length, newText.length);
    this.queue    = [];
    this.resolve  = null;

    const promise = new Promise(r => (this.resolve = r));
    for (let i = 0; i < length; i++) {
      const from  = oldText[i] || "";
      const to    = newText[i] || "";
      // 각 글자마다 랜덤 시작·종료 프레임
      const start = Math.floor(Math.random() * 40);
      const end   = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end, char: null });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output   = "";
    let complete = 0;

    // 모바일일 때 스크램블 빈도 낮춤
    const isMobile       = window.innerWidth <= 480;
    const scrambleRate   = isMobile ? 0.10 : 0.28;  

    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        // 완료된 글자
        complete++;
        output += to;
      } else if (this.frame >= start) {
        // 스크램블 구간: 모바일에선 확률을 낮춰서 문자가 덜 깜빡임
        if (!char || Math.random() < scrambleRate) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        // 아직 변경 전
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}


// ——————————————
// 페이지 로드 후 초기화
// ——————————————
document.addEventListener("DOMContentLoaded", () => {
  // (1) 그대로 유지되는 전체 문구 배열
  const phrases = [
    "Experience the Ultimate",
    "AI - Driven Open XDR"
  ];

  // (2) .mainTitle .title 요소 선택 & 인스턴스 생성
  const els    = document.querySelectorAll(".mainTitle .title");
  const fxList = Array.from(els).map(el => new TextScramble(el));

  // (3) 전체 스크램블 실행
  function scrambleAll() {
    fxList.forEach((fx, idx) => {
      const text = phrases[idx] || "";
      fx.setText(text);
    });
  }

  // 최초 실행
  scrambleAll();

  // 5초마다 반복
  setInterval(scrambleAll, 5000);

  // 리사이즈 시에도 빈도 조정 반영
  window.addEventListener("resize", scrambleAll);
});




















//hedaer 값 변화
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const mobileNav = document.getElementById("mobileNav");
  const menuBtn = document.getElementById("mobile-menu-toggle");

  let lastScrollY = window.scrollY;
  let isMenuOpen = false;

  // 햄버거 메뉴 클릭 시
  menuBtn.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;

    menuBtn.classList.toggle("active"); // ★ X 애니메이션 클래스 토글
    mobileNav.classList.toggle("active"); // 메뉴 열고 닫기
  });

  // 스크롤 시 header, 메뉴 숨김 처리
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 20) {
      header.classList.add("hide");

      mobileNav.classList.remove("active");
      menuBtn.classList.remove("active"); // ★ X 초기화
      isMenuOpen = false;
    } else {
      header.classList.remove("hide");
    }

    lastScrollY = currentScrollY;
  });
});













































// 노래바
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("backgroundAudio");
  const soundIcon = document.getElementById("soundToggle");
  const equalizer = document.getElementById("equalizer");

  let isMuted = true;

  // 🔒 초기화 시 확실하게 숨기기
  audio.muted = true;
  equalizer.style.display = "none";
  soundIcon.src = "img/header/sound_off.png";

  soundIcon.addEventListener("click", function (e) {
    e.preventDefault();

    isMuted = !isMuted;

    if (!isMuted) {
      audio.muted = false;
      audio.play().then(() => {
        soundIcon.src = "img/header/sound_on.png";
        equalizer.style.display = "flex";
      });
    } else {
      audio.muted = true;
      soundIcon.src = "img/header/sound_off.png";
      equalizer.style.display = "none";
    }
  });
});






// 이글루가 미래다 퓨쳐 섹션 스크롤하다가 핀걸리기
const mm = gsap.matchMedia();

mm.add("(min-width: 481px)", () => {
  ScrollTrigger.create({
    trigger: ".future",
    start: "50% 50%",
    end: "+=40%",
    pin: true,
    pinSpacing: false,
    // markers: true
  });
});







// video
  const video = document.getElementById('bg-video');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.6
  });

  observer.observe(document.querySelector('.future'));



  //solution
  // GSAP ScrollTrigger 플러그인 등록 (필수!)
gsap.registerPlugin(ScrollTrigger);

// DOM 요소들 선택
const listItems = document.querySelectorAll('.solution .list li');
const scrollProgress = document.querySelector('.scroll-progress');

// 각 li 요소에 대해 ScrollTrigger 설정
listItems.forEach((item, index) => {
    // 빛나는 효과 애니메이션
    gsap.timeline({
        scrollTrigger: {
            trigger: item,                    // 트리거할 요소
            start: "top 80%",                // 요소의 상단이 뷰포트 80% 지점에 도달할 때 시작
            end: "bottom 20%",               // 요소의 하단이 뷰포트 20% 지점을 벗어날 때 끝
            toggleActions: "play none none reverse", // 진입시 재생, 나갈때 되감기
            
            // 요소가 화면에 들어올 때
            onEnter: () => {
                item.classList.add('glow');  // 빛나는 클래스 추가
                
                // 스케일 & 투명도 애니메이션
                gsap.fromTo(item, 
                    {
                        scale: 1,          // 시작: 95% 크기
                        opacity: 0.7          // 시작: 70% 투명도
                    },
                    {
                        scale: 1,             // 끝: 100% 크기
                        opacity: 1,           // 끝: 100% 불투명
                        duration: 1,        // 0.8초 동안
                        // ease: "back.out(2.0)" // 탄성 효과
                    }
                );
            },
            
            // 요소가 화면을 벗어날 때
            onLeave: () => {
                item.classList.remove('glow');
            },
            
            // 요소가 다시 화면에 들어올 때 (역방향 스크롤)
            onEnterBack: () => {
                item.classList.add('glow');
            },
            
            // 요소가 다시 화면을 벗어날 때 (역방향 스크롤)
            onLeaveBack: () => {
                item.classList.remove('glow');
            }
        }
    });

    // 개별 요소 등장 애니메이션
    gsap.fromTo(item, 
        {
            y: 100,              // 시작: 아래로 100px 이동
            opacity: 0,          // 시작: 완전 투명
            rotationX: -15       // 시작: X축으로 -15도 회전
        },
        {
            y: 0,                // 끝: 원래 위치
            opacity: 1,          // 끝: 완전 불투명
            rotationX: 0,        // 끝: 회전 없음
            duration: 1,         // 1초 동안
            ease: "power3.out",  // 부드러운 감속
            scrollTrigger: {
                trigger: item,
                start: "top 90%",               // 요소가 뷰포트 90% 지점에 도달할 때
                toggleActions: "play none none reverse"
            }
        }
    );
});

// 스크롤 진행도 표시기 애니메이션
gsap.to(scrollProgress, {
    scaleY: 1,                   // Y축으로 확대 (0에서 1로)
    ease: "none",                // 선형 애니메이션
    scrollTrigger: {
        trigger: "body",         // body 전체를 트리거로
        start: "top top",        // 페이지 최상단에서 시작
        end: "bottom bottom",    // 페이지 최하단에서 끝
        scrub: true              // 스크롤과 동기화 (부드럽게 따라감)
    }
});

// 부드러운 스크롤 설정
gsap.to("body", {
    scrollBehavior: "smooth"
});

// 마우스 호버 인터랙션 효과
listItems.forEach(item => {
    // 마우스 진입 시
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            scale: 1,           // 5% 확대
            duration: 0.3,         // 0.3초 동안
            ease: "power2.out"     // 부드러운 감속
        });
    });

    // 마우스 벗어날 시
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            scale: 1,              // 원래 크기로
            duration: 0.3,         // 0.3초 동안
            ease: "power2.out"     // 부드러운 감속
        });
    });
});
















//security 타이틀 애니메이션 
const securityTitle1 = document.querySelector('.security .inner .topBox .title');
const securityTitle2 = document.querySelector('.security .inner .bottomBox .leftBox .textBox');
const securityTitle3 = document.querySelector('.security .inner .bottomBox .rightBox .textBox');

gsap.timeline({
  scrollTrigger: {
    trigger: securityTitle1,
    start: '50% 80%',
    end: '100% 50%',
    //markers: true
  }
})
.from(securityTitle1, { y: '30%', opacity: 0,})
.from(securityTitle2, { y: '30%', opacity: 0,})
.from(securityTitle3, { y: '30%', opacity: 0,});

// 페이지 로드 시 제목 애니메이션

/* 
=== 주요 GSAP 메서드 설명 ===

1. gsap.registerPlugin(ScrollTrigger)
   - ScrollTrigger 플러그인을 GSAP에 등록

2. gsap.timeline()
   - 여러 애니메이션을 순서대로 실행할 수 있는 타임라인 생성

3. gsap.fromTo(element, startProps, endProps)
   - 시작 상태에서 끝 상태로 애니메이션

4. gsap.to(element, endProps)
   - 현재 상태에서 목표 상태로 애니메이션

5. ScrollTrigger 주요 옵션:
   - trigger: 애니메이션을 트리거할 요소
   - start/end: 언제 시작하고 끝날지
   - toggleActions: 진입/퇴장 시 동작
   - scrub: 스크롤과 애니메이션 동기화
   - onEnter/onLeave: 콜백 함수

6. ease 옵션:
   - "power3.out": 부드러운 감속
   - "back.out": 탄성 효과
   - "elastic.out": 더 강한 탄성 효과
   - "none": 선형 애니메이션
*/

//security 섹션 svg 움직이게하게하기

// script.js

// 1) GSAP & ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  // 2) 모든 SVG path에 대해 dash 세팅 (완전히 숨긴 상태)
  document.querySelectorAll(".svgBox01 path").forEach(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray  = length;
    path.style.strokeDashoffset = length;
  });

  // 3) ScrollTrigger와 타임라인 설정
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".security .inner .topBox",
      start: "top 50%",          
      end: "bottom 10%",          // ".security" bottom이 뷰포트 상단의 10% 지점 도달 시
      toggleActions: "play reverse play reverse",
      // onEnter     → play 애니메이션
      // onLeave     → reverse (리셋)
      // onEnterBack → play
      // onLeaveBack → reverse
    }
  });

  // 4) 순차적으로 path를 그리는 애니메이션 정의
  tl.to(".svgBox01 path", {
    strokeDashoffset: 0,
    duration: 2,
    ease: "power2.out",
    stagger: 0.05
  });
});









// security 섹션 배경


// js/script.js
// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';

/////////////////////////////
// 1) DOM 및 캔버스 셋업
/////////////////////////////
const section   = document.querySelector('.security');
const canvas2d  = document.getElementById('security-canvas');
const ctx2d     = canvas2d.getContext('2d');
const img01     = section.querySelector('.bgBox .img01');  // 3D 캔버스를 붙일 요소
const rightBg   = section.querySelector('.bgBox .img02');  // 2D 토글 이미지

/////////////////////////////
// 2) 2D 픽셀 이펙트 설정
/////////////////////////////
const cellSize     = 20;    // 그리드 셀 크기
const maxSize      = 20;    // 최대 픽셀 크기
const effectRadius = 90;   // 효과 반경

let mousePos   = { x: -9999, y: -9999 }; // 초기 마우스 위치 (화면 밖)
let numThingsX = 0;
let numThingsY = 0;
let things     = [];

// 그리드 데이터 생성
function makeThings() {
  things = [];
  for (let i = 0; i < numThingsY; i++) {
    for (let j = 0; j < numThingsX; j++) {
      things.push({
        x: j * cellSize + cellSize / 2,
        y: i * cellSize + cellSize / 2
      });
    }
  }
}

// 2D 캔버스 크기 조정
function sizeCanvas2d() {
  const rect = section.getBoundingClientRect();
  const dpr  = window.devicePixelRatio || 1;
  canvas2d.width  = rect.width  * dpr;
  canvas2d.height = rect.height * dpr;
  ctx2d.scale(dpr, dpr);

  numThingsX = Math.ceil(rect.width  / cellSize);
  numThingsY = Math.ceil(rect.height / cellSize);
  makeThings();
}

// 2D 루프: 마우스 주변에 픽셀 박스 그리기
function loop2d() {
  ctx2d.clearRect(0, 0, canvas2d.width, canvas2d.height);

  things.forEach(({ x, y }) => {
    const dx   = mousePos.x - x;
    const dy   = mousePos.y - y;
    const dist = Math.hypot(dx, dy);

    if (dist < effectRadius) {
      const size = Math.round(maxSize * (1 - dist / effectRadius));

      // 투명도(알파)를 낮춰 연하게 표현
      ctx2d.fillStyle = 'rgba(0, 235, 225, 0.5)'; // 0.3 → 30% 불투명
      ctx2d.fillRect(
        x - size / 2,
        y - size / 2,
        size,
        size
      );
    }
  });
}


/////////////////////////////
// 3) Three.js 3D 셋업
/////////////////////////////
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(8, 8, 8);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0); // 배경 투명 설정
img01.appendChild(renderer.domElement);  // img01에 3D 캔버스 추가

// 정팔면체 지오메트리 생성 (반지름=2, 디테일=3)
const geometry = new THREE.OctahedronGeometry(4, 2);

// 와이어프레임(Edges) 추가
const edges = new THREE.EdgesGeometry(geometry);
scene.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x707070 })));

// 원형 포인트 텍스처 생성
const spriteSize   = 64;
const spriteCanvas = document.createElement('canvas');
spriteCanvas.width = spriteCanvas.height = spriteSize;
const scCtx = spriteCanvas.getContext('2d');
scCtx.fillStyle = '#fff';
scCtx.beginPath();
scCtx.arc(spriteSize/2, spriteSize/2, spriteSize/2, 0, Math.PI*2);
scCtx.fill();
const spriteTex = new THREE.CanvasTexture(spriteCanvas);

// PointsMaterial로 꼭짓점에 원형 포인트 추가
const pointsMat = new THREE.PointsMaterial({
  map:         spriteTex,
  color:       0x00ebe1,
  size:        0.2,
  transparent: true,
  alphaTest:   0.5
});
scene.add(new THREE.Points(geometry, pointsMat));

// 3D 캔버스 크기 조정
function sizeCanvas3d() {
  const rect = img01.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
}

/////////////////////////////
// 4) 이벤트 및 애니메이션 루프
/////////////////////////////
// RAF 쓰로틀링 유틸
function throttled(fn) {
  let ticking = false;
  return (...args) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        fn(...args);
        ticking = false;
      });
      ticking = true;
    }
  };
}

// 초기 상태 숨김
canvas2d.style.opacity = '0';
rightBg.style.opacity  = '0';

// 마우스 진입 시 2D 보이기
section.addEventListener('mouseenter', () => {
  canvas2d.style.opacity = '1';
});

// 마우스 이동 시 2D/3D 토글
section.addEventListener('mousemove', throttled(evt => {
  const rect = section.getBoundingClientRect();
  mousePos.x = evt.clientX - rect.left;
  mousePos.y = evt.clientY - rect.top;

  loop2d();
  canvas2d.style.opacity = '1';
  rightBg.style.opacity = (mousePos.x > rect.width * 0.7) ? '1' : '1';
}));

// 마우스 벗어날 때 모두 숨김
section.addEventListener('mouseleave', () => {
  ctx2d.clearRect(0, 0, canvas2d.width, canvas2d.height);
  canvas2d.style.opacity = '0';
  rightBg.style.opacity  = '0';
  mousePos.x = mousePos.y = -9999;
});

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', throttled(() => {
  sizeCanvas2d();
  sizeCanvas3d();
}));

// 초기 크기 설정
sizeCanvas2d();
sizeCanvas3d();

// 애니메이션 루프
(function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.005;
  renderer.render(scene, camera);
  loop2d();
})();


//마우스 픽셀 정상화
function resizeCanvas() {
  const section = document.querySelector('.security');
  const canvas  = document.getElementById('security-canvas');
  // 섹션의 실제 렌더링 크기
  const { width, height } = section.getBoundingClientRect();

  // 캔버스 버퍼 크기(픽셀 단위)를 섹션 크기에 맞춰 조정
  canvas.width  = width;
  canvas.height = height;

  // 스타일 크기(CSS 크기)도 섹션 100%로
  canvas.style.width  = width  + 'px';
  canvas.style.height = height + 'px';
}

// 초기화 & 리사이즈 이벤트 바인딩
window.addEventListener('DOMContentLoaded', resizeCanvas);
window.addEventListener('resize', resizeCanvas);




















// contact clock
  function updateClock() {
    const clockEl = document.getElementById('clock');
    if (!clockEl) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');     // 00~23
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 00~59

    clockEl.textContent = `(${hours}:${minutes})`;
  }

  // 페이지 로드 직후 한 번, 이후 1초마다 갱신
  updateClock();
  setInterval(updateClock, 1000);























// script.js

// ——————————————————
// Dimmed overlay helper functions
// ——————————————————
function applyDimmedEffect() {
  const overlay = document.querySelector('.overlay');
  if (overlay) overlay.classList.add('active');
}

function removeDimmedEffect() {
  const overlay = document.querySelector('.overlay');
  if (overlay) overlay.classList.remove('active');
}


// ——————————————————
// Main calendar & popup script
// ——————————————————
document.addEventListener('DOMContentLoaded', () => {
  let currentYear, currentMonth, selectedDate;
  const monthNameSpan = document.querySelector('.month-name');
  const calendarEl    = document.querySelector('.datepicker-calendar');
  const prevBtn       = document.querySelector('.arrow.n1');
  const nextBtn       = document.querySelector('.arrow.n2');
  const timePopup     = document.getElementById('data-detail-popup');
  const timeWrapper   = timePopup.querySelector('.time-wrapper');
  const timeCloseBtns = timePopup.querySelectorAll('.btn-close');
  const timeNextBtn   = document.getElementById('contact-btn');

  // Move reservation popup under <body> to avoid stacking issues
  const reservationPopup = document.getElementById('reservation-detail-popup');
  document.body.appendChild(reservationPopup);
  const resCloseBtn     = reservationPopup.querySelector('.btn-close');
  const calendarWrapper = document.querySelector('.calendar-wrapper');

  // Adjust z-index on mobile
  function setPopupLayer() {
    if (window.innerWidth <= 480) {
      reservationPopup.style.position = 'fixed';
      reservationPopup.style.zIndex   = '99999';
    } else {
      reservationPopup.style.position = '';
      reservationPopup.style.zIndex   = '';
    }
  }
  setPopupLayer();
  window.addEventListener('resize', setPopupLayer);

  initCalendar();

  function initCalendar() {
    const today = new Date();
    currentYear  = today.getFullYear();
    currentMonth = today.getMonth();
    prevBtn.addEventListener('click', () => changeMonth(-1));
    nextBtn.addEventListener('click', () => changeMonth(1));
    renderCalendar();
  }

  function changeMonth(delta) {
    currentMonth = (currentMonth + delta + 12) % 12;
    if (delta === -1 && currentMonth === 11) currentYear--;
    if (delta === 1  && currentMonth === 0)  currentYear++;
    renderCalendar();
  }

  function renderCalendar() {
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    monthNameSpan.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Clear previous days
    Array.from(calendarEl.children).slice(7).forEach(el => el.remove());

    const firstDay    = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const todayStart  = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Empty slots before 1st
    for (let i = 0; i < firstDay; i++) {
      const span = document.createElement('span');
      span.classList.add('day', 'empty');
      calendarEl.appendChild(span);
    }

    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const btn = document.createElement('button');
      btn.textContent = d;
      btn.className   = 'date';
      if (new Date(dateStr) < todayStart) {
        btn.classList.add('faded');
        btn.disabled = true;
      }
      btn.addEventListener('click', onDateClick);
      calendarEl.appendChild(btn);
    }
  }

  function onDateClick(e) {
    if (window.innerWidth > 480) {
      document.body.style.overflow = 'hidden';
    }
    // Deselect previous
    document.querySelectorAll('.date.selected').forEach(b => b.classList.remove('selected'));
    e.currentTarget.classList.add('selected');

    const day = e.currentTarget.textContent.padStart(2, '0');
    selectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2,'0')}-${day}`;

    // Update title
    const titleEl = document.querySelector('.datepicker .titleBox .title');
    if (titleEl) titleEl.textContent = 'Select a Date & Time';

    // Animate close button
    const closeBtn = document.querySelector('.calendar-wrapper #calendar .btn-close');
    if (closeBtn) {
      closeBtn.classList.remove('fade-in');
      closeBtn.classList.add('fade-out');
    }

    // Populate time slots
    const times = ['09:00','10:00','11:00','12:00','13:00','15:00','16:00','17:00'];
    timeWrapper.innerHTML = '';
    times.forEach(t => {
      const b = document.createElement('button');
      b.type         = 'button';
      b.className    = 'time-slot';
      b.dataset.time = t;
      b.textContent  = t;
      b.addEventListener('click', onTimeSlotClick);
      timeWrapper.appendChild(b);
    });

    timeNextBtn.disabled = true;
    openTimePopup();
  }

  function openTimePopup() {
    timePopup.classList.add('show');
    calendarWrapper.classList.add('expanded');
  }

  function onTimeSlotClick(e) {
    timeWrapper.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    timeNextBtn.disabled = false;
  }

  // Close time popup
  timeCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timePopup.classList.remove('show');
      calendarWrapper.classList.remove('expanded');
      document.body.style.overflow = 'auto';

      const titleEl = document.querySelector('.datepicker .titleBox .title');
      if (titleEl) titleEl.textContent = 'Select a Date';

      const closeBtn = document.querySelector('.calendar-wrapper #calendar .btn-close');
      if (closeBtn) {
        closeBtn.classList.remove('fade-out');
        closeBtn.classList.add('fade-in');
      }

      document.querySelectorAll('.date.selected').forEach(d => d.classList.remove('selected'));
      timeWrapper.innerHTML = '';
      timeNextBtn.disabled  = true;
    });
  });

  // Next button → reservation popup
  timeNextBtn.addEventListener('click', () => {
    const sel = timeWrapper.querySelector('.time-slot.selected');
    if (!sel) return;
    document.getElementById('detail-date').textContent = selectedDate;
    document.getElementById('detail-time').textContent = sel.dataset.time;

    timePopup.classList.remove('show');
    calendarWrapper.classList.remove('expanded');

    reservationPopup.classList.add('active');
    applyDimmedEffect();
  });

  // Close reservation popup
  resCloseBtn.addEventListener('click', () => {
    reservationPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.querySelectorAll('.date.selected').forEach(el => el.classList.remove('selected'));
    removeDimmedEffect();
  });
});


// ——————————————————
// 팝업 외부 X 버튼 처리
// ——————————————————
const outerClose = document.querySelector('.reservation-popup .popup-content .btn-close');
if (outerClose) {
  outerClose.addEventListener('click', () => {
    const reservationPopup = document.getElementById('reservation-detail-popup');
    reservationPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
    const titleEl = document.querySelector('.datepicker .titleBox .title');
    if (titleEl) titleEl.textContent = 'Select a Date';
    removeDimmedEffect();
  });
}


// ——————————————————
// 시계 업데이트
// ——————————————————
function updateClock() {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return;
  const now     = new Date();
  const hours   = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  clockEl.textContent = `(${hours}:${minutes})`;
}
updateClock();
setInterval(updateClock, 1000);


// ——————————————————
// 폼 제출 처리
// ——————————————————
const reservationForm = document.getElementById('reservation-form');
if (reservationForm) {
  reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const textInputs = reservationForm.querySelectorAll('input[type="text"]');
    const checkboxes = reservationForm.querySelectorAll('.consent-checkbox');
    let allFilled    = true;
    textInputs.forEach(input => {
      if (input.value.trim() === '') allFilled = false;
    });
    let allChecked = true;
    checkboxes.forEach(cb => {
      if (!cb.checked) allChecked = false;
    });
    if (!allFilled)   return showCustomAlert('모든 항목을 입력해주세요.');
    if (!allChecked)  return showCustomAlert('개인정보 동의에 체크해주시길 바랍니다.');
    showCustomAlert('제출이 완료되었습니다.', 1000);
    reservationForm.reset();
    document.querySelectorAll('.date.selected').forEach(el => el.classList.remove('selected'));
    const reservationPopup = document.getElementById('reservation-detail-popup');
    reservationPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}


// ——————————————————
// 커스텀 alert 함수
// ——————————————————
function showCustomAlert(message, duration = 0) {
  const alertEl   = document.getElementById('custom-alert');
  if (!alertEl) return;

  // 항상 body 맨 끝으로 이동시키고 최상단 z-index 설정
  document.body.appendChild(alertEl);
  alertEl.style.zIndex = '100000';

  const messageEl = document.getElementById('alert-message');
  const okBtn     = document.getElementById('alert-ok');
  if (!messageEl || !okBtn) return;

  messageEl.textContent = message;
  alertEl.style.display = 'flex';

  if (duration > 0) {
    setTimeout(() => {
      alertEl.style.opacity = '0';
      setTimeout(() => {
        alertEl.style.display = 'none';
        alertEl.style.opacity = '1';
      }, 300);
    }, duration);
  }

  okBtn.onclick = () => {
    alertEl.style.opacity = '0';
    setTimeout(() => {
      alertEl.style.display = 'none';
      alertEl.style.opacity = '1';
    }, 300);
  };
}







































/* ----------------------------------------------------- */
/*footer 로그인 버튼 */
document.getElementById("loginButton","inboxing1","inboxing2").addEventListener("click", function() {
  setTimeout(function() {
      if (inboxing1.value === "hong" && inboxing2.value === "12345@gmail.com") {
        showCustomAlert("전송되었습니다.");
      } 
      else if (inboxing1.value === "" || inboxing2.value === "") {
        showCustomAlert("이름이나 이메일이 입력되지 않았습니다.");
      } 
      else {
        showCustomAlert("잘못된 이름 or 이메일입니다.");
      }
  }, 1800); // 3초 후에 alert 창을 띄우기
});

//security 타이틀 애니메이션 
const footerAni = document.querySelector('footer');

gsap.timeline({
  scrollTrigger: {
    trigger: footerAni,
    start: '50% 80%',
    end: '100% 50%',
    toggleClass:('active'),
    //markers: true
  }
})







// fixed 챗봇 js
// [1] 챗봇 열기/닫기 toggle
const toggleBtn = document.getElementById("chatbotToggle");
const chatbot = document.getElementById("chatbotWindow");

toggleBtn.addEventListener("click", () => {
  const isOpen = chatbot.classList.contains("show");

  if (isOpen) {
    chatbot.classList.remove("show");
    chatbot.classList.add("hidden");
    resetChatbot(); // ✅ 닫을 때 초기화
  } else {
    chatbot.classList.remove("hidden");
    chatbot.classList.add("show");
  }
});

// [2] 섹션 전환
const sectionHome = document.querySelector('.section-home');
const sectionChat = document.querySelector('.section-chat');

const homeBtn = document.querySelector('.btn.index');
const chatBtn = document.querySelector('.btn.chat');

chatBtn.addEventListener('click', () => {
  sectionHome.classList.remove('active');
  sectionChat.classList.add('active');
  scrollToBottom(); // 대화창 들어왔을 때 아래로
});

homeBtn.addEventListener('click', () => {
  sectionChat.classList.remove('active');
  sectionHome.classList.add('active');
  resetChatbot(); // 필요시 초기화
});

// [3] < 닫기 버튼들 (.close 전부 처리)
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', e => {
    e.preventDefault();
    sectionChat.classList.remove('active');
    sectionHome.classList.add('active');
    resetChatbot();
  });
});

// [4] "채팅 시작하기" 버튼 클릭 시
const contactBtn = document.querySelector('.contactBox a');
contactBtn.addEventListener('click', function (e) {
  e.preventDefault();
  sectionHome.classList.remove('active');
  sectionChat.classList.add('active');
  scrollToBottom();
});

// [5] 💳 견적 문의 시나리오
document.querySelector('.bot1 .listBox li:nth-child(1) a').addEventListener('click', function (e) {
  e.preventDefault();

  // 유저 응답
  document.getElementById('reply-1').classList.remove('hidden');
  scrollToBottom();

  // 봇 응답
  setTimeout(() => {
    document.getElementById('bot-reply').classList.remove('hidden');
    scrollToBottom();
  }, 1000);

  // 다음 질문
  setTimeout(() => {
    document.getElementById('list-next').classList.remove('hidden');
    scrollToBottom();
  }, 1600);
});

// [6] 스크롤 아래로 이동 (부드럽게)
function scrollToBottom() {
  const chatArea = document.querySelector('.chat-area');
  if (chatArea) {
    chatArea.scrollTo({
      top: chatArea.scrollHeight,
      behavior: 'smooth'
    });
  }
}

// [7] 챗봇 초기화 함수
function resetChatbot() {
  sectionChat.classList.remove('active');
  sectionHome.classList.add('active');

  document.getElementById('reply-1')?.classList.add('hidden');
  document.getElementById('bot-reply')?.classList.add('hidden');
  document.getElementById('list-next')?.classList.add('hidden');

  const input = document.querySelector('.chat-input');
  if (input) input.value = '';

  const chatArea = document.querySelector('.chat-area');
  if (chatArea) chatArea.scrollTo({ top: 0, behavior: 'auto' });
}

// [8] header-home 내부 닫기 버튼
document.querySelector('.header-home .closeBtn .btn-close').addEventListener('click', () => {
  const chatbot = document.getElementById('chatbotWindow');
  chatbot.classList.remove('show');
  chatbot.classList.add('hidden');
  resetChatbot(); // ✅ 초기화 호출
});

// [9] 채팅영역 스크롤 중 여부 감지
const chatArea = document.querySelector('.chat-area');
let scrollTimeout;

chatArea.addEventListener('scroll', () => {
  chatArea.classList.add('scrolling');

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    chatArea.classList.remove('scrolling');
  }, 500); // 0.5초 후 사라짐
});

// ✅ [10] 추가된 닫기 버튼 (.section-chat .chat-header .closeBtn)
const chatHeaderClose = document.querySelector('.section-chat .chat-header .closeBtn');
if (chatHeaderClose) {
  chatHeaderClose.addEventListener('click', () => {
    const chatbot = document.getElementById('chatbotWindow');

    // 1. 먼저 챗봇 창 숨기기
    chatbot.classList.remove('show');
    chatbot.classList.add('hidden');

    // 2. 약간의 시간 차를 두고 초기화 실행 (보이지 않을 때)
    setTimeout(() => {
      resetChatbot();  // ✅ 내부 초기화는 사용자가 못 보게 실행됨
    }, 300); // 0.3초 후 실행 (transition 시간보다 살짝 늦게)
  });
}