(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.DataBind = factory();
    }
}(typeof this === 'undefined' ? window : this, function () {
    var DataBind = function(model) {

      function findValueInModel(key) {
        var splittedKey = key.split("."),
            value = model,
            i = 0;

        while(typeof value === "object" && typeof value !== undefined && i < splittedKey.length) {
          value = value[splittedKey[i]];
          i++;
        }

        return value;
      }

      var attributes = ['href', 'src', 'alt', 'title'],
          allElements = document.body.getElementsByTagName("*");

      for (var i = 0; i < allElements.length; i++) {
        for (var j = 0; j < attributes.length; j++) {
          if (allElements[i].hasAttribute('data-bind-' + attributes[j])) {
            var attributeValue = allElements[i].getAttribute('data-bind-' + attributes[j]),
                modelValue = findValueInModel(attributeValue);

            if(modelValue !== undefined) {
              allElements[i].setAttribute(attributes[j], modelValue);
            }
          }
        }
        if(allElements[i].hasAttribute('data-bind')) {
          var attributeValue = allElements[i].getAttribute('data-bind'),
              modelValue = findValueInModel(attributeValue);

          if(modelValue !== undefined) {
            allElements[i].innerHTML = modelValue;
          }
        }
      }

    };

    return DataBind;
}));

var model = {
  label: "Schibsted",
  x: {
    y: {
      z: "some nested property to bind"
    }
  },
}
