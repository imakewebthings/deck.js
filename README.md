#deck.js

A JavaScript library for building modern HTML presentations. deck.js is flexible enough to let advanced CSS and JavaScript authors craft highly customized decks, but also provides templates and themes for the HTML novice to build a standard slideshow.

## Dependencies

- [jQuery](http://jquery.com)
- [Modernizr](http://modernizr.com) (included in this repository)

## Documentation

Check out the [documentation page](http://imakewebthings.github.com/deck.js/docs) for more information on the methods, events, and options available in core and all the included extensions.  A sample standard slide deck is included in the package under the `introduction` folder.  You can also [view that sample deck](http://imakewebthings.github.com/deck.js/introduction) online to play with the available style and transition themes.

## More Extensions and Related Projects

If you have an extension, theme, or project related to or using deck.js, please send me a link and I'll add it to this list.

- [deck.js-codemirror](https://github.com/iros/deck.js-codemirror) by [iros](https://github.com/iros): Integrates [codemirror](http://codemirror.net/) into deck.js, giving you editable, executable, syntax highlighted code snippets right inside your slides.
- [deck.remote.js](https://github.com/seppo0010/deck.remote.js) by [seppo0010](https://github.com/seppo0010): Uses node.js to give speakers a remote view to control slides, keep notes, and preview previous+next slides.
- [deckjs-remote](https://github.com/chrisjaure/deckjs-remote) by [chrisjaure](https://github.com/chrisjaure): Control your deck remotely through a node.js service. Presenters can use the service publicly available at http://deckjs-remote.no.de or host it themselves.
- [deckem](https://github.com/DamonOehlman/deckem) by [DamonOehlman](https://github.com/DamonOehlman): [Jade](http://jade-lang.com/) templating for deck.js.

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
