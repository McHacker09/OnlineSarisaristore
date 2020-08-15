$(document).ready(function(){
   alert('This is to check if js is working');
   var x = window.matchMedia("(max-width: 700px)");

    
    onLoadCartIn();
    function getValue() {
        var current_pull = parseInt($('#mySidepanel').css('transform').split(',')[4]);
        return current_pull
    }

    function open_panel() {
        var translX = getValue();
        if (translX > 0) {
            $("#mySidepanel").css({
                'transform': 'translateX(0)',
                '-webkit-transform': 'translateX(0)',
                '-ms-transform': 'translateX(0)'});

        } else {
            $("#mySidepanel").css({
                'transform': 'translateX(100%)',
                '-webkit-transform': 'translateX(100%)',
                '-ms-transform': 'translateX(100%)'
            });
        }
    }
    // cart panel animation
    $('.openbtn').on('click', function(e){
        e.preventDefault();
        open_panel();
    });

    $('.mobile-add-btn').on('click', function(e){
        e.preventDefault();
        open_panel();
    });

    $('.closebtn').on('click', function(e){
        e.preventDefault();
        $("#mySidepanel").css({
            'transform': 'translateX(100%)',
            '-webkit-transform': 'translateX(100%)',
            '-ms-transform': 'translateX(100%)'
        });
        
            
    });
      
    // add to cart function
    

    function set_cart_pop(){
        let basket = JSON.parse(localStorage.getItem('basket'));

        pop = 0;
        for (const items in basket.items) {
            pop += basket.items[items].quantity
        };

        $('.in-cart').text(pop);
        $('.in-cart').css('display', 'inline-block');
    }

    $('.add-to-cart').on('click', function(e){
        let basket = JSON.parse(localStorage.getItem('basket'));
        e.preventDefault();
        console.log('Retrieve data-product-code to send to Django server');
        product_code = e.target.dataset.productCode;
        let items = Object.keys(basket.items);
        name = ""
        basket_codes = [];
        for (x in items) {
            basket_codes.push(basket.items[x].code);
            if (basket.items[x].code == product_code) {
                name = x
            }
        }
        if (basket_codes.includes(product_code)) {
            add_same_item(name)
        }
        else {
            $.ajax({
                url: 'add_to_cart/',
                type: 'GET',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: {
                    code : product_code
                },
                success: function(response){
                    // prod = JSON.stringify(response);
                    // console.log(prod);
                    setItemsBasket(response);
                }
            });
        }
        
        
    });

    function onLoadCartIn() {
        let basket_start = JSON.parse(localStorage.getItem('basket'));

        if (basket_start) {
            set_cart_pop()
        } else {
            $('.in-cart').css('display', 'none');
            localStorage.setItem('basket', JSON.stringify({items: {}}));
        }

        updateCartPanel();
    }

    function setItemsBasket(product) {
        let basket = JSON.parse(localStorage.getItem('basket'));

        if (basket.items[product.name]) {
            add_same_item(product.name);
            return;
        } else {
            console.log('adding a new item');
            basket.items[product.name] = product;
            initial_price = basket.items[product.name].price;
            basket.items[product.name].quantity = 1;
            basket.items[product.name].total_price = initial_price; 
        }

        localStorage.setItem('basket', JSON.stringify(basket));
        set_cart_pop()
        updateCartPanel();
    }

    function updateCartPanel() {
        $('#update-panel').empty();
        let basket = JSON.parse(localStorage.getItem('basket'));
        let products_basket = basket.items;
        
        for (const items in products_basket) {
            let html =  "<div class='col-12'>" +
                            "<div class='col-6'>" +
                                "<img src=" + basket.items[items].images[0].image +">" +
                            "</div>" +
                        "<div class='col-6'> " +
                            "<div class='col-12'> " + basket.items[items].name + " </div> " +
                                "<div class='col-12 justify-content-between'> " + 
                                    "<div class=''>Quantity:</div>" + 
                                    "<div class=''> " + 
                                        "<button class='btn btn-primary'>-</button>" + 
                                        "<span class='mx-3'>"+basket.items[items].quantity+"</span>" + 
                                        "<button class='btn btn-primary'>+</button>" +
                                    "</div>" + 
                                "</div>" + 
                                "<div class=''>" + 
                                    "<span>Total Price:</span>" + 
                                    "<span>" + basket.items[items].total_price + "</span>" +
                                "</div>" +
                            "</div>" +
                        "</div>";
            $('#update-panel').append(html);
        };
    }
    
    function add_same_item(name) {
            let basket = JSON.parse(localStorage.getItem('basket'));
            product = 
            console.log('Increasing Quantity of ' + basket.items[name].name);
            price = basket.items[name].price;
            basket.items[name].quantity += 1;
            quantity = basket.items[name].quantity;
            basket.items[name].total_price = price*quantity;

            localStorage.setItem('basket', JSON.stringify(basket));
            set_cart_pop()
            updateCartPanel();
    }
});



