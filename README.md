# the monorepo

## before you begin

These packages utilize `pnpm` for monorepo capabilities.

```cmd
npm install -g pnpm
```

Then, we need to init the git submodules:

```cmd
pnpm run init
```

and install dependencies:

```cmd
pnpm install
```

// Merge this to main

## get started

To modify existing widgets in the /apps directory,

```cmd
pnpm run init 
pnpm install

pnpm run dev
```

This will install packages, then start a local gateway hooked up to the VM, and a default gateway serving your local widgets.

To extend the monorepo, you can either:

1. "clone" your near account

```cmd
cd packages/bos-workspace
git checkout main
cd ../..
./packages/bos-workspace/bin/bos-workspace clone every.near
```

Then change "appAccount" to "account"

2. use create-bos-app to initialize a new workspace

```cmd
pnpm add -g @archetype-org/create-bos-app
```


## deploy to web4

(needs [bos-cli-rs](https://github.com/bos-cli-rs/bos-cli-rs))

1. create a subaccount

```cmd
near account create-account fund-myself web4.alice.near '1 NEAR' autogenerate-new-keypair save-to-keychain sign-as alice.near network-config mainnet sign-with-keychain send
```

2. deploy [minimum web4 contract](https://github.com/vgrichina/web4-min-contract)

```cmd
cd packages/web4-deploy/data

near contract deploy web4.alice.near use-file web4-min.wasm without-init-call network-config mainnet sign-with-keychain send
```

3. change default widgetSrc in `near-bos-webcomponent/src/App#24` and build

```cmd
cd near-bos-webcomponent
yarn build
```

4. export keys to use in web4 deploy of `dist`

```cmd
near account export-account web4.alice.near using-private-key network-config mainnet

NEAR_ENV=mainnet NEAR_SIGNER_KEY=${PRIVATE_KEY} npx web4-deploy dist web4.alice.near --nearfs
```

5. done, app deployed at alice.near.page

### TODO

- [ ] combine create-bos-app to bos-workspace init
- [ ] modify init to use zeeshan's template
- [ ] create-bos-app needs recent version of bos-workspace

### Breakdown

- /VM - What is the VM?
- /gateway - runs a local React App configured with the VM for displaying widgets served from /apps
- /apps - widgets to be served by bos-workspace, displayed on the gateway. The root account is "urbit.near" as configured in apps/urbit/bos.config.json. Nested paths in /widget will resolve to dot notation (e.g. urbit.near/widget/page.home). Your gateway will redirect references to prioritize the widgets from local.
/packages - has bos-workspace and create-bos-app

### TODO

- [ ] convert gateway -> near-bos-webcomponent (we probably want a next.js gateway too, something connected to Tauri, Proximity bos-template Mike.near)
- [ ] import apps
- [ ] simple change in the VM that can signify if using local or not
- [ ] web4 contract
- [ ] .github/.workflows

```
everything
    apps
        every.near - default viewer, thing ability, browser, search
        devs.near - bos blocks, component library
        create.near - generic editor/creator/canvas
        apps.near - app creator and browser
        sdks.near - sdk creator browser for sdks
        maps.near - browser for maps
        embeds.near - feeds
        video.every.near
        nearbuilders.near - build dao gateway specific code
    gateway
        near-everything/viewer
        NearSocial/viewer
        nearbuilders/gateway
        create-next-app/starter
        near-bos-webcomponent 
    VM
    packages/bos-workspace
```

## Getting Started

To run locally:

1. From this root (/near), run:
```cmd
pnpm install
pnpm run dev
```

This will serve your local widget code (/apps/urbit/*) to port 8080.

![bos-workspace](./assets/bos-workspace.png)

and start a react app at port 4000.

2. Configure flags on gateway to work with local widgets. Go to `http://localhost:3000/flags` and paste in: `http://127.0.0.1:8080/api/loader`. Components should be loading successfully if localhost:3000 shows a dashboard rather than a white screen.


3. Verify VM is connected

![vm-configured](./assets/vm-configured.png)

This signifies that `Urbit` keyword is recognized.

5. After making any changes to the VM, rebuild.

```cmd
cd VM
pnpm run build
```

If linked successfully, gateway should load changes automatically.

### Using bos-workspace

Clone a near account's widgets:

```cmd
pnpm run bw clone hack.near
```

If anyone updates widgets in a separate editor like jutsu.ai or near.social/edit, you can sync them locally here:

```cmd
pnpm run bw pull hack.near
```


### Using submodules

From the root folder then add the submodule folder.

```cmd
git submodule add <url>
```

Now when you clone the project you simply need to init and update the submodule

```cmd
git submodule init
git submodule update
```

Git 1.8.2 features a new option --remote

```cmd
git submodule update --remote --merge
```

will fetch the latest changes from upstream in each submodule, merge them in, and check out the latest revision of the submodule. As [the docs][1] put it:

`--remote`

This option is only valid for the update command. Instead of using the superproject’s recorded SHA-1 to update the submodule, use the status of the submodule’s remote-tracking branch.

This is equivalent to running git pull in each submodule.
