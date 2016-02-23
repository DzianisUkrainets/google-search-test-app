searchApp.directive('duPagination', function() {
    return {
        restrict: 'E',
        template: '<ul><li ng-repeat="page in calcPages()"><a href="#" ng-bind="page" ng-click="selectItem(page)" ng-class="{true: \'selected-page\'}[page == currentPage]"></a></li>',
        scope: {
            currentPage: '=',
            max: '=',
            count: '=',
            onSelect: '&'
        },
        link: function (scope, element, attrs) {

        },
        controller: function ($scope, $element, $attrs, $transclude) {
            $scope.middle = Math.floor($scope.max / 2);

            var self = this;

            $scope.selectItem = function(index) {
                $scope.currentPage = index;
                $scope.onSelect({page: index});
            }

            $scope.calcPages = function () {
                var res = [];
                var from = $scope.currentPage - $scope.middle;
                var to = $scope.currentPage + $scope.middle - 1;

                if (from > 1) {
                    if (to + $scope.middle <= $scope.count) {
                        self.from = from;
                        self.to = to;
                        res = getPages(from, to);
                    }
                    else {
                        self.from = $scope.count - $scope.max + 1;
                        self.to = $scope.count;
                        res = getPages(self.from , self.to);
                    }
                }
                else {
                    self.from = 1;
                    self.to = self.from + $scope.max - 1;
                    res = getPages(self.from , self.to);
                }

                return res;
            };

            function getPages(from, to) {
                var result = [];
                for(var i= from; i <= to; i++) {
                    result.push(i);
                }
                return result;
            }
        }
    };
})