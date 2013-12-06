// Go tests, go
describe('Deck JS', function() {
  describe('standard html structure', function() {
    beforeEach(function() {
      loadFixtures('standard.html');
      if (Modernizr.history) {
        history.replaceState({}, "", "#")
      }
      else {
        window.location.hash = '#';
      }
    });

    describe('init(options.selectors.slides)', function() {
      it('should create slides', function() {
        $.deck({
          selectors: {
            slides: '.slide3'
          }
        });
        expect($.deck('getSlides').length).toEqual($('.slide3').length);
      });
    });

    describe('init(selector)', function() {
      it('should create slides', function() {
        $.deck();
        expect($.deck('getSlides').length).toEqual($('.slide').length);
      });
    });

    describe('init([selectors])', function() {
      it('should create slides', function() {
        $.deck([
          '.slide1',
          '.slide2',
          '.slide3',
          '.slide4',
          '.slide5'
        ]);
        expect($.deck('getSlides').length).toEqual($('.slide').length);
      });
    });

    describe('navigation functions', function() {
      beforeEach(function() {
        $.deck();
      });

      describe('go(i)', function() {
        it('should go to the i slide (0 based index)', function() {
          $.deck('go', 3);
          expect($.deck('getSlide')).toHaveClass('slide4');
        });

        it('should go to the slide with specified id', function() {
          $.deck('go', 'custom-id');
          expect($.deck('getSlide')).toHaveId('custom-id');
        });

        it('should go nowhere if i is out of bounds', function() {
          $.deck('go', 5);
          expect($.deck('getSlide')).toHaveClass('slide1');
        });

        it('should go nowhere if id does not exist', function() {
          $.deck('go', 'i-dont-exist');
          expect($.deck('getSlide')).toHaveClass('slide1');
        });

        describe('aria attribute updates', function() {
          beforeEach(function() {
            loadFixtures('nesteds.html');
            $.deck();
            $.deck('go', 5);
          });

          it('should set offscreen slides to hidden true', function() {
            $([
              '.toplevel.deck-before:not(.deck-child-current)',
              '.toplevel.deck-previous:not(.deck-child-current)',
              '.deck-next',
              '.deck-after'
            ].join(', ')).each(function() {
              expect($(this)).toHaveAttr('aria-hidden', 'true');
            });
          });

          it('should set onscreen slides to hidden false', function() {
            $([
              '.deck-child-current.slide',
              '.deck-child-current .deck-before',
              '.deck-child-current .deck-previous',
              '.deck-current'
            ].join(', ')).each(function() {
              expect($(this)).toHaveAttr('aria-hidden', 'false');
            });
          });
        });
      });

      describe('next()', function() {
        it('should go to the next slide', function() {
          $.deck('next');
          expect($.deck('getSlide')).toHaveClass('slide2');
        });

        it('should go nowhere if on the last slide', function() {
          $.deck('go', 4);
          $.deck('next');
          expect($.deck('getSlide')).toHaveClass('slide5');
        });
      });

      describe('prev()', function() {
        it('should go to the previous slide', function() {
          $.deck('go', 2);
          $.deck('prev');
          expect($.deck('getSlide')).toHaveClass('slide2');
        });

        it('should go nowhere if on the first slide', function() {
          $.deck('prev');
          expect($.deck('getSlide')).toHaveClass('slide1');
        });
      });
    });

    describe('getters', function() {
      beforeEach(function() {
        $.deck();
      });

      describe('getSlide()', function() {
        it('should get the current slide', function() {
          expect($.deck('getSlide')).toHaveClass('slide1');
          $.deck('go', 2);
          expect($.deck('getSlide')).toHaveClass('slide3');
        });
      });

      describe('getSlide(i)', function() {
        it('should get slide number i (0 based index)', function() {
          expect($.deck('getSlide', 1)).toHaveClass('slide2');
          expect($.deck('getSlide', 3)).toHaveClass('slide4');
        });

        it('should return null if i is NaN', function() {
          expect($.deck('getSlide', 'barfoo')).toBeNull();
        });

        it('should return null if i is out of bounds', function() {
          expect($.deck('getSlide', 6)).toBeNull();
        });
      });

      describe('getSlides()', function() {
        it('should return an array of jQuery objects for each slide', function() {
          var expectation = [];
          var slides = $.deck('getSlides');
          $('.slide').each(function() {
            expectation.push($(this));
          });
          expect(slides).toEqual(expectation);
        });
      });

      describe('getContainer()', function() {
        it('should return a jQuery object with the container element(s)', function() {
          expect($.deck('getContainer')).toBe(defaults.selectors.container);
        });
      });

      describe('getOptions()', function() {
        it('should return the current options object', function() {
          expect($.deck('getOptions')).toEqual(defaults);
        });
      });

      describe('getTopLevelSlides()', function() {
        it('should return only root slides', function() {
          loadFixtures('nesteds.html');
          $.deck();
          var expectation = [];
          var topLevelSlides = $.deck('getTopLevelSlides');
          $('.toplevel').each(function() {
            expectation.push($(this));
          });
          expect(topLevelSlides).toEqual(expectation);
        });
      });

      describe('getNestedSlides()', function() {
        it('should return nested slides for current slide', function() {
          loadFixtures('nesteds.html');
          $.deck();
          $.deck('go', 2);
          var expectation = [];
          var nestedSlides = $.deck('getNestedSlides');
          $.deck('getSlide').find('.slide').each(function() {
            expectation.push($(this));
          });
          expect(nestedSlides).toEqual(expectation);
        });
      });
    });

    describe('container states', function() {
      beforeEach(function() {
        $.deck();
      });

      it('should start at state 0', function() {
        expect($(defaults.selectors.container)).toHaveClass(defaults.classes.onPrefix + '0');
      });

      it('should change states with the slide number', function() {
        $.deck('next');
        expect($(defaults.selectors.container)).toHaveClass(defaults.classes.onPrefix + '1');
        $.deck('go', 3);
        expect($(defaults.selectors.container)).toHaveClass(defaults.classes.onPrefix + '3');
        $.deck('prev');
        expect($(defaults.selectors.container)).toHaveClass(defaults.classes.onPrefix + '2');
      });
    });

    describe('options object', function() {
      var $d = $(document);

      beforeEach(function() {
        $.deck('.alt-slide', {
          classes: {
            after: 'alt-after',
            before: 'alt-before',
            current: 'alt-current',
            onPrefix: 'alt-on-',
            next: 'alt-next',
            previous: 'alt-prev'
          },

          selectors: {
            container: '.alt-container'
          },

          keys: {
            next: 87,
            previous: 69
          }
        });
      });

      describe('classes', function() {
        it('should use the specified after class', function() {
          expect($('.alt-slide3, .alt-slide4, .alt-slide5')).toHaveClass('alt-after');
        });

        it('should use the specified before class', function() {
          $.deck('go', 4);
          expect($('.alt-slide1, .alt-slide2, .alt-slide3')).toHaveClass('alt-before');
        });

        it('should use the specified container class', function() {
          $.deck('go', 2);
          expect($('.alt-container')).toHaveClass('alt-on-2');
        });

        it('should use the specified current class', function() {
          expect($.deck('getSlide')).toHaveClass('alt-current');
        });

        it('should use the specified next class', function() {
          expect($('.alt-slide2')).toHaveClass('alt-next');
        });

        it('should use the specified previous class', function() {
          $.deck('next');
          expect($('.alt-slide1')).toHaveClass('alt-prev');
        });
      });

      describe('key bindings', function() {
        var e;

        beforeEach(function() {
          e = jQuery.Event('keydown.deck');
        });

        it('should go to the next slide using the specified key', function() {
          e.which = 87; // 'w'
          $d.trigger(e);
          expect($.deck('getSlide')).toHaveClass('alt-slide2');
        });

        it('should go to the previous slide using the specified key', function() {
          $.deck('next');
          e.which = 69; // 'e'
          $d.trigger(e);
          expect($.deck('getSlide')).toHaveClass('alt-slide1');
        });

        it('should not trigger events that originate within editable elements', function() {
          var $outside = $('<input type="text" />').appendTo('body');
          e = jQuery.Event('keydown');
          e.which = 87;
          $outside.trigger(e);
          expect($.deck('getSlide')).toHaveClass('alt-slide1');
          $outside.remove();
        });
      });
    });

    describe('events', function() {
      var $d;

      beforeEach(function() {
        $d = $(document);
      });

      describe('deck.change', function() {
        var index, oldIndex;

        beforeEach(function() {
          $.deck();
          $.deck('go', 1);
          $d.one('deck.change', function(event, from, to) {
            index = to;
            oldIndex = from;
          });
        });

        it('should fire on go(i)', function() {
          $.deck('go', 3);
          expect(index).toEqual(3);
        });

        it('should fire on next()', function() {
          $.deck('next');
          expect(index).toEqual(2);
        });

        it('should fire on prev()', function() {
          $.deck('prev');
          expect(index).toEqual(0);
        });

        it('should pass parameters with from and to indices', function() {
          $.deck('go', 3);
          expect(index).toEqual(3);
          expect(oldIndex).toEqual(1);
        });

        it('should not fire if default prevented in beforeChange', function() {
          $d.bind('deck.beforeChange', false);
          $.deck('go', 3);
          expect($.deck('getSlide')).toEqual($.deck('getSlide', 1));
          $d.unbind('deck.beforeChange', false);
        });
      });

      describe('deck.init', function() {
        it('should fire on deck initialization', function() {
          $.deck();
          expect($.deck('getSlides').length).toBeGreaterThan(0);
        });
      });

      describe('deck.beforeInit', function() {
        var beforeHit;

        beforeEach(function() {
          beforeHit = false;
          $d.on('deck.beforeInit', function() {
            beforeHit = true;
          });
        });

        it('should fire on deck initialization', function() {
          $.deck();
          expect(beforeHit).toBeTruthy();
        });

        it('should have populated the slides array', function() {
          var f = function() {
            expect($.deck('getSlides').length).toEqual($('.slide').length);
          };

          $d.bind('deck.beforeInit', f);
          $.deck();
          $d.unbind('deck.beforeInit', f);
        });

        it('should prevent the init event if lockInit is called', function() {
          var initHit = false;
          var f = function(event) {
            event.lockInit();
          };
          var g = function() {
            initHit = true;
          };

          $d.bind('deck.beforeInit', f);
          $d.bind('deck.init', g);
          $.deck();
          $d.unbind('deck.beforeInit', f);
          $d.unbind('deck.init', g);
          expect(initHit).toBeFalsy();
        });

        it('should warn if locked without release', function() {
          var warned = false;
          var f = function(event) {
            event.lockInit();
          };
          var warn = console.warn;
          window.console.warn = function() {
            warned = true;
          };

          $d.bind('deck.beforeInit', f);
          $.deck('.slide', {
            initLockTimeout: 20
          });
          $d.unbind('deck.beforeInit', f);

          waitsFor(function() {
            return warned;
          }, 'warning', 2000);

          runs(function() {
            window.console.warn = warn;
          });
        });

        it('should fire init event once releaseInit is called', function() {
          var f = function(event) {
            event.lockInit();
            window.setTimeout(function() {
              event.releaseInit();
            }, 20);
          };

          runs(function() {
            $d.bind('deck.beforeInit', f);
            $.deck();
            $d.unbind('deck.beforeInit', f);
          });

          waitsFor(function() {
            return $.deck('getSlides').length > 0;
          }, 'lock to release', 2000);
        });
      });
    });

    describe('hash/id assignments', function() {
      beforeEach(function() {
        $.deck('.slide');
      });

      it('should assign ids to slides that do not have them', function() {
        var slides = $.deck('getSlides');
        $.each(slides, function(i, $e) {
          expect($e.attr('id')).toBeTruthy();
        });
      });

      it('should reassign ids on reinitialization', function() {
        var $firstSlide = $.deck('getSlide', 0);
        var firstID = $firstSlide.attr('id');

        $firstSlide.before('<div class="slide"></div>');
        $.deck('.slide');
        expect($firstSlide).not.toHaveId(firstID);
      });

      it('should update container with a state class including the slide id', function() {
        var $c = $.deck('getContainer');
        var osp = defaults.classes.onPrefix;

        expect($c).toHaveClass(osp + $.deck('getSlide', 0).attr('id'));
        $.deck('next');
        expect($c).toHaveClass(osp + $.deck('getSlide', 1).attr('id'));
        $.deck('next');
        expect($c).not.toHaveClass(osp + $.deck('getSlide', 1).attr('id'));
        expect($c).toHaveClass(osp + $.deck('getSlide', 2).attr('id'));
      });

      it('should use existing ids if they exist', function() {
        expect($('#custom-id')).toExist();
      });

      it('should update the URL on slide change (if supported)', function() {
        if (Modernizr.history) {
          $.deck('go', 3);
          expect(window.location.hash).toEqual('#slide-3');
        }
      });

      it('should deep link to slide on deck init', function() {
        window.location.hash = "#slide-3";
        $.deck('.slide');
        waitsFor(function() {
          return $.deck('getSlide').attr('id') === 'slide-3';
        });
      });

      it('should follow internal hash links using hashchange (if supported)', function() {
        window.location.hash = "#slide-3";
        // Hashchange event doesn't fire right when the hash changes?
        waitsFor(function() {
          return $.deck('getSlide').attr('id') === 'slide-3';
        }, 'hash to change to slide-3', 2000);
      });
    });
  });

  describe('empty deck', function() {
    beforeEach(function() {
      loadFixtures('empty.html');
      $.deck();
    });

    describe('getSlide()', function() {
      it('should not error on init', $.noop);
    });
  });
});
