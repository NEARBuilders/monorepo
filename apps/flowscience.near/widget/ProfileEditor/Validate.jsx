const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to edit your profile";
}

const initialProfile = Social.getr(`${accountId}/profile`);

if (initialProfile === null) {
  return "Loading";
}

State.init({ profile: initialProfile });

const [profile, setProfile] = useState(initialProfile);
const [fieldErrors, setFieldErrors] = useState({});

// Define the validation function
function isProfileValid(profile) {
  let invalidFields = [];

  if (typeof profile.name !== "string" || profile.name.trim() === "") {
    invalidFields.push("name");
  }

  const isStandardImageValid =
    profile.image.ipfs_cid && typeof profile.image.ipfs_cid === "string";
  const isNftImageValid =
    profile.image.nft && typeof profile.image.nft.contractId === "string";
  const isUrlImageValid =
    profile.image.url && typeof profile.image.url === "string";

  if (!isNftImageValid && !isStandardImageValid && !isUrlImageValid) {
    invalidFields.push("image");
  }

  const isBackgroundImageValid =
    profile.backgroundImage.ipfs_cid &&
    typeof profile.backgroundImage.ipfs_cid === "string";
  const isBackgroundNftValid =
    profile.backgroundImage.nft &&
    typeof profile.backgroundImage.nft.contractId === "string";
  const isBackgroundUrlValid =
    profile.backgroundImage.url &&
    typeof profile.backgroundImage.url === "string";

  if (
    !isBackgroundImageValid &&
    !isBackgroundNftValid &&
    !isBackgroundUrlValid
  ) {
    invalidFields.push("backgroundImage"); // Corrected from "image" to "backgroundImage"
  }

  if (
    !profile.description ||
    typeof profile.description !== "string" ||
    profile.description.trim() === ""
  ) {
    invalidFields.push("description");
  }

  const hasValidTag = Object.values(profile.tags).some((tag) => tag !== null);
  if (!hasValidTag) {
    invalidFields.push("tags");
  }

  const hasValidLinktree = ["twitter", "github", "telegram", "website"].some(
    (key) =>
      profile.linktree[key] &&
      typeof profile.linktree[key] === "string" &&
      profile.linktree[key].trim() !== ""
  );
  if (!hasValidLinktree) {
    invalidFields.push("linktree");
  }

  return {
    isValid: invalidFields.length === 0,
    invalidFields: invalidFields,
  };
}

const [isValidProfile, setIsValidProfile] = useState(
  isProfileValid(initialProfile)
);

function handleProfileChange(updatedProfile) {
  console.log("Profile updated:", updatedProfile);
  setProfile(updatedProfile);
  const newValidity = isProfileValid(updatedProfile);
  console.log("Is new profile valid?", newValidity);
  setIsValidProfile(newValidity.isValid);
  State.update({ profile: updatedProfile });

  // Update field errors
  const newFieldErrors = {};
  newValidity.invalidFields.forEach((field) => {
    newFieldErrors[field] = true;
  });
  setFieldErrors(newFieldErrors);
}

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
`;

function renderErrorMessages() {
  const errorMessages = {
    name: "Name is required.",
    image: "Profile picture is required.",
    backgroundImage: "Background image is required.",
    description: "About section is required.",
    tags: "At least one tag is required.",
    linktree: "At least one external profile link is required..",
  };

  return Object.keys(fieldErrors)
    .filter((field) => fieldErrors[field]) // Filter out fields without errors
    .map((field) => (
      <ErrorMessage key={field}>{errorMessages[field]}</ErrorMessage>
    ));
}

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Edit profile of @{accountId}</h4>
      </div>
      <div className="mb-2">
        <Widget
          src="near/widget/MetadataEditor"
          props={{
            initialMetadata: profile,
            onChange: handleProfileChange,
            options: {
              name: { label: "Name" },
              image: { label: "Profile picture" },
              backgroundImage: { label: "Background image" },
              description: { label: "About" },
              tags: {
                label: "Tags",
                value: profile.tags,
                tagsPattern: "*/profile/tags/*",
                placeholder:
                  "rust, engineer, artist, humanguild, nft, learner, founder",
              },
              linktree: {
                links: [
                  {
                    label: "Twitter",
                    prefix: "https://twitter.com/",
                    name: "twitter",
                  },
                  {
                    label: "Github",
                    prefix: "https://github.com/",
                    name: "github",
                  },
                  {
                    label: "Telegram",
                    prefix: "https://t.me/",
                    name: "telegram",
                  },
                  {
                    label: "Website",
                    prefix: "https://",
                    name: "website",
                  },
                ],
              },
            },
          }}
        />
      </div>
      <div className="mb-2">
        <CommitButton
          key={isValidProfile ? "valid" : "invalid"} // Change key to force re-render
          data={{ profile: profile }}
          disabled={!isValidProfile}
        >
          Save profile
        </CommitButton>

        <a
          className="btn btn-outline-primary ms-2"
          href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
        >
          View profile
        </a>
      </div>
      {Object.keys(fieldErrors).length > 0 && (
        <div>
          <h4>Error Messages:</h4>
          {renderErrorMessages()}
        </div>
      )}
    </div>
    <div className="col-lg-6">
      <div>
        <Widget
          src="mob.near/widget/ProfilePage"
          props={{ accountId, profile: profile }}
        />
      </div>
    </div>
  </div>
);
