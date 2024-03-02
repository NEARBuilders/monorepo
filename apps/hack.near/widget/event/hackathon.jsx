const data = props.data;

// {
//   "id": "testId",
//   "title": "testTitle",
//   "description": {
//     "content": "testDescription"
//   },
//   "start": "2023-06-30",
//   "startTime": "12:32",
//   "end": "2023-07-01",
//   "endTime": "12:32",
//   "location": "testLocation",
//   "link": "testLink",
//   "organizer": "testOrganizer",
//   "category": "HACKATHON"
// }

return (
  <div className="py-1 px-1 m-2">
    <div className="mx-auto">
      <Widget
        src="hack.near/widget/event.card"
        props={{
          accountId: data.organizer,
          eventId: data.id,
          link: data.link,
          start: data.start,
          startTime: data.startTime,
          end: data.end,
          endTime: data.endTime,
          location: data.location,
          category: data.category,
        }}
      />
    </div>
  </div>
);
