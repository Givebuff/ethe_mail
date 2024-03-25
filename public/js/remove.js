var value;

var contractAddress = '0xbcd13b58f81ea725d1f03a2d1becd7c9b6a8a5f5';
var abi = [{"constant":false,"inputs":[],"name":"allRemove","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"aim","type":"address"},{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"time","type":"uint256"}],"name":"appendString","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"remove","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getStringAtIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"}];
var message = web3.eth.contract(abi).at(contractAddress);

function removeChk_click() {
    clearInterval(loadTimer);
    var remove_chk = document.getElementsByName("remove_chk");
    for (var i = 0; i <= maxIndex; i++) {
      if (remove_chk[i].checked == true) {
        value = remove_chk[i].value;
        console.log(value);
      }
    }
}

function removeBtn_click() {
  console.log(value-1);
  message.remove(value-1,function(e,r) {
    top.document.location.reload();
  });
}

function allRemoveBtn_click() {
  message.allRemove(function(e,r) {
    top.document.location.reload();
  });
}
