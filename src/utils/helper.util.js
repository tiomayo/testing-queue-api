function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
  }
  
function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function getNomorAntrian(num, service) {
  code = 'A';
  switch (service) {
    case 'emergency':
      code = 'B';
      break;
    default:
      break;
  }

  return code + addLeadingZeros(num);
}

function addLeadingZeros(num, totalLength = 3) {
  return String(num).padStart(totalLength, '0');
}

module.exports = {
  getOffset,
  emptyOrRows,
  addLeadingZeros,
  getNomorAntrian
}