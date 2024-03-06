const { Button, Hashtag } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
  Hashtag: () => <></>,
};

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

const Card = ({
  key,
  event,
  startTime,
  hashtags,
  handleDelete,
  organizerProfile,
}) => {
  console.log("event", event);
  return (
    <StyledEvent key={`event-${key}`}>
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          {hashtags && hashtags.map((tag) => (
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
        {event.extendedProps.customButtonCode && (
          <Widget code={event.extendedProps.customButtonCode} loading="" />
        )}
        {handleDelete && (
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
};

return { Card };
