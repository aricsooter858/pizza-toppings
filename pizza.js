var myModule = angular.module('pizza_toppings_app', []);

myModule.controller("MainController", ['$scope', 'LocalStorageService', 
                function($scope, LocalStorageService) {
                    
    var mc = this;
    
    mc.topping1 = "";
    mc.topping2 = "";
    mc.topping3 = "";
    mc.topping4 = "";
    mc.background = "emphasis";
    mc.pizzas = [];
    
        mc.pizza_toppings_options1 = [
	    {name: "cheese"},
	    {name: "pepperoni"},
	    {name: "sausage"},
	    {name: "hamburger"},
	    {name: "onion"},
	    {name: "pepper"}
	 ];
	 
	  mc.pizza_topping1 = mc.pizza_toppings_options1[0];
	  
	  mc.pizza_toppings_options2 = [
	    {name: "no topping 2"},
	    {name: "more cheese"},
	    {name: "pepperoni"},
	    {name: "sausage"},
	    {name: "hamburger"},
	    {name: "onion"},
	    {name: "pepper"}
	 ];
	 
	  mc.pizza_topping2 = mc.pizza_toppings_options2[0];
	  
	  mc.pizza_toppings_options3 = [
	    {name: "no topping 3"},
	    {name: "more cheese"},
	    {name: "pepperoni"},
	    {name: "sausage"},
	    {name: "hamburger"},
	    {name: "onion"},
	    {name: "pepper"}
	 ];
	 
	  mc.pizza_topping3 = mc.pizza_toppings_options3[0];
	  
	  mc.pizza_toppings_options4 = [
	    {name: "no topping 4"},
	    {name: "more cheese"},
	    {name: "pepperoni"},
	    {name: "sausage"},
	    {name: "hamburger"},
	    {name: "onion"},
	    {name: "pepper"}
	 ];
	 
	  mc.pizza_topping4 = mc.pizza_toppings_options4[0];
    
    mc.emphasis = function (status, $event){
		
	var el = $event.target.id;
		
	if(status){
		console.log("enter: " + el);
		mc.background = "emphasis";
		console.log(mc.background);
	} else {
		console.log("exit: " + el);		
		mc.background = "deemphasis";
		console.log(mc.background);
	}
};
    
    mc.remove = function($index){

	    mc.pizzas = mc.latestData();
	    mc.pizzas.splice($index, 1);
	    return LocalStorageService.setData('my-storage', angular.toJson(mc.pizzas));		
		
	};
	
	mc.latestData = function() {
        return LocalStorageService.getData('my-storage');
    };
    
    mc.update = function(top1, top2, top3, top4) {
		mc.pizzas = mc.latestData();
		if(mc.pizzas == null){
			mc.pizzas = [];
		}
		var pizza = { topping1: top1, topping2: top2, topping3: top3, topping4: top4};
		console.log(angular.toJson(pizza));
		mc.pizzas.push(pizza);
        return LocalStorageService.setData('my-storage', angular.toJson(mc.pizzas));
    };
    
    if(mc.pizzas != null){
		mc.pizzas = mc.latestData();
	}else{
		console.log("crikey");
	}
	
	mc.show_edit = false;
	
	mc.show = function show(){
		mc.show_edit = true;
	};
	
	mc.hide = function(){
		mc.show_edit = false;
	};
}]);

myModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(key, val) {
			
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key) {
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});