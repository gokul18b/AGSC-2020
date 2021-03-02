var express = require('express');
var router = express.Router();


var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'textile'
    }
});

/* GET users listing. */
router.post('/addCustomer', function (req, res, next) {

    var name = req.body.name;
    var mobile = req.body.mobile;
    var address = req.body.address;
    var pincode = req.body.pincode;

    var insert_customer = "INSERT INTO `customer` (`id`, `name`, `mobile`, `address`, `pincode`) VALUES (NULL, '" + name + "', '" + mobile + "', '" + address + "', '" + pincode + "');";
console.log(insert_customer )
    knex.raw(insert_customer).then((datas) => {
        res.send('Customer has been created');
    });
});


router.get('/viewCustomer', function (req, res, next) {

    var insert_customer = "Select * from customer";
    knex.raw(insert_customer).then((datas) => {
        res.send(datas[0]);
    });
});

router.post('/addProduct', function (req, res, next) {
    var company = req.body.company;
    var brand = req.body.brand;
    var product = req.body.product;
    var price = req.body.price;
    var insert_customer = "INSERT INTO `product` (`id`, `company`, `brand`, `product`, `price`) VALUES (NULL, '" + company + "', '" + brand + "', '" + product + "', '" + price + "');";
    knex.raw(insert_customer).then((datas) => {
        res.send('Product has been created');
    });
});


router.get('/viewProduct', function (req, res, next) {

    var insert_customer = "Select * from product";
    knex.raw(insert_customer).then((datas) => {
        res.send(datas[0]);
    });
});

router.get('/productDetails/:id', function (req, res, next) {

    var insert_customer = "Select * from product where id=" + req.params.id;
    knex.raw(insert_customer).then((datas) => {
        res.send(datas[0]);
    });
});



router.post('/addPurchase', function (req, res, next) {

    var pid = req.body.pid;
    var quantity = req.body.quantity;


    var query = "INSERT INTO `purchase` (`id`, `pid`, `quantity`) VALUES (NULL, '" + pid + "', '" + quantity + "');";
    console.log(query)
    knex.raw(query).then((datas) => {
        var query1 = "select count(*) as count,quantity from stock where pid='" + pid + "'";
        knex.raw(query1).then((result) => {
            var query3=``;
            if(result[0][0].count==0){
                query3 = "INSERT INTO `stock` (`id`, `pid`, `quantity`) VALUES (NULL, '"+pid+"', '"+quantity+"');"
            }else{
                var old_quantity = result[0][0].quantity;
                var new_quantity = (old_quantity-0)+(quantity-0);
                query3 ="UPDATE `stock` SET `quantity` = '"+new_quantity+"' WHERE `stock`.`pid` = "+pid+";";
            }
            console.log(query3);
            knex.raw(query3).then((result) => {
                res.send("Purchase sucessfully addred")
            });
        });
    });
});


router.get('/getCustomer/:mobile', function (req, res, next) {
    var mobile = req.params.mobile;
    var query= "Select * from customer where mobile=" + req.params.mobile;
    knex.raw(query).then((datas) => {
        res.send(datas[0]);
    });
});



router.post('/addSales', function (req, res, next) {

    var mobile=req.body.mobile;
    var pid=req.body.pid;
    var quantity=req.body.quantity;
    var total=req.body.total;

    var query1 = "select id from customer where mobile='"+mobile+"'";
    knex.raw(query1).then((datas)=>{
        var cid = datas[0][0].id;

        var query = "INSERT INTO `sales` (`id`,`cid`, `pid`, `quantity`,`total`) VALUES (NULL, '" + cid + "','" + pid + "', '" + quantity + "','" + total + "');";
        console.log(query)
        knex.raw(query).then((datas) => {
            var query1 = "select count(*) as count,quantity from stock where pid='" + pid + "'";
            knex.raw(query1).then((result) => {
                var query3=``;
                if(result[0][0].count==0){
                   // query3 = "INSERT INTO `stock` (`id`, `pid`, `quantity`) VALUES (NULL, '"+pid+"', '"+quantity+"');"
                }else{
                    var old_quantity = result[0][0].quantity;
                    var new_quantity = (old_quantity-0)-(quantity-0);
                    query3 ="UPDATE `stock` SET `quantity` = '"+new_quantity+"' WHERE `stock`.`pid` = "+pid+";";

                    console.log(query3);
                    knex.raw(query3).then((result) => {
                        res.send("Sales sucessfully Completed")
                    });
                }

            });
        });

    });


});

router.get('/getBillings', function (req, res, next) {
    var query = "SELECT c.name,p.company,p.brand,p.product,p.price,s.quantity,s.total FROM `sales` as s left join customer as c on(c.id=s.cid) left join product as p on(p.id=s.pid)";
    knex.raw(query).then((datas) => {
        res.send(datas[0]);
    });
});
router.get('/getStocks', function (req, res, next) {
    var query = "SELECT p.company,p.brand,p.product,p.price,s.quantity FROM `stock` as s left join product as p on(p.id=s.pid)";
    knex.raw(query).then((datas) => {
        res.send(datas[0]);
    });
});
router.post('/login', function (req, res, next) {
    var query = "select count(*) as count from admin where username='"+req.body.username+"' and password='"+req.body.password+"'";;
    console.log(query)
    knex.raw(query).then((datas) => {
        res.send(datas[0]);
    });
});


module.exports = router;
