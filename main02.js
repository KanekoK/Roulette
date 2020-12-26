const roulette02 = document.getElementById("roulette02");
const context02 = roulette02.getContext('2d');

let center02 = {
    x: 150,
    y: 150
};

let radius02 = 100;

let data02 = [
    {
        name: "label1",
        color: '#FFCEBE',
        weight: 1
    },
    {
        name: "label2",
        color: '#CEFFBE',
        weight: 1
    },
    {
        name: "label3",
        color: '#CEBEFF',
        weight: 1
    },
    {
        name: "label4",
        color: '#FDED9E',
        weight: 1
    },
    {
        name: "label1",
        color: '#FFCEBE',
        weight: 1
    },
    {
        name: "label2",
        color: '#CEFFBE',
        weight: 1
    },
    {
        name: "label3",
        color: '#CEBEFF',
        weight: 1
    },
    {
        name: "label4",
        color: '#FDED9E',
        weight: 1
    },
    {
        name: "label1",
        color: '#FFCEBE',
        weight: 1
    },
    {
        name: "label2",
        color: '#CEFFBE',
        weight: 1
    },
    {
        name: "label3",
        color: '#CEBEFF',
        weight: 1
    },
    {
        name: "label4",
        color: '#FDED9E',
        weight: 1
    },
    {
        name: "label1",
        color: '#FFCEBE',
        weight: 1
    },
    {
        name: "label2",
        color: '#CEFFBE',
        weight: 1
    },
    {
        name: "label3",
        color: '#CEBEFF',
        weight: 1
    },
    {
        name: "label4",
        color: '#FDED9E',
        weight: 1
    }
];

let sum_weight02 = 0;
let unit_weight02 = 0;
let stopFlag02 = false;
let startFlag02 = false;

//
// メイン処理
//
data02.forEach(e => {
    sum_weight02 += e.weight;
})
unit_weight02 = 360 / sum_weight02;

init02();

drawRoullet2(0);


function drawRoullet2(offset) {
    let uw_count = offset;

    data02.forEach(e => {
        drawPie02(center02.x, center02.y, uw_count, uw_count + unit_weight02, radius02, e.color);
        uw_count += unit_weight02;
    })
}


function runRoullet2() {
    let count = 1; //終了までのカウント
    let lastCell = "";
    let deg_counter = 0; // 角度のカウント
    let acceleration = 1;

    let timer = setInterval(function() {

        deg_counter += acceleration;

        if (stopFlag02) {
            count++;
        }

        if (count < 1000) {
            acceleration = 1000 / (count);
            drawRoullet2(deg_counter);
        } else {
            count = 0;
            clearInterval(timer);
            endEvent();
        }
    }, 10);

    let endEvent = function() {
        count++;
        let id = setTimeout(endEvent, 115);
        if (count > 9) {
            clearTimeout(id);
            startFlag02 = false;
            stopFlag02 = false;
            let current_deg = 360 - Math.ceil((deg_counter - 90) % 360)
            let sum = 0;
            let _i = 0;
            for (let i = 0; i < data02.length; i++) {
                if (unit_weight02 * sum < current_deg && current_deg < unit_weight02 * (sum + data02[i].weight)) {
                    console.log(data02[i].name);
                    document.getElementById("labels2").innerHTML = data02[i].name;
                    break;
                }
                sum += data02[i].weight;
            }
        }
    };
}


function init02() {
    roulette02.width = 300;
    roulette02.height = 300;

    let dst = context02.createImageData(roulette02.width, roulette02.height);
    for (let i = 0; i < dst.data.length; i++) {
        dst.data[i] = 255;
    }
    context02.putImageData(dst, 0, 0);
}

function drawPie02(cx, cy, start_deg, end_deg, radius, color) {
    let _start_deg = (360 - start_deg) * Math.PI / 180;
    let _end_deg = (360 - end_deg) * Math.PI / 180;

    context02.beginPath();
    context02.moveTo(cx, cy);
    context02.fillStyle = color; //塗りつぶしの色は赤
    context02.arc(cx, cy, radius, _start_deg, _end_deg, true);
    context02.fill();

    showArrow02();
}


function showArrow02() {
    context02.beginPath();
    context02.moveTo(center02.x, center02.y - radius02);
    context02.lineTo(center02.x + 10, center02.y - radius02 - 10);
    context02.lineTo(center02.x - 10, center02.y - radius02 - 10);
    context02.closePath();
    context02.stroke();
    context02.fillStyle = "rgba(40,40,40)";
    context02.fill();
}
