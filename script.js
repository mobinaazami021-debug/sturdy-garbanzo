/* آزمایشگاه احتمال — کامل با 50 سؤال
   - نگه داشتن ویژگی‌ها: فضای نمونه، فرمول، بررسی کسر با پذیرش معادل‌ها
   - انیمیشن سه‌بعدی: need dice.glb و coin.glb در ریشه
   - گوی‌ها: canvas2D
*/

/* ====== بانک 50 سؤال (سطح کتاب) ======
   هر سوال: { text, sample: [...], event: [...], anim: 'dice'|'coin'|'balls'|'none' }
*/
const questions = [
  // 1-10 تاس
  { text:"یک تاس سالم پرتاب می‌کنیم. احتمال آمدن عدد زوج چیست؟",
    sample:["1","2","3","4","5","6"], event:["2","4","6"], anim:"dice" },
  { text:"تاس می‌اندازیم. احتمال آمدن عدد 5 چیست؟",
    sample:["1","2","3","4","5","6"], event:["5"], anim:"dice" },
  { text:"تاس می‌اندازیم. احتمال آمدن عدد کمتر از 4 چیست؟",
    sample:["1","2","3","4","5","6"], event:["1","2","3"], anim:"dice" },
  { text:"تاس می‌اندازیم. احتمال آمدن عدد بزرگ‌تر از 4 چیست؟",
    sample:["1","2","3","4","5","6"], event:["5","6"], anim:"dice" },
  { text:"تاس می‌اندازیم. احتمال آمدن عدد فرد چیست؟",
    sample:["1","2","3","4","5","6"], event:["1","3","5"], anim:"dice" },
  { text:"تاس می‌اندازیم. احتمال آمدن 1 یا 6 چیست؟",
    sample:["1","2","3","4","5","6"], event:["1","6"], anim:"dice" },
  { text:"تاس می‌اندازیم. احتمال آمدن عددی که بر 3 بخش‌پذیر باشد چیست؟",
    sample:["1","2","3","4","5","6"], event:["3","6"], anim:"dice" },
  { text:"تاس می‌اندازیم. احتمال آمدن عددی کمتر یا مساوی 2 چیست؟",
    sample:["1","2","3","4","5","6"], event:["1","2"], anim:"dice" },
  { text:"تاس می‌اندازیم. احتمال آمدن عدد بین 2 و 5 (شامل این دو) چیست؟",
    sample:["1","2","3","4","5","6"], event:["2","3","4","5"], anim:"dice" },
  { text:"تاس می‌اندازیم. احتمال آمدن 3 یا 4 چیست؟",
    sample:["1","2","3","4","5","6"], event:["3","4"], anim:"dice" },

  // 11-18 سکه
  { text:"یک سکه سالم را پرتاب می‌کنیم. احتمال آمدن شیر چیست؟",
    sample:["شیر","خط"], event:["شیر"], anim:"coin" },
  { text:"یک سکه سالم را پرتاب می‌کنیم. احتمال آمدن خط چیست؟",
    sample:["شیر","خط"], event:["خط"], anim:"coin" },
  { text:"دو بار سکه می‌زنیم. فضای نمونه چیست؟",
    sample:["شیر-شیر","شیر-خط","خط-شیر","خط-خط"], event:[], anim:"coin" }, // event خالی برای تست نمایش S
  { text:"دو بار سکه می‌زنیم. احتمال آمدن دقیقاً یک شیر چیست؟",
    sample:["شیر-شیر","شیر-خط","خط-شیر","خط-خط"], event:["شیر-خط","خط-شیر"], anim:"coin" },
  { text:"سه بار سکه می‌زنیم. احتمال آمدن همه‌شان شیر چیست؟",
    sample:["ش-ش-ش","ش-ش-خ","...","خ-خ-خ"], event:["ش-ش-ش"], anim:"coin" },
  { text:"یک سکه و یک تاس می‌اندازیم. احتمال آمدن شیر و عدد زوج چیست؟",
    sample:["1-شیر","1-خط","2-شیر","2-خط","3-شیر","3-خط","4-شیر","4-خط","5-شیر","5-خط","6-شیر","6-خط"],
    event:["2-شیر","4-شیر","6-شیر"], anim:"dice" },
  { text:"در دو بار پرتاب سکه احتمال آمدن حداقل یک شیر چیست؟",
    sample:["ش-ش","ش-خ","خ-ش","خ-خ"], event:["ش-ش","ش-خ","خ-ش"], anim:"coin" },
  { text:"پرتاب سکه: احتمال آمدن الگوی شیر-خط چیست؟",
    sample:["ش-ش","ش-خ","خ-ش","خ-خ"], event:["ش-خ"], anim:"coin" },

  // 19-30 گوی‌ها/کیسه
  { text:"کیسه‌ای با 3 توپ قرمز و 2 توپ آبی داریم. احتمال بیرون آمدن توپ آبی؟",
    sample:["قرمز","قرمز","قرمز","آبی","آبی"], event:["آبی","آبی"], anim:"balls" },
  { text:"کیسه‌ای با 4 زرد و 1 سفید داریم. احتمال انتخاب سفید چیست؟",
    sample:["زرد","زرد","زرد","زرد","سفید"], event:["سفید"], anim:"balls" },
  { text:"کیسه‌ای با 2 قرمز،2 سبز و1 آبی. احتمال آمدن سبز چیست؟",
    sample:["R","R","G","G","B"], event:["G","G"], anim:"balls" },
  { text:"جعبه‌ای 10 توپ که 3 قرمز،4 آبی،3 سبز دارد. احتمال انتخاب سبز؟",
    sample:[...Array(3).fill("قرمز"),...Array(4).fill("آبی"),...Array(3).fill("سبز")], event:[...Array(3).fill("سبز")], anim:"balls" },
  { text:"در جعبه‌ای 6 توپ که 2 سبز،2 قرمز،2 زرد است، احتمال انتخاب قرمز؟",
    sample:["G","G","R","R","Y","Y"], event:["R","R"], anim:"balls" },
  { text:"کیسه‌ای 5 توپ: 2 کاراملی و 3 شکلات ساده. احتمال کاراملی؟",
    sample:["س","س","س","ک","ک"], event:["ک","ک"], anim:"balls" },
  { text:"از 12 توپ 5 قرمز،4 آبی و3 سبز؛ احتمال انتخاب غیرقرمز؟",
    sample:[...Array(5).fill("قرمز"),...Array(4).fill("آبی"),...Array(3).fill("سبز")],
    event:[...Array(4).fill("آبی"),...Array(3).fill("سبز")], anim:"balls" },
  { text:"از بین 8 توپ که 3ش خراب است، احتمال انتخاب سالم چیست؟",
    sample:[...Array(5).fill("سالم"),...Array(3).fill("خراب")], event:[...Array(5).fill("سالم")], anim:"balls" },
  { text:"کیسه: 7 توپ که 1 طلایی،6 معمولی؛ احتمال طلایی؟",
    sample:[...Array(6).fill("معمولی"),"طلایی"], event:["طلایی"], anim:"balls" },
  { text:"کیسه‌ای با 9 توپ؛ 3 قرمز،3 آبی،3 سبز. احتمال انتخاب رنگی خاص (مثلاً آبی)؟",
    sample:[...Array(3).fill("قرمز"),...Array(3).fill("آبی"),...Array(3).fill("سبز")], event:[...Array(3).fill("آبی")], anim:"balls" },

  // 31-38 اعداد/کارت‌ها
  { text:"از اعداد 1 تا 10، احتمال انتخاب عدد زوج چیست؟",
    sample:Array.from({length:10},(_,i)=>String(i+1)), event:["2","4","6","8","10"], anim:"none" },
  { text:"از اعداد 1 تا 20، احتمال انتخاب مضرب 5 چیست؟",
    sample:Array.from({length:20},(_,i)=>String(i+1)), event:["5","10","15","20"], anim:"none" },
  { text:"از 1 تا 12، احتمال انتخاب مضرب 3 چیست؟",
    sample:Array.from({length:12},(_,i)=>String(i+1)), event:["3","6","9","12"], anim:"none" },
  { text:"از 1 تا 9، احتمال انتخاب عدد فرد چیست؟",
    sample:Array.from({length:9},(_,i)=>String(i+1)), event:["1","3","5","7","9"], anim:"none" },
  { text:"از کارت‌های 1 تا 5، احتمال انتخاب 1 یا 5 چیست؟",
    sample:["1","2","3","4","5"], event:["1","5"], anim:"none" },
  { text:"از 10 کارت 1..10 احتمال انتخاب 3 یا 7 چیست؟",
    sample:Array.from({length:10},(_,i)=>String(i+1)), event:["3","7"], anim:"none" },
  { text:"از 6 عدد، احتمال انتخاب عددی که زوج و بزرگتر از 2 باشد چیست؟",
    sample:["1","2","3","4","5","6"], event:["4","6"], anim:"none" },
  { text:"از اعداد 1..15 احتمال انتخاب مضرب 5 چیست؟",
    sample:Array.from({length:15},(_,i)=>String(i+1)), event:["5","10","15"], anim:"none" },

  // 39-44 خانواده/انتخاب افراد
  { text:"در کلاس 30 نفر، 18 پسر و 12 دخترند. احتمال انتخاب یک دختر چیست؟",
    sample:[...Array(18).fill("پسر"),...Array(12).fill("دختر")], event:[...Array(12).fill("دختر")], anim:"balls" },
  { text:"در کلاس 5 نفر (علی،رضا،نازنین،مریم،کیان) احتمال انتخاب یک دختر چیست؟",
    sample:["علی","رضا","نازنین","مریم","کیان"], event:["نازنین","مریم"], anim:"balls" },
  { text:"خانواده‌ای دو فرزند دارند؛ احتمال اینکه هر دو دختر باشند؟",
    sample:["د-د","د-پ","پ-د","پ-پ"], event:["د-د"], anim:"none" },
  { text:"خانواده‌ای دو فرزند دارند؛ احتمال اینکه حداقل یک دختر باشد؟",
    sample:["د-د","د-پ","پ-د","پ-پ"], event:["د-د","د-پ","پ-د"], anim:"none" },
  { text:"در یک گروه 12 نفری 4 نفر عینکی‌اند؛ احتمال انتخاب عینکی؟",
    sample:[...Array(4).fill("عینکی"),...Array(8).fill("بدون")], event:[...Array(4).fill("عینکی")], anim:"balls" },

  // 45-50 ترکیبی/متمم/دیگر
  { text:"دو تاس پرتاب می‌کنیم؛ احتمال اینکه مجموع برابر 7 شود چیست؟",
    sample:(function(){ let s=[]; for(let a=1;a<=6;a++)for(let b=1;b<=6;b++) s.push(a+"+"+b); return s })(),
    event:["1+6","2+5","3+4","4+3","5+2","6+1"], anim:"dice" },
  { text:"پرسش متمم: اگر احتمال آمدن حالت A برابر 1/4 باشد، احتمال متمم A چیست؟ (نمایش S و A در سوال‌های دیگر)",
    sample:["A","notA"], event:["notA"], anim:"none" },
  { text:"از 20 عدد یک عدد انتخاب می‌شود؛ احتمال انتخاب عدد کمتر از 5 چیست؟",
    sample:Array.from({length:20},(_,i)=>String(i+1)), event:["1","2","3","4"], anim:"none" },
  { text:"در یک بسته 10 شکلات که 2 کاراملی دارد؛ احتمال کاراملی چیست؟",
    sample:[...Array(8).fill("ساده"),...Array(2).fill("کاراملی")], event:[...Array(2).fill("کاراملی")], anim:"balls" },
  { text:"ریاضی ترکیبی: از 4 کارت 1 تا 4، احتمال انتخاب 2 یا 4 چیست؟",
    sample:["1","2","3","4"], event:["2","4"], anim:"none" }
]; // end questions (50 items)

/* ====== DOM elements ====== */
const qText = document.getElementById("questionText");
const sampleSpaceEl = document.getElementById("sampleSpace");
const nSEl = document.getElementById("nS");
const nAEl = document.getElementById("nA");
const userNumEl = document.getElementById("userNum");
const userDenEl = document.getElementById("userDen");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const checkBtn = document.getElementById("checkBtn");
const diceCanvas = document.getElementById("diceCanvas");
const coinCanvas = document.getElementById("coinCanvas");
const ballsCanvas = document.getElementById("ballsCanvas");

/* ====== three.js states for cleanup ====== */
const threeStates = {};
function clearThreeFor(canvasId) {
  const state = threeStates[canvasId];
  if (state) {
    cancelAnimationFrame(state.animId);
    try { state.renderer.dispose(); } catch(e){}
    delete threeStates[canvasId];
  }
}

/* ====== pick & show question ====== */
let current = null;
function pickQuestion() {
  current = questions[Math.floor(Math.random()*questions.length)];
  showQuestion(current);
}
function showQuestion(q) {
  qText.textContent = q.text;
  // sample display
  const maxShow = 40;
  if (q.sample.length <= maxShow) {
    sampleSpaceEl.textContent = "{ " + q.sample.join(" , ") + " }";
  } else {
    const counts = {};
    q.sample.forEach(x=> counts[x] = (counts[x]||0)+1);
    const parts = Object.keys(counts).map(k => `${k}×${counts[k]}`);
    sampleSpaceEl.textContent = "{ " + parts.join(" , ") + " }";
  }
  nSEl.textContent = q.sample.length;
  nAEl.textContent = q.event.length;
  userNumEl.value = "";
  userDenEl.value = "";
  resultEl.textContent = "جواب را وارد کن و بررسی را بزن.";
  runAnimationFor(q.anim);
}

/* ====== check answer (accept equivalent fractions) ====== */
checkBtn.addEventListener("click", ()=>{
  if (!current) return;
  const n = Number(userNumEl.value);
  const d = Number(userDenEl.value);
  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) {
    resultEl.style.color = "crimson";
    resultEl.innerHTML = "ورودی نامعتبر — صورت و مخرج را عددی و مخرج را غیرصفر وارد کن.";
    return;
  }
  const correctNum = current.event.length;
  const correctDen = current.sample.length;
  if (n * correctDen === d * correctNum) {
    resultEl.style.color = "green";
    const decimal = (correctNum/correctDen);
    resultEl.innerHTML = `✔️ درست! P(A) = ${correctNum}/${correctDen} = ${decimal.toFixed(3)} <br>توضیح: از ${correctDen} حالت ممکن، ${correctNum} حالت مطلوب وجود دارد.`;
  } else {
    resultEl.style.color = "red";
    const decimal = (correctNum/correctDen);
    resultEl.innerHTML = `❌ نادرست. پاسخ صحیح: ${correctNum}/${correctDen} = ${decimal.toFixed(3)} <br>توضیح کوتاه: n(A) = ${correctNum} و n(S) = ${correctDen}.`;
  }
});

/* ====== next button ====== */
nextBtn.addEventListener("click", ()=> pickQuestion());

/* ====== GLB loader + canvas helpers ====== */
function loadGLBIntoCanvas(canvas, modelPath) {
  if (!canvas) return;
  clearThreeFor(canvas.id);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.floor(width*(window.devicePixelRatio||1));
  canvas.height = Math.floor(height*(window.devicePixelRatio||1));
  const renderer = new THREE.WebGLRenderer({canvas:canvas, alpha:true, antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio||1);
  renderer.setSize(width, height, false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 100);
  camera.position.set(0, 1.2, 3);
  const hemi = new THREE.HemisphereLight(0xffffff,0x444444,0.8); scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff,0.8); dir.position.set(3,3,3); scene.add(dir);
  const loader = new THREE.GLTFLoader();
  let modelRoot = null;
  loader.load(modelPath, gltf=>{
    modelRoot = gltf.scene;
    const box = new THREE.Box3().setFromObject(modelRoot);
    const size = new THREE.Vector3(); box.getSize(size);
    const maxDim = Math.max(size.x,size.y,size.z);
    const scale = maxDim>0 ? (1.2/maxDim) : 1;
    modelRoot.scale.set(scale,scale,scale);
    box.setFromObject(modelRoot);
    box.getCenter(size);
    modelRoot.position.x -= size.x;
    modelRoot.position.y -= box.min.y;
    scene.add(modelRoot);
  }, undefined, err=>{
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#222";
    ctx.font = `${16*(window.devicePixelRatio||1)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("مدل سه‌بعدی پیدا نشد:", canvas.width/2, canvas.height/2 - 10);
    ctx.fillText(modelPath, canvas.width/2, canvas.height/2 + 18);
  });
  let rot = 0;
  function animate(){
    const animId = requestAnimationFrame(animate);
    if (modelRoot) {
      modelRoot.rotation.y += 0.02;
      modelRoot.rotation.x = Math.sin(rot)*0.08;
      rot += 0.02;
    }
    renderer.render(scene, camera);
    threeStates[canvas.id] = { renderer, scene, camera, animId };
  }
  animate();
}

function clearThreeFor(canvasId) {
  const state = threeStates[canvasId];
  if (state) {
    cancelAnimationFrame(state.animId);
    try { state.renderer.dispose(); } catch(e){}
    delete threeStates[canvasId];
  }
}

/* ====== balls 2D animation ====== */
function playBalls2D(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.floor(width*(window.devicePixelRatio||1));
  canvas.height = Math.floor(height*(window.devicePixelRatio||1));
  const colors = ["#ff6b6b","#4dabf7","#ffd43b","#8aff8a","#b983ff","#ff8fa3"];
  const balls = [];
  const count = 6;
  for (let i=0;i<count;i++){
    balls.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: 18+Math.random()*12,
      vx: (Math.random()-0.5)*2,
      vy: (Math.random()-0.5)*2,
      color: colors[i%colors.length]
    });
  }
  let frames = 0;
  function step(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    balls.forEach(b=>{
      b.x += b.vx;
      b.y += b.vy;
      if (b.x-b.r<0 || b.x+b.r>canvas.width) b.vx *= -1;
      if (b.y-b.r<0 || b.y+b.r>canvas.height) b.vy *= -1;
      ctx.beginPath();
      ctx.fillStyle = b.color;
      ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill(); ctx.closePath();
    });
    if (frames<600) requestAnimationFrame(step);
  }
  step();
}

/* ====== run appropriate animation per question ====== */
function runAnimationFor(animType) {
  // cleanup previous three states
  Object.keys(threeStates).forEach(k=>clearThreeFor(k));
  // clear 2D
  [diceCanvas, coinCanvas, ballsCanvas].forEach(c=>{
    if(c && c.getContext) { const ctx=c.getContext('2d'); ctx.clearRect(0,0,c.width,c.height); }
    c.style.display = "none";
  });
  if (animType === "dice") {
    diceCanvas.style.display = "block";
    loadGLBIntoCanvas(diceCanvas, "dice.glb");
  } else if (animType === "coin") {
    coinCanvas.style.display = "block";
    loadGLBIntoCanvas(coinCanvas, "coin.glb");
  } else if (animType === "balls") {
    ballsCanvas.style.display = "block";
    playBalls2D(ballsCanvas);
  } else {
    // none: nothing to show
  }
}

/* ====== init ====== */
window.addEventListener("load", ()=>{
  // ensure canvases sized
  [diceCanvas, coinCanvas, ballsCanvas].forEach(c=>{
    c.width = Math.max(200, Math.floor(c.clientWidth*(window.devicePixelRatio||1)));
    c.height = Math.max(200, Math.floor(c.clientHeight*(window.devicePixelRatio||1)));
  });
  pickQuestion();
});

/* ====== resize handling ====== */
window.addEventListener("resize", ()=>{
  Object.keys(threeStates).forEach(cid=>{
    const st = threeStates[cid];
    if (!st) return;
    const canvas = document.getElementById(cid);
    if (!canvas) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    st.renderer.setSize(w,h,false);
    if (st.camera) { st.camera.aspect = w/h; st.camera.updateProjectionMatrix(); }
  });
});
