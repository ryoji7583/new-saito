$(document).ready(function(){
    var item = decodeURI(getUrlParameter().item);

    if( item ){
        loadItemHistory(item);
    }else{
        alert("itemを指定してください");
    }
});

function getUrlParameter(){
    var arg = new Object;
    var pair=location.search.substring(1).split('&');
    for(var i=0;pair[i];i++) {
        var kv = pair[i].split('=');
        arg[kv[0]]=kv[1];
    }

    return arg;
}

function loadItemHistory(itemName){
    Zaiko.getItemHistory(itemName, function(reply){
        var $table = $(".history-table");

        $table.empty();
        $table.append("<tr><th>出/入</th><th>個数</th><th>時刻</th></tr>");

        for(var i=0; i<reply.length; i++){
            $table.append($("<tr></tr>").append(
                $("<td></td>").text(reply[i].amount < 0 ? "出荷" : "入荷"),
                $("<td></td>").text(Math.abs(reply[i].amount)),
                $("<td></td>").text(reply[i].time)
            ));
        }
    });
}