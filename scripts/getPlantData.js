async function getGroups() {
	const response = await fetch("data.json");
	const data = await response.json();
	console.log(data);

	// Remove radio buttons
	const plantGroup = document.getElementById("plantGroup");
	plantGroup.innerHTML = "";

	// Create radio button for each group
	data.forEach((group, index) => {
		const div = document.createElement("div");

		const input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("name", "group");
		input.setAttribute("id", group.id);
		input.setAttribute("value", group.group);

		// Only the first should be checked by default
		if (index === 0) {
			input.setAttribute("checked", "checked");
		}

		const label = document.createElement("label");
		label.setAttribute("for", group.id);
		label.innerText = group.group;

		div.appendChild(input);
		div.appendChild(label);
		plantGroup.appendChild(div);
	});

	// Call updatePlantTypes function to update plant types
	updatePlantTypes(data);

	// Call updateMaterial function to update plant materials
	updateMaterial(data);

	// Call updatePeriods function to update plant periods
	updatePeriods(data);

	// When selection changes update plant types and materials
	const groupRadios = document.querySelectorAll('input[name="group"]');
	groupRadios.forEach((radio) => {
		radio.addEventListener("change", () => {
			updatePlantTypes(data);
			updateMaterial(data);
			updatePeriods(data);
		});
	});
}

function updatePlantTypes(data) {
	// Get the selected group
	const selectedGroup = document.querySelector(
		'input[name="group"]:checked'
	).value;
	console.log("Selected group:", selectedGroup);

	// Remove radio buttons
	const plantType = document.getElementById("plantType");
	plantType.innerHTML = "";

	// Find the selected group
	let plantGroup = data.find((g) => g.group == selectedGroup);

	// If the group is found, find the types
	if (plantGroup && plantGroup.type) {
		console.log("Plant types for", selectedGroup, ":", plantGroup.type);

		// Create radio buttons for each type in the selected group
		plantGroup.type.forEach((type, index) => {
			const div = document.createElement("div");

			const input = document.createElement("input");
			input.setAttribute("type", "radio");
			input.setAttribute("name", "type");
			input.setAttribute("id", type.id);
			input.setAttribute("value", type.name);

			// Only set the first one checked by default
			if (index === 0) {
				input.setAttribute("checked", "checked");
			}

			const label = document.createElement("label");
			label.setAttribute("for", type.id);
			label.innerText = type.name;

			div.appendChild(input);
			div.appendChild(label);
			plantType.appendChild(div);
		});
	} else {
		console.error(
			"Could not find plant group or types for:",
			selectedGroup
		);
	}
}

function updateMaterial(data) {
	// Get the selected group
	const selectedGroup = document.querySelector(
		'input[name="group"]:checked'
	).value;
	console.log("Selected group:", selectedGroup);

	// Remove radio buttons
	const plantMaterial = document.getElementById("plantMaterial");
	plantMaterial.innerHTML = "";

	// Find the selected group
	let plantGroup = data.find((g) => g.group == selectedGroup);

	// If the group is found, find the types
	if (plantGroup && plantGroup.material) {
		console.log(
			"Plant materials for",
			selectedGroup,
			":",
			plantGroup.material
		);

		// Create radio buttons for each material in the selected group
		plantGroup.material.forEach((material, index) => {
			const div = document.createElement("div");

			const input = document.createElement("input");
			input.setAttribute("type", "radio");
			input.setAttribute("name", "size");
			input.setAttribute("id", material.size);
			input.setAttribute("value", material.size);

			// Only set the first one checked by default
			if (index === 1) {
				input.setAttribute("checked", "checked");
			}

			const label = document.createElement("label");
			label.setAttribute("for", material.size);
			label.innerText = material.size;

			div.appendChild(input);
			div.appendChild(label);
			plantMaterial.appendChild(div);
		});
	} else {
		console.error(
			"Could not find plant group or types for:",
			selectedGroup
		);
	}

	//check which material is selected and put in css variable
	function getSelectedMaterial() {
		const selectedMaterial = document.querySelector(
			'input[name="size"]:checked'
		).value;
		console.log("Selected material:", selectedMaterial);

		// Set the CSS variable for the selected material
		document.documentElement.style.setProperty(
			"--material-size",
			`"` + selectedMaterial + `"`
		);

		//product is material size * 0.1 (from liters to ml)
		const productAmount = parseFloat(selectedMaterial) * 10;

		//set css variable for product amount
		document.documentElement.style.setProperty(
			"--product-size",
			`"` + productAmount + `ml"`
		);
	}

	getSelectedMaterial();

	console.log("Capacity checkbox is unchecked");
	// When selection changes update plant material sizes
	const materialRadios = document.querySelectorAll('input[name="size"]');
	materialRadios.forEach((radio) => {
		radio.addEventListener("change", () => {
			getSelectedMaterial();
		});
	});

	const capacityCheckbox = document.querySelector("#capacity");

	capacityCheckbox.addEventListener("change", () => {
		if (capacityCheckbox.checked) {
			console.log("Capacity checkbox is checked");
			//get amount that is put in the input field
			const capacityInput = document.querySelector("#ownCapacity");

			capacityInput.addEventListener("input", () => {
				const capacityValue = capacityInput.value;
				console.log("Capacity value:", capacityValue);

				//if value is empty set it to 1
				if (capacityValue === "") {
					capacityValue = 1;
				} else {
					// Set the CSS variable for the selected material
					document.documentElement.style.setProperty(
						"--material-size",
						`"` + capacityValue + `L"`
					);

					//product is material size * 0.1 (from liters to ml)
					const productAmount = parseFloat(capacityValue) * 10;

					//set css variable for product amount
					document.documentElement.style.setProperty(
						"--product-size",
						`"` + productAmount + `ml"`
					);
				}
			});
		} else {
			getSelectedMaterial();
		}
	});
}

function updatePeriods(data) {
	// Get the selected group
	const selectedGroup = document.querySelector(
		'input[name="group"]:checked'
	).value;
	console.log("Selected group:", selectedGroup);

	const fullYear = document.getElementById("fullYear");
	// Find the selected group
	let plantGroup = data.find((g) => g.group == selectedGroup);
	console.log("plant group:", plantGroup);

	// If the group is found, find the types
	if (plantGroup && plantGroup.periods) {
		console.log("Plant periods", selectedGroup, ":", plantGroup.periods);

		// Remove periods
		fullYear.innerHTML = "";

		// Create div for each period with class
		plantGroup.periods.forEach((period) => {
			const div = document.createElement("div");
			div.classList.add("period");

			// create amount of spans based on the ratio
			for (let i = 0; i < period.ratio; i++) {
				const span = document.createElement("span");
				span.innerHTML = i + 1;
				div.appendChild(span);

				//get current month
				const d = new Date();
				let month = d.getMonth();
				const currentMonth = month + 1;
				console.log("MAAND" + currentMonth);

				// if currentmont is in a period make the period green otherwise red
				if (currentMonth > period.endMonth){
					span.style.setProperty(`background-color`, "red");
				} else if (currentMonth => startMonth && currentMonth <= endMonth){
					span.style.setProperty(`background-color`, "#5b954b");
					span.style.setProperty(`color`, "#fff");
				}
			}

			fullYear.appendChild(div);

			console.log("period:", period.startMonth);

			// Set the CSS variable for startMonth
			div.style.setProperty(`--startMonth`, period.startMonth);

			// Set the CSS variable for the endMonth
			div.style.setProperty(`--endMonth`, period.endMonth);

			// Set the CSS variable for amount
			div.style.setProperty(`--ratio`, period.ratio);
		});
	} else {
		console.error("Could not find periods for:", selectedGroup);
	}
}

getGroups();
