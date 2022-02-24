import { EventEmitter } from "eventemitter3";
import { Unichat } from "./unichat";
import { ServerMessage } from "./servermessage";
import { ConnectionType } from "./enums";

export abstract class BaseConnection extends EventEmitter {
  protected _open = false;

  readonly metadata: any;
  connectionId: string;

  peerConnection: RTCPeerConnection;

  abstract get type(): ConnectionType;

  get open() {
    return this._open;
  }

  constructor(
    readonly unichat: string,
    public provider: Unichat,
    readonly options: any
  ) {
    super();

    this.metadata = options.metadata;
  }

  abstract close(): void;

  abstract handleMessage(message: ServerMessage): void;
}
