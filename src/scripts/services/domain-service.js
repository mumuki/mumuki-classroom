
angular
  .module('classroom')
  .service('Domain', function ($translate, $window, OrganizationMapper) {

    const openAth = (mode, path='') => {
      $window.open(`${this.laboratoryURL()}${path}`, mode);
      return true;
    }

    this.currentLocale = () => $translate.use();

    this.openLaboratory = () => openAth('_self');
    this.openExamInLaboratory = (exam) => openAth('_blank', `/exams/${exam}`);

    this.tosURL = () => `${this.laboratoryURL()}/static/tos/tos-${this.currentLocale()}.txt`

    this.guideURL = (slug) => `${this.laboratoryURL()}/guides/${slug}`

    this.exerciseURL = (exerciseId) => `${this.laboratoryURL()}/exercises/${exerciseId}`;
    this.exerciseURLByBibliotheca = (guideSlug, exerciseId) => `${this.laboratoryURL()}/exercises/${guideSlug}/${exerciseId}`;

    this.examURL = (exam) => `${this.laboratoryURL()}/exams/${exam}`;


    this.tenant = () => OrganizationMapper.tenant();
    this.laboratoryURL = () => OrganizationMapper.laboratoryURL();
    this.classroomApiURL = () => OrganizationMapper.classroomApiURL();
    this.bibliothecaApiURL = () => OrganizationMapper.bibliothecaApiURL();

    this.loginURL = () => OrganizationMapper.loginURL();
    this.logoutURL = () => OrganizationMapper.logoutURL();

  });
