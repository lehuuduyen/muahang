function toggleClassRequestLogin() {
    let box = document.getElementById("toggleClassRequestLogin");

    if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}
function addName(element) {
    element.preventDefault(); // Ngăn reload

    toggleClassRequestLogin()
    let phone = document.getElementById("phone").value;
    let boxes = document.getElementsByClassName("my-phone");
    for (let box of boxes) {
        box.innerHTML = phone;
    }
    if (phone != "") {
        localStorage.setItem('phone', phone)
    }

}
function getProduct() {
    fetch(API_URL + "/products")
        .then(response => response.json())
        .then(result => {
            if (result.code == "200") {
                localStorage.setItem("products", JSON.stringify(result.data));

                showProduct(result.data);
                formatNumber()

            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function showProduct(products) {
    var htmlProducts = "";

    let grouped = products.reduce((acc, product) => {
        let catName = product.category?.name || "Khác"; // Nếu không có category thì gán "Khác"
        let category_id = product.category?.category_id; // Nếu không có category thì gán "Khác"

        if (!acc[catName + "_" + category_id]) {
            acc[catName + "_" + category_id] = []; // tạo mảng mới nếu chưa có
        }
        acc[catName + "_" + category_id].push(product);

        return acc;
    }, {});



    Object.entries(grouped).forEach(([strCategory, products]) => {
        let arrCategory = strCategory.split("_")
        htmlProducts += '<div id="label__header--' + arrCategory[1] + '" class="label__header">' + arrCategory[0] + '</div><div style="clear: both;"></div>'
        let i = 0;
        products.forEach(function (product) {
            let temp = 'mod_1'
            if (i % 2 === 0) {
                temp = "mod_2"
            }
            htmlProducts += `<div class="component__product-item-list item-list-498c8183-d3ab-48ba-a586-6917c1c5e27f grid-2 ${temp}"  data-product_title="${product.post_title}" data-product_id="${product.ID}" data-price_sale="${product.sale_price}" data-price="${product.price}" data-attribute='${JSON.stringify(product.list_attribute)}' data-path="${product.image_id.path}" onclick="clickDetailProduct(this)"
                                            style="margin-bottom: 10px;">
                                            <div
                                                class="component__touchable touch_905ad9b9-8f6f-4815-b3ff-0b76c365cc80 no-over">
                                                <div style="z-index: 1;">
                                                    <div>
                                                        <div class="product-item--image--border">
                                                            <div class="product-item--image"
                                                                style="background-image: url(&quot;${product.image_id.path}&quot;);">
                                                            </div>
                                                        </div>
                                                        <input type="hidden" class="product-item--productID" value="${product.ID}">
                                                        <div style="padding: 5px;">
                                                            <span class="product-item--image--path" style="display:none">${product.image_id.path}</span>
                                                            <div class="product-item--name">
                                                               ${product.post_title}
                                                            </div>
                                                            <table style="width: 100%;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="vertical-align: top;">
                                                                            <div class="product-item--price number"
                                                                                style="color: rgb(7, 112, 190) !important;" data-original="${product.sale_price}">
                                                                                ${product.sale_price}
                                                                            </div>
                                                                        </td> 
                                                                        <td
                                                                            style="width: 30px; vertical-align: bottom; text-align: right;">
                                                                            <div class="btn-add-cart__container">
                                                                                <div class="btn-add-cart"
                                                                                    style="background-color: rgb(7, 112, 190) !important; position: relative; bottom: unset; right: unset; float: right;">
                                                                                    <span class="material-icons-round"
                                                                                        style="font-size: 18px !important;">add</span>
                                                                                </div>
                                                                            </div> 
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>`
            i++

        });
        htmlProducts += '<div style="clear: both;"></div>'


    });

    document.getElementById("listProduct").innerHTML = htmlProducts


}
function getCategoryProduct() {
    fetch(API_URL + "/getCategoryProduct")
        .then(response => response.json())
        .then(result => {

            if (result.code == "200") {
                localStorage.setItem("productCategory", JSON.stringify(result.data));
                console.log("onl");
                showProductCategory(result.data);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });

}
function showProductCategory(data) {
    var htmlCategory = "";

    var lenght = 4
    let stt = 0
    console.log(data);

    data.forEach(function (category) {
        if (stt % lenght == 0) {
            htmlCategory += '<div style="text-align: left; padding-left: 5px;" >'

        }
        htmlCategory += '<button onclick="clickCategory(`' + category.term_id + '`)" class="">' + category.name + '</button>'
        stt++

        if (stt % lenght == 0) {
            htmlCategory += '</div>'
        }

    });
    if (stt % length !== 0) {
        htmlCategory += '</div>';
    }
    document.getElementById("listCategory").innerHTML = htmlCategory


}



function showProductAttribute(listAttribute) {
    console.log(listAttribute)
    search = typeof search !== "undefined" ? search : "";
    var htmlAttribute = "";
    if (listAttribute.radio) {
        var _loop = function _loop(key) {
            htmlAttribute += "<div class=\"col-md-12\" style=\"border-bottom: 1px solid #CECECE;\">\n        <h3>".concat(capitalizeWords(key), "</h3>\n        <div class=\"ml-20 \">\n          \n        ");
            listAttribute.radio[key].forEach(function (item1) {
                htmlAttribute += "<div class=\"form-check\">\n                          <input class=\"form-check-input oncheckbox input-radio\" data-title=\"".concat(item1.title, "\" data-price=\"").concat(item1.price, "\"\n                            type=\"radio\" name=\"").concat(key, "\" value=\"").concat(item1.title, "\" id=\"").concat(item1.title, "\" >\n                          <label class=\"form-check-label\" for=\"").concat(item1.title, "\"><span\n                                class=\"tc-label-inner tcwidth tcwidth-100 no-desc\"><span\n                                  class=\"tc-label-text\">").concat(item1.title, "</span><span\n                                  class=\"tc-col-auto tc-epo-style-space tc-price-wrap\">\n                                  <span class=\"before-amount\">+</span>\n                                  <span class=\"price tc-price\">\n                                      <span class=\"amount\">").concat(item1.price, "</span>\n                                  </span>\n                                </span>\n                            </span> </label>\n                      </div>\n                      ");
            });
            htmlAttribute += "</div>\n\n      </div>";
        };
        for (var key in listAttribute.radio) {
            _loop(key);
        }
        for (var _key in listAttribute.checkbox) {
            htmlAttribute += "<div class=\"col-md-12\" style=\"border-bottom: 1px solid #CECECE;\">\n      <h3>".concat(capitalizeWords(_key), "</h3>\n      <div class=\"ml-20\">\n         <ul class=\"tmcp-ul-wrap tmcp-elements tm-extra-product-options-checkbox fullwidth-ul tm-element-ul-checkbox element_1 tc-list-container\"\n            style=\"    list-style: none outside none;\">\n          \n        ");
            listAttribute.checkbox[_key].forEach(function (item) {
                htmlAttribute += "<li class=\"tmcp-field-wrap tm-per-row tc-mode-normal square\">\n        <div class=\"tmcp-field-wrap-inner\">\n           <div class=\"tc-col tc-field-label-wrap\">\n              <label class=\"tc-col tm-epo-field-label fullwidth\"\n                 for=\"".concat(item.title, "1\">\n                 <span class=\"tc-label-wrap\"><span\n                       class=\"tc-epo-style-wrapper tc-first square tc-checkbox\"><span\n                          class=\"tc-input-wrap tc-epo-style-space\"><input type=\"checkbox\"\n                             id=\"").concat(item.title, "1\" name=\"tmcp_checkbox_1_1\"\n                             class=\" oncheckbox input-checkbox  \" data-price=\"").concat(item.price, "\"\n                             data-title=\"").concat(item.title, "\" value=\"").concat(item.title, "\"></span><span\n                          class=\"tc-label tm-epo-style square\"\n                          data-for=\"").concat(item.title, "1\"></span></span><span\n                       class=\"tc-col tc-label tm-label\"><span\n                          class=\"tc-label-inner tcwidth tcwidth-100 no-desc\"><span\n                             class=\"tc-label-text\">").concat(item.title, "</span><span\n                             class=\"tc-col-auto tc-epo-style-space tc-price-wrap\">\n                             <span class=\"before-amount\">+</span>\n                             <span class=\"price tc-price\">\n                                <span class=\"amount\">").concat(item.price, "</span>\n                             </span>\n                          </span>\n                       </span></span></span> </label>\n           </div>\n        </div>\n     </li>\n                      ");
            });
            htmlAttribute += " </ul>\n      </div>\n   </div>";
        }
    }
    console.log(htmlAttribute)
    document.getElementById("listProductAttribute").innerHTML = htmlAttribute


}

function clickCategory(category) {
    // Nếu category là "Sữa Tươi"
    const target = document.getElementById('label__header--' + category);
    if (target) {
        const rect = target.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY - 150; // trừ 20px

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    // Bạn có thể thêm else if cho các category khác
}

function clickDetailProduct(_this) {
    let box = document.getElementById("detailProduct");
    if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "block";
        openDetailProduct(_this)
    } else {
        box.style.display = "none";
        closeDetailProduct(_this)

    }
    formatNumber()
}
function openDetailProduct(_this) {
    // data-product_title="${item.title}" data-product_id="${item.productId}" data-price_sale="${item.priceSale}" data-price="${item.price}" data-path="${item.path}"


    let image = _this.getAttribute("data-path")
    let name = _this.getAttribute("data-product_title")
    let price = _this.getAttribute("data-price_sale")
    let productId = _this.getAttribute("data-product_id");
    let popKey = _this.getAttribute("data-key")
    let attribute = _this.getAttribute("data-attribute")
    if(attribute){
        showProductAttribute(JSON.parse(attribute))
    }else{
        var formState = JSON.parse(localStorage.getItem("formState")) || [];
        var state = formState.find(function (s) {
            return s.id == popKey;
        });
        var listProduct = JSON.parse(localStorage.getItem("products")) || [];
        let listAttribute = listProduct.find(s => s.ID == state.productId);
        showProductAttribute(listAttribute.list_attribute);
        document.getElementById("pop-note").value = state.note

    }
    

    if (popKey) {
        document.querySelector(".class-delete").style.display = 'block';
        document.querySelector(".class-delete").innerHTML = `<button class="buy__item" onclick="openQuestion(${popKey})"
            style="background-color: red;">Delete <br><span
                style="font-size: 10px; line-height: 10px;"
                class=""></button>`

    } else {
        document.querySelector(".class-delete").style.display = 'none';

    }
    document.getElementById("pop-key").value = popKey

    let eleDetailProduct = document.getElementById("detailProduct")
    let imgTag = eleDetailProduct.querySelector("img");
    imgTag.src = image;

    let nameTag = eleDetailProduct.querySelector(".component__item-buy-detail--name");
    nameTag.innerText = name;

    let priceTag = eleDetailProduct.querySelector(".component__item-buy-detail--price");
    priceTag.innerText = price;

    let totalTag = eleDetailProduct.querySelector(".component__item-buy-detail--total");
    totalTag.innerText = price;
    let productID = eleDetailProduct.querySelector(".component__item-buy-detail--productID");
    productID.innerText = productId;






}
function closeDetailProduct(_this) {

}
function updateSubtotal() {
    let list = JSON.parse(localStorage.getItem("formState")) || []
    let total = 0
    list.forEach(function (temp) {
        total += temp.priceSale + temp.totalElement
    });
    document.querySelector(".text-price").innerText = total
    document.querySelector(".text-total").innerText = total
    document.querySelector(".text-price").setAttribute('data-original', total)
    document.querySelector(".text-total").setAttribute('data-original', total)

    document.getElementById("totalPayAble").innerText = total
    document.getElementById("totalPayAble").setAttribute('data-original', total)

    localStorage.setItem("subTotal", total)
    formatNumber()

}

function saveChangeOrder() {
    var radios = document.querySelectorAll(".input-radio");
    var checkboxes = document.querySelectorAll(".input-checkbox");
    var totalElement = document.getElementById("pop-totalt-attribute");
    var priceSaleEle = document.querySelector(".component__item-buy-detail--price").innerText;
    var keyUpdate = document.getElementById("pop-key").value;
    var note = document.getElementById("pop-note").value;
    var state = {
        id: new Date().getTime(),
        // Tạo ID duy nhất dựa trên timestamp
        radioGroups: {},
        checkboxes: [],
        radioGroupsName: [],
        checkboxesName: [],
        title: document.querySelector(".component__item-buy-detail--name").innerText,
        productId: document.querySelector(".component__item-buy-detail--productID").innerText,
        path: document.getElementById("detailProduct").querySelector("img").src,
        totalElement: parseInt(totalElement.textContent),
        priceSale: parseInt(priceSaleEle),
        price: parseInt(priceSaleEle),
        qty: 1,
        note: note
    };
    console.log(state)
    // Lưu trạng thái radio
    Array.prototype.forEach.call(radios, function (radio) {
        if (radio.checked) {
            state.radioGroups[radio.name] = radio.value;
            title = radio.getAttribute("data-title");
            price = radio.getAttribute("data-price");
            state.radioGroupsName.push(title + " + " + price);
        }

    });

    Array.prototype.forEach.call(checkboxes, function (checkbox) {
        if (checkbox.checked) {
            state.checkboxes.push(checkbox.value);
            title = checkbox.getAttribute("data-title");
            price = checkbox.getAttribute("data-price");
            state.checkboxesName.push(title + " + " + price);
        }
    });
    // Lưu trạng thái checkbox

    if (keyUpdate) {
        var id = keyUpdate; // Lấy ID từ giá trị của keyUpdate
        var formState = JSON.parse(localStorage.getItem("formState")) || [];
        // Tìm và cập nhật đơn hàng theo ID

        var orderIndex = formState.findIndex(function (order) {
            return order.id == id;
        });
        if (orderIndex !== -1) {
            formState[orderIndex].radioGroups = state.radioGroups;
            formState[orderIndex].checkboxes = state.checkboxes;
            formState[orderIndex].radioGroupsName = state.radioGroupsName;
            formState[orderIndex].checkboxesName = state.checkboxesName;
            formState[orderIndex].title = state.title;
            formState[orderIndex].productId = state.productId;
            formState[orderIndex].totalElement = state.totalElement;
            formState[orderIndex].priceSale = state.priceSale;
            formState[orderIndex].price = state.priceSale;
            formState[orderIndex].qty = state.qty;
            formState[orderIndex].note = state.note;
            localStorage.setItem("formState", JSON.stringify(formState));

        } else {
            console.error("Order with ID ".concat(id, " not found."));
        }

    } else {
        // Lấy danh sách trạng thái từ localStorage (hoặc tạo mới nếu chưa có)
        var _formState = JSON.parse(localStorage.getItem("formState")) || [];
        _formState.push(state);
        localStorage.setItem("formState", JSON.stringify(_formState));

    }

    updateSubtotal()


    clickDetailProduct()
    // Lưu lại toàn bộ danh sách
}
function calculateTotalPop() {

    var radios = document.querySelectorAll(".input-radio");
    var checkboxes = document.querySelectorAll(".input-checkbox");
    var totalElement = document.getElementById("pop-totalt-attribute");
    var total = 0;

    // Tính tổng giá trị của các nhóm radio (đã chọn)
    var radioGroups = {};
    Array.prototype.forEach.call(radios, function (radio) {
        if (radio.checked) {
            var groupName = radio.name; // Tên nhóm radio
            radioGroups[groupName] = parseInt(radio.getAttribute("data-price"));
        }

    });


    // Cộng giá trị các radio đã chọn
    for (var key in radioGroups) {
        if (radioGroups.hasOwnProperty(key)) {
            total += radioGroups[key];
        }
    }
    // Tính giá trị của checkbox đã chọn
    Array.prototype.forEach.call(checkboxes, function (checkbox) {
        if (checkbox.checked) {
            priceCheckbox = checkbox.getAttribute("data-price");
            total += parseInt(priceCheckbox);
        }

    });


    // Hiển thị tổng giá trị
    totalElement.textContent = total;

}

function clickDetailOrder() {
    let box = document.getElementById("detailOrder");

    if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "block";

    } else {
        box.style.display = "none";

    }
    openDetailOrder()

}
function openDetailOrder() {

    let list = JSON.parse(localStorage.getItem("formState")) || []



    htmlOrderDetail = ''
    list.forEach(function (item) {

        htmlOrderDetail += `    <div class="component__item-editor">
        <table class="table-rule">
            <tbody>
                <tr>
                    <td rowspan="2"
                        style="width: 78px; vertical-align: top;">
                        <div class="image__item-cart"
                            style="background-image: url(&quot;${item.path}&quot;);">
                        </div>
                    </td>
                    <td class="td--product-name"
                        style="vertical-align: top;">
                        <span
                            style="font-weight: 500; color: rgb(7, 112, 190); font-size: 14px;"></span> <span class="name"
                            style="font-size: 14px; font-weight: 500;">${item.title} </span> <span class="priceSmall">${item.priceSale}</span><br>
                            <p> - ${item.note}</p>
                        <div class="component__card-description-bound"
                            style="color: rgb(54, 54, 54); margin-top: 4px;">`
        item.radioGroupsName.forEach(function (itemCheckBox) {
            htmlOrderDetail += `${itemCheckBox} <br>`
        })
        item.checkboxesName.forEach(function (itemCheckBox) {
            htmlOrderDetail += `${itemCheckBox} <br>`

        })

        htmlOrderDetail += `</div>
            <div class="price-and-edit-text__container"
                style="margin-top: 5px;">
                <div><span
                    class="origin-price number">
                    ${item.priceSale + item.totalElement}
                </span></div>
                <div class="edit-text" data-key="${item.id}" data-product_title="${item.title}"  data-product_id="${item.productId}" data-price_sale="${item.priceSale}" data-price="${item.price}" data-path="${item.path}"
                    style="color: rgb(7, 112, 190);" onclick="restoreState('${item.id}',this)">
                    Edit
                </div>
            </div>
            <div
                class="btn-remove-item-in-cart" onclick="openQuestion('${item.id}')">
                <span
                    class="ti-close"></span>
            </div>
        </td>
                </tr >
            </tbody >
        </table >
    </div > `

    });
    htmlOrderDetail += '<div style="clear: both;"></div>'




    document.getElementById("item-order-detail").innerHTML = htmlOrderDetail
}
window.restoreState = function (stateId, _this) {
    clickDetailProduct(_this)
    clickDetailOrder();
    var radios = document.querySelectorAll(".input-radio");
    var checkboxes = document.querySelectorAll(".input-checkbox");
    var formState = JSON.parse(localStorage.getItem("formState")) || [];
    
    console.log(listProduct)

    var state = formState.find(function (s) {
        return s.id == stateId;
    });
    if (!state) {
        alert("State not found!");
        return;
    }
   

    // Reset trạng thái
    Array.prototype.forEach.call(radios, function (radio) {
        return radio.checked = false;
    });

    Array.prototype.forEach.call(checkboxes, function (checkbox) {
        return checkbox.checked = false;
    });


    // Khôi phục radio
    var _loop = function _loop() {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            groupName = _Object$entries$_i[0],
            value = _Object$entries$_i[1];
        Array.prototype.forEach.call(radios, function (radio) {
            if (radio.name === groupName && radio.value === value) {
                radio.checked = true;
            }
        });

    };
    for (var _i = 0, _Object$entries = Object.entries(state.radioGroups); _i < _Object$entries.length; _i++) {
        _loop();
    }

    // Khôi phục checkbox
    Array.prototype.forEach.call(checkboxes, function (checkbox) {
        if (state.checkboxes.includes(checkbox.value)) {
            checkbox.checked = true;
        }

    });

    calculateTotalPop();
};
window.capitalizeWords = function (str) {
    return str.toLowerCase().split(" ").map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
};
document.addEventListener("change", function (e) {
    if (e.target.matches(".oncheckbox")) {
        calculateTotalPop();
    }
});
function onDelete(key = "") {
    if (key) {
        var formState = JSON.parse(localStorage.getItem("formState")) || [];

        // Tìm vị trí đơn hàng theo ID
        var orderIndex = formState.findIndex(function (order) {
            return order.id == key;
        });

        // Nếu tìm thấy thì xoá
        if (orderIndex !== -1) {
            formState.splice(orderIndex, 1);
            localStorage.setItem("formState", JSON.stringify(formState));
            location.reload(true);
        }
    } else {
        localStorage.removeItem('formState'); location.reload(true);
    }
}
window.openQuestion = function(key = "") {

    let htmlQuestion = `<div class="component__cs-question"> <div style="padding: 20px;"><div class="component__cs-question__dialog"><div class="component__cs-question--text">
            Are you sure you want to remove the product from your cart?
        </div> <div class="component__cs-question__control-box"><div onclick="document.querySelector('.component__cs-question')?.remove()">Is not</div> <div class="confirm-button" onclick="onDelete('${key}')" style="color: white; background-color: rgb(7, 112, 190) !important;">Agree
        </div></div></div></div></div> `;

    document.body.insertAdjacentHTML('beforeend', htmlQuestion);


}
function openQuestionPayment() {
    let htmlQuestion = `<div class="component__cs-question" > <div style="padding: 20px;"><div class="component__cs-question__dialog"><div class="component__cs-question--text">
            Are you sure you want to order the selected items?
        </div> <div class="component__cs-question__control-box"><div onclick="document.querySelector('.component__cs-question')?.remove()">Is not</div> <div class="confirm-button" onclick="btnPayment()" style="color: white; background-color: rgb(7, 112, 190) !important;">Agree
        </div></div></div></div></div > `;
    document.body.insertAdjacentHTML('beforeend', htmlQuestion);


}





function btnPayment() {
    var listItem = JSON.parse(localStorage.getItem("formState")) || [];
    var paymentMethod = "COD";
    var phone = localStorage.getItem("phone") || "";
    //
    var order = {
        ID: getRandomInt(999),
        payment_gateway: paymentMethod,
        order: listItem,
        phone: phone,
        used_coupon: document.getElementById("voucher").value,
        post_date: getNow(),
        subTotal: document.querySelector(".text-total").getAttribute("data-original"),
        discount: document.getElementById("discount").value || 0
    };
    // var confirmPayment = confirm("Bạn có muốn thanh toán?");
    // if (confirmPayment) {
    //   const online = AndroidPOS.isOnline();
    const online = true;

    if (online) {
        fetch(API_URL + "/order_fast", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([order])
        })
            .then(response => response.json())
            .then(resultData => {
                if (resultData.code == 200) {
                    order.ID = resultData.data[0];
                    //   localStorage.setItem("print", JSON.stringify(order));
                    orderData = order
                    // Sau khi lưu thành công
                    alert("Thanh toán thành công đơn hàng.\nCảm ơn bạn đã mua sắm với chúng tôi!");

                    localStorage.removeItem('formState');
                    location.reload(true);

                } else {
                    alert("Thanh toán không thành công, hãy báo nhân viên");

                }

            })
            .catch(error => {
                console.error("Error:", error);
            });

    }

    // } else {
    //     alert("Đã hủy thanh toán.");
    // }
}



function changeVoucher(_this) {
    const voucher = _this.value.trim();
    const errorSpan = document.getElementById("voucher-error");
    const inputPaymentDiscount = document.getElementById("payment-discount");
    const inputDiscount = document.getElementById("discount");


    if (voucher === "") {
        errorSpan.textContent = "";
        _this.style.borderColor = "";
        inputDiscount.value = 0
        inputPaymentDiscount.innerHTML = 0
        inputPaymentDiscount.setAttribute("data-original", 0)
        calTotalAfterDiscount(_this)

        return;
    }
    const total = document.querySelector(".text-total");
    var listItem = JSON.parse(localStorage.getItem("formState")) || [];

    const data = {
        coupon: voucher,
        phone: localStorage.getItem('phone'),

        subtotal: total.getAttribute("data-original"),
        order: listItem
    };
    fetch(API_URL + "/check_coupon_fast", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(resultData => {
            //check Lỗi
            console.log(resultData)
            if (resultData.code == 500) {
                errorSpan.textContent = resultData.message;
                _this.style.borderColor = "red";
            } else {
                errorSpan.textContent = "";
                inputDiscount.innerHTML = resultData.data
                inputDiscount.setAttribute("data-original", resultData.data)
                calTotalAfterDiscount(_this)
                _this.style.borderColor = "green";
            }
        })
        .catch(error => {
            errorSpan.textContent = "Voucher không hợp lệ";
            _this.style.borderColor = "red";
        });
}

window.calTotalAfterDiscount = function (_$this) {
    var discount = document.getElementById("discount").getAttribute("data-original");
    var total = document.querySelector(".text-total").getAttribute("data-original");
    var totalPayAble = parseInt(total) - parseInt(discount);
    document.getElementById("totalPayAble").innerHTML = totalPayAble
    document.getElementById("totalPayAble").setAttribute("data-original", totalPayAble)

    formatNumber();
};
