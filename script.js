let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");
let nameElement = document.getElementById("name");
let authorLink = document.getElementById("authorLink");

let clickCount = 0; // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
    "？你认真的吗…",
    "要不再想想？",
    "不许选这个！ ",
    "我会很伤心…",
    "不:("
];

// 从 URL 参数中获取名字
function getNameFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("name") || "亲爱的"; // 如果没有传入 name 参数，默认使用“亲爱的”
}

// 在页面加载时设置名字
window.onload = function() {
    nameElement.textContent = getNameFromUrl();

    // 如果 URL 中包含 name 参数，隐藏跳转链接
    const nameParam = new URLSearchParams(window.location.search).get("name");
    if (nameParam) {
        authorLink.style.display = "none";
    }
};

// No 按钮点击事件
noButton.addEventListener("click", function() {
    clickCount++;

    // 让 Yes 变大，每次放大 2 倍
    let yesSize = 1 + (clickCount * 1.2);
    yesButton.style.transform = `scale(${yesSize})`;

    // 挤压 No 按钮，每次右移 100px
    let noOffset = clickCount * 50;
    noButton.style.transform = `translateX(${noOffset}px)`;

    // **新增：让图片和文字往上移动**
    let moveUp = clickCount * 25; // 每次上移 20px
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;

    // No 文案变化（前 5 次变化）
    if (clickCount <= 5) {
        noButton.innerText = noTexts[clickCount - 1];
    }

    // 图片变化（前 5 次变化）
    if (clickCount === 1) mainImage.src = "images/shocked.png"; // 震惊
    if (clickCount === 2) mainImage.src = "images/think.png"; // 思考
    if (clickCount === 3) mainImage.src = "images/angry.png"; // 生气
    if (clickCount === 4) mainImage.src = "images/crying.png"; // 哭
    if (clickCount >= 5) mainImage.src = "images/crying.png"; // 之后一直是哭
});

// Yes 按钮点击后，进入表白成功页面
yesButton.addEventListener("click", function() {
    document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text">我就知道！♡(Ξ◕◡◕Ξ)♡</h1>
            <img src="images/hug.png" alt="拥抱" class="yes-image">
        </div>
    `;

    document.body.style.overflow = "hidden";
});