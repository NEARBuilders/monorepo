const res = fetch("https://rpc.mainnet.near.org/status", { subscribe: true });
const body = res.body;

return (
  <div>
    <h1>Mainnet RPC</h1>
    <table className="table table-striped">
      <tbody>
        <tr>
          <td>Version</td>
          <td>{body.version.version}</td>
        </tr>{" "}
        <tr>
          <td>Protocol version</td>
          <td>{body.protocol_version}</td>
        </tr>
        <tr>
          <td>Number of validators</td>
          <td>{body.validators.length}</td>
        </tr>
        <tr>
          <td>Block Height</td>
          <td>{body.sync_info.latest_block_height}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
