$(function() {

    var form = document.getElementById("contactForm");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      data['message'] = "You have received a new message from your website contact form.\n\nHere are the details:\n\nName: "+ data['name'] + "\n\nEmail: " + data['email'] + "\n\nPhone: "+data['phone']+"\n\nMessage:\n"+data['message'];
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)
});




/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
