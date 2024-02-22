const $ = VM.require("sdks.near/widget/Loader");
const { LensSDK } = $("@sdks/lens-sdk");
const { Constants } = $("@sdks/lens/definitions");

State.init({
  evmAddress: "",
  handleToCreate: "",
  lastAuthenticationResult: "",
  lastProfileResult: "",
  lastProfileWriteResult: "",
  lastPublicationReadResult: "",
  lastPublicationWriteResult: "",
  lastPublicationSearchResult: "",
  lastProfileSearchResult: "",
  lastNotificationResult: "",
  lastTransactionResult: "",
  lastCustomRequestResult: "",
  handleCreated: null,
  alive: null,
  profiles: [],
  login: null,
  verify: null,
  refresh: null,
  list: null,
  revoke: null,
  customProfileHandle: "lens/mattb",
  searchProfileTerm: "stani",
  searchPublicationTerm: "NEAR Protocol",
  transactionHash: "0xa46ff9fe2c68c0c5ff4347b449bf73373733d01a0377dc44bb1c684c2e702ca0",
  transactionId: "",
  testPublication: "0x01-0x02c5",
  onlyOnce: true,
  customRequest: `query Profile($request: ProfileRequest!) {
  profile(request: $request) {
    operations {
      isFollowedByMe {
        value
      }
    }
  }
}`,
  customRequestParameters: `{
  "request": {
    "forHandle": "lens/mattb"
  }
}`
})

LensSDK = new LensSDK(State, state);

if (!state.evmAddress && Ethers.provider()) {
  Ethers.provider().send("eth_requestAccounts", []).then(([address]) => {
    if (address) {
      State.update({evmAddress: address});
    }  
  });
}

if (LensSDK.isTestnet() && state.onlyOnce) {
  State.update({
    customProfileHandle: "test/mattb",
    searchPublicationTerm: "test",
    testPublication: "0xa0-0x02-DA-25690797",
    onlyOnce: false
  });
}

const Panel = styled.div`
  padding:20px;
  border:1px solid rgba(0,0,0,.1);
  border-radius:10px;
  margin-bottom:20px;

  button {
    cursor:pointer;
    margin: 10px 3px;
    padding:7px 20px;
    border-radius:30px;
    border:0;
    background-color:rgba(0,0,0,.1);
    font-weight:bold;
    color:#000;
    font-size:.8rem;
    box-shadow: 0 0 0 0px rgba(0,0,0,.05);
    transition: all .2s;

    &:hover {
      transition: all .2s;
      box-shadow: 0 0 0 3px rgba(0,0,0,.1);
    }
  }

  input {
    max-width:300px;
    margin: 10px 0;
    border:0;
    border:2px solid rgba(0,0,0,.05);
    padding:10px 20px;
  }

  textarea {
    display:block;
    width:100%;
    height:250px;
    padding:0;
    margin: 10px 0;
    border:0;
    border:2px solid rgba(0,0,0,.05);
    padding:10px;
  }

  p {
    display:flex;
    align-items:center;
    font-size:1.2rem;
    font-weight:bold;
    padding:0;
    margin:0;
    margin-bottom:15px;

    .ball {
      display:inline-block;
      width:10px;
      height:10px;
      border-radius:100%;
      margin-right:10px;

      &.green {
        background-color:lightgreen;
      }

      &.red {
        background-color:red;
      }
    }
  }
`;

const Loading = styled.div`
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  display:flex;
  align-items:center;
  justify-content:center;
  opacity:0;
  transition: all .2s;
  pointer-events:none;

  &.show {
    transition: all .2s;
    opacity:1;
  }

  @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 5px solid #1A1D20;
    border-bottom-color: #C3E4CD;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation .5s linear infinite;
  }
`;

const Warning = styled.div`
  display:table;
  font-size:.8rem;
  margin:10px 0;
  background-color:#F8F3D6;
  border:1px solid #F2EAC4;
  padding:10px;
  border-radius:10px;
  font-weight:bold;
`;

const Response = styled.div`
  width:100%;
  height:300px;
  overflow-y:auto;
  border-radius:10px;
  background-color:rgba(0,0,0,.06);
  border:1px solid rgba(0,0,0,.05);
  color:rgba(0,0,0,.5);
  font-size:.8rem;
  font-weight:bold;
  padding:20px;
  overflow-wrap:break-word;
`;

return (
  <>
    <Loading className={`${LensSDK.isRequestInProgress() ? "show" : ""}`}>
      <div className="spinner">
      </div>
    </Loading>
    <h2 style={{margin: "20px 0", fontWeight: "bold"}}>Lens SDK {LensSDK.getVersion()} API Dashboard <button style={{marginLeft: "10px"}} onClick={ () => LensSDK.isTestnet() ? LensSDK.enableMainnet() : LensSDK.enableTestnet() }>
      Switch to {LensSDK.isTestnet() ? "Mainnet" : "Testnet"}
    </button></h2>
    {LensSDK.isTestnet() && <Warning>Warning: Test environment requests might require different parameters.</Warning>}
    <Panel>
      <p>Health</p>
      <button onClick={() => {
        LensSDK.health.ping().then((alive) => {
          State.update({alive});
        })
      }}>Check API status</button>
      <br/><br/>
      <Response>
        {null === state.alive && "Nothing to show yet"}
        {state.alive && "Alive"}
        {false === state.alive && "Not alive"}
      </Response>
    </Panel>
    {LensSDK.isTestnet() && <Panel>
      <p>Create a Test Lens Profile</p>
      <Warning>Important: You need to connect your wallet</Warning>
      <Web3Connect /><br/><br/>
      Write down a name (without .lens or .testnet)
      <br/><br/>
      <input placeholder="Enter handle" value={state.handleToCreate} onChange={(e) => State.update({handleToCreate: e.target.value})} />
      <button onClick={() => {
        LensSDK.profile.create({
          handle: state.handleToCreate,
          to: state.evmAddress
        }).then((result) => {
          State.update({handleCreated: result});
        });
      }}>Create Lens Handle</button>
      <br/>

      <Response>
        {state.handleCreated !== null && true === state.handleCreated ? "Handle created successfully" : ""}
        {state.handleCreated !== null && !state.handleCreated ? "Error creating handle, might be taken" : ""}
      </Response>
    </Panel>}
    <Panel id="authenticate">
      <p><span className={`ball ${ LensSDK.isAuthenticated() ? "green" : "red"}`}></span> Authentication</p>
      <Warning>Warning: Some endpoints require to be authenticated to work properly (Verify, refresh authentication...)</Warning>
      <Web3Connect />
      <button onClick={() => {
        LensSDK.authentication.profiles({
          for: state.evmAddress
        }).then((profilesManaged) => {
          State.update({lastAuthenticationResult: profilesManaged, profiles: profilesManaged})
        })
      }}>Get profiles managed</button>
      <button onClick={() => {
        LensSDK.authentication.profiles({
          for: state.evmAddress
        }).then((profiles) => {
          LensSDK.authentication.login({
            signedBy: state.evmAddress,
            for: profiles[0].id
          }).then((result) => {
            State.update({lastAuthenticationResult: result, login: result});
          })
        })
      }}>Authenticate on first profile</button>
      <button onClick={() => {
        State.update({lastAuthenticationResult: LensSDK.getCurrentProfile()});
      }}>Get current profile</button>
      <button onClick={() => {
        State.update({lastAuthenticationResult: LensSDK.getAccessToken()});
      }}>Get authentication token</button>
      <button onClick={() => {
        LensSDK.authentication.verify().then((result) => {
          State.update({lastAuthenticationResult: result, verify: result});
        })
      }}>Verify authentication</button>
      <button onClick={() => {
        LensSDK.authentication.refresh().then((result) => {
          State.update({lastAuthenticationResult: result, refresh: result});
        })
      }}>Refresh authentication</button>
       <button onClick={() => {
        LensSDK.authentication.list().then((result) => {
          State.update({lastAuthenticationResult: result, list: result});
        })
      }}>List authentications</button>

      <button onClick={() => {
        LensSDK.authentication.revoke({
          authorizationId: state.list[0].authorizationId
        }).then((result) => {
          State.update({lastAuthenticationResult: result, revoke: result});
        })
      }}>Revoke authentication</button>

      <button onClick={() => {
        LensSDK.authentication.logout();
        State.update({lastAuthenticationResult: null});
      }}>Disconnect authentication</button>
      
      <br/><br/>
      <Response>
        {state.lastAuthenticationResult ? JSON.stringify(state.lastAuthenticationResult) : "Nothing to show yet"}
      </Response>
    </Panel>
    <Panel>
      <p>Profile</p>
      <Panel>
        <p>Read</p>
        <Warning>Warning: Some endpoints require to be authenticated to work properly (Action History, isFollowedByMe...)</Warning>
        <input placeholder="Profile full handle" value={state.customProfileHandle} onChange={(e) => State.update({customProfileHandle: e.target.value})} />
        <br/>
        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            State.update({lastProfileResult: profile});
          })
        }}>Profile</button>

        <button onClick={() => {
          LensSDK.profile.fetchAll({
            where: {
              handles: [state.customProfileHandle]
            }
          }).then((profiles) => {
            State.update({lastProfileResult: profiles});
          })
        }}>Profiles</button>

        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            LensSDK.profile.following({
              for: profile.id
            }).then((paginatedResult) => {
              State.update({lastProfileResult: paginatedResult});
            });
          });
        }}>Following</button>

        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            LensSDK.profile.followers({
              of: profile.id
            }).then((paginatedResult) => {
              State.update({lastProfileResult: paginatedResult});
            });
          });
        }}>Followers</button>

        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            LensSDK.profile.stats({
              forProfileId: profile.id || LensSDK.getProfileId() || "0x01ccf2"
            }).then((stats) => {
              State.update({lastProfileResult: stats});
            });
          });
        }}>Stats</button>

        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            LensSDK.profile.recommendations({
              for: profile.id || LensSDK.getProfileId() || "0x01ccf2"
            }).then((recommendations) => {
              // Too many recommendations, picking just one for testing purposes
              let randomProfile = Math.floor(Math.random() * recommendations.profiles.length);

              State.update({lastProfileResult: recommendations.profiles[randomProfile]});
            });
          });
        }}>Profile Recommendations</button>

        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            LensSDK.profile.interests({
              forProfileId: profile.id || LensSDK.getProfileId() || "0x01ccf2"
            }).then((interests) => {

              State.update({lastProfileResult: interests});
            });
          });
        }}>Interests</button>

        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            LensSDK.profile.onChainIdentity({
              forProfileId: profile.id || LensSDK.getProfileId() || "0x01ccf2"
            }).then((interests) => {
              State.update({lastProfileResult: interests});
            });
          });
        }}>On-Chain Identity</button>

        <button onClick={() => {
          LensSDK.profile.isHandleAvailable(state.customProfileHandle).then((status) => {
            State.update({lastProfileResult: status.toString()});
          })
        }}>Is handle available</button>

        <button onClick={() => {
          LensSDK.profile.history({
            forProfileId: LensSDK.getProfileId()
          }).then((interests) => {
            State.update({lastProfileResult: interests});
          });
        }}>Action History</button>

        <button onClick={() => {
          LensSDK.profile.isFollowedByMe({
            forHandle: state.customProfileHandle
          }).then((isFollowedByMe) => {
            State.update({lastProfileResult: isFollowedByMe.toString()});
          });
        }}>Profile is followed by me</button>

        <button onClick={() => {
          LensSDK.profile.isFollowingMe({
            forHandle: state.customProfileHandle
          }).then((isFollowingMe) => {
            State.update({lastProfileResult: isFollowingMe.toString()});
          });
        }}>Profile is following me</button>

        <button onClick={() => {
          LensSDK.profile.isBlockedByMe({
            forHandle: state.customProfileHandle
          }).then((isBlockedByMe) => {
            State.update({lastProfileResult: isBlockedByMe.toString()});
          });
        }}>Profile is blocked by me</button>

        <button onClick={() => {
          LensSDK.profile.canFollow({
            forHandle: state.customProfileHandle
          }).then((canFollow) => {
            State.update({lastProfileResult: canFollow.toString()});
          });
        }}>Can follow profile</button>

        <button onClick={() => {
          LensSDK.profile.canUnfollow({
            forHandle: state.customProfileHandle
          }).then((canUnfollow) => {
            State.update({lastProfileResult: canUnfollow.toString()});
          });
        }}>Can unfollow profile</button>

        <button onClick={() => {
          LensSDK.profile.canUnblock({
            forHandle: state.customProfileHandle
          }).then((canUnblock) => {
            State.update({lastProfileResult: canUnblock.toString()});
          });
        }}>Can unblock profile</button>

        <button onClick={() => {
          LensSDK.profile.hasBlockedMe({
            forHandle: state.customProfileHandle
          }).then((hasBlockedMe) => {
            State.update({lastProfileResult: hasBlockedMe.toString()});
          });
        }}>Profile has blocked me</button>

        <br/><br/>
        <Response>
          {state.lastProfileResult ? JSON.stringify(state.lastProfileResult) : "Nothing to show yet"}
        </Response>
      </Panel>
      <br/><br/>
      <Panel>
        <p>Write</p>
        <Warning>Warning: <a href="#authenticate">Authentication</a> required. Requests perform real actions.</Warning>
        <button onClick={() => {
          LensSDK.profile.block({
            profiles: ["0x73b1"]
          }).then((result) => {
            State.update({lastProfileWriteResult: result});
          });
        }}>Block profile</button>

        <button onClick={() => {
          LensSDK.profile.report({
            for: "0x73b1",
            reason: {
              spamReason: {
                reason: "SPAM",
                subreason: "REPETITIVE"
              }
            },
            additionalComments: "Test API Integration"
          }).then((result) => {
            State.update({lastProfileWriteResult: result.toString()});
          });
        }}>Report profile</button>

        <br/><br/>
        <Response>
          {state.lastProfileWriteResult ? JSON.stringify(state.lastProfileWriteResult) : "Nothing to show yet"}
        </Response>
      </Panel>
    </Panel>
    <Panel>
      <p>Publication</p>
      <Warning>Warning: Some endpoints require to be authenticated to work properly</Warning>
      <Panel>
        <p>Read</p>
        <button onClick={() => {
          LensSDK.publication.fetch({
            forId: state.testPublication
          }).then((publication) => {
            State.update({lastPublicationReadResult: publication});
          });
        }}>Publication</button>
        <button onClick={() => {
          LensSDK.publication.fetchAll({
            where: {
              from: LensSDK.getProfileId() || "0x01"
            }
          }).then((publication) => {
            State.update({lastPublicationReadResult: publication});
          });
        }}>Publications</button>

        <button onClick={() => {
          LensSDK.publication.stats({
            publication: {
              forId: state.testPublication
            },
            stats: {
              customFilters: ["GARDENERS"],
              metadata: {
                locale: "en",
                mainContentFocus: "TEXT_ONLY"
              }
            }
          }).then((publication) => {
            State.update({lastPublicationReadResult: publication});
          });
        }}>Stats</button>

        <button onClick={() => {
          LensSDK.publication.whoActed({
            on: state.testPublication
          }).then((profiles) => {
            State.update({lastPublicationReadResult: profiles});
          });
        }}>Who acted</button>

        <button onClick={() => {
          LensSDK.publication.comments({
            forId: state.testPublication
          }).then((comments) => {
            State.update({lastPublicationReadResult: comments});
          });
        }}>Comments</button>

        <button onClick={() => {
          LensSDK.publication.mirrors({
            forId: state.testPublication
          }).then((mirrors) => {
            State.update({lastPublicationReadResult: mirrors});
          });
        }}>Mirrors</button>

        <button onClick={() => {
          LensSDK.publication.quotes({
            forId: state.testPublication
          }).then((quotes) => {
            State.update({lastPublicationReadResult: quotes});
          });
        }}>Quotes</button>
        <br/><br/>

        <Response>
          {state.lastPublicationReadResult ? JSON.stringify(state.lastPublicationReadResult) : "Nothing to show yet"}
        </Response>
      </Panel>

      <Panel>
        <p>Write</p>
        <button onClick={() => {
            LensSDK.publication.reactions.add({
              reaction: "UPVOTE",
              for: state.testPublication
            }).then((result) => {
              State.update({lastPublicationWriteResult: result.toString()});
            });
          }}>Add reaction (Up Vote)</button>

          <button onClick={() => {
            LensSDK.publication.reactions.remove({
              reaction: "UPVOTE",
              for: state.testPublication
            }).then((result) => {
              State.update({lastPublicationWriteResult: result.toString()});
            });
          }}>Remove reaction (Up vote)</button>

          <button onClick={() => {
            LensSDK.publication.reactions.add({
              reaction: "DOWNVOTE",
              for: state.testPublication
            }).then((result) => {
              State.update({lastPublicationWriteResult: result.toString()});
            });
          }}>Add reaction (Down Vote)</button>

          <button onClick={() => {
            LensSDK.publication.reactions.remove({
              reaction: "DOWNVOTE",
              for: state.testPublication
            }).then((result) => {
              State.update({lastPublicationWriteResult: result.toString()});
            });
          }}>Remove reaction (Down vote)</button>

          <button onClick={() => {
            LensSDK.publication.hide({
              for: state.testPublication
            }).then((result) => {
              State.update({lastPublicationWriteResult: result});
            });
          }}>Hide post</button>

          <button onClick={() => {
            LensSDK.publication.report({
              for: state.testPublication,
              reason: {
                spamReason: {
                  reason: "SPAM",
                  subreason: "REPETITIVE"
                }
              },
              additionalComments: "Test API Integration"
            }).then((result) => {
              State.update({lastPublicationWriteResult: result});
            });
          }}>Report post</button>
          
          <br/><br/>
          <Response>
            {state.lastPublicationWriteResult ? JSON.stringify(state.lastPublicationWriteResult) : "Nothing to show yet"}
          </Response>
      </Panel>
    </Panel>

    <Panel>
      <p>Search</p>

      <Panel>
        <p>Search profiles</p>
        <input type="text" value={state.searchProfileTerm} onChange={(e) => State.update({ searchProfileTerm: e.target.value })}/>
        <button onClick={() => {
          LensSDK.search.profiles({
            query: state.searchProfileTerm
          }).then((searchResult) => {
            State.update({lastProfileSearchResult: searchResult});
          });
        }}>Search profiles</button>
        <br/><br/>
        
        <Response>
          {state.lastProfileSearchResult ? JSON.stringify(state.lastProfileSearchResult) : "Nothing to show yet"}
        </Response>
      </Panel>

      <Panel>
        <p>Search publications</p>
        <input type="text" value={state.searchPublicationTerm} onChange={(e) => State.update({ searchPublicationTerm: e.target.value })}/>
        <button onClick={() => {
          LensSDK.search.publications({
            limit: Constants.API_REQUEST_LIMITS.TEN,
            query: state.searchPublicationTerm,
            where: {
              metadata: {
                locale: "en"
              }
            }
          }).then((searchResult) => {
            State.update({lastPublicationSearchResult: searchResult});
          });
        }}>Search publications</button>
        <br/><br/>
        
        <Response>
          {state.lastPublicationSearchResult ? JSON.stringify(state.lastPublicationSearchResult) : "Nothing to show yet"}
        </Response>
      </Panel>
    </Panel>
    <Panel>
      <p>Notifications</p>
      <Warning>Warning: To fetch notifications you need to be authenticated</Warning>
      <button onClick={() => {
          LensSDK.notifications.fetch({
            where: {
              customFilters: ["GARDENERS"]
            }
          }).then((notifications) => {
            State.update({lastNotificationResult: notifications});
          });
        }}>Fetch</button>

        <br/><br/>
        <Response>
          {state.lastNotificationResult ? JSON.stringify(state.lastNotificationResult) : "Nothing to show yet"}
        </Response>
    </Panel>
    <Panel>
      <p>Transactions</p>
      <input type="text" value={state.transactionHash} />
      <button onClick={() => {
        LensSDK.transaction.status({
          forTxHash: state.transactionHash
        }).then((result) => {
          State.update({lastTransactionResult: result});
        });
      }}>Transaction status</button>
      <br/><br/>

      <input type="text" placeholder="Relay Transaction ID" value={state.transactionId} />
      <button onClick={() => {
        LensSDK.transaction.txIdToTxHash({
          for: state.transactionId
        }).then((result) => {
          State.update({lastTransactionResult: result.toString()});
        });
      }}>Transaction ID to Transaction Hash</button>

      <br/><br/>
      <Response>
        {state.lastTransactionResult ? JSON.stringify(state.lastTransactionResult) : "Nothing to show yet"}
      </Response>
    </Panel>
    <Panel>
      <p>Custom request</p>
      <textarea placeholder="Graphql query/mutation" value={state.customRequest} onChange={(e) => State.update({customRequest: e.target.value})}></textarea>
      <textarea placeholder="Request parameters" value={state.customRequestParameters} onChange={(e) => State.update({customRequestParameters: e.target.value})}></textarea>
      <button onClick={() => {
        LensSDK.customRequest(state.customRequest, JSON.parse(state.customRequestParameters)).then((result) => {
          State.update({lastCustomRequestResult: result});
        });
      }}>Send request</button>
      <br/><br/>
      <Response>
        {state.lastCustomRequestResult ? JSON.stringify(state.lastCustomRequestResult) : "Nothing to show yet"}
      </Response>
    </Panel>
  </>
);
