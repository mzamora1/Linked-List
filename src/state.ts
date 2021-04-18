export const enum algorithms { mergeSort, bubbleSort } 

//takes an object and exposes it through get or set function
//ensures state is always up to date throughout the app
export const { get, set, pause } = function loadState<C extends {isPaused: boolean}>(state: C) {
    const get = <K extends keyof C>(key: K) => state[key];
    const set = <K extends keyof C>(key: K, value: C[K]): void => void(state[key] = value);
    const pause = function makePause() {
        const pauseBtn = document.querySelector('button#pause') as HTMLButtonElement
        pauseBtn.onclick = () => state.isPaused = true;
        return () => state.isPaused && new Promise((resolve: (value: true) => void) => {
            pauseBtn.textContent = 'START';
            pauseBtn.onclick = () => {
                state.isPaused = false;
                resolve(true);
                pauseBtn.textContent = 'PAUSE';
                console.log('unpaused')
                pauseBtn.onclick = () => state.isPaused = true;
            }
        });
    }();
    return { get, set, pause } as const;
}(
    //this object can only be accessed through get, set, pause functions
    new class State {
        domIsRunning = false;
        canvasIsRunning = false;
        speed = 700;
        isPaused = false;
        algorithm: algorithms | null = null;
        numOfBars = 50;
    }
);

