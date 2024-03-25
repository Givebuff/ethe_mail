var contractAddress;
var abi;
var message;
var address;

setInterval(function() {
  contractAddress = '0xbcd13b58f81ea725d1f03a2d1becd7c9b6a8a5f5';
  abi = [{"constant":false,"inputs":[],"name":"allRemove","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"aim","type":"address"},{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"time","type":"uint256"}],"name":"appendString","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"remove","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getStringAtIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"}];
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    message = web3.eth.contract(abi).at(contractAddress);

    web3.eth.getCoinbase(function(e, rAddress) {
      //로그인 상태
          if (rAddress != null) {
            address = rAddress;
            document.getElementsByTagName("div")[1].innerHTML = `
            <div style="display: none;">
            <textarea id="myClipboard"></textarea></div>
            <input id='account_address' name='account_address' type='text' value='${rAddress}' style="display:none;"readonly />
            <div class="sidebar_width">
              <div class="sidebar-header header-cover" style="background-image: url(http://img6.uploadhouse.com/fileuploads/17737/17737075bdad5cfa9423bb2c3c2beee695c72bb8.jpg)";>
                  <div class="sidebar-image">
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/53474/atom_profile_01.jpg">
                  </div>
                  <div class='sidebar-brand'>
                    <input class='address-style' id="aasd" onclick="CopyToClipboard( this, myClipboard )"  type="text" size=30""  name='account_address' value='${rAddress}' readonly/>
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
          </div>`;
          }
          //로그아웃 상태
          else {
            alert("You don't have metamask Please, install metamask using chrome");
            history.back();
          }
    });
  }
}, 500);

function CopyToClipboard ( tagToCopy, textarea ){

    textarea.parentNode.style.display = "block";

    var textToClipboard = "";
    if ( "value" in tagToCopy ){    textToClipboard = tagToCopy.value;    }
    else {    textToClipboard = ( "innerText" in tagToCopy ) ? tagToCopy.innerText : tagToCopy.textContent;    }

    var success = false;

    if ( window.clipboardData ){
            window.clipboardData.setData ( "Text", textToClipboard );
            success = true;
    }
    else {
            textarea.value = textToClipboard;

            var rangeToSelect = document.createRange();

            rangeToSelect.selectNodeContents( textarea );

            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange( rangeToSelect );

            success = true;

            try {
                if ( window.netscape && (netscape.security && netscape.security.PrivilegeManager) ){
                    netscape.security.PrivilegeManager.enablePrivilege( "UniversalXPConnect" );
                }

                textarea.select();
                success = document.execCommand( "copy", false, null );
            }
            catch ( error ){  success = false;  }
    }

    textarea.parentNode.style.display = "none";
    textarea.value = "";

    if ( success ){ alert( ' 클립보드에 복사되었습니다. \n "Ctrl+v"를 사용하여 원하는 곳에 붙여넣기 하세요. ' ); }
    else {    alert( " 복사하지 못했습니다. " );    }
}
