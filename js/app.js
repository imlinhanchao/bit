window.$eles = function (selector) { return document.querySelectorAll(selector) };
window.$ele = function (selector) { return document.querySelector(selector) };
let vm = $ele("#wrapper") && new Vue({
    el: '#wrapper',
    data: {
        number1: 0,
        number2: 0,
        op: "&"
    },
    computed: {
        byte1: function () {
            let number = parseInt(this.number1);
            return this.toByte(number);
        },
        byte2: function () {
            let number = parseInt(this.number2);
            return this.toByte(number);
        },
        byter: function () {
            let number = parseInt(this.result);
            return this.toByte(number);
        },
        result: function () {
            if (this.op == "") return 0;
            let number1 = parseInt(this.number1);
            let number2 = parseInt(this.number2);
            if (this.op == '~') return ~number2;
            return eval(`${number1}${this.op}${number2}`);
        }
    },
    methods: {
        toByte: function (number) {
            if (number < 0)
            number = Math.pow(2, 32) + number;
            let data = "00000000000000000000000000000000" + number.toString(2);
            return data.substr(data.length - 32);
        }
    },
    mounted: function () {
    }
})