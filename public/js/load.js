var address;
var check = 0;
var savedAddress = ""; //현재 address저장
var index = 0; //0 ~ maxIndex
var maxIndex = 0; //메일 총 수
var countIndex; //maxIndex ~ 0
var loadTimer;
var information = new Array();

// Checking if Web3 has been injected by the browser (Mist/MetaMask)
if (typeof web3 !== 'undefined') {
// Use Mist/MetaMask's provider
  window.web3 = new Web3(web3.currentProvider);
  startApp();
}

function startApp(){
  loadTimer =  setInterval(function() {

    var contractAddress = '0xbcd13b58f81ea725d1f03a2d1becd7c9b6a8a5f5';
    var abi = [{"constant":false,"inputs":[],"name":"allRemove","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"aim","type":"address"},{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"time","type":"uint256"}],"name":"appendString","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"remove","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getStringAtIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"}];
    var message = web3.eth.contract(abi).at(contractAddress);
    //matamask 로그인 확인
    web3.eth.getCoinbase(function(e, rAddress) {
      if (rAddress != null) { //로그인 된 경우
        address = rAddress;
      }
      else {
        address = null;
        check = 1;
      }
      if (savedAddress != rAddress) {
        var information = new Array();
        savedAddress = rAddress;
      }
    });
    // 로그인 상태
    if (address != null) {
      message.getCount(function(e,ret) {
        maxIndex = ret.c-1;
        countIndex = ret.c-1;
      });


      var list = '';
      //받은 메일을 배열에 push
      while (countIndex >= 0) {
        message.getStringAtIndex(countIndex,function(e,r) {
          if (information.length < countIndex+1) {
            if (r[0] != null) {
              information.push([r[0], r[1], r[3] * 1000]);
            }
          }
        });
        countIndex--;
        }

        if (information[0] != null) {

          information.sort(function(a,b){
            return b[2] - a[2];
          });

          while (maxIndex > -1) {
            text(information, maxIndex);
            maxIndex--;
          }
        }


      //html 동적으로 작성
      function text(information, maxIndex) {
        var date = new Date(information[index][2]);

        list = list + `
        <tr>
        <td><input type='radio' name="remove_chk" value="${maxIndex+1}" onclick="removeChk_click()" /></td>

        <div>
          <td><input id='sender' class='text-design' type='text' size="40" value='${information[index][0]}' readonly /></td>
          <th>
          <form id="frm${maxIndex}" action = "/etheMail_receive" method = "get">
          <a id='title' href="#" onclick="document.getElementById('frm${maxIndex}').submit();">${information[index][1]}</a>
          <input type="text" name="index" value=${maxIndex} style="display:none;">
          </form>
          </th>
          <td><input id='time' class='text-design' type='text' value='${date.getFullYear() + '-'+ (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}' readonly /></td>
        </div>

        </tr>
        `;
        index++;
      }

      document.getElementsByTagName("body")[0].innerHTML = `
      <aside id="sidebar" class="sidebar sidebar-default open" style="display: flex; flex-direction: row; width: 100vw;" role="navigation">
    <!-- Sidebar header -->
    <div class="sidebar_width">
      <div class="sidebar-header header-cover" style="background-image: url(http://img6.uploadhouse.com/fileuploads/17737/17737075bdad5cfa9423bb2c3c2beee695c72bb8.jpg)";>
          <div class="sidebar-image">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/53474/atom_profile_01.jpg">
          </div>
          <div class='sidebar-brand'>
            <input id='account_address' class='address-design' type='text' size="30" value='${address}' readonly>
          </div>
      </div>

      <ul class="nav sidebar-nav">
          <li>
          <form action = "/etheMaill_send" method = "get">
          <button class="send">send</button>
        </form>
          </li>
          <li>
          <form action = "/etheMail" method = "get">
          <button class="send">list</button>
        </form>
          </li>
      </ul>
  </div>
  <div class="div-frame"></div>
  <div class='wrapper'>
    <input id="removeBtn" type='button' onclick="removeBtn_click();" value="삭제" />
    <input id="allRemoveBtn" type='button' onclick="allRemoveBtn_click();" value="모두삭제" />
    <table>
     <thead>
      <tr>
        <th></th>
        <th>보낸사람</th>
        <th>제목</th>
        <th>시간</th>
      </tr>
    </thead>
    <div class="list_form">
      ${list}
    </div>
    </table>
  </div>
</aside>`;
    }
    // 로그아웃 상태
    else if (check == 1) {
      document.getElementsByTagName("body")[0].innerHTML = `
      <body>
      <div>
        <span id="account_no_address">You don't have metamask<br><br>Please, install <a href="https://metamask.io/" target="_blank">metamask</a> using <a href="https://www.google.co.kr/chrome/browser/desktop/index.html" target="_blank">chrome</a></span>
      </div>
      </body>`;
    }
    index = 0;
  },800);
}
