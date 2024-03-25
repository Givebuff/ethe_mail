window.onload = function () {
  var sendBtns = document.querySelectorAll('.send');
  var seconds;

  var contractAddress = '0xbcd13b58f81ea725d1f03a2d1becd7c9b6a8a5f5';
  var abi = [{"constant":false,"inputs":[],"name":"allRemove","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"aim","type":"address"},{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"time","type":"uint256"}],"name":"appendString","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"remove","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getStringAtIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"}];

  var sendMessage;



    //보낸 시간
    setInterval(function() {
      seconds = new Date().getTime() / 1000;
      sendTime = String(Math.floor(seconds));
    },999);

    document.getElementsByTagName("body")[0].innerHTML = `
    <aside id="sidebar" class="sidebar sidebar-default open" style="display: flex; flex-direction: row; width: 100vw;" role="navigation">
  <!-- Sidebar header -->
  <div class="sidebar_width">
    <div class="sidebar-header header-cover" style="background-image: url(http://img6.uploadhouse.com/fileuploads/17737/17737075bdad5cfa9423bb2c3c2beee695c72bb8.jpg)";>

        <div class="sidebar-image">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/53474/atom_profile_01.jpg">
        </div>
        <a data-toggle="dropdown" class="sidebar-brand" href="#">
            ${address}
        </a>
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
<div class="receive_form">
  <div class="account_address_form">
</div>
  <div id="send_form">
    받는사람: <input id="send_address" name="send_address" size="90" type="text" placeholder="address"><br>
    <div class='frame-div'></div>
    제목:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="send_title" type="text" size="90" placeholder="title"><br>
    <div class='frame-div'></div>
    <button class="register" id="register" onclick="register();">register</button>
    <button class="memo" id="memo" onclick="openWin();">memo</button>
    <div class='frame-div'></div>
    <div>found in ipfs:</div>
    <div class="content" id="hash">[ipfs hash]</div>
    <div class='frame-div'></div>
  </div>
  <div>
    <textarea name="ir1" id="ir1" rows="10" cols="100"></textarea>
    <button id="store">add to ipfs</button>
    <button class="send" id="add_ethereum">add to ethereum</button>
  </div>
  <div id="smartEditor">
    <iframe id="send_contents" width="600" height="300" style="display:none;"></iframe>
  </div>
  <div id="temp">`;

    //스마트에디터
    var oEditors = [];
    nhn.husky.EZCreator.createInIFrame({
      oAppRef: oEditors,
      elPlaceHolder: "ir1",
      sSkinURI: "../smartedit/dist/SmartEditor2Skin.html",
      fCreator: "createSEditor2",
      htParams : {
              // 툴바 사용 여부 (true:사용/ false:사용하지 않음)
              bUseToolbar : true,
              // 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
              bUseVerticalResizer : true,
              // 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
              bUseModeChanger : true,
          }
    });
    //ipfs로 넣기
    $("#store").click(function(){
      oEditors.getById["ir1"].exec("UPDATE_CONTENTS_FIELD", []);
    });
    //블록체인에 넣기
    $("#add_ethereum").click(function(){
      var link = "https://gateway.ipfs.io/ipfs/" + document.getElementById("hash").innerHTML
      document.getElementById("smartEditor").innerHTML = `
      <iframe id="send_contents" src="${link}" width="600" height="300" style="display:none;"></iframe>`;
        var sendAddress = document.getElementById('send_address').value;
        if (sendAddress.search(/0x[a-zA-Z0-9]{40}/) != -1) {
          window.web3 = new Web3(web3.currentProvider);
          sendMessage = web3.eth.contract(abi).at(contractAddress);
          sendMessage.appendString(sendAddress, document.getElementById('send_title').value, document.getElementById("hash").innerHTML, sendTime, {gasPrice:web3.toWei(3, 'Gwei')}, function(e,r) {
          });
        }
      })
}

function openWin(){
  var address = document.getElementById('account_address').value;
  document.getElementById("temp").innerHTML = `
  <form  name="memo" action="" method ="post" >
    <input type="hidden" name="address" value="${address}">
  </form>`;
  window.open("about:blank", "새창", "location=no, titlebar=no, width=800, height=700, toolbar=no, menubar=no, resizable=yes" );
  var frm =document.memo;
  frm.action = '/memo';
  frm.target ="새창";
  frm.method ="post";
  frm.submit();
}

function register(){

  var send_address = document.getElementById("send_address").value;
  if (send_address.search(/0x[a-zA-Z0-9]{40}/) != -1) {
    var name = prompt(send_address,"이름을 입력해주세요.");
    var address = document.getElementById('account_address').value;
    document.getElementById("temp").innerHTML = `
    <form  name="memo" action="" method ="post" >
      <input type="hidden" name="address" value="${address}">
      <input type="hidden" name="send_address" value="${send_address}">
      <input type="hidden" name="name" value="${name}">
    </form>`;

    var frm =document.memo;
    frm.action = '/save';
    frm.method ="post";
    frm.submit();
  }
  else {
    alert("주소를 잘못 입력하였습니다.")
  }

}
