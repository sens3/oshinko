// https://raw.github.com/jonathanpenn/UIQuery/master/uiquery.js

// Copyright (c) 2012 Jonathan Penn (http://cocoamanifest.net)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
var UIQuery = {

  firstWithName: function(name, context) {
    return this.firstWithMatch(function(element) {
      return element.name() === name;
    }, context);
  },

  firstKindWithName: function(kind, name, context) {
    var kindClass = this.kindMap[kind];
    if (!kindClass) throw "Unrecognized element kind " + kind;

    return this.firstWithMatch(function(element) {
      return element instanceof kindClass && element.name() === name;
    }, context);
  },

  firstWithQuery: function(query, context) {
    var matches = query.match(/^(.*?)\[(.*)\]$/);
    if (!matches) throw "Query " + query + " not recognized!";

    var kind = matches[1],
      name = matches[2];
    return this.firstKindWithName(kind, name, context);
  },

  firstWithMatch: function(matches, context) {
    var target = UIATarget.localTarget();

    if (!context) {
      context = target.frontMostApp().mainWindow();
    }

    var element = this.matchIn(context, matches);

    if (!element) {
      target.pushTimeout(0);
      // Can't make one of these UIAElementNils, so let's "find" one
      return target.elements().firstWithName("__NOPE__");
      target.popTimeout();
    } else {
      return element;
    }
  },

  matchIn: function(context, matches) {
    var target = UIATarget.localTarget();

    target.pushTimeout(0);

    var elements = context.elements();
    var matchedElement = null;

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      if (matches(element)) {
        matchedElement = element;
        break;
      }

      var matchedElement = this.matchIn(element, matches);
      if (matchedElement) {
        matchedElement = matchedElement;
        break;
      }
    }

    target.popTimeout();

    return matchedElement;
  },

  kindMap: {
    buttons: UIAButton,
    cells: UIATableCell,
    tableViews: UIATableView,
    staticTexts: UIAStaticText,
    sliders: UIASlider,
<<<<<<< HEAD
    switches: UIASwitch,
=======
>>>>>>> bbf1e78... Integrating UIQuery. Using it for global element lookup, instead of our previous experiment
    segmentedControls: UIASegmentedControl,
    textFields: UIATextField
  }

};