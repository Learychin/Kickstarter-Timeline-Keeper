function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().slice(0, 10);
}

function generateChart() {
    const startDate = document.getElementById('start-date').value;
    if (!startDate) {
        alert('Please enter a start date.');
        return;
    }

    const maxDuration = 104; // Total duration in days (approx. 3 months)

    const tasks = [
        { name: "Project Management", duration: 14, start: 0, category: 'project-management' },
        { name: "Collect Product Info", duration: 7, start: 0, category: 'project-management', subtask: true },
        { name: "Account Set-up", duration: 7, start: 0, category: 'project-management', subtask: true },
        { name: "Kickoff Meeting", duration: 7, start: 7, category: 'project-management', subtask: true },
        { name: "Message & Direction Summary", duration: 7, start: 14, category: 'project-management', subtask: true },

        { name: "Landing Page", duration: 28, start: 14, category: 'landing-page' },
        { name: "Landing Page Copy", duration: 14, start: 14, category: 'landing-page', subtask: true },
        { name: "Landing Page Design", duration: 14, start: 28, category: 'landing-page', subtask: true },

        { name: "Visual Assets Production", duration: 21, start: 28, category: 'visual-assets' },
        { name: "Video Production", duration: 21, start: 28, category: 'visual-assets', subtask: true },
        { name: "Studio", duration: 5, start: 28, category: 'visual-assets', subtask: true },
        { name: "Shotlist", duration: 7, start: 33, category: 'visual-assets', subtask: true },
        { name: "Video (1st & Final Cut)", duration: 9, start: 40, category: 'visual-assets', subtask: true },

        { name: "Email Marketing", duration: 35, start: 49, category: 'email-marketing' },
        { name: "Prepare", duration: 7, start: 49, category: 'email-marketing', subtask: true },
        { name: "Welcome", duration: 7, start: 56, category: 'email-marketing', subtask: true },
        { name: "Countdown", duration: 7, start: 63, category: 'email-marketing', subtask: true },
        { name: "In-flight Email", duration: 14, start: 70, category: 'email-marketing', subtask: true },

        { name: "Media Buy", duration: 42, start: 63, category: 'media-buy' },
        { name: "Facebook Ads", duration: 21, start: 63, category: 'media-buy', subtask: true },
        { name: "Google Ads", duration: 21, start: 63, category: 'media-buy', subtask: true },
        { name: "Lead Gen Ads", duration: 14, start: 70, category: 'media-buy', subtask: true },
        { name: "In-flight Ads", duration: 14, start: 84, category: 'media-buy', subtask: true },

        { name: "Campaign Page", duration: 35, start: 49, category: 'campaign-page' },
        { name: "Price Strategy", duration: 7, start: 49, category: 'campaign-page', subtask: true },
        { name: "Campaign Page Design", duration: 14, start: 56, category: 'campaign-page', subtask: true },
        { name: "Campaign Page Review", duration: 14, start: 70, category: 'campaign-page', subtask: true },

        { name: "PR", duration: 42, start: 63, category: 'pr' },
        { name: "Press Kit & Release", duration: 14, start: 63, category: 'pr', subtask: true },
        { name: "Pitch Email & Stories/Reviews", duration: 28, start: 70, category: 'pr', subtask: true },

        { name: "Social/Community Management", duration: 90, start: 63, category: 'social-community' },
        { name: "Social Media Management", duration: 90, start: 63, category: 'social-community', subtask: true },
        { name: "Facebook Group", duration: 90, start: 63, category: 'social-community', subtask: true },
        { name: "Social Competitions - Lucky Draw", duration: 90, start: 63, category: 'social-community', subtask: true },

        { name: "Campaign Management", duration: 90, start: 63, category: 'campaign-management' },
        { name: "Update", duration: 90, start: 63, category: 'campaign-management', subtask: true },
        { name: "Backerclub", duration: 90, start: 63, category: 'campaign-management', subtask: true },
        { name: "Cross Promotion", duration: 90, start: 63, category: 'campaign-management', subtask: true },
        { name: "Kickbooster", duration: 90, start: 63, category: 'campaign-management', subtask: true }
    ];

    // Generate timeline header (dates) dynamically
    let dateHeaderHTML = `<tr class="date-row"><th>Task</th><th>Start Date</th><th>End Date</th><th>Duration</th>`;
    for (let i = 0; i <= maxDuration; i += 7) {
        const date = addDays(startDate, i);
        dateHeaderHTML += `<th class="date-column">${date}</th>`;
    }
    dateHeaderHTML += `</tr>`;

    let chartHTML = dateHeaderHTML;

    tasks.forEach(task => {
        const start = addDays(startDate, task.start);
        const end = addDays(startDate, task.start + task.duration);
        const barWidth = task.duration;
        const offset = task.start;

        // Generate task row
        chartHTML += `
            <tr>
                <td class="${task.subtask ? 'subtask' : ''} ${task.category}">${task.name}</td>
                <td>${start}</td>
                <td>${end}</td>
                <td>${task.duration} days</td>
        `;

        // Add empty cells for timeline offset
        for (let i = 0; i < offset; i += 7) {
            chartHTML += `<td></td>`;
        }

        // Add the task bar
        chartHTML += `
                <td colspan="${Math.ceil(barWidth / 7)}">
                    <div class="bar-container">
                        <div class="bar ${task.category}" style="width: 100%;">${task.duration} days</div>
                    </div>
                </td>
        `;

        // Add empty cells for remaining duration
        for (let i = offset + barWidth; i < maxDuration; i += 7) {
            chartHTML += `<td></td>`;
        }

        chartHTML += `</tr>`;
    });

    document.getElementById('gantt-chart').innerHTML = chartHTML;
}
