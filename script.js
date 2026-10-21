const smoothieInputs = document.querySelectorAll('.smoothie-options input[type="radio"], .smoothie-options input[type="checkbox"]')
const fruitCheckboxes = document.querySelectorAll('.fruit-options input[type="checkbox"]')
const totalCaloriesDisplay = document.getElementById('totalCalories')
const ingredientsCupList = document.getElementById('choice-list')
const resetSmoothieBtn = document.getElementById('reset-btn')

const smoothieCalorieTable = {
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
    let totalSmoothieCalories = 0
    let selectedFruitCount = 0
    
    ingredientsCupList.innerHTML = ""
    fruitCheckboxes.forEach(fruitCheckbox => {
        if (fruitCheckbox.checked) {
            selectedFruitCount++
        }
    })

    fruitCheckboxes.forEach(fruitCheckbox => {
        if (!fruitCheckbox.checked) {
            fruitCheckbox.disabled = selectedFruitCount >= 3
        }
    });

    smoothieInputs.forEach(smoothieInput => {
        if (smoothieInput.checked) {
            const ingredientKey = smoothieInput.value;
            totalSmoothieCalories += smoothieCalorieTable[ingredientKey] || 0

            const ingredientLabel = document.querySelector(`label[for="${smoothieInput.id}"]`)
            if (ingredientLabel) {
                const ingredientEntry = document.createElement('li')
                ingredientEntry.textContent = `• ${ingredientLabel.textContent}`
                ingredientsCupList.appendChild(ingredientEntry)
                }
        }
    })

    totalCaloriesDisplay.textContent = totalSmoothieCalories
}

function resetSmoothieCustomizer() {
    smoothieInputs.forEach(smoothieInput => {
        smoothieInput.checked = false;
        
        if (smoothieInput.type === 'checkbox') {
            smoothieInput.disabled = false;
        }
    });
    
    updateSmoothieSummary();
}


smoothieInputs.forEach(smoothieInput => {
    smoothieInput.addEventListener('change', updateSmoothieSummary)
})

resetSmoothieBtn.addEventListener('click', resetSmoothieCustomizer)

updateSmoothieSummary()
