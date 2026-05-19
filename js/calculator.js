let expression = "";

$(".num-btn").click(function () {
    let value = $(this).data("number");

    if (value === "C") {
        expression = "";
        updateDisplay();
        return;
    }

    if (value === "del") {
        expression = expression.slice(0, -1);
        updateDisplay();
        return;
    }

    if (value === "=") {
        calculate();
        return;
    }

    if (value === "+/-") {
        if (expression) {
            expression = expression.startsWith("-")
                ? expression.slice(1)
                : "-" + expression;
        }
        updateDisplay();
        return;
    }

    expression += value;
    updateDisplay();
});

function calculate() {
    try {
        let exp = expression;

        exp = exp.replace(/(\d+(\.\d+)?)%(?!\d)/g, "($1/100)");

        exp = exp.replace(/[\+\-\*\/]$/, "");

        let result = Function('"use strict"; return (' + exp + ')')();

        $("#output").text(result);
        expression = result.toString();

    } catch (e) {
        console.log(e);
        showError();
    }
}

function updateDisplay() {
    $("#output").text(expression || "0");
}

function showError() {
    $("#output").text("Error");
    expression = "";
}