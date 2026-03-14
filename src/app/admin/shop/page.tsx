"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Plus,
  Search,
  Edit3,
  Trash2,
  Star,
  Package,
  IndianRupee,
  ImagePlus,
  X,
  ChevronLeft,
  Tag,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

/* ── Types ── */
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  comparePrice?: number;
  currency: string;
  category: string;
  tags: string[];
  images: string[];
  thumbnail: string;
  sku: string;
  stock: number;
  featured: boolean;
  active: boolean;
  rating: number;
  reviewCount: number;
  brand: string;
  weight?: string;
  volume?: string;
  ingredients?: string;
  howToUse?: string;
  suitableFor?: string[];
  createdAt: string;
}

const PRODUCT_CATEGORIES = [
  "Serums",
  "Moisturisers",
  "Cleansers",
  "Creams",
  "Sunscreens",
  "Toners",
  "Masks",
  "Eye Care",
  "Hair Care",
  "Body Care",
  "Kits & Combos",
  "Other",
];

export default function AdminShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  /* ── Form state ── */
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    longDescription: "",
    price: "",
    comparePrice: "",
    category: "Serums",
    tags: "",
    sku: "",
    stock: "0",
    featured: false,
    active: true,
    brand: "AEGLE",
    weight: "",
    volume: "",
    ingredients: "",
    howToUse: "",
    suitableFor: "",
  });

  /* ── Fetch products ── */
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Open add form ── */
  const handleAdd = () => {
    setEditProduct(null);
    setFormData({
      name: "", description: "", longDescription: "", price: "", comparePrice: "",
      category: "Serums", tags: "", sku: "", stock: "0", featured: false, active: true,
      brand: "AEGLE", weight: "", volume: "", ingredients: "", howToUse: "", suitableFor: "",
    });
    setImagePreview(null);
    setShowForm(true);
  };

  /* ── Open edit form ── */
  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      longDescription: product.longDescription || "",
      price: product.price.toString(),
      comparePrice: product.comparePrice?.toString() || "",
      category: product.category,
      tags: product.tags.join(", "),
      sku: product.sku,
      stock: product.stock.toString(),
      featured: product.featured,
      active: product.active,
      brand: product.brand,
      weight: product.weight || "",
      volume: product.volume || "",
      ingredients: product.ingredients || "",
      howToUse: product.howToUse || "",
      suitableFor: product.suitableFor?.join(", ") || "",
    });
    setImagePreview(product.thumbnail || null);
    setShowForm(true);
  };

  /* ── Submit form ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, value.toString());
      });

      // Append image if selected
      const fileInput = fileInputRef.current;
      if (fileInput?.files?.[0]) {
        fd.append("image", fileInput.files[0]);
      }

      let res: Response;
      if (editProduct) {
        fd.append("id", editProduct.id);
        res = await fetch("/api/products", { method: "PUT", body: fd });
      } else {
        res = await fetch("/api/products", { method: "POST", body: fd });
      }

      if (res.ok) {
        setShowForm(false);
        fetchProducts();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save product");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Delete product ── */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeleting(null);
    }
  };

  /* ── Image preview ── */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  /* ── Filter products ── */
  const filtered = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === "all" || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

  /* ── Stats ── */
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.active).length;
  const featuredProducts = products.filter((p) => p.featured).length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="text-white/70 hover:text-white">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <ShoppingBag className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-bold">Shop Manager</h1>
              <p className="text-purple-200 text-xs">AEGLE Product Catalogue</p>
            </div>
          </div>
          <Button onClick={handleAdd} className="bg-white text-purple-800 hover:bg-purple-50">
            <Plus className="w-4 h-4 mr-1" /> Add Product
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="w-6 h-6 mx-auto text-purple-600 mb-1" />
              <p className="text-2xl font-bold">{totalProducts}</p>
              <p className="text-xs text-gray-500">Total Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Eye className="w-6 h-6 mx-auto text-green-600 mb-1" />
              <p className="text-2xl font-bold">{activeProducts}</p>
              <p className="text-xs text-gray-500">Active / Live</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 mx-auto text-amber-500 mb-1" />
              <p className="text-2xl font-bold">{featuredProducts}</p>
              <p className="text-xs text-gray-500">Featured</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Tag className="w-6 h-6 mx-auto text-blue-600 mb-1" />
              <p className="text-2xl font-bold">{totalStock}</p>
              <p className="text-xs text-gray-500">Total Stock</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, SKU, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none"
          >
            <option value="all">All Categories</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            <Loader2 className="w-8 h-8 mx-auto animate-spin mb-2" />
            Loading products...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No products found</p>
            <p className="text-sm mt-1">Add your first product to get started!</p>
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Product</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Category</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-600">Price</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600">Stock</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600">Status</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((product) => (
                      <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 flex-shrink-0 overflow-hidden">
                              {product.thumbnail ? (
                                <img src={product.thumbnail} alt="" className="w-full h-full object-cover rounded-lg" />
                              ) : (
                                <Package className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                              <p className="text-xs text-gray-400">{product.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <IndianRupee className="w-3 h-3 text-gray-500" />
                            <span className="font-semibold">{product.price.toLocaleString()}</span>
                          </div>
                          {product.comparePrice && (
                            <p className="text-xs text-gray-400 line-through">₹{product.comparePrice.toLocaleString()}</p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-medium ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-amber-600" : "text-red-600"}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {product.active ? (
                              <span className="flex items-center gap-1 text-xs text-green-600">
                                <Eye className="w-3 h-3" /> Live
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <EyeOff className="w-3 h-3" /> Hidden
                              </span>
                            )}
                            {product.featured && (
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleEdit(product)}
                              className="p-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-600 cursor-pointer"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              disabled={deleting === product.id}
                              className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 cursor-pointer disabled:opacity-50"
                              title="Delete"
                            >
                              {deleting === product.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* ── Add/Edit Product Modal ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto pt-8 pb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {editProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Product Image</label>
                <div
                  className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-24 h-24 mx-auto rounded-lg object-cover mb-2" />
                  ) : (
                    <ImagePlus className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                  )}
                  <p className="text-sm text-gray-500">
                    {imagePreview ? "Click to change image" : "Click to upload product image"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Stored in Firebase Storage · JPG, PNG, WebP</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* Name & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vitamin C Serum"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="AEGLE-VCS-001"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief product description for cards and listings"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Detailed Description</label>
                <textarea
                  rows={3}
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  placeholder="Full product page description"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Price, Compare Price, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="1299"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Compare Price (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={formData.comparePrice}
                    onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                    placeholder="1599 (strike-through)"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Category & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500"
                  >
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="brightening, vitamin-c, bestseller"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500"
                />
              </div>

              {/* Weight / Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="50g"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Volume</label>
                  <input
                    type="text"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    placeholder="30ml"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Ingredients</label>
                <textarea
                  rows={2}
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  placeholder="Vitamin C, Hyaluronic Acid, Niacinamide..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* How to Use */}
              <div>
                <label className="block text-sm font-medium mb-1.5">How to Use</label>
                <textarea
                  rows={2}
                  value={formData.howToUse}
                  onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
                  placeholder="Apply 2-3 drops on cleansed face..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Suitable For */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Suitable For (comma-separated)</label>
                <input
                  type="text"
                  value={formData.suitableFor}
                  onChange={(e) => setFormData({ ...formData, suitableFor: e.target.value })}
                  placeholder="All skin types, Oily skin, Sensitive skin"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-purple-500"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded accent-purple-600"
                  />
                  <span className="text-sm font-medium">⭐ Featured product</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 rounded accent-green-600"
                  />
                  <span className="text-sm font-medium">👁️ Active (visible on shop)</span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-purple-700 hover:bg-purple-800 text-white px-8"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Saving...</>
                  ) : editProduct ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
