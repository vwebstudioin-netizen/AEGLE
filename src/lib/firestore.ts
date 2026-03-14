import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  type QueryConstraint,
  type DocumentData,
  type DocumentSnapshot,
  serverTimestamp,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "./firebase";

// ── Collection References ──
export const doctorsCol = collection(db, "doctors");
export const departmentsCol = collection(db, "departments");
export const institutesCol = collection(db, "institutes");
export const servicesCol = collection(db, "services");
export const conditionsCol = collection(db, "conditions");
export const proceduresCol = collection(db, "procedures");
export const locationsCol = collection(db, "locations");
export const appointmentsCol = collection(db, "appointments");
export const patientsCol = collection(db, "patients");
export const contactMessagesCol = collection(db, "contactMessages");
export const blogPostsCol = collection(db, "blogPosts");
export const newsCol = collection(db, "news");
export const eventsCol = collection(db, "events");
export const eventRegistrationsCol = collection(db, "eventRegistrations");
export const patientStoriesCol = collection(db, "patientStories");
export const reviewsCol = collection(db, "reviews");
export const clinicalTrialsCol = collection(db, "clinicalTrials");
export const publicationsCol = collection(db, "publications");
export const educationProgramsCol = collection(db, "educationPrograms");
export const jobsCol = collection(db, "jobs");
export const jobApplicationsCol = collection(db, "jobApplications");
export const donationsCol = collection(db, "donations");
export const campaignsCol = collection(db, "campaigns");
export const insurancePlansCol = collection(db, "insurancePlans");
export const siteSettingsCol = collection(db, "siteSettings");
export const erWaitTimesCol = collection(db, "erWaitTimes");
export const galleryCol = collection(db, "gallery");
export const newslettersCol = collection(db, "newsletters");
export const paymentsCol = collection(db, "payments");
export const patientMessagesCol = collection(db, "patientMessages");
export const testResultsCol = collection(db, "testResults");
export const medicationsCol = collection(db, "medications");
export const billingStatementsCol = collection(db, "billingStatements");
export const auditLogCol = collection(db, "auditLog");

// ── Generic CRUD Helpers ──
export async function getDocument<T>(
  collectionName: string,
  docId: string
): Promise<(T & { id: string }) | null> {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as T & { id: string };
}

export async function getDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<(T & { id: string })[]> {
  const colRef = collection(db, collectionName);
  const q = query(colRef, ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as T & { id: string }
  );
}

export async function addDocument(
  collectionName: string,
  data: DocumentData
): Promise<string> {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateDocument(
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>
): Promise<void> {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

export async function getPaginatedDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[],
  pageSize: number,
  lastDoc?: DocumentSnapshot
): Promise<{
  items: (T & { id: string })[];
  lastDoc: DocumentSnapshot | null;
}> {
  const colRef = collection(db, collectionName);
  const paginationConstraints: QueryConstraint[] = [
    ...constraints,
    limit(pageSize),
  ];
  if (lastDoc) {
    paginationConstraints.push(startAfter(lastDoc));
  }
  const q = query(colRef, ...paginationConstraints);
  const snap = await getDocs(q);
  const items = snap.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as T & { id: string }
  );
  const last = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;
  return { items, lastDoc: last };
}
