function counterChilds(){

    var cSuggestions = 0;
    var cLog = 0;

    let ref = firebase.database().ref('/suggestions/');
    ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if(childSnapshot.key != ""){
                cSuggestions++
            }
            $(".cardSuggestions h1").text(cSuggestions);
        });
    });

    ref = firebase.database().ref('/log/');
    ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if(childSnapshot.key != ""){
                cLog++;
            }
          $(".cardLog h1").text(cLog);
        });
    });

    
    

}

