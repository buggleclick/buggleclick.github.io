interface SaveFormat {
    tangTotal: number;
    tangCurrent: number;
    tangPerSecond: number;
    tangPerClick: number;
    buggleName: string;
    started: number;
}

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
    private started: number;
    constructor() {
        this.tangCurrent = 0;
        this.tangTotal = 0;
        this.tangPerSecond = 0;
        this.tangPerClick = 1;
        this.buggleName = 'Unknown';
        this.started = Date.now();
    }
    /**
     * Get element from HTML
     * @param elem <string> HTML Element (Prefixed)
     */
    element(elem: string): HTMLElement | null {
        return document.querySelector(elem);
    } 
    /**
     * Load save file from LOCALSTORAGE
     */
    loadLocalSave(): void {
        if(!window.localStorage && !localStorage) {
            new GameError('Could not load game! No LOCALSTORAGE access!');
        } else {
            if(!localStorage.getItem('tang:save')) {
                return;
            } else {
                let stringData: string = localStorage.getItem('tang:save') || '{}';
                try {
                    let saveData: SaveFormat = JSON.parse(stringData);
                    this.tangCurrent = saveData.tangCurrent;
                    this.tangTotal = saveData.tangTotal;
                    this.tangPerSecond = saveData.tangPerSecond;
                    this.tangPerClick = saveData.tangPerClick;
                    this.buggleName = saveData.buggleName;
                    this.started = saveData.started;
                } catch(e) {
                    new GameError(e);
                }
            }
        }
    }
    /**
     * Save file to LOCALSTORAGE
     */
    saveLocalSave(): void {
        if(!window.localStorage && !localStorage) {
            new GameError('Could not save! No LOCALSTORAGE access!');
        } else {
            let thisSaveFile: SaveFormat = {
                tangCurrent: this.tangCurrent,
                tangTotal: this.tangTotal,
                tangPerSecond: this.tangPerSecond,
                tangPerClick: this.tangPerClick,
                buggleName: this.buggleName,
                started: this.started
            }
            let saveString: string = JSON.stringify(thisSaveFile);
            localStorage.setItem('tang:save', saveString);
        }
    }
    /**
     * Get Buggle Game Name
     */
    getGameName(): string {
        return this.buggleName;
    }
    /**
     * Set Buggle Game Name
     * @param name <string> Buggle Name
     */
    updateName(name: string): void {
        this.buggleName = name;
    }
    /**
     * Click a Tang Event
     */
    doClick(): void {
        this.tangCurrent = this.tangCurrent + this.tangPerClick;
        this.tangTotal = this.tangTotal + this.tangPerClick;
    }
    /**
     * Tang Per Second Event
     */
    doPerSecond(): void {
        this.tangCurrent = this.tangCurrent + this.tangPerSecond;
        this.tangTotal = this.tangTotal + this.tangPerSecond;
    }
}