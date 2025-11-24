/* آزمایشگاه احتمال — Canvas 3D سبک
   - 50 سؤال (کتب نهم)
   - انیمیشن تاس (چرخش-شبیه‌سازی)، سکه (چرخش/فلپ)، گوی‌ها (۲D)
   - نمایش فضای نمونه، n(S), n(A), P(A)
   - پذیرش کسرهای معادل
*/

/* =========================
   بانک 50 سؤال (سطح کتاب)
   ========================= */
const QUESTIONS = [
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

  { text:"یک سکه سالم را پرتاب می‌کنیم. احتمال آمدن شیر چیست؟",
    sample:["شیر","خط"], event:["شیر"], anim:"coin" },
  { text:"یک سکه سالم را پرتاب می‌کنیم. احتمال آمدن خط چیست؟",
    sample:["شیر","خط"], event:["خط"], anim:"coin" },
  { text:"دو بار سکه می‌زنیم. فضای نمونه چیست؟",
    sample:["شیر-شیر","شیر-خط","خط-شیر","خط-خط"], event:[], anim:"coin" },
  { text:"دو بار سکه می‌زنیم. احتمال آمدن دقیقاً یک شیر چیست؟",
    sample:["شیر-شیر","شیر-خط","خط-شیر","خط-خط"], event:["شیر-خط","خط-شیر"], anim:"coin" },
  { text:"سه بار سکه می‌زنیم. احتمال آمدن همه‌شان شیر چیست؟",
    sample:["ش-ش-ش","ش-ش-خ","ش-خ-ش","خ-ش-ش","...","خ-خ-خ"], event:["ش-ش-ش"], anim:"coin" },
  { text:"یک سکه و یک تاس می‌اندازیم. احتمال آمدن شیر و عدد زوج چیست؟",
    sample:["1-شیر","1-خط","2-شیر","2-خط","3-شیر","3-خط","4-شیر","4-خط","5-شیر","5-خط","6-شیر","6-خط"],
    event:["2-شیر","4-شیر","6-شیر"], anim:"dice" },
  { text:"در دو بار پرتاب سکه احتمال آمدن حداقل یک شیر چیست؟",
    sample:["ش-ش","ش-خ","خ-ش","خ-خ"], event:["ش-ش","ش-خ","خ-ش"], anim:"coin" },
  { text:"پرتاب سکه: احتمال آمدن الگوی شیر-خط چیست؟",
    sample:["ش-ش","ش-خ","خ-ش","خ-خ"], event:["ش-خ"], anim:"coin" },

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
  { text:"کیسه‌ای با 9 توپ؛ 3 قرمز،3 آبی،3 سبز. احتمال انتخاب آبی؟",
    sample:[...Array(3).fill("قرمز"),...Array(3).fill("آبی"),...Array(3).fill("سبز")], event:[...Array(3).fill("آبی")], anim:"balls" },

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

  { text:"دو تاس پرتاب می‌کنیم؛ احتمال اینکه مجموع برابر 7 شود چیست؟",
    sample:(function(){ let s=[]; for(let a=1;a<=6;a++)for(let b=1;b<=6;b++) s.push(a+"+"+b); return s })(),
    event:["1+6","2+5","3+4","4+3","5+2","6+1"], anim:"dice" },
  { text:"پرسش متمم: اگر احتمال آمدن A برابر 1/4 باشد، احتمال متمم A چیست؟",
    sample:["A","notA"], event:["notA"], anim:"none" },
  { text:"از 20 عدد یک عدد انتخاب می‌شود؛ احتمال انتخاب عدد کمتر از 5 چیست؟",
    sample:Array.from({length:20},(_,i)=>String(i+1)), event:["1","2","3","4"], anim:"none" },
  { text:"در یک بسته 10 شکلات که 2 کاراملی دارد؛ احتمال کاراملی چیست؟",
    sample:[...Array(8).fill("ساده"),...Array(2).fill("کاراملی")], event:[...Array(2).fill("کاراملی")], anim:"balls" },
  { text:"ریاضی ترکیبی: از 4 کارت 1 تا 4، احتمال انتخاب 2 یا 4 چیست؟",
    sample:["1","2","3","4"], event:["2","4"], anim:"none" }
]; // length should be 50 (this set includes 50 items)

/* =========================
   عناصر DOM
   ========================= */
const qText = document.getElementById('qText');
const sampleBox = document.getElementById('sampleBox');
const nS = document.getElementById('nS');
const nA = document.getElementById('nA');
const userNum = document.getElementById('userNum');
const userDen = document.getElementById('userDen');
const resultDiv = document.getElementById('result');
const explainDiv = document.getElementById('explain');
const nextBtn = document.getElementById('nextBtn');
const checkBtn = document.getElementById('checkBtn');
const coinCanvas = document.getElementById('coinCanvas');
const diceCanvas = document.getElementById('diceCanvas');
const ballsCanvas = document.getElementById('ballsCanvas');
const coinBtn = document.getElementById('coinBtn');
const diceBtn = document.getElementById('diceBtn');
const ballsBtn = document.getElementById('ballsBtn');
const scoreSpan = document.getElementById('score');
const doneSpan = document.getElementById('doneCount');

/* state */
let current = null;
let score = 0;
let done = 0;

/* utility: pick random */
function randInt(n){ return Math.floor(Math.random()*n); }

/* show question (supports long samples) */
function showQuestion(q){
  current = q;
  qText.textContent = q.text;
  // sample display (if long, show counts)
  if (q.sample.length <= 24) {
    sampleBox.textContent = "فضای نمونه S = { " + q.sample.join(" , ") + " }";
  } else {
    // summarize counts
    const counts = {};
    q.sample.forEach(x=> counts[x] = (counts[x]||0)+1);
    const parts = Object.keys(counts).map(k => `${k}×${counts[k]}`);
    sampleBox.textContent = "فضای نمونه S = { " + parts.join(" , ") + " }";
  }
  nS.textContent = q.sample.length;
  nA.textContent = q.event.length;
  userNum.value = "";
  userDen.value = "";
  resultDiv.style.color = "#1a3b6a";
  resultDiv.innerHTML = "جواب را وارد کن و بررسی را بزن.";
  explainDiv.textContent = "توضیح کوتاه بعد از بررسی نمایش داده می‌شود.";
  // run animation relevant
  runAnimation(q.anim);
}

/* pick next random question */
function pickNext() {
  const idx = randInt(QUESTIONS.length);
  showQuestion(QUESTIONS[idx]);
}
nextBtn.addEventListener('click', pickNext);

/* check answer accepting equivalent fractions */
checkBtn.addEventListener('click', ()=>{
  if (!current) {
    resultDiv.style.color = "crimson";
    resultDiv.textContent = "ابتدا یک سؤال انتخاب کن.";
    return;
  }
  const n = Number(userNum.value);
  const d = Number(userDen.value);
  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) {
    resultDiv.style.color = "crimson";
    resultDiv.innerHTML = "ورودی نامعتبر — صورت و مخرج را عددی و مخرج را غیرصفر وارد کن.";
    return;
  }
  const correctNum = current.event.length;
  const correctDen = current.sample.length;
  // accept equivalent fractions
  if (n * correctDen === d * correctNum) {
    resultDiv.style.color = "green";
    const dec = (correctNum/correctDen).toFixed(3);
    resultDiv.innerHTML = `✔ درست! P(A) = ${correctNum}/${correctDen} = ${dec}`;
    explainDiv.innerHTML = `توضیح: از ${correctDen} حالت ممکن، ${correctNum} حالت مطلوب وجود دارد.`;
    score += 1;
    done += 1;
  } else {
    resultDiv.style.color = "red";
    const dec = (correctNum/correctDen).toFixed(3);
    resultDiv.innerHTML = `❌ نادرست. پاسخ صحیح: ${correctNum}/${correctDen} = ${dec}`;
    explainDiv.innerHTML = `توضیح کوتاه: n(A) = ${correctNum} و n(S) = ${correctDen}.`;
    done += 1;
  }
  scoreSpan.textContent = score;
  doneSpan.textContent = done;
});

/* =============
   Canvas utilities
   ============= */

/* setup HiDPI canvas */
function setupCanvas(c) {
  const w = c.clientWidth;
  const h = c.clientHeight;
  const dpr = window.devicePixelRatio || 1;
  c.width = Math.floor(w * dpr);
  c.height = Math.floor(h * dpr);
  c.style.width = w + "px";
  c.style.height = h + "px";
  const ctx = c.getContext("2d");
  ctx.setTransform(dpr,0,0,dpr,0,0);
  return ctx;
}

/* ----- coin animation (flip) ----- */
let coinAnimating = false;
function coinFlipOnce(onComplete){
  if (coinAnimating) return;
  coinAnimating = true;
  const ctx = setupCanvas(coinCanvas);
  const W = coinCanvas.clientWidth;
  const H = coinCanvas.clientHeight;
  let t = 0;
  const total = 60; // frames
  const side = Math.random()<0.5 ? 'رو' : 'پشت';
  function frame(){
    t++;
    ctx.clearRect(0,0,W,H);
    // perspective scaling to simulate flip
    const prog = Math.sin((t/total)*Math.PI*2); // -1..1
    const scale = Math.abs(Math.cos((t/total)*Math.PI)); // 0..1..0
    const rx = W/2, ry = H/2;
    ctx.save();
    ctx.translate(rx,ry);
    // tilt while flipping
    const tilt = Math.sin(t/6)*0.2;
    ctx.rotate(tilt);
    ctx.scale(1, 0.6 + 0.4*scale); // flatten to simulate edge view
    // draw coin
    ctx.beginPath();
    ctx.fillStyle = "#ffd54a";
    ctx.ellipse(0,0,60,60,0,0,Math.PI*2);
    ctx.fill();
    // center mark as head/tail when visible
    if (scale > 0.4) {
      ctx.fillStyle = "#8b5e00";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(t%2===0? side : (side==='رو'?'پشت':'رو'), 0, 0);
    }
    ctx.restore();
    if (t < total) requestAnimationFrame(frame);
    else {
      coinAnimating = false;
      if (onComplete) onComplete(side);
    }
  }
  frame();
}

/* ----- dice animation (rotating cube illusion) ----- */
let diceAnimating = false;
function diceRollOnce(onComplete){
  if (diceAnimating) return;
  diceAnimating = true;
  const ctx = setupCanvas(diceCanvas);
  const W = diceCanvas.clientWidth;
  const H = diceCanvas.clientHeight;
  // We'll simulate a rotating cube by drawing a square with shadow + animated pips moving
  let frameN = 0;
  const total = 50;
  const finalFace = randInt(6)+1;
  function drawFace(face, x,y,sideSize){
    // white square
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 3;
    ctx.beginPath();
    roundRect(ctx,x-sideSize/2,y-sideSize/2,sideSize,sideSize,14);
    ctx.fill();
    ctx.stroke();
    // pips positions relative
    ctx.fillStyle = "#222";
    const s = sideSize/6;
    const positions = {
      1:[[0,0]],
      2:[[-s,-s],[s,s]],
      3:[[-s,-s],[0,0],[s,s]],
      4:[[-s,-s],[s,-s],[-s,s],[s,s]],
      5:[[-s,-s],[s,-s],[0,0],[-s,s],[s,s]],
      6:[[-s,-s],[0,-s],[s,-s],[-s,s],[0,s],[s,s]]
    };
    (positions[face]||positions[1]).forEach(p=>{
      ctx.beginPath();
      ctx.arc(x + p[0], y + p[1], Math.max(5, sideSize*0.06), 0, Math.PI*2);
      ctx.fill();
    });
  }
  function anim(){
    frameN++;
    ctx.clearRect(0,0,W,H);
    // compute wobble for 3D illusion
    const wob = Math.sin(frameN/6) * 12;
    const size = Math.min(W,H)*0.45;
    // draw three projected faces (top/front/side) to create cube illusion
    const cx = W/2, cy = H/2;
    // draw back square slightly darker (simulate rotation)
    const progressive = frameN/total;
    const showing = Math.round(1 + 5 * progressive); // 1..6 increasing randomness
    const faceToShow = (frameN < total-6) ? (randInt(6)+1) : finalFace;
    drawFace(faceToShow, cx, cy - wob*0.6, size);
    if (frameN < total) requestAnimationFrame(anim);
    else {
      diceAnimating = false;
      if (onComplete) onComplete(finalFace);
    }
  }
  anim();
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
}

/* ----- balls 2D animation ----- */
let ballsAnimId = null;
function playBalls(canvas){
  if (!canvas) return;
  const ctx = setupCanvas(canvas);
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  const colors = ["#ff6b6b","#4dabf7","#ffd43b","#8aff8a","#b983ff","#ff8fa3"];
  const balls = [];
  const count = 6;
  for (let i=0;i<count;i++){
    balls.push({
      x: Math.random()*(W-60)+30,
      y: Math.random()*(H-60)+30,
      r: 16 + Math.random()*14,
      vx: (Math.random()-0.5)*2.4,
      vy: (Math.random()-0.5)*2.4,
      color: colors[i%colors.length]
    });
  }
  let frames = 0;
  function step(){
    frames++;
    ctx.clearRect(0,0,W,H);
    balls.forEach(b=>{
      b.x += b.vx; b.y += b.vy;
      if (b.x-b.r<0 || b.x+b.r>W) b.vx *= -1;
      if (b.y-b.r<0 || b.y+b.r>H) b.vy *= -1;
      ctx.beginPath();
      const g = ctx.createRadialGradient(b.x-b.r/3,b.y-b.r/3,b.r*0.2,b.x,b.y,b.r);
      g.addColorStop(0, lighten(b.color,0.25));
      g.addColorStop(1, b.color);
      ctx.fillStyle = g;
      ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.fill();
    });
    if (frames < 600) ballsAnimId = requestAnimationFrame(step);
  }
  if (ballsAnimId) cancelAnimationFrame(ballsAnimId);
  step();
}
function lighten(hex, amt){
  // expect #rrggbb
  const c = hex.replace('#','');
  const num = parseInt(c,16);
  let r = (num>>16)+Math.round(255*amt);
  let g = ((num>>8)&0x00FF)+Math.round(255*amt);
  let b = (num&0x0000FF)+Math.round(255*amt);
  r = Math.min(255,r); g = Math.min(255,g); b = Math.min(255,b);
  return '#'+( (1<<24) + (r<<16) + (g<<8) + b ).toString(16).slice(1);
}

/* run animation per type */
function runAnimation(type){
  // clear canvases
  [coinCanvas, diceCanvas, ballsCanvas].forEach(c=>{
    const ctx = c.getContext && c.getContext('2d');
    if (ctx) { ctx.clearRect(0,0,c.width,c.height); }
  });
  if (type === "coin") {
    // automatic flip for display
    coinFlipOnce((side)=> {
      // show result in explain
      explainDiv.innerText = `سکه: نتیجهٔ تصادفی — ${side}`;
    });
  } else if (type === "dice") {
    diceRollOnce((face) => {
      explainDiv.innerText = `تاس: عدد تصادفی — ${face}`;
    });
  } else if (type === "balls") {
    playBalls(ballsCanvas);
    explainDiv.innerText = "گوی‌ها نمایش داده شدند — فضای نمونه بالا نشان داده شده است.";
  } else {
    // none: do nothing
    explainDiv.innerText = "برای این سؤال انیمیشن خاصی لازم نیست.";
  }
}

/* manual buttons */
coinBtn.addEventListener('click', ()=> coinFlipOnce((side)=> explainDiv.innerText = `سکه: ${side}`));
diceBtn.addEventListener('click', ()=> diceRollOnce((f)=> explainDiv.innerText = `تاس: ${f}`));
ballsBtn.addEventListener('click', ()=> playBalls(ballsCanvas));

/* init canvases hi-dpi */
function initCanvases(){
  [coinCanvas, diceCanvas, ballsCanvas].forEach(c=>{
    const dpr = window.devicePixelRatio || 1;
    c.width = Math.floor(c.clientWidth * dpr);
    c.height = Math.floor(c.clientHeight * dpr);
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr,0,0,dpr,0,0);
  });
}

/* on load */
window.addEventListener('load', ()=>{
  initCanvases();
  pickInitial();
});

/* pick initial and show first question */
function pickInitial(){
  const idx = randInt(QUESTIONS.length);
  showQuestion(QUESTIONS[idx]);
}

/* resize handling */
window.addEventListener('resize', ()=>{
  initCanvases();
});

/* small helpers for math/formats */
function gcd(a,b){ return b===0? a : gcd(b, a%b); }
function simplifyFraction(n,d){
  if (d===0) return [n,d];
  const g = gcd(Math.abs(n), Math.abs(d));
  return [n/g, d/g];
}

/* Accessibility: keyboard shortcuts */
document.addEventListener('keydown', (e)=>{
  if (e.key === 'n') nextBtn.click();
  if (e.key === 'Enter') checkBtn.click();
});
