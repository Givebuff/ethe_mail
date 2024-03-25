var address;
var check;
var savedAddress = ""; //현재 address저장
var loadTimer;

// Checking if Web3 has been injected by the browser (Mist/MetaMask)
if (typeof web3 !== 'undefined') {
// Use Mist/MetaMask's provider
  window.web3 = new Web3(web3.currentProvider);
  startApp();
}
else {
  logout();
}

function startApp(){

  var contractAddress = '0xbcd13b58f81ea725d1f03a2d1becd7c9b6a8a5f5';
  var abi = [{"constant":false,"inputs":[],"name":"allRemove","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"aim","type":"address"},{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"time","type":"uint256"}],"name":"appendString","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"remove","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getStringAtIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"}];
  var message = web3.eth.contract(abi).at(contractAddress);

  addressCheck =  setInterval(function() {
    //matamask 로그인 확인
    web3.eth.getCoinbase(function(e, rAddress) {
      if (rAddress != null) {
        address = rAddress;
        check = 1;
      }
      else {
        address = null;
        check = 1;
      }
      if (savedAddress != rAddress && address != null) {
        savedAddress = rAddress;
      }
    });
  },500);

  Check =  setInterval(function() {
    if (check == 1) {
      clearInterval(Check);
      startView();
    }
  },500);
}


function startView() {
  //matamask 로그인 확인
  if (address == null) {
    logout();
  }
  else if (address != null) {
    login();
  }
}
// 로그인 상태
function login() {
  document.getElementsByTagName("body")[0].innerHTML = `
  <body>
    <div class="login">
      <form action = "/sending" method = "post">
        <div class="account_address_form">
          <div class="h1">${address}</div>
          <div class='start-div'></div>
          <a href="/etheMail" class="button">로그인!</a>
      </form>
    </div>
  </body>`;

  loginCheck = setInterval(function() {
    if (savedAddress != address) {
      clearInterval(loginCheck);
      startView();
    }
  },500);
}
// 로그아웃 상태
function logout() {
    document.getElementsByTagName("body")[0].innerHTML = `
    <body>
      <div>
        <span id="account_no_address">You don't have metamask<br><br>Please, install <a href="https://metamask.io/" target="_blank">metamask</a> using <a href="https://www.google.co.kr/chrome/browser/desktop/index.html" target="_blank">chrome</a></span>
      </div>
      </body>`;
    logoutCheck = setInterval(function() {
      if (address != null) {
        clearInterval(logoutCheck);
        startView();
      }
    },500);
}
