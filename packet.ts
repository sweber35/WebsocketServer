export class User {
  constructor(private name: string) { }
}

export class Payload {
  constructor(private from: User, private content: string) { }
}

export class ChatMessage extends Payload {
  constructor(from: User, content: string) {
    super(from, content);
  }
}
