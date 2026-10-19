const smoothieInputs = document.querySelectorAll('.smoothie-options input[type="radio"], .smoothie-options input[type="checkbox"]')
const fruitCheckboxes = document.querySelectorAll('.fruit-options input[type="checkbox"]')
const calorieDisplay = document.getElementById('totalCalories')
const ingredientList = document.getElementById('choice-list')
const resetSmoothieBtn = document.getElementById('reset-btn')

const calorieTable = {
    'milk': 120,
    'water': 0,
    'banana': 105,
    'strawberry': 50,
    'mango': 90,
    'pineapple': 80,
    'blueberry': 85,
    'yes': 100,
    'no': 0
}

function updateSmoothieSummary() {
    let combinedCalories = 0
    let selectedFruitsCount = 0
    
    ingredientList.innerHTML = ""
    fruitCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedFruitsCount++
        }
    })

    fruitCheckboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            checkbox.disabled = selectedFruitsCount >= 3
        }
    });

    smoothieInputs.forEach(input => {
        if (input.checked) {
            const itemValue = input.value;
            combinedCalories += calorieTable[itemValue] || 0

            const labelElement = document.querySelector(`label[for="${input.id}"]`)
            if (labelElement) {
                const listItem = document.createElement('li')
                listItem.textContent = `• ${labelElement.textContent}`
                ingredientList.appendChild(listItem)
                }
        }
    })

    calorieDisplay.textContent = combinedCalories
}

function resetSmoothieCustomizer() {
    smoothieInputs.forEach(input => {
        input.checked = false;
        
        if (input.type === 'checkbox') {
            input.disabled = false;
        }
    });
    
    updateSmoothieSummary();
}


smoothieInputs.forEach(input => {
    input.addEventListener('change', updateSmoothieSummary)
})

resetSmoothieBtn.addEventListener('click', resetSmoothieCustomizer)

updateSmoothieSummary()