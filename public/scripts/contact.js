/**
 * Validates the contact form inputs by checking if all required field are filled in
 */
function validateContactForm() {
    // Select all contact form inputs
    const $requiredInputs = $(".contact-form-input");

    // Get reference to error messages container
    const $errorMessagesContainer = $("#error-messages-container");

    // Remove existing error messages
    $errorMessagesContainer.empty();

    // Check every contact form input
    $.map($requiredInputs, input => {
        const $input = $(input);

        if ($input.val()) {
            $input.removeClass("required");
        } else {
            $input.addClass("required");

            // Create error message div
            const $errorMessage = $("<div>", { class: "error-message" });

            // Create error message
            const $errorIcon = $("<i>", {
                class: "fa-solid fa-circle-exclamation",
                css: {
                    "color": "red",
                }
            });

            const $errorText = $("<p>", {
                class: "error-text",
                text: `${$input.attr("name")} is required`,
            });

            // Add error message to error message div
            $errorMessage.append([$errorIcon, $errorText]);

            // Add error message div to error message container
            $errorMessagesContainer.append($errorMessage);
        }
    });
}

/**
 * Checks if the contact form inputs are valid by checking if any of them have the "required" class.
 * @returns {boolean} - Returns true if the form inputs are valid (i.e., no inputs have the "required" class), and false otherwise.
 */
function isContactFormValid() {
    return !$(".contact-form-input").hasClass("required");
}

/**
 * Handles the submission of the contact form when the user submits it.
 * @param {object} e The event object for the form submission.
 * @returns {boolean} Returns false if the form is invalid or there was an error while submitting it.
 */
function handleContactFormSubmit(e) {
    // Prevent form from automatically submitting
    e.preventDefault();

    // Validate the contact form
    validateContactForm();

    // Return false if the form is invalid
    if (!isContactFormValid()) {
        return false;
    }

    // Hide the contact form from page and show a message indicating that the message was sent successfully
    const $message = $("<h4>", {
        class: "contact-sent-message",
        text: "Message sent! Thanks for contacting us!"
    });

    const $contactForm = $("#contact-form");
    $contactForm.slideUp(() => {
        $contactForm.after($message.fadeIn());
    });
}
