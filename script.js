const cities = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Paris', timezone: 'Europe/Paris' }
];

function formatTime(date, timezone = undefined) {
    const options = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: timezone
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatDate(date, timezone = undefined) {
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: timezone
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function parseTimeParts(timeString) {
    // Example: "10:15:30 AM" or "10:15:30" (if no ampm)
    const [time, ampm] = timeString.split(' ');
    const [hours, minutes, seconds] = time.split(':');
    return { hours, minutes, seconds, ampm: ampm || '' };
}

function updateClocks() {
    const now = new Date();

    // Local Time
    const localTimeStr = formatTime(now);
    const localParts = parseTimeParts(localTimeStr);

    document.getElementById('local-time').innerHTML = `
        ${localParts.hours}<span class="separator">:</span>${localParts.minutes}<span class="separator">:</span><span class="seconds">${localParts.seconds}</span><span class="ampm">${localParts.ampm}</span>
    `;
    document.getElementById('local-date').textContent = formatDate(now);

    // World Clocks
    const grid = document.getElementById('world-grid');

    if (grid.children.length === 0) {
        // Initialize grid items
        cities.forEach((city, index) => {
            const el = document.createElement('div');
            el.className = 'world-clock glass-panel';
            el.id = `city-${index}`;
            grid.appendChild(el);
        });
    }

    cities.forEach((city, index) => {
        const cityTimeStr = formatTime(now, city.timezone);
        const cityParts = parseTimeParts(cityTimeStr);
        const cityDateStr = formatDate(now, city.timezone);

        const el = document.getElementById(`city-${index}`);
        el.innerHTML = `
            <div class="city-name">${city.name}</div>
            <div class="city-time">
                ${cityParts.hours}<span class="separator">:</span>${cityParts.minutes}<span class="separator">:</span><span class="seconds">${cityParts.seconds}</span><span class="ampm">${cityParts.ampm}</span>
            </div>
            <div class="city-date">${cityDateStr}</div>
        `;
    });
}

// Initial update and set interval
updateClocks();
setInterval(updateClocks, 1000);
