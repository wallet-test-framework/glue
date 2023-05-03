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

export interface EventMap {
    requestaccounts: (ev: RequestAccountsEvent) => unknown;
    addethereumchain: (ev: AddEthereumChainEvent) => unknown;
    switchethereumchain: (ev: SwitchEthereumChainEvent) => unknown;
}
