const { Hero } = VM.require("${config/account}/widget/home.Hero") || {
  Hero: () => <></>,
};
const { Goals } = VM.require("${config/account}/widget/home.Goals") || {
  Goals: () => <></>,
};
const { Join } = VM.require("${config/account}/widget/home.Join") || {
  Join: () => <></>,
};
const { Purposes } = VM.require("${config/account}/widget/home.Purposes") || {
  Purposes: () => <></>,
};
const { AboutUs } = VM.require("${config/account}/widget/home.AboutUs") || {
  AboutUs: () => <></>,
};
const { Governance } = VM.require("${config/account}/widget/home.Governance") || {
  Governance: () => <></>,
};
const { Footer } = VM.require("${config/account}/widget/home.Footer") || {
  Footer: () => <></>,
};

return {
  Hero,
  Goals,
  Join,
  Purposes,
  AboutUs,
  Governance,
  Footer,
};
