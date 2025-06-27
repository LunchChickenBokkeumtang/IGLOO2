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
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const inner = header.querySelector('.inner');
  const currentScrollY = window.scrollY;

  if (currentScrollY > 0) {
    header.classList.add('scrolled');

    if (currentScrollY > lastScrollY) {
      // 스크롤 ↓ 아래로 → header 숨김
      header.classList.add('hide');
    } else {
      // 스크롤 ↑ 위로 → header 보여줌
      header.classList.remove('hide');
    }

  } else {
    // 처음 위치일 때 초기화
    header.classList.remove('hide');
  }

  lastScrollY = currentScrollY;
}); 

/* main 글자 이동 */

function activateOnceOnScroll(element) {
  ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    onEnter(self) {
      element.classList.add('active');
      self.kill();    // 여기서 this나 self.kill 로 바로 인스턴스를 종료
    },
    // markers: true,
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
        showCustomAlert("이름과 메일주소를 입력해주세요.");
      } 
      else {
        showCustomAlert("잘못된 이름 or 이메일 주소입니다.");
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



















//밤하늘에 별을
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











// --------------------------[visual 섹션]----------------------------------------
	  $(function(){Splitting();});
    // ✅ DOM이 완전히 준비된 후 실행
window.addEventListener('DOMContentLoaded', () => {
  Splitting();
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
          <p class="title en2">SPiDER ExD</p>
          <div class="text01">
            <p class="text"><span>·</span> 보안 운영 및 분석, 위협 대응 업무의</p>
            <p class="text last">효율성을 극대화</p>
          </div>
          <div class="text01">
            <p class="text"><span>·</span> XDR(확장형 탐지·대응) 기반 차세대</p>
            <p class="text last">보안 플랫폼</p>
          </div>
        </div>`
    },
    {
      pct:       0.35,
      className: "phase3",
      html:      `
        <div class="marker-circle"></div>
        <div class="maker-img">
          <img src="img/list/Listicon02.png" alt="list02">
        </div>
        <div class="marker-label">
          <p class="title en2">SPiDER SOAR</p>
          <p class="text"><span>·</span> 국내보안 환경에 최적화된 자동화기능</p>
          <p class="text"><span>·</span> 보안 운영/위협 대응 자동화 솔루션</p>
        </div>`
    },
    {
      pct:       0.46,
      className: "phase2",
      html:      `
        <div class="marker-circle"></div>
        <div class="maker-img">
          <img src="img/list/Listicon03.png" alt="list03">
        </div>
        <div class="marker-label">
          <p class="title en2">SPiDER TM</p>
          <div class="text01">
            <p class="text"><span>·</span> 보안관제 수행 경험 및 빅 데이터 활용</p>
            <p class="text last">역량 집약</p>
          </div>
          <p class="text"><span>·</span> 보안 정보 및 이벤트관리(SIEM)솔루션</p>
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
          <p class="title en2">SPiDER TM AI Edition</p>
          <p class="text"><span>·</span> 보안관제 수행 경험 및 빅 데이터 활용 역량 집약</p>
          <p class="text"><span>·</span> 보안 정보 및 이벤트관리(SIEM)솔루션</p>
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
          <p class="title en2">SPiDER OT</p>
          <p class="text"><span>·</span> 스마트 선박·스마트 시티·스마트 빌딩·스마트</p>
          <p class="text last">팩토리에 최적화</p>
          <p class="text"><span>·</span> 보안 정보 및 이벤트관리(SIEM)솔루션</p>
        </div>`
    },
    {
      pct:       0.8,
      className: "phase4",
      html:      `
        <div class="marker-circle"></div>
        <div class="maker-img">
          <img src="img/list/Listicon06.png" alt="list06">
        </div>
        <div class="marker-label">
          <p class="title en2">SPiDER Logbox</p>
          <p class="text"><span>·</span> 모든 시스템의 원본로그의 저장과 분석, 관리, 모니터링</p>
          <p class="text"><span>·</span> 일원화된 로그관리 환경제공하는 빅데이터 기반의</p>
          <p class="text last">통합로그관리솔루션</p>
        </div>`
    },
    {
      pct:       0.918,
      className: "phase3",
      html:      `
        <div class="marker-circle"></div>
        <div class="maker-img">
          <img src="img/list/Listicon07.png" alt="list07">
        </div>
        <div class="marker-label">
          <p class="title en2">Smart [Guard]</p>
          <p class="text"><span>·</span> 온프레미스, 하이브리드·멀티 클라우드 환경</p>
          <p class="text"><span>·</span> 자산 위협 관리·보안 진단 자동화 솔루션</p>
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




























// footer

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