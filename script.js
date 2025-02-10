const unitOptions = {
    length: ["Meters", "Kilometers", "Inches", "Centimeters"],
    weight: ["Kilograms", "Pounds"],
    temperature: ["Celsius", "Fahrenheit"]
};

const conversionRates = {
    "Meters-Kilometers": 0.001,
    "Kilometers-Meters": 1000,
    "Inches-Centimeters": 2.54,
    "Centimeters-Inches": 0.3937,
    "Kilograms-Pounds": 2.20462,
    "Pounds-Kilograms": 0.453592
};

document.getElementById("conversionType").addEventListener("change", updateUnits);
updateUnits();

function updateUnits() {
    let type = document.getElementById("conversionType").value;
    let unitFrom = document.getElementById("unitFrom");
    let unitTo = document.getElementById("unitTo");

    unitFrom.innerHTML = "";
    unitTo.innerHTML = "";

    unitOptions[type].forEach(unit => {
        let option1 = new Option(unit, unit);
        let option2 = new Option(unit, unit);
        unitFrom.add(option1);
        unitTo.add(option2);
    });
}

function convert() {
    let value = parseFloat(document.getElementById("inputValue").value);
    let fromUnit = document.getElementById("unitFrom").value;
    let toUnit = document.getElementById("unitTo").value;

    if (isNaN(value)) {
        document.getElementById("result").innerText = "Enter a valid number!";
        return;
    }

    if (fromUnit === toUnit) {
        document.getElementById("result").innerText = value;
        return;
    }

    let key = `${fromUnit}-${toUnit}`;

    if (conversionRates[key]) {
        document.getElementById("result").innerText = (value * conversionRates[key]).toFixed(2);
    } else if (fromUnit === "Celsius" && toUnit === "Fahrenheit") {
        document.getElementById("result").innerText = ((value * 9/5) + 32).toFixed(2);
    } else if (fromUnit === "Fahrenheit" && toUnit === "Celsius") {
        document.getElementById("result").innerText = ((value - 32) * 5/9).toFixed(2);
    } else {
        document.getElementById("result").innerText = "Conversion not available";
    }
}
