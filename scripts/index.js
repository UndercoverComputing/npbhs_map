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

  $('#myMaps').on('wayfinding:roomClicked', function(e, r) {
    $('#endSelect option[value="' + r.roomId + '"]').attr('selected', true);
  });


  $('.logo').on("click", function() {
    $('div#floor1').panzoom('reset')
  });

  $('a#qs-ryder').on("click", function(e) {
    e.preventDefault();
    var pos = $("line#Ryder").position()
    $('div#floor1').panzoom("pan", 600, -370, {
      animate: true
    })
    $('div#floor1').panzoom('zoom', 1, {
      animate: true,
      focal: {
        clientX: pos.left,
        clientY: pos.top
      }
    });
    $('#myMaps').wayfinding('startpoint', 'Ryder');
    $('select#endSelect').val('Ryder').niceSelect('update');
  });

  $('a#qs-pridham').on("click", function(e) {
    e.preventDefault();
    var pos = $("g#Pridham-2").position()
    $('div#floor1').panzoom("pan", 600, 270, {
      animate: true
    })
    $('div#floor1').panzoom('zoom', 1, {
      animate: true,
      focal: {
        clientX: pos.left,
        clientY: pos.top
      }
    });
    $('#myMaps').wayfinding('startpoint', 'P6');
    $('select#endSelect').val('P6').niceSelect('update');
  });

  $('a#qs-gym').on("click", function() {
    var pos = $("g#Gym")[0].getBBox();
    var x = -(pos.x / 4)
    var y = -(pos.y / 4)
    $("div#floor1").panzoom("pan", x, y, {
      relative: false,
      animate: true
    });
    $('#myMaps').wayfinding('startpoint', 'Gym');
    $('select#endSelect').val('Gym').niceSelect('update');
  });


  $('a#mqs-ryder').on("click", function() {
    $('div#floor1').panzoom("setMatrix", ["1.49535", "0", "0", "1.49535", "143.2", "-4.339"], {
      animate: true
    })
    $('#myMaps').wayfinding('startpoint', 'Ryder');
    $('select#endSelect').val('Ryder').niceSelect('update');
  });

  $('a#mqs-pridham').on("click", function() {
    $('div#floor1').panzoom("setMatrix",   ["1.49535", "0", "0", "1.49535", "131.2", "167.661"], {
      animate: true
    })
    $('#myMaps').wayfinding('startpoint', 'P6');
    $('select#endSelect').val('P6').niceSelect('update');
  });

  $('a#mqs-gym').on("click", function() {
    $('div#floor1').panzoom("setMatrix", ["1.49535", "0", "0", "1.49535", "-201.8", "108.661"], {
      animate: true
    })
    $('#myMaps').wayfinding('startpoint', 'Gym');
    $('select#endSelect').val('Gym').niceSelect('update');
  });

  $('i#zoom_in.material-icons').on("click", function() {
    $('div#floor1').panzoom('zoom', {
      focal: {
        clientX: (window.innerWidth / 2),
        clientY: (window.innerHeight / 2)
      },
      increment: 0.3,
    });
  });

  $('i#zoom_out.material-icons').on("click", function() {
    $('div#floor1').panzoom('zoom', true, {
      linearZoom: true,
      increment: 0.3,
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

  $('a#view-github').click(function() {
    window.location.href = 'https://github.com/007joshie/npbhs_map';
  });

});

$(document).ready(function() {
  $('select').niceSelect();
});
