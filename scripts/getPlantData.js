// async function getGroups() {
//     const response = await fetch("data.json");
//     const data = await response.json();
//     console.log(data);

//     // Remove radio buttons
//     const plantGroupSection = document.getElementById("plantGroup");
//     plantGroupSection.innerHTML = "";
    
//     // Create radio button for each group
//     data.forEach((group, index) => {
//         const div = document.createElement("div");

//         const input = document.createElement("input");
//         input.setAttribute("type", "radio");
//         input.setAttribute("name", "group");
//         input.setAttribute("id", group.id);
//         input.setAttribute("value", group.group);
        
//         // Only the first should be checked by default
//         if (index === 0) {
//             input.setAttribute("checked", "checked");
//         }
        
//         const label = document.createElement("label");
//         label.setAttribute("for", group.id);
//         label.innerText = group.group;
        
//         div.appendChild(input);
//         div.appendChild(label);
//         plantGroupSection.appendChild(div);
//     });
    
//     // Call updatePlantTypes function to update plant types
//     updatePlantTypes(data);

//     // Call updateMaterial function to update plant materials
//     updateMaterial(data);
    
//     // When selection changes update plant types and materials
//     const groupRadios = document.querySelectorAll('input[name="group"]');
//     groupRadios.forEach(radio => {
//         radio.addEventListener('change', () => {
//             updatePlantTypes(data);
//             updateMaterial(data);
//         });
//     });
// }

// function updatePlantTypes(data) {
//     // Get selected group
//     const selectedGroup = document.querySelector('input[name="group"]:checked').value;
//     console.log("Selected group:", selectedGroup);
    
//     // Remove radio buttons
//     const plantTypeSection = document.getElementById("plantType");
//     plantTypeSection.innerHTML = "";
    
//     // Find the selected group
//     let plantGroup = data.find((g) => g.group == selectedGroup);
    
//     // If the group is found, find the types
//     if (plantGroup && plantGroup.type) {
//         console.log("Plant types for", selectedGroup, ":", plantGroup.type);
        
//         // Create radio buttons for each type in the selected group
//         plantGroup.type.forEach((type, index) => {
//             const div = document.createElement("div");
            
//             const input = document.createElement("input");
//             input.setAttribute("type", "radio");
//             input.setAttribute("name", "type");
//             input.setAttribute("id", type.id);
//             input.setAttribute("value", type.name);
            
//             // Only set the first one checked by default
//             if (index === 0) {
//                 input.setAttribute("checked", "checked");
//             }
            
//             const label = document.createElement("label");
//             label.setAttribute("for", type.id);
//             label.innerText = type.name;
            
//             div.appendChild(input);
//             div.appendChild(label);
//             plantTypeSection.appendChild(div);
//         });
//     } else {
//         console.error("Could not find plant group or types for:", selectedGroup);
//     }
// }

// function updateMaterial(data){
//       // Get selected group
//       const selectedGroup = document.querySelector('input[name="group"]:checked').value;
//       console.log("Selected group:", selectedGroup);

//     // Remove radio buttons
//     const plantMaterialSection = document.getElementById("plantMaterial");
//     plantMaterialSection.innerHTML = "";
    
//     // Find the selected group
//     let plantGroup = data.find((g) => g.group == selectedGroup);
    
//     // If the group is found, find the types
//     if (plantGroup && plantGroup.material) {
//         console.log("Plant materials for", selectedGroup, ":", plantGroup.material);

        
//         // Create radio buttons for each material in the selected group
//         plantGroup.material.forEach((material, index) => {
//             const div = document.createElement("div");
            
//             const input = document.createElement("input");
//             input.setAttribute("type", "radio");
//             input.setAttribute("name", "size");
//             input.setAttribute("id", material.size);
//             input.setAttribute("value", material.size);
            
//             // Only set the first one checked by default
//             if (index === 0) {
//                 input.setAttribute("checked", "checked");
//             }
            
//             const label = document.createElement("label");
//             label.setAttribute("for", material.size);
//             label.innerText = material.size;
            
//             div.appendChild(input);
//             div.appendChild(label);
//             plantMaterialSection.appendChild(div);
//         });
//     } else {
//         console.error("Could not find plant group or types for:", selectedGroup);
//     }

// }

// getGroups();