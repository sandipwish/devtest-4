angular.module("todoApp", ["ngRoute"])

    .directive('accessibleForm', function () {
        return {
            link: function (scope, elem) {

                // set up event handler on the form element
                elem.on('submit', function () {

                    // find the first invalid element
                    var firstInvalid = elem[0].querySelector('.ng-invalid');

                    // if we find one, set focus
                    if (firstInvalid) {
                        firstInvalid.focus();
                    }
                });
            }
        };
    })

    .directive('focus',
        function ($timeout) {
            return {
                scope: {
                    trigger: '@focus'
                },
                link: function (scope, element) {
                    scope.$watch('trigger', function (value) {
                        if (value === "true") {
                            $timeout(function () {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        }
    )

    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "TodoListController as todoList",
                templateUrl: "/app/templates/list.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    })

    .controller("TodoListController", function () {
        var todoList = this;

        todoList.reset = function (myForm) {
            myForm.$setPristine();
            todoList.todoText = "";
        }

        todoList.todos = [
            { text: "learn AngularJS", done: true },
            { text: "build an AngularJS app", done: false }];

        todoList.addTodo = function (myForm) {
            todoList.todos.push({ text: todoList.todoText, done: false });
            todoList.reset(myForm);
        };

        todoList.remaining = function () {
            var count = 0;
            angular.forEach(todoList.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        todoList.archive = function () {
            var oldTodos = todoList.todos;
            todoList.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) todoList.todos.push(todo);
            });
        };

    });