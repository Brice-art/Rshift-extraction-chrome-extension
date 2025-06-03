// Extract shifts from page and send them to Google Calendar
function extractShiftsFromDOM() {
  const shiftElements = Array.from(document.querySelectorAll('input[name^="select_date"]'));

  const shifts = shiftElements.map((el, index) => {
    const date = el.value;
    const shiftType = document.querySelector(`input[name="shift_type${index}"]`)?.value || '';
    const fromHour = document.querySelector(`input[name="from_hour${index}"]`)?.value || '00';
    const fromMinutes = document.querySelector(`input[name="from_minutes${index}"]`)?.value || '00';
    const toHour = document.querySelector(`input[name="to_hour${index}"]`)?.value || '00';
    const toMinutes = document.querySelector(`input[name="to_minutes${index}"]`)?.value || '00';
    const holidayType = document.querySelector(`input[name="holiday_type${index}"]`)?.value || '';

    return {
      date,
      shiftType,
      startTime: `${fromHour.padStart(2, '0')}:${fromMinutes.padStart(2, '0')}`,
      endTime: `${toHour.padStart(2, '0')}:${toMinutes.padStart(2, '0')}`,
      holidayType,
      isWorking: shiftType === '1'
    };
  }).filter(shift => shift.isWorking);

  console.log("Extracted Shifts:", shifts);
  return shifts;
}

// Format date from YYYYMMDD to YYYY-MM-DD
function formatDate(yyyymmdd) {
  return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6)}`;
}

// Get Google Auth token
function getAuthToken(callback) {
  chrome.runtime.sendMessage({ action: "getToken" }, (response) => {
    if (response && response.token) {
      callback(response.token);
    } else {
      console.error("Auth token error", response);
    }
  });
}

// Create a single Google Calendar event
function createCalendarEvent(token, shift) {
  const event = {
    summary: 'Work Shift',
    description: shift.holidayType || '',
    start: {
      dateTime: new Date(`${formatDate(shift.date)}T${shift.startTime}:00`).toISOString(),
      timeZone: 'Asia/Tokyo'
    },
    end: {
      dateTime: new Date(`${formatDate(shift.date)}T${shift.endTime}:00`).toISOString(),
      timeZone: 'Asia/Tokyo'
    }
  };

  fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })
    .then(res => res.json())
    .then(data => console.log("Event created:", data))
    .catch(err => console.error("Failed to create event:", err));
}

// MAIN FUNCTION
function exportShiftsToGoogleCalendar() {
  const shifts = extractShiftsFromDOM();

  if (shifts.length === 0) {
    alert("No working shifts found.");
    return;
  }

  getAuthToken(token => {
    shifts.forEach(shift => {
      createCalendarEvent(token, shift);
    });
    alert("Shifts are being exported to Google Calendar.");
  });
}

// Trigger the export when user clicks the extension icon or you can use a button
exportShiftsToGoogleCalendar();
