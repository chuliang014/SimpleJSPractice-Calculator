//

var mainElem = document.querySelector('#calculator');
var calElem = {
    formerInput: mainElem.querySelector('.formerInput'),
    operator: mainElem.querySelector('.operator'),
    laterInput: mainElem.querySelector('.laterInput'),
    result: mainElem.querySelector('.result'),
    buttons: mainElem.querySelectorAll('.btn')
};

// console.log(calElem);

//binding event for button
function each(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(i, array[i]);
    }
}

each(calElem.buttons, function (index, elem) {
    elem.onclick = function () {
        updateSign(this.value);
        outputResult(operate(this.title, calElem.formerInput.value, calElem.laterInput.value));
    }
});


function updateSign(symbol) {
    calElem.operator.innerHTML = symbol;
}

//calculate

function operate(name) {
    if (!operation[name]) throw new Error('The method ' + name + 'doesn\'t exist');
    return operation[name].apply(operation, [].slice.call(arguments, 1, arguments.length));
}



var operation = {
    add: function (num1, num2) {
        return +num1 + +num2;
    },
    subtract: function (num1, num2) {
        return +num1 - +num2;
    },
    multiply: function (num1, num2) {
        return +num1 * +num2;
    },
    divide: function (num1, num2) {
        return +num1 / +num2;
    },
    addOperation: function (name, fn) {
        if (!operation[name]) {
            operation[name] = fn;
        }
        return operation;
    }
};

//display result
function outputResult(result) {
    calElem.result.innerHTML = result;
}

operation.addOperation('mode', function (num1, num2) {
    return +num1 % +num2;
});

operation.addOperation('invert', function (num) {
    return 1 / +num;
});