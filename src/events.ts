export class Event {
    public readonly type: string;

    constructor(type: string) {
        this.type = type;
    }
}

export class ReplyEvent extends Event {
    public readonly id: string;

    constructor(type: string, id: string) {
        super(type);
        this.id = id;
    }
}

export class RequestAccountsEvent extends ReplyEvent {
    public readonly accounts: readonly string[];

    constructor(id: string, accounts: readonly string[]) {
        super("requestaccounts", id);
        this.accounts = accounts;
    }
}

export interface EventMap {
    requestaccounts: (ev: RequestAccountsEvent) => unknown;
}
