$(function() {
  $("#First").focus();
});
$(document).ready(function() {
  $("#click-this").click(handler);
});

function handler() {
  var listclear = $('dl');
  listclear.empty();
  lastName =  document.getElementById("Last").value
  firstName = document.getElementById("First").value
  extension = document.getElementById("Extension").value
// and remember the jqxhr object for this request
    console
   if (lastName || firstName || extension != "") {
        var jqxhr = $.get( "https://lkftcmp01.ad.spectrumhhi.com:8443/ccmcip/xmldirectorylist.jsp", {l:lastName,f:firstName,n:extension}, function(data) {
        })
        .done(function(data){

            var list = $('dl');
            list.append ('<hr><br>');
            // data is a xml document now, so we query it...
            $(data)
              // and search for all <field> elements
              .find('DirectoryEntry')
              // now we can play with each <field>
              .each(function(index, element){
                // as example we query & store the field
                var field = $(element)
                // get the values we want
                var Name = field.find('Name').text()
                var Telephone = field.find('Telephone').text()
                // and append some html in the <dl> element we stored previously
                list
                  .append('<dt>'+Name+': </dt>')
                  .append('<dd>'+Telephone+'</dd>')
            ;
          });
          $(data)
              // and search for all <field> elements
              .find('CiscoIPPhoneDirectory')
              // now we can play with each <field>
              .each(function(index, element){
                // as example we query & store the field
                var field = $(element)
                console.log(field.find('Prompt').text());
                if (field.find('Prompt').text() == "No records match") {
                    list.append('<dt>'+"No Results"+'</dt>');
                };
            });
          })
         
        .fail(function(data){
            console.log(data);
            var listclear = $('dl');
            listclear.empty();
            listclear.append ('<hr><br>');
            listclear.append('<dt style=\'color:red\'>'+"Error! Have you accepted the SSL certificate? <br> <a style=\'color:#000000\' target=\"_blank\" href=\"https://lkftcmp01.ad.spectrumhhi.com:8443/ccmcip\">Click Here</a>"+'</dt>');
        });
    }
    else {
        var listclear = $('dl');
        listclear.empty();
        listclear.append ('<hr><br>');
        listclear.append('<dt style=\'color:red\'>'+"Enter text in at least 1 field"+'</dt>');
    }

 
}

$('input[type=text]').on('keyup', function(e) {
    if (e.which == 13) {
        handler();
    }
});

