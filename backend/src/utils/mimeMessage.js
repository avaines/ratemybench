// Had nothing but issues with the mimetext library, what it does isn't particularly complex

export function createMimeMessage(sender, recipient, subject, body) {
  const boundary = "----=_Part_0_123456789.123456789";
  const headers = [
    `From: ${sender}`,
    `To: ${recipient}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];

  const message = [
    ...headers,
    "",
    `--${boundary}`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: 7bit`,
    "",
    body,
    `--${boundary}--`,
  ];

  return message.join("\r\n");
}
