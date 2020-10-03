
function ISOToBr(data){
    data = data.slice(0,10);
    const [year, month, day] = data.split('-');
    return `${day}/${month}/${year}`;
  }

export {ISOToBr}