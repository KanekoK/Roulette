const roulette02 = document.getElementById("roulette02");
const context02 = roulette02.getContext('2d');

let center = {
    x: 150,
    y: 150
};

let radius = 100;

let data = [
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

let sum_weight = 0;
let unit_weight = 0;
let stopFlag = false;
let startFlag = false;

//
// メイン処理
//
data.forEach(e => {
    sum_weight += e.weight;
})
unit_weight = 360 / sum_weight;

init();

drawRoullet(0);


function drawRoullet(offset) {
    let uw_count = offset;

    data.forEach(e => {
        drawPie(center.x, center.y, uw_count, uw_count + unit_weight, radius, e.color);
        uw_count += unit_weight;
    })
}


function runRoullet() {
    let count = 1; //終了までのカウント
    let lastCell = "";
    let deg_counter = 0; // 角度のカウント
    let acceleration = 1;

    let timer = setInterval(function() {

        deg_counter += acceleration;

        if (stopFlag) {
            count++;
        }

        if (count < 1000) {
            acceleration = 1000 / (count);
            drawRoullet(deg_counter);
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
            startFlag = false;
            stopFlag = false;
            let current_deg = 360 - Math.ceil((deg_counter - 90) % 360)
            let sum = 0;
            let _i = 0;
            for (let i = 0; i < data.length; i++) {
                if (unit_weight * sum < current_deg && current_deg < unit_weight * (sum + data[i].weight)) {
                    console.log(data[i].name);
                    document.getElementById("debug").innerHTML = data[i].name;
                    break;
                }
                sum += data[i].weight;
            }
        }
    };
}



document.getElementById("run").addEventListener("click", function() {
    // スタート連打を無効化
    if (startFlag === false) {
        runRoullet();
        startFlag = true;
    } else {
        startFlag = false;
    }

});

document.getElementById("stop").addEventListener("click", function() {
    if (startFlag) {
        stopFlag = true;
    }
});



function init() {
    roulette02.width = 300;
    roulette02.height = 300;

    let dst = context02.createImageData(roulette02.width, roulette02.height);
    for (let i = 0; i < dst.data.length; i++) {
        dst.data[i] = 255;
    }
    context02.putImageData(dst, 0, 0);
}

function drawPie(cx, cy, start_deg, end_deg, radius, color) {
    let _start_deg = (360 - start_deg) * Math.PI / 180;
    let _end_deg = (360 - end_deg) * Math.PI / 180;

    context02.beginPath();
    context02.moveTo(cx, cy);
    context02.fillStyle = color; //塗りつぶしの色は赤
    context02.arc(cx, cy, radius, _start_deg, _end_deg, true);
    context02.fill();

    showArrow();
}


function showArrow() {
    context02.beginPath();
    context02.moveTo(center.x, center.y - radius);
    context02.lineTo(center.x + 10, center.y - radius - 10);
    context02.lineTo(center.x - 10, center.y - radius - 10);
    context02.closePath();
    context02.stroke();
    context02.fillStyle = "rgba(40,40,40)";
    context02.fill();
}
