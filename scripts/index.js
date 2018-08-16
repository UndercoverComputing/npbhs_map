$(document).ready(function() {
  'use strict';
  $('#myMaps').wayfinding({
    'maps': [{
      'path': 'tests/map_version6.svg',
      'id': 'floor1'
    }, ],
    'path': {
      width: 3,
      color: '#FFFFFF',
      radius: 8,
      speed: 8
    },
    'startpoint': function() {
      return 'lcd.1';
    },
    'defaultMap': 'floor1',
    'showLocation': true
  }, function() {
    console.log('callback reached');
  });

/*  //make the floor buttons clickable
  $('#controls button').click(function() {
    $('#myMaps').wayfinding('currentMap', $(this).prop('id'));
  });*/

  $('select#beginSelect').change(function() {
    $('#myMaps').wayfinding('startpoint', $(this).val());
    if ($('#endSelect').val() !== '') {
      $('#myMaps').wayfinding('routeTo', $('#endSelect').val());
    }
  });

  $('select#endSelect').change(function() {
    $('#myMaps').wayfinding('routeTo', $(this).val());
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

});
