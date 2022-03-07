import styled from 'styled-components'

export function formattedDate(date) {
    let yearMonthDay = date.split('T')[0].split('-');
    let year = yearMonthDay[0];
    let month = yearMonthDay[1];
    let day = yearMonthDay[2];

    let time = date.split('T')[1].split('.')[0].split(':');

    let ampm = '';

    let minute = time[1];
    let hour = time[0];

    if (Number(hour) > 12) {
        hour = `${Number(hour) - 12}`;
        ampm = 'PM';
    } else {
        hour = `${Number(hour)}`;
        ampm = 'AM';
    }

    return `${month}-${day}-${year} ${hour}:${minute} ${ampm}`

}

export function shortenedContent(content) {
    if (content < 100) return content;

    let newContent = content;
    while (newContent.length >= 100) {
        newContent = newContent.split(' ')
        newContent.pop()
        newContent = newContent.join(' ')
    }

    return newContent;
}


export function sortByUpdatedAt(notes) {
    return notes.sort((a, b) => {
        const dateA = Date.parse(a.updatedAt);
        const dateB = Date.parse(b.updatedAt);
        if (dateB > dateA) return 1
        else if (dateB < dateA) return -1
        else return 0;
    })
}


export function sortByTitle(notes) {
    return notes.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        console.log(titleA, titleB);
        if (titleA > titleB) return 1
        else if (titleA < titleB) return -1
        else return 0;
    })
}


export function formatNotes(notes) {
    let formattedNotes = [];
    Object.entries(notes).map(rawNote => {
        let note = {};
        note.title = rawNote[1].title;
        note.notebookId = rawNote[1].notebookId;
        note.id = rawNote[1].id;
        note.userId = rawNote[1].userId;
        note.content = shortenedContent(rawNote[1].content);
        note.updatedAt = formattedDate(rawNote[1].updatedAt);
        formattedNotes.push(note);
    })

    return formattedNotes;
}

export function formatNotebooks(notebooks) {
    let formattedNotebooks = [];
    Object.entries(notebooks).map(rawNotebook => {
        let notebook = {};
        notebook.title = rawNotebook[1].title;
        notebook.id = rawNotebook[1].id;
        notebook.userId = rawNotebook[1].userId;
        notebook.updatedAt = formattedDate(rawNotebook[1].updatedAt);
        formattedNotebooks.push(notebook);
    })

    return formattedNotebooks;
}



export const OuterDiv = styled.div`
    width: calc(100% - 250px);
`;
