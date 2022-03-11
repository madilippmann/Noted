import styled from 'styled-components'

export function formattedDate(date) {

    let newDate = new Date(date)
    let a = new Date().toUTCString()

    newDate = newDate.toLocaleString();
    // console.log(a)
    // console.log(newDate);

    // console.log('TEST: ', Date.parse(`${toParse}`));

    // let a = new Date(newDate)
    // // console.log(Date(newDate).toUTCString());
    // // console.log(Date.parse(Date(newDate)));
    return newDate

    // console.log('DATE: ', newDate.toLocaleString());
    let yearMonthDay = date.split('T')[0].split('-');
    let year = yearMonthDay[0];
    let month = yearMonthDay[1];
    let day = yearMonthDay[2];

    let time = date.split('T')[1].split('.')[0].split(':');

    let ampm = '';

    let second = time[2];
    let minute = time[1];
    let hour = time[0];

    if (Number(hour) > 12) {
        hour = `${Number(hour) - 12}`;
        ampm = 'PM';
    } else {
        hour = `${Number(hour)}`;
        ampm = 'AM';
    }

    return `${month}-${day}-${year} ${hour}:${minute}:${second} ${ampm}`
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



        // let b = new Date(newDate).toUTCString().split(', ').slice(1)[0];
        // console.log(b);

        // let toParse = b.
        //     console.log(toParse);

        // console.log(Date.parse(toParse));




        // console.log("RAW: ", a.updatedAt, b.updatedAt);
        // const dateA = Date.parse(a.updatedAt);

        // console.log('DATE A: ', dateA);
        // const dateB = Date.parse(b.updatedAt);
        // console.log('DATE B: ', dateB);
        const dateA = new Date(a.updatedAt).toUTCString().split(', ').slice(1)[0];
        const dateB = new Date(b.updatedAt).toUTCString().split(', ').slice(1)[0];

        if (Date.parse(dateB) > Date.parse(dateA)) {
            // console.log('B is greater');
            return 1
        } else if (Date.parse(dateA) < Date.parse(dateB)) {
            // console.log('A is greater');
            return -1

        } else {
            // console.log('Same');

            return 0
        }
    })
}


export function sortByTitle(notes) {
    return notes.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
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


export function formatTags(tags) {
    let formattedTags = [];
    Object.entries(tags).map(rawTag => {
        let tag = {};
        tag.name = rawTag[1].name;
        tag.id = rawTag[1].id;
        tag.userId = rawTag[1].userId;
        tag.noteId = rawTag[1].noteId;
        tag.updatedAt = formattedDate(rawTag[1].updatedAt);
        formattedTags.push(tag);
    })

    return formattedTags;
}





export const OuterDiv = styled.div`
    width: calc(100% - 250px);
`;
