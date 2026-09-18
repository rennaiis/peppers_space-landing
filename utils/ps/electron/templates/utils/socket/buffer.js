export default class Buffer {
  buffer = "";

  messages = [];

  constructor(separator) {
    this.separator = separator;
  }

  add(val) {
    const buf = this.buffer + val;

    const arr = buf.split(this.separator);
    const messages = [];
    while (arr.length > 1) {
      const message = arr.shift().trim();
      const params = /^(.+?)(?:[: _](.+))?$/.exec(message);
      if (!params) continue;

      const command = {
        command: params[1].toLowerCase(),
        params: params[2],
      };
      messages.push(command);
    }

    this.buffer = arr[0] || "";
    this.messages.push(...messages);
  }

  hasMessage() {
    return this.messages.length > 0;
  }

  readMessage() {
    return this.messages.shift();
  }
}
