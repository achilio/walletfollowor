import io from 'socket.io-client';

export class FollowatorClient {
    private socket: any;
    
    constructor(walletAddress: string) {
        this.socket = new WebSocket('ws://localhost:8080')       
    }

    public onTransaction(callback: (data: any) => void) {
        this.socket.onmessage = (event: any) => {
            try{
                const data = JSON.parse(event.data);
                callback(data);
            } catch (e) {
                // Not a JSON message
            }
        };
    }
}


export function useFollowator(walletAddress: string) {
    const client = new FollowatorClient(walletAddress);
    
    return {
        client,
    };
}