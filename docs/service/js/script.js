// Prevent default on empty links
document.addEventListener("click", e => {
  if (e.target.matches('a[href="#"]')) e.preventDefault();
});


$(function() {
	$('.animate').scrolla({
		mobile: true, //모바일버전시 활성화
		once: false //스크롤시 딱 한번만 하고싶을땐 true
});    
}); 





// ----------------[공통요소 : 헤더]------------------------------
gsap.registerPlugin(ScrollTrigger);

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














/* main 글자 이동 */

function activateOnceOnScroll(element) {
  ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    onEnter(self) {
      element.classList.add('active');
      self.kill();    // self가 바로 생성된 ScrollTrigger 인스턴스
    },
    // markers: true,  // 디버깅용
  });
}
activateOnceOnScroll(document.querySelector('header'));



// ---------------[푸터]-----------------------------
/* 로그인 버튼 */
document.getElementById("loginButton","inboxing1","inboxing2").addEventListener("click", function() {
  setTimeout(function() {
      if (inboxing1.value === "12345@gmail.com" && inboxing2.value === "12345") {
        showCustomAlert("로그인 완료");
      } 
      else if (inboxing1.value === "" || inboxing2.value === "") {
        showCustomAlert("아이디나 비밀번호를 입력해주세요.");
      } 
      else {
        showCustomAlert("잘못된 아이디 or 비밀번호입니다.");
      }
  }, 1800); // 3초 후에 alert 창을 띄우기
});

// ✅ 커스텀 alert 함수
function showCustomAlert(message) {
  const alertEl = document.getElementById('custom-alert');
  const messageEl = document.getElementById('alert-message');
  const okBtn = document.getElementById('alert-ok');

  messageEl.textContent = message;
  alertEl.style.display = 'flex';

  okBtn.onclick = () => {
    alertEl.style.opacity = '0';
    setTimeout(() => {
      alertEl.style.display = 'none';
      alertEl.style.opacity = '1'; // 원상 복구
    }, 1000);
  };
}
















// //밤하늘에 별을
class StarryNight {
  constructor() {
      // 1번: getElementById 그대로 사용
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
      // 별자리 효과를 쓰고 싶다면 아래 주석을 해제하세요.
      // this.createConstellations();
  }

  createStars() {
      const numStars = 300;
      
      for (let i = 0; i < numStars; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          
          // 별 크기 랜덤 설정
          const size = Math.random();
          if (size > 0.8) star.classList.add('large');
          else if (size > 0.5) star.classList.add('medium');
          else star.classList.add('small');
          
          // 위치 설정
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          const z = Math.random() * 2000 - 1000; // Z 범위
          
          star.style.left = x + 'px';
          star.style.top = y + 'px';
          star.style.transform = `translateZ(${z}px)`;
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
          angle = 45;
      } else if (direction < 0.5) {
          startX = window.innerWidth * 0.7 + Math.random() * window.innerWidth * 0.3;
          startY = Math.random() * window.innerHeight * 0.3;
          angle = 135;
      } else if (direction < 0.75) {
          startX = Math.random() * window.innerWidth;
          startY = -50;
          angle = 90 + (Math.random() - 0.5) * 30;
      } else {
          startX = window.innerWidth + 50;
          startY = Math.random() * window.innerHeight * 0.6;
          angle = 180 + (Math.random() - 0.5) * 30;
      }
      
      shootingStar.style.left = startX + 'px';
      shootingStar.style.top = startY + 'px';
      shootingStar.style.transform = `rotateZ(${angle}deg)`;
      
      const duration = 2 + Math.random() * 2;
      shootingStar.style.animationDuration = duration + 's';
      
      this.container.appendChild(shootingStar);
      
      setTimeout(() => {
          if (shootingStar.parentNode) {
              shootingStar.parentNode.removeChild(shootingStar);
          }
      }, duration * 1000);
  }

  createConstellations() {
      const constellations = [
          [
              {x:200,y:100},{x:250,y:120},{x:300,y:110},
              {x:350,y:140},{x:320,y:180},{x:280,y:200},{x:240,y:190}
          ]
      ];
      constellations.forEach(constellation => {
          for (let i = 0; i < constellation.length - 1; i++) {
              const line = document.createElement('div');
              line.className = 'constellation-line';
              const [p1, p2] = [constellation[i], constellation[i+1]];
              const length = Math.hypot(p2.x - p1.x, p2.y - p1.y);
              const angle  = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180/Math.PI;
              line.style.left = p1.x + 'px';
              line.style.top  = p1.y + 'px';
              line.style.width = length + 'px';
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
          sparkle.style.left = x + (Math.random()-0.5)*50 + 'px';
          sparkle.style.top  = y + (Math.random()-0.5)*50 + 'px';
          sparkle.style.animation = 'twinkle 0.6s ease-out';
          this.container.appendChild(sparkle);
          setTimeout(() => {
              if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
          }, 600);
      }
  }

  animate() {
      const centerX = window.innerWidth/2;
      const centerY = window.innerHeight/2;
      const deltaX  = (this.mouseX - centerX)/centerX;
      const deltaY  = (this.mouseY - centerY)/centerY;
      
      this.stars.forEach(star => {
          const pm = star.z/200;
          const px = deltaX * pm;
          const py = deltaY * pm;
          const rx = deltaY * (star.z/500);
          const ry = deltaX * (star.z/500);
          star.element.style.transform = `
              translateZ(${star.z}px)
              translateX(${px}px)
              translateY(${py}px)
              rotateX(${rx}deg)
              rotateY(${ry}deg)
          `;
          star.element.style.opacity = Math.max(0.3, 1 - Math.abs(star.z)/1500);
      });
      
      this.container.style.transform = `
          perspective(1000px)
          rotateY(${deltaX*8}deg)
          rotateX(${-deltaY*8}deg)
      `;
      requestAnimationFrame(() => this.animate());
  }
}

// 페이지 로드 후 인스턴스 생성
window.addEventListener('load', () => {
  new StarryNight();
});

// 창 크기 변경 시 새로고침
window.addEventListener('resize', () => {
  location.reload();
});






















// ---------------------------
// 1) Scrooth 클래스 (부드러운 스크롤)
// ---------------------------
class Scrooth {
  constructor({ element = window, strength = 20, acceleration = 1.2, deceleration = 0.975 } = {}) {
    this.element      = element;
    this.distance     = strength;
    this.acceleration = acceleration;
    this.deceleration = deceleration;
    this.running      = false;
    this.element.addEventListener("wheel",      this.scrollHandler.bind(this), { passive: false });
    this.element.addEventListener("mousewheel", this.scrollHandler.bind(this), { passive: false });
    this.scroll = this.scroll.bind(this);
  }
  scrollHandler(e) {
    e.preventDefault();
    if (!this.running) {
      this.top             = window.pageYOffset;
      this.running         = true;
      this.currentDistance = e.deltaY > 0 ? 0.1 : -0.1;
      this.isDistanceAsc   = true;
      this.scroll();
    } else {
      this.isDistanceAsc   = false;
      this.currentDistance = e.deltaY > 0 ? this.distance : -this.distance;
    }
  }
  scroll() {
    if (!this.running) return;
    this.currentDistance *= (this.isDistanceAsc ? this.acceleration : this.deceleration);
    if (Math.abs(this.currentDistance) >= Math.abs(this.distance)) this.isDistanceAsc = false;
    if (!this.isDistanceAsc && Math.abs(this.currentDistance) < 0.1) {
      this.running = false;
      return;
    }
    this.top += this.currentDistance;
    this.element.scrollTo(0, this.top);
    if (window.ScrollTrigger) ScrollTrigger.update();
    requestAnimationFrame(this.scroll);
  }
}

// ---------------------------
// 2) DOMContentLoaded에서 초기화
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 부드러운 스크롤 활성화
  new Scrooth({ element: window, strength: 25, acceleration: 1.85, deceleration: 0.85 });

  // SVG 래퍼 & paths & 마커 템플릿
  const wrapper      = document.querySelector(".svgLine .svg-wrapper");
  const staticPath   = wrapper.querySelector("path.static");
  const animatedPath = wrapper.querySelector("path.animated");
  const glowPath     = wrapper.querySelector("path.glow");
  const template     = wrapper.querySelector(".start-marker");
  if (!wrapper || !staticPath || !animatedPath || !glowPath || !template) return;

  // 2-1) path 길이 계산 & dash 세팅
  const length = animatedPath.getTotalLength();
  [animatedPath, glowPath].forEach(p => {
    p.style.strokeDasharray  = length;
    p.style.strokeDashoffset = length;
  });

  // 2-2) viewBox → 픽셀 비율 계산
  const svgEl  = wrapper.querySelector("svg");
  const vb     = svgEl.viewBox.baseVal;
  const scaleX = wrapper.clientWidth  / vb.width;
  const scaleY = wrapper.clientHeight / vb.height;

  // 2-3) 마커 데이터 정의 (pct, className, html)
  const markersData = [
    {
      pct:       0.0,
      className: "founding",
      html:      `
        <div class="marker-circle"></div>
        <div class="marker-label">
          <p class="text en2">Founding of<span class="en2">IGLOO</span></p>
        </div>`
    },
    {
      pct:       0.2,
      className: "phase2",
      html:      `
        <div class="marker-circle"></div>
        <div class="maker-img">
          <img src="img/list/Listicon01.png" alt="list01">
        </div>
        <div class="marker-label">
          <p class="title">보안 관제 서비스</p>
          <p class="text"><span>·</span> 24시간 365일 사이버 위협 대응</p>
          <p class="text"><span>·</span> 지능형 통합 보안관제 서비스</p>
        </div>`
    },
    {
      pct:       0.35,
      className: "phase7",
      html:      `
        <div class="marker-circle"></div>
        <div class="maker-img">
          <img src="img/list/Listicon02.png" alt="list02">
        </div>
        <div class="marker-label">
          <p class="title">보안 컨설팅</p>
          <p class="text"><span>·</span> 최고의 역량과 풍부한 경험을 보유</p>
          <p class="text"><span>·</span> 이글루 코퍼레이션 정보보안 컨설팅</p>
        </div>`
    },
    {
      pct:       0.46,
      className: "phase8",
      html:      `
        <div class="marker-circle"></div>
        <div class="maker-img">
          <img src="img/list/Listicon03.png" alt="list03">
        </div>
        <div class="marker-label">
          <p class="title">침해사고 분석</p>
          <p class="text"><span>·</span> 침해사고 원인 분석 부터 보안 강화 로드맵</p>
          <p class="text"><span>·</span> 국내외 침해사고 역량 기반의 사고분석</p>
          <p class="text last">서비스 제공</p>
        </div>`
    },
    {
      pct:       0.58,
      className: "phase6",
      html:      `
        <div class="marker-circle"></div>
        <div class="maker-img">
          <img src="img/list/Listicon04.png" alt="list04">
        </div>
        <div class="marker-label">
          <p class="title">악성메일 모의훈련</p>
          <p class="text"><span>·</span> 임직원의 보안인식 제고를 위한 악성메일</p>
          <p class="text last">대응 모의훈련 서비스</p>
        </div>`
    },
    {
      pct:       0.69,
      className: "phase4",
      html:      `
        <div class="marker-circle"></div>
        <div class="maker-img">
          <img src="img/list/Listicon05.png" alt="list05">
        </div>
        <div class="marker-label">
          <p class="title">AI 보안 어시스턴스</p>
          <p class="text"><span>·</span> 보안 담당자의 업무 역량을 높여주는</p>
          <p class="text last">AI 보안 어시스턴트</p>
        </div>`
    },
    {
      pct:       0.8,
      className: "phase9",
      html:      `
        <div class="marker-circle"></div>
        <div class="maker-img">
          <img src="img/list/Listicon06.png" alt="list06">
        </div>
        <div class="marker-label">
          <p class="title">위협 인텔리전스(CTI)</p>
          <p class="text"><span>·</span> 최신 보안 위협과 공격 기법에 대한 핵심 정보를 제공하는</p>
          <p class="text last">위협인텔리전스(CTI, Cyber Threat Intelligence)</p>
        </div>`
    },
    {
      pct:       0.918,
      className: "phase5",
      html:      `
        <div class="marker-circle"></div>
        <div class="maker-img">
          <img src="img/list/Listicon07.png" alt="list07">
        </div>
        <div class="marker-label">
          <p class="title">이글루 스쿨</p>
          <p class="text"><span>·</span> 임직원 역량 강화와 고객서비스 만족 향상</p>
          <p class="text"><span>·</span> 이글루 코퍼레이션 자체 교육 프로그램</p>
        </div>`
    },
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const phase2Elements = document.querySelectorAll('.phase2');
  
    if (phase2Elements.length >= 2) {
      phase2Elements[1].classList.add('only-second-phase2');
    }
  });
  


  // 2-4) 항상 보이는 static connectors 추가
  markersData.forEach(({ pct }) => {
    const pt   = animatedPath.getPointAtLength(length * pct);
    const line = document.createElement("div");
    line.className = "static-connector";
    line.style.left = `${pt.x * scaleX}px`;
    line.style.top  = `${pt.y * scaleY}px`;
    wrapper.appendChild(line);
  });

  // 2-5) 마커 템플릿 숨기기
  template.style.display = "none";

  // 2-6) 마커 복제 → 위치 세팅 → 초기 숨김 → DOM 삽입
  const markers = markersData.map(({ pct, html, className }) => {
    const el = template.cloneNode(true);
    el.style.display = "";
    el.classList.add(className);
    el.innerHTML = html;
  
    const pt = animatedPath.getPointAtLength(length * pct);
    el.style.position = "absolute";
    el.style.left = `${pt.x * scaleX}px`;
    el.style.top = `${pt.y * scaleY}px`;
  
    const imgBox = el.querySelector(".maker-img");
    if (imgBox) imgBox.style.setProperty("--connector-height", "0px");
  
    gsap.set(el, { opacity: 0 });
    wrapper.appendChild(el);
    return { el, imgBox, pct };
  });
  
  // ✅ 여기에 정확히 넣어야 함!
  const phase2Els = markers
    .map(marker => marker.el)
    .filter(el => el.classList.contains("phase2"));
  
  if (phase2Els.length >= 2) {
    phase2Els[1].classList.add("only-second-phase2");
  }

  // 초기 상태 세팅
  gsap.set([staticPath, animatedPath, glowPath], { opacity: 0 });
  gsap.set(wrapper, { transformPerspective: 1000 });

  function reset() {
    gsap.set([staticPath, animatedPath, glowPath], { opacity: 0 });
    markers.forEach(({ el, imgBox }) => {
      gsap.set(el, { opacity: 0 });
      if (imgBox) imgBox.style.setProperty("--connector-height", "0px");
    });
    [animatedPath, glowPath].forEach(p => gsap.set(p, { strokeDashoffset: length }));
  }

  // ---------------------------
  // 3) ScrollTrigger 타임라인
  // ---------------------------
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger:     ".svgLine",
      start:       "top bottom-=10%",
      end:         "bottom 90%",
      scrub:       1,
      markers:     false,
      onLeaveBack: reset
    }
  });

  // 3-a) staticPath 항상 보이기
  tl.to(staticPath, { opacity: 0.2, duration: 0 }, 0);

  // 3-b) animated + glow 드로잉
  tl.set([animatedPath, glowPath], { opacity: 1 }, 0)
    .to([animatedPath, glowPath], { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);

  // 3-c) 각 마커 등장 & animated connector 단번에 올라가기
  markers.forEach(({ el, imgBox, pct }) => {
    // 마커 등장
    tl.to(el, { opacity: 1, duration: 0 }, pct);

    // animated connector: 단번에 134px 로 올라가도록 fromTo 대신 set
    if (imgBox) {
      tl.set(imgBox, { "--connector-height": "134px" }, pct);
    }
  });




  //마커 위로 올라가기 1024반응형

  let connectorHeight;
  const width = Math.floor(window.innerWidth);
  
  if (width < 481) {
    connectorHeight = "30px";
  } else if (width <= 768) {
    connectorHeight = "80px";
  } else if (width <= 1024) {
    connectorHeight = "95px";
  } else {
    connectorHeight = "134px";
  }
  
  markers.forEach(({ el, imgBox, pct }) => {
    tl.to(el, { opacity: 1, duration: 0 }, pct);
  
    if (imgBox) {
      tl.set(imgBox, { "--connector-height": connectorHeight }, pct);
    }
  });
  



  // 3-d) 3D tilt & zoom-out
  tl.to(wrapper, { scale: 1, rotationX: 0, z: 0, ease: "power1.out", duration: 0.4 }, 0.6)
    // .to(wrapper, { scale: 1, z: -250, ease: "power3.inOut", duration: 0.2 }, 0.8);
});

















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




	  $(function(){Splitting();});
  // ✅ DOM이 완전히 준비된 후 실행
window.addEventListener('DOMContentLoaded', () => {
  Splitting();
});