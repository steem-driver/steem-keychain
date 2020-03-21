const broadcastCreateProposal = data => {
  return new Promise((resolve, reject) => {
    let keys = {};
    keys[data.typeWif] = key;
    createProposal(
      keys,
      data.username,
      data.receiver,
      data.start,
      data.end,
      data.daily_pay,
      data.subject,
      data.permlink,
      data.extensions,
      (err, result) => {
        console.log(result, err);
        const err_message = beautifyErrorMessage(err);
        const message = createMessage(
          err,
          result,
          data,
          chrome.i18n.getMessage("bgd_ops_proposal_create"),
          err_message
        );
        resolve(message);
      }
    );
  });
};

const broadcastUpdateProposalVote = data => {
  return new Promise((resolve, reject) => {
    let voteKeys = {};
    voteKeys[data.typeWif] = key;
    voteForProposal(
      voteKeys,
      data.username,
      data.proposal_ids,
      data.approve,
      data.extensions,
      (err, result) => {
        console.log(result, err);
        const err_message = beautifyErrorMessage(err);
        const message = createMessage(
          err,
          result,
          data,
          data.approve
            ? chrome.i18n.getMessage("bgd_ops_proposal_vote", [
                JSON.parse(data.proposal_ids)[0]
              ])
            : chrome.i18n.getMessage("bgd_ops_proposal_unvote", [
                JSON.parse(data.proposal_ids)[0]
              ]),
          err_message
        );
        resolve(message);
      }
    );
  });
};

const broadcastRemoveProposal = data => {
  return new Promise((resolve, reject) => {
    let removeProposalKeys = {};
    removeProposalKeys[data.typeWif] = key;
    removeProposal(
      removeProposalKeys,
      data.username,
      data.proposal_ids,
      data.extensions,
      (err, result) => {
        console.log(result, err);
        const err_message = beautifyErrorMessage(err);
        const message = createMessage(
          err,
          result,
          data,
          chrome.i18n.getMessage("bgd_ops_proposal_remove", [
            JSON.parse(data.proposal_ids)[0]
          ]),
          err_message
        );
        resolve(message);
      }
    );
  });
};
