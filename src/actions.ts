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

export type SignMessage = Reject | Approve;

export type SendTransaction = Reject | Approve;

export type SignTransaction = Reject | Approve;

export type RequestAccounts = Reject | ApproveAccounts;

export type AddEthereumChain = Reject | Approve;

export type SwitchEthereumChain = Reject | Approve;

export interface Report {
    format: string;
    value: Exclude<unknown, null | undefined>;
}
