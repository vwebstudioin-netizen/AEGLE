"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Plus, Edit3, Trash2, Phone, Mail, Clock,
  X, Loader2, Search, Star, Building2, ChevronDown,
} from "lucide-react";

/* ── Types ── */
interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface WorkingHour {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

interface Location {
  id: string;
  name: string;
  slug: string;
  type: "flagship" | "branch" | "clinic" | "express";
  description: string;
  address: Address;
  coordinates: { lat: number; lng: number };
  phone: string;
  fax?: string;
  email: string;
  image: string;
  hours: WorkingHour[];
  departments: string[];
  services: string[];
  amenities: string[];
  parkingInfo: string;
  publicTransit?: string;
  accessibilityFeatures: string[];
  erAvailable: boolean;
  featured: boolean;
}

const LOCATION_TYPES = ["flagship", "branch", "clinic", "express"] as const;
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DEFAULT_HOURS: WorkingHour[] = DAYS.map((day) => ({
  day,
  open: "09:00",
  close: "18:00",
  isClosed: day === "Sunday",
}));

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editLocation, setEditLocation] = useState<Location | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* ── Form state ── */
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState<Location["type"]>("branch");
  const [formDescription, setFormDescription] = useState("");
  const [formStreet, setFormStreet] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formState, setFormState] = useState("");
  const [formZip, setFormZip] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formLat, setFormLat] = useState("");
  const [formLng, setFormLng] = useState("");
  const [formParking, setFormParking] = useState("");
  const [formAmenities, setFormAmenities] = useState("");
  const [formDepartments, setFormDepartments] = useState("");
  const [formServices, setFormServices] = useState("");
  const [formAccessibility, setFormAccessibility] = useState("");
  const [formErAvailable, setFormErAvailable] = useState(false);
  const [formFeatured, setFormFeatured] = useState(false);
  const [formHours, setFormHours] = useState<WorkingHour[]>(DEFAULT_HOURS);

  /* ── Fetch locations ── */
  async function fetchLocations() {
    setLoading(true);
    try {
      const res = await fetch("/api/locations");
      const data = await res.json();
      setLocations(data.locations || []);
    } catch (err) {
      console.error("Failed to fetch locations:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  /* ── Open form for add/edit ── */
  function openForm(loc?: Location) {
    if (loc) {
      setEditLocation(loc);
      setFormName(loc.name);
      setFormType(loc.type);
      setFormDescription(loc.description);
      setFormStreet(loc.address.street);
      setFormCity(loc.address.city);
      setFormState(loc.address.state);
      setFormZip(loc.address.zip);
      setFormPhone(loc.phone);
      setFormEmail(loc.email);
      setFormImage(loc.image);
      setFormLat(String(loc.coordinates?.lat || ""));
      setFormLng(String(loc.coordinates?.lng || ""));
      setFormParking(loc.parkingInfo || "");
      setFormAmenities((loc.amenities || []).join(", "));
      setFormDepartments((loc.departments || []).join(", "));
      setFormServices((loc.services || []).join(", "));
      setFormAccessibility((loc.accessibilityFeatures || []).join(", "));
      setFormErAvailable(loc.erAvailable);
      setFormFeatured(loc.featured);
      setFormHours(loc.hours?.length ? loc.hours : DEFAULT_HOURS);
    } else {
      setEditLocation(null);
      resetForm();
    }
    setShowForm(true);
  }

  function resetForm() {
    setFormName("");
    setFormType("branch");
    setFormDescription("");
    setFormStreet("");
    setFormCity("");
    setFormState("");
    setFormZip("");
    setFormPhone("");
    setFormEmail("");
    setFormImage("");
    setFormLat("");
    setFormLng("");
    setFormParking("");
    setFormAmenities("");
    setFormDepartments("");
    setFormServices("");
    setFormAccessibility("");
    setFormErAvailable(false);
    setFormFeatured(false);
    setFormHours(DEFAULT_HOURS);
  }

  /* ── Submit (create or update) ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...(editLocation ? { id: editLocation.id } : {}),
      name: formName,
      type: formType,
      description: formDescription,
      address: {
        street: formStreet,
        city: formCity,
        state: formState,
        zip: formZip,
        country: "IN",
      },
      coordinates: {
        lat: parseFloat(formLat) || 0,
        lng: parseFloat(formLng) || 0,
      },
      phone: formPhone,
      email: formEmail,
      image: formImage,
      hours: formHours,
      departments: formDepartments.split(",").map((s) => s.trim()).filter(Boolean),
      services: formServices.split(",").map((s) => s.trim()).filter(Boolean),
      amenities: formAmenities.split(",").map((s) => s.trim()).filter(Boolean),
      parkingInfo: formParking,
      accessibilityFeatures: formAccessibility.split(",").map((s) => s.trim()).filter(Boolean),
      erAvailable: formErAvailable,
      featured: formFeatured,
    };

    try {
      const res = await fetch("/api/locations", {
        method: editLocation ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      setShowForm(false);
      resetForm();
      setEditLocation(null);
      fetchLocations();
    } catch (err) {
      console.error("Failed to save location:", err);
      alert("Failed to save location. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Delete ── */
  async function handleDelete(id: string) {
    if (!confirm("Delete this location? This cannot be undone.")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/locations?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      fetchLocations();
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete location.");
    } finally {
      setDeleting(null);
    }
  }

  /* ── Update single hour row ── */
  function updateHour(index: number, field: keyof WorkingHour, value: string | boolean) {
    setFormHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
    );
  }

  /* ── Filter ── */
  const filtered = locations.filter(
    (loc) =>
      loc.name?.toLowerCase().includes(search.toLowerCase()) ||
      loc.address?.city?.toLowerCase().includes(search.toLowerCase())
  );

  /* ═══════════════════════════════ RENDER ═══════════════════════════════ */
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-8 h-8" />
            <h1 className="text-2xl lg:text-3xl font-bold">Manage Locations</h1>
          </div>
          <p className="text-white/80">Add, edit, or remove clinic locations. Changes reflect on the public site instantly.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button onClick={() => openForm()} className="gap-2">
            <Plus className="w-4 h-4" /> Add Location
          </Button>
        </div>

        {/* Location List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Locations Found</h3>
              <p className="text-muted-foreground mb-6">
                {search ? "No locations match your search." : "Add your first clinic location to get started."}
              </p>
              {!search && (
                <Button onClick={() => openForm()} className="gap-2">
                  <Plus className="w-4 h-4" /> Add First Location
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filtered.map((loc) => (
              <Card key={loc.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Top row */}
                  <div className="flex items-start gap-4 p-5">
                    {/* Thumbnail */}
                    {loc.image && (
                      <div className="hidden sm:block w-24 h-24 rounded-lg overflow-hidden shrink-0">
                        <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-foreground truncate">{loc.name}</h3>
                        <Badge variant="secondary" className="text-xs capitalize">{loc.type}</Badge>
                        {loc.featured && <Badge className="text-xs bg-yellow-400 text-yellow-900"><Star className="w-3 h-3 mr-1" />Featured</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {loc.address?.street}, {loc.address?.city}, {loc.address?.state} {loc.address?.zip}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{loc.phone}</span>
                        {loc.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{loc.email}</span>}
                        {loc.departments?.length > 0 && <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{loc.departments.length} depts</span>}
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => setExpandedId(expandedId === loc.id ? null : loc.id)}>
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedId === loc.id ? "rotate-180" : ""}`} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openForm(loc)} className="gap-1">
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive hover:text-white gap-1"
                        onClick={() => handleDelete(loc.id)}
                        disabled={deleting === loc.id}
                      >
                        {deleting === loc.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                        Delete
                      </Button>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {expandedId === loc.id && (
                    <div className="border-t bg-muted/30 p-5 space-y-3 text-sm">
                      {loc.description && <p className="text-muted-foreground">{loc.description}</p>}
                      {loc.hours?.length > 0 && (
                        <div>
                          <p className="font-medium flex items-center gap-1 mb-1"><Clock className="w-3.5 h-3.5" /> Working Hours</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs text-muted-foreground">
                            {loc.hours.map((h) => (
                              <span key={h.day}>{h.day.slice(0, 3)}: {h.isClosed ? "Closed" : `${h.open}–${h.close}`}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {loc.amenities?.length > 0 && (
                        <div>
                          <p className="font-medium mb-1">Amenities</p>
                          <div className="flex flex-wrap gap-1">{loc.amenities.map((a) => <Badge key={a} variant="outline" className="text-xs">{a}</Badge>)}</div>
                        </div>
                      )}
                      {loc.services?.length > 0 && (
                        <div>
                          <p className="font-medium mb-1">Services</p>
                          <div className="flex flex-wrap gap-1">{loc.services.map((s) => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}</div>
                        </div>
                      )}
                      {loc.parkingInfo && <p className="text-muted-foreground"><strong>Parking:</strong> {loc.parkingInfo}</p>}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary */}
        {!loading && locations.length > 0 && (
          <p className="text-xs text-muted-foreground mt-6 text-center">
            {locations.length} location{locations.length !== 1 ? "s" : ""} total
            {search && ` · ${filtered.length} matching "${search}"`}
          </p>
        )}
      </div>

      {/* ══════════ ADD / EDIT FORM MODAL ══════════ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto pt-10 pb-10">
          <Card className="w-full max-w-2xl mx-4 relative">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {editLocation ? "Edit Location" : "Add New Location"}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); resetForm(); setEditLocation(null); }}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Basic Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location Name *</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="AEGLE Clinic — Koramangala"
                      required
                      className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Type</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as Location["type"])}
                      className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {LOCATION_TYPES.map((t) => (
                        <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    rows={2}
                    placeholder="Brief description of this location..."
                    className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                {/* Address */}
                <div>
                  <p className="text-sm font-semibold mb-2">Address</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <input type="text" value={formStreet} onChange={(e) => setFormStreet(e.target.value)} placeholder="Street address *" required className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <input type="text" value={formCity} onChange={(e) => setFormCity(e.target.value)} placeholder="City *" required className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input type="text" value={formState} onChange={(e) => setFormState(e.target.value)} placeholder="State" className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input type="text" value={formZip} onChange={(e) => setFormZip(e.target.value)} placeholder="ZIP / PIN code" className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone *</label>
                    <input type="tel" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="8050507755" required className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="clinic@aegle.in" className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="text-sm font-medium mb-1 block">Image URL</label>
                  <input type="url" value={formImage} onChange={(e) => setFormImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  {formImage && (
                    <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden">
                      <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Latitude</label>
                    <input type="text" value={formLat} onChange={(e) => setFormLat(e.target.value)} placeholder="12.9352" className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Longitude</label>
                    <input type="text" value={formLng} onChange={(e) => setFormLng(e.target.value)} placeholder="77.6245" className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>

                {/* Working Hours */}
                <div>
                  <p className="text-sm font-semibold mb-2">Working Hours</p>
                  <div className="space-y-2">
                    {formHours.map((h, i) => (
                      <div key={h.day} className="flex items-center gap-2 text-sm">
                        <span className="w-12 font-medium">{h.day.slice(0, 3)}</span>
                        <label className="flex items-center gap-1 text-xs">
                          <input
                            type="checkbox"
                            checked={h.isClosed}
                            onChange={(e) => updateHour(i, "isClosed", e.target.checked)}
                            className="rounded"
                          />
                          Closed
                        </label>
                        {!h.isClosed && (
                          <>
                            <input
                              type="time"
                              value={h.open}
                              onChange={(e) => updateHour(i, "open", e.target.value)}
                              className="px-2 py-1 border rounded bg-background text-xs"
                            />
                            <span className="text-muted-foreground">to</span>
                            <input
                              type="time"
                              value={h.close}
                              onChange={(e) => updateHour(i, "close", e.target.value)}
                              className="px-2 py-1 border rounded bg-background text-xs"
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comma-separated fields */}
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Departments (comma-separated)</label>
                    <input type="text" value={formDepartments} onChange={(e) => setFormDepartments(e.target.value)} placeholder="skin, face, hair, lasers" className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Services (comma-separated)</label>
                    <input type="text" value={formServices} onChange={(e) => setFormServices(e.target.value)} placeholder="Laser Hair Removal, Botox, PRP" className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Amenities (comma-separated)</label>
                    <input type="text" value={formAmenities} onChange={(e) => setFormAmenities(e.target.value)} placeholder="Free WiFi, Valet Parking, Prayer Room" className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Accessibility (comma-separated)</label>
                    <input type="text" value={formAccessibility} onChange={(e) => setFormAccessibility(e.target.value)} placeholder="Wheelchair accessible, Elevator" className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Parking Info</label>
                    <input type="text" value={formParking} onChange={(e) => setFormParking(e.target.value)} placeholder="Free valet parking available" className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={formFeatured} onChange={(e) => setFormFeatured(e.target.checked)} className="rounded" />
                    Featured location
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={formErAvailable} onChange={(e) => setFormErAvailable(e.target.checked)} className="rounded" />
                    ER Available
                  </label>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <Button type="submit" disabled={submitting} className="gap-2">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                    {editLocation ? "Update Location" : "Create Location"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowForm(false); resetForm(); setEditLocation(null); }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
