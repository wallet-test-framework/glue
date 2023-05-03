export interface ActivateChain {
    chainId: string;
    rpcUrl: string;
}

export interface Reply {
    id: string;
}

export interface Reject extends Reply {
    action: "reject";
}

export interface Approve extends Reply {
    action: "approve";
}

export interface ApproveAccounts extends Approve {
    accounts: string[];
}

export type RequestAccounts = Reject | ApproveAccounts;

export type AddEthereumChain = Reject | Approve;

export type SwitchEthereumChain = Reject | Approve;
