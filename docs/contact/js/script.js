$(document).on('click', 'a[href="#"]', e => e.preventDefault());


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






const liveElement = document.getElementById('questions');
function wrapTextInSpans(targetElement) {
    if (targetElement) {
        const text = targetElement.textContent;
        targetElement.innerHTML = '';
        for (let character of text) {
            const span = document.createElement('span');
            if (character === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.textContent = character;
            }
            targetElement.appendChild(span);
        }
    }
}
wrapTextInSpans(liveElement);











//visual effct
// script.js
// 1) 캔버스 초기화
const canvas = document.getElementById('waveCanvas');
const ctx    = canvas.getContext('2d');
let W, H;
function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// 2) 파동 초기 크기
const baseAmplitude = 30;
let waveAmplitude  = baseAmplitude;

// 3) 스크롤에 따라 파동 세기와 캔버스 y-offset 조정
window.addEventListener('scroll', () => {
  const scrollY   = window.pageYOffset || document.documentElement.scrollTop;
  const maxScroll = window.innerHeight;
  const p         = Math.min(scrollY / maxScroll, 1);

  // 파동 세기 감소 (1→0)
  waveAmplitude = baseAmplitude * (1 - p);

  // 캔버스 위로만 이동 (최대 20vh), 스케일 고정(1)
  const yOff = -p * 0.5 * H;
  canvas.style.transform = `translateY(${yOff}px) scale(1.1)`;
});

// 4) 배경 이미지 로드 및 애니메이션 루프
const img = new Image();
img.src = 'img/visual/visualBg.png';
img.onload = () => requestAnimationFrame(draw);

let time = 0;
function draw() {
  time += 0.02;

  // 캔버스 클리어
  ctx.fillStyle = '#010B12';
  ctx.fillRect(0, 0, W, H);

  const sliceW  = 4;
  const waveLen = Math.PI * 2;
  const speed   = 0.5;

  // 캔버스 높이에 맞춰 이미지 슬라이스 폭 계산
  const scaleY    = H / img.height;
  const srcSliceW = sliceW / scaleY;

  // x축 전체를 sliceW 단위로 순회하며 y축 변위
  for (let x = 0; x < W; x += sliceW) {
    const norm = x / W;
    const dy   = Math.sin(norm * waveLen + time * speed) * waveAmplitude;
    const sx   = norm * (img.width - srcSliceW);

    ctx.drawImage(
      img,
      sx, 0,               // 소스 x,y
      srcSliceW, img.height,  // 소스 width,height
      x, dy,               // 대상 x,y
      sliceW, H            // 대상 width,height
    );
  }

  requestAnimationFrame(draw);
}














































//------------------------------[contactUs]-------------------------------------
/* 스크롤라 타이틀 */
$(function(){
  $('.animate').scrolla({
      mobile: true,
      once:true
  })
});








// 캘린더 여는 버튼
// 캘린더 열기
$(document).ready(function () {
  $(".contactBtn").on("click", function () {
    $(".calendar-wrapper").addClass("active");
    applyDimmedEffect();
    disableScroll();
  });

  $(".calendar-wrapper #contact-btn").on("click", function () {
    $(".calendar-wrapper").removeClass("active");
    removeDimmedEffect();
    enableScroll();
  });

  $(".datepicker .datepicker-top .titleBox .btn-close").on("click", function () {
    $(".calendar-wrapper").removeClass("active");
    removeDimmedEffect();
    enableScroll();
  });
});

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = 'auto';
}

function applyDimmedEffect() {
  document.querySelectorAll('.contactUsInner > *').forEach(el => {
    if (!el.classList.contains('calendar-wrapper') && el.id !== 'reservation-detail-popup') {
      el.classList.add('dimmed-item');
    }
  });
}

function removeDimmedEffect() {
  document.querySelectorAll('.contactUsInner > .dimmed-item').forEach(el => {
    el.classList.remove('dimmed-item');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let currentYear, currentMonth, selectedDate;
  const monthNameSpan = document.querySelector('.month-name');
  const calendarEl = document.querySelector('.datepicker-calendar');
  const prevBtn = document.querySelector('.arrow.n1');
  const nextBtn = document.querySelector('.arrow.n2');
  const timePopup = document.getElementById('data-detail-popup');
  const timeWrapper = timePopup.querySelector('.time-wrapper');
  const timeCloseBtns = timePopup.querySelectorAll('.btn-close');
  const timeNextBtn = document.getElementById('contact-btn');
  const reservationPopup = document.getElementById('reservation-detail-popup');
  const resCloseBtn = reservationPopup.querySelector('.btn-close');
  const calendarWrapper = document.querySelector('.calendar-wrapper');

  initCalendar();

  function initCalendar() {
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    prevBtn.addEventListener('click', () => changeMonth(-1));
    nextBtn.addEventListener('click', () => changeMonth(1));
    renderCalendar();
  }

  function changeMonth(delta) {
    currentMonth = (currentMonth + delta + 12) % 12;
    if (delta === -1 && currentMonth === 11) currentYear--;
    if (delta === 1 && currentMonth === 0) currentYear++;
    renderCalendar();
  }

  function renderCalendar() {
    monthNameSpan.textContent =
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][currentMonth]
      + ' ' + currentYear;

    Array.from(calendarEl.children).slice(7).forEach(el => el.remove());

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDay; i++) {
      const span = document.createElement('span');
      span.classList.add('day', 'empty');
      calendarEl.appendChild(span);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const btn = document.createElement('button');
      btn.textContent = d;
      btn.className = 'date';
      if (new Date(dateStr) < todayStart) {
        btn.classList.add('faded');
        btn.disabled = true;
      }
      btn.addEventListener('click', onDateClick);
      calendarEl.appendChild(btn);
    }
  }

  function onDateClick(e) {
    document.querySelectorAll('.date.selected').forEach(b => b.classList.remove('selected'));
    e.currentTarget.classList.add('selected');

    const day = e.currentTarget.textContent.padStart(2, '0');
    selectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${day}`;

    const titleEl = document.querySelector('.datepicker .titleBox .title');
    if (titleEl) titleEl.textContent = 'Select a Date & Time';

    const closeBtn = document.querySelector('.calendar-wrapper #calendar .btn-close');
    if (closeBtn) {
      closeBtn.classList.remove('fade-in');
      closeBtn.classList.add('fade-out');
    }

    const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00'];
    timeWrapper.innerHTML = '';
    times.forEach(t => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'time-slot';
      b.dataset.time = t;
      b.textContent = t;
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

  timeCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timePopup.classList.remove('show');
      calendarWrapper.classList.remove('expanded');

      const titleEl = document.querySelector('.datepicker .titleBox .title');
      if (titleEl) titleEl.textContent = 'Select a Date';

      const closeBtn = document.querySelector('.calendar-wrapper #calendar .btn-close');
      if (closeBtn) {
        closeBtn.classList.remove('fade-out');
        closeBtn.classList.add('fade-in');
      }

      document.querySelectorAll('.date.selected').forEach(d => d.classList.remove('selected'));
      timeWrapper.innerHTML = '';
      timeNextBtn.disabled = true;
    });
  });

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

  resCloseBtn.addEventListener('click', () => {
    reservationPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.querySelectorAll('.date.selected').forEach(el => el.classList.remove('selected'));
    removeDimmedEffect();
  });
});

document.querySelector('.reservation-popup .popup-content .btn-close').addEventListener('click', () => {
  document.getElementById('reservation-detail-popup').classList.remove('active');
  document.body.style.overflow = 'auto';

  const titleEl = document.querySelector('.datepicker .titleBox .title');
  if (titleEl) titleEl.textContent = 'Select a Date';
  removeDimmedEffect();
});

function updateClock() {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return;
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  clockEl.textContent = `(${hours}:${minutes})`;
}
updateClock();
setInterval(updateClock, 1000);

const reservationForm = document.getElementById('reservation-form');
reservationForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const textInputs = reservationForm.querySelectorAll('input[type="text"]');
  const checkboxes = reservationForm.querySelectorAll('.consent-checkbox');
  let allFilled = [...textInputs].every(input => input.value.trim() !== '');
  let allChecked = [...checkboxes].every(checkbox => checkbox.checked);

  if (!allFilled) return showCustomAlert('모든 항목을 입력해주세요.');
  if (!allChecked) return showCustomAlert('개인정보 동의에 체크해주시길 바랍니다.');

  showCustomAlert('제출이 완료되었습니다.', 1000);
  reservationForm.reset();
  document.querySelectorAll('.date.selected').forEach(el => el.classList.remove('selected'));
  document.getElementById('reservation-detail-popup').classList.remove('active');
  document.body.style.overflow = 'auto';
  removeDimmedEffect();
});


// ✅ 흐림 효과 함수
function applyDimmedEffect() {
  document.querySelectorAll('.contactUsInner > *').forEach(el => {
    if (!el.classList.contains('calendar-wrapper') && el.id !== 'reservation-detail-popup') {
      el.classList.add('dimmed-item');
    }
  });
}

function removeDimmedEffect() {
  document.querySelectorAll('.contactUsInner > .dimmed-item').forEach(el => {
    el.classList.remove('dimmed-item');
  });
}

$(document).ready(function () {
  $(".contactBtn").on("click", function () {
    $(".calendar-wrapper").addClass("active");
    applyDimmedEffect();
    disableScroll();
  });

  $(".calendar-wrapper #contact-btn").on("click", function () {
    $(".calendar-wrapper").removeClass("active");
    $("#reservation-detail-popup").addClass("active");
    applyDimmedEffect();
    enableScroll();
  });

  $(".datepicker .datepicker-top .titleBox .btn-close").on("click", function () {
    $(".calendar-wrapper").removeClass("active");
    removeDimmedEffect();
    enableScroll();
  });

  $(".reservation-popup .popup-content .btn-close").on("click", function () {
    $("#reservation-detail-popup").removeClass("active");
    removeDimmedEffect();
    enableScroll();
  });
});

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = 'auto';
}

function updateClock() {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return;
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  clockEl.textContent = `(${hours}:${minutes})`;
}
updateClock();
setInterval(updateClock, 1000);

// ✅ CSS 추가도 잊지 마세요
// .dimmed-item { opacity: 0.2; transition: opacity 0.3s ease; }



























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