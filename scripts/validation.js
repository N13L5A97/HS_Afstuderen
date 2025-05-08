console.log("Validation script loaded!");

function validateDecimals(input) {
	if (input.value === "" || input.value === "-") return;

	const regex = /^-?\d+(\.\d{0,2})?$/;

	if (!regex.test(input.value)) {
		input.value = input.dataset.lastValid || "";
	} else {
		input.dataset.lastValid = input.value;
	}
}
