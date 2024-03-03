const { startTime, endTime, type } = props;

State.init({
  days: "-",
  hours: "-",
  minutes: "-",
  seconds: "-",
  title: "",
});

const formatTime = (time) => (time < 10 ? `0${time}` : time);

const timer = setInterval(() => {
  const now = new Date().getTime();
  const start = new Date(parseInt(startTime)).getTime();
  const end = new Date(parseInt(endTime)).getTime();
  let title = "";

  const diff = new Date(parseInt(end)).getTime() - new Date().getTime();
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (now < start)
    title = (
      <>
        time until <br /> {type} starts
      </>
    );
  else if (now > start && now < end)
    title = (
      <>
        time until <br /> {type} ends
      </>
    );
  else {
    title = <>{type} is closed</>;
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  }
  console.log([days, hours, minutes, seconds, title]);
  State.update({
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    title: title,
  });

  clearInterval(timer);
}, 1000);

const Logo = styled.img`
    width: 60px;
    margin: 0 20px 0 10px;
`;

const H1 = styled.h1`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 0;
`;

const H6 = styled.h6`
  font-size: 12px;
  font-weight: 300;
  margin-right: 32px;
  margin-bottom: 0;
  line-height: 1.5;
  align-items: center;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const Timer = styled.div`
  .time {
    font-size: 48px;
    font-weight: 800;
    color: #61d037;
    width: 100px;
    line-height: 1;
  }
  small {
    margin-bottom: 0;
    align-items: center;
  }
`;

const TimerContainer = styled.div`
  .time {
    font-size: 48px;
    font-weight: 700;
    color: #61d037;
    width: 100px;
    line-height: 1;
  }
  small {
    margin-bottom: 0;
    align-items: center;
  }
`;

const SmallTimerContainer = styled.div`
  background: #61d037;

  .time {
    font-size: 36px;
    font-weight: 700;
    color: #000;
    width: 70px;
    line-height: 1;
  }
  small {
    margin-bottom: 0;
    align-items: center;
    color: grey;
  }
`;

const TimerContent = () => {
  const TimeSlot = ({ time, title }) => (
    <div>
      <div className="time">{formatTime(time)}</div>
      <small className="m-1">{title}</small>
    </div>
  );

  return (
    <>
      <Timer className="d-flex">
        <TimeSlot title="days" time={state.days} />
        <TimeSlot title="hours" time={state.hours} />
        <TimeSlot title="minutes" time={state.minutes} />
        <TimeSlot title="seconds" time={state.seconds} />
      </Timer>
    </>
  );
};

return (
  <>
    <div className="p-4 bg-black text-white d-none d-lg-flex rounded justify-content-between align-items-center">
      <TimerContainer className="d-flex align-items-center">
        <TimerContent />
      </TimerContainer>
    </div>
    <div className="d-md-flex row d-lg-none d-xl-none rounded bg-black">
      <SmallTimerContainer className="d-flex p-3 align-items-center rounded-bottom justify-content-between">
        <TimerContent />
      </SmallTimerContainer>
    </div>
  </>
);
