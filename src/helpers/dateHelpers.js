export const getDay = (dayNum) => {
    const weekday = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
    const d = new Date();
    let day = d.getDay();
    return weekday[(day + dayNum + 7) % 7];
}

export const getDayFromTS = (timestamp) => {
    const day = new Date(timestamp * 1000);
    return day.toLocaleDateString('nl-NL', {weekday: 'long'});
}

export const tsToHours = (timestamp) => {
    const day = new Date(timestamp * 1000);

    return day.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}