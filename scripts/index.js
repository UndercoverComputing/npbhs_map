$(document).ready(function() {
  'use strict';
  $('#myMaps').wayfinding({
      'maps': [{
        'path': 'maps/map7.svg',
        'id': 'floor1'
      }, ],
      'path': {
        width: 5,
        color: 'Red',
        radius: 7,
        speed: 4
      },
      'defaultMap': 'floor1',
      'showLocation': true
    },
    function() {
      console.log('Started');
      var start = $.getQuery('start');
      var end = $.getQuery('end');
      console.log(start, end);
      if ($('select#beginSelect').find("option[value='" + start + "']").length == 1) {
        $('#myMaps').wayfinding('startpoint', start);
        $('select#beginSelect').val(start).niceSelect('update');
        if ($('select#endSelect').find("option[value='" + end + "']").length == 1) {
          $('#myMaps').wayfinding('routeTo', end);
          $('select#endSelect').val(end).niceSelect('update');
        }
      }
    });

  $("#dropdown").on("click", function(e) {
    e.preventDefault();
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).children("ul").slideUp("fast");
    } else {
      $(this).addClass("open");
      $(this).children("ul").slideDown("fast");
    }
  });


  /*  //make the floor buttons clickable
    $('#controls button').click(function() {
      $('#myMaps').wayfinding('currentMap', $(this).prop('id'));
    });*/

  $('select#beginSelect').change(function() {
    $('#myMaps').wayfinding('startpoint', $(this).val());
    if ($('select#endSelect').val() !== null) {
      $('div#floor1').panzoom('reset');
      $('#myMaps').wayfinding('routeTo', $('#endSelect').val());
    }
  });

  $('select#endSelect').change(function() {
    console.log($(this).val())
    if ($('select#beginSelect').val() !== null) {
      $('#myMaps').wayfinding('routeTo', $(this).val());
    };
  });

  /*$('#controls #accessible').change(function() {
    if ($('#accessible:checked').val() !== undefined) {
      $('#myMaps').wayfinding('accessibleRoute', true);
    } else {
      $('#myMaps').wayfinding('accessibleRoute', false);
    }
    if ($('#endSelect').val() !== '') {
      $('#myMaps').wayfinding('routeTo', $('#endSelect').val());
    }
  });*/


  $('#myMaps').on('wayfinding:roomClicked', function(e, r) {
    $('#endSelect option[value="' + r.roomId + '"]').attr('selected', true);
  });

  $('#zoom').on("click", function() {
    $('div#floor1').panzoom('zoom')
  });

  $('.logo').on("click", function() {
    $('div#floor1').panzoom('reset')
  });

  $('a#qs-ryder').on("click", function() {
    $('div#floor1').panzoom('reset');
    $("div#floor1").panzoom("pan", 600, -500, {
      relative: false,
      animate: true
    });
  });

  $('a#qs-pridham').on("click", function() {
    $('div#floor1').panzoom('reset');
    $('div#floor1').panzoom('zoom', 1.5);
    $("div#floor1").panzoom("pan", 1000, 700, {
      relative: false,
      animate: true
    });
    $('#myMaps').wayfinding('startpoint', 'P6');
  });

  $('a#qs-gym').on("click", function() {
    $('div#floor1').panzoom('reset');
    $('div#floor1').panzoom('zoom', 1.5);
    $("div#floor1").panzoom("pan", -650, 150, {
      relative: false,
      animate: true
    });
    $('#myMaps').wayfinding('startpoint', 'Gym');
  });

  $('a#qs-ryder').on("click", function() {
    $('div#floor1').panzoom('reset');
    $("div#floor1").panzoom("pan", 600, -500, {
      relative: false,
      animate: true,
    });
    $('#myMaps').wayfinding('startpoint', 'Ryder');
  });

  $('a#mqs-ryder').on("click", function() {
    $('div#floor1').panzoom('reset');
    $('div#floor1').panzoom('zoom', 3.2);
    $("div#floor1").panzoom("pan", 460, 575, {
      relative: false,
      animate: true
    });
    $('#myMaps').wayfinding('startpoint', 'Ryder');
  });

  $('a#mqs-pridham').on("click", function() {
    $('div#floor1').panzoom('reset');
    $('div#floor1').panzoom('zoom', 3);
    $("div#floor1").panzoom("pan", 400, 950, {
      relative: false,
      animate: true
    });
    $('#myMaps').wayfinding('startpoint', 'P6');
  });

  $('a#mqs-gym').on("click", function() {
    $('div#floor1').panzoom('reset');
    $('div#floor1').panzoom('zoom', 3);
    $("div#floor1").panzoom("pan", -300, 750, {
      relative: false,
      animate: true
    });
    $('#myMaps').wayfinding('startpoint', 'Gym');
  });

  $('i#zoom_in.material-icons').on("click", function() {
    $('div#floor1').panzoom('zoom', {
      focal: {
        clientX: (window.innerWidth / 2),
        clientY: (window.innerHeight / 2)
      },
      increment: 0.2,
    });
  });

  $('i#zoom_out.material-icons').on("click", function() {
    $('div#floor1').panzoom('zoom', true, {
      focal: {
        clientX: (window.innerWidth / 2),
        clientY: (window.innerHeight / 2)
      }
    });
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(function() {
      console.log("Service Worker Registered");
    });
  }

  $('#force-reload').on("click", function() {
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (let registration of registrations) {
          registration.unregister();
          console.log("Cleared")
        }
      });
    }
    window.location.reload()
  });

  $("#content").on('wheel', function(e) {
    e.preventDefault();
    var delta = e.delta || e.originalEvent.wheelDelta;
    var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
    $("div#floor1").panzoom('zoom', zoomOut, {
      increment: 0.1,
      focal: {
        clientX: (window.innerWidth / 2),
        clientY: (window.innerHeight / 2)
      },
      animate: false,
      exponential: false
    });
  });



});

$(document).ready(function() {
  $('select').niceSelect();
});
