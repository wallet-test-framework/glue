import * as actions from "./actions";
import { EventMap } from "./events";
import { Unsubscribe, createNanoEvents } from "nanoevents";

export abstract class Glue {
    private readonly emitter = createNanoEvents<EventMap>();

    public async next<E extends keyof EventMap>(
        type: E
    ): Promise<Parameters<EventMap[E]>[0]> {
        return await new Promise((res, rej) => {
            const unsubscribe = this.on(type, (...args) => {
                unsubscribe();
                try {
                    res(args[0]);
                } catch (e: unknown) {
                    rej(e);
                }
            });
        });
    }

    public on<E extends keyof EventMap>(
        type: E,
        listener: EventMap[E]
    ): Unsubscribe {
        return this.emitter.on(type, listener);
    }

    protected emit<E extends keyof EventMap>(
        type: E,
        ...ev: Parameters<EventMap[E]>
    ): void {
        this.emitter.emit(type, ...ev);
    }

    public abstract activateChain(action: actions.ActivateChain): Promise<void>;
    public abstract requestAccounts(
        action: actions.RequestAccounts
    ): Promise<void>;
}

export type { Unsubscribe } from "nanoevents";
export * from "./events";
export * from "./actions";
