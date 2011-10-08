#deck.js

A JavaScript library for building modern HTML presentations. deck.js is flexible enough to let advanced CSS and JavaScript authors craft highly customized decks, but also provides templates and themes for the HTML novice to build a standard slideshow.

## Dependencies (included in this repository)

- [jQuery](http://jquery.com)
- [Modernizr](http://modernizr.com)

## Documentation

Check out the [documentation page](http://imakewebthings.github.com/deck.js/docs) for more information on the methods, events, and options available in core and all the included extensions.  A sample standard slide deck is included in the package under the `introduction` folder.  You can also [view that sample deck](http://imakewebthings.github.com/deck.js/introduction) online to play with the available style and transition themes.

## Extensions, Themes, and Related Projects

Take a look at [the wiki](https://github.com/imakewebthings/deck.js/wiki) for lists of extensions, themes, and other related goodies.  If you have a publicly available project of your own, feel free to add to the list.

## Tests & Support

Unit tests are written with [Jasmine](http://pivotal.github.com/jasmine/) and [jasmine-jquery](https://github.com/velesin/jasmine-jquery). You can [run them here](http://imakewebthings.github.com/deck.js/test).

deck.js has been tested with jQuery 1.6+ and works in IE7+, Chrome, FF, Safari, and Opera. The more capable browsers receive greater enhancements, but a basic cutaway slideshow will work for all browsers listed above. Please don't give your presentations in IE6.

## Known Bug(s)

There is an issue with certain builds of Chrome that result in a solid blue background and generally broken decks.  This is a bug in Chrome ([Issue 91518](http://code.google.com/p/chromium/issues/detail?id=91518)) that stems from hardware acceleration of 3d transforms.  Current workarounds:

- Use a different browser. This problem doesn't exist in Safari, FF, Opera.
- Disable hardware compositing by setting `--disable-accelerated-compositing` in the Chrome loading options
- Replace instances of `translate3d` with `translate` in the CSS of your decks (though this will slow down performance on iOS devices and Safari.)

## Printing

Core includes stripped down black and white print styles for the standard slide template that is suitable for handouts.

## Awesome People

Big thanks to the folks who have contributed code to the project:

- [jbuck](https://github.com/jbuck) - Touch controls.

## License

Copyright (c) 2011 Caleb Troughton

Dual licensed under the [MIT license](https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt) and [GPL license](https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt).
