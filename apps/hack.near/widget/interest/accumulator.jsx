const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "meta.sputnik-dao.near";

let defaultSlices = Social.get(`${daoId}/pie`);

if (defaultSlices === null) {
  return "";
}

let slices = Social.get(`${accountId}/pie`);

if (slices === null) {
  return "";
}

State.init({
  labels: defaultSlices.labels ?? state.labels,
  description: defaultSlices.description ?? state.description,
  values,
});

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

const deposit = policy.proposal_bond;

const slice_args = JSON.stringify({
  data: {
    [daoId]: {
      pie: {
        labels: state.labels,
        description: state.description,
        supporters: "futurevisions.near",
      },
    },
  },
});

const mySlice = JSON.stringify({
  data: {
    [accountId]: {
      pie: {
        labels: state.labels,
        description: state.description,
        supporters: [accountId],
      },
    },
  },
});

const proposal_args = Buffer.from(slice_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "propose new slice for the interest accumulator",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "80000000000000000000000",
                  gas: "300000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "300000000000000",
    },
  ]);
};

let Style = styled.div`

  .barTextH{
    transition: fill 0.2s;

  }
.barTextH:hover{
    fill: #ad610a;

  }
  .bar {
    transition: fill 0.2s;
  }

  .bar:hover {
    fill: #ffa726;
  }

  .bar-chart {
    display: flex;
    align-items: center;
    justify-content: center;
  }

    svg {
      width: 80%;
    }

    rect {
      shape-rendering: crispEdges;
      fill: #61dafb;
      stroke: #333;
      stroke-width: 1;
    }


    `;

const onChangeLabel = (newLabel) => {
  State.update({
    newLabel,
  });
};

const onChangeDescription = (description) => {
  State.update({
    description,
  });
};

const values = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

return (
  <div>
    <h3>Add Your Slice</h3>
    <h5>Label: What?</h5>
    <input type="text" onChange={(e) => onChangeLabel(e.target.value)}></input>
    <br />
    <h5>Description</h5>
    <input
      type="text"
      onChange={(e) => onChangeDescription(e.target.value)}
    ></input>
    <br />
    <div className="mb-2">
      <button className="btn btn-outline-success m-1" onClick={handleProposal}>
        Propose Changes
      </button>
      <CommitButton data={{ pie: mySlice }}>Save Changes</CommitButton>
    </div>
    <Widget src="y3k.near/widget/pieChartSVG" props={{ labels, values }} />
  </div>
);
