
angular
  .module('classroom')
  .controller('ListHeaderController', function ($scope, $stateParams, list, uidField, itemTemplate, Api, Auth, Preferences, Followers, Domain) {

    $scope.listOptions = {
      search: ''
    };

    Preferences($scope, 'options');

    _.defaultsDeep($scope, { options: { sortingType: 'progress', isAscending: true }});

    $scope.withSortBy = true;
    $scope.withFilter = true;
    $scope.withDetails = true;
    $scope.withFollowers = true;
    $scope.withDetachedStudents = Auth.isTeacher();

    $scope.list = list;
    $scope.itemTemplate = itemTemplate;

    $scope.showDetails = Preferences.showDetails;
    $scope.toggleShowDetails = Preferences.toggleShowDetails;

    $scope.showDetachedStudents = Preferences.showDetachedStudents;
    $scope.toggleShowDetachedStudents = Preferences.toggleShowDetachedStudents;

    $scope.onlyFollowers = Preferences.onlyFollowers;
    $scope.toggleOnlyFollowers = Preferences.toggleOnlyFollowers;

    $scope.toggleIsAscending = () => $scope.options.isAscending = !$scope.options.isAscending;

    $scope.course = () => $stateParams.course;
    $scope.courseSlug = () => `${Domain.tenant()}/${$scope.course()}`;

    Api
      .getFollowers(Auth.profile().email, $scope.course())
      .then((data) => Followers.setFollowUps(data))
      .then(() => $scope.followUpsCount = Followers.count($scope.courseSlug()));

    $scope.sortingCriteria = () => _.find($scope.availableSortingCriterias, {type: $scope.options.sortingType}).properties;

    $scope.isFollowing = (uid) => Followers.isFollowing($scope.courseSlug(), uid);
    $scope.byFollowers = (item) => !$scope.onlyFollowers() || Followers.isFollowing($scope.courseSlug(), _.get(item, uidField));
    $scope.byDetachedStudents = (item) => !item.detached || ($scope.withDetachedStudents && $scope.showDetachedStudents());

  });
