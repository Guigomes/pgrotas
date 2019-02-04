(function () {
    "use strict";
  
    angular.module("app").factory("Chat", Chat);
  
    function Chat() {
      return {
        listarConversas: listarConversas
       
      };
  
    
  
      function listarConversas() {
        let userId = firebase.auth().currentUser.uid;
        var response = [];
        return firebase.database().ref('conversas/').orderByChild("user1").equalTo(userId.toString()).once("value").then(function (user1) {
            if(user1.val() != null){
            response.push(user1.val());
            }
            return firebase.database().ref('conversas/').orderByChild("user2").equalTo(userId.toString()).once("value").then(function (user2) {
                if(user1.val() != null){
                response.push(user2.val());
                }
                return response;    
          
        });
      });
     }
  
    }
  })();