function sendEmail() {
  const recipient = "Yardi.Transitions@rmrgroup.com";
  const userEmail = document.getElementById("user-email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!userEmail || !subject || !message) {
    alert("Please complete all fields before sending.");
    return;
  }

  const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + userEmail + "\n\n" + message)}`;

  // Opens the default email client
  window.location.href = mailtoLink;
}
