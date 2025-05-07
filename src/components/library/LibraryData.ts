
export const MOCK_BOOKS = [
  { id: "B001", title: "Introduction à l'algorithmique", author: "Thomas H. Cormen", category: "Informatique", status: "Disponible", copies: 3 },
  { id: "B002", title: "Réseaux informatiques", author: "Andrew S. Tanenbaum", category: "Informatique", status: "Disponible", copies: 2 },
  { id: "B003", title: "Marketing Management", author: "Philip Kotler", category: "Marketing", status: "Disponible", copies: 1 },
  { id: "B004", title: "Comptabilité de gestion", author: "Michel Gervais", category: "Gestion", status: "Emprunté", copies: 0 },
  { id: "B005", title: "Droit des sociétés", author: "Maurice Cozian", category: "Droit", status: "Disponible", copies: 4 },
  { id: "B006", title: "Économie internationale", author: "Paul Krugman", category: "Économie", status: "Emprunté", copies: 0 },
  { id: "B007", title: "Intelligence artificielle", author: "Stuart Russell", category: "Informatique", status: "Disponible", copies: 1 },
  { id: "B008", title: "Base de données", author: "C.J. Date", category: "Informatique", status: "Emprunté", copies: 0 },
];

export const MOCK_LOANS = [
  { id: "L001", book: "Introduction à l'algorithmique", student: "Ahmed Ben Ali", borrowDate: "2025-04-15", returnDate: "2025-05-15", status: "En cours" },
  { id: "L002", book: "Comptabilité de gestion", student: "Samia Oueslati", borrowDate: "2025-04-10", returnDate: "2025-05-10", status: "En cours" },
  { id: "L003", book: "Intelligence artificielle", student: "Karim Mansour", borrowDate: "2025-04-05", returnDate: "2025-05-05", status: "En retard" },
  { id: "L004", book: "Économie internationale", student: "Leila Trabelsi", borrowDate: "2025-04-01", returnDate: "2025-05-01", status: "En cours" },
  { id: "L005", book: "Base de données", student: "Mehdi Khelifi", borrowDate: "2025-03-25", returnDate: "2025-04-25", status: "En retard" },
  { id: "L006", book: "Réseaux informatiques", student: "Nour Sassi", borrowDate: "2025-03-20", returnDate: "2025-04-20", status: "Retourné" },
];
