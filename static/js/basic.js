const API_URL = "https://api.gsmilktea.vn/api"

function formatNumber() {
    var prices = document.querySelectorAll(".number");
    if (!Array.isArray(prices)) {
        prices = Array.from(prices);
    }
    prices.forEach(function (price) {
        // Lấy giá trị gốc từ `data-original`
        var originalNumber = price.getAttribute("data-original");
        if (!originalNumber) {
            // Nếu chưa có `data-original`, lưu giá trị gốc
            originalNumber = parseFloat(price.textContent);
            if (isNaN(originalNumber)) return; // Bỏ qua nếu không phải số
            price.setAttribute("data-original", originalNumber);
        }

        // Định dạng giá trị gốc
        var formattedNumber = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND"
        }).format(originalNumber);
        price.textContent = formattedNumber;
    });
}

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  function getNow() {
    var now = new Date();
    var year = now.getFullYear();
    var month = pad2(now.getMonth() + 1); // Months are 0-indexed
    var day = pad2(now.getDate());
    var hours = pad2(now.getHours());
    var minutes = pad2(now.getMinutes());
    var seconds = pad2(now.getSeconds());
    var formattedDate = "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
    return formattedDate;
  }
  function crc16_ibm_3740(data) {
    var crc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0xffff;
    var xorout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0x0000;
    for (var i = 0, t; i < data.length; i++, crc &= 0xffff) {
      t = crc >> 8 ^ data[i];
      t = t ^ t >> 4;
      crc = crc << 8 ^ t << 12 ^ t << 5 ^ t;
    }
    return crc ^ xorout;
  }
  // generateBankQR("10576016","970432","70000",'le huu duyen dep trai')
  function pad2(n) {
    return n < 10 ? "0" + n : "" + n;
  }