export function formatDate(dateString, options = {}) {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', // 👈 change short → long
      day: 'numeric',
      ...options
    });
  } catch (err) {
    console.error('Invalid date:', dateString, err);
    return 'Invalid Date';
  }
}
