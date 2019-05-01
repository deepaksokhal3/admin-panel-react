export default function rowStyle(record) {
    if (record.status === 'COMPLETED') return { backgroundColor: '#dfd' };
    if (record.status === 'PENDING') return { backgroundColor: 'rgb(255, 219, 181)' };
    if (record.status === 'IN_PROGRESS') return { backgroundColor: '#ffd' };
    if (record.status === 'WAITING_FOR_CONFIRM') return { backgroundColor: 'rgb(225, 229, 252)' };
    if (record.status === 'CANCELLED') return { backgroundColor: '#fdd' };

    return {};
}
