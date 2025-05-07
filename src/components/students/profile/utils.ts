
/**
 * Returns the appropriate CSS class for a status badge based on the status
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Actif":
    case "Validé":
    case "Payé":
      return "bg-green-100 text-green-800";
    case "En attente":
      return "bg-amber-100 text-amber-800";
    case "Inactif":
    case "Non payé":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

/**
 * Gets the initials from a person's name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};
