const data = props.data;

// YOUR EVENT TEMPLATE HERE
// It automatically takes in the thing data from props.
// So you can assume some dummy data, that is gonna look something like this:

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
  <>
    <div>THIS IS AN EVENT</div>
    <div>{JSON.stringify(data)}</div>
  </>
);
