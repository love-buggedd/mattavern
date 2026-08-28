import Fuse from "fuse.js";

// firebase
/* global firebase */
firebase.initializeApp({
  apiKey: "AIzaSyD4yKI62hSUA0vr3Peq6oDsBGFyqmd93Fo",
  authDomain: "mat-tavern.firebaseapp.com",
  databaseURL: "https://mat-tavern-default-rtdb.firebaseio.com",
  projectId: "mat-tavern",
  storageBucket: "mat-tavern.firebasestorage.app",
  messagingSenderId: "585863762633",
  appId: "1:585863762633:web:ab65945e91015f0010f318",
});

const auth = firebase.auth();
const db = firebase.database();

// game data
const GAMES = [
  {
    name: "ADGAC",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/lprktbhxokaetxuhnh.html",
  },
  {
    name: "Anton Blast",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/xxj.html",
  },
  {
    name: "Baldi Plus",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/mhybkqfjutvztmwsrcvlh.html",
  },
  {
    name: "Baldi Remaster",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/dspea.html",
  },
  {
    name: "Balls and Bricks",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/shajlo.html",
  },
  {
    name: "Basket Random",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/guiavbie.html",
  },
  {
    name: "Bendy",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/voqqslhfqwrgjesmoskvf.html",
  },
  {
    name: "Blood Money",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/ezfuhixglg.html",
  },
  {
    name: "Boxing Random",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/iopa.html",
  },
  {
    name: "Bridge Race",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/lvkvuvjddfaqefuhoykpbjo.html",
  },
  {
    name: "Buckshot Roulette",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/rmdcxnngcyobfbhyobvi.html",
  },
  {
    name: "Cappy Cafe",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/wctvyopiopsvhuio.html",
  },
  {
    name: "Celeste",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/r.html",
  },
  {
    name: "Chop It Up (Driving)",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/cupavopvoiosgabji.html",
  },
  {
    name: "Class of '09",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/eywuebqmvrvmdgdoj.html",
  },
  {
    name: "Clover Pit",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/iduwssuflrmqokamtdoqnh.html",
  },
  {
    name: "Dead Plate",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/exzuyfiiruktyohwh.html",
  },
  {
    name: "DELTARUNE",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/hbibw.html",
  },
  {
    name: "Don't Take This Cat Home",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/s.html",
  },
  {
    name: "Dragon Fist",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/ehbujiv.html",
  },
  {
    name: "Duck Clicker",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/tgerfhjnuik.html",
  },
  {
    name: "Dumb Ways to Die",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/gkpeurfunz.html",
  },
  {
    name: "Dune Dash",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/huiogahbgijanga.html",
  },
  {
    name: "FNAE",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/gjmjmbgdkxfhtcjftzqzir.html",
  },
  {
    name: "FNAF 1",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/nllkxxdrwdcchhfsnt.html",
  },
  {
    name: "FNAF 2",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/rc.html",
  },
  {
    name: "FNAF 3",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/gpapkmmfprdsnzmdyrj.html",
  },
  {
    name: "FNAF 4",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/y.html",
  },
  {
    name: "FNAF 4: Halloween Ed.",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/ldknouazxagjmellnrfaji.html",
  },
  {
    name: "FNAF World",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/uzpfdcrsagpfuprgsj.html",
  },
  {
    name: "FNAF: Pizza Sim",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/gjcgrysvapjcfgwnzoofo.html",
  },
  {
    name: "FNAF: Sister Location",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/xelvomnn.html",
  },
  {
    name: "FNAF: UCN",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/dedyfchzvbxducqmuxpv.html",
  },
  {
    name: "Getaway Shooter",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/hjiopas.html",
  },
  {
    name: "Gun Mayhem",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/kadcafhnuilunkih.html",
  },
  {
    name: "Gun Mayhem 2",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/tvywounio.html",
  },
  {
    name: "Gun Mayhem Redux",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/bsgvios.html",
  },
  {
    name: "Hollow Knight",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/yamyc.html",
  },
  {
    name: "Human Expenditure Program",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/oadmhknhjmpecnc.html",
  },
  {
    name: "Iron Lung",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/htrwpuffpvwehmzrnyxci.html",
  },
  {
    name: "Kindergarten",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/mt.html",
  },
  {
    name: "Minesweeper",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/xhcsjmkfdznflljsavk.html",
  },
  {
    name: "Peaks of Yore",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/jkzmrfnxxptzeieykpc.html",
  },
  {
    name: "People Playground",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/txguhutdbvmxrzqozfnuqdcc.html",
  },
  {
    name: "Pico School",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/wsefcvbhsblfidbngc.html",
  },
  {
    name: "Raldi",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/dlryazywezvr.html",
  },
  {
    name: "REPO",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/xifhvwwglvigdpiloyfcny.html",
  },
  {
    name: "Rooftop Run",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/bjs.html",
  },
  {
    name: "Saihate Station",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/ydlpoidubyzn.html",
  },
  {
    name: "Sandtrix",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/zghhj.html",
  },
  {
    name: "Schoolboy Runaway",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/eduibduj.html",
  },
  {
    name: "Slope",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/ahjiopg.html",
  },
  {
    name: "Soccer Random",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/ghaujibnf.html",
  },
  {
    name: "Soft & Wet",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/hibscdfnxjiqvwszwn.html",
  },
  {
    name: "Tetris",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/thui.html",
  },
  {
    name: "ULTRAKILL",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/fyebebclefubo.html",
  },
  {
    name: "Undertale",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/aubkfkp.html",
  },
  {
    name: "Volley Random",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/vahuioghia.html",
  },
  {
    name: "We Become What We Behold",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/cbjksf.html",
  },
  {
    name: "Yume Nikki",
    desc: "No description.",
    url: "https://mattavern.netlify.app/ports/external-ports/mvrot.html",
  },
];

// silly particles
function initParticles(container, opts = {}) {
  const { count = 80, speed = 1.8, connectDist = 200, mouseDist = 250 } = opts;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;";
  container.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let W,
    H,
    particles,
    running = true;
  const mouse = { x: null, y: null };

  function resize() {
    const r = container.getBoundingClientRect();
    W = canvas.width = r.width;
    H = canvas.height = r.height;
  }

  function rand(a, b) {
    return Math.random() * (b - a) + a;
  }

  function spawn() {
    particles = Array.from({ length: count }, () => ({
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-speed, speed),
      vy: rand(-speed, speed),
    }));
  }

  function tick() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(157,125,255,0.6)";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x,
          dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < connectDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(123,108,246,${0.25 * (1 - d / connectDist)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      if (mouse.x !== null) {
        const dx = p.x - mouse.x,
          dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < mouseDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(123,108,246,${0.4 * (1 - d / mouseDist)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(tick);
  }

  function onMouseMove(e) {
    const r = container.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  }
  function onMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }
  function onResize() {
    const r = container.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    resize();
    spawn();
  }

  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("mouseleave", onMouseLeave);
  window.addEventListener("resize", onResize);

  resize();
  spawn();
  tick();

  return function stop() {
    running = false;
    container.removeEventListener("mousemove", onMouseMove);
    container.removeEventListener("mouseleave", onMouseLeave);
    window.removeEventListener("resize", onResize);
  };
}

// login & authentication
function buildLogin() {
  const overlay = document.createElement("div");
  overlay.id = "login-overlay";
  overlay.innerHTML = `
        <div id="login-group">
            <div id="login-card">
                <button id="info-button" title="Info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </button>
                <h2 id="login-title">Mät Tavern</h2>
                <p id="login-subtitle">BORED LOGIN PAGE</p>
                <input id="login-username" type="text" placeholder="Username" autocomplete="username">
                <input id="login-password" type="password" placeholder="Password" autocomplete="current-password">
                <button id="login-btn">Enter</button>
                <p id="login-error"></p>
            </div>
            <div id="info-panel">
                <button id="info-close" title="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                <div id="info-panel-inner">
                    <div id="info-content">
                        <h1>About This Site</h1>
                        <p>The <b>Mät Tavern</b> is a secure site created by <code>Matt E.</code>.</p>
                        <h1>A Login Page</h1>
                        <p>Well, this is a <b>private website</b> that is only accessible to <code>authorized users</code>.</p>
                        <p>Use the login provided to you to gain access.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.body.appendChild(overlay);

  const stop = initParticles(overlay);

  const loginBtn = overlay.querySelector("#login-btn");
  const usernameInput = overlay.querySelector("#login-username");
  const passwordInput = overlay.querySelector("#login-password");
  const errorEl = overlay.querySelector("#login-error");

  const loginErr = [
    "I'm sorry, who are you again?",
    "That doesn't seem to be quite right.",
    "Maybe you should check that again.",
    "Are you sure that's correct?",
    "Hmm, that doesn't look right.",
    "I don't think that's the right one.",
    "That seems to be incorrect.",
    "Oops! That doesn't seem to work.",
    "Are you sure you entered that correctly?",
    "Hmm, that doesn't match our records.",
  ];

  async function login() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if (!username || !password) return;

    loginBtn.disabled = true;
    errorEl.textContent = "";

    try {
      const snap = await db.ref("users/" + username + "/email").get();
      if (!snap.exists()) {
        errorEl.textContent =
          loginErr[Math.floor(Math.random() * loginErr.length)];
        loginBtn.disabled = false;
        return;
      }
      currentUsername = username;
      const cred = await auth.signInWithEmailAndPassword(snap.val(), password);
      const uid = cred.user.uid;
      // first-login plumbing — non-blocking
      db.ref(`users/${username}/uid`).transaction((cur) =>
        cur === null ? uid : undefined,
      );
      db.ref(`uid_to_username/${uid}`).set(username);
      db.ref(`profiles/${uid}`)
        .get()
        .then((ps) => {
          if (!ps.exists())
            db.ref(`profiles/${uid}`).set({
              displayUsername: username,
              usernameHistory: [username],
            });
        });
    } catch (err) {
      currentUsername = null;
      errorEl.textContent =
        loginErr[Math.floor(Math.random() * loginErr.length)];
      console.error(err);
      loginBtn.disabled = false;
    }
  }

  const group = overlay.querySelector("#login-group");
  const infoBtn = overlay.querySelector("#info-button");
  const infoClose = overlay.querySelector("#info-close");

  infoBtn.addEventListener("click", () => group.classList.add("info-open"));
  infoClose.addEventListener("click", () =>
    group.classList.remove("info-open"),
  );

  loginBtn.addEventListener("click", login);
  usernameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") passwordInput.focus();
  });
  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") login();
  });

  usernameInput.focus();

  return { el: overlay, stop };
}

// universal chat
function makePfpPlaceholder() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "20");
  svg.setAttribute("height", "20");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.classList.add("msg-pfp-placeholder");
  svg.innerHTML =
    '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>';
  return svg;
}

function appendMessage(container, msg, autoScroll, prepend = false) {
  const nearBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight < 80;

  const wrap = document.createElement("div");
  wrap.className = "chat-message";
  if (msg._key) wrap.dataset.msgKey = msg._key;

  const pfpWrap = document.createElement("div");
  pfpWrap.className = "msg-pfp-wrap";
  if (msg.uid) {
    pfpWrap.classList.add("clickable");
    pfpWrap.addEventListener("click", () => showProfileModal(msg.uid));
  }
  if (msg.pfp) {
    const img = document.createElement("img");
    img.className = "msg-pfp";
    img.src = msg.pfp;
    img.alt = "";
    const ph = makePfpPlaceholder();
    ph.style.display = "none";
    img.onerror = () => {
      img.style.display = "none";
      ph.style.display = "";
    };
    pfpWrap.appendChild(img);
    pfpWrap.appendChild(ph);
  } else {
    pfpWrap.appendChild(makePfpPlaceholder());
  }

  const body = document.createElement("div");
  body.className = "msg-body";
  const header = document.createElement("div");
  header.className = "msg-header";

  const nameEl = document.createElement("span");
  nameEl.className = "msg-username";
  nameEl.style.color = msg.nameColor || "#d24cff";
  nameEl.textContent = msg.displayUsername || "Anonymous";
  if (msg.uid) {
    nameEl.classList.add("clickable");
    nameEl.addEventListener("click", () => showProfileModal(msg.uid));
  }

  const timeEl = document.createElement("span");
  timeEl.className = "msg-time";
  timeEl.textContent = msg.time
    ? new Date(msg.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  header.appendChild(nameEl);
  header.appendChild(timeEl);

  const textEl = document.createElement("p");
  textEl.className = "msg-text";
  textEl.textContent = msg.text || "";

  body.appendChild(header);
  body.appendChild(textEl);
  wrap.appendChild(pfpWrap);
  wrap.appendChild(body);

  if (isAdmin && msg._refPath) {
    const delBtn = document.createElement("button");
    delBtn.className = "msg-delete-btn";
    delBtn.title = "Delete";
    delBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>';
    delBtn.addEventListener("click", () =>
      db.ref(msg._refPath).remove().catch(console.error),
    );
    wrap.appendChild(delBtn);
  }

  if (prepend) {
    container.insertBefore(wrap, container.firstChild);
  } else {
    container.appendChild(wrap);
    if (autoScroll || nearBottom) container.scrollTop = container.scrollHeight;
  }
}

function showProfileModal(uid) {
  let modal = document.getElementById("profile-modal-overlay");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "profile-modal-overlay";
    modal.innerHTML = `
            <div id="profile-modal-card">
                <button id="profile-modal-close"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
                <div id="profile-modal-pfp"></div>
                <div id="profile-modal-name-wrap">
                    <p id="profile-modal-name"></p>
                    <div id="profile-modal-history-tip">
                        <p class="history-tip-label">Past usernames</p>
                        <div id="profile-modal-history-list"></div>
                    </div>
                </div>
                <p id="profile-modal-bio"></p>
                <button id="profile-modal-msg" style="display:none">Message</button>
            </div>
        `;
    document.body.appendChild(modal);

    function closeModal() {
      modal.classList.remove("open");
      if (profileModalRef && profileModalCb) {
        profileModalRef.off("value", profileModalCb);
        profileModalRef = null;
        profileModalCb = null;
      }
    }
    modal
      .querySelector("#profile-modal-close")
      .addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  // Detach any previous live listener before opening a different profile
  if (profileModalRef && profileModalCb) {
    profileModalRef.off("value", profileModalCb);
    profileModalRef = null;
    profileModalCb = null;
  }

  const pfpEl = modal.querySelector("#profile-modal-pfp");
  const nameEl = modal.querySelector("#profile-modal-name");
  const nameWrap = modal.querySelector("#profile-modal-name-wrap");
  const historyList = modal.querySelector("#profile-modal-history-list");
  const bioEl = modal.querySelector("#profile-modal-bio");
  const msgBtn = modal.querySelector("#profile-modal-msg");

  pfpEl.innerHTML = "";
  pfpEl.appendChild(makePfpPlaceholder());
  nameEl.textContent = "—";
  nameEl.style.color = "#d24cff";
  nameWrap.classList.remove("has-history");
  historyList.innerHTML = "";
  bioEl.textContent = "";

  const isOwn = auth.currentUser && uid === auth.currentUser.uid;
  msgBtn.style.display = isOwn ? "none" : "";
  msgBtn.onclick = () => openDM && openDM(uid);

  modal.classList.add("open");

  profileModalCb = (snap) => {
    if (!snap.exists()) return;
    const p = snap.val();
    nameEl.textContent = p.displayUsername || "—";
    nameEl.style.color = p.nameColor || "#d24cff";
    bioEl.textContent = p.bio || "";

    const history = Array.isArray(p.usernameHistory) ? p.usernameHistory : [];
    const past = [...history].reverse().filter((u) => u !== p.displayUsername);
    historyList.innerHTML = "";
    nameWrap.classList.remove("has-history");
    if (past.length) {
      past.forEach((name) => {
        const el = document.createElement("p");
        el.className = "history-tip-name";
        el.textContent = name;
        historyList.appendChild(el);
      });
      nameWrap.classList.add("has-history");
    }

    pfpEl.innerHTML = "";
    if (p.pfp) {
      const img = document.createElement("img");
      img.src = p.pfp;
      img.style.cssText =
        "width:100%;height:100%;object-fit:cover;border-radius:50%;";
      img.onerror = () => {
        img.remove();
        pfpEl.appendChild(makePfpPlaceholder());
      };
      pfpEl.appendChild(img);
    } else {
      pfpEl.appendChild(makePfpPlaceholder());
    }
  };
  profileModalRef = db.ref(`profiles/${uid}`);
  profileModalRef.on("value", profileModalCb);
}

async function initUniversalChat(tab) {
  const messagesEl = tab.querySelector("#universal-messages");
  const input = tab.querySelector("#universal-input");
  const sendBtn = tab.querySelector("#universal-send");
  const baseRef = db.ref("messages/universal");

  const seenKeys = new Set();
  let oldestTime = Infinity;
  let newestTime = 0;
  let loadingMore = false;
  let noMore = false;

  async function loadOlder() {
    if (loadingMore || noMore || oldestTime === Infinity) return;
    loadingMore = true;
    const loader = document.createElement("p");
    loader.id = "universal-loader";
    loader.textContent = "· · ·";
    messagesEl.insertBefore(loader, messagesEl.firstChild);
    try {
      const snap = await baseRef
        .orderByChild("time")
        .endBefore(oldestTime)
        .limitToLast(50)
        .get();
      const msgs = [];
      snap.forEach((s) => msgs.push({ key: s.key, val: s.val() }));
      loader.remove();
      if (!msgs.length) {
        noMore = true;
        return;
      }
      const prevH = messagesEl.scrollHeight;
      msgs.reverse().forEach(({ key, val }) => {
        if (seenKeys.has(key)) return;
        seenKeys.add(key);
        if (val.time < oldestTime) oldestTime = val.time;
        val._key = key;
        val._refPath = `messages/universal/${key}`;
        appendMessage(messagesEl, val, false, true);
      });
      messagesEl.scrollTop = messagesEl.scrollHeight - prevH;
    } finally {
      loadingMore = false;
    }
  }

  const histSnap = await baseRef.orderByChild("time").limitToLast(50).get();
  histSnap.forEach((s) => {
    seenKeys.add(s.key);
    const v = s.val();
    if (v.time < oldestTime) oldestTime = v.time;
    if (v.time > newestTime) newestTime = v.time;
    v._key = s.key;
    v._refPath = `messages/universal/${s.key}`;
    appendMessage(messagesEl, v, false);
  });
  messagesEl.scrollTop = messagesEl.scrollHeight;

  baseRef
    .orderByChild("time")
    .startAt(newestTime + 1)
    .on("child_added", (snap) => {
      if (seenKeys.has(snap.key)) return;
      seenKeys.add(snap.key);
      const v = snap.val();
      v._key = snap.key;
      v._refPath = `messages/universal/${snap.key}`;
      appendMessage(messagesEl, v, true);
    });

  baseRef.on("child_removed", (snap) => {
    const el = messagesEl.querySelector(`[data-msg-key="${snap.key}"]`);
    if (el) el.remove();
    seenKeys.delete(snap.key);
  });

  messagesEl.addEventListener("scroll", () => {
    if (messagesEl.scrollTop < 60) loadOlder();
  });

  async function sendMessage() {
    const text = input.value.trim();
    if (!text || !auth.currentUser) return;
    input.value = "";
    sendBtn.disabled = true;
    try {
      const uid = auth.currentUser.uid;
      const ps = await db.ref(`profiles/${uid}`).get();
      const p = ps.val() || {};
      await baseRef.push({
        uid,
        displayUsername: p.displayUsername || currentUsername || "Anonymous",
        nameColor: p.nameColor || "#d24cff",
        pfp: p.pfp || "",
        text,
        time: firebase.database.ServerValue.TIMESTAMP,
      });
    } catch (err) {
      console.error(err);
      input.value = text;
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
}

// direct messages
function initDMs(tab) {
  const sidebar = tab.querySelector("#dm-sidebar");
  // Flush any conversations that arrived before the chat tab was opened
  const toFlush = pendingDMs.splice(0);
  for (const { convId, otherUid } of toFlush) {
    addDMSidebarItem(sidebar, convId, otherUid, tab);
  }
  // The user_dms listener is already running from onAuthStateChanged;
  // future child_added events will find #dm-sidebar in DOM directly.
}

async function addDMSidebarItem(sidebar, convId, otherUid, tab) {
  if (sidebar.querySelector(`[data-conv="${convId}"]`)) return;

  const placeholder = sidebar.querySelector(".chat-placeholder-text");
  if (placeholder) placeholder.remove();

  const item = document.createElement("div");
  item.className = "dm-sidebar-item";
  item.dataset.conv = convId;

  const pfpEl = document.createElement("div");
  pfpEl.className = "dm-item-pfp";
  pfpEl.appendChild(makePfpPlaceholder());

  const infoEl = document.createElement("div");
  infoEl.className = "dm-item-info";
  const nameEl = document.createElement("p");
  nameEl.className = "dm-item-name";
  nameEl.textContent = "...";
  const previewEl = document.createElement("p");
  previewEl.className = "dm-item-preview";
  infoEl.appendChild(nameEl);
  infoEl.appendChild(previewEl);
  item.appendChild(pfpEl);
  item.appendChild(infoEl);
  sidebar.appendChild(item);

  db.ref(`profiles/${otherUid}`)
    .get()
    .then((snap) => {
      const p = snap.val() || {};
      nameEl.textContent = p.displayUsername || "Unknown";
      nameEl.style.color = p.nameColor || "#d24cff";
      if (p.pfp) {
        const img = document.createElement("img");
        img.src = p.pfp;
        img.style.cssText = "width:100%;height:100%;object-fit:cover;";
        img.onerror = () => {
          img.remove();
          pfpEl.appendChild(makePfpPlaceholder());
        };
        pfpEl.innerHTML = "";
        pfpEl.appendChild(img);
      }
    });

  db.ref(`dms/${convId}/lastMessage`).on("value", (snap) => {
    previewEl.textContent = snap.val() || "";
  });

  item.addEventListener("click", () => {
    sidebar
      .querySelectorAll(".dm-sidebar-item")
      .forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    activeDMConvId = convId;
    loadDMConversation(convId, otherUid, tab);
  });

  if (activeDMConvId === convId) item.classList.add("active");
}

function loadDMConversation(convId, otherUid, tab) {
  const gen = ++dmGeneration;
  if (activeDMRef && activeDMCallback) {
    activeDMRef.off("child_added", activeDMCallback);
    activeDMRef = null;
    activeDMCallback = null;
  }
  if (activeDMBaseRef) {
    activeDMBaseRef.off("child_removed");
    activeDMBaseRef = null;
  }

  const emptyEl = tab.querySelector("#dm-empty");
  const convEl = tab.querySelector("#dm-conversation");
  const messagesEl = tab.querySelector("#dm-messages");

  emptyEl.style.display = "none";
  convEl.style.display = "";
  messagesEl.innerHTML = "";
  currentDMLoadOlder = null;

  const oldInput = tab.querySelector("#dm-input");
  const oldSend = tab.querySelector("#dm-send");
  const newInput = oldInput.cloneNode(true);
  const newSend = oldSend.cloneNode(true);
  oldInput.replaceWith(newInput);
  oldSend.replaceWith(newSend);

  const baseRef = db.ref(`dms/${convId}/messages`);
  const seenKeys = new Set();
  let oldestTime = Infinity;
  let newestTime = 0;
  let loadingMore = false;
  let noMore = false;

  async function loadOlder() {
    if (loadingMore || noMore || oldestTime === Infinity) return;
    loadingMore = true;
    const loader = document.createElement("p");
    loader.className = "dm-loader";
    loader.textContent = "· · ·";
    messagesEl.insertBefore(loader, messagesEl.firstChild);
    try {
      const snap = await baseRef
        .orderByChild("time")
        .endBefore(oldestTime)
        .limitToLast(50)
        .get();
      const msgs = [];
      snap.forEach((s) => msgs.push({ key: s.key, val: s.val() }));
      loader.remove();
      if (!msgs.length) {
        noMore = true;
        return;
      }
      const prevH = messagesEl.scrollHeight;
      msgs.reverse().forEach(({ key, val }) => {
        if (seenKeys.has(key)) return;
        seenKeys.add(key);
        if (val.time < oldestTime) oldestTime = val.time;
        val._key = key;
        val._refPath = `dms/${convId}/messages/${key}`;
        appendMessage(messagesEl, val, false, true);
      });
      messagesEl.scrollTop = messagesEl.scrollHeight - prevH;
    } finally {
      loadingMore = false;
    }
  }

  if (!dmScrollListenerAdded) {
    dmScrollListenerAdded = true;
    messagesEl.addEventListener("scroll", () => {
      if (messagesEl.scrollTop < 60 && currentDMLoadOlder) currentDMLoadOlder();
    });
  }
  currentDMLoadOlder = loadOlder;

  baseRef
    .orderByChild("time")
    .limitToLast(50)
    .get()
    .then((histSnap) => {
      if (gen !== dmGeneration) return;
      histSnap.forEach((s) => {
        seenKeys.add(s.key);
        const v = s.val();
        if (v.time < oldestTime) oldestTime = v.time;
        if (v.time > newestTime) newestTime = v.time;
        v._key = s.key;
        v._refPath = `dms/${convId}/messages/${s.key}`;
        appendMessage(messagesEl, v, false);
      });
      messagesEl.scrollTop = messagesEl.scrollHeight;

      const liveRef = db
        .ref(`dms/${convId}/messages`)
        .orderByChild("time")
        .startAt(newestTime + 1);
      const cb = (snap) => {
        if (seenKeys.has(snap.key)) return;
        seenKeys.add(snap.key);
        const v = snap.val();
        v._key = snap.key;
        v._refPath = `dms/${convId}/messages/${snap.key}`;
        appendMessage(messagesEl, v, true);
      };
      activeDMRef = liveRef;
      activeDMCallback = cb;
      liveRef.on("child_added", cb);

      activeDMBaseRef = baseRef;
      baseRef.on("child_removed", (snap) => {
        const el = messagesEl.querySelector(`[data-msg-key="${snap.key}"]`);
        if (el) el.remove();
        seenKeys.delete(snap.key);
      });
    });

  async function sendDM() {
    const text = newInput.value.trim();
    if (!text || !auth.currentUser) return;
    newInput.value = "";
    newSend.disabled = true;
    try {
      const uid = auth.currentUser.uid;
      const ps = await db.ref(`profiles/${uid}`).get();
      const p = ps.val() || {};
      await baseRef.push({
        uid,
        displayUsername: p.displayUsername || currentUsername || "Anonymous",
        nameColor: p.nameColor || "#d24cff",
        pfp: p.pfp || "",
        text,
        time: firebase.database.ServerValue.TIMESTAMP,
      });
      await db.ref(`dms/${convId}`).update({
        lastMessage: text,
        lastTime: firebase.database.ServerValue.TIMESTAMP,
      });
    } catch (err) {
      console.error(err);
      newInput.value = text;
    } finally {
      newSend.disabled = false;
      newInput.focus();
    }
  }

  newSend.addEventListener("click", sendDM);
  newInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendDM();
    }
  });
  newInput.focus();
}

// wheel tool
const WHEEL_COLORS = [
  "#d24cff",
  "#9b30d8",
  "#4f8ef5",
  "#a040d8",
  "#c040f0",
  "#5060f0",
  "#7c3aed",
  "#3b82f6",
];

function initWheelTool(tab) {
  const canvas = tab.querySelector("#wheel-canvas");
  const ctx = canvas.getContext("2d");
  const titleDisp = tab.querySelector("#wheel-title-display");
  const resultEl = tab.querySelector("#wheel-result");
  const titleInput = tab.querySelector("#wheel-title-input");
  const itemsList = tab.querySelector("#wheel-items-list");
  const addBtn = tab.querySelector("#wheel-add-btn");

  let items = GAMES.map((g) => ({ label: g.name, weight: 1 }));
  let wheelRotation = 0;
  let spinning = false;

  function totalWeight() {
    return items.reduce((s, i) => s + i.weight, 0);
  }

  function getSegments() {
    const total = totalWeight();
    let cum = 0;
    return items.map((item, idx) => {
      const angle = (item.weight / total) * 2 * Math.PI;
      const seg = {
        ...item,
        startAngle: cum,
        angle,
        color: WHEEL_COLORS[idx % WHEEL_COLORS.length],
      };
      cum += angle;
      return seg;
    });
  }

  function drawWheel() {
    const S = canvas.width;
    const cx = S / 2,
      cy = S / 2;
    const R = S / 2 - 10;
    const IR = R * 0.22;

    ctx.clearRect(0, 0, S, S);

    // outer dark ring
    ctx.beginPath();
    ctx.arc(cx, cy, R + 8, 0, 2 * Math.PI);
    ctx.fillStyle = "#0d0916";
    ctx.fill();

    const segs = getSegments();

    // slices
    segs.forEach((seg) => {
      const start = wheelRotation + seg.startAngle - Math.PI / 2;
      const end = start + seg.angle;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, start, end);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.28)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // label
      const mid = start + seg.angle / 2;
      const lx = cx + Math.cos(mid) * R * 0.62;
      const ly = cy + Math.sin(mid) * R * 0.62;
      const size = Math.max(9, Math.min(15, 180 / segs.length));
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(mid + Math.PI / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = `bold ${size}px "Ubuntu Mono", monospace`;
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 4;
      const lbl =
        seg.label.length > 13 ? seg.label.slice(0, 12) + "…" : seg.label;
      ctx.fillText(lbl, 0, 0);
      ctx.restore();
    });

    // black spike at 12 o'clock — drawn before hub so hub covers the base
    const triTip = cy - IR - (R - IR) * 0.1375;
    const triBase = cy;
    const triW = IR;
    ctx.beginPath();
    ctx.moveTo(cx, triTip);
    ctx.lineTo(cx - triW, triBase);
    ctx.lineTo(cx + triW, triBase);
    ctx.closePath();
    ctx.fillStyle = "#0d0916";
    ctx.fill();

    // hub
    ctx.beginPath();
    ctx.arc(cx, cy, IR, 0, 2 * Math.PI);
    ctx.fillStyle = "#0d0916";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // center dot
    ctx.beginPath();
    ctx.arc(cx, cy, IR * 0.18, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.fill();
  }

  function setupCanvas() {
    const size = canvas.parentElement.clientWidth;
    if (!size) return;
    canvas.width = canvas.height = Math.min(size, 400);
    drawWheel();
  }

  canvas.addEventListener("click", (e) => {
    if (spinning || items.length < 2) return;
    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    const dx = (e.clientX - rect.left) * scale - canvas.width / 2;
    const dy = (e.clientY - rect.top) * scale - canvas.height / 2;
    const IR = (canvas.width / 2 - 10) * 0.22;
    if (Math.hypot(dx, dy) > IR) return;

    spinning = true;
    resultEl.textContent = "";

    // pick winner (weighted)
    const segs = getSegments();
    const total = totalWeight();
    let r = Math.random() * total,
      c = 0;
    let winner = segs[segs.length - 1];
    for (const seg of segs) {
      c += seg.weight;
      if (r < c) {
        winner = seg;
        break;
      }
    }

    // target rotation so winner lands at top pointer
    const targetAngle =
      winner.startAngle + winner.angle * (0.2 + Math.random() * 0.6);
    const targetMod =
      ((-targetAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const currentMod =
      ((wheelRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    let delta = targetMod - currentMod;
    if (delta < 0.01) delta += 2 * Math.PI;
    const finalRotation =
      wheelRotation + delta + (6 + Math.floor(Math.random() * 4)) * 2 * Math.PI;
    const startRotation = wheelRotation;
    const duration = 4200 + Math.random() * 1400;
    let startTime = null;

    function animate(ts) {
      if (!startTime) startTime = ts;
      const t = Math.min((ts - startTime) / duration, 1);
      wheelRotation =
        startRotation +
        (finalRotation - startRotation) * (1 - Math.pow(1 - t, 4));
      drawWheel();
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        wheelRotation = finalRotation;
        drawWheel();
        spinning = false;
        resultEl.textContent = winner.label;
      }
    }
    requestAnimationFrame(animate);
  });

  // cursor: pointer over center hub
  canvas.addEventListener("mousemove", (e) => {
    if (spinning) {
      canvas.style.cursor = "default";
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    const dx = (e.clientX - rect.left) * scale - canvas.width / 2;
    const dy = (e.clientY - rect.top) * scale - canvas.height / 2;
    const IR = (canvas.width / 2 - 10) * 0.22;
    canvas.style.cursor = Math.hypot(dx, dy) <= IR ? "pointer" : "default";
  });

  function renderItems() {
    itemsList.innerHTML = "";
    items.forEach((item, idx) => {
      const row = document.createElement("div");
      row.className = "wheel-item-row";

      const dot = document.createElement("span");
      dot.className = "wheel-item-color";
      dot.style.background = WHEEL_COLORS[idx % WHEEL_COLORS.length];

      const lbl = document.createElement("input");
      lbl.className = "wheel-item-label";
      lbl.type = "text";
      lbl.value = item.label;
      lbl.placeholder = "Label";
      lbl.addEventListener("input", () => {
        items[idx].label = lbl.value;
        drawWheel();
      });

      const wWrap = document.createElement("div");
      wWrap.className = "wheel-weight-wrap";
      const wLabel = document.createElement("span");
      wLabel.textContent = "×";
      const wInput = document.createElement("input");
      wInput.className = "wheel-item-weight";
      wInput.type = "number";
      wInput.min = "1";
      wInput.max = "99";
      wInput.value = item.weight;
      wInput.addEventListener("input", () => {
        const v = parseInt(wInput.value);
        if (v > 0) {
          items[idx].weight = v;
          drawWheel();
        }
      });
      wWrap.appendChild(wLabel);
      wWrap.appendChild(wInput);

      const del = document.createElement("button");
      del.className = "wheel-item-del";
      del.textContent = "×";
      del.disabled = items.length <= 2;
      del.addEventListener("click", () => {
        items.splice(idx, 1);
        renderItems();
        drawWheel();
      });

      row.appendChild(dot);
      row.appendChild(lbl);
      row.appendChild(wWrap);
      row.appendChild(del);
      itemsList.appendChild(row);
    });
  }

  addBtn.addEventListener("click", () => {
    items.push({ label: `Option ${items.length + 1}`, weight: 1 });
    renderItems();
    drawWheel();
  });

  titleInput.addEventListener("input", () => {
    titleDisp.textContent = titleInput.value.trim() || "Wheel";
  });

  renderItems();
  setupCanvas();
  window.addEventListener("resize", setupCanvas);
}

// app cage
function buildCage() {
  const cage = document.createElement("div");
  cage.id = "Cage";

  cage.innerHTML = `
        <main id="tab-container"></main>
        <nav id="nav-main">
            <button id="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            </button>
            <div class="spacer-div"><hr></div>
            <button id="games-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>
            </button>
            <div class="spacer-div"><hr></div>
            <button id="gas-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"/><path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"/><path d="M2 21h13"/><path d="M3 9h11"/></svg>
            </button>
            <div class="spacer-div"><hr></div>
            <button id="groove-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44"/></svg>
            </button>
            <div class="spacer-div"><hr></div>
            <button class="chat-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/></svg>
            </button>
            <div class="spacer-div"><hr></div>
            <button class="tools-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/></svg>
            </button>
        </nav>
        <nav id="nav-user">
            <button id="profile-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            <div class="spacer-div"><hr></div>
            <button id="logout-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            </button>
        </nav>
        <div id="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            <input type="text" placeholder="Search...">
        </div>
    `;

  document.body.appendChild(cage);

  // tab sys
  const tabContainer = cage.querySelector("#tab-container");

  function buildTab(buttonSel, html, onFirstShow) {
    const tab = document.createElement("div");
    tab.className = "tab-content";
    tab.innerHTML = html;
    tab.style.display = "none";
    tabContainer.appendChild(tab);

    let firstShow = true;
    cage.querySelector(buttonSel).addEventListener("click", () => {
      tabContainer
        .querySelectorAll(".tab-content")
        .forEach((t) => (t.style.display = "none"));
      cage
        .querySelectorAll("nav button")
        .forEach((b) => b.classList.remove("active"));
      tab.style.display = "";
      cage.querySelector(buttonSel).classList.add("active");
      if (firstShow && onFirstShow) {
        firstShow = false;
        onFirstShow(tab);
      }
      requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    });

    return tab;
  }

  // games tab
  const cardHtml = GAMES.map(
    (g) =>
      `<div class="game-card">
            <div class="game-card-top">
                <span class="game-name">${g.name}</span>
                <span class="game-desc">${g.desc}</span>
            </div>
            <a href="${g.url}" class="game-play">Play</a>
        </div>`,
  ).join("");

  const gamesTab = buildTab(
    "#games-button",
    `
        <div id="featured">
            <div id="featured-content">
                <div id="featured-inner">
                    <div id="featured-image">
                        <img src="https://lh3.googleusercontent.com/sitesv/AG8ngQU5uh_pheLPSD5sHyq2W0qdDoPmbL1EqMWTAkBBkxx9xeNK3FyZ0YGWLMvWib1W89RsK4EkBKdlDMigPHXi8evwwIwKp9oJwxc9_YdY4lPOzwnt4xljzAyhncFnBLw-gikiSoCA93YjfT7NcQ9Px4EOEts1p2hKt4TYtj4yNqcAp6_Kl7pAKniUa-19RVKtUw3wfw6dE9xju4DKdk0t3NmYKowimcSDPuvqVBHtvk0=w1280" alt="Content Img">
                    </div>
                    <div id="featured-right">
                        <div id="featured-title"><h2>Dune Dash</h2></div>
                        <div id="featured-description"><p>A rhythm-based desert runner where you control a ball gliding over dunes.</p></div>
                        <div id="featured-button"><a href="https://mattavern.netlify.app/ports/external-ports/huiogahbgijanga.html"><button>Play Here</button></a></div>
                    </div>
                </div>
            </div>
        </div>
        <section id="catalogue">
            <h3 id="catalogue-title">Games</h3>
            <div id="catalogue-grid">${cardHtml}</div>
        </section>
    `,
  );

  // wip tabs
  function buildWIPTab(buttonSel) {
    return buildTab(
      buttonSel,
      `
            <div id="wip-page">
                <img src="https://mattavern.netlify.app/assets/mattavern.png" alt="MatTavern" id="wip-logo">
                <div id="wip-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                    <h2>Work in Progress</h2>
                </div>
                <p>I apologize! This tab isn't quite ready yet...</p>
            </div>
        `,
    );
  }

  buildWIPTab("#gas-button");
  buildWIPTab("#groove-button");

  buildTab(
    ".tools-button",
    `
        <div id="tools-tab">
            <div id="tools-container">
                <div id="wheel-tool">
                    <div id="wheel-panel">
                        <h2 id="wheel-title-display">Wheel</h2>
                        <div id="wheel-canvas-wrap">
                            <canvas id="wheel-canvas"></canvas>
                        </div>
                        <p id="wheel-result"></p>
                    </div>
                    <div id="wheel-controls">
                        <div class="wheel-ctrl-section">
                            <label class="wheel-ctrl-label">Title</label>
                            <input id="wheel-title-input" class="wheel-text-input" type="text" placeholder="Wheel title" value="Wheel">
                        </div>
                        <div class="wheel-ctrl-section">
                            <label class="wheel-ctrl-label">Items</label>
                            <div id="wheel-items-list"></div>
                            <button id="wheel-add-btn">+ Add Item</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    (tab) => initWheelTool(tab),
  );

  // chat tab
  const chatTab = buildTab(
    ".chat-button",
    `
        <div id="chat-panel">
            <div id="chat-header">
                <div id="chat-header-content">
                    <div id="chat-subnav">
                        <button class="chat-subnav-btn active" data-view="universal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            Universal
                        </button>
                        <button class="chat-subnav-btn" data-view="dms">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            Direct Messages
                        </button>
                    </div>
                </div>
            </div>
            <div id="chat-body">
                <div class="chat-view active" id="chat-view-universal">
                    <div id="universal-messages"></div>
                    <div id="universal-input-bar">
                        <input id="universal-input" type="text" placeholder="Say something..." maxlength="500" autocomplete="off">
                        <button id="universal-send">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.111z"/></svg>
                        </button>
                    </div>
                </div>
                <div class="chat-view" id="chat-view-dms">
                    <div id="dm-layout">
                        <div id="dm-sidebar">
                            <p class="chat-placeholder-text">No conversations yet.</p>
                        </div>
                        <div id="dm-main">
                            <div id="dm-empty">
                                <p class="chat-placeholder-text">Select a conversation to start chatting.</p>
                            </div>
                            <div id="dm-conversation" style="display:none">
                                <div id="dm-messages"></div>
                                <div id="dm-input-bar">
                                    <input id="dm-input" type="text" placeholder="Message..." maxlength="500" autocomplete="off">
                                    <button id="dm-send">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.111z"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    (tab) => {
      initParticles(tab.querySelector("#chat-header"), {
        count: 25,
        connectDist: 80,
        mouseDist: 100,
      });
      initUniversalChat(tab);
      initDMs(tab);
    },
  );
  chatTab.id = "chat-tab";

  // chat sub-nav switching
  chatTab.querySelectorAll(".chat-subnav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      chatTab
        .querySelectorAll(".chat-subnav-btn")
        .forEach((b) => b.classList.remove("active"));
      chatTab
        .querySelectorAll(".chat-view")
        .forEach((v) => v.classList.remove("active"));
      btn.classList.add("active");
      chatTab
        .querySelector(`#chat-view-${btn.dataset.view}`)
        .classList.add("active");
    });
  });

  openDM = async (otherUid) => {
    const myUid = auth.currentUser?.uid;
    if (!myUid) return;
    const convId = [myUid, otherUid].sort().join("_");
    await db
      .ref(`dms/${convId}/participants`)
      .update({ [myUid]: true, [otherUid]: true });
    db.ref(`user_dms/${myUid}/${convId}`).set(true);
    db.ref(`user_dms/${otherUid}/${convId}`).set(true);
    const modal = document.getElementById("profile-modal-overlay");
    if (modal) modal.classList.remove("open");
    cage.querySelector(".chat-button").click();
    chatTab.querySelector('[data-view="dms"]').click();
    activeDMConvId = convId;
    loadDMConversation(convId, otherUid, chatTab);
  };

  // profile tab
  buildTab(
    "#profile-button",
    `
        <div id="profile-tab">
            <div id="profile-card">
                <div id="profile-preview">
                    <div id="profile-pfp-wrap">
                        <svg id="profile-pfp-placeholder" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <img id="profile-pfp-img" src="" alt="" style="display:none;width:100%;height:100%;object-fit:cover;">
                    </div>
                    <div id="profile-preview-info">
                        <p id="profile-preview-name">username</p>
                        <p id="profile-preview-email">—</p>
                    </div>
                </div>

                <div id="profile-form">
                    <div class="profile-field">
                        <label class="profile-label">Profile Picture URL</label>
                        <input id="profile-pfp-input" type="url" placeholder="https://...">
                    </div>

                    <div class="profile-field">
                        <label class="profile-label">Username</label>
                        <input id="profile-username-input" type="text" placeholder="username">
                        <p id="profile-username-history"></p>
                    </div>

                    <div class="profile-field">
                        <label class="profile-label">Name Color</label>
                        <div id="profile-color-row">
                            <button class="color-swatch" data-color="#d24cff" style="background:#d24cff"></button>
                            <button class="color-swatch" data-color="#ff6b6b" style="background:#ff6b6b"></button>
                            <button class="color-swatch" data-color="#4ecdc4" style="background:#4ecdc4"></button>
                            <button class="color-swatch" data-color="#45b7d1" style="background:#45b7d1"></button>
                            <button class="color-swatch" data-color="#f9ca24" style="background:#f9ca24"></button>
                            <button class="color-swatch" data-color="#a8e6cf" style="background:#a8e6cf"></button>
                            <button class="color-swatch" data-color="#ffffff" style="background:#fff;border-color:rgba(255,255,255,0.25)"></button>
                            <div id="profile-color-custom-wrap">
                                <input id="profile-color-custom" type="color" value="#d24cff" title="Custom color">
                                <input id="profile-color-hex" type="text" placeholder="#d24cff" maxlength="7" spellcheck="false">
                            </div>
                        </div>
                    </div>

                    <div class="profile-field">
                        <label class="profile-label">Bio</label>
                        <textarea id="profile-bio-input" placeholder="Tell people about yourself..." maxlength="300"></textarea>
                        <p id="profile-bio-count">0 / 300</p>
                    </div>

                    <button id="profile-save-btn">Save Changes</button>
                    <p id="profile-msg"></p>
                </div>
            </div>
        </div>
    `,
    async (tab) => {
      const uid = auth.currentUser.uid;
      const email = auth.currentUser.email;

      const pfpPlaceholder = tab.querySelector("#profile-pfp-placeholder");
      const pfpImg = tab.querySelector("#profile-pfp-img");
      const previewName = tab.querySelector("#profile-preview-name");
      const previewEmail = tab.querySelector("#profile-preview-email");
      const pfpInput = tab.querySelector("#profile-pfp-input");
      const usernameInput = tab.querySelector("#profile-username-input");
      const historyEl = tab.querySelector("#profile-username-history");
      const colorCustom = tab.querySelector("#profile-color-custom");
      const hexInput = tab.querySelector("#profile-color-hex");
      const bioInput = tab.querySelector("#profile-bio-input");
      const bioCount = tab.querySelector("#profile-bio-count");
      const saveBtn = tab.querySelector("#profile-save-btn");
      const msgEl = tab.querySelector("#profile-msg");

      const snap = await db.ref(`profiles/${uid}`).get();
      const data = snap.val() || {};

      const initUsername = data.displayUsername || currentUsername || "";
      const initPfp = data.pfp || "";
      const initColor = data.nameColor || "#d24cff";
      const initBio = data.bio || "";
      let history = Array.isArray(data.usernameHistory)
        ? [...data.usernameHistory]
        : [initUsername];

      pfpInput.value = initPfp;
      usernameInput.value = initUsername;
      colorCustom.value = initColor;
      bioInput.value = initBio;
      bioCount.textContent = `${initBio.length} / 300`;
      previewEmail.textContent = email;

      function updatePfp(url) {
        if (url) {
          pfpImg.src = url;
          pfpImg.style.display = "";
          pfpPlaceholder.style.display = "none";
        } else {
          pfpImg.style.display = "none";
          pfpPlaceholder.style.display = "";
        }
      }

      pfpImg.onerror = () => {
        pfpImg.style.display = "none";
        pfpPlaceholder.style.display = "";
      };

      function setColor(color) {
        tab
          .querySelectorAll(".color-swatch")
          .forEach((s) =>
            s.classList.toggle("selected", s.dataset.color === color),
          );
        colorCustom.value = color;
        hexInput.value = color;
        previewName.style.color = color;
      }

      function renderHistory() {
        const current = usernameInput.value.trim();
        const older = [...new Set(history)].filter((u) => u !== current);
        historyEl.textContent = older.length ? `Past: ${older.join(", ")}` : "";
      }

      previewName.textContent = initUsername;
      previewName.style.color = initColor;
      updatePfp(initPfp);
      setColor(initColor);
      renderHistory();

      pfpInput.addEventListener("input", () =>
        updatePfp(pfpInput.value.trim()),
      );

      usernameInput.addEventListener("input", () => {
        previewName.textContent = usernameInput.value.trim() || initUsername;
        renderHistory();
      });

      tab.querySelectorAll(".color-swatch").forEach((sw) => {
        sw.addEventListener("click", () => setColor(sw.dataset.color));
      });

      colorCustom.addEventListener("input", () => {
        tab
          .querySelectorAll(".color-swatch")
          .forEach((s) => s.classList.remove("selected"));
        hexInput.value = colorCustom.value;
        previewName.style.color = colorCustom.value;
      });

      hexInput.addEventListener("input", () => {
        const val = hexInput.value.trim();
        if (/^#[0-9a-fA-F]{6}$/.test(val)) {
          tab
            .querySelectorAll(".color-swatch")
            .forEach((s) => s.classList.remove("selected"));
          colorCustom.value = val;
          previewName.style.color = val;
        }
      });

      bioInput.addEventListener("input", () => {
        bioCount.textContent = `${bioInput.value.length} / 300`;
      });

      saveBtn.addEventListener("click", async () => {
        const newUsername = usernameInput.value.trim();
        const newPfp = pfpInput.value.trim();
        const newColor = colorCustom.value;
        const newBio = bioInput.value.trim();

        if (!newUsername) {
          msgEl.textContent = "Username cannot be empty.";
          return;
        }

        saveBtn.disabled = true;
        msgEl.textContent = "";

        try {
          const newHistory = [
            ...new Set([
              ...history.filter((u) => u !== newUsername),
              newUsername,
            ]),
          ];
          await db.ref(`profiles/${uid}`).update({
            displayUsername: newUsername,
            pfp: newPfp,
            nameColor: newColor,
            bio: newBio,
            usernameHistory: newHistory,
          });
          history = newHistory;
          renderHistory();
          msgEl.textContent = "Saved!";
          setTimeout(() => {
            msgEl.textContent = "";
          }, 3000);
        } catch (err) {
          console.error(err);
          msgEl.textContent = "Failed to save.";
        } finally {
          saveBtn.disabled = false;
        }
      });
    },
  );

  // default tab
  gamesTab.style.display = "";
  cage.querySelector("#games-button").classList.add("active");

  cage
    .querySelector("#logout-button")
    .addEventListener("click", () => auth.signOut());

  const stop = initParticles(cage.querySelector("#featured"));
  initSearch(cage);

  return { el: cage, stop };
}

// searching
function initSearch(cage) {
  const searchBar = cage.querySelector("#search-bar");
  const searchInput = searchBar.querySelector("input");
  const searchBtn = cage.querySelector("#search-button");

  const games = Array.from(cage.querySelectorAll(".game-card")).map((card) => ({
    el: card,
    name: card.querySelector(".game-name").textContent,
    desc: card.querySelector(".game-desc").textContent,
  }));

  const fuse = new Fuse(games, { keys: ["name", "desc"], threshold: 0.4 });

  function hideCard(el) {
    el.classList.add("card-out");
    el.addEventListener(
      "transitionend",
      () => {
        if (el.classList.contains("card-out")) el.style.display = "none";
      },
      { once: true },
    );
  }

  function showCard(el) {
    el.style.display = "";
    el.offsetHeight;
    el.classList.remove("card-out");
  }
  function showAll() {
    games.forEach((g) => showCard(g.el));
  }

  function filter(query) {
    if (!query) {
      showAll();
      return;
    }
    const hits = new Set(fuse.search(query).map((r) => r.item.el));
    games.forEach((g) => (hits.has(g.el) ? showCard(g.el) : hideCard(g.el)));
  }

  function openSearch() {
    searchBar.classList.add("open");
    searchInput.focus();
  }
  function closeSearch() {
    searchBar.classList.remove("open");
    searchInput.value = "";
    showAll();
  }

  searchBtn.addEventListener("click", () =>
    searchBar.classList.contains("open") ? closeSearch() : openSearch(),
  );
  searchInput.addEventListener("input", (e) => filter(e.target.value.trim()));
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearch();
  });

  document.addEventListener("pointerdown", (e) => {
    if (!searchBar.classList.contains("open")) return;
    if (!searchBar.contains(e.target) && !searchBtn.contains(e.target))
      closeSearch();
  });
}

// app initialization
let currentUsername = null;
let loginInst = null;
let cageInst = null;

// dm state
let openDM = null;
let activeDMConvId = null;
let activeDMRef = null;
let activeDMCallback = null;
let dmGeneration = 0;
let currentDMLoadOlder = null;
let dmScrollListenerAdded = false;
let userDMsRef = null;
let pendingDMs = [];
let activeDMBaseRef = null;
let isAdmin = false;

// profile modal listener
let profileModalRef = null;
let profileModalCb = null;

auth.onAuthStateChanged(async (user) => {
  if (user) {
    if (!currentUsername) {
      const snap = await db.ref(`uid_to_username/${user.uid}`).get();
      currentUsername = snap.val();
    }

    // Admin check
    const adminSnap = await db.ref(`admins/${user.uid}`).get();
    isAdmin = adminSnap.val() === true;

    // Start listening for new DMs immediately — not gated on chat tab being open
    if (!userDMsRef) {
      const myUid = user.uid;
      userDMsRef = db.ref(`user_dms/${myUid}`);
      userDMsRef.on("child_added", (snap) => {
        const convId = snap.key;
        const otherUid =
          convId.split("_").find((u) => u !== myUid) ?? convId.split("_")[0];
        const sidebar = document.querySelector("#dm-sidebar");
        const chatTabEl = document.querySelector("#chat-tab");
        if (sidebar && chatTabEl) {
          addDMSidebarItem(sidebar, convId, otherUid, chatTabEl);
        } else {
          pendingDMs.push({ convId, otherUid });
        }
      });
    }

    if (loginInst) {
      loginInst.stop();
      loginInst.el.remove();
      loginInst = null;
    }
    if (!cageInst) cageInst = buildCage();
  } else {
    currentUsername = null;
    openDM = null;
    activeDMConvId = null;
    if (activeDMRef && activeDMCallback) {
      activeDMRef.off("child_added", activeDMCallback);
      activeDMRef = null;
      activeDMCallback = null;
    }
    if (userDMsRef) {
      userDMsRef.off();
      userDMsRef = null;
    }
    if (activeDMBaseRef) {
      activeDMBaseRef.off("child_removed");
      activeDMBaseRef = null;
    }
    isAdmin = false;
    if (profileModalRef && profileModalCb) {
      profileModalRef.off("value", profileModalCb);
      profileModalRef = null;
      profileModalCb = null;
    }
    pendingDMs = [];
    dmGeneration++;
    currentDMLoadOlder = null;
    dmScrollListenerAdded = false;
    if (cageInst) {
      cageInst.stop();
      cageInst.el.remove();
      cageInst = null;
    }
    if (!loginInst) loginInst = buildLogin();
  }
});
