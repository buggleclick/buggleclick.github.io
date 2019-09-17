function element(elem: string): HTMLElement | null {
    return document.querySelector(elem);
}

function renderChangelog(): void {
    CHANGELOG.forEach((change: { version: string; changes: string[]; }) => {
        element('#changelog').innerHTML += `<h3 class="text-primary">${change.version}</h3>`;
        element('#changelog').innerHTML += `<ul>`;
        change.changes.forEach((text: string) => {
            element('#changelog').innerHTML += `<li>${text}</li>`;
        })
    })
}

// Actually render the changelog!
renderChangelog();