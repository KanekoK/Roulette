const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

var center = {
    x: 150,
    y: 150
};

var radius = 100;

var data = [{
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

var sum_weight = 0;
var unit_weight = 0;
var stopFlag = false;
var startFlag = false;

//
// メイン処理
//
data.forEach(e => {
    sum_weight += e.weight;
})
unit_weight = 360 / sum_weight;

init();

showLabel();

drawRoullet(0);



function drawRoullet(offset) {
    var uw_count = offset

    data.forEach(e => {
        drawPie(center.x, center.y, uw_count, uw_count + unit_weight, radius, e.color);
        uw_count += unit_weight;
    })
}


function runRoullet() {
    var count = 1; //終了までのカウント
    var lastCell = "";
    var deg_counter = 0; // 角度のカウント
    var acceleration = 1;

    var timer = setInterval(function() {

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

    var endEvent = function() {
        count++;
        var id = setTimeout(endEvent, 115);
        if (count > 9) {
            clearTimeout(id);
            startFlag = false;
            stopFlag = false;
            var current_deg = 360 - Math.ceil((deg_counter - 90) % 360)
            var sum = 0;
            var _i = 0;
            for (var i = 0; i < data.length; i++) {
                if (unit_weight * sum < current_deg && current_deg < unit_weight * (sum + data[i].weight)) {
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
    canvas.width = 300;
    canvas.height = 300;

    var dst = context.createImageData(canvas.width, canvas.height);
    for (var i = 0; i < dst.data.length; i++) {
        dst.data[i] = 255;
    }
    context.putImageData(dst, 0, 0);
}

function drawPie(cx, cy, start_deg, end_deg, radius, color) {
    var _start_deg = (360 - start_deg) * Math.PI / 180;
    var _end_deg = (360 - end_deg) * Math.PI / 180;

    context.beginPath();
    context.moveTo(cx, cy);
    context.fillStyle = color; //塗りつぶしの色は赤
    context.arc(cx, cy, radius, _start_deg, _end_deg, true);
    context.fill();

    showArrow();
}

function showLabel() {
    var label_el = document.getElementById("labels");

    var text = "<table>";

    for (var i = 0; i < data.length; i++) {
        text += `
        <tr>
        <td style="width:20px;background-color:${data[i].color};"></td>
        <td>${data[i].name}</td>
        </tr>`;
    }

    text += "</table>";

    label_el.innerHTML = text;
}

function showArrow() {
    context.beginPath();
    context.moveTo(center.x, center.y - radius);
    context.lineTo(center.x + 10, center.y - radius - 10);
    context.lineTo(center.x - 10, center.y - radius - 10);
    context.closePath();
    context.stroke();
    context.fillStyle = "rgba(40,40,40)";
    context.fill();
}
