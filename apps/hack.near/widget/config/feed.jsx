const { Post } = VM.require("buildhub.near/widget/components") || {
  Post: () => <></>,
};

function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const daoName = "Build DAO";
const feedLink = "https://nearbuilders.org/feed";

return {
  type: "app",
  routes: {
    all: {
      path: "apps.near/widget/Feed",
      blockHeight: "final",
      init: {
        name: "All",
        icon: "bi-list",
        requiredHashtags: ["build"],
      },
    },
    updates: {
      path: "apps.near/widget/Feed",
      blockHeight: "final",
      init: {
        name: "Updates",
        icon: "bi-bell",
        requiredHashtags: ["build", "update"],
        template: `### BUILDER UPDATE:  ${formatDate(new Date())}
(posted via [${daoName} Gateway](${feedLink}?tab=update))

**✅ DONE**
- [what'd you do]
- [link proof]

**⏩ NEXT**
- [what's next?]
- [what are you thinking about?]

**🛑 BLOCKERS**
- [what's blocking you?]
- [how can someone help?]
`,
      },
    },
    documentation: {
      path: "apps.near/widget/Feed",
      blockHeight: "final",
      init: {
        name: "Documentation",
        icon: "bi-book",
        requiredHashtags: ["build", "documentation"],
        template: `## TITLE
(posted via [${daoName} Gateway](${feedLink}?tab=documentation))

**WHAT IS _____?**
- [context]
- [why is it important?]

**EXAMPLE**
- [how can this be demonstrated?]
- [what is the expected outcome?]

**USAGE**
- [where is it used?]
- [how to use it]
`,
      },
    },
    question: {
      path: "apps.near/widget/Feed",
      blockHeight: "final",
      init: {
        name: "Question",
        icon: "bi-question-lg",
        requiredHashtags: ["build", "question"],
        template: `## what is your question?
(posted via [${daoName} Gateway](${feedLink}?tab=question))

[what are you thinking about?]
[why are you asking?]
`,
      },
    },
    answer: {
      path: "apps.near/widget/Feed",
      blockHeight: "final",
      init: {
        name: "Answer",
        icon: "bi-journal-code",
        requiredHashtags: ["build", "answer"],
        template: `## Share an answer
(posted via [${daoName} Gateway](${feedLink}?tab=answer))

[please restate the question you are answering]

[your answer]

[link to relevant docs, examples, or resources]
`,
      },
    },
    opportunity: {
      path: "apps.near/widget/Feed",
      blockHeight: "final",
      init: {
        name: "Opportunity",
        icon: "bi-briefcase",
        requiredHashtags: ["build", "opportunity"],
        template: `## TITLE
(posted via [${daoName} Gateway](${feedLink}?tab=opportunity))

[what is the opportunity?]

[explain the motivation or reason]
`,
      },
    },
    idea: {
      path: "apps.near/widget/Feed",
      blockHeight: "final",
      init: {
        name: "Idea",
        icon: "bi-lightbulb",
        requiredHashtags: ["build", "idea"],
        template: `## IDEA TITLE
(posted via [${daoName} Gateway](${feedLink}?tab=idea))

**What idea are you proposing?**
- [Describe the idea]

**Context or additional information:**
- [Provide any context or details]
`,
      },
    },
    task: {
      path: "apps.near/widget/Feed",
      blockHeight: "final",
      init: {
        name: "Task",
        icon: "bi-check-lg",
        requiredHashtags: ["build", "task"],
        template: `## TASK TITLE
(posted via [${daoName} Gateway](${feedLink}?tab=task))

**What needs to be done?**
- [Describe the task or action steps]

**Context or additional information:**
- [Provide any context or details]
`,
      },
    },
    feedback: {
      path: "apps.near/widget/Feed",
      blockHeight: "final",
      init: {
        name: "Feedback",
        icon: "bi-chat-left-text",
        requiredHashtags: ["build", "feedback"],
      },
    },
    events: {
      path: "buildhub.near/widget/events.Calendar",
      blockHeight: "final",
      init: {
        name: "Events",
        icon: "bi-calendar",
      },
    },
    bookmarks: {
      path: "buildhub.near/widget/OrderedGraphFeed",
      blockHeight: "final",
      init: {
        name: "Bookmarks",
        icon: "bi-bookmark",
        itemType: "bookmark",
        renderItem: (item) => {
          return (
            <Post
              accountId={item.accountId}
              blockHeight={item.blockHeight}
              noBorder={true}
              hideComments={true}
            />
          );
        },
      },
    },
  },
};
