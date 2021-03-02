// Material Design example
$(document).ready(function () {
    update();

});
function update() {
    showCustomerList();
    showProductList();
    showBillings();
    showStock();
}
function addCustomer() {

    var name = $("#name1").val();
    var mobile = $("#mobile1").val();
    var address = $("#address1").val();
    var pincode = $("#pincode1").val();

    $.ajax({
        type: 'POST',
        url: '/api/addCustomer',
        data: {
            name: name,
            mobile: mobile,
            address: address,
            pincode: pincode,
        }
    }).done(function (datas) {
        alert(datas);
        $("#name1").val("");
        $("#mobile1").val("");
        $("#address1").val("");
        $("#pincode1").val("");
        update();
    });
}

function showCustomerList() {
    $.ajax({
        type: 'GET',
        url: '/api/viewCustomer',

    }).done(function (datas) {
        var html = ``;
        for (var i in datas) {
            var data = datas[i];

            html += ` <tr>
           <th scope="row">` + (++i) + `</th>
               <td>` + data.name + `</td>
               <td>` + data.mobile + `</td>
           <td>` + data.address + `</td>
           <td>` + data.pincode + `</td>
           </tr>`;
        }
        $("#customerbody").html(html)
    });
}

function addProduct() {
    var company = $("#company2").val();
    var brand = $("#brand2").val();
    var product = $("#productname2").val();
    var price = $("#price2").val();

    $.ajax({
        type: 'POST',
        url: '/api/addProduct',
        data: {
            company: company,
            brand: brand,
            product: product,
            price: price,
        }
    }).done(function (datas) {
        alert(datas);
        $("#company2").val("");
        $("#brand2").val("");
        $("#productname2").val("");
        $("#price2").val("");
        update();
    });

}

function showProductList() {
    $.ajax({
        type: 'GET',
        url: '/api/viewProduct',

    }).done(function (datas) {
        var html = ``;
        var opt = ``;
        for (var i in datas) {
            var data = datas[i];

            opt += `<option id='` + data.id + `'>` + data.product + `</option>`;
            html += ` <tr>
           <th scope="row">` + data.id + `</th>
               <td>` + data.company + `</td>
               <td>` + data.brand + `</td>
           <td>` + data.product + `</td>
           <td>` + data.price + `</td>
           </tr>`;
        }
        $("#productbody").html(html)
        $("#product3").html(opt)
        $("#product4").html(opt)


    });
}

function loadProductDetails() {
    var id = $("#product3").children(":selected").attr("id");
    $.ajax({
        type: 'GET',
        url: '/api/productDetails/' + id,

    }).done(function (datas) {
        var data = datas[0];

        $("#company3").val(data.company)
        $("#brand3").val(data.brand)
        $("#price3").val(data.price)
    });
}

function addPurchase() {
    var id = $("#product3").children(":selected").attr("id");
    var quantity = $("#quantity3").val();


    $.ajax({
        type: 'POST',
        url: '/api/addPurchase',
        data: {
            pid: id,
            quantity: quantity,
        }
    }).done(function (datas) {
        alert(JSON.stringify(datas));
        $("#company2").val("");
        $("#brand2").val("");
        $("#productname2").val("");
        $("#price2").val("");
        update();
    });
}

function getCustomerDetails() {
    var mobile = $("#mobile4").val();
    $.ajax({
        type: 'GET',
        url: '/api/getCustomer/' + mobile,

    }).done(function (datas) {
        var data = datas[0];
        $("#name4").val(data.name);
        $("#address4").val(data.address);
        $("#pincode4").val(data.pincode);


    });
}


function loadProductDetails4() {
    var id = $("#product4").children(":selected").attr("id");
    $.ajax({
        type: 'GET',
        url: '/api/productDetails/' + id,

    }).done(function (datas) {
        var data = datas[0];

        $("#company4").val(data.company)
        $("#brand4").val(data.brand)
        $("#price4").val(data.price)
        $("#quantity4").val("")
        $("#total4").val("")
    });
}

function totalamount() {
    var price = $("#price4").val();
    var quantity = $("#quantity4").val();

    $("#total4").val((quantity - 0) * (price - 0))
}

function addSales() {
    var mobile = $("#mobile4").val();
    var pid = $("#product4").children(":selected").attr("id");
    var quantity = $("#quantity4").val();
    var total = $("#total4").val();

    $.ajax({
        type: 'POST',
        url: '/api/addSales',
        data: {
            mobile: mobile,
            pid: pid,
            quantity: quantity,
            total: total,
        }
    }).done(function (datas) {
        alert(JSON.stringify(datas));
        $("#company2").val("");
        $("#brand2").val("");
        $("#productname2").val("");
        $("#price2").val("");
        update();
    });

}

function showBillings() {
    $.ajax({
        type: 'GET',
        url: '/api/getBillings',

    }).done(function (datas) {
        var html = ``;
        for (var i in datas) {
            var data = datas[i];
            html += ` <tr>
                                <th scope="row">` + (++i) + `</th>
                                <td>` + data.name + `</td>
                                <td>` + data.company + `</td>
                                <td>` + data.brand + `</td>
                                <td>` + data.product + `</td>
                                <td>$` + data.price + `</td>
                                <td>` + data.quantity + `</td>
                                <td>$` + data.total + `</td>
                            </tr>`;
        }

        $("#billingBody").html(html)
    });
}

function showStock() {
    $.ajax({
        type: 'GET',
        url: '/api/getStocks',

    }).done(function (datas) {
        var html = ``;
        for (var i in datas) {
            var data = datas[i];
			
            html += `<tr>
                                <th scope="row">`+(++i)+`</th>

                                <td>`+data.company+`</td>
                                <td>`+data.brand+`</td>
                                <td>`+data.product+`</td>
                                <td>$`+data.price+`</td>
                                <td>`+data.quantity+`</td>

                            </tr>
                           `;
        }
        $("#stockBody").html(html)
    });
}