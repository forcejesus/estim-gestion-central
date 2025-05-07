
import React from "react";
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFViewer,
  Image
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    fontFamily: "Helvetica"
  },
  header: {
    marginBottom: 20,
    padding: 10,
    borderBottom: "1px solid #eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    width: 120
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a"
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555"
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9"
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#8B5CF6",
    color: "white"
  },
  row: {
    flexDirection: "row",
    marginBottom: 8
  },
  label: {
    width: "40%",
    fontSize: 12,
    color: "#555"
  },
  value: {
    width: "60%",
    fontSize: 12
  },
  infoHeader: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 5
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center"
  },
  avatarText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#8B5CF6"
  },
  studentInfo: {
    flex: 1
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  studentDetails: {
    fontSize: 12,
    color: "#555",
    marginBottom: 3
  },
  badge: {
    fontSize: 10,
    backgroundColor: "#e5e7eb",
    color: "#1f2937",
    padding: "3 8",
    borderRadius: 10,
    alignSelf: "flex-start"
  },
  activeBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534"
  },
  waitingBadge: {
    backgroundColor: "#fef3c7",
    color: "#92400e"
  },
  inactiveBadge: {
    backgroundColor: "#f3f4f6",
    color: "#374151"
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5 0",
    borderBottom: "1px solid #f3f4f6"
  },
  documentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5 0",
    borderBottom: "1px solid #f3f4f6"
  },
  gradeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5 0",
    borderBottom: "1px solid #f3f4f6"
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#999"
  }
});

// Define the student type to match our mock data structure
type StudentDocument = {
  id: string;
  name: string;
  type: string;
  status: string;
  uploadDate: string;
};

type PaymentInfo = {
  id: string;
  date: string;
  amount: string;
  status: string;
  type: string;
};

type GradeInfo = {
  course: string;
  grade: string;
  status: string;
};

interface StudentProfilePDFProps {
  student: {
    id: string;
    matricule: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string;
    birthPlace: string;
    nationality: string;
    photo: string | null;
    level: string;
    department: string;
    status: string;
    registration: string;
    payments: PaymentInfo[];
    documents: StudentDocument[];
    grades: GradeInfo[];
    attendance: number;
  };
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};

const getBadgeStyle = (status: string) => {
  switch (status) {
    case "Actif":
    case "Validé":
    case "Payé":
      return styles.activeBadge;
    case "En attente":
      return styles.waitingBadge;
    case "Inactif":
    case "Non payé":
      return styles.inactiveBadge;
    default:
      return {};
  }
};

const StudentProfilePDF: React.FC<StudentProfilePDFProps> = ({ student }) => (
  <PDFViewer style={{ width: "100%", height: "70vh" }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Fiche Étudiant</Text>
            <Text style={styles.subtitle}>Institut Supérieur d'Études Technologiques</Text>
          </View>
          {/* You can add a school logo here */}
          <Text style={styles.subtitle}>Date d'impression: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.infoHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(student.name)}</Text>
          </View>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.studentDetails}>{student.matricule}</Text>
            <Text style={styles.studentDetails}>{student.level} - {student.department}</Text>
            <View style={[styles.badge, getBadgeStyle(student.status)]}>
              <Text>{student.status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations personnelles</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Nom complet:</Text>
            <Text style={styles.value}>{student.name}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Date de naissance:</Text>
            <Text style={styles.value}>{student.birthDate}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Lieu de naissance:</Text>
            <Text style={styles.value}>{student.birthPlace}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Nationalité:</Text>
            <Text style={styles.value}>{student.nationality}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coordonnées</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{student.email}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Téléphone:</Text>
            <Text style={styles.value}>{student.phone}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Adresse:</Text>
            <Text style={styles.value}>{student.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations académiques</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Niveau:</Text>
            <Text style={styles.value}>{student.level}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Filière:</Text>
            <Text style={styles.value}>{student.department}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Date d'inscription:</Text>
            <Text style={styles.value}>{student.registration}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Taux de présence:</Text>
            <Text style={styles.value}>{student.attendance}%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paiements</Text>
          
          {student.payments.map((payment) => (
            <View key={payment.id} style={styles.paymentRow}>
              <Text style={styles.label}>{payment.type} - {payment.date}</Text>
              <Text style={styles.value}>{payment.amount} DT</Text>
              <View style={[styles.badge, getBadgeStyle(payment.status)]}>
                <Text>{payment.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Document généré le {new Date().toLocaleDateString()} à {new Date().toLocaleTimeString()}</Text>
          <Text>Institut Supérieur d'Études Technologiques © 2025</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default StudentProfilePDF;
