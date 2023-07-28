export function formatUzbekPhoneNumber(phoneNumber) {
  const cleanedNumber = phoneNumber.replace(/\D/g, '')

  if (/^998\d{9}$/.test(cleanedNumber)) {
    const formattedNumber = cleanedNumber.replace(
      /^998(\d{2})(\d{3})(\d{2})(\d{2})$/,
      '+998 $1 $2 $3 $4'
    )
    return formattedNumber
  } else {
    return phoneNumber
  }
}
