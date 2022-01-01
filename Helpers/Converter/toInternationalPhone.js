
module.exports = toInternationalPhone = (phone) => {
  if (phone[0] === '0') {
    let internationalPhone = ''
    internationalPhone += '+62'
    internationalPhone += phone.substring(1, phone.length)
    return internationalPhone
  }
  else if (phone[0] === '+') {
    return phone
  } else {
    return '+' + phone.toString()
  }
}
