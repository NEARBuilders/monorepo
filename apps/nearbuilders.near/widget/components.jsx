const { Button } = VM.require("${config/account}/widget/components.Button");
const { ProgressState } = VM.require(
  "${config/account}/widget/components.ProgressState",
);
const { Bullet } = VM.require("${config/account}/widget/components.Bullet");
const { Step } = VM.require("${config/account}/widget/components.Step");
const { InputField } = VM.require("${config/account}/widget/components.InputField");
const { UploadField } = VM.require(
  "${config/account}/widget/components.UploadField",
);
const { TextBox } = VM.require("${config/account}/widget/components.TextBox");
const { TextEditor } = VM.require("${config/account}/widget/components.TextEditor");
const { Checkbox } = VM.require("${config/account}/widget/components.Checkbox");
const { Avatar } = VM.require("${config/account}/widget/components.Avatar");
const { Modal } = VM.require("${config/account}/widget/components.Modal");
const { Hashtag } = VM.require("${config/account}/widget/components.Hashtag");
const { Tag } = VM.require("${config/account}/widget/components.Tag");

function Pagination({
  totalPages,
  maxVisiblePages,
  onPageClick,
  selectedPage,
  ThemeContainer,
}) {
  return (
    <Widget
      src="${config/account}/widget/components.Pagination"
      props={{
        totalPages,
        maxVisiblePages,
        onPageClick,
        selectedPage,
        ThemeContainer,
      }}
    />
  );
}

function Post(props) {
  return (
    <Widget
      loading={<div className="w-100" style={{ height: "200px" }} />}
      src={"${config/account}/widget/components.Post"}
      props={{ ...props }}
    />
  );
}

function User(props) {
  return (
    <Widget
      loading={<div style={{ widget: "3rem", height: "3rem" }} />}
      src="${config/account}/widget/components.User"
      props={{ ...props }}
    />
  );
}

return {
  Button,
  Pagination,
  Post,
  ProgressState,
  Modal,
  Bullet,
  Step,
  Hashtag,
  InputField,
  UploadField,
  TextBox,
  TextEditor,
  Checkbox,
  Avatar,
  Tag,
  User,
};
