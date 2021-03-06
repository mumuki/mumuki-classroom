
angular
  .module('classroom')
  .factory('Student', function (ICONS, Guide, Exercise, Submission) {

    var icons = ICONS;

    class Student {

      constructor(student = {}) {
        _.defaultsDeep(student, { stats: this.defaultStats() });
        _.defaults(this, student);
      }

      fullName() {
        return `${this._capitalize(this.last_name)}, ${this._capitalize(this.first_name)}`
      }

      getName() {
        return this.fullName();
      }

      totalStats() {
        return this.stats.passed + this.stats.passed_with_warnings + this.stats.failed;
      }

      defaultStats() {
        return { passed: 0, failed: 0, passed_with_warnings: 0 };
      }

      provider() {
        return _.get(this, 'social_id', '').split('|')[0];
      }

      providerIcon() {
        return icons.get(this.provider());
      }

      lastSubmissionTime() {
        return _.get(this, 'last_assignment.submission.created_at');
      }

      lastGuideName() {
        return _.get(this, 'last_assignment.guide.name');
      }

      lastGuideSlug() {
        return _.get(this, 'last_assignment.guide.slug', '');
      }

      lastGuideRepo() {
        return this.lastGuideSlug().split('/')[1];
      }

      lastGuideOrg() {
        return this.lastGuideSlug().split('/')[0];
      }

      lastGuide() {
        return _.get(this, 'last_assignment.guide');
      }

      lastExerciseSubmitted() {
        return _.get(this, 'last_assignment.exercise');
      }

      static from(student) {
        student.last_assignment = student.last_assignment || {};
        student.last_assignment.guide = Guide.from(student.last_assignment.guide);
        return new Student(student);
      }

      _capitalize(name) {
        return _(name).split(' ').map(_.capitalize).join(' ');
      }

    }

    return Student;

  })
