const text = `
This command line interface utility helps builders to develop components on the [Blockchain Operating System](https://near.org/blog/near-announces-the-blockchain-operating-system), allowing developers to use familiar developer tools like VS Code and GitHub for source code version control, so they can deploy their components to the SocialDB contract in one command.

Currently, only two groups of commands are implemented:

1. Components
2. SocialDB

Keep reading to learn about what is available in the CLI.


### Components
--> working with components (download, deploy, etc.)

- 'deploy' allows you to upload/publish components from your local ./src folder to near.social account.
- 'download' allows you to download the existing components from any near.social account to the local ./src folder.
- 'delete' allows you to delete the existing components from any near.social account.

### SocialDB
##### Data Management:
--> viewing, adding, updating, deleting information by a given key

- 'view' allows you to view information by a given key.
- 'set' allows you to add or update information by a given key.
- 'delete' allows you to delete information by the specified key.

##### Storage Management:
--> deposit, withdrawal, and balance review

- 'view-balance' allows you to view the storage balance for an account.
- 'deposit' allows you to make a storage deposit for the account.
- 'withdraw' allows you to make a withdraw a deposit from storage for an account ID.

##### Permissions:
--> giving access permissions to a different account

- "grant-write-access" allows grant access to the access key to call a function or another account.

More commands are still on the way!

See the [issues tracker](https://github.com/FroVolod/bos-cli-rs/issues) and propose more features there.
`;

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;

if (!state.theme) {
  State.update({
    theme: styled.div`
        font-family: "Roboto", sans-serif;
        ${cssFont}
        ${css}`,
  });
}

const Theme = state.theme;

return (
  <Theme>
    <div
      class="container pt-3 vw-80"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div style={{ width: "50vw" }}>
        <div style={{ padding: 32 }}>
          <div className="mb-3">
            <h2 className="mb-2">About BOS CLI</h2>
            <a
              className="btn btn-outline-success"
              href="https://github.com/bos-cli-rs/bos-cli-rs"
            >
              Install via GitHub
            </a>
          </div>
          <Markdown text={text} />
        </div>
      </div>
    </div>
  </Theme>
);
