const { Button, Hashtag } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
  Hashtag: () => <></>,
};

const { Card } = VM.require("events.efiz.near/widget/events.Card") || {
  Card: () => <></>,
};

const events = props.events ?? [];
const currentDate = props.currentDate;

if (!events || !currentDate) {
  return "";
}

const currentMonthEvents = events.filter((event) => {
  const eventDate = new Date(event.start);
  return eventDate.getMonth() === currentDate.getMonth();
});

const categorizedEvents = currentMonthEvents.reduce((result, event) => {
  const eventDate = new Date(event.start)
    .toLocaleDateString("en-us", {
      day: "numeric",
      month: "short",
    })
    .split(" ")
    .reverse()
    .join(" "); // Format date as a string
  result[eventDate] = result[eventDate] || [];
  result[eventDate].push(event);
  return result;
}, {});

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const formatStartTime = (time) => {
  const date = new Date(time);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  return date.toLocaleString("en-US", options);
};

const dateKeys = Object.keys(categorizedEvents);

const today = new Date();

const futureEvents =
  dateKeys.filter((date) => {
    return categorizedEvents[date].some((event) => {
      const eventStartDate = new Date(event.start);
      const eventEndDate = new Date(event.end);
      return eventStartDate >= today || eventEndDate > today;
    });
  }) || [];

const pastEvents =
  dateKeys.filter((date) => !futureEvents.includes(date)) || [];

const sortEvents = (events) => {
  return events.sort((a, b) => a.split(" ")[0] + b.split(" "[0]));
};

futureEvents.sort();
pastEvents.sort();

const EventGroup = ({ date }) => {
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 32px;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 24px;
    }
  `;

  return (
    <Container>
      <h3 className="flex-shrink-0 text-white" style={{ minWidth: 65 }}>
        <div className="d-flex gap-3 align-items-center">
          {date.split(" ").map((it, i) => (
            <span
              style={{
                fontSize: i === 0 ? "24px" : "16px",
                color:
                  i === 0
                    ? "var(--text-color, #fff)"
                    : "var(--white-50, #CDD0D5)",
              }}
            >
              {it}
            </span>
          ))}
        </div>
      </h3>
      <div className="w-100 d-flex flex-column gap-3">
        {categorizedEvents[date].map((event, i) => {
          const hashtags =
            event?.extendedProps?.hashtags.map((it) => {
              if (it.customOption) {
                return it.hashtags;
              }
              return it;
            }) ?? [];
          const organizers =
            event?.extendedProps?.organizers.map((it) => {
              if (it.customOption) {
                return it.organizer;
              }
              return it;
            }) ?? [];

          const organizer = organizers[0];
          const organizerProfile = Social.getr(`${organizer}/profile`);

          const startTime = formatStartTime(event.start);

          const eventAuthor = event?.key?.split("/")[0] ?? "";
          const eventApp = event?.key?.split("/")[1] ?? "";
          const eventType = event?.key?.split("/")[2] ?? "";
          const eventKey = event?.key?.split("/")[3] ?? "";

          const handleDelete = () => {
            Social.set({
              [eventApp]: {
                [eventType]: {
                  [eventKey]: {
                    "": null,
                  },
                },
              },
            });
          };

          return (
            <Card
              key={i}
              hashtags={hashtags}
              handleDelete={eventAuthor === context.accountId && handleDelete}
              event={event}
              startTime={startTime}
              organizerProfile={organizerProfile}
              eventAuthor={eventAuthor}
            />
          );
        })}
      </div>
    </Container>
  );
};

const PastEvents = () => {
  return (
    <>
      {!pastEvents.length && (
        <p className="text-white">No past events this month</p>
      )}
      {pastEvents.map((date, i) => (
        <EventGroup date={date} />
      ))}
    </>
  );
};

const [showPastEvents, setShowPastEvents] = useState(false);

return (
  <EventsContainer>
    <Button onClick={() => setShowPastEvents((prev) => !prev)}>
      {showPastEvents ? "Hide" : "Show"} Past Events
    </Button>
    {showPastEvents && <PastEvents />}
    {!futureEvents.length && (
      <p className="text-white">No upcoming events this month</p>
    )}
    {futureEvents.map((date, i) => (
      <EventGroup date={date} />
    ))}
  </EventsContainer>
);
