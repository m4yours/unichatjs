import "./setup";
import { expect } from "chai";
import { Unichat } from "../lib/unichat";
import { Server } from 'mock-socket';
import { ConnectionType, ServerMessageType, PeerErrorType, PeerEventType } from "../lib/enums";

const createMockServer = (): Server => {
    const fakeURL = 'ws://localhost:8080/unichatjs?key=unichatjs&id=1&token=testToken';
    const mockServer = new Server(fakeURL);

    mockServer.on('connection', socket => {
        //@ts-ignore
        socket.on('message', data => {
            socket.send('test message from mock server');
        });

        socket.send(JSON.stringify({ type: ServerMessageType.Open }));
    });

    return mockServer;
}
describe("Unichat", function () {
    describe("after construct without parameters", function () {
        it("shouldn't contains any connection", function () {
            const unichat = new Unichat();

            expect(unichat.open).to.be.false;
            expect(unichat.connections).to.be.empty;
            expect(unichat.id).to.be.null;
            expect(unichat.disconnected).to.be.false;
            expect(unichat.destroyed).to.be.false;

            unichat.destroy();
        });
    });

    describe("after construct with parameters", function () {
        it("should contains id and key", function () {
            const unichat = new Unichat('1', { key: 'anotherKey' });

            expect(unichat.id).to.eq('1');
            expect(unichat.options.key).to.eq('anotherKey');

            unichat.destroy();
        });
    });

    describe("after call to unichat #2", function () {
        let mockServer;

        before(function () {
            mockServer = createMockServer();
        });

        it("Unichat#1 should has id #1", function (done) {
            const peer1 = new Unichat('1', { port: 8080, host: 'localhost' });
            expect(peer1.open).to.be.false;

            const mediaOptions = {
                metadata: { var: '123' },
                constraints: {
                    mandatory: {
                        OfferToReceiveAudio: true,
                        OfferToReceiveVideo: true
                    }
                }
            };

            const track = new MediaStreamTrack();
            const mediaStream = new MediaStream([track]);

            const mediaConnection = peer1.call('2', mediaStream, { ...mediaOptions });

            expect(mediaConnection.connectionId).to.be.a('string');
            expect(mediaConnection.type).to.eq(ConnectionType.Media);
            expect(mediaConnection.unichat).to.eq('2');
            expect(mediaConnection.options).to.include(mediaOptions);
            expect(mediaConnection.metadata).to.deep.eq(mediaOptions.metadata);
            expect(mediaConnection.peerConnection.getSenders()[0].track.id).to.eq(track.id);

            peer1.once('open', (id) => {
                expect(id).to.be.eq('1');
                //@ts-ignore
                expect(peer1._lastServerId).to.be.eq('1');
                expect(peer1.disconnected).to.be.false;
                expect(peer1.destroyed).to.be.false;
                expect(peer1.open).to.be.true;

                peer1.destroy();

                expect(peer1.disconnected).to.be.true;
                expect(peer1.destroyed).to.be.true;
                expect(peer1.open).to.be.false;
                expect(peer1.connections).to.be.empty;

                done();
            });
        });

        after(function () {
            mockServer.stop();
        });
    });

    describe("reconnect", function () {
        let mockServer;

        before(function () {
            mockServer = createMockServer();
        });

        it("connect to server => disconnect => reconnect => destroy", function (done) {
            const peer1 = new Unichat('1', { port: 8080, host: 'localhost' });

            peer1.once('open', () => {
                expect(peer1.open).to.be.true;

                peer1.once('disconnected', () => {
                    expect(peer1.disconnected).to.be.true;
                    expect(peer1.destroyed).to.be.false;
                    expect(peer1.open).to.be.false;

                    peer1.once('open', (id) => {
                        expect(id).to.be.eq('1');
                        expect(peer1.disconnected).to.be.false;
                        expect(peer1.destroyed).to.be.false;
                        expect(peer1.open).to.be.true;

                        peer1.once('disconnected', () => {
                            expect(peer1.disconnected).to.be.true;
                            expect(peer1.destroyed).to.be.false;
                            expect(peer1.open).to.be.false;

                            peer1.once('close', () => {
                                expect(peer1.disconnected).to.be.true;
                                expect(peer1.destroyed).to.be.true;
                                expect(peer1.open).to.be.false;

                                done();
                            });
                        });

                        peer1.destroy();
                    });

                    peer1.reconnect();
                });

                peer1.disconnect();
            });
        });

        it("disconnect => reconnect => destroy", function (done) {
            mockServer.stop();

            const peer1 = new Unichat('1', { port: 8080, host: 'localhost' });

            peer1.once('disconnected', (id) => {
                expect(id).to.be.eq('1');
                expect(peer1.disconnected).to.be.true;
                expect(peer1.destroyed).to.be.false;
                expect(peer1.open).to.be.false;

                peer1.once('open', (id) => {
                    expect(id).to.be.eq('1');
                    expect(peer1.disconnected).to.be.false;
                    expect(peer1.destroyed).to.be.false;
                    expect(peer1.open).to.be.true;

                    peer1.once('disconnected', () => {
                        expect(peer1.disconnected).to.be.true;
                        expect(peer1.destroyed).to.be.false;
                        expect(peer1.open).to.be.false;

                        peer1.once('close', () => {
                            expect(peer1.disconnected).to.be.true;
                            expect(peer1.destroyed).to.be.true;
                            expect(peer1.open).to.be.false;

                            done();
                        });
                    });

                    peer1.destroy();
                });

                mockServer = createMockServer();

                peer1.reconnect();
            });
        });

        it("destroy unichat if no id and no connection", function (done) {
            mockServer.stop();

            const peer1 = new Unichat({ port: 8080, host: 'localhost' });

            peer1.once(PeerEventType.Error, (error) => {
                expect(error.type).to.be.eq(PeerErrorType.ServerError);

                peer1.once(PeerEventType.Close, () => {
                    expect(peer1.disconnected).to.be.true;
                    expect(peer1.destroyed).to.be.true;
                    expect(peer1.open).to.be.false;

                    done();
                });

                mockServer = createMockServer();
            });
        });

        after(function () {
            mockServer.stop();
        });
    });
});
