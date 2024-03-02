const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";
const groupId = props.groupId ?? "voter";
const policy = Near.view(daoId, "get_policy");

const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const totalMembers = group[0].length;

const humans = Near.view("registry.i-am-human.near", "sbt_supply", {
  issuer: "fractal.i-am-human.near",
});

const MainWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 360px;  
    align-items: center;
  @media (min-width: 480px) {
    width: ${({ props }) => props.width}px;
  }
`;

const HalfArch = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  border-top-left-radius: 120px;
  border-top-right-radius: 120px;
  border-bottom: 0;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
     content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  border-radius: 50%;
    background:${({ percentage }) =>
      `conic-gradient(rgb(255, 213, 13), rgb(242, 155, 192) calc(${percentage}%), rgb(229, 233, 236) 0deg)`};
     
  transition: transform .5s ease-in-out;
  z-index: 1;
  transform: rotate(270deg);
  }
  
&:after {
  content: "";
  position: absolute;
  display: block;
  background: white;
  z-index: 2;
  width: calc(100% - 32px);
  height: calc(200% - 32px);
  border-radius: 50%;
  top: 16px;
  left: 16px;
}
@media (min-width: 480px) {
    width: 250px;
  height: 125px;
  border-top-left-radius: 120px;
  border-top-right-radius: 120px;
}
@media (min-width: 620px) {
    width: ${({ props }) => props.width}px;
  height: ${({ props }) => props.height}px;
  border-top-left-radius: ${({ props }) => props.border}px;
  border-top-right-radius: ${({ props }) => props.border}px;
}
 `;

const ContentBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: center;
    z-index: 10;
    p {
      margin: 0;
    }
  `;

const PercentageNum = styled.p`
    font-size: 24px;
    font-weight: bold;
    @media (min-width: 480px) {
      font-size: ${({ size }) => (size == "large" ? "30px" : "24px")};
    }
    @media (min-width: 620px) {
      font-size: ${({ size }) => (size == "large" ? "48px" : "24px")};
    }
`;

const TotalRegNum = styled.p`
  font-size: 16px;
  color: #9FA7AD;
   @media (min-width: 620px) {
      font-size: ${({ size }) => (size == "large" ? "24px" : "16px")};

    }
`;

const TextContainer = styled.div`
    width: ${({ size }) => (size === "large" ? "80%" : "100%")};
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 14px auto 4px;
  padding-bottom: 4px;
  z-index: 10;

  a {
    width: ${({ size }) => (size === "large" ? "240px" : "90%")};
    font-size: ${({ size }) => (size == "large" ? "16px" : "14px")};
  }
    &:hover {
      text-decoration: none;
      &:after{ 
        width: 100%;
        
      }
    }
  }
  
`;

const TitleContent = styled.p`
  position: relative;
  font-weight: bold;
  font-size: 22px;
  font-size: 22px;

  margin: ${({ size }) => (size == "large" ? "10px 0 14px" : "6px 0 14px")};
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0%;
    width: 100%; 
    height: 2px;
    background-color: #4498E0;
    
  }
  @media (min-width: 480px) {
    font-size: ${({ size }) => (size == "large" ? "26px" : "22px")};

  }
`;

const TextContent = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 6px;
  margin-top: ${({ size }) => (size === "large" ? "10px" : "4px")};
  width: ${({ size }) => (size === "large" ? "80%" : "100%")};
    @media (min-width: 480px) {
     font-size: 15px;
  }
`;

//Props
const sizes = {
  small: {
    width: 200,
    height: 100,
    border: 120,
  },
  medium: {
    width: 250,
    height: 125,
    border: 150,
  },
  large: {
    width: 400,
    height: 200,
    border: 180,
  },
};
const propsSize = props.size ? props.size : "large";

console.log("propsSize", propsSize);

const totalUsrNum = humans;
const percentage = Math.round((totalMembers / humans) * 100);
const widgetTitle = props.infoTitle ? props.infoTitle : "Total Members";

return (
  <MainWrapper props={sizes[propsSize]}>
    <HalfArch percentage={percentage / 2} props={sizes[propsSize]}>
      <span></span>
      <ContentBox size={propsSize}>
        <PercentageNum size={propsSize}>{percentage}%</PercentageNum>
        <TotalRegNum size={propsSize}>
          {totalMembers}/{totalUsrNum}+
        </TotalRegNum>
      </ContentBox>
    </HalfArch>
    <TextContainer size={propsSize}>
      <TitleContent size={propsSize}>{widgetTitle}</TitleContent>
    </TextContainer>
  </MainWrapper>
);
