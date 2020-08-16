require.config({
    waitSeconds: 0,
    baseurl: '/',
    paths: {
        'angular': 'angular.min',
        'jquery': 'jquery-3.2.1',
        'ui-router': 'angular-ui-router',
        'ngAnimate': 'angular-animate',
        'ngSanitize': 'angular-sanitize',
        'ngMaterial': 'angular-material.min',
        'ngAria': 'angular-aria',
        'ngTouch': 'angular-touch',
        'ngMessages': 'angular-messages',
        'ui.bootstrap': 'ui-bootstrap-tpls-2.5.0',
        'bootstrap': 'bootstrap',
        'ngIdle': 'angular-idle',
        'jqueryui': 'jquery-ui.min',
        'vfsfonts': 'vfs_fonts',
        'pdfMake': 'pdfmake.min',
        'html2canvas': 'html2canvas',
        'jspdf': 'jspdf',
        'FileSaver': 'FileSaver',
        'angularUtf8Base64': 'angular-utf8-base64',
        'angularBase64': 'angular-base64',
        'cryptojsProvider': "cryptojsProvider",
        'CryptoJS': 'aes',
        'ng.deviceDetector': 'ng-device-detector',
        'reTree': 're-tree',
        'wt.responsive': 'angular-responsive-tables',
        'cgBusy': 'angular-busy',
        'MassAutoComplete': 'massautocomplete',
        'BSMS': 'bootstrap-multiselect',
        'btorfs.multiselect': 'angular-bootstrap-multiselect',
        'tc.chartjs':'tc-angular-chartjs',
        'Covid19': 'Dashboard/Covid19',
        'DistrictWise': 'Dashboard/DistrictWise',
        'worldData': 'Dashboard/worldData',
        'covidInfo': 'Dashboard/covidInfo'
   },
    shim: {
        'ui-router': {
            deps: ['angular'],
            exports: 'angular'
        },
        ngAnimate: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngSanitize: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngMaterial: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngMessages: {
            deps: ['angular'],
            exports: 'angular'
        },
        'ng.deviceDetector':
            {
                deps: ['angular'],
                exports: 'angular'
            },
        reTree: {
            deps: ['angular'],
            exports: 'angular'
        },
        cryptojsProvider: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngAria: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngTouch: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngIdle: {
            deps: ['angular'],
            exports: 'angular'
        },
        'ui.bootstrap': {
            deps: ['angular'],
            exports: 'angular'
        },
        'vfsfonts': {
            deps: ['pdfMake'],
            exports: 'vfsfonts'
        },
        'pdfMake': {
            exports: 'pdfMake'
        },
        'html2canvas': {
            deps: ['pdfMake']
        },
        'jspdf': {
            deps: ['jquery']
        },
        'FileSaver': {
            deps: ['pdfMake']
        },
        'angularUtf8Base64': {
            deps: ['angular'],
            exports: 'angular'
        },
        'angularBase64': {
            deps: ['angular'],
            exports: 'angular'
        },
        'wt.responsive': {
            deps: ['angular'],
            exports: 'angular'
        },
        'cgBusy': {
            deps: ['angular']
        },
        'MassAutoComplete': {
            deps: ['angular'],
            exports: 'angular'
        },
        'BSMS': {
            deps: ['jquery']
        },
        'btorfs.multiselect': {
            deps: ['angular'],
            exports: 'angular'
        },
        angular: {
            exports: 'angular'
        },
        bootstrap: {
            deps: ['jquery']
        }
   },
    deps: ['app']
});

require([
'app',
'jqueryui',
'bootstrap',
'jquery',
'vfsfonts',
'pdfMake',
'html2canvas',
'jspdf',
'FileSaver',
'angularUtf8Base64',
'angularBase64',
'CryptoJS',
'wt.responsive',
'BSMS',
'btorfs.multiselect',
'Covid19',
'DistrictWise',
'worldData',
'covidInfo'
],
 function (app) {
     //bootstrapping app
     app.init();
 }
);

