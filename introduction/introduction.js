$(function() {
  var $frame = $('.deck-frame');

  var resetScaling = function() {
    $frame[0].contentWindow.$.deck('toggleScale');
    $frame[0].contentWindow.$.deck('toggleScale');
  };

  var replaceLink = function(linkSelector, linkHref) {
    $frame.contents().find(linkSelector).attr('href', linkHref);
    resetScaling();
  };

  $('#style-themes').change(function() {
    replaceLink('#style-theme-link', $(this).val());
  });

  $('#transition-themes').change(function() {
    replaceLink('#transition-theme-link', $(this).val());
  });
});

