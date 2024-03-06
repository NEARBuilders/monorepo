const { Button, Hashtag } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
  Hashtag: () => <></>,
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

const StyledEvent = styled.div`
  border-radius: 16px;
  background: #23242b;
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 24px;

  color: var(--font-color, #fff);

  h4,
  p {
    margin: 0;
  }

  h4 {
    /* H4/Large */
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 28.8px */
  }

  p {
    /* Body/16px */
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 170%; /* 27.2px */
  }

  .cover-image {
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 8px;
    }
  }
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
            <StyledEvent key={`event-${i}`}>
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {hashtags.map((tag) => (
                    <Hashtag key={tag}>{tag}</Hashtag>
                  ))}
                </div>
                <span>{startTime}</span>
              </div>
              <div className="d-flex gap-3">
                <div className="cover-image">
                  <Widget
                    src="mob.near/widget/Image"
                    props={{
                      image: event.extendedProps.cover,
                      fallbackUrl:
                        "https://ipfs.near.social/ipfs/bafkreibas66y6ewop5ix2n6mgybpjz6epg7opqvcplmm5jw4jlhdik5nhe",
                    }}
                  />
                </div>
                <div>
                  <h4>{event.title}</h4>
                  <Markdown text={event.description} />
                </div>
              </div>
              <div className="d-flex align-items-center flex-wrap gap-3">
                <span className="d-flex align-items-center gap-1">
                  <Widget
                    src="mob.near/widget/Image"
                    loading=""
                    props={{
                      image: organizerProfile.image,
                      fallbackUrl:
                        "https://ipfs.near.social/ipfs/bafkreibas66y6ewop5ix2n6mgybpjz6epg7opqvcplmm5jw4jlhdik5nhe",
                      style: {
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        objectFit: "cover",
                      },
                    }}
                  />
                  {organizerProfile.name ?? organizers[0] ?? "No name profile"}
                </span>
                <span className="d-flex align-items-center gap-1">
                  <i className="bi bi-geo-alt"></i>
                  {event?.extendedProps?.location}
                </span>

                <span className="d-flex align-items-center gap-1">
                  <i className="bi bi-calendar"></i>
                  Last Date:{" "}
                  {new Date(event.end).toLocaleString("en-us", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Button
                  noLink={true}
                  href={`${event?.url}`}
                  target="_blank"
                  variant="primary"
                >
                  Join Now
                </Button>
                {event.extendedProps.customButtonSrc && (
                  <Widget
                    src={event.extendedProps.customButtonSrc}
                    loading=""
                  />
                )}
                {eventAuthor === context.accountId && (
                  <Button
                    onClick={handleDelete}
                    style={{ background: "#ff2b2b" }}
                    variant="primary"
                  >
                    Delete Event
                  </Button>
                )}
              </div>
            </StyledEvent>
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
