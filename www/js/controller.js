angular.module('app', ['ui-notification'])
    .controller('appCtrl', function ($scope, $log, $http, Notification) {
        var vm = this;
        window.appBaseURL = window.location.origin;
        vm.currentActive = 1;
        vm.customers = [];
        vm.orders = [];
        vm.customerSchema = [];
        vm.newColumn = {};
        vm.newCustomer = {};
        vm.convertCamelCaseBackToText = convertCamelCaseBackToText;
        vm.addField = addField;
        vm.saveField = saveField;
        Init();

        function getCustomerColumns() {
            $http({
                method: "GET",
                url: window.appBaseURL + "/customers/getCustomerColumns"
            }).then(function (response) {
                if (response.data.error) Notification.error({ message: 'Some error occurred.', delay: 1000 });

                vm.customerSchema = response.data.response;
                $log.info(vm.customerSchema)
            }, function (error) {
                $log.error(error)
            })
        };
        function getCustomers() {
            $http({
                method: "GET",
                url: window.appBaseURL + "/customers/getCustomers"
            }).then(function (response) {
                if (response.data.error) Notification.error({ message: 'Some error occurred.', delay: 1000 });

                vm.customers = response.data.response;
            }, function (error) {
                $log.error(error);
            })
        };
        function getAllOrderes() {
            $http({
                method: "GET",
                url: window.appBaseURL + "/orders/getAllOrderes"
            }).then(function (response) {
                if (response.data.error) Notification.error({ message: 'Some error occurred.', delay: 1000 });
                vm.orders = response.data.response;
            })
        }
        function Init() {
            getCustomerColumns();
            getCustomers();
            getAllOrderes();
        };
        function addField() {
            vm.addingNewField = true;
            vm.newColumn = {};
        }
        function convertCamelCaseBackToText(string) {
            var result = string.replace(/([A-Z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1);
        };

        vm.createCustomer = function () {
            $http({
                method: "POST",
                url: window.appBaseURL + "/customers/createCustomer",
                data: vm.newCustomer
            }).then(function (response) {
                if (!response.data.error) {
                    Notification.success('Request Completed');
                    vm.customers.push(vm.newCustomer);
                    vm.newCustomer = {};
                }
                else Notification.error({ message: 'Some error occurred.', delay: 1000 });

            })
        };

        function saveField() {
            $http({
                method: "POST",
                url: window.appBaseURL + "/customers/addNewCustomerAttribute/",
                data: { name: vm.newColumn.name, type: vm.newColumn.type }

            }).then(function (response) {
                if (!response.data.error) {
                    Notification.success('Request Completed');
                    vm.customerSchema.push({ Field: vm.newColumn.name });
                    vm.customers.forEach(o => { o[vm.newColumn.name] = '' });
                    console.log(vm.customers);
                    vm.addingNewField = false;
                    vm.newColumn = {};
                }
                else Notification.error({ message: 'Some error occurred.', delay: 1000 });
                $log.info(response);



            }, function (error) {
                $log.error(error)
            })
        };
        vm.cancelNewField = function () {
            vm.addingNewField = false;
            vm.newColumn = {};
        };
        vm.createOrder = function () {
            vm.order['customerName'] = JSON.parse(vm.selectCustomer).customerName;
            vm.order['customerAddress'] = JSON.parse(vm.selectCustomer).customerAddress;
            $http({
                method: "POST",
                url: window.appBaseURL + "/orders/createNewOrder",
                data: vm.order
            }).then(function (response) {
                if (!response.data.error) {
                    Notification.success('Request Completed');
                    vm.order['id'] = response.data.response.insertId;
                    vm.orders.push(vm.order);
                    vm.order = {};
                    vm.selectCustomer = {};

                }
                else Notification.error({ message: 'Some error occurred.', delay: 1000 });
                $log.info(response);
            }, function (error) {
                $log.error(error);
            })
        };
        vm.deleteCustomer = function (customer) {
            $http({
                method: "DELETE",
                url: window.appBaseURL + "/customers/deleteCustomerInfo",
                data: customer,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                if (!response.data.error) {
                    Notification.success('Request Completed');
                    vm.customers.splice(vm.customers.findIndex(o => o.customerName == customer.customerName && o.customerAddress == customer.customerAddress), 1)
                }
                else Notification.error({ message: 'Some error occurred.', delay: 1000 });
            })
        };
        vm.updateCustomer = function (customer) {
            $http({
                method: "PUT",
                url: window.appBaseURL + "/customers/updateCustomerInfo",
                data: { 'customer': customer, 'customerInfo': customer }
            }).then(function (response) {
                if (!response.data.error) {
                    Notification.success('Request Completed');
                }
                else {
                    Notification.error({ message: 'Some error occurred.', delay: 1000 });
                    // vm.customers.splice(vm.customers.findIndex(o => o.customerName == customer.customerName && o.customerAddress == customer.customerAddress), 1)

                }
            })
        };
        vm.deleteOrder = function (id) {
            $http({
                method: "DELETE",
                url: window.appBaseURL + "/orders/deleteOrder/" + id
            }).then(function (response) {
                if (!response.data.error) {
                    Notification.success('Request Completed');
                    vm.orders.splice(vm.orders.findIndex(o => o.id == id), 1)

                }
                else {
                    Notification.error({ message: 'Some error occurred.', delay: 1000 });

                }
            })
        };
        vm.updateOrder = function (order) {
            $http({
                method: "POST",
                url: window.appBaseURL + "/orders/updateOrder/" + order.id,
                data : order
            }).then(function (response) {
                if (!response.data.error) {
                    Notification.success('Request Completed');
                }
                else {
                    Notification.error({ message: 'Some error occurred.', delay: 1000 });

                }
            })
        }


        String.prototype.toCamelCase = function (str) {
            return str
                .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
                .replace(/\s/g, '')
                .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
        }
    })