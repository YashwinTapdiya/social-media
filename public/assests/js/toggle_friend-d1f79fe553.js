{let e=function(){let e=$("#toggle-friend");e.click((function(l){l.preventDefault(),$.ajax({type:"POST",url:$(e).attr("href")}).done((function(e){0==e.data.deleted?n():t()})).fail((function(e){console.log("error in completing the request")}))}))},t=function(){document.getElementById("friend-style");document.getElementById("toggle-friend").innerText="Add Friend"},n=function(){let e=document.getElementById("friend-style");document.getElementById("toggle-friend").innerText="Remove Friend",e.style.color="white"};e()}