export abstract class Event {
    public readonly type: string;

    constructor(type: string) {
        this.type = type;
    }
}

export abstract class ReplyEvent extends Event {
    public readonly id: string;

    constructor(type: string, id: string) {
        super(type);
        this.id = id;
    }
}

interface Currency {
    name: string;
    symbol: string;
    decimals: number;
}

interface AddEthereumChain {
    chainId: string;
    blockExplorerUrls?: readonly string[];
    chainName?: string;
    iconUrls?: readonly string[];
    nativeCurrency?: Currency;
    rpcUrls?: readonly string[];
}

export class AddEthereumChainEvent
    extends ReplyEvent
    implements AddEthereumChain
{
    public readonly chainId: string;
    public readonly blockExplorerUrls: readonly string[];
    public readonly chainName?: string;
    public readonly iconUrls: readonly string[];
    public readonly nativeCurrency?: {
        readonly name: string;
        readonly symbol: string;
        readonly decimals: number;
    };
    public readonly rpcUrls: readonly string[];

    constructor(id: string, options: AddEthereumChain) {
        super("addethereumchain", id);
        this.chainId = options.chainId;
        this.blockExplorerUrls = options.blockExplorerUrls ?? [];
        this.chainName = options.chainName;
        this.iconUrls = options.iconUrls ?? [];
        this.nativeCurrency = options.nativeCurrency;
        this.rpcUrls = options.rpcUrls ?? [];
    }
}

interface SwitchEthereumChain {
    chainId: string;
}

export class SwitchEthereumChainEvent
    extends ReplyEvent
    implements SwitchEthereumChain
{
    public readonly chainId: string;

    constructor(id: string, options: SwitchEthereumChain) {
        super("switchethereumchain", id);
        this.chainId = options.chainId;
    }
}

interface RequestAccounts {
    accounts: readonly string[];
}

export class RequestAccountsEvent
    extends ReplyEvent
    implements RequestAccounts
{
    public readonly accounts: readonly string[];

    constructor(id: string, options: RequestAccounts) {
        super("requestaccounts", id);
        this.accounts = options.accounts;
    }
}

interface SignMessage {
    message: string;
}

export class SignMessageEvent extends ReplyEvent implements SignMessage {
    public readonly message: string;

    constructor(id: string, options: SignMessage) {
        super("signmessage", id);
        this.message = options.message;
    }
}

interface SendTransaction {
    from: string;
    to: string;
    data: string;
    value: string;
}

export class SendTransactionEvent
    extends ReplyEvent
    implements SendTransaction
{
    public readonly from: string;
    public readonly to: string;
    public readonly data: string;
    public readonly value: string;

    constructor(id: string, options: SendTransaction) {
        super("sendtransaction", id);
        this.from = options.from;
        this.to = options.to;
        this.data = options.data;
        this.value = options.value;
    }
}

export interface EventMap {
    requestaccounts: (ev: RequestAccountsEvent) => unknown;
    signmessage: (ev: SignMessageEvent) => unknown;
    sendtransaction: (ev: SendTransactionEvent) => unknown;
    addethereumchain: (ev: AddEthereumChainEvent) => unknown;
    switchethereumchain: (ev: SwitchEthereumChainEvent) => unknown;
}
