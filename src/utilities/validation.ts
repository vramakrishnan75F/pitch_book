const NAME_MIN_LENGTH = 2
const NAME_MAX_LENGTH = 50

export function getNameError(value: string): string {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Name is required.'
  }

  if (trimmed.length < NAME_MIN_LENGTH) {
    return 'Name must be at least 2 characters.'
  }

  if (trimmed.length > NAME_MAX_LENGTH) {
    return 'Name must be at most 50 characters.'
  }

  return ''
}

export function getMobileError(value: string): string {
  if (!value) {
    return 'Mobile number is required.'
  }

  if (!/^\d+$/.test(value)) {
    return 'Mobile number must contain digits only.'
  }

  if (value.length !== 10) {
    return 'Mobile number must be exactly 10 digits.'
  }

  return ''
}
