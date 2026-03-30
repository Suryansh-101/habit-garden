let habits = JSON.parse(localStorage.getItem("habits")) || [];
let streak = localStorage.getItem("streak") || 0;

function addHabit() {
    const input = document.getElementById("habitInput");
    habits.push({ name: input.value, done: false });
    input.value = "";
    saveData();
    render();
}

function toggleHabit(index) {
    habits[index].done = !habits[index].done;
    updateStreak();
    saveData();
    render();
}

function updateStreak() {
    if (habits.every(h => h.done)) {
        streak++;
        habits.forEach(h => h.done = false);
    }
}

function getPlantStage() {
    if (streak < 3) return "🌱";
    if (streak < 6) return "🌿";
    return "🌳";
}

function render() {
    const list = document.getElementById("habitList");
    list.innerHTML = "";

    habits.forEach((h, i) => {
        list.innerHTML += `
            <li onclick="toggleHabit(${i})">
                ${h.done ? "✅" : "⬜"} ${h.name}
            </li>
        `;
    });

    document.getElementById("plant").innerText = getPlantStage();
    document.getElementById("streak").innerText = `Streak: ${streak} days`;
}

function saveData() {
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("streak", streak);
}

render();