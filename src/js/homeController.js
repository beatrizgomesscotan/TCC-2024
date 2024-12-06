app.controller('homeController', function ($scope, config, $ngConfirm, $http, $timeout) {

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Jun', 'Jul'],
        datasets: [{
          label: 'Pedidos Reaizados',
          data: [8, 19, 3, 7, 2, 4],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


    const ctx2 = document.getElementById('myChart2');

    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun'],
        datasets: [{
          label: 'Pedidos Realizados',
          data: [1200, 100, 3000, 500, 800, 6000],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

});

