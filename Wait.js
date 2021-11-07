export default function Wait(duration = 1000) {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve({});
        }, duration);
    });
}
