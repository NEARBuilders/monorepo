// CALENDAR FROM https://github.com/fullcalendar/fullcalendar/tree/main/bundle
const events = props.events || [];

const srcData = `
<!DOCTYPE html>
<html>
  <head>
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar/index.global.min.js'></script>
    <script>

      document.addEventListener('DOMContentLoaded', function() {
        const calendarEl = document.getElementById('calendar')
        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          editable: true,
          customButtons: {
            getEvents: {
              text: 'load events',
              click: () => window.top.postMessage({ score: "hello" }, "*")
            }
          },
          headerToolbar: {
            start: 'prev,next today', // will normally be on the left. if RTL, will be on the right
            // center: 'title',
            // end: 'timeGridDay list' 
            end: 'timeGridDay dayGridMonth dayGridWeek dayGridDay list' 
          },
          navLinks: true,
          events: ${JSON.stringify(events)}
        })
        calendar.render()
      })
    </script>
    
  </head>
  <body>
    <div id='calendar'></div>
  </body>
</html>

<style>
html,
body {
  height: 100%;
}

#calendar {
  height: 100%;
}

</style>

`;

return (
  <>
    <iframe
      srcDoc={srcData}
      onMessage={(data) => {
        console.log(data);
      }}
      style={{
        height: "100vh",
        width: "100%",
      }}
    />
  </>
);
