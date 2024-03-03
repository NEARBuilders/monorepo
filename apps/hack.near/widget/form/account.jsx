const label = props.label ?? "dao";
const placeholder = props.placeholder ?? "example.sputnik-dao.near";
const value = props.value ?? "";
const onChange = props.onChange ?? (() => {});
const addInfo = props.addInfo ?? (() => {});
const accountIdRegex =
  /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/;

State.init({
  valid: true,
  isAvailable: true,
  isDao: false,
  errorMessage: <></>,
});

const canEdit = (accountId) => {
  return Near.asyncView(
    "social.near",
    "is_write_permission_granted",
    { predecessor_id: context.accountId, key: accountId },
    "final",
    false
  );
};

const daoId = state.name + ".sputnik-dao.near";
const name = state.name;

const daos = Near.view("sputnik-dao.near", "get_dao_list");

if (daos === null) {
  return "Loading...";
}

const checkAvailability = (daos) => {
  if (daos.indexOf(daoId) !== -1) {
    return State.update({ isAvailable: false });
  }
};

const availableName = checkAvailability(daos);

let string = "sputnik-dao.near";
let domain = ".near";

const checkDao = (daoId) => {
  if (daoId.indexOf(string) !== -1) {
    return State.update({ isDao: true });
  }
};

const validate = async () => {
  if (typeof value !== "string") {
    State.update({
      valid: false,
      errorMessage: "Account ID must be a text value!",
    });
    addInfo(false);
    return;
  }

  if (value.length < 2) {
    State.update({
      valid: false,
      errorMessage: "Account ID must be at least 2 characters long!",
    });
    addInfo(false);
    return;
  }

  if (value.length > 64) {
    State.update({
      valid: false,
      errorMessage: "Account ID must be at most 64 characters long!",
    });
    addInfo(false);
    return;
  }

  if (!accountIdRegex.test(value)) {
    State.update({
      valid: false,
      errorMessage: (
        <>
          Account ID must follow the rules specified{" "}
          <a
            href="https://nomicon.io/DataStructures/Account#account-id-rules"
            target="_blank"
          >
            here
          </a>
          !
        </>
      ),
    });
    addInfo(false);
    return;
  }

  canEdit(value).then((editPermission) => {
    if (!editPermission) {
      if (value !== context.accountId) {
        State.update({
          valid: false,
          errorMessage: "You do not have permission to edit this account!",
        });
      }

      State.update({ valid: true, errorMessage: "" });
      addInfo(true);
      return;
    }

    State.update({ valid: true, errorMessage: "" });
    addInfo(false);
  });
};

return (
  <Widget
    src="hack.near/widget/form.text"
    props={{
      label,
      placeholder,
      value,
      onChange,
      validate,
      error: state.errorMessage,
    }}
  />
);
