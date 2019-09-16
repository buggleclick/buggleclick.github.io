class GameError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GameError';
    }
}

class Game {
    private tangTotal: number;
    private tangCurrent: number;
    private tangPerSecond: number;
    private tangPerClick: number;
    private buggleName: string;
    constructor() {
        this.tangCurrent = 0;
        this.tangTotal = 0;
        this.tangPerSecond = 0;
        this.tangPerClick = 1;
        this.buggleName = 'Unknown';
    }
    element(elem: string): HTMLElement | null {
        return document.querySelector(elem);
    } 
    updateName(name: string): void {
        this.buggleName = name;
    }
    click(): void {
        this.tangCurrent = this.tangCurrent + this.tangPerClick;
        this.tangTotal = this.tangTotal + this.tangPerClick;
    }
}