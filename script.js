let score = 0;

const examples = [
    { text: "در پرتاب یک تاس، احتمال آمدن عدد ۶؟", num: 1, den: 6 },
    { text: "در کلاس ۳۰ نفره، ۱۷ نفر دختر و بقیه پسرند. احتمال انتخاب یک پسر؟", num: 13, den: 30 },
    { text: "در سکه، احتمال آمدن رو چیست؟", num: 1, den: 2 },
    { text: "۴ توپ قرمز، ۳ آبی، ۲ سبز. احتمال انتخاب سبز؟", num: 2, den: 9 },
    { text: "در یک خانواده، دو فرزند دارند. احتمال اینکه یکی دختر باشد؟", num: 3, den: 4 },
    { text: "در پرتاب دو تاس، احتمال مجموع ۷؟", num: 6, den: 36 },
    { text: "۱۰ کارت داریم که ۴ تا طلایی هستند. احتمال انتخاب طلایی؟", num: 4, den: 10 },
    { text: "در کلاس ۲۰ نفره، ۸ نفر تک‌فرزند هستند. احتمال انتخاب فرد تک‌فرزند؟", num: 8, den: 20 },
    { text: "در خانواده‌ای سه فرزند، احتمال اینکه ۲ دختر و ۱ پسر باشند؟", num: 3, den: 8 },
];

let current = null;

function loadExample() {
    const rnd = Math.floor(Math.random() * examples.length);
    current = examples[rnd];

    document.getElementById("exampleText").textContent = current.text;
    document.getElementById("resultBox").textContent = "";
    document.getElementById("numInput").value = "";
    document.getElementById("denInput").value = "";
}

// ----------------- محاسبه احتمال -----------------
function calculate() {
    if (!current) return alert("اول یک مثال انتخاب کن!");

    let userNum = Number(document.getElementById("numInput").value);
    let userDen = Number(document.getElementById("denInput").value);

    if (userDen === 0) return alert("مخرج صفر نمی‌شود!");

    let resultBox = document.getElementById("resultBox");

    if (userNum === current.num && userDen === current.den) {
        score++;
        document.getElementById("score").textContent = score;

        resultBox.innerHTML =
            "🎉✔️ درست گفتی!<br>احتمال = " + (current.num / current.den).toFixed(3);
    } else {
        resultBox.innerHTML =
            "❌ اشتباه شد!<br>جواب درست: " +
            current.num + "/" + current.den +
            "<br>احتمال = " + (current.num / current.den).toFixed(3);
    }
}

// ----------------- تاس سه‌بعدی -----------------
function rollDice3D() {
    const dice = document.getElementById("dice3D");
    dice.classList.remove("hidden");

    const roll = Math.floor(Math.random() * 6) + 1;
    dice.style.backgroundImage =
        `url('https://raw.githubusercontent.com/Ardakilic/dice/master/dice-six-faces-${roll}.png')`;
}

// ----------------- سکه چرخان -----------------
function flipCoin() {
    const coin = document.getElementById("coin");
    coin.classList.remove("hidden");

    const side = Math.random() < 0.5 ? "رو" : "پشت";

    coin.style.animation = "none";
    void coin.offsetWidth; 
    coin.style.animation = "spinCoin 1s";

    setTimeout(() => {
        alert("نتیجه سکه: " + side);
    }, 900);
}

// ----------------- توپ‌های رنگی -----------------
function showBalls() {
    const box = document.getElementById("ballsBox");
    box.classList.remove("hidden");
    box.innerHTML = "";

    const colors = ["red", "blue", "green", "yellow", "purple"];
    const count = Math.floor(Math.random() * 6) + 5;

    for (let i = 0; i < count; i++) {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        ball.style.background = colors[i % colors.length];
        box.appendChild(ball);
    }
}
