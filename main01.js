const roulette01 = document.getElementById("roulette01");
const context01 = roulette01.getContext('2d');

let center01 = {
    x: 250,
    y: 250
};

let radius01 = 200;

let data01 = [
    {
        name: "赤",
        color: '#dc3545',
        weight: 1
    },
    {
        name: "青",
        color: '#007bff',
        weight: 1
    },
    {
        name: "黄",
        color: '#ffc107',
        weight: 1
    },
    {
        name: "緑",
        color: '#28a745',
        weight: 1
    },
    {
        name: "赤",
        color: '#dc3545',
        weight: 1
    },
    {
        name: "青",
        color: '#007bff',
        weight: 1
    },
    {
        name: "黄",
        color: '#ffc107',
        weight: 1
    },
    {
        name: "緑",
        color: '#28a745',
        weight: 1
    },
    {
        name: "赤",
        color: '#dc3545',
        weight: 1
    },
    {
        name: "青",
        color: '#007bff',
        weight: 1
    },
    {
        name: "黄",
        color: '#ffc107',
        weight: 1
    },
    {
        name: "緑",
        color: '#28a745',
        weight: 1
    }
];

let sum_weight01 = 0;
let unit_weight01 = 0;
let stopFlag01 = false;
let startFlag01 = false;

//
// メイン処理
//
data01.forEach(e => {
    sum_weight01 += e.weight;
  })
  unit_weight01 = 360 / sum_weight01;
  
  init01();
  
  drawRoullet1(0);


function drawRoullet1(offset) {
    let uw_count = offset;

    data01.forEach(e => {
        drawPie01(center01.x, center01.y, uw_count, uw_count + unit_weight01, radius01, e.color);
        uw_count += unit_weight01;
    })
}


function runRoullet1() {
    let count = 1; //終了までのカウント
    let lastCell = "";
    let deg_counter = 0; // 角度のカウント
    let acceleration = 1;

    let timer = setInterval(function() {

        deg_counter += acceleration;

        if (stopFlag01) {
            count++;
        }

        // ストップを押してから止まるまでの秒数制御
        if (count < 500) {
            acceleration = 500 / (count);
            drawRoullet1(deg_counter);
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
            startFlag01 = false;
            stopFlag01 = false;
            let current_deg = 360 - Math.ceil((deg_counter - 90) % 360)
            let sum = 0;
            let _i = 0;
            for (let i = 0; i < data01.length; i++) {
                if (unit_weight01 * sum < current_deg && current_deg < unit_weight01 * (sum + data01[i].weight)) {
                    document.getElementById("labels1").innerHTML = data01[i].name;
                    document.getElementById("color-result").style.backgroundColor = data01[i].color;
                    break;
                }
                sum += data01[i].weight;
            }
        }
    };
}


function init01() {
    roulette01.width = 500;
    roulette01.height = 500;

    let dst = context01.createImageData(roulette01.width, roulette01.height);
    for (let i = 0; i < dst.data.length; i++) {
        dst.data[i] = 255;
    }
    context01.putImageData(dst, 0, 0);
}

function drawPie01(cx, cy, start_deg, end_deg, radius01, color) {
    let _start_deg = (360 - start_deg) * Math.PI / 180;
    let _end_deg = (360 - end_deg) * Math.PI / 180;

    context01.beginPath();
    context01.moveTo(cx, cy);
    context01.fillStyle = color; //塗りつぶしの色は赤
    context01.arc(cx, cy, radius01, _start_deg, _end_deg, true);
    context01.fill();

    showArrow01();
}


function showArrow01() {
    context01.beginPath();
    context01.moveTo(center01.x, center01.y - radius01);
    context01.lineTo(center01.x + 10, center01.y - radius01 - 10);
    context01.lineTo(center01.x - 10, center01.y - radius01 - 10);
    context01.closePath();
    context01.stroke();
    context01.fillStyle = "rgba(40,40,40)";
    context01.fill();
}
