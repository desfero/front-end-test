// (c) BaseCase 2016


/**
 * The global `startTest` function is a testing harness for simple UI testing. The harness
 * is based on jQuery and Promises, and offers an API similar to that of other testing
 * libraries like CasperJS, Jasmine, or Mocha.
 */
window.startTest = function(description, context, callback) {
  console.log(description);

  var promise = Promise.resolve();
  var test = {};

  test.describe = function(description, tester) {
    promise = promise.then(function() {
      try {
        tester();
        console.log('%c✓ ' + description, 'color:green');
      } catch (err) {
        console.log('%c× ' + description, 'color:red');
        console.log('%c  ' + err.message, 'color:red');
        throw new Error('Test Failed: ' + description);
      }
    });
    return test;
  }

  test.wait = function(ms) {
    promise = promise.then(function() {
      return new Promise(function(resolve, reject) {
        setTimeout(resolve, ms);
      });
    });
    return test;
  }

  test.assertHasText = function(selector, expectedText) {
    var actualText = context.find(selector).text();
    if (actualText !== expectedText) {
      throw new Error('$("' + selector + '").text() is "' + actualText + '" but expected "' + expectedText + '"');
    }
    return test;
  }

  test.assertHasValue = function(selector, expectedValue) {
    var actualValue = context.find(selector).val();
    if (actualValue !== expectedValue) {
      throw new Error('$("' + selector + '").val() is "' + actualValue + '" but expected "' + expectedValue + '"');
    }
    return test;
  }

  test.assertCount = function(selector, expectedCount) {
    var actualCount = context.find(selector).length;
    if (actualCount !== expectedCount) {
      throw new Error('$("' + selector + '").length is ' + actualCount + ' but expected ' + expectedCount);
    }
    return test;
  }

  test.setElementValue = function(selector, value) {
    var element = context.find(selector);
    if (element.length === 0) {
      throw new Error('Element not found: ' + selector);
    }
    if (element.length > 1) {
      throw new Error('Multiple elements found: ' + selector);
    }
    element.val(value);
    return test;
  }

  test.clickElement = function(selector) {
    var element = context.find(selector);
    if (element.length === 0) {
      throw new Error('Element not found: ' + selector);
    }
    if (element.length > 1) {
      throw new Error('Multiple elements found: ' + selector);
    }
    element.click();
    return test;
  }

  callback(test);
  return promise;
}
