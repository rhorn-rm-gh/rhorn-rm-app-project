// Form validation and email sending functionality
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  const submitBtn = document.querySelector('.submit-btn');
  const btnText = document.querySelector('.btn-text');
  const btnLoading = document.querySelector('.btn-loading');
  const successMessage = document.getElementById('success-message');

  // Real-time validation
  const emailInput = document.getElementById('user-email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  if (emailInput) {
    emailInput.addEventListener('blur', () => validateEmail(emailInput.value));
    emailInput.addEventListener('input', () => clearError('email-error'));
  }

  if (subjectInput) {
    subjectInput.addEventListener('blur', () => validateSubject(subjectInput.value));
    subjectInput.addEventListener('input', () => clearError('subject-error'));
  }

  if (messageInput) {
    messageInput.addEventListener('blur', () => validateMessage(messageInput.value));
    messageInput.addEventListener('input', () => clearError('message-error'));
  }
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorElement = document.getElementById('email-error');
  
  if (!email.trim()) {
    showError('email-error', 'Email is required');
    return false;
  }
  
  if (!emailRegex.test(email)) {
    showError('email-error', 'Please enter a valid email address');
    return false;
  }
  
  clearError('email-error');
  return true;
}

function validateSubject(subject) {
  const errorElement = document.getElementById('subject-error');
  
  if (!subject.trim()) {
    showError('subject-error', 'Subject is required');
    return false;
  }
  
  if (subject.trim().length < 3) {
    showError('subject-error', 'Subject must be at least 3 characters long');
    return false;
  }
  
  clearError('subject-error');
  return true;
}

function validateMessage(message) {
  const errorElement = document.getElementById('message-error');
  
  if (!message.trim()) {
    showError('message-error', 'Message is required');
    return false;
  }
  
  if (message.trim().length < 10) {
    showError('message-error', 'Message must be at least 10 characters long');
    return false;
  }
  
  clearError('message-error');
  return true;
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.style.display = 'none';
  }
}

function validateForm() {
  const email = document.getElementById("user-email")?.value || '';
  const subject = document.getElementById("subject")?.value || '';
  const message = document.getElementById("message")?.value || '';

  const isEmailValid = validateEmail(email);
  const isSubjectValid = validateSubject(subject);
  const isMessageValid = validateMessage(message);

  return isEmailValid && isSubjectValid && isMessageValid;
}

function setLoadingState(isLoading) {
  const submitBtn = document.querySelector('.submit-btn');
  const btnText = document.querySelector('.btn-text');
  const btnLoading = document.querySelector('.btn-loading');

  if (submitBtn && btnText && btnLoading) {
    submitBtn.disabled = isLoading;
    
    if (isLoading) {
      btnText.style.display = 'none';
      btnLoading.style.display = 'flex';
    } else {
      btnText.style.display = 'block';
      btnLoading.style.display = 'none';
    }
  }
}

function showSuccessMessage() {
  const successMessage = document.getElementById('success-message');
  if (successMessage) {
    successMessage.style.display = 'block';
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
    
    // Scroll to success message
    successMessage.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }
}

function resetForm() {
  const form = document.querySelector('.contact-form');
  if (form) {
    // Clear all error messages
    ['email-error', 'subject-error', 'message-error'].forEach(clearError);
    
    // Reset form fields (except subject which has a default value)
    const emailInput = document.getElementById('user-email');
    const messageInput = document.getElementById('message');
    
    if (emailInput) emailInput.value = '';
    if (messageInput) messageInput.value = '';
  }
}

function sendEmail() {
  try {
    // Hide any existing success message
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
      successMessage.style.display = 'none';
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Get form values
    const recipient = "Yardi.Transitions@rmrgroup.com";
    const userEmail = document.getElementById("user-email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Set loading state
    setLoadingState(true);

    // Create enhanced email body
    const emailBody = `
Contact Form Submission from ARIUM Website

From: ${userEmail}
Subject: ${subject}

Message:
${message}

---
This message was sent from the ARIUM at RMR ITAppChallenge website contact form.
Timestamp: ${new Date().toLocaleString()}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Add a small delay to show loading state
    setTimeout(() => {
      try {
        // Open default email client
        window.location.href = mailtoLink;
        
        // Reset loading state
        setLoadingState(false);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form after successful submission
        setTimeout(resetForm, 1000);
        
      } catch (error) {
        console.error('Error opening email client:', error);
        setLoadingState(false);
        alert('Unable to open email client. Please copy the email address: ' + recipient);
      }
    }, 500);

  } catch (error) {
    console.error('Error in sendEmail function:', error);
    setLoadingState(false);
    alert('An error occurred. Please try again or contact us directly.');
  }
}

// Export function for global access (if needed)
window.sendEmail = sendEmail;
