import { useState, useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { uploadToCloudinary } from '../cloudinary';

const CATEGORIES = ['Pre-wedding', 'Wedding', 'Portraits', 'Events'];

export default function AdminDashboard() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState({ title: '', location: '', category: 'Pre-wedding' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const fileRef = useRef();

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'portfolio'));
      setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPhotos(); }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert('Please select an image first!');
    if (!form.title || !form.location) return alert('Please fill in title and location!');

    setUploading(true);
    setProgress(0);
    try {
      const result = await uploadToCloudinary(selectedFile, setProgress);
      await addDoc(collection(db, 'portfolio'), {
        title: form.title,
        location: form.location,
        category: form.category,
        img: result.secure_url,
        publicId: result.public_id,
        createdAt: new Date().toISOString(),
      });
      setForm({ title: '', location: '', category: 'Pre-wedding' });
      setSelectedFile(null);
      setPreview(null);
      fileRef.current.value = '';
      setSuccessMsg('Photo added successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      fetchPhotos();
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'portfolio', id));
      setPhotos(p => p.filter(x => x.id !== id));
      setDeleteConfirm(null);
    } catch (e) {
      alert('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-warm">
      {/* Header */}
      <div className="bg-ink px-6 py-4 flex items-center justify-between">
        <div>
          <div className="font-display text-lg font-light tracking-widest2 text-cream uppercase">shot Flicks</div>
          <div className="text-[10px] tracking-widest text-stone font-body uppercase">Admin Panel</div>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" className="text-xs tracking-widest uppercase text-stone font-body hover:text-cream transition-colors">
            View Site
          </a>
          <button onClick={() => signOut(auth)}
            className="text-xs tracking-widest uppercase px-4 py-2 border border-stone/40 text-stone font-body hover:border-cream hover:text-cream transition-colors">
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Upload form */}
        <div className="lg:col-span-1">
          <div className="bg-cream p-8 sticky top-6">
            <h2 className="font-display text-2xl font-light text-ink mb-8">Add New Photo</h2>

            <form onSubmit={handleUpload} className="space-y-6">
              {/* File picker */}
              <div>
                <div
                  onClick={() => fileRef.current.click()}
                  className={`border-2 border-dashed cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center p-8 text-center
                    ${preview ? 'border-ink' : 'border-stone/40 hover:border-stone'}`}>
                  {preview ? (
                    <img src={preview} alt="preview" className="w-full max-h-48 object-cover" />
                  ) : (
                    <>
                      <div className="text-3xl text-stone mb-3">+</div>
                      <p className="text-xs tracking-widest uppercase text-muted font-body">Click to select photo</p>
                      <p className="text-[10px] text-stone font-body mt-1">JPG, PNG, WEBP</p>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                {preview && (
                  <button type="button" onClick={() => { setPreview(null); setSelectedFile(null); fileRef.current.value = ''; }}
                    className="text-[10px] tracking-widest uppercase text-muted font-body mt-2 hover:text-ink transition-colors">
                    Remove image
                  </button>
                )}
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-muted font-body block mb-2">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Golden Hour Session"
                  className="w-full bg-transparent border-b border-stone/40 focus:border-ink outline-none py-3 text-sm font-body text-ink placeholder:text-stone transition-colors" />
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-muted font-body block mb-2">Location *</label>
                <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  placeholder="e.g. Bangalore"
                  className="w-full bg-transparent border-b border-stone/40 focus:border-ink outline-none py-3 text-sm font-body text-ink placeholder:text-stone transition-colors" />
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-muted font-body block mb-2">Category *</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full bg-cream border-b border-stone/40 focus:border-ink outline-none py-3 text-sm font-body text-ink transition-colors appearance-none cursor-pointer">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Progress bar */}
              {uploading && (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] tracking-widest uppercase text-muted font-body">Uploading...</span>
                    <span className="text-[10px] text-muted font-body">{progress}%</span>
                  </div>
                  <div className="w-full h-0.5 bg-stone/30">
                    <div className="h-0.5 bg-ink transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              {successMsg && (
                <p className="text-xs text-green-600 font-body">{successMsg}</p>
              )}

              <button type="submit" disabled={uploading}
                className="w-full py-4 bg-ink text-cream text-xs tracking-widest uppercase font-body hover:bg-muted transition-colors duration-300 disabled:opacity-50">
                {uploading ? `Uploading ${progress}%...` : 'Add to Portfolio'}
              </button>
            </form>
          </div>
        </div>

        {/* Photos grid */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-light text-ink">
              Portfolio Photos <span className="text-muted text-lg">({photos.length})</span>
            </h2>
            <button onClick={fetchPhotos} className="text-xs tracking-widest uppercase text-muted font-body hover:text-ink transition-colors">
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-xs tracking-widest uppercase text-muted font-body">Loading...</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-stone/30">
              <p className="font-display text-2xl text-stone font-light italic mb-2">No photos yet</p>
              <p className="text-xs tracking-widest uppercase text-muted font-body">Add your first photo using the form</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {photos.map(photo => (
                <div key={photo.id} className="group relative overflow-hidden bg-stone/10">
                  <img src={photo.img} alt={photo.title}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/70 transition-all duration-300 flex flex-col items-center justify-center gap-2 p-3">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <p className="font-display text-sm text-cream italic">{photo.title}</p>
                      <p className="text-[10px] tracking-widest uppercase text-stone font-body mt-0.5">{photo.category}</p>
                      <p className="text-[10px] text-stone font-body">{photo.location}</p>
                      <button
                        onClick={() => setDeleteConfirm(photo.id)}
                        className="mt-3 px-3 py-1.5 border border-red-400 text-red-400 text-[10px] tracking-widest uppercase font-body hover:bg-red-400 hover:text-white transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-ink/80 flex items-center justify-center z-50 p-6">
          <div className="bg-cream p-8 max-w-sm w-full text-center">
            <h3 className="font-display text-2xl font-light text-ink mb-3">Delete Photo?</h3>
            <p className="text-sm text-muted font-body mb-8">This cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 border border-stone text-muted text-xs tracking-widest uppercase font-body hover:border-ink hover:text-ink transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-3 bg-red-500 text-white text-xs tracking-widest uppercase font-body hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
