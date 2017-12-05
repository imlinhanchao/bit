window.$eles = function (selector) { return document.querySelectorAll(selector) };
window.$ele = function (selector) { return document.querySelector(selector) };
let vm = $ele("#wrapper") && new Vue({
    el: '#wrapper',
    data: {
        number1: 0,
        number2: 0,
        byte1: "00000000000000000000000000000000",
        byte2: "00000000000000000000000000000000",
        op: "&"
    },
    watch: {
        byte1: function (val) {
            let n = parseInt(val.substr(1), 2);
            if (val[0] == 1) {
                n = -Math.pow(2, 31) + n;
            }
            if (this.number1 != n)
                this.number1 = n;
        },
        byte2: function (val) {
            let n = parseInt(val.substr(1), 2);
            if (val[0] == 1) {
                n = -Math.pow(2, 31) + n;
            }
            if (this.number2 != n)
                this.number2 = n;
        },
        number1: function (val) {
            let number = parseInt(val);
            if (this.byte1 != this.toByte(number))
                this.byte1 = this.toByte(number);
        },
        number2: function (val) {
            let number = parseInt(val);
            if (this.byte2 != this.toByte(number))
                this.byte2 = this.toByte(number);
        }
    },
    computed: {
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
        },
        reByte: function (byte, index) {
            b = byte.split('')
            b[index] = b[index] == '1' ? '0' : '1'
            return b.join('')
        }
    },
    mounted: function () {
    }
})