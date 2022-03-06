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



export const OuterDiv = styled.div`
    width: calc(100% - 250px);
`;
