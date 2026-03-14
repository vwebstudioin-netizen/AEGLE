import { adminDb } from "./firebase-admin";

export interface AuditEntry {
  action: string;
  userId: string;
  userEmail: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ip?: string;
  timestamp?: Date;
}

export async function logAudit(entry: AuditEntry): Promise<void> {
  if (!adminDb) {
    console.warn("Admin DB not available. Audit log not written:", entry.action);
    return;
  }

  try {
    await adminDb.collection("auditLog").add({
      ...entry,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
}

export async function getAuditLogs(options?: {
  userId?: string;
  resource?: string;
  limit?: number;
  startAfter?: string;
}): Promise<AuditEntry[]> {
  if (!adminDb) return [];

  try {
    let q = adminDb.collection("auditLog").orderBy("timestamp", "desc");

    if (options?.userId) {
      q = q.where("userId", "==", options.userId);
    }
    if (options?.resource) {
      q = q.where("resource", "==", options.resource);
    }
    if (options?.limit) {
      q = q.limit(options.limit);
    }

    const snap = await q.get();
    return snap.docs.map((d) => ({ ...d.data() }) as AuditEntry);
  } catch (error) {
    console.error("Failed to read audit logs:", error);
    return [];
  }
}
