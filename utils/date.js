const getdate = () => {
  const date = new Date();
  const options = {year:'2-digit', month: 'numeric', day: 'numeric' } 
  const now = date.toLocaleDateString('en-AU', options);
  return now;
}

module.exports = getdate;