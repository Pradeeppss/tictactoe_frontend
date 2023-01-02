import emailjs from "@emailjs/browser";

let Sendmail = (mailData) => {
  emailjs
    .send("service_wzvussn", "template_v7jg2pl", mailData, "aEUXRxHcXCOk2kTEP")
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default Sendmail;
