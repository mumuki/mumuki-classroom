
classroomTest('Edit Exam Controller', () => {

  const date = moment().toDate();

  let $scope;
  let students;

  beforeEach(inject((_$rootScope_, _$controller_) => {
    $scope = _$rootScope_.$new();
    students = [{ social_id: 0 }, { social_id: 1 }, { social_id: 2 }];
    const exam = {
      id: '0123456789abcdef',
      start_time: date,
      end_time: date,
      duration: 60,
      slug: 'mumuki/mumuki-guia-funcional',
      name: 'mumuki guia funcional',
      language: 'haskell',
      social_ids: [1]
    };
    _$controller_('EditExamController', { $scope, students, exam });
  }));

  describe('#getExam', () => {
    let e;

    beforeEach(() => e = $scope.getExam());

    it('should has correct id', () => e.id.should.be.eql('0123456789abcdef'));
    it('should has correct slug', () => e.slug.should.be.eql('mumuki/mumuki-guia-funcional'));
    it('should has correct name', () => e.name.should.be.eql('mumuki guia funcional'));
    it('should has correct duration', () => e.duration.should.be.eql(60));
    it('should has correct end_time', () => e.end_time.should.be.eql(date));
    it('should has correct language', () => e.language.should.be.eql('haskell'));
    it('should has correct start_time', () => e.start_time.should.be.eql(date));
    it('should has correct social_ids', () => e.social_ids.should.be.eql([1]));
  });

  describe('#toggle', () => {
    it('when toggle new one should add a social_id', () => {
      $scope.toggle(students[0]);
      $scope.getExam().social_ids.should.be.eql([0, 1]);
    });
    it('when toggle new one and old one should add a social_id', () => {
      $scope.toggle(students[1]);
      $scope.toggle(students[2]);
      $scope.getExam().social_ids.should.be.eql([2]);
    });
  });

  describe('#unselectAll', () => {
    it('should remove all social_ids', () => {
      $scope.unselectAll();
      $scope.getExam().social_ids.should.be.eql([]);
    });
  });

  describe('#selectAll', () => {
    it('should add all social_ids', () => {
      $scope.selectAll();
      $scope.getExam().social_ids.should.be.eql([0, 1, 2]);
    });
  });

});