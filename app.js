const startStop = document.querySelector('.start-stop');
const reset = document.querySelector('.reset');
const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const second = document.querySelector('#second');
const input = document.querySelectorAll('input');
const alert = document.querySelector('.alert');

const timer = new Timer();
const alarm = new Audio();
alarm.src = './sound/alarm.wav';

startStop.addEventListener('click', () => {
    if (hour.value == 0 && minute.value == 0 && second.value == 0) {
        timer.stop();
        return;
    } else {
        if (timer.isStarted) {
            timer.stop();
            startStop.textContent = 'Start';
        } else {
            timer.start();
            startStop.textContent = 'Stop';
        }
    }
});

reset.addEventListener('click', () => {
    timer.reset();
});

function Timer() {
    let interval;
    this.isStarted = false;

    this.start = function () {
        if (!this.isStarted) {
            this.isStarted = true;
            interval = setInterval(() => {
                update();
            }, 1000);
        }
        input.forEach((input) => {
            input.disabled = true;
            input.style.background = '#ffffff';
        });
    };
    this.stop = function () {
        if (this.isStarted) {
            clearInterval(interval);
            this.isStarted = false;
            alarm.pause();
            alarm.currentTime = 0;
            alert.textContent = '';
            startStop.textContent = 'Start';
            input.forEach((input) => (input.disabled = false));
        }
    };
    this.reset = function () {
        this.stop();
        resetValues();
    };
    function resetValues() {
        hour.value = '';
        minute.value = '';
        second.value = '';
    }
    function update() {
        if (hour.value == 0 && minute.value == 0 && second.value == 0) {
            resetValues();
            alarm.play();
            alert.textContent = 'ALARM';
        } else if (second.value != 0) {
            second.value--;
            if (second.value < 10) {
                second.value = '0' + second.value;
            }
        } else if (minute.value != 0 && second.value == 0) {
            second.value = 59;
            minute.value--;
            if (minute.value < 10) {
                minute.value = '0' + minute.value;
            }
        } else if (hour.value != 0 && minute.value == 0) {
            minute.value = 59;
            second.value = 59;
            hour.value--;
            if (hour.value < 10) {
                hour.value = '0' + hour.value;
            }
        }
    }
}
