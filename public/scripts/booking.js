document.addEventListener("DOMContentLoaded", () => {
    renderBookingContent();
});

const urlParams = new URLSearchParams(window.location.search);
const bookingServiceName = urlParams.get('service') === 'photography' ? 'Photography' : 'Videography';

/**
 * Renders the booking content
 */
function renderBookingContent() {
    // Sets the service name in the page header
    const $bookingServiceName = $('#bookingServiceName');
    $bookingServiceName.html(bookingServiceName);

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    $('#prevMonth').on('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar(currentMonth, currentYear);
    });

    $('#nextMonth').on('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar(currentMonth, currentYear);
    });

    updateCalendar(currentMonth, currentYear);
}

/**
 * Updates the calendar with specified month and year
 * @param {number} currentMonth Current month number (0-11)
 * @param {number} currentYear Current year
 */
function updateCalendar(currentMonth, currentYear) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    const $calendarBody = $('#calendarBody').empty();;
    const $monthYear = $('#monthYear');

    // Update the month and year of the calendar
    $monthYear.html(`${months[currentMonth]} ${currentYear}`);

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let day = 1;
    for (let week = 0; week < 6; week++) {
        const $week = $('<tr>');

        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            // Add empty cells before the first day of month
            if (dayOfWeek === 0 && day < firstDayOfMonth) {
                const $dayOfWeek = $('<td>').text('');
                $week.append($dayOfWeek);
                // Break out of the loop if all days in month have been added
            } else if (day > daysInMonth) {
                break;
            } else {
                const $dayOfWeek = $("<td>", {
                    text: day,
                    click: function () {
                        // Remove the selected class from all cells and add it to the current one
                        $calendarBody.find(".selected").removeClass("selected");
                        $(this).addClass("selected");
                        // Get the available times for the selected day
                        displayAvailableTimes($(this).text(), months[currentMonth], currentYear.toString());
                    }
                });
                // Set the selected class and get the available times for today's date by default
                if (day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
                    $dayOfWeek.addClass("selected");
                    // Get the available times for the selected day
                    // displayAvailableTimes(day, currentMonth, currentYear);
                    displayAvailableTimes($dayOfWeek.text(), months[currentMonth], currentYear.toString());
                }
                $week.append($dayOfWeek);
                day++;
            }
        }
        $calendarBody.append($week);
    }
}

/**
 * Displays the available appointment times for a given day of the week, month, and year
 * @param {string} day Day of the month
 * @param {string} month Month Name
 * @param {string} year Year
 */
function displayAvailableTimes(day, month, year) {
    // Make a AJAX request
    let xhr = new XMLHttpRequest();

    xhr.onload = () => {
        // Check if the request was successful
        if (xhr.status === 200) {
            // Get available times at year, month day
            const availableTimes = JSON.parse(xhr.responseText)[year][month][day];

            const $apptTime = $("#apptTime").empty();

            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const weekday = weekdays[new Date(`${month} ${day}, ${year}`).getDay()];

            $apptTime.append(`${weekday}, ${month} ${day}, ${year}`);

            // No times available
            if (!availableTimes || !availableTimes.length) {
                const $availableTime = $("<div>", {
                    text: "No availability",
                    css: {
                        "margin-top": "50px",
                        "font-size": "18px"
                    }
                });
                $apptTime.append($availableTime);
                $(".appt-summary-container").empty();
                $(".continue-button").attr("disabled", true);
            } else {
                $.each(availableTimes, (i, time) => {
                    const $availableTime = $("<div>", {
                        // first available time is selected by default
                        class: i === 0 ? "available-time selected" : "available-time",
                        text: time,
                        click: () => {
                            $apptTime.find(".selected").removeClass("selected");
                            $availableTime.addClass("selected");
                            displayApptSummary(weekday, day, month, year, time);
                        }
                    });
                    // Display summary of first available time by default
                    if (i === 0) {
                        displayApptSummary(weekday, day, month, year, time);
                    }
                    $apptTime.append($availableTime);
                });
            }
        }
    };
    // Open a GET request
    xhr.open("GET", "data/available-times.json", true);
    xhr.send(null);
}

/**
 * Display booking summary for selected date
 *  @param {string} weekday Selected weekday
 * @param {string} day Selected day of the month
 * @param {string} month Selected month name
 * @param {string} year Selected year
 * @param {string} time Selected time 
 */
function displayApptSummary(weekday, day, month, year, time) {
    // Create booking summary
    const $apptSummaryHeader = $("<p>", {
        text: bookingServiceName,
    });
    const $apptDateAndTime = $("<p>", {
        text: `${weekday}, ${month} ${day}, ${year} at ${time}.`,
    });
    const $apptDuration = $("<p>", {
        text: bookingServiceName === "Photography" ? "3 hr" : "4 hr",
    });
    const $apptCost = $("<p>", {
        text: bookingServiceName === "Photography" ? "$120" : "$160",
    });

    $(".appt-summary-container").empty().append([$apptSummaryHeader, $apptDateAndTime, $apptDuration, $apptCost]);

    // Enable continue button if date and time is selected
    if ($(".available-time").find("selected") && $("td").find("selected")) {
        $(".continue-button").attr("disabled", false);
    }
}
