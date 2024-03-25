window.onload = function () {
  var link;

  document.getElementsByTagName("body")[0].innerHTML = `
  <aside id="sidebar" class="sidebar sidebar-default open" style="display: flex; flex-direction: row; width: 100vw;" role="navigation">
<!-- Sidebar header -->
<div class="sidebar_width">
  <div class="sidebar-header header-cover" style="background-image: url(http://img6.uploadhouse.com/fileuploads/17737/17737075bdad5cfa9423bb2c3c2beee695c72bb8.jpg)";>
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
    <div id="receive_form">
      보낸사람: <input id="send_address" class='receive-text' size="50" readonly><br>
      <div class='frame-div'></div>
      제목: <input id="receive_title" class='receive-text' type="text" readonly><br>
    </div>
    <div class='frame-div'></div>
    <hr>
    <div class='frame-div'></div>
    <div id="iframe">
      <iframe id="receive_contents" class='iframe-style' width="600" height="300" frameborder=0 framespacing=0 marginheight=0 marginwidth=0 scrolling=no vspace=0></iframe>
    </div>
    </div>
    </aside>`;

  aa = setInterval(function() {

    var contractAddress = '0xbcd13b58f81ea725d1f03a2d1becd7c9b6a8a5f5';
    var abi = [{"constant":false,"inputs":[],"name":"allRemove","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"aim","type":"address"},{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"time","type":"uint256"}],"name":"appendString","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"remove","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getStringAtIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"}];

    var message;

    //js를 이용하여 get의 query받기
    function Request(valuename) {
      var rtnval;
      var nowAddress = unescape(location.href);
      var parameters = new Array();
      parameters = (nowAddress.slice(nowAddress.indexOf("?")+1,nowAddress.length)).split("&");

      for(var i = 0 ; i < parameters.length ; i++){
        if(parameters[i].indexOf(valuename) != -1){
          rtnval = parameters[i].split("=")[1];

          if(rtnval == undefined || rtnval == null){
            rtnval = "";
          }
          return rtnval;
        }
      }
    }

    var index = Request("index");

    window.web3 = new Web3(web3.currentProvider);
    message = web3.eth.contract(abi).at(contractAddress);
    //컨트랙트에서 내용 받기
    message.getStringAtIndex(index,function(e,r) {
      try {
        document.getElementById('send_address').value = r[0];
        document.getElementById('receive_title').value = r[1];
        //document.getElementById('receive_contents').innerHTML = r[2];
        link = "https://gateway.ipfs.io/ipfs/"+r[2];

      } catch (exception) {
        alert("error");
        //history.back()
      };
    });


    if (link != null) {
      document.getElementById("iframe").innerHTML = `
      <iframe id="receive_contents" class='iframe-style' src=${link} width="600" height="300"frameborder=0 framespacing=0 marginheight=0 marginwidth=0 scrolling=no vspace=0></iframe>`;
      clearInterval(aa);
    }
  }, 1000);

}
