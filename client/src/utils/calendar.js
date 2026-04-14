export function generateICS(itinerary) {
  if (!itinerary || !itinerary.dailyItinerary) return '';

  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Travel AI//Trip Planner//EN'
  ];

  itinerary.dailyItinerary.forEach(day => {
    if (!day.date) return;
    const baseDate = day.date.replace(/-/g, '');

    day.activities?.forEach(activity => {
      let hh = 9;
      let mm = 0;
      
      if (activity.time) {
        const timeMatch = activity.time.match(/(\d{1,2}):(\d{2})/);
        if (timeMatch) {
           hh = parseInt(timeMatch[1], 10);
           mm = parseInt(timeMatch[2], 10);
           if (activity.time.toLowerCase().includes('pm') && hh < 12) hh += 12;
           if (activity.time.toLowerCase().includes('am') && hh === 12) hh = 0;
        }
      }

      let endHh = hh + 2; 
      if (activity.duration) {
        const durMatch = activity.duration.match(/(\d+(\.\d+)?)/);
        if (durMatch) {
           endHh = hh + Math.ceil(parseFloat(durMatch[1]));
           if (activity.duration.includes('min') && !activity.duration.includes('hour') && !activity.duration.includes('hr')) {
             endHh = hh;
             mm += parseInt(durMatch[1], 10);
             if (mm >= 60) {
               endHh += Math.floor(mm / 60);
               mm = mm % 60;
             }
           }
        }
      }
      
      const formatTime = (h, m) => {
        return `${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}00`;
      };

      const dtstart = `${baseDate}T${formatTime(hh, mm)}`;
      // Bound the end hours to 23 to avoid overflow to next day simply
      const boundEndHh = Math.min(23, endHh);
      const dtend = `${baseDate}T${formatTime(boundEndHh, mm)}`;

      const escapeText = (text) => text ? text.replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n') : '';

      icsContent.push('BEGIN:VEVENT');
      icsContent.push(`DTSTART:${dtstart}`);
      icsContent.push(`DTEND:${dtend}`);
      icsContent.push(`SUMMARY:${escapeText(activity.name)}`);
      icsContent.push(`DESCRIPTION:${escapeText(activity.description)}`);
      icsContent.push(`LOCATION:${escapeText(activity.location)}`);
      icsContent.push('END:VEVENT');
    });
  });

  icsContent.push('END:VCALENDAR');
  return icsContent.join('\r\n'); // ICS uses CRLF
}

export function downloadICS(itinerary) {
  const icsString = generateICS(itinerary);
  if (!icsString) return;

  const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `TripTo${itinerary.destination?.replace(/[^a-zA-Z0-9]/g, '') || 'Destination'}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
