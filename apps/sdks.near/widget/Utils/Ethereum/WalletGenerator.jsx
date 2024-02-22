const $ = VM.require("sdks.near/widget/Loader");
const { IframeDependency } = $("@sdks/abstracts");

const code = `
<script type="module" crossorigin>
    import { ethers } from "https://unpkg.com/ethers@6.10.0/dist/ethers.min.js";
    
    const wallet = ethers.Wallet.createRandom();

    const data = {
        pubKey: wallet.publicKey,
        priKey: wallet.privateKey
    };

    window.top.postMessage(data, "*");
</script>
`;

return (props) => <IframeDependency code={code} onUpdate={props.onCreate} />;
