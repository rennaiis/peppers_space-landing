const os = require("os");

const TEMPLATE = `*Музей*
${getHostIdentifier()}

\`\`\`
{{message}}
\`\`\``;

module.exports = {
  hook: "https://chat.googleapis.com/v1/spaces/AAAAEkaLFzI/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=QZCBfKQPsu_7ldH9NP3pjvwZ6_rot3gd2q5aQ5oEX04%3D",
  template: TEMPLATE,
};

function getHostIdentifier() {
  return `${os.hostname()} ${braces(getNetworkInterface())}`;
}
function braces(v) {
  return v && `(${v.join(", ")})`;
}
function getNetworkInterface() {
  return Object.entries(os.networkInterfaces())
    .map(([key, value]) => {
      if (/vmware|loopback/i.test(key)) return;
      const ipv4 = value.find(itm => itm.family === "IPv4");

      if (ipv4 && /^127\./.test(ipv4.address)) return false;
      return ipv4.address;
    })
    .filter(Boolean);
}
