// MBTI 测试问题
const questions = [
    {
        question: "你更喜欢独自工作还是与团队合作？",
        options: [
            { text: "独自工作", dimension: "I", score: 1 },
            { text: "与团队合作", dimension: "E", score: 1 }
        ]
    },
    {
        question: "你更注重细节还是整体概念？",
        options: [
            { text: "细节", dimension: "S", score: 1 },
            { text: "整体概念", dimension: "N", score: 1 }
        ]
    },
    {
        question: "你更喜欢逻辑分析还是情感考虑？",
        options: [
            { text: "逻辑分析", dimension: "T", score: 1 },
            { text: "情感考虑", dimension: "F", score: 1 }
        ]
    },
    {
        question: "你更喜欢有计划的生活还是灵活的生活？",
        options: [
            { text: "有计划", dimension: "J", score: 1 },
            { text: "灵活", dimension: "P", score: 1 }
        ]
    },
    // 添加更多问题以增加准确性
    {
        question: "在聚会上，你更喜欢与很多人交谈还是与少数人深入交流？",
        options: [
            { text: "与少数人深入交流", dimension: "I", score: 1 },
            { text: "与很多人交谈", dimension: "E", score: 1 }
        ]
    },
    {
        question: "你更相信经验还是直觉？",
        options: [
            { text: "经验", dimension: "S", score: 1 },
            { text: "直觉", dimension: "N", score: 1 }
        ]
    },
    {
        question: "你更重视公平还是和谐？",
        options: [
            { text: "公平", dimension: "T", score: 1 },
            { text: "和谐", dimension: "F", score: 1 }
        ]
    },
    {
        question: "你更喜欢按时完成任务还是灵活调整？",
        options: [
            { text: "按时完成", dimension: "J", score: 1 },
            { text: "灵活调整", dimension: "P", score: 1 }
        ]
    },
    {
        question: "你更喜欢安静的环境还是热闹的环境？",
        options: [
            { text: "安静", dimension: "I", score: 1 },
            { text: "热闹", dimension: "E", score: 1 }
        ]
    },
    {
        question: "你更注重事实还是可能性？",
        options: [
            { text: "事实", dimension: "S", score: 1 },
            { text: "可能性", dimension: "N", score: 1 }
        ]
    }
];

// MBTI 类型描述
const descriptions = {
    "INTJ": "建筑师：有想象力和战略性的思想家，一切皆在计划之中。",
    "INTP": "逻辑学家：具有创造性的思想家，对知识有着不可遏制的渴望。",
    "ENTJ": "指挥官：大胆，想象力丰富，意志强烈的领导者田田！你最棒最棒最棒！！",
    "ENTP": "辩论家：聪明且充满好奇心的思想家，不会拒绝智力上的挑战。",
    "INFJ": "提倡者：富有创造性和鼓舞人心的理想主义者。",
    "INFP": "调停者：诗意，善良，利他主义的空想家。",
    "ENFJ": "主人公：富有魅力，鼓舞人心的领导者。",
    "ENFP": "竞选者：热情，创造性，社交的自由精神。",
    "ISTJ": "物流师：实际且注重事实的可靠者。",
    "ISFJ": "守护者：非常专注而温暖的守护者。",
    "ESTJ": "总经理：出色的管理者，在管理事物或人员方面无与伦比。",
    "ESFJ": "执政官：极有同情心，受欢迎而总是热心帮助他人。",
    "ISTP": "鉴赏家：大胆而实际的实验者，擅长使用各种工具。",
    "ISFP": "探险家：灵活而迷人的艺术家骐骐，要一辈子爱田田。",
    "ESTP": "企业家：聪明、精力充沛和善于感知的企业家。",
    "ESFP": "娱乐家：自发的、热情的、友好的娱乐者。"
};

// 生成问题
const form = document.getElementById('quiz-form');
questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
    q.options.forEach(option => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="q${index}" value="${option.dimension}"> ${option.text}`;
        questionDiv.appendChild(label);
        questionDiv.appendChild(document.createElement('br'));
    });
    form.appendChild(questionDiv);
});

// 提交并计算结果
document.getElementById('submit-btn').addEventListener('click', () => {
    console.log('提交按钮被点击');
    let allAnswered = true;
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (!selected) {
            allAnswered = false;
            console.log(`问题 ${index} 未回答`);
        }
    });

    if (!allAnswered) {
        alert('请回答所有问题后再提交。');
        return;
    }

    console.log('所有问题已回答');
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            scores[selected.value] += q.options.find(o => o.dimension === selected.value).score;
            console.log(`问题 ${index}: ${selected.value}`);
        }
    });

    console.log('分数:', scores);
    const type = 
        (scores.E > scores.I ? 'E' : 'I') +
        (scores.S > scores.N ? 'S' : 'N') +
        (scores.T > scores.F ? 'T' : 'F') +
        (scores.J > scores.P ? 'J' : 'P');

    console.log('类型:', type);
    document.getElementById('type').textContent = type;
    document.getElementById('description').textContent = descriptions[type] || "未知类型";
    document.getElementById('result').style.display = 'block';
    console.log('结果已显示');
    // 滚动到结果
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
});
