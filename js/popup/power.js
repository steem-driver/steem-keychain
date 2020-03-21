async function preparePowerUpDown() {
  const SP = numberWithCommas(await activeAccount.getSP()) + "    SP";
  const STEEM = numberWithCommas(await activeAccount.getSteem()) + " STEEM";
  $(".power_sp").html(SP);
  $(".power_steem").html(STEEM);
  const [
    withdrawn,
    total_withdrawing,
    next_vesting_withdrawal
  ] = await activeAccount.getPowerDown();

  if (total_withdrawing !== 0 && withdrawn !== total_withdrawing) {
    $("#powerdown_div .power")
      .eq(1)
      .show();
    $("#powering_down").html(withdrawn + " / " + total_withdrawing + " SP");
    $("#powering_down").attr(
      "title",
      chrome.i18n.getMessage("popup_next_powerdown", [next_vesting_withdrawal])
    );
  } else {
    $("#powerdown_div .power")
      .eq(1)
      .hide();
  }

  if (!activeAccount.hasKey("active")) {
    $("#power_up").addClass("disabled");
    $("#wrap_power_up").attr("title", chrome.i18n.getMessage("popup_pu_key"));
    $("#power_down").addClass("disabled");
    $("#wrap_power_down").attr("title", chrome.i18n.getMessage("popup_pd_key"));
  } else {
    $("#power_up").removeClass("disabled");
    $("#power_down").removeClass("disabled");
    $("#wrap_power_up").removeAttr("title");
    $("#wrap_power_down").removeAttr("title");
  }
  $("#power_up")
    .unbind("click")
    .click(function() {
      const amount = parseFloat($("#amt_pu").val()).toFixed(3) + " STEEM";
      $("#power_up").hide();
      $("#powerup_loading").show();
      activeAccount.powerUp(amount, $("#user_pu").val(), (err, result) => {
        console.log(err, result);
        $("#power_up").show();
        $("#powerup_loading").hide();
        if (err) {
          showError(chrome.i18n.getMessage("unknown_error"));
        } else {
          showConfirm(chrome.i18n.getMessage("popup_pu_success"));
          loadAccount(activeAccount.getName());
        }
      });
    });

  $("#power_down")
    .unbind("click")
    .click(function() {
      $("#power_down").hide();
      $("#powerdown_loading").show();
      activeAccount.powerDown($("#amt_pd").val(), function(err, result) {
        console.log(err, result);
        $("#power_down").show();
        $("#powerdown_loading").hide();
        if (err) {
          showError(chrome.i18n.getMessage("unknown_error"));
        } else {
          if ($("#amt_pd").val() !== "0")
            showConfirm(chrome.i18n.getMessage("popup_pd_success"));
          else showConfirm(chrome.i18n.getMessage("popup_pd_stop"));
          loadAccount(activeAccount.getName());
        }
      });
    });
}
