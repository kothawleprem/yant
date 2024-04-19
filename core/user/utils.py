import os
from mailersend import emails


def send_otp(email, otp):
    mailer = emails.NewEmail(os.getenv("MAIL_API_KEY"))

    # define an empty dict to populate with mail values
    mail_body = {}

    mail_from = {
        "name": "Yant",
        "email": "help.yant@trial-ynrw7gyqp6n42k8e.mlsender.net",
    }

    recipients = [
        {
            "name": "Your Client",
            "email": email,
        }
    ]

    mailer.set_mail_from(mail_from, mail_body)
    mailer.set_mail_to(recipients, mail_body)
    mailer.set_subject("Hello!", mail_body)
    mailer.set_plaintext_content(f"Your OTP for YANT: {otp}", mail_body)

    mailer.send(mail_body)
