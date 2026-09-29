import { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { uploadToCloudinary } from '../cloudinary';

const CATEGORIES = ['Pre-wedding', 'Wedding', 'Portraits', 'Events'];

export default function AdminDashboard() {
  const [photos, setPhotos] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState({ title: '', location: '', category: 'Pre-wedding' });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
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

  const fetchBookings = async () => {
    try {
      const snap = await getDocs(collection(db, 'bookings'));
      const sorted = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBookings(sorted);
    } catch (e) {
      console.error(e);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const isBooked = bookings.some(b => b.date && new Date(b.date).toDateString() === date.toDateString());
      if (isBooked) {
        return <div className="mx-auto mt-1 w-1.5 h-1.5 bg-accent rounded-full"></div>;
      }
    }
    return null;
  };

  useEffect(() => { fetchPhotos(); fetchBookings(); }, []);

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setSelectedFiles(files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return alert('Please select at least one image!');
    if (!form.title || !form.location) return alert('Please fill in title and location!');

    setUploading(true);
    setProgress(0);
    let uploadedCount = 0;
    try {
      for (const file of selectedFiles) {
        const result = await uploadToCloudinary(file, (p) => {
           setProgress(Math.round(((uploadedCount * 100) + p) / selectedFiles.length));
        });
        await addDoc(collection(db, 'portfolio'), {
          title: selectedFiles.length > 1 ? `${form.title} ${uploadedCount + 1}` : form.title,
          location: form.location,
          category: form.category,
          img: result.secure_url,
          publicId: result.public_id,
          createdAt: new Date().toISOString(),
        });
        uploadedCount++;
      }
      setForm({ title: '', location: '', category: 'Pre-wedding' });
      setSelectedFiles([]);
      setPreviews([]);
      fileRef.current.value = '';
      setSuccessMsg(`${uploadedCount} photo(s) added successfully!`);
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

  const updateBookingStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const handleDeleteBooking = async (id) => {
    if(!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await deleteDoc(doc(db, 'bookings', id));
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (e) {
      alert('Failed to delete booking');
    }
  };

  return (
    <div className="min-h-screen bg-warm">
      {/* Header */}
      <div className="bg-ink px-6 py-4 flex items-center justify-between">
        <div>
          <div className="font-display text-lg font-light tracking-widest2 text-cream uppercase">shot Flick</div>
          <div className="text-[10px] tracking-widest text-stone font-body uppercase">Admin Panel</div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 mr-6">
            <button onClick={() => setActiveTab('portfolio')} className={`text-xs tracking-widest uppercase font-body transition-all pb-1 ${activeTab === 'portfolio' ? 'text-cream border-b border-cream' : 'text-stone hover:text-cream'}`}>Portfolio</button>
            <button onClick={() => setActiveTab('bookings')} className={`text-xs tracking-widest uppercase font-body transition-all pb-1 ${activeTab === 'bookings' ? 'text-cream border-b border-cream' : 'text-stone hover:text-cream'}`}>Bookings</button>
          </div>
          <a href="/" className="text-xs tracking-widest uppercase text-stone font-body hover:text-cream transition-colors">
            View Site
          </a>
          <button onClick={() => signOut(auth)}
            className="text-xs tracking-widest uppercase px-4 py-2 border border-stone/40 text-stone font-body hover:border-cream hover:text-cream transition-colors">
            Sign Out
          </button>
        </div>
      </div>

      <div className="md:hidden flex gap-6 px-6 py-4 bg-ink/95 border-t border-stone/20">
        <button onClick={() => setActiveTab('portfolio')} className={`text-xs tracking-widest uppercase font-body transition-all ${activeTab === 'portfolio' ? 'text-cream border-b border-cream' : 'text-stone'}`}>Portfolio</button>
        <button onClick={() => setActiveTab('bookings')} className={`text-xs tracking-widest uppercase font-body transition-all ${activeTab === 'bookings' ? 'text-cream border-b border-cream' : 'text-stone'}`}>Bookings</button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {activeTab === 'portfolio' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

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
                    ${previews.length > 0 ? 'border-ink' : 'border-stone/40 hover:border-stone'}`}>
                  {previews.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {previews.slice(0, 6).map((p, idx) => (
                         <img key={idx} src={p} alt="preview" className="w-full h-16 object-cover rounded-sm" />
                      ))}
                      {previews.length > 6 && (
                        <div className="w-full h-16 flex items-center justify-center bg-stone/20 text-xs font-body text-ink">
                          +{previews.length - 6} more
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="text-3xl text-stone mb-3">+</div>
                      <p className="text-xs tracking-widest uppercase text-muted font-body">Click to select photos</p>
                      <p className="text-[10px] text-stone font-body mt-1">JPG, PNG, WEBP (Multiple allowed)</p>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleFile} className="hidden" />
                {previews.length > 0 && (
                  <button type="button" onClick={() => { setPreviews([]); setSelectedFiles([]); fileRef.current.value = ''; }}
                    className="text-[10px] tracking-widest uppercase text-muted font-body mt-2 hover:text-ink transition-colors">
                    Clear all images
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {photos.map(photo => (
    <div key={photo.id} className="bg-cream border border-stone/20 overflow-hidden">
      <img src={photo.img} alt={photo.title}
        className="w-full aspect-square object-cover" />
      <div className="p-3">
        <p className="font-display text-sm text-ink italic truncate">{photo.title}</p>
        <p className="text-[10px] tracking-widest uppercase text-muted font-body mt-0.5">{photo.category} · {photo.location}</p>
        <button
          onClick={() => setDeleteConfirm(photo.id)}
          className="mt-3 w-full py-2 border border-red-400 text-red-400 text-[10px] tracking-widest uppercase font-body hover:bg-red-400 hover:text-white transition-colors">
          🗑 Delete
        </button>
      </div>
    </div>
  ))}
</div>
          )}
        </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <div className="bg-cream p-8 sticky top-6">
                <h2 className="font-display text-2xl font-light text-ink mb-6">Calendar Filter</h2>
                <div className="custom-calendar-container mb-6">
                  <Calendar 
                    onChange={setCalendarDate} 
                    value={calendarDate} 
                    tileContent={tileContent}
                    className="w-full border-0 bg-transparent font-body" 
                  />
                </div>
                <button onClick={() => setCalendarDate(null)} className="w-full py-3 border border-stone text-xs tracking-widest uppercase font-body text-ink hover:bg-stone/10 transition-colors">
                  Clear Date Filter
                </button>
              </div>
            </div>

            {/* Bookings List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-light text-ink">
                  Booking Requests <span className="text-muted text-lg">({bookings.length})</span>
                </h2>
                <button onClick={fetchBookings} className="text-xs tracking-widest uppercase text-muted font-body hover:text-ink transition-colors">
                  Refresh
                </button>
              </div>

              <div className="space-y-4">
                {bookings
                  .filter(b => !calendarDate || (b.date && new Date(b.date).toDateString() === calendarDate.toDateString()))
                  .map(booking => (
                  <div key={booking.id} className="bg-cream p-6 border border-stone/20 flex flex-col md:flex-row gap-6 justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-xl text-ink">{booking.name}</h3>
                          <select 
                            value={booking.status || 'Pending'} 
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className={`text-[10px] uppercase tracking-widest font-body px-2 py-1 outline-none cursor-pointer border ${
                              booking.status === 'Confirmed' ? 'border-green-500 text-green-600 bg-green-50' :
                              booking.status === 'Completed' ? 'border-blue-500 text-blue-600 bg-blue-50' :
                              booking.status === 'Rejected' ? 'border-red-500 text-red-600 bg-red-50' :
                              'border-yellow-500 text-yellow-600 bg-yellow-50'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                        <span className="text-[10px] bg-stone/20 px-2 py-1 uppercase tracking-widest font-body text-ink">{booking.type}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm font-body text-muted">
                        <p><strong>Email:</strong> {booking.email}</p>
                        <p><strong>Phone:</strong> {booking.phone}</p>
                        <p><strong>Date:</strong> {booking.date ? new Date(booking.date).toDateString() : 'N/A'}</p>
                        <p><strong>Submitted:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                      </div>
                      {booking.message && (
                        <div className="mt-4 p-4 bg-warm border border-stone/10">
                          <p className="text-sm font-body text-ink italic">"{booking.message}"</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                       <a href={`https://wa.me/${booking.phone?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" 
                          className="px-4 py-2 bg-green-500 text-white text-[10px] tracking-widest uppercase font-body text-center hover:bg-green-600 transition-colors">
                         WhatsApp
                       </a>
                       <a href={`mailto:${booking.email}`}
                          className="px-4 py-2 border border-stone/40 text-ink text-[10px] tracking-widest uppercase font-body text-center hover:border-ink transition-colors">
                         Email
                       </a>
                       <button onClick={() => handleDeleteBooking(booking.id)}
                          className="px-4 py-2 border border-red-400 text-red-500 text-[10px] tracking-widest uppercase font-body text-center hover:bg-red-50 transition-colors">
                         Delete
                       </button>
                    </div>
                  </div>
                ))}
                {bookings.filter(b => !calendarDate || (b.date && new Date(b.date).toDateString() === calendarDate.toDateString())).length === 0 && (
                  <div className="text-center py-20 border-2 border-dashed border-stone/30">
                    <p className="font-display text-2xl text-stone font-light italic mb-2">No bookings found</p>
                    <p className="text-xs tracking-widest uppercase text-muted font-body">Try changing the date filter</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
