const {
  SUPPORTED_FTS: { NEAR },
} = props;
const { DONATION_CONTRACT_ID } = VM.require("potlock.near/widget/constants") || {
  DONATION_CONTRACT_ID: "",
};

let DonateSDK =
  VM.require("potlock.near/widget/SDK.donate") ||
  (() => ({
    asyncGetDonationsForDonor: () => {},
  }));
DonateSDK = DonateSDK({ env: props.env });

let PotFactorySDK =
  VM.require("potlock.near/widget/SDK.potfactory") ||
  (() => ({
    getPots: () => {},
  }));
PotFactorySDK = PotFactorySDK({ env: props.env });
const pots = PotFactorySDK.getPots();

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  asyncGetConfig: () => {},
  asyncGetDonationsForDonor: () => {},
};

const accountId = props.accountId ?? context.accountId;

const { ProfileOptions } = VM.require("${config/account}/widget/Profile.Options");

if (!accountId) {
  return "No account ID";
}

const [directDonations, setDirectDonations] = useState(null);
// mapping of pot IDs to array of sponsorship (matching pool) donations to this pot for this user
const [sponsorshipDonations, setSponsorshipDonations] = useState({});
const [potDonations, setPotDonations] = useState([]);

const getSponsorshipDonations = (potId, potDetail) => {
  return PotSDK.asyncGetDonationsForDonor(potId, accountId)
    .then((donations) => {
      donations = donations.filter((donations) => donations.donor_id === accountId);
      const updatedDonations = donations.map((donation) => ({
        ...donation,
        base_currency: potDetail.base_currency,
        pot_name: potDetail.pot_name,
        pot_id: potId,
        type: donation.project_id ? "MATCHED_DONATIONS" : "SPONSORSHIP",
      }));
      if (sponsorshipDonations[potId]) return "";
      setSponsorshipDonations((prevSponsorshipDonations) => {
        return { ...prevSponsorshipDonations, [potId]: updatedDonations };
      });
    })
    .catch(() => {
      if (sponsorshipDonations[potId]) return "";
      setSponsorshipDonations((prevSponsorshipDonations) => {
        return { ...prevSponsorshipDonations, [potId]: [] };
      });
    });
};

// Get Direct Donations
if (!directDonations) {
  DonateSDK.asyncGetDonationsForDonor(accountId).then((donations) => {
    donations = donations.map((donation) => ({
      ...donation,
      type: "DIRECT",
    }));
    setDirectDonations(donations);
  });
}
// Get Sponsorship Donations
if (pots && !sponsorshipDonations[pots[pots.length - 1].id]) {
  pots.forEach((pot) => {
    PotSDK.asyncGetConfig(pot.id).then((potDetail) => {
      getSponsorshipDonations(pot.id, potDetail);
    });
  });
}

const allDonations = useMemo(() => {
  const sponsorshipDonationsValue = Object.values(sponsorshipDonations).flat();
  const allDonations = [...(directDonations || []), ...sponsorshipDonationsValue];
  allDonations.sort((a, b) => b.donated_at - a.donated_at);
  return allDonations;
}, [sponsorshipDonations, directDonations]);

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const tags = Object.keys(profile.tags || {});
if (profile === null) {
  return "Loading";
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
return (
  <Wrapper>
    <Widget
      src={"${config/account}/widget/Profile.Body"}
      props={{
        ...props,
        profile,
        tags,
        accounts: [accountId],
        donations: allDonations, // TODO: why is this fetched here when it's not used in this component?
        nav: props.nav ?? "donations",
        navOptions: ProfileOptions(props),
      }}
    />
  </Wrapper>
);