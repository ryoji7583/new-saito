$(document).ready(function(){
    reloadList();

    //ここから下を追加
    $(".nyuukabtn").on('click', function(){
        var input = $("#nyuuka").serializeJson();

        Zaiko.receiveItem(input, function(reply){
            $(".nyuukamsg").text(input.name + "を" + input.amount + "個入荷しました");
                reloadList();
        });
    });
});

function reloadList(){
    Zaiko.getItemList(function(reply){
        var $list = $("#list");

        //表をクリア
        $list.empty();
        $list.append("<tr><th>商品名</th><th>個数</th><th>出荷</th></tr>");

        for(var i=0; i<reply.length; i++){
            var $inputAmount = $("<input></input>").attr("type", "text");
            var $exbtn = $("<button></button>").text("出荷");

            //ボタンにイベントを登録
            $exbtn.on('click', {sname:reply[i].name, $inputAmount}, function(e){
                syukka(e.data.sname, e.data.$inputAmount.val());
            });

            //表に追加
            //商品名にリンクを追加する
            $list.append($("<tr></tr>").append(
                $("<td></td>").append($("<a></a>").text(reply[i].name)
                        .attr("href", "history.html?item=" + reply[i].name)),
                $("<td></td>").text(reply[i].amount),
                $("<td></td>").append($inputAmount, $exbtn)
            ));
        }
    });
}

//syukka関数追加
function syukka(name, amount){
    Zaiko.issueItem({name, amount}, function(reply){
        if( reply ){
            alert(name + "を" + amount + "個出荷しました");
            reloadList();
        }else{
            alert("在庫が足りません");
        }
    });
}