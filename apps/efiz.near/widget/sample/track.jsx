const data = props.data;

const TrackContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 10px;
`;
const TrackInfo = styled.div`
  flex: 1;
  margin-left: 10px;
`;
const TrackTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #333;
`;
const TrackArtist = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;
const TrackAlbum = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;
const TrackDuration = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

return (
  <TrackContainer>
    <TrackInfo>
      <TrackTitle>{data.title}</TrackTitle>
      <TrackArtist>{data.artist}</TrackArtist>
      <TrackAlbum>{data.album}</TrackAlbum>
      <TrackDuration>{data.duration}</TrackDuration>
    </TrackInfo>
  </TrackContainer>
);
