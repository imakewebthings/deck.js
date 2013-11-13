describe('Deck JS Menu', function() {
  var $d = $(document);
  var dsc = defaults.selectors.container;

  beforeEach(function() {
    loadFixtures('standard.html');
    if (Modernizr.history) {
      history.replaceState({}, "", "#")
    }
    else {
      window.location.hash = '#';
    }
    $.deck('.slide');
  });

  describe('showMenu()', function() {
    it('should show the menu', function() {
      expect($(dsc)).not.toHaveClass(defaults.classes.menu);
      $.deck('showMenu');
      expect($(dsc)).toHaveClass(defaults.classes.menu);
    });

    it('should do nothing if menu is already showing', function() {
      if (Modernizr.csstransforms) {
        $.deck('showMenu');
        $.deck('showMenu');
        $.deck('hideMenu');
        expect($('.slide').attr('style')).toBeFalsy();
      }
    });
  });

  describe('hideMenu()', function() {
    it('should hide the menu', function() {
      $.deck('showMenu');
      $.deck('hideMenu');
      expect($(dsc)).not.toHaveClass(defaults.classes.menu);
    });
  });

  describe('toggleMenu()', function() {
    it('should toggle menu on and off', function() {
      expect($(dsc)).not.toHaveClass(defaults.classes.menu);
      $.deck('toggleMenu');
      expect($(dsc)).toHaveClass(defaults.classes.menu);
      $.deck('toggleMenu');
      expect($(dsc)).not.toHaveClass(defaults.classes.menu);
    });
  });

  describe('key bindings', function() {
    var e;

    beforeEach(function() {
      e = jQuery.Event('keydown.deckmenu');
    });

    it('should toggle the menu if the specified key is pressed', function() {
      e.which = 77; // m
      $d.trigger(e);
      expect($(dsc)).toHaveClass(defaults.classes.menu);
      $d.trigger(e);
      expect($(dsc)).not.toHaveClass(defaults.classes.menu);
    });
  });

  describe('touch bindings', function() {
    var estart, eend;

    beforeEach(function() {
      estart = jQuery.Event('touchstart.deckmenu');
      eend  = jQuery.Event('touchend.deckmenu');
    });

    it('should toggle the menu if the screen is touched', function() {
      $.deck('getOptions').touch.doubletapWindow = Date.now() + 100000;
      $.deck('getContainer').trigger(estart);
      $.deck('getContainer').trigger(eend);
      expect($(dsc)).toHaveClass(defaults.classes.menu);
    });
  });

});
