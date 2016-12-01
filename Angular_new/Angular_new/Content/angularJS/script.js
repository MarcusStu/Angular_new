/// <reference path="angular.min.js" />

var app = angular.module("myApp", ["ngRoute"])
                 .config(function ($routeProvider) {

                     // Routes to specific urls and sends the request to a specific controller
                     $routeProvider
                        .when("/home", {
                            templateUrl: "/Templates/home.html",
                            controller: "homeController"
                        })
                         .when("/create", {
                             templateUrl: "/Templates/create.html",
                             controller: "createController"
                         })
                         .when("/remove/:Id", {
                             templateUrl: "/Templates/remove.html",
                             controller: "removeController"
                         })
                         .when("/edit/:Id", {
                             templateUrl: "/Templates/edit.html",
                             controller: "editController"
                         })
                         .when("/people/:Id", {
                             templateUrl: "/Templates/peopleDetail.html",
                             controller: "peopleDetailsController"
                         })
                         // If the request does not match any of the above, it redirects to /home
                     .otherwise({
                         redirectTo: "/home"
                     })
                 })

.controller("homeController", function ($scope, $http) {
    $http.get("People/AjaxThatReturnsJson")
    .then(function (response) {
        $scope.persons = response.data;
        console.log(response.data);
    })
})

.controller("peopleDetailsController", function ($scope, $http, $routeParams) {
    $http.get("People/GetCountries")
        .then(function (response) {
            $scope.countries = response.data;
        })
    $http({
        url: "People/AjaxThatReturnsJsonPerson/" + $routeParams.Id,

        method: "get"
    })
        .then(function (response) {
            $scope.peopledetail = response.data;
            console.log(response.data);
        })
})

.controller("createController", function ($scope, $http, $location) {
    $http.get("People/GetCountries")
        .then(function (response) {
            $scope.countries = response.data;

        })

    $scope.sendform = function () {
        console.log($scope.form);
        $http({

            url: "People/Create",
            method: "post",
            data: newPerson = $scope.form
        })
        .success(function (response) {
            $scope.successCreate = response.data;
            console.log(response.data);
            alert("Created successfully!");
            $location.url('/home')
        })
    }
})

.controller("removeController", function ($scope, $http, $routeParams, $location) {
    $http.get("People/GetCountries")
        .then(function (response) {
            $scope.countries = response.data;
        })

    $scope.param = $routeParams;
    $http({
        url: "People/AjaxThatReturnsJsonPerson/" + $routeParams.Id,
        method: "get"
    })
    .then(function (response) {
        $scope.peopleRemoveDetail = response.data;
        console.log(response.data);
    })

    $scope.sendRemoveform = function () {
        console.log('removeAjax ' + $scope.param.Id);
        $http({
            url: "People/Remove/" + $scope.param.Id,
            method: "post",
        })

        .success(function (response) {
            $scope.successDelete = response.data;
            console.log(response.data);
            alert("Removed successfully!");
            $location.url('/home')
        })
    }
})

.controller("editController", function ($scope, $http, $routeParams, $location) {

    // Uses/gets the countries method from PeopleController
    $http.get("People/GetCountries")
        .then(function (response) {
            $scope.countries = response.data;
        })

    // Gets the id from the specific person
    $scope.param = $routeParams;
    $http({
        url: "People/AjaxThatReturnsJsonPerson/" + $routeParams.Id,
        method: "get"
    })
        // Store the information in a scope
    .then(function (response) {
        $scope.peopleEdit = response.data;
        console.log(response.data);
    })

    // Post the information up to the controller
    $scope.sendEditForm = function () {
        console.log('editAjax ' + $scope.param.Id);
        console.log('personEdit name: ' + $scope.peopleEdit.Name);
        $http({
            url: "People/Edit/" + $scope.param.Id,
            method: "post",
            data: { Id: $scope.peopleEdit.Id, Name: $scope.peopleEdit.Name, Gender: $scope.peopleEdit.Gender, Adress: $scope.peopleEdit.Adress, City: $scope.peopleEdit.City, Country: $scope.peopleEdit.Country },
        })

            // Success message (alert = popup box in browser) and redirects to /home
        .success(function (response) {
            $scope.successEdit = response.data;
            console.log(response.data);
            alert("Edited successfully!");
            $location.url('/home')
        })
    }
})
