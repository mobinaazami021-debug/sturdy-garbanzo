/* script.js — آزمایشگاه احتمال (Canvas سبک)
   ویژگی‌ها:
   - 50 سؤال (آرایه QUESTIONS)
   - نمایش فضای نمونه S، n(S)، n(A)، فرمول
   - پذیرش کسرهای معادل
   - اجرای انیمیشن پیش‌نمایش در بارگذاری سؤال
   - اجرای انیمیشن واقعی و نمایش نتیجه هنگام "بررسی"
*/

/* ===== بانک 50 سؤال ===== */
const QUESTIONS = [
  { text:"پرتاب یک سکه — احتمال آمدن شیر؟",
    sample:["شیر","خط"], event:["شیر"], anim:"coin" },

  { text:"پرتاب یک سکه — احتمال آمدن خط؟",
    sample:["شیر","خط"], event:["خط"], anim:"coin" },

  { text:"تاس — احتمال آمدن 6؟",
    sample:["1","2","3","4","5","6"], event:["6"], anim:"dice" },

  { text:"تاس — احتمال عدد زوج؟",
    sample:["1","2","3","4","5","6"], event:["2","4","6"], anim:"dice" },

  { text:"کیسه: 3 قرمز،2 آبی — احتمال قرمز؟",
    sample:["قرمز","قرمز","قرمز","آبی","آبی"], event:["قرمز","قرمز","قرمز"], anim:"balls" },

  { text:"کیسه: 4 سبز،1 زرد — احتمال زرد؟",
    sample:["سبز","سبز","سبز","سبز","زرد"], event:["زرد"], anim:"balls" },

  { text:"دو سکه — احتمال هر دو شیر؟",
    sample:["ش-ش","ش-خ","خ-ش","خ-خ"], event:["ش-ش"], anim:"coin" },
  { text:"دو سکه — احتمال دقیقا یک شیر؟",
    sample:["ش-ش","ش-خ","خ-ش","خ-خ"], event:["ش-خ","خ-ش"], anim:"coin" },
  { text:"سه بار سکه — احتمال همه شیر؟",
    sample:["ش-ش-ش","ش-ش-خ","ش-خ-ش","خ-ش-ش","...","خ-خ-خ"], event:["ش-ش-ش"], anim:"coin" },

  { text:"تاس — احتمال عدد کمتر از 4؟",
    sample:["1","2","3","4","5","6"], event:["1","2","3"], anim:"dice" },

  { text:"تاس — احتمال عدد بزرگ‌تر از 4؟",
    sample:["1","2","3","4","5","6"], event:["5","6"], anim:"dice" },

  { text:"کیسه: 2 آبی،3 قرمز — احتمال آبی؟",
    sample:["آبی","آبی","قرمز","قرمز","قرمز"], event:["آبی","آبی"], anim:"balls" },

  { text:"جعبه: 3 قرمز،4 آبی،3 سبز — احتمال سبز؟",
    sample:[...Array(3).fill("قرمز"),...Array(4).fill("آبی"),...Array(3).fill("سبز")],
    event:[...Array(3).fill("سبز")], anim:"balls" },

  { text:"اعداد 1..10 — احتمال عدد زوج؟",
    sample:Array.from({length:10},(_,i)=>String(i+1)),
    event:["2","4","6","8","10"], anim:"none" },

  { text:"اعداد 1..20 — احتمال مضرب 5؟",
    sample:Array.from({length:20},(_,i)=>String(i+1)),
    event:["5","10","15","20"], anim:"none" },

  { text:"خانواده دو فرزند — احتمال هر دو دختر؟",
    sample:["د-د","د-پ","پ-د","پ-پ"], event:["د-د"], anim:"none" },

  { text:"کارت 1..5 — احتمال انتخاب 1 یا 5؟",
    sample:["1","2","3","4","5"], event:["1","5"], anim:"none" },

  { text:"کیسه: 5 گوی — 2 کاراملی،3 ساده — احتمال کاراملی؟",
    sample:["ساده","ساده","ساده","کاراملی","کاراملی"], event:["کاراملی","کاراملی"], anim:"balls" },

  { text:"دو تاس — احتمال مجموع 7؟",
    sample:(function(){let s=[]; for(let a=1;a<=6;a++)for(let b=1;b<=6;b++) s.push(a+"+"+b); return s;})(),
    event:["1+6","2+5","3+4","4+3","5+2","6+1"], anim:"dice" },

  { text:"دو تاس — احتمال مجموع 2؟",
    sample:(function(){let s=[]; for(let a=1;a<=6;a++)for(let b=1;b<=6;b++) s.push(a+"+"+b); return s;})(),
    event:["1+1"], anim:"dice" },

  { text:"کیسه: 7 توپ — 1 طلایی،6 معمولی — احتمال طلایی؟",
    sample:[...Array(6).fill("معمولی"),"طلایی"], event:["طلایی"], anim:"balls" },

  { text:"کلاس 30 نفر — 12 دختر — احتمال انتخاب دختر؟",
    sample:[...Array(18).fill("پسر"),...Array(12).fill("دختر")], event:[...Array(12).fill("دختر")], anim:"balls" },

  { text:"اعداد 1..15 — احتمال مضرب 5؟",
    sample:Array.from({length:15},(_,i)=>String(i+1)), event:["5","10","15"], anim:"none" },

  { text:"کارت 1..10 — احتمال 3 یا 7؟",
    sample:Array.from({length:10},(_,i)=>String(i+1)), event:["3","7"], anim:"none" },

  { text:"تاس — احتمال نیامدن 6؟",
    sample:["1","2","3","4","5","6"], event:["1","2","3","4","5"], anim:"dice" },

  { text:"کیسه: 8 توپ،3 خراب — احتمال انتخاب سالم؟",
    sample:[...Array(5).fill("سالم"),...Array(3).fill("خراب")], event:[...Array(5).fill("سالم")], anim:"balls" },

  { text:"اعداد1..9 — احتمال انتخاب عدد فرد؟",
    sample:Array.from({length:9},(_,i)=>String(i+1)), event:["1","3","5","7","9"], anim:"none" },

  { text:"کیسه: 3 قرمز،3 آبی — احتمال آبی؟",
    sample:[...Array(3).fill("قرمز"),...Array(3).fill("آبی")], event:[...Array(3).fill("آبی")], anim:"balls" },

  { text:"سکه — احتمال پشت پشت پشت (3 بار)؟",
    sample:["پ-پ-پ","پ-پ-ش","پ-ش-پ","ش-پ-پ","..."], event:["پ-پ-پ"], anim:"coin" },

  { text:"تاس — احتمال عدد 4 یا 5؟",
    sample:["1","2","3","4","5","6"], event:["4","5"], anim:"dice" },

  { text:"کیسه: 10 توپ — 6 سبز،4 زرد — احتمال زرد؟",
    sample:[...Array(6).fill("سبز"),...Array(4).fill("زرد")], event:[...Array(4).fill("زرد")], anim:"balls" },

  { text:"دو تاس — احتمال مجموع زوج؟",
    sample:(function(){let s=[]; for(let a=1;a<=6;a++)for(let b=1;b<=6;b++) s.push(a+"+"+b); return s;})(),
    event:(function(){ let arr=[]; for(let a=1;a<=6;a++)for(let b=1;b<=6;b++) if((a+b)%2===0) arr.push(a+"+"+b); return arr; })(), anim:"dice" },

  { text:"کلاس 12 نفر — 4 عینکی — احتمال انتخاب عینکی؟",
    sample:[...Array(4).fill("عینکی"),...Array(8).fill("بدون")], event:[...Array(4).fill("عینکی")], anim:"balls" },

  { text:"تاس — احتمال عدد اول (2،3،5)؟",
    sample:["1","2","3","4","5","6"], event:["2","3","5"], anim:"dice" },

  { text:"کیسه: 5 گوی: 2 کاراملی — احتمال کاراملی؟",
    sample:[...Array(3).fill("ساده"),...Array(2).fill("کاراملی")], event:[...Array(2).fill("کاراملی")], anim:"balls" },

  { text:"کارت 1..4 — احتمال 2 یا 4؟",
    sample:["1","2","3","4"], event:["2","4"], anim:"none" },

  { text:"تاس — احتمال عدد ≤ 4؟",
    sample:["1","2","3","4","5","6"], event:["1","2","3","4"], anim:"dice" },

  { text:"خانواده دو فرزند — احتمال حداقل یک دختر؟",
    sample:["د-د","د-پ","پ-د","پ-پ"], event:["د-د","د-پ","پ-د"], anim:"none" },

  { text:"تاس — احتمال مضرب 3؟",
    sample:["1","2","3","4","5","6"], event:["3","6"], anim:"dice" },

  { text:"کیسه: 7 توپ — احتمال انتخاب غیرقرمز؟",
    sample:[...Array(5).fill("قرمز"),...Array(2).fill("آبی")], event:[...Array(2).fill("آبی")], anim:"balls" },

  { text:"اعداد1..20 — احتمال انتخاب عدد مضرب 5؟",
    sample:Array.from({length:20},(_,i)=>String(i+1)), event:["5","10","15","20"], anim:"none" },

  { text:"سکه+تاس — احتمال شیر و عدد زوج؟",
    sample:(function(){let s=[]; for(let t=1;t<=6;t++){s.push(t+"-ش");s.push(t+"-پ");} return s;})(),
    event:(function(){let arr=[]; for(let t=1;t<=6;t++) if(t%2===0) arr.push(t+"-ش"); return arr; })(), anim:"dice" },

  { text:"کیسه: 9 توپ (3 هر رنگ) — احتمال آبی؟",
    sample:[...Array(3).fill("قرمز"),...Array(3).fill("آبی"),...Array(3).fill("سبز")], event:[...Array(3).fill("آبی")], anim:"balls" },

  { text:"تاس — احتمال عدد بین 2 و 5؟",
    sample:["1","2","3","4","5","6"], event:["2","3","4","5"], anim:"dice" },

  { text:"سکه — احتمال دقیقا یک شیر در دو پرتاب؟",
    sample:["ش-ش","ش-خ","خ-ش","خ-خ"], event:["ش-خ","خ-ش"], anim:"coin" },

  { text:"تاس — احتمال نیامدن عدد فرد؟",
    sample:["1","2","3","4","5","6"], event:["2","4","6"], anim:"dice" },

  { text:"کیسه: 3 قرمز،1 آبی،1 سبز — احتمال غیرقرمز؟",
    sample:["قرمز","قرمز","قرمز","آبی","سبز"], event:["آبی","سبز"], anim:"balls" }
]; // مجموع نزدیک 50 (قابل گسترش)

/* ====== دسترسی به DOM ====== */
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
const coinResultSpan = document.getElementById('coinResult');
const diceResultSpan = document.getElementById('diceResult');
const ballsResultSpan = document.getElementById('ballsResult');
const scoreSpan = document.getElementById('score');
const doneSpan = document.getElementById('done');

let current = null;
let score = 0, done = 0;

/* ====== helper: simplify fraction and gcd ====== */
function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); if(!b) return a; return gcd(b, a%b); }
function simplify(n,d){ if(d===0) return [n,d]; const g=gcd(n,d); return [n/g, d/g]; }

/* ====== نمایش سؤال ====== */
function pickQuestion(){
  current = QUESTIONS[Math.floor(Math.random()*QUESTIONS.length)];
  showQuestion(current);
}
function showQuestion(q){
  qText.textContent = q.text;
  // نمایش فضای نمونه (خلاصه اگر طولانی)
  if(q.sample.length <= 28){
    sampleBox.textContent = "فضای نمونه S = { " + q.sample.join(" , ") + " }";
  } else {
    const counts = {};
    q.sample.forEach(x => counts[x] = (counts[x]||0)+1);
    const parts = Object.keys(counts).map(k=> `${k}×${counts[k]}`);
    sampleBox.textContent = "فضای نمونه S = { " + parts.join(" , ") + " }";
  }
  nS.textContent = q.sample.length;
  nA.textContent = q.event.length;
  resultDiv.textContent = "جواب را وارد کن و بررسی را بزن.";
  resultDiv.style.color = "#1a3b6a";
  explainDiv.textContent = "توضیح کوتاه بعد از بررسی نمایش داده می‌شود.";
  userNum.value = "";
  userDen.value = "";
  // پیش‌نمایش انیمیشن (بدون نتیجهٔ واقعی)
  runAnimationPreview(q.anim);
}
nextBtn.addEventListener('click', pickQuestion);

/* ====== بررسی جواب ====== */
checkBtn.addEventListener('click', ()=>{
  if(!current){ alert("یک سؤال انتخاب کن."); return; }
  const a = Number(userNum.value);
  const b = Number(userDen.value);
  if(!Number.isFinite(a) || !Number.isFinite(b) || b===0){
    resultDiv.style.color = "crimson";
    resultDiv.innerHTML = "ورودی نامعتبر — صورت و مخرج را عددی و مخرج را غیر صفر وارد کن.";
    return;
  }
  const correctNum = current.event.length;
  const correctDen = current.sample.length;
  // مقایسه با روش معادل: a/b == correctNum/correctDen => a*correctDen == b*correctNum
  const ok = (a * correctDen === b * correctNum);
  // حالا هنگام بررسی: اجرای انیمیشن واقعی که نتیجهٔ تصادفی تولید می‌کند
  runAnimationWithResult(current.anim, (actual)=> {
    // actual: برای coin => "شیر" یا "خط"; dice => عدد; balls => رنگ/نام
    // نمایش نتایج و پاسخ صحیح
    const dec = (correctNum/correctDen).toFixed(3);
    if(ok){
      resultDiv.style.color = "green";
      resultDiv.innerHTML = `✔️ درست! P(A) = ${correctNum}/${correctDen} = ${dec}`;
      explainDiv.innerHTML = `توضیح: از ${correctDen} حالت ممکن، ${correctNum} حالت مطلوب وجود دارد.`;
      score += 1;
    } else {
      resultDiv.style.color = "red";
      resultDiv.innerHTML = `❌ نادرست. پاسخ صحیح: ${correctNum}/${correctDen} = ${dec}`;
      explainDiv.innerHTML = `توضیح کوتاه: n(A) = ${correctNum}، n(S) = ${correctDen}.`;
    }
    done += 1;
    scoreSpan.textContent = score;
    doneSpan.textContent = done;
    // در صورت نیاز می‌توان actual را هم در explain اضافه کرد
    explainDiv.innerHTML += `<br>نتیجهٔ نمونه‌ای (شبیه‌سازی) برای این پرسش: <b>${actual}</b>.`;
  });
});

/* ====== انیمیشن‌ها ====== */
/* helper: hi-dpi setup */
function setupCanvas(c){
  const dpr = window.devicePixelRatio || 1;
  const w = c.clientWidth;
  const h = c.clientHeight;
  c.width = Math.floor(w * dpr);
  c.height = Math.floor(h * dpr);
  c.style.width = w + "px";
  c.style.height = h + "px";
  const ctx = c.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);
  return ctx;
}

/* پیش‌نمایش ساده (چرخش / توپ‌ها حرکت می‌کنند) */
let previewAnimId = null;
function runAnimationPreview(type){
  // clear previous canvases
  [coinCanvas,diceCanvas,ballsCanvas].forEach(c=>{
    const ctx = c.getContext && c.getContext('2d');
    if(ctx) ctx.clearRect(0,0,c.width,c.height);
  });
  cancelAnimationFrame(previewAnimId);
  if(type === "coin") {
    // ملایم بچرخان سکه بدون نتیجه
    const ctx = setupCanvas(coinCanvas);
    let t=0;
    function frame(){
      t++;
      ctx.clearRect(0,0,coinCanvas.width,coinCanvas.height);
      ctx.save(); ctx.translate(coinCanvas.clientWidth/2, coinCanvas.clientHeight/2);
      ctx.rotate(t*0.04);
      ctx.fillStyle = "#f6c84c";
      ctx.beginPath(); ctx.ellipse(0,0,70,24,0,0,Math.PI*2); ctx.fill();
      ctx.restore();
      previewAnimId = requestAnimationFrame(frame);
    }
    frame();
  } else if(type === "dice"){
    const ctx = setupCanvas(diceCanvas);
    let t=0;
    function frame(){
      t++;
      ctx.clearRect(0,0,diceCanvas.width,diceCanvas.height);
      ctx.save(); ctx.translate(diceCanvas.clientWidth/2,diceCanvas.clientHeight/2);
      ctx.rotate(t*0.03);
      // مربع سفید
      const s = 90;
      ctx.fillStyle = "#fff"; ctx.fillRect(-s/2, -s/2, s, s);
      ctx.fillStyle="#222"; ctx.beginPath(); ctx.arc(0,0,10,0,Math.PI*2); ctx.fill();
      ctx.restore();
      previewAnimId = requestAnimationFrame(frame);
    }
    frame();
  } else if(type === "balls"){
    const ctx = setupCanvas(ballsCanvas);
    let balls = [];
    const colors = ["#ff6b6b","#4dabf7","#ffd43b","#8aff8a","#b983ff","#ff8fa3"];
    for(let i=0;i<6;i++){
      balls.push({ x: Math.random()*ballsCanvas.clientWidth, y: Math.random()*ballsCanvas.clientHeight, r: 14 + Math.random()*10, vx:(Math.random()-0.5)*2, vy:(Math.random()-0.5)*2, color:colors[i%colors.length] });
    }
    function frame(){
      ctx.clearRect(0,0,ballsCanvas.width,ballsCanvas.height);
      balls.forEach(b=>{
        b.x += b.vx; b.y += b.vy;
        if(b.x-b.r<0||b.x+b.r>ballsCanvas.clientWidth) b.vx *= -1;
        if(b.y-b.r<0||b.y+b.r>ballsCanvas.clientHeight) b.vy *= -1;
        ctx.beginPath(); ctx.fillStyle=b.color; ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill();
      });
      previewAnimId = requestAnimationFrame(frame);
    }
    frame();
  } else {
    // none: clear all
  }
}

/* اجرای انیمیشن واقعی و برگرداندن نتیجه توسط callback */
function runAnimationWithResult(type, callback){
  // پاک کردن نتایج قبلی
  coinResultSpan.textContent = "—";
  diceResultSpan.textContent = "—";
  ballsResultSpan.textContent = "—";
  // اجرا بسته به نوع
  if(type === "coin"){
    // نمایش پرتاب واقعی: چند دور چرخش سپس نتیجه
    const ctx = setupCanvas(coinCanvas);
    let t=0;
    const total = 70;
    const outcome = Math.random() < 0.5 ? "شیر" : "خط";
    function frame(){
      t++;
      ctx.clearRect(0,0,coinCanvas.width,coinCanvas.height);
      ctx.save(); ctx.translate(coinCanvas.clientWidth/2, coinCanvas.clientHeight/2);
      const rot = t*0.25;
      ctx.rotate(rot);
      const scale = 0.5 + 0.5 * Math.abs(Math.cos(t*0.12));
      ctx.scale(1, 0.5 + 0.5*scale);
      ctx.fillStyle = "#f6c84c";
      ctx.beginPath(); ctx.ellipse(0,0,70,24,0,0,Math.PI*2); ctx.fill();
      // اگر نزدیک پایان، نوشته نتیجه را نشان بده
      if(t>total-8){
        ctx.fillStyle="#222"; ctx.font="18px sans-serif"; ctx.textAlign="center"; ctx.fillText(outcome,0,4);
      }
      ctx.restore();
      if(t < total) requestAnimationFrame(frame);
      else {
        coinResultSpan.textContent = outcome;
        callback(outcome);
      }
    }
    frame();
  } else if(type === "dice"){
    const ctx = setupCanvas(diceCanvas);
    let t=0; const total=60;
    const face = Math.floor(Math.random()*6)+1;
    function frame(){
      t++;
      ctx.clearRect(0,0,diceCanvas.width,diceCanvas.height);
      ctx.save(); ctx.translate(diceCanvas.clientWidth/2,diceCanvas.clientHeight/2);
      ctx.rotate(t*0.06);
      // draw cube face (simple)
      const s = 90;
      ctx.fillStyle="#fff"; ctx.fillRect(-s/2,-s/2,s,s);
      ctx.fillStyle="#222";
      // draw pips for 'face' in center positions
      const pip = (i,j)=>{ ctx.beginPath(); ctx.arc(i,j,8,0,Math.PI*2); ctx.fill(); };
      const pos = {1:[[0,0]],2:[[-18,-18],[18,18]],3:[[-18,-18],[0,0],[18,18]],4:[[-18,-18],[18,-18],[-18,18],[18,18]],5:[[-18,-18],[18,-18],[0,0],[-18,18],[18,18]],6:[[-18,-20],[0,-20],[18,-20],[-18,20],[0,20],[18,20]]};
      (pos[face]||pos[1]).forEach(p=>pip(p[0],p[1]));
      ctx.restore();
      if(t < total) requestAnimationFrame(frame);
      else {
        diceResultSpan.textContent = face;
        callback(face);
      }
    }
    frame();
  } else if(type === "balls"){
    const ctx = setupCanvas(ballsCanvas);
    // فرض کن نمونه از current.sample و event دارد؛ انتخاب تصادفی یک مورد از sample نشان داده شود
    const sample = current.sample.slice();
    let t=0; const total = 80;
    // هر فریم چند توپ نمایش بده و در نهایت یکی را انتخاب کن
    const colors = ["#ff6b6b","#4dabf7","#ffd43b","#8aff8a","#b983ff","#ff8fa3"];
    function frame(){
      t++;
      ctx.clearRect(0,0,ballsCanvas.width,ballsCanvas.height);
      // draw moving orbs
      for(let i=0;i<8;i++){
        const ang = (t*0.02 + i)*Math.PI*2/8;
        const r = 60 + 10*Math.sin(t*0.1 + i);
        const x = ballsCanvas.clientWidth/2 + Math.cos(ang)*r;
        const y = ballsCanvas.clientHeight/2 + Math.sin(ang)*r;
        ctx.beginPath(); ctx.fillStyle = colors[i%colors.length]; ctx.arc(x,y,16,0,Math.PI*2); ctx.fill();
      }
      if(t < total) requestAnimationFrame(frame);
      else {
        // pick a random element from sample as result
        const pick = sample[Math.floor(Math.random()*sample.length)];
        ballsResultSpan.textContent = pick;
        callback(pick);
      }
    }
    frame();
  } else {
    // none: immediately callback with '-'
    callback("-");
  }
}

/* ====== آماده‌سازی اولیه ====== */
window.addEventListener('load', ()=>{
  // تنظیم سایز canvases hi-dpi
  [coinCanvas, diceCanvas, ballsCanvas].forEach(c=>{
    const dpr = window.devicePixelRatio || 1;
    c.width = Math.floor(c.clientWidth * dpr);
    c.height = Math.floor(c.clientHeight * dpr);
    const ctx = c.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0);
  });
  pickQuestion();
});

/* ====== کلیدهای میانبر ====== */
document.addEventListener('keydown', (e)=>{
  if(e.key === 'n') nextBtn.click();
  if(e.key === 'Enter') checkBtn.click();
});
